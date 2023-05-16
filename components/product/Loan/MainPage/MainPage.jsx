import styles from "./MainPage.module.css";
import { BreadCrumb, InterestRate, QuickLinks } from "../../../shared";
import { useState } from "react";
const breadCrumbLinks = [
  {
    "text": "Loans",
    "path": ""
  }
]
export function MainPage({data}) {
  const [ activeTab, setActiveTab ] = useState(0);
  if (!data || data.length == 0)
  return null;
  const handleClick = (e, index) => {
    setActiveTab(index);
  };
  const quickLinksData = [
    {
      "text": "Investment",
      "color": "Blue",
      "child": [
        {
          "text": "Credit Score",
          "path": `/credit-score`
        },
        {
          "text": "Today Gold Rate",
          "path": `/gold-rate`
        },
        {
          "text": "Today Silver Rate",
          "path": `/silver-rate`
        },
        {
          "text": "Mutual Fund",
          "path": `/mutual-funds`
        }
      ]
    },
    {
      "text": "Loan Product",
      "color": "Purple",
      "child": [
        {
          "text": `Home Loan`,
          "path": `/loans/home-loan`
        },
        {
          "text": `Personal Loan`,
          "path": `/loans/personal-loan`
        },
        {
          "text": `Business Loan`,
          "path": `/loans/business-loan`
        },
        {
          "text": `Loan Against Property`,
          "path": `/loans/loan-against-property`
        }
      ]
    },
    {
      "text": "Bank Product",
      "color": "Green",
      "child": [
        {
          "text": `Axis Bank`,
          "path": `/banks-in-india/axis-bank`
        },
        {
          "text": `Axis Bank Personal Loan`,
          "path": `/banks-in-india/axis-bank/personal-loan`
        },
        {
          "text": `Axis Bank Home Loan`,
          "path": `/banks-in-india/axis-bank/home-loan`
        },
        {
          "text": `Axis Bank Loan Against Property`,
          "path": `/banks-in-india/axis-bank/loan-against-property`
        },
        {
          "text": `Axis Bank Business Loan`,
          "path": `/banks-in-india/axis-bank/business-loan`
        },
        {
          "text": `ICICI Bank`,
          "path": `/banks-in-india/icici-bank`
        },
        {
          "text": `ICICI Bank Personal Loan`,
          "path": `/banks-in-india/icici-bank/personal-loan`
        },
        {
          "text": `ICICI Bank Home Loan`,
          "path": `/banks-in-india/icici-bank/home-loan`
        },
        {
          "text": `ICICI Bank Loan Against Property`,
          "path": `/banks-in-india/icici-bank/loan-against-property`
        },
        {
          "text": `ICICI Bank Business Loan`,
          "path": `/banks-in-india/icici-bank/business-loan`
        },
        {
          "text": `State Bank of India`,
          "path": `/banks-in-india/state-bank-of-india`
        },
        {
          "text": `SBI Personal Loan`,
          "path": `/banks-in-india/state-bank-of-india/personal-loan`
        },
        {
          "text": `SBI Home Loan`,
          "path": `/banks-in-india/state-bank-of-india/home-loan`
        },
        {
          "text": `SBI Loan Against Property`,
          "path": `/banks-in-india/state-bank-of-india/loan-against-property`
        },
        {
          "text": `SBI Business Loan`,
          "path": `/banks-in-india/state-bank-of-india/business-loan`
        }
      ]
    },
    {
      "text": "Calculator",
      "color": "Pink",
      "child": [
        {
          "text": `Home Loan EMI Calcualtor`,
          "path": `/loans/home-loan/emi-calculator`
        },
        {
          "text": `Home Loan Balance Transfer Calulator`,
          "path": `/loans/home-loan/balance-transfer-calculator`
        },
        {
          "text": `Home Loan Pre Payment Calculator`,
          "path": `/home-loan/pre-payment-calculator`
        },
        {
          "text": `SBI Home Loan Calculator`,
          "path": `/bank-calculator/state-bank-of-india/home-loan-calculator`
        },
        {
          "text": `SBI Personal Loan Calculator`,
          "path": `/bank-calculator/state-bank-of-india/personal-loan-calculator`
        },
        {
          "text": `HDFC Personal Loan Calculator`,
          "path": `/bank-calculator/hdfc-bank/personal-loan-calculator`
        },
        {
          "text": `HDFC RD Calculator`,
          "path": `/bank-calculator/hdfc-bank/rd-calculator`
        },
        {
          "text": `ICICI Home Loan Calculator`,
          "path": `/bank-calculator/icici-bank/home-loan-calculator`
        },
        {
          "text": `ICICI Personal Loan Calcualtor`,
          "path": `/bank-calculator/icici-bank/personal-loan-calculator`
        },
        {
          "text": `ICICI FD Calculator`,
          "path": `/bank-calculator/icici-bank/fd-calculator`
        },
        {
          "text": `Axis Bank Home Loan Calculator`,
          "path": `/bank-calculator/axis-bank/home-loan-calculator`
        },
        {
          "text": `Axis Bank Personal Loan Calcualtor`,
          "path": `/bank-calculator/axis-bank/personal-loan-calculator`
        },
        {
          "text": `Axis Bank FD Calculator`,
          "path": `/bank-calculator/axis-bank/fd-calculator`
        }
      ]
    }
  ]
  return( 
    <>
      <div className="container">	
        <BreadCrumb links={breadCrumbLinks} />
        <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">
        Our Products
        </h1>
        <p className="font14 text444 mb30 lineHeight24">Urban Money comprehends a wide range of financial needs and provides a great deal of financial products to meet them right away. We open the finest paths to 50+ lenders offering home loans, business loans, personal loans, and a loan against property, being your true mortgage specialist. Obtain quick approvals by meeting the bare minimum of eligibility requirements. Seamless disbursements, and flexible loan repayment periods from leading credit providers can help you meet your financial responsibilities.</p>
      </div>
      <section className={`${styles.tabSection}  mb20`}>
        <div className={`${styles.tabElement} container`}>
          <ul>
            {data.map((item, index) =>
              <li key={index} className={`${activeTab === index ? styles.active : ''}`} onClick={(e) => handleClick(e, index)}><a href={`#${item.productSlug}`}>{item.productName}</a></li>
            )}
          </ul>
        </div>
      </section>
      {data.map((item, index) =>
      <>
      <div className="container" id={item.productSlug} key={index}>
        <section className="bankLoanDetail">
          <h2 className="font24 mb30 text2828 Innerheading fontMedium lineHeight36 ">{item.productName}</h2>
          <div className="bankText mb20">
            <p className="font14  text444 mb30 lineHeight24" dangerouslySetInnerHTML={{__html: item.shortDescription}}></p>
          </div>
            <InterestRate interestRates={[...[], item]} allLoans={ true}/>
          <p className="font14 text444 lineHeight24 mb20 mt20" dangerouslySetInnerHTML={{__html: item.description}}></p>  
        </section>
      </div>
      <QuickLinks color={quickLinksData[index].color} keyNumber={index} menuLinks={quickLinksData[index]} />
      </>
      )}
    </>
  );
}
