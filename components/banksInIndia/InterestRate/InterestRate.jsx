import React from "react";
import { BreadCrumb, FAQ, RightSideBar } from "../../shared";
import { Description } from "./Description";
import { useRouter } from 'next/router';
import styles from "../../shared/CmsContent/CmsContent.module.css";
import Image from "next/image";

export const BankInterestRate = ({productLoanData,data, cmsData=[], blogsData, productName, bankName, interLinkingData, attributeData, bankProducts, bankCalculators}) => {
const router = useRouter()
  const loanTypeLoan = router.query.productName
  const name = loanTypeLoan.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
  const bank = bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  let interLinkingIfscArray = {"text": `${bank}'s IFSC Codes`, "child": []};
  attributeData.attributeData.map((data)=> interLinkingIfscArray.child.push({"text": bank + " " + data.name,"path": "/banks-in-india"+ `/${bankName}` + '/ifsc-code' + `/${data.slug}`}))
  let interLinkingDataArray = {"text": `${bank}'s Calculators`,"child": []};
  interLinkingData && interLinkingData.map((data) => interLinkingDataArray.child.push({"text": data.post_title,"path": "/bank-calculator/" + `${bankName}` + "/" + data.path}));
  //Other Products by ${bankProduct[0].lenderText}

   //product calculator
  let interLinkingProductCal = {"text": `Other Banks ${name} Calculator`, "child": []};
  let filterArray = bankCalculators.bank_calculators.map((data) => data.calculators.map((item) => (item.calculatorPath === loanTypeLoan+'-calculator' ? interLinkingProductCal.child.push({"text": data.lenderText + " " + item.calculatorText,"path": `/bank-calculator/${data.lenderPath}/${item.calculatorPath}`}) : null)));

  let bankProductData = bankProducts.bankProducts.bank_products
  let bankProduct = bankProductData.filter((data)=> data.lenderPath === bankName);
  let loans = bankProduct && bankProduct.length > 0 && bankProduct[0].products.filter((item) => item.productPath !==loanTypeLoan )
  let interLinkingBankArray = {"text":`Other Loans Offered by ${bank}`, "child": []};
  loans && loans.map((data) => interLinkingBankArray.child.push({"text": data.productText,"path": `/banks-in-india/${bankName}/${data.productPath}`}));

  let otherBankProduct = bankProductData.filter((data)=> data.lenderPath != bankName);
  let interLinkingOtherBankArray = {"text": `${name} by Other Banks`,"child": []};
  let arraydata1 = otherBankProduct && otherBankProduct.length > 0 && otherBankProduct.map((data) => data.products.map((item) => (item.productPath === loanTypeLoan ? interLinkingOtherBankArray.child.push({"text": data.lenderText + " " + item.productText,"path": `/banks-in-india/${data.lenderPath}/${item.productPath}`}) : null)));
  const internalLinkEmiCalculator = [
    interLinkingBankArray, 
    interLinkingProductCal, 
    interLinkingIfscArray.child.length > 0 && interLinkingIfscArray, 
    interLinkingOtherBankArray,
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
      {
        "text": `${name} Calculators`,
        "child": [
          {
            "text": "EMI Calculator",
            "path": `/loans/${loanTypeLoan}/emi-calculator`
          },
          {
            "text": "Pre-payment Calculator",
            "path": `/loans/${loanTypeLoan}/pre-payment-calculator`
          },
          {
            "text": "Balance Transfer Calculator",
            "path": `/loans/${loanTypeLoan}/balance-transfer-calculator`
          }
        ]
      }
  ]
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

interLinkingDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingDataArray);
    const loanType = data && data[0] ? data[0].productSlug : '';
    const title = data && data[0].productSlug 
    const breadCrumbLinks = [
        {
          "text": "Banks In India",
          "path": "/banks-in-india",
          "class": ""
        },
        {
          "text": bank,
          "path": `/banks-in-india/${bankName}`,
          "class": ""
        },
        {
          "text": bank +" "+ name ,
          "path": `/banks-in-india/${bankName}/${loanTypeLoan}`,
          "class": ""
        },
        {
          "text": bank +" "+ name +" "+ "Interest Rate" ,
          "path": `/banks-in-india/${bankName}/interest-rate`,
          "class": ""
        }
      ]
    return(
        <>
      <div className="container">
        <BreadCrumb links={breadCrumbLinks} />
     </div>
    <Description data={data} productName={productName} cmsData={cmsData} loanType={loanType} title={title} bankName={bankName} bankSlugUrl={bankName} comparsion={productLoanData} />
    <>
    {cmsData && cmsData.length > 0 ? 
    <div className={`container containerFlex ${styles.gap40}`}>
    <section className={styles.eligible}>
      <div className="container">
        <div className={styles.genericBanner}>
          {cmsData && cmsData[0].post_thumbnail?<Image className="imgResponsive" src={ cmsData && cmsData[0].post_thumbnail} layout='responsive' width={1200} height={600} alt={cmsData[0].post_title}/>:null}
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: cmsData && cmsData[0].post_content }} className="mt35"></div>
      </div>
    </section>
        { cmsData && cmsData.length > 0 && cmsData[0].post_content !== '' ?  <RightSideBar menuLinks={internalLinkEmiCalculator} paddingTop={ true} /> : null}
      </div>
    : null}
    {cmsData && cmsData.length > 0 && cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
    <section className="faq">
      <div className="container">
        <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
        <div className="faqBx">
          <FAQ data={cmsData && cmsData[0].faq_content}  />
        </div>
      </div>
    </section>
    :null}</>
    </>
  )
}