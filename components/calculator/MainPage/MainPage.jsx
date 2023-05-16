import styles from "./MainPage.module.css";
import {MainCalculator} from "../../calculator/MainCalculator"
import { BreadCrumb, FAQ } from "../../shared";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import {useState} from 'react';
const breadCrumbLinks = [
  {
    "text": "Calculators",
    "path": "/calculator"
  }
]
export function MainPage({calculator,cmsData}) {
  
  
  return( 
    <>
      <div className="container">	
        <BreadCrumb links={breadCrumbLinks} />
        <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">
        Calculators
        </h1>
        <p className="font14 text444 lineHeight24">Calculate your monthly payments using finance calculators that come pre-programmed with the necessary formula. Pin your hopes on split-second computations to make better financial judgments. At Urban Money, we value your time and thus introduce you to a good deal of financial calculators in one place. Our cutting-edge calculators are specifically designed to fine-tune the monthly budget. With access to AI-based boosted calculating, you can increase the credibility of what the bank or credit provider is offering.</p>
      </div>

      {/* <section className={styles.mainBox}>
        <div className="container">
        <div className={styles.allcaculatorBox}>
            <FinancialCalculatorItem headingText='Home Loan' Calculators={HomeLoanCalculators} />
            <FinancialCalculatorItem headingText ='Personal Loan' Calculators={PersonalLoanCalculators} />
            <FinancialCalculatorItem headingText ='Business Loan' Calculators={BusinessLoanCalculators} />            
            <FinancialCalculatorItem headingText ='Eligibility Calculator' Calculators={EligibilityCalculators} />
          </div>
        </div>
      </section> */}
      <MainCalculator calculator={calculator} />
      <section className={`${cmsStyles.eligible} mt30 mb40`}>
          <div className="container">
          {cmsData[0].post_title?<div className="font24 w100 mb40 text2828 grid4Span Innerheading fontMedium lineHeight36 ">{cmsData[0].post_title}</div>:null}
            <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
          </div>
      </section>
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
