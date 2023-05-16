import React, {useState, useEffect} from 'react'
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, InternalBlog, CreditScore } from "../../shared";
import { EmiCalculator } from "../../calculator/Emi";
import { FdCalculator } from "../../calculator/FdCalculator";
import HomeLoanEmiCalculation from '../../../data/homeLoanEmiCalculation.json';
import BusinessLoanEmiCalculation from '../../../data/businessLoanEmiCalculation.json';
import PersonalLoanEmiCalculation from '../../../data/personalLoanEmiCalculation.json';
import fdCalculations from '../../../data/fdCalculations.json';
import { RightSideBar } from '../../shared';

export const BankCalculator = ({ data, cmsData, interLinkingData = [], bank, calculator, bankProducts, attributeData, blogsData, blogSlug, rightNavBar }) => {
  let productSlug = [];
  let array = [];
  const loanType = blogSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())

  if (data && data.products && data.products.length > 0) {
    productSlug = data.products;
    productSlug.map((product, index) => {
      array = interLinkingData && interLinkingData.filter((item) => item.path === product.productSlug+'-calculator');
      array.length == 0 ? productSlug.splice(index, 1) : null
    })
  }
  let matchProductName = calculator.split('-calculator').join('').replace(/(^\w|\s\w)/g, m => m);
  const bankName = bank.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const calculatorName = calculator.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  let interLinkingDataArray = {"text": `${bankName}'s Calculators`,"child": []};
  interLinkingData && interLinkingData.filter((item) => item.path !== calculator).map((data) => interLinkingDataArray.child.push({"text": data.post_title,"path": "/bank-calculator/" + `${bank}` + "/" + data.path}));

  let bankProductData = bankProducts.bank_products;
  let bankCalculatorData = bankProducts.bank_calculators;
  let bankProduct = bankProductData.filter((data)=> data.lenderPath === bank);
  let bankCalculator = bankCalculatorData.filter((data)=> data.lenderPath != bank);
  let interLinkingProducts = {"text": `${bankName}'s Products`,"child": []};
  let interLinkingCalculators = {"text": `Similar Calculators`,"child": []};
  bankProduct && bankProduct.length > 0 && bankProduct.map((data) => data.products.sort((a, b) => {a.productPriority - b.productPriority}).map((item) => (interLinkingProducts.child.push({"text": data.lenderText + " " + item.productText,"path": `/banks-in-india/${data.lenderPath}/${item.productPath}`}))));
  bankCalculator && bankCalculator.length > 0 && bankCalculator.map((data) => data.calculators.map((item) => (item.calculatorPath === calculator ? interLinkingCalculators.child.push({"text": data.lenderText + " " + item.calculatorText+ " " + "Calculator","path": `/bank-calculator/${data.lenderPath}/${item.calculatorPath}`}) : null)));

  let interLinkingIfscArray = {"text": `${bankName}'s Ifsc Codes`, "child": []};
  attributeData.map((data)=> interLinkingIfscArray.child.push({"text": bankName + ' ' + data.name,"path": "/banks-in-india"+ `/${bank}` + '/ifsc-code' + `/${data.slug}`}))

  let otherBankProduct = bankProductData.filter((data)=> data.lenderPath != bank);
  let interLinkingOtherBankArray = {"text": `${bankName}'s By Other banks`,"child": []};
  let arraydata1 = otherBankProduct && otherBankProduct.length > 0 && otherBankProduct.map((data) => data.products.map((item) => (item.productPath === matchProductName ? interLinkingOtherBankArray.child.push({"text": data.lenderText + " " + item.productText,"path": `/banks-in-india/${data.lenderPath}/${item.productPath}`}) : null)));
  let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))
  const KnowMoreArray = {"text": "Know More About","child": [
    {
      "text": bankName,
      "path": `/banks-in-india/${bank}`
    },
    {
      "text": `${loanType} Interest Rates`,
      "path": `/loans/${blogSlug}/interest-rate`
    },
    {
      "text": `${bankName + " " + loanType} Interest Rate`,
      "path": `/banks-in-india/${data.lenderSlug}/${blogSlug}/interest-rate`
    }
  ]};
  const interestRate = [
    {
      "text": `${bankName} Home Loan Interest Rate`,
      "path": `/banks-in-india/${bank}/home-loan/interest-rate`
    },
    {
      "text": `${bankName} Personal Loan Interest Rate`,
      "path": `/banks-in-india/${bank}/personal-loan/interest-rate`
    }
  ]
  if(matchProductName !== 'home-loan' && matchProductName !== 'personal-loan'){
    KnowMoreArray.child.pop();
    KnowMoreArray.child.pop();
    interestRate.map((item)=> KnowMoreArray.child.push({"text": item.text,"path": item.path}));
  }
  const internalLinkEmiCalculator = [
    {
      "text": "Fixed Deposit Rate",
      "child": [
        {
          "text": `${bankName} FD Rates`,
          "path": `/fixed-deposit-rate/${data.lenderSlug}`
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
    interLinkingFinancialArray,
    // {
      //   "text": "Top 10 Banks",
      //   "child": [
      //     {
      //       "text": "CITI Bank",
      //       "path": "/banks-in-india/citi-bank"
      //     },
      //     {
      //       "text": "RBL Bank",
      //       "path": "/banks-in-india/rbl-bank"
      //     },
      //     {
      //       "text": "Bank of Baroda",
      //       "path": "/banks-in-india/bank-of-baroda"
      //     },
      //     {
      //       "text": "Canara Bank",
      //       "path": "/banks-in-india/canara-bank"
      //     },
      //     {
      //       "text": "Bajaj Finserv",
      //       "path": "/banks-in-india/bajaj-finserv"
      //     },
      //     {
      //       "text": "Yes Bank",
      //       "path": "/banks-in-india/yes-bank"
      //     },
      //     {
      //       "text": "Deutsche Bank",
      //       "path": "/banks-in-india/deutsche-bank"
      //     },
      //     {
      //       "text": "IDFC FIRST Bank",
      //       "path": "/banks-in-india/idfc-first-bank"
      //     },
      //     {
      //       "text": "DCB Bank",
      //       "path": "/banks-in-india/dcb-bank"
      //     },
      //     {
      //       "text": "Kotak Bank",
      //       "path": "/banks-in-india/kotak-bank"
      //     }
      //   ]
      // }
  ]
  interLinkingDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingDataArray);
  interLinkingProducts.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingProducts);
  interLinkingCalculators.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingCalculators);
  interLinkingIfscArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingIfscArray);
  KnowMoreArray.child.length > 0 && internalLinkEmiCalculator.unshift(KnowMoreArray);
  const breadCrumbLinks = [
      {   
        "text": "Bank Calculator",
        "path": "/bank-calculator", 
        "class": ""
      },
      {   
        "text": bankName,
        "path": "/bank-calculator/"+bank, 
        "class": ""
      },
      {   
        "text": calculatorName,
        "path": "/bank-calculator/"+bank+"/"+calculator, 
        "class": ""
      }
    ]

    const renderSwitch = (calculator) => {
      switch (calculator){
        case 'fd-calculator' :
          return (
            <FdCalculator calculations={fdCalculations } />
          )
        case 'rd-calculator' :
          return (
            true
          )
        case 'ppf-calculator' :
          return (
            true
          )
        case 'home-loan-calculator' :
          return (
            <EmiCalculator products={interLinkingData} bankCalculator={true} path={`${process.env.BASE_URL}` + "/bank-calculator/" + `${bank}`} title={"Home Loan"} calculation={HomeLoanEmiCalculation} />
          )
        case 'personal-loan-calculator' :
          return (
            <EmiCalculator products={interLinkingData} bankCalculator={true} path={`${process.env.BASE_URL}` + "/bank-calculator/" + `${bank}`} title={"Personal Loan"} calculation={PersonalLoanEmiCalculation} />
          )
        case 'business-loan-calculator' :
          return (
            <EmiCalculator products={interLinkingData} bankCalculator={true} path={`${process.env.BASE_URL}` + "/bank-calculator/" + `${bank}`} title={"Business Loan"} calculation={BusinessLoanEmiCalculation} />
          )
        case 'loan-against-property-calculator' :
          return (
            <EmiCalculator products={interLinkingData} bankCalculator={true} path={`${process.env.BASE_URL}` + "/bank-calculator/" + `${bank}`} title={"Loan Against Property"} calculation={HomeLoanEmiCalculation} />
          )
      }
    }

    return (
      <>
        <div className="container"> 
          <div className="breadCrumb">
            <BreadCrumb links={breadCrumbLinks} />
          </div>
          <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">{cmsData[0].post_title}</h1>
          {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0  && cmsData[0].short_description!="" && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}

        </div>
        <div className='container'>
        {renderSwitch(calculator)}
        </div>
        <div className="container containerFlex">
          <section className={contentStyles.eligible}>
            <div className="container">
              <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
            </div>
          </section>
          <RightSideBar menuLinks={internalLinkEmiCalculator} paddingTop={true} />
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
        <CreditScore />
      <InternalBlog loanType={loanType} data={blogsData} />
      </>
    )
}