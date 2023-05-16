import {BreadCrumb} from "../../shared/BreadCrumb/BreadCrumb";
import React from 'react';
import { FinancialCalculator } from "../../calculator";
import InvestmentPlans from '../../../data/investmentPlansType.json';
import {FAQ} from "../../shared"
import { RightSideBar } from "../../shared";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
export function MainPage({rightNavBar, bankCalculators,cmsData}) {
  
  const breadCrumbLinks = [
    {   
      "text": "Investment Plans",
      "path": "/investment-plans", 
      "class": ""
    }
  ]
  
   //Investment
   let interLinkingInvestmentArray = {"text": "Investment Options","child": []};
   rightNavBar.filter((data) =>  data.text === "Investment").map(data => data.child.map((item)=> interLinkingInvestmentArray.child.push({"text": item.text,"path": item.path})))
   // //Investment
   let interLinkingInsuranceArray = {"text": "Insurance Options","child": []};
   rightNavBar.filter((data) =>  data.text === "Insurance").map(data => data.child.map((item)=> interLinkingInsuranceArray.child.push({"text": item.text,"path": item.path})))
   //"Financial calculators"
   let interLinkingFinancialArray = {"text": "Investment calculators","child": []};
   let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
   financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))
   //"Loans"
   let interLinkingLoanDataArray = {"text": "Loans","child": []};
   let loans = rightNavBar.filter((data) =>  data.text === "Loan").map(data => data.child.map((item)=> interLinkingLoanDataArray.child.push({"text": item.text,"path": item.path})))
  //bank calculator
  let bankCalculatorData = bankCalculators.bank_calculators;
  let interLinkingCalculators = {"text": `Bank Calculators`,"child": []};
  bankCalculatorData && bankCalculatorData.length > 0 && bankCalculatorData.map((data) => data.calculators.map((item) => (interLinkingCalculators.child.push({"text": data.lenderText + " " + item.calculatorText,"path": `/bank-calculator/${data.lenderPath}/${item.calculatorPath}`}))));

  //Top Bank Fd
  let interLinkingFdBankArray = {"text": 'Top Bank FD', "child": []};
  bankCalculators.top_fd_banks.map((data)=> interLinkingFdBankArray.child.push({"text": data.name,"path": "/fixed-deposit-rate/" + data.slug}))
  const interLinkingData = [
    interLinkingInvestmentArray,
    interLinkingFinancialArray,
    interLinkingLoanDataArray,
    interLinkingInsuranceArray,
    interLinkingCalculators,
    interLinkingFdBankArray,
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
   return (
   <>
   <div className="container">
      <div className="breadCrumb">
      <BreadCrumb links={breadCrumbLinks} />
      </div>
    </div>
    <div className="container">
      <h1 className="font24 mb30 text2828  Innerheading fontMedium lineHeight36 ">Investment Plans</h1>
      <p className="font14  text444 mb30 lineHeight24">Make your dream home a reality with our leading home loan services. Urban Money has tied knots with an array of banks providing nimble and hassle-free mortgage loans. Unlock home credit loans with a host of benefits, like low housing loan interest rates and smaller EMIs to space out your payments over a longer tenure.</p>
    </div>
    <FinancialCalculator heading={false} data={InvestmentPlans} />
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
