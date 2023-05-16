import {BreadCrumb} from "../../shared/BreadCrumb/BreadCrumb";
import { FinancialCalculator } from "../../calculator";
import Insurance from '../../../data/insurancePolicyTypes.json';
import { FAQ } from "../../shared";
import React from 'react';
import { RightSideBar } from "../../shared";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";

export function MainPage({rightNavBar, topBanks,cmsData}) {
  
  //Investment
  let interLinkingInvestmentArray = {"text": "Investment","child": []};
  rightNavBar.filter((data) =>  data.text === "Investment").map(data => data.child.map((item)=> interLinkingInvestmentArray.child.push({"text": item.text,"path": item.path})))
  //"Financial calculators"
  let interLinkingFinancialArray = {"text": "Investment Calculator","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))
  //"Loans"
  let interLinkingLoanDataArray = {"text": "Loans","child": []};
  let loans = rightNavBar.filter((data) =>  data.text === "Loan").map(data => data.child.map((item)=> interLinkingLoanDataArray.child.push({"text": item.text,"path": item.path})))
  //top_banks
  let interLinkingBankArray = {"text": 'Top Banks', "child": []};
    topBanks.top_banks.map((data)=> interLinkingBankArray.child.push({"text": data.text,"path": "/banks-in-india/" + data.path}))
  //
  let bankCalculatorData = topBanks.bank_calculators;
  let interLinkingCalculators = {"text": `Bank Calculators`,"child": []};
  bankCalculatorData && bankCalculatorData.length > 0 && bankCalculatorData.map((data) => data.calculators.map((item) => (interLinkingCalculators.child.push({"text": data.lenderText + " " + item.calculatorText,"path": `/bank-calculator/${data.lenderPath}/${item.calculatorPath}`}))));
  const interLinkingData = [
    interLinkingCalculators,
    interLinkingInvestmentArray,
    interLinkingFinancialArray,
    interLinkingLoanDataArray,
    interLinkingBankArray,
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
        ]
  const breadCrumbLinks = [
    {   
      "text": "Insurance Policy",
      "path": "/insurance-policy", 
      "class": ""
    }
  ]
  
   return (
   <>
   <div className="container">
      <div className="breadCrumb">
      <BreadCrumb links={breadCrumbLinks} />
      </div>
    </div>
    <div className="container">
      <h1 className="font24 mb30 text2828  Innerheading fontMedium lineHeight36 ">What is Insurance?</h1>
         <p className="font14  text444 mb30 lineHeight24">An insurance policy can be defined as a contract between an insurance provider and a policyholder. Under this contract, the policyholder makes regular payments to the insurance company in return for a hedge against sudden financial or health risks. Depending on the terms and conditions laid down in the policy, the insurance company pays out a lump sum amount as reimbursement to the insured in the event of a claim.</p>
         <p className="font14  text444 mb30 lineHeight24">Various factors make up an insurance policy. A proper understanding of these can help you choose a policy better suited to your needs.</p>
    </div>
    <FinancialCalculator heading={false} data={Insurance} />
      <div className="container containerFlex">
        <section className={cmsStyles.eligible}>
          <div className="container">
          {cmsData[0].post_title?<div className="font24 w100 mb40 text2828 grid4Span Innerheading fontMedium lineHeight36 ">{cmsData[0].post_title}</div>:null}
            <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
          </div>
        </section>
        <RightSideBar menuLinks = {interLinkingData} paddingTop={true}/>
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
