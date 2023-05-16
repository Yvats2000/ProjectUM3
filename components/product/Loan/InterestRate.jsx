import { InternalBlog, BreadCrumb,FAQ } from "../../shared";
import { Description } from "./Description";
import Image from "next/image";
import { useRouter } from 'next/router';
import styles from "../../shared/CmsContent/CmsContent.module.css";
import { InterestRateList } from "../../InterestRateList";
export const InterestRate = ({data, cmsData, blogsData, rightNavBar, attributeData, bankProducts, productTop10Bank}) => {
  const router = useRouter()
  const loanTypeLoan = router.query.loanType
  const name = loanTypeLoan.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())

  // Investment
  let interLinkingInvestmentArray = {"text": "Investment","child": []};
  rightNavBar.filter((data) =>  data.text === "Investment").map(data => data.child.map((item)=> interLinkingInvestmentArray.child.push({"text": item.text,"path": item.path})))

  // Loans
  let interLinkingLoanDataArray = {"text": "Loans","child": []};
  let loans = rightNavBar.filter((data) =>  data.text === "Loan")
  loans[0].child.filter((d1)=> d1.text !== 'Home Loan').map((item)=> interLinkingLoanDataArray.child.push({"text": item.text,"path": item.path}))
  
  //ifsc array 
  let filterIfscData =  attributeData.attributeData.slice(0,10)
  let interLinkingIfscArray = {"text": `Ifsc Codes`, "child": []};
  filterIfscData.map((data)=> interLinkingIfscArray.child.push({"text": data.lenderName,"path": "/banks-in-india"+ `/${data.lenderSlug}` + '/ifsc-code'}))

  //product calculator
  let interLinkingProductCal = {"text": `${name} Calculator`, "child": []};
  let filterArray = bankProducts.bank_calculators.map((data) => data.calculators.map((item) => (item.calculatorPath === loanTypeLoan+'-calculator' ? interLinkingProductCal.child.push({"text": data.lenderText + " " + item.calculatorText,"path": `/bank-calculator/${data.lenderPath}/${item.calculatorPath}`}) : null)));

  //Product top banks
  let interLinkingProductTopBanks = {"text": `${name} Top Banks`, "child": []};
  productTop10Bank.map((item)=> interLinkingProductTopBanks.child.push({"text": item.text + " " + name,"path": "/banks-in-india"+ `/${item.path}` + `/${loanTypeLoan}`}))
  
  const internalLinkEmiCalculator = [interLinkingIfscArray, interLinkingInvestmentArray]
  if(loanTypeLoan === 'home-loan'){
    internalLinkEmiCalculator.unshift({
        "text": "Check Eligibility",
        "child": [
          {
            "text": `Home Loan Eligibility Calculator`,
            "path": `/loans/home-loan/eligibility-calculator`
          }
        ]
      })
  }else if(loanTypeLoan === 'personal-loan'){
    internalLinkEmiCalculator.unshift({
        "text": "Check Eligibility",
        "child": [
          {
                  "text": `Personal Loan Eligibility Calculator`,
                  "path": `/loans/personal-loan/eligibility-calculator`
          }
        ]
      })
  }else{
    internalLinkEmiCalculator.unshift({
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
    })
  }

  interLinkingProductCal.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingProductCal);


interLinkingLoanDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingLoanDataArray);


interLinkingProductTopBanks.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingProductTopBanks);

  const loanType = data && data[0] ? data[0].productSlug : '';
  const title = data && data[0] ? data[0].productName : '';
  const breadCrumbLinks = [
    {
      "text": 'Loans',
      "path": "/loans",
      "class": ""
    },
    {
      "text": title,
      "path": "/loans/"+ loanType,
      "class": ""
    },
    {
      "text":'Interest Rates',
      "path":"",
      "class":""
    }
  ]
  return (
    <>
    <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
    </div>
    <div className="container">
        <h1 className="font24 mb30 text2828  Innerheading fontMedium lineHeight36 ">{cmsData.length > 0 && cmsData[0].post_title ? cmsData[0].post_title : name + ' Interest Rates'}</h1>
        <div className="font14 short_description text444 mb30 lineHeight24" dangerouslySetInnerHTML={{__html:cmsData.length > 0 && cmsData[0].short_description ? cmsData[0].short_description : ''}}></div>
    </div>
    <InterestRateList data={data[0].category} loanLink={loanType} loanType={title} rightSideJson = {internalLinkEmiCalculator} path={"/loans/"+ loanType+"/interest-rate"}/>
    {cmsData.length>0 && cmsData[0].post_content &&
    <section className={styles.eligible}>
      <div className="container">
        <div className={styles.genericBanner}>
          {cmsData.length > 0 && cmsData[0].post_thumbnail ? <Image className="imgResponsive" src={cmsData[0].post_thumbnail} layout='responsive' width={1200} height={600} alt={cmsData[0].post_title}/>:null}
        </div>
        <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
      </div>
    </section>
    }
    {cmsData.length > 0 && cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
    <section className="faq">
      <div className="container">
        <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
        <div className="faqBx">
          <FAQ data={cmsData[0].faq_content}  />
        </div>
      </div>
    </section>
    :null}
    <InternalBlog loanType={name} data={blogsData} />
    </>
  );
}
