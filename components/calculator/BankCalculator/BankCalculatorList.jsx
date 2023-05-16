import React, {useState} from 'react'
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb } from "../../shared";
import { RightSideBar } from '../../shared';
import {BankCalculatorItem} from "../MainCalculator"
export const BankCalculatorList = ({ cmsData, bank , attributeData,bankProducts,rightNavBar, calculatorData}) => {
  const bankName = bank.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  let interLinkingIfscArray = {"text": `${bankName}'s Ifsc Codes`, "child": []};
  attributeData.map((data)=> interLinkingIfscArray.child.push({"text": bankName + ' ' + data.name,"path": "/banks-in-india"+ `/${bank}` + '/ifsc-code' + `/${data.slug}`}))
  let interLinkingProducts = {"text": `${bankName}'s Products`,"child": []};
  let bankProductData = bankProducts.bank_products;
  let bankProduct = bankProductData.filter((data)=> data.lenderPath === bank);
  bankProduct && bankProduct.length > 0 && bankProduct.map((data) => data.products.sort((a, b) => {a.productPriority - b.productPriority}).map((item) => (interLinkingProducts.child.push({"text": data.lenderText + " " + item.productText,"path": `/banks-in-india/${data.lenderPath}/${item.productPath}`}))));
  let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))

  const internalLinkEmiCalculator = [
    {
      "text": "Know More About",
      "child": [
        {
          "text": bankName,
          "path": `/banks-in-india/${bank}`
        },
        {
          "text": `Home Loan Interest Rates`,
          "path": `/loans/home-loan/interest-rate`
        },
        {
          "text": `Personal Loan Interest Rates`,
          "path": `/loans/personal-loan/interest-rate`
        },
        {
          "text": `${bankName} Home Loan Interest Rate`,
          "path": `/banks-in-india/${bank}/home-loan/interest-rate`
        },
        {
          "text": `${bankName} Personal Loan Interest Rate`,
          "path": `/banks-in-india/${bank}/personal-loan/interest-rate`
        }
      ]
    },
    {
      "text": "Fixed Deposit Rate",
      "child": [
        {
          "text": `${bankName} FD Rates`,
          "path": `/fixed-deposit-rate/${bank}`
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
      "text": "Top 10 Banks",
      "child": [
        {
          "text": "CITI Bank",
          "path": "/banks-in-india/citi-bank"
        },
        {
          "text": "RBL Bank",
          "path": "/banks-in-india/rbl-bank"
        },
        {
          "text": "Bank of Baroda",
          "path": "/banks-in-india/bank-of-baroda"
        },
        {
          "text": "Canara Bank",
          "path": "/banks-in-india/canara-bank"
        },
        {
          "text": "Bajaj Finserv",
          "path": "/banks-in-india/bajaj-finserv"
        },
        {
          "text": "Yes Bank",
          "path": "/banks-in-india/yes-bank"
        },
        {
          "text": "Deutsche Bank",
          "path": "/banks-in-india/deutsche-bank"
        },
        {
          "text": "IDFC FIRST Bank",
          "path": "/banks-in-india/idfc-first-bank"
        },
        {
          "text": "DCB Bank",
          "path": "/banks-in-india/dcb-bank"
        },
        {
          "text": "Kotak Bank",
          "path": "/banks-in-india/kotak-bank"
        }
      ]
    }
  ]
  interLinkingFinancialArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingFinancialArray);
  interLinkingProducts.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingProducts);
  interLinkingIfscArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingIfscArray);
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
        }
    ]

    return (
      <>
        <div className="container"> 
          <div className="breadCrumb">
            <BreadCrumb links={breadCrumbLinks} />
          </div>
          <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">{cmsData && cmsData.length > 0 ? cmsData[0].post_title : bankName}</h1>
          {cmsData && cmsData.length > 0 && cmsData[0].short_description && cmsData[0].short_description != '' ?
          <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 font14 text444 lineHeight24"></div>
          :
          <>
          <p className='font14 text444 lineHeight24 mb15'>{bankName} provides a range of calculators to cater to your diverse needs from Loans to Deposits. From calculating your Home Loan, Personal Loan, Loan Against Property, or Business Loan to verifying your eligibility, the calculator assists you in every step so that you make an informed decision. As you embark on a journey to fulfill your dreams of venturing into a business loan, purchasing your dream house, paying off consolidated debt, or obtaining Higher Education. The calculator gives you a brief understanding of expenses and EMI Planning. </p>
          <p className='font14 text444 lineHeight24'>{bankName} calculators can also be utilized to calculate the expected returns on investment.  The calculator offers flexibility to compare multiple values while factoring in variables like interest rates so as to align them with your targetted returns. You can conveniently calculate the interest you will earn on your investments even before you make a decision to invest in a Fixed Deposit, Recurring Deposit, and Public Provident Fund.</p>
          </>}
        </div>
        <BankCalculatorItem calculator={calculatorData} bank={bank} />
        <div className="container containerFlex mt50">
        {cmsData && cmsData.length > 0 && cmsData[0].post_content && cmsData[0].post_content != '' ?
          <section className={`${contentStyles.eligible} container`}>
          <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35 font14 text444 lineHeight24"></div>
          </section>
          :
          <section className={`${contentStyles.eligible} container`}>
              <h2 className="fontMedium mb15">Variables Involved {bankName} Calculator </h2>
              <p className="font14  text444 mb30 lineHeight24">The user of the {bankName} calculator has to factor in the below-mentioned variables while estimating </p>
              <h4>Principal</h4>
              <p>The principal amount is the total amount borrowed from the bank.</p>
              <h4>Interest Rate </h4>
              <p>The Interest rate is the amount the bank charges from the borrower which is predominantly a percentage of the principal amount. </p>
              <h4>Monthly Payment</h4>
              <p>The monthly payment is the amount paid per month by the borrower to repay the loan on the decided tenure. </p>
              <h4>EMI schedule </h4>
              <p>The EMI schedule is a detailed account of the repayment schedule of the borrower through tabular or graphical representation. </p>
              <h2 className="fontMedium mb15">How Can Urban Money&apos;s {bankName} Calculator Help You?</h2>

              
              <p className="font14  text444 mb30 lineHeight24">The Urban Money&apos;s {bankName} calculator provides various benefits to the user as follows: </p>
              <h3 className="fontMedium mb10">Clarity</h3>
              <p className="font14  text444 mb30 lineHeight24">The Urban Money&apos;s {bankName} calculator provides utmost clarity to the users who may have diverse queries and questions in mind. </p>
              <h3 className="fontMedium mb10">Accuracy </h3>
              <p className="font14  text444 mb30 lineHeight24">The Urban Money&apos;s {bankName} calculator eliminates significant inaccuracies that might arise from manual calculations, which tend to be extremely time-consuming and inefficient. </p>
              <h3 className="fontMedium mb10">Comparability</h3>
              <p className="font14  text444 mb30 lineHeight24">The  Urban Money&apos;s {bankName} calculator allows the user to compare and explore multiple options to align with their goals.</p>
              <h3 className="fontMedium mb10">Accessibility</h3>
              <p className="font14  text444 mb30 lineHeight24">The Urban Money&apos;s {bankName} calculator is available online and easily accessed from all electronic devices.</p>
          </section>}
          <RightSideBar menuLinks={internalLinkEmiCalculator} paddingTop={true} />
        </div>
        {cmsData && cmsData.length > 0 && cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
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
    )
}