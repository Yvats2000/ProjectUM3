import React , {useState, useEffect} from 'react';
import styles from "../calculator.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import InputText from '../../../form/inputText';
import { isNumeric, isyear, isRate, isPincode } from '../../../form/inputValidators';
import {swpCal} from '../../../services/calculators'
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import Validation from '../../../form/Validation';


export const SukanyaYojanaCalculator = ({cmsData,rightNavBar}) => {  
  const [details, setDetails] = useState({
  totalInvestment: '50000',
  timePeriod: '21',
  expectedReturnRate: '7.6',
  girlAge:5,
  startperiod:"2023"
  })
  const [data, setData] = useState({})
  //Financial calculators Box
  let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))
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
      "text": "Calculators",
      "path": "/calculator",
      "class": ""
    },    
    {
      "text": "Sukanya Samriddhi Yojana Calculator",
      "path": "/calculator/sukanya-samriddhi-yojana-calculator",
      "class": ""
    }
   ]

   useEffect(async() =>{
    await getBalance()
  },[details])

  const isAllowed = (value, type) => {
    switch (type){
      case 'totalInvestment':
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 11);

      default:
        return  true;
    }
  }

  const handleChange = (e) => {
    let { name, value, max } = e.target;
    if (value) value = value.toString().replace(/,/g, "");
    if (parseInt(value) > parseInt(max)) {
      value = max;
    }
    let isValid=isAllowed(value, name)
    if (isValid){
      setDetails({ ...details, [name]: value });
    }
  
  };
  
  const checkemiFields =() =>{
    let check=true
    for (let key in details){
      if(details[key]==''|| details[key]==undefined){
       check=false
      }
    }
    return check
  }
  const getBalance = async() => {
    if(checkemiFields()){
      let principal=details && details.totalInvestment;
      let time=details && details.timePeriod;
      let rate=details && details.expectedReturnRate;
      // A = P (1 + r/n) ^ nt
      let sum=0;
      for (var i=22;i>7;i--)
      {
          let amt=principal * ((1+(rate/100)) ** (i-1))
          sum=sum + amt;
      }
      let investedamt=principal * 15;

      setData({
        result:sum,
        investedamt:investedamt,
        wealthGained:sum+investedamt
      })
    }
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

  var validate = (value) => {
    let p1 = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
    return p1
}

  return (
    <>
    <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
      <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">Sukanya Samriddhi Yojana (SSY) Calculator</h1>
      {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
      <div className={styles.calcwrap}>
        <div className={styles.calculator}>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Yearly Investment</label>
                  <div className={styles.inputGrp} >
                    <span className={styles.Sign}>₹</span>
                    <InputText 
                      type="text"
                      name="totalInvestment" 
                      className={styles.calcValuesInput}  
                      value={parseInt(details.totalInvestment || 0).toLocaleString('en-IN')}
                      handleChange={handleChange}
                      validateInput={isPincode}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      min="250" 
                      max= "150000"
                      />
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl"  
                      name="totalInvestment"
                      value={details.totalInvestment} 
                      onChange={handleChange}
                      onMouseUp={betterFunction}
                      onTouchEnd={betterFunction}
                      min="250" 
                      max= "150000"
                      />
                  <ul className={styles['range-labels']}>
                    <li>250</li>
                    <li>1.5L</li>
                  </ul>
                </div>
          </div>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Start Period</label>
                  <div className={styles.inputGrp} >
                    {/* <span className={styles.Sign}>₹</span> */}
                    <InputText 
                      type="text"
                      name="startperiod" 
                      className={`${styles.calcValuesInput} `}  
                      value={parseInt(details.startperiod || 0)}
                      handleChange={handleChange}
                      validateInput={isPincode}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      min="2018"
                      max= "2030"
                      />
                       <span className={styles.Sign}>Year</span>
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl" 
                      name="startperiod"
                      value={details.startperiod}
                      onChange={handleChange} 
                      onMouseUp={betterFunction}
                      onTouchEnd={betterFunction}
                      min="2018"
                      max= "2030"
                  />
                  <ul className={styles['range-labels']}>
                    <li>2018</li>
                    <li>2030</li>
                  </ul>
                </div>
          </div>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Girl&apos;s Age</label>
                  <div className={styles.inputGrp} >
                    <InputText 
                      type="number"
                      name="girlAge" 
                      className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                      value={details.girlAge}
                      handleChange={handleChange}
                      validateInput={isyear}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      min="1" 
                    max= "10"
                      />
                      <span className={styles.Sign}>Year</span>
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" 
                        className="slider maxl" 
                        name="girlAge" 
                        value={details.girlAge}
                        onChange={handleChange}
                        onMouseUp={betterFunction}
                        onTouchEnd={betterFunction}
                        min="1" 
                        max= "10"
                  />
                  <ul className={styles['range-labels']}>
                    <li>1</li>
                    <li>10</li>
                  </ul>
                </div>
          </div>

          <div className={`${styles.showInterest} `}>
            <label className="font12 text231f20 fontsemiBold">Latest SSY Rate</label>
            <p className="fontBold textBlack">{details.expectedReturnRate}%</p>
          </div>
        </div>
         <div className={`${styles.resultwrap} ${styles.ppfwidth}`}>
                           <div className={styles.totalEstimateBx}>
                    <div className={styles.estimateContainer}>
                        <div className={styles.investProfit}>
                            <span className="font16 text444 fontBold">₹ { data && !isNaN(data.investedamt) ? parseInt(data.investedamt).toLocaleString('en-IN'):'' }</span>
                            <p className="font14 text666 mt15">Total Investment</p>
                        </div>
                        <span className={styles.plus}> +</span>
                        <div className={styles.investProfit}>
                            <span className="font16 text444 fontBold">₹ { data && !isNaN(data.result) ? parseInt(data.result).toLocaleString('en-IN'):'' }</span>
                            <p className="font14 text666 mt15">Total Interest</p>
                        </div>
                    </div>
                <button className="btn-primary mb10"><span className="font16 textWhite fontBold">₹ { data && !isNaN(data.wealthGained) ? parseInt(data.wealthGained).toLocaleString('en-IN'):'' }</span><label className="font14 textWhite">Maturity Value</label></button>
                <p className="font16 text666 mt15">Maturity Year       { details && !isNaN(details.startperiod) && details.startperiod>2017 ? + parseInt((details.startperiod)) + 21:'' }</p>
            </div>
          </div> 

      </div>
    </div>
    {cmsData.length>0 && 
    <>
    <div className="container containerFlex mb40">
        <section className={contentStyles.eligible}>
            <div className="container">
                <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
            </div>
        </section>
         <RightSideBar menuLinks = {internalLinkEmiCalculator} paddingTop={true}/>
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
        </>}
    </>
  )
}