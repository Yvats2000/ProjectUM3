import { FAQ, BreadCrumb } from "../../shared";
import styles from "../../shared/CmsContent/CmsContent.module.css";
import { RightSideBar } from '../../shared'

export function LifeInsurancePlan({cmsData}) {
  const internalLinkEmiCalculator = [
    {
      "text": "Other Insurance Plan",
      "child": [
        {
          "text": "General Insurance Plans",
          "path": "/insurance-policy/general-insurance-plans"
        }
      ]
    },
    {
      "text": "Check Eligibility",
      "child": [
        {
          "text": `Home Loan Eligibility Calculator`,
          "path": `/loans/home-loan/eligibility-calculator`
        },
        {
          "text": `Personal Loan Eligibility Calculator`,
          "path": `/loans/personal-loan/eligibility-calculator`
        }
      ]
    },
    {
      "text": "Financial Calculators",
      "child": [
        {
          "text": "SIP Calculator",
          "path": "/calculator/sip-calculator"
        },
        {
          "text": "FD Calculator",
          "path": "/calculator/fd-calculator"
        },
        {
          "text": "HRA Calculator",
          "path": "/calculator/hra-calculator"
        },
        {
          "text": "Gratuity Calculator",
          "path": "/calculator/gratuity-calculator"
        }
      ]
    },
  ]
  
  if (!cmsData || cmsData.length == 0 || Object.keys(cmsData).length === 0)
  return null;
    const breadCrumbLinks = [
      {   
        "text": "Insurance",
        "path": "/insurance-policy", 
        "class": ""
      },
      {   
        "text": "Life Insurance Plans",
        "path": "/insurance-policy/life-insurance-plans", 
        "class": ""
      }
    ]
   return (
   <>
    <div className="container">	
      <BreadCrumb links={breadCrumbLinks} />
    </div>
      <div className="container containerFlex">
          <section className={styles.eligible}>
          <div className="container">
            <h1 className="font24 fontMedium text181d Innerheading mb40 lineHeight36">Life Insurance Plans</h1>
            
            <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }}></div>
          </div>
        </section>
        <RightSideBar menuLinks={internalLinkEmiCalculator}/>  
       </div> 
    {cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
    <section className="faq">
      <div className="container">
        <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
        <div className="faqBx">
          <FAQ data={cmsData[0].faq_content}  />
        </div>
      </div>
    </section>
    :null}
   </>
  );
}
