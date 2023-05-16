import React ,{useState, useEffect} from "react";
import styles from "../calculator.module.css";
import { FAQ, BreadCrumb, RightSideBar, CreditScore } from "../../shared";
import InputText from '../../../form/inputText';
import { isPincode,isRate, isyear } from '../../../form/inputValidators'
import {ppfCal} from '../../../services/calculators'
import {Doughnut} from 'react-chartjs-2';
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import Validation from '../../../form/Validation';


export const Ppf = ({cmsData,rightNavBar}) => {  
  const [deatils, setDetails] = useState({
    yearlyInvestment: 100000,
    timePeriod: 20,
    roi:'7.1'
  })
  const [data, setData] = useState()
  const [interestValue, setInterestValue] = useState()
  
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
      "text": "PPF Calculator",
      "path": "/calculator/ppf-calculator",
      "class": ""
    }
   ]
   useEffect(async() =>{
    await getBalance()
  },[deatils])

   const handleChange = (e) => {
    let { name, value, max} = e.target;
    if(value)value=value.toString().replace(/,/g,"");
    if (parseInt(value) > parseInt(max)){
      value = max;
    }
    let isValid = isAllowed(value, name);
    if(isValid){
      setDetails({ ...deatils, [name]: value });
    }
    }; 
    const isAllowed = (value, type) => {
      switch (type){
        case 'yearlyInvestment':
          return  ((value === '' || Validation.validateNumber(value)) && value.length < 11);
          case 'timePeriod':
          return  ((value === '' || Validation.validateRate(value)) && value.length < 5);
        default:
          return  true;
      }
    }
    const checkemiFields =() =>{
      let check=true
      for (let key in deatils){
        if(deatils[key]==''|| deatils[key]==undefined){
         check=false
        }
      }
      return check
    }

    const getBalance = async() => {
      if(checkemiFields()){
      let g = 0
        for(let i=0; i<deatils.timePeriod; i++){
          let e = (deatils.yearlyInvestment * 1) + g;
          let f = (deatils.roi/100) * e;
          g = e + f
        }
        setData(g) 
       let totalInterest =  parseInt(g) - parseInt(deatils.yearlyInvestment * deatils.timePeriod)
       setInterestValue(totalInterest)
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
    const betterFunction = debounced(getBalance, 0)
  return (
    <>
    <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
      <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">PPF Calculator</h1>
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
                      name="yearlyInvestment" 
                      className={styles.calcValuesInput}  
                      value={parseInt(deatils.yearlyInvestment || 0).toLocaleString('en-IN')}
                      handleChange={handleChange}
                      validateInput={isPincode}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      min="500" 
                      max= "150000"
                      />
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl" 
                  min="500" 
                  max= "150000"
                    value={deatils.yearlyInvestment}
                    name="yearlyInvestment" 
                    onChange={handleChange}
                    onMouseUp={betterFunction}
                    onTouchEnd={betterFunction}
                  />
                  <ul className={styles['range-labels']}>
                    <li>500</li>
                    <li>1.5L</li>
                  </ul>
                </div>
          </div>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Time Period</label>
                  <div className={styles.inputGrp} >
                    <InputText 
                      type="text"
                      name="timePeriod" 
                      className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                      value={deatils.timePeriod}
                      handleChange={handleChange}
                      validateInput={isyear}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      min="15" 
                      max= "50"
                      />
                      <span className={styles.Sign}>Year</span>
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl" name="timePeriod" 
                      value={deatils.timePeriod} 
                      onChange={handleChange} 
                      min="15" 
                      max= "50"
                      onMouseUp={betterFunction}
                      onTouchEnd={betterFunction}
                      />
                  <ul className={styles['range-labels']}>
                    <li>15</li>
                    <li>50</li>
                  </ul>
                </div>
          </div>
          <div className={styles.showInterest}>
            <label className="text231f20 font12 fontsemiBold">Rate of Interest(p.a.)</label>
            <p className="fontBold textBlack">7.1%</p>
          </div>
        </div>
        <div className={`${styles.resultwrap} ${styles.ppfwidth}`}>
            <div className={styles.totalEstimateBx}>
                    <div className={styles.estimateContainer}>
                        <div className={styles.investProfit}>
                            <span className="font16 text444 fontBold">₹{ !isNaN(deatils.yearlyInvestment) ?  parseInt(deatils.yearlyInvestment *  deatils.timePeriod).toLocaleString('en-IN'):'' }</span>
                            <p className="font14 text666 mt15">Total Investment</p>
                        </div>
                        <span className={styles.plus}> +</span>
                        <div className={styles.investProfit}>
                            <span className="font16 text444 fontBold">₹ {data && !isNaN(interestValue) ?  parseInt(interestValue).toLocaleString('en-IN'):'' }</span>
                            <p className="font14 text666 mt15">Wealth Gained</p>
                        </div>
                    </div>
                <button className="btn-primary"><span className="font16 textWhite fontBold">₹ { data && !isNaN(data) ? parseInt(data).toLocaleString('en-IN'):''}</span><label className="font14 textWhite">Current Value of Investment </label></button>
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