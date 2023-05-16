import React, { useState } from 'react'
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb } from "../../shared";
import { RightSideBar } from '../../shared';
import styles from '../MainCalculator/MainCalculator.module.css'
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../../ui/button';
export const BankCalculatorHome = ({ cmsData, rightNavBar, bankCalculators }) => {

  const records = 24;
  const [showNumberOfCalc, setShowNumberOfCalc] = useState(records);
  const viewMore = () => {
    setShowNumberOfCalc(showNumberOfCalc + records)
  }
  const calculatorImg = ["homeemi.svg", "homebalacnce.svg", "homepre.svg", "perosnalemi.svg", "personalbalance.svg", "personalemi.svg", "businessemi.svg", "busiensebalance.svg", "lumpsumcalc.svg"]

  let interLinkingFinancialArray = { "text": "Financial Calculators", "child": [] };
  let financial = rightNavBar.filter((data) => data.text === "Calculators").map((item) => item.child)
  financial[0].filter((data) => data.text === 'Financial Calculator').map(data => data.child.map((item) => interLinkingFinancialArray.child.push({ "text": item.text, "path": item.path })))

  const faq_json=[
    {
        "question": "What are some excellent free home loan calculators? ",
        "answer": "<p style=\"text-align: justify;\"><span style=\"font-weight: 400;\">The Urban Money platform offers the best home loan calculators that can be used multiple times at no cost. Each bank also provides calculators for use at a customer &apos s convenience. For more information on bank interest rate calculators, read our guide above.</span></p>\n"
    },
    {
        "question": "What is a home loan calculator?",
        "answer": "<p style=\"text-align: justify;\"><span style=\"font-weight: 400;\">A home loan calculator is an online tool that allows individuals to calculate their EMI on the home loan amount. This saves them the mental stress of manual calculation and displays error-free results in seconds. A home loan calculator requires users to enter information like loan amount, loan tenure (in years or months), and the per annum interest rate.</span></p>\n"
    },
    {
        "question": "Is there any online calculator to check home loan eligibility?",
        "answer": "<p style=\"text-align: justify;\"><span style=\"font-weight: 400;\">Yes, there is an online calculator to check home loan eligibility. One can use the home loan eligibility calculator available on the Urban Money platform at zero cost and unlimited times. Users must visit the Urban Money website and opt for the &apos home loan eligibility calculator &apos option. They must enter their full name, city, required loan amount, current monthly EMIs, date of birth, mobile number, occupation, monthly net salary, and loan tenure (in years). The calculator will employ the mathematical formula and generate the result within seconds. A user can use this tool to compare and analyse different home loans and choose the best one.</span></p>\n"
    },
    {
        "question": "How is EMI divided into principal and interest?",
        "answer": "<p style=\"text-align: justify;\"><span style=\"font-weight: 400;\">There are two methods for calculating EMI: flat-rate and reducing balance (or reduced balance). Both computations consider the principal loan amount, interest rate, and loan period. The EMI flat-rate formula is computed by adding the loan principal (P) and interest rate (r) and dividing the result by the number of periods multiplied by the number of months (n). The reducing balance method has the formula - EMI = P * [( r * (1 + r)^n)) / ((1 + r)^n - 1)]</span></p>\n"
    }
]

  const internalLinkEmiCalculator = [
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
  const breadCrumbLinks = [
    {
      "text": "Bank Calculator",
      "path": "/bank-calculator",
      "class": ""
    },
  ]

  return (
    <>
      <div className="container">
        <div className="breadCrumb">
          <BreadCrumb links={breadCrumbLinks} />
        </div>
        <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 ">{cmsData && cmsData.length > 0 ? cmsData[0].post_title : "Bank Calculators"}</h1>
        {cmsData && cmsData.length > 0 && cmsData[0].short_description && cmsData[0].short_description != '' ?
          <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 font14 text444 lineHeight24"></div>
          :
          <>
            <p className='font14 text444 lineHeight24 mb15'>A Bank calculator is an online tool that computes various loans interest rates and EMIs. The bank EMI calculator can be used multiple times to calculate, compare, and analyse different loan amounts so that the user can conveniently choose the loan they desire. The bank interest rate calculator helps users form a financial strategy to achieve their goals. One must use a bank loan calculator to be aware of financial budgeting.</p>
          </>}
        <h2 className="font24 mb40 mt10 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 ">List of Banks with Calculators</h2>
      </div>

      <div className={`${styles.calccontainerFull} container mb30`}>
        {bankCalculators && bankCalculators.length > 0 && bankCalculators.map((item, index) => (
          <div className={`${styles.calc} ${index < showNumberOfCalc ? styles.active : styles.displayNone}`} key={index}>
            <Link href={`${process.env.BASE_URL}/bank-calculator/` + item.bank_slug}>
              <a>
                <figure>
                  <Image className={`imgResponsive`} width={33} height={33} src={process.env.IMAGE_BASEURL + '/images/calculator/' + `${calculatorImg[(Math.floor(Math.random() * calculatorImg.length))]}`} alt={""} />
                </figure>
                <div className={styles.arrowBtn}>
                  <p className={styles.heading}>{item.bank_name + " Calculators"} </p>
                </div>
              </a>
            </Link>
          </div>
        ))}
      </div>

      {showNumberOfCalc < bankCalculators.length ?
        <div className={styles.btncenter}>
          <Button className="btn btn-primary font14 btn25 textCenterSm btnFull" onClick={() => viewMore()}>Show More <em className="icon-arrow-right font14"></em></Button>
        </div>
        : null}

      <div className="container containerFlex mt50">
        {cmsData && cmsData.length > 0 && cmsData[0].post_content && cmsData[0].post_content != '' ?
          <section className={`${contentStyles.eligible} container`}>
            <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35 font14 text444 lineHeight24"></div>
          </section>
          :
          <div className={styles.eligible}>
            <h2>Bank Calculators - An Introduction</h2>
            <p>Bank calculators are online tools that simplify the task of calculating
              interest rates, Equated Monthly Instalments (EMIs), loan eligibility, Public Provident Fund (PPF),
              House Rental Allowance (HRA), and Goods and Services Tax (GST), among others. Each bank provides
              its customers with a bank EMI calculator, which can be used multiple times until the desired result
              is achieved. Several third-party platforms, like Urban Money, also offer this tool free of cost.
              The bank interest calculator is an easy-to-use financial tool with room for zero errors.
            </p>
            <p>Make your finances easy with bank calculators. Understand the tool by going through the entire page.</p>
            <h2>Different Types of Bank Calculators</h2>
            <p>Various bank calculators are available to automate the calculations and ease a users workload. These online calculators cater to a specific financial decision and thus require a unique information set. The bank calculators available to people to meet their financial requirements are explained below        </p>
            <h3>Business Loan EMI Calculator</h3>
            <p>A business loan EMI calculator is a tool that helps you calculate the monthly instalment (EMI) that you have to pay for your business loan. You can enter the loan amount, interest rate, and tenure of the loan, and the calculator will show you the EMI amount, total interest payable, and full payment amount.
            </p>
            <h3>Personal Loan EMI Calculator</h3>
            <p>A personal loan EMI calculator is a tool that helps you plan your monthly budget by showing you how much you have to pay for your loan every month. You can enter the loan amount, interest rate, and duration of the loan, and the calculator will show you the EMI amount, total interest cost, and total repayment amount        </p>
            <h3>Recurring Deposit (RD) Calculator</h3>
            <p>An RD deposit calculator saves the trouble of manually calculating returns and lets an investor know precisely how much their deposits will accrue after the period. The only thing the investor must do manually is the TDS deduction.        </p>
            <h3>Public Provident Fund (PPF) Calculator</h3>
            <p>PPF calculator is an online tool that you can use to determine the returns on your PPF investments. This tool will assist you in making wise investment and tax-saving decisions. It will compute the returns on your assets in fractions of a second.        </p>
            <h3>Fixed Deposit (FD) Calculator</h3>
            <p>The fixed deposit calculator assists an investor in estimating the FD maturity amount for a specific term. Before investing, you can calculate the interest income using an FD calculator. The investment amount, current interest rate, and tenure are all inputs into the FD calculator.</p>
            <h3>Home Loan EMI Calculator</h3>
            <p>A home loan EMI calculator is a tool that helps you estimate the monthly instalment (EMI) that you have to pay for your home loan. You can enter the loan amount, interest rate, and tenure of the loan, and the calculator will show you the EMI amount, total interest payable, and full payment amount. The calculator also helps you compare different loan options and choose the best one.</p>
            <h3>Loan Against Property Calculator</h3>
            <p>A loan against property EMI calculator is a tool that enables you to calculate the monthly instalment (EMI) you must pay for a loan you take by mortgaging your property. You can enter the loan amount, interest rate, and tenure of the loan, and the calculator will show you the EMI amount, total interest payable, and full payment amount. The calculator also helps you check  your eligibility and compare different loan offers.</p>
            <h2>Features and Benefits of Bank Calculators</h2>
            <p>All bank calculators work on simple premises. The calculator has numerous features and benefits that make it an appreciative tool. The widespread usage of this financial tool is due to the reasons mentioned below.</p>
            <ul>
              <li>It is an online tool that can be used multiple times</li>
              <li>The tool is AI-powered. Therefore, the results provided are accurate</li>
              <li>There is no advanced education or knowledge required to operate this tool. It is relatively easy to navigate</li>
              <li>The tool only asks for a little data. For instance, a bank EMI calculator asks for the loan amount, interest rate, and loan tenure to be entered</li>
              <li>There is no error as can be the case with manual calculations </li>
              <li>The bank calculators assist the user in designing their financial budget accordingly.</li>
              <li>By employing a simple mathematical formula, the tool saves you the hassle of doing manual calculations, saving time.
                It is a cost-efficient tool.</li>
              <li>The calculators can be used multiple times, allowing users to compare options and choose the best.</li>
              <li>The banks, through this tool, retain a customer’s satisfaction.</li>
            </ul>

            <h2>How Can These Bank Calculators Help You in Your Financial Decisions?</h2>
            <p>The numerous bank calculators help users get a realistic idea of their finances. For instance, the bank EMI calculator provides users with the monthly instalments they must pay if they choose the entered loan amount, tenure, and interest rate. On the other hand, the bank interest calculator generates the result of the interest earned on fixed and recurring deposits, etc.</p>
            <p>The results generated and displayed by the bank loan interest calculator highly influence an individual’s financial decision. Since the calculators can be used multiple times, the user can compare different amounts, tenure, interest rates, savings, etc., to choose the one that most satisfies them. The bank interest calculator is a handy tool for people who wish to hit the bull’s eye regarding their finances. </p>
            <p>The following table will help our readers better understand the use of the bank interest rate calculator. For instance, if a depositor needs clarification on two fixed deposit schemes, they must use the bank interest rate calculator to get a definite answer.</p>
            <div className={styles.respTable}>
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td>Scheme A</td>
                    <td>Scheme B</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Investment</td>
                    <td>Rs. 1,00,000</td>
                    <td>Rs. 1,00,000</td>
                  </tr>
                  <tr>
                    <td>Rate of Interest</td>
                    <td>7% per annum</td>
                    <td>6.8% per annum</td>
                  </tr>
                  <tr>
                    <td>Deposit Tenure</td>
                    <td>Five years</td>
                    <td>Six years</td>
                  </tr>
                  <tr>
                    <td><strong>Estimated Returns</strong></td>
                    <td><strong>Rs. 41,478</strong></td>
                    <td><strong>Rs. 49,866</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p>From the table, scheme A returns Rs. 1,41,718, and scheme B returns Rs. 1,49,866 on the same deposit amount of Rs. 1 lakh. The depositor chooses scheme B as their aim is savings and audibly pays gratitude to the bank interest calculator for helping them make their financial decision.            </p>
            <h2>What is The Use of An EMI calculator?            </h2>
            <p>The EMI, or Equated Monthly Instalment, is a set payment given to the lender by the borrower each month to repay the loan taken. The bank EMI calculator is a helpful tool allowing borrowers to determine the monthly amount they owe. The bank loan interest calculator can calculate the EMI amount on a vehicle loan, a home loan, a bike loan, and a personal loan, among others. The borrower can witness their monthly payments for their loans.            </p>
            <p>The bank EMI calculator requires the user to enter data in the boxes, including the loan amount, loan tenure (in months), and interest rate. In most bank interest calculators , the user must scroll a slider until the desired data is displayed on the screen. The bank EMI calculator shows how much a borrower must pay off each month to repay the loan within the time frame they have chosen.            </p>
            <p>The calculator employs a mathematical formula to generate the required result. </p>
            <p>EMI = P × r × (1 + r)n/((1 + r)n - 1)</p>
            <p>Here, ‘EMI’ stands for the Equated Monthly Instalment, ‘P’ stands for the principal amount, ‘r’ stands for the interest rate, and ‘n’ stands for the loan tenure. </p>
            <p>The following table will help our readers better understand the use of the bank EMI calculator.</p>
            <div className={styles.respTable}>
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td>Lender   A</td>
                    <td>Lender   B</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Principal Amount (P)</td>
                    <td>10,00,000</td>
                    <td>10,00,000</td>
                  </tr>
                  <tr>
                    <td>Rate of Interest</td>
                    <td>10% per annum</td>
                    <td>12% per annum</td>
                  </tr>
                  <tr>
                    <td>Loan Tenure</td>
                    <td>24 months</td>
                    <td>36 months</td>
                  </tr>
                  <tr>
                    <td><strong>Equated Monthly Instalment (EMI)</strong></td>
                    <td><strong>Rs. 46,145</strong></td>
                    <td><strong>Rs. 33,214</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>The EMI has been calculated using the EMI calculator. We gather that the borrower, for the same loan amount, has to pay a higher EMI amount for a lesser tenure and interest rate than the EMI on a higher interest rate and term. Therefore, the bank EMI calculator saved the borrower by comparing the two lenders.            </p>
            <h2>What Information is Required to Calculate The EMI?</h2>
            <p>Each type of bank calculator requires different information to be entered with respect to the calculation. For instance, if a user wishes to calculate interest on their fixed deposit, they must use the bank interest rate calculator to gather the desired result. On the other hand, if an individual wishes to get a clear view of their EMI on a home loan, they must use the bank EMI calculator and enter the loan amount, tenure, and interest rate.</p>
            <p>Let us look closer at the information the bank loan interest calculator requires to calculate the EMI on a loan.</p>

            <h3>Loan Amount</h3>
            <p> The loan amount can be defined as the principal or actual amount borrowed to purchase a home, car, or other requirement. This loan amount is determined by several factors relating to the loan application and the purchase price. The interest is calculated on the principal amount of the loan: the more the loan amount, the greater the monthly EMI. The principal amount a borrower desires to borrow should be entered into the bank EMI calculator in the loan amount field.</p>
            <h3>Loan Tenure</h3>
            <p> The loan tenure refers to the overall time duration of loan payback. Loan terms vary depending on the type of loan, the loan principal, and the lender from whom you borrow. Personal loans, for example, have shorter repayment terms of up to five years, whilst home loans have longer repayment terms of up to 25-30 years. The longer the loan term, the more interest the borrower will pay and, consequently, the higher the EMIs.</p>
            <h3>Interest Rate</h3>
            <p> It is the interest rate levied on the amount lent to the borrower. The interest rate also fluctuates from loan to loan, depending on the amount lent and from lender to lender. Before making a final decision on a loan, evaluating the interest rates given by different lenders is advisable. The EMI varies depending on whether the loan has a fixed, variable, or hybrid interest rate.</p>


          </div>

        }
        <RightSideBar menuLinks={internalLinkEmiCalculator} paddingTop={true} />
      </div>
      {faq_json && faq_json.length > 0 ?
        <section className="faq">
          <div className="container">
            <h2 className="faqHeading font24">Frequently Asked Questions (FAQs)</h2>
            <div className="faqBx">
              <FAQ data={faq_json} />
            </div>
          </div>
        </section>
        : null}
    </>
  )
}