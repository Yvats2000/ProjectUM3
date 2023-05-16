import styles from "../calculator.module.css";
import React, { useEffect, useState } from 'react';
import Image from "next/image";
import {CreditScore,BreadCrumb, FAQ, LeadPopup, PopUp, InternalBlog} from "../../shared";
import { preCal } from "../../../services/calculators";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import {Doughnut} from 'react-chartjs-2';
import commonFunctions from '../../../utils/CommonFunctions';
import { PrePaymentContent as HLContent } from "../HomeLoan";
import { PrePaymentContent as BLContent } from "../BusinessLoan";
import { PrePaymentContent as PLContent } from "../PersonalLoan";
import { NavLink } from "../../ui";
import { RightSideBar } from '../../shared'
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import {useRouter} from "next/router";
import { PrePaymentCalculator } from "./PrePaymentCalculator";
export const PrePayment = ({loanType,calculatorType, title, calculation,cmsData, blogsData, rightNavBar}) => {
  const router = useRouter()
  const name = router.query.loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
  //Financial calculators Box
  let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))
  const internalLinkEmiCalculator = [
    {
      "text": "Calculator Types",
      "child": [
        {
          "text": "Balance Transfer",
          "path": `/loans/${loanType}/balance-transfer-calculator`
        },
        {
          "text": "EMI Transfer",
          "path": `/loans/${loanType}/emi-calculator`
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
    }
  ]
  if(loanType === 'home-loan'){
    internalLinkEmiCalculator.unshift(
      {
        "text": "Interest Rates",
        "child": [
          {
            "text": `${name} Interest Rates`,
            "path": `/loans/${loanType}/interest-rate`
          }
        ]
      }
    )
    internalLinkEmiCalculator.unshift( {
      "text": "Top 10 Banks",
      "child": [
        {
          "text": "IDFC FIRST Bank",
          "path": "/banks-in-india/idfc-first-bank"
        },
        {
          "text": "HDFC Bank",
          "path": "/banks-in-india/hdfc-bank"
        },
        {
          "text": "Axis Bank",
          "path": "/banks-in-india/axis-bank"
        },
        {
          "text": "kotak Bank",
          "path": "/banks-in-india/kotak-bank"
        },
        {
          "text": "ICICI Bank",
          "path": "/banks-in-india/icici-bank"
        },
        {
          "text": "Yes Bank",
          "path": "/banks-in-india/yes-bank"
        },
        {
          "text": "IndiaBulls",
          "path": "/banks-in-india/indiabulls"
        },
        {
          "text": "Deutsche Bank",
          "path": "/banks-in-india/deutsche-bank"
        },
        {
          "text": "Standard Chartered Bank",
          "path": "/banks-in-india/standard-chartered-bank"
        },
        {
          "text": "L&T Finance",
          "path": "/banks-in-india/lt-finance"
        }
      ]
    }
)
}else if(loanType === 'personal-loan'){
  internalLinkEmiCalculator.unshift(
    {
      "text": "Interest Rates",
      "child": [
        {
          "text": `${name} Interest Rates`,
          "path": `/loans/${loanType}/interest-rate`
        }
      ]
    }
  )
  internalLinkEmiCalculator.unshift({
    "text": "Top 10 Banks",
    "child": [
       {
        "text": "HDFC Bank",
        "path": "/banks-in-india/hdfc-bank"
      }, 
      {
        "text": "ICICI Bank",
        "path": "/banks-in-india/icici-bank"
      },        
      {
        "text": "Axis Bank",
        "path": "/banks-in-india/axis-bank"
      },
      {
        "text": "IDFC FIRST Bank",
        "path": "/banks-in-india/idfc-first-bank"
      },
     {
        "text": "Yes Bank",
        "path": "/banks-in-india/yes-bank"
      },
      {
        "text": "Fullerton India",
        "path": "/banks-in-india/fullerton-india"
      },
      {
        "text": "InCred Financial Services",
        "path": "/banks-in-india/incred-financial-services"
      },
      {
        "text": "Hero FinCorp",
        "path": "/banks-in-india/hero-fincorp"
      },
      {
        "text": "Standard Chartered Bank",
        "path": "/banks-in-india/standard-chartered-bank"
      },
      {
        "text": "Poonawalla Credit Pvt Ltd",
        "path": "/banks-in-india/poonawalla-credit-pvt-ltd"
      }
    ]
  }
)
}else if(loanType === 'business-loan'){
  internalLinkEmiCalculator.unshift({
    "text": "Top 10 Banks",
    "child": [
      {
        "text": "Axis Bank",
        "path": "/banks-in-india/axis-bank"
      },
      {
        "text": "kotak Bank",
        "path": "/banks-in-india/kotak-bank"
      },
      {
        "text": "HDFC Bank",
        "path": "/banks-in-india/hdfc-bank"
      },      
     
      {
        "text": "Yes Bank",
        "path": "/banks-in-india/yes-bank"
      },
      {
        "text": "IndiaBulls",
        "path": "/banks-in-india/indiabulls"
      },
      {
        "text": "Deutsche Bank",
        "path": "/banks-in-india/deutsche-bank"
      },
      {
        "text": "Standard Chartered Bank",
        "path": "/banks-in-india/standard-chartered-bank"
      },
      {
        "text": "L&T Finance",
        "path": "/banks-in-india/lt-finance"
      },
      {
        "text": "Tata Capital Financial Services LTD",
        "path": "/banks-in-india/tata-capital-financial-services-ltd"
      },
      {
        "text": "Hero FinCorp",
        "path": "/banks-in-india/hero-fincorp"
      }
      ]
  }
)
} else {
  internalLinkEmiCalculator.unshift( {
    "text": "Top 10 Banks",
    "child": [
      {
        "text": "IDFC FIRST Bank",
        "path": "/banks-in-india/idfc-first-bank"
      },
      {
        "text": "HDFC Bank",
        "path": "/banks-in-india/hdfc-bank"
      },
      {
        "text": "Axis Bank",
        "path": "/banks-in-india/axis-bank"
      },
      {
        "text": "kotak Bank",
        "path": "/banks-in-india/kotak-bank"
      },
      {
        "text": "ICICI Bank",
        "path": "/banks-in-india/icici-bank"
      },
      {
        "text": "Yes Bank",
        "path": "/banks-in-india/yes-bank"
      },
      {
        "text": "IndiaBulls",
        "path": "/banks-in-india/indiabulls"
      },
      {
        "text": "Deutsche Bank",
        "path": "/banks-in-india/deutsche-bank"
      },
      {
        "text": "Standard Chartered Bank",
        "path": "/banks-in-india/standard-chartered-bank"
      },
      {
        "text": "L&T Finance",
        "path": "/banks-in-india/lt-finance"
      }
    ]
  }
)
}
interLinkingFinancialArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingFinancialArray);
  const [productName, setProductName] = useState('');
  const [openLeadPopup, setLeadPopup] = useState(false);
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
  let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
  const [pre, setPreDetails] = useState({
    loanAmount : calculation.loanAmount.defaultValue,
    tenure : calculation.tenure.defaultValue,
    rate : calculation.rate.defaultValue,
    prepayament:calculation.prepayament.defaultValue,
    numberofemi:calculation.numberofemi.defaultValue,
  })

  useEffect(async() =>{
    await getBalance()
  },[])

  const[banks, setBanks] = useState({})

  const breadCrumbLinks = [
    {
      "text": "Calculators",
      "path": "/calculator",
      "class": ""
    },    
    {
      "text": title + " Pre-payment Calculator",
      "path": "/loans/"+loanType+"/"+calculatorType,
      "class": ""
    }
   ]

   const  checkemiFields =() =>{
    let check=true
    for (let key in pre){
      if(pre[key]==''|| pre[key]==undefined){
       check=false
      }
    }
    return check
  }
  const getBalance = async() => {
    if(checkemiFields()){
      let data = {
        principal : pre.loanAmount,
        rate : pre.rate,
        tenureInMonths :  pre.tenure*12,
        noOfEmiPaid : pre.numberofemi,
        prePaymentAmount : pre.prepayament
      }
      let balcal = await preCal(data)
      setBanks(balcal.data)
    }
  };

  const handleChange = (e, maxValue) => {
    const { name, value} = e.target;
    if(value)value=value.toString().replace(/,/g,"");
    if (parseInt(value) > parseInt(maxValue)){
      value = maxValue;
    }
    setPreDetails({ ...pre, [name]: value });			
  };

  const debounced = function (fn, d) {
    let timer;
    return function () {
        let context = this,
        args = arguments;
        clearInterval(timer);
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, d)
    }
  }

  const betterFunction = debounced(getBalance, 0.5)

  

  const renderSwitch = (loanType) => {
    switch (loanType) {
      case 'home-loan':
      return (
        <HLContent />
      )
      case 'personal-loan':
      return (
        <PLContent />
      )
      case 'business-loan':
      return (
        <BLContent />
      )
      default:
      return (
        <></>
      )
    }
  }

  var validate = (value) => {
    let p1 = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
    return p1
  }

  return (
  <>
    <div className="container">
    <BreadCrumb links={breadCrumbLinks} />
    </div>
    <section className="calculator">
      <div className="container">
        <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">{title} Pre-payment Calculator</h1>
        <div className={styles.buttonTab}>
          <NavLink href={`${process.env.BASE_URL}/loans/`+loanType+"/emi-calculator"}><button className={calculatorType === "emi-calculator" ? `${styles.active}` : ""}><figure><Image src={process.env.IMAGE_BASEURL + '/images/emi.svg'} width={19} height={18}  className="imgResponsive" alt="emi svg" /></figure> EMI Calculator</button></NavLink>
          <NavLink href={`${process.env.BASE_URL}/loans/`+loanType+"/balance-transfer-calculator"}><button className={calculatorType === "balance-transfer-calculator" ? `${styles.active}` : ""}> <figure><Image src={process.env.IMAGE_BASEURL + '/images/bt.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" /></figure>Balance Transfer</button></NavLink>
          <NavLink href={`${process.env.BASE_URL}/loans/`+loanType+"/pre-payment-calculator"}><button className={calculatorType === "pre-payment-calculator" ? `${styles.active}` : ""}><figure><Image src={process.env.IMAGE_BASEURL + '/images/pre-pay.svg'} width={19} height={19}  className="imgResponsive" alt="prepay svg" /></figure> Pre - Payment</button></NavLink>
        </div>
        <PrePaymentCalculator calculatorType={calculatorType} title={title} calculation={calculation}/>
      </div>
    </section>
    <div className="container containerFlex">
      <section className={cmsStyles.eligible}>
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
        </div>
      </section>
      <RightSideBar menuLinks = {internalLinkEmiCalculator} paddingTop={true}/>
    </div>
    <CreditScore />
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
    <InternalBlog loanType={name} data={blogsData} />
  </>    
  );
};
