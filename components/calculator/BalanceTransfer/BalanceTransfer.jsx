import styles from "../calculator.module.css";
import Image from "next/image";
import React, {useEffect, useState} from 'react';
import {CreditScore,BreadCrumb, FAQ, InternalBlog} from "../../shared";
import InputText from '../../../form/inputText'
import { isNumeric, isyear, isRate, isPincode, isNoEmi } from '../../../form/inputValidators'
import { balanceCal } from "../../../services/calculators";
import { InterestRate }  from "../../shared";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import {Doughnut} from 'react-chartjs-2';
import commonFunctions from '../../../utils/CommonFunctions';
import { BalanceTransferContent as HLContent } from "../HomeLoan";
import { BalanceTransferContent as BLContent } from "../BusinessLoan";
import { BalanceTransferContent as PLContent } from "../PersonalLoan";
import { NavLink } from "../../ui";
import { RightSideBar } from '../../shared'
import {useRouter} from "next/router";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";

export const BalanceTransfer = ({loanType,calculatorType, title, calculation,cmsData, blogsData, rightNavBar}) => {
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
          "text": "PrePayment Calculator",
          "path": `/loans/${loanType}/pre-payment-calculator`
        },
        {
          "text": "EMI Transfer",
          "path": `/loans/${loanType}/emi-calculator`
        }
      ]
    },{
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
  })
}else if(loanType === 'business-loan'){
  internalLinkEmiCalculator.unshift(
  {
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
  internalLinkEmiCalculator.unshift(
    {
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
  
  const [balance, setbalance] = useState({
    loanAmount : calculation.loanAmount.defaultValue,
    rate : calculation.rate.defaultValue,
    tenureInMonths : calculation.tenureInMonths.defaultValue,
    noOfEmiPaid : calculation.noOfEmiPaid.defaultValue,
    exceptedRate : calculation.exceptedRate.defaultValue,
  });

  useEffect(async() =>{
    await getBalance()
  },[])

  const breadCrumbLinks = [
    {
      "text": "Calculators",
      "path": "/calculator",
      "class": ""
    },
    {
      "text": title + " Balance Transfer Calculator",
      "path": "/loans/"+loanType+"/"+calculatorType,
      "class": ""
    }
  ]
  const[banks, setBanks] = useState({})

  const  checkemiFields =() =>{
    let check=true
    for (let key in balance){
      if(balance[key]==''|| balance[key]==undefined){
      check=false
      }
    }
    return check
  }

  const getBalance = async() => {
    if(checkemiFields()){
      //setBanks({})
      let data = {
        loanAmount : balance.loanAmount,
        rate : balance.rate,
        tenureInMonths :  balance.tenureInMonths*12,
        noOfEmiPaid : balance.noOfEmiPaid,
        exceptedRate : balance.exceptedRate,
        productName : title + " Balance Transfer"
      }
      let balcal = await balanceCal(data)
      setBanks({})
      setBanks(balcal.data)
    }
  };

  const handleChange = (e, maxValue) => {
    const { name, value} = e.target;
    if(value)value=value.toString().replace(/,/g,"");
    if (parseInt(value) > parseInt(maxValue)){
      value = maxValue;
    }
    setbalance({ ...balance, [name]: value });		
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

  const scrollTo = () => {
    var element = document.getElementById('bankOffers');
    var headerOffset = 70;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });   
  }
  
  return (
  <>
    <div className="container">
      <div className="breadCrumb">
      <BreadCrumb links={breadCrumbLinks} />
      </div>
    </div>
    <section className="calculator">
      <div className="container">
        <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">{title} Balance Transfer Calculator</h1>
        <div className={styles.buttonTab}>
          <NavLink href={`${process.env.BASE_URL}/loans/`+loanType+"/emi-calculator"}><button className={calculatorType === "emi-calculator" ? `${styles.active}` : ""}><figure><Image src={process.env.IMAGE_BASEURL + '/images/emi.svg'} width={19} height={18}  className="imgResponsive" alt="emi svg" /></figure> EMI Calculator</button></NavLink>
          <NavLink href={`${process.env.BASE_URL}/loans/`+loanType+"/balance-transfer-calculator"}><button className={calculatorType === "balance-transfer-calculator" ? `${styles.active}` : ""}> <figure><Image src={process.env.IMAGE_BASEURL + '/images/bt.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" /></figure>Balance Transfer</button></NavLink>
          <NavLink href={`${process.env.BASE_URL}/loans/`+loanType+"/pre-payment-calculator"}><button className={calculatorType === "pre-payment-calculator" ? `${styles.active}` : ""}><figure><Image src={process.env.IMAGE_BASEURL + '/images/pre-pay.svg'} width={19} height={19}  className="imgResponsive" alt="prepay svg" /></figure> Pre - Payment</button></NavLink>
        </div>
        <div className={styles.calcBox}>
          <div className="form-container w100 ptl15Sm">
            <div className="raidoInputBox mb20">
              <NavLink href={`${process.env.BASE_URL}/loans/` + "home-loan" + "/" + calculatorType}>
                <label className="radioInput text313541">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="homeLoan"
                    defaultChecked={title === "Home Loan" ? "checked" : ""}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12">Home Loan</span>
                </label>
              </NavLink>
              <NavLink href={`${process.env.BASE_URL}/loans/` + "personal-loan" + "/" + calculatorType}>
                <label className="radioInput text313541">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="personalLoan"
                    defaultChecked={title === "Personal Loan" ? "checked" : ""}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12">Personal Loan</span>
                </label>
              </NavLink>
              <NavLink href={`${process.env.BASE_URL}/loans/` + "business-loan" + "/" + calculatorType}>
                <label className="radioInput text313541">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="businessLoan"
                    defaultChecked={title === "Business Loan" ? "checked" : ""}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12">Business Loan</span>
                </label>
              </NavLink>
            </div>
          </div>
          <div className={styles.calc}>
            <div className={`${styles.rangecalc} ${styles.balancemarg}`}>
              <div className={styles.calcValues}>
                <label>Loan Amount</label>
                <div className={styles.inputGrp}>
                  <span className={styles.Sign}>₹</span>
                  <InputText 
                    type="text" 
                    name="loanAmount" id="" 
                    className={`${styles.calcValuesInput}`} 
                    value= {parseInt(balance.loanAmount || 0).toLocaleString('en-IN')}
                    handleChange={e=>handleChange(e,calculation.loanAmount.maxValue)}
                    validateInput={isPincode}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                  />
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input 
                  type="range" 
                  className="slider maxl"
                  min={calculation.loanAmount.minValue} 
                  max={calculation.loanAmount.maxValue}
                  name="loanAmount"
                  value={balance.loanAmount} 
                  onChange={e=>handleChange(e,calculation.loanAmount.maxValue)} 
                  onMouseUp={betterFunction}
                  onTouchEnd={betterFunction}
                 />
                <ul className={styles['range-labels']}>
                  <li>{calculation.loanAmount.minText}</li>
                  <li>{calculation.loanAmount.maxText}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.balancemarg}`}>
              <div className={styles.calcValues}>
                <label>Loan Tenure</label>
                <div className={styles.inputGrp}>                  
                <InputText 
                    type="number" 
                    name="tenureInMonths" id="" 
                    className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                    value={balance.tenureInMonths} 
                    handleChange={e=>handleChange(e,calculation.tenureInMonths.maxValue)}
                    validateInput={isyear}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    />
                  <span className={styles.Sign}>Years</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input 
                  type="range" 
                  className="slider minl" 
                  min={calculation.tenureInMonths.minValue} 
                  max={calculation.tenureInMonths.maxValue} 
                  name="tenureInMonths" 
                  value={balance.tenureInMonths} 
                  onChange={e=>handleChange(e,calculation.tenureInMonths.maxValue)}
                  onMouseUp={betterFunction}
                  onTouchEnd={betterFunction}
                  />
                <ul className={styles["range-labels"]}>
                  <li>{calculation.tenureInMonths.minText}</li>
                  <li>{calculation.tenureInMonths.maxText}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.balancemarg}`}>
              <div className={styles.calcValues}>
                <label>Current Rate Of Interest</label>
                <div className={styles.inputGrp}>
                <InputText 
                    type="number" 
                    name="rate" id="" 
                    className={`${styles.calcValuesInput} ${styles.ratel}`}  
                    value={validate(balance.rate)} 
                    handleChange={e=>handleChange(e,calculation.rate.maxValue)}
                    validateInput={isRate}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    />
                  <span className={styles.Sign}>%</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input type="range" className="slider minl " 
                min={calculation.rate.minValue} 
                max={calculation.rate.maxValue}  
                name="rate" 
                 value={balance.rate} 
                 onChange={e=>handleChange(e,calculation.rate.maxValue)}
                 onMouseUp={betterFunction}
                 onTouchEnd={betterFunction}
                 step={0.05}
                 />
                <ul className={styles["range-labels"]}>
                  <li>{calculation.rate.minText}</li>
                  <li>{calculation.rate.maxText}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.balancemarg}`}>
              <div className={styles.calcValues}>
                <label>Expected Rate Of Interest</label>
                <div className={styles.inputGrp}>
                <InputText 
                    type="number" 
                    name="exceptedRate" id="" 
                    className={`${styles.calcValuesInput} ${styles.ratel}`}  
                    value={validate(balance.exceptedRate)} 
                    handleChange={e=>handleChange(e,balance.rate)}
                    validateInput={isRate}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    />
                  <span className={styles.Sign}>%</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input type="range" className="slider minl " 
                min={calculation.exceptedRate.minValue} 
                max={balance.rate}  
                name="exceptedRate" 
                 value={balance.exceptedRate} 
                 onChange={e=>handleChange(e,balance.rate)}
                 onMouseUp={betterFunction}
                 onTouchEnd={betterFunction}
                 step={0.05}
                 />
                <ul className={styles["range-labels"]}>
                  <li>{calculation.exceptedRate.minText}</li>
                  <li>{balance.rate}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.balancemarg}`}>
              <div className={styles.calcValues}>
                <label>Number Of EMI&apos;s Paid</label>
                <div className={styles.inputGrp}>
                  <InputText 
                  type="number"
                  name="noOfEmiPaid" 
                  id="" 
                  className={`${styles.calcValuesInput} ${styles.lwidth}`}  
                  value={balance.noOfEmiPaid} 
                  handleChange={e=>handleChange(e,balance.tenureInMonths * 12 - 1)}
                  validateInput={isNoEmi}
                  handleBlur={betterFunction}
                  onMouseOver={betterFunction}
                />
                  <span className={styles.Sign}>EMI</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
                  <input type="range" 
                  className="slider minl"
                   min={calculation.noOfEmiPaid.minValue} 
                  //  max={calculation.noOfEmiPaid.maxValue}
                   max={balance.tenureInMonths * 12 - 1}
                   name="noOfEmiPaid" 
                   value={balance.noOfEmiPaid} 
                   onChange={e=>handleChange(e,balance.tenureInMonths * 12 - 1)}
                   onMouseUp={betterFunction}
                   onTouchEnd={betterFunction}
                   />
                  <ul className={styles['range-labels']}>
                    <li>{calculation.noOfEmiPaid.minText}</li>
                    {/* <li>{calculation.noOfEmiPaid.maxText}</li> */}
                    <li>{balance.tenureInMonths * 12 - 1}</li>
                  </ul>
                </div>
            </div>
         
          </div>
          <div className={styles.newcalcDetails}>
          <p className="font12  text7c7f87 fontsemiBold mb20 type widthadj">Total Savings</p>
            {banks.totalSavingAsPerExceptedRoi && <div className={styles.totalamt}>
              <sup className={styles.rupee}>₹</sup>
              <span className={styles.price}>{parseInt(banks.totalSavingAsPerExceptedRoi).toLocaleString('en-IN')}</span>
            </div>}
            <p className="font12 lineHeight20 fontStyleItalic text7c7f87 fontsemiBold textCenter type widthadj">{commonFunctions.convertNumberToWords(banks.totalSavingAsPerExceptedRoi ? parseInt(banks.totalSavingAsPerExceptedRoi).toLocaleString('en-IN') : '')}</p>
          </div>
          <div className={styles.calcDetail}>

            <p className="font18 textCenter fontsemiBold text181d mb30">
            Key Takeaways:
            </p>
            <div className={styles['chart-container']}>
              <Doughnut data={{labels: [],datasets: [{data: [banks && banks.currentEmi  ? parseInt(banks.currentEmi) : '', banks &&  banks.revisedEmiDetails ? parseInt(banks.revisedEmiDetails.emi) : ''],backgroundColor: ['rgba(255, 67, 86, 1)','rgba(59, 65, 158, 1)']}]}} options={{rotation: -90,circumference: 180}} />
            </div>
            {/* <figure className={styles.piechart}>
              <img src="/assets/images/pie chart.svg" className="imgResponsive" alt=""  />
            </figure> */}
            <div className={styles.calculatevalues}>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}> Current EMI </p>
                </div>
                <p className={styles.amt}>{ banks.currentEmi ? '₹' + parseInt(banks.currentEmi).toLocaleString('en-IN') : '' }</p>
              </div>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}>Revised EMI</p>
                  
                </div>
                <p className={styles.amt}>{ banks.revisedEmiDetails ? '₹' + parseInt(banks.revisedEmiDetails.emi).toLocaleString('en-IN') : '' }</p>
              </div>
              <div className={`${styles.amount} ${styles.total}`}>
                <p className={styles.info} >Total Savings</p>
                 <p className={styles.amt}>{ banks.totalSavingAsPerExceptedRoi ? '₹' + parseInt(banks.totalSavingAsPerExceptedRoi).toLocaleString('en-IN') : '' }</p>
               </div>
            </div>
            {banks && Object.keys(banks).length > 0 ? <button onClick={() => scrollTo()} className="btn font12 btn25 textCenterSm">
              View Offers<em className="icon-arrow-right font14"></em>
            </button> : null}
          </div>
        </div>
      </div>
    </section>
    <section className="content" id="bankOffers">
      <div className="container">
        {banks && Object.keys(banks).length > 0 ? <InterestRate interestRates={[...[], banks]} emi={true} /> : null}
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
