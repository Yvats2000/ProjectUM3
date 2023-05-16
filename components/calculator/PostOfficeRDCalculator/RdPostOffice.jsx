import React, { useEffect, useState } from "react";
import styles from "../calculator.module.css";
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import {isPincode, isyear } from '../../../form/inputValidators'
import InputText from '../../../form/inputText';
import { poRdCal } from '../../../services/calculators';
import {Doughnut} from 'react-chartjs-2';
export const RdPostOffice = ({cmsData,rightNavBar}) => {  
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
      "text": "Post Office RD Calculator",
      "path": "/calculator/post-office-rd-calculator",
      "class": ""
    }
   ]
   const [formDetails, setFormDetails] = useState({
    MonthlyDeposit : 50000,
    Years : 3,
    roi:5.8,
    compoundFrequency:3,
    isApiCall : false
})

const [apiData, setApiData] = useState('')


useEffect(async()=>{
  await getBalance()
},[])


const handleChange = (e) => {
  const { name, value,max} = e.target;
  if(value)value=value.toString().replace(/,/g,"");
  if (parseInt(value) > parseInt(max)) {
    value = max;
  }
  setFormDetails({ ...formDetails, [name]: value});
};

const checkemiFields =() =>{
  let check=true;
  for (let key in formDetails){
    if(formDetails[key]=='' || formDetails[key]==0 || formDetails[key]==undefined){
     check=false
    }
  }
  return check
}

const getBalance = async() => {
  if(checkemiFields){
    let data = {
      "monthlyDepositAmount": formDetails.MonthlyDeposit,
      "rate": formDetails.roi,
      "timePeriod": formDetails.Years,
      "compoundFrequency":formDetails.compoundFrequency
    }
  
    let balcal = await poRdCal(data)
    setApiData(balcal.data)
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

  return (
    <>
    <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
      <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">Post Office RD Calculator</h1>
      {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
      <div className={styles.calcwrap}>
        <div className={styles.calculator}>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Monthly Deposit Amount</label>
                  <div className={styles.inputGrp} >
                    <span className={styles.Sign}>₹</span>
                    <InputText 
                      type="text"
                      name="MonthlyDeposit" 
                      className={styles.calcValuesInput}  
                      value={parseInt(formDetails.MonthlyDeposit || 0).toLocaleString('en-IN')}
                      handleChange={handleChange}
                      validateInput={isPincode}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      min="100"
                      max= "100000000"
                      />
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl" 
                  name="MonthlyDeposit"
                  value={formDetails.MonthlyDeposit}
                  onChange={handleChange}
                  min="100"
                  max= "100000000"
                  onMouseUp={betterFunction}
                  onTouchEnd={betterFunction}

                  />
                  <ul className={styles['range-labels']}>
                    <li>100</li>
                    <li>10 Cr</li>
                  </ul>
                </div>
          </div>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
            <div className={styles.calcValues}>
              <label>Time Period</label>
              <div className={styles.inputGrp} >

                <InputText
                  type="text"
                  name="Years"
                  min="1"
                  max="10"
                  className={`${styles.calcValuesInput} ${styles.lwidth}`}
                  value={formDetails.Years}
                  validateInput={isyear}
                  handleChange={handleChange}
                  handleBlur={betterFunction}
                  onMouseOver={betterFunction}

                />
                <span className={styles.Sign}>Year</span>
              </div>
            </div>
            <div className={styles.rangeSlider}>
              <input type="range" className="slider maxl"
                name="Years"
                min="1"
                max="10"
                value={formDetails.Years}
                onChange={handleChange}
                onTouchEnd={betterFunction}
                onMouseUp={betterFunction}

              />
              <ul className={styles['range-labels']}>
                <li>{'1'}</li>
                <li>{'10'}</li>
              </ul>
            </div>
          </div>
          <div className={`${styles.showInterest} `}>
            <label className="font12 text231f20 fontsemiBold">Current Post Office RD rate of interest</label>
            <p className="fontBold textBlack">5.8%</p>
          </div>
        </div>
        <div className={styles.resultwrap}>

            <p className="font12 font600 textBlack mb30 ">
            Recurring Deposit Breakdown
            </p>
            <div className={styles['chart-container']}>
              <Doughnut data={{labels: [],datasets: [{data: [!isNaN(apiData.investedAmount) ? parseInt(apiData.investedAmount):'', !isNaN(apiData.estimatedReturns) ? parseInt(apiData.estimatedReturns):''],backgroundColor: ['rgba(255, 67, 86, 1)','rgba(59, 65, 158, 1)']}]}} options={{rotation: -90,circumference: 180}} />
            </div>
            {/* <figure className={styles.piechart}>
              <img src="/assets/images/pie chart.svg" className="imgResponsive" alt="" />
            </figure> */}
            <div className={styles.calculatevalues}>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}>  Invested Amount</p>
                </div>
                <p className={`${styles.amt} font12`}>₹ { !isNaN(apiData.investedAmount) ? parseInt(apiData.investedAmount).toLocaleString('en-IN'):''}</p>
              </div>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}>  Estimated Return</p>
                </div>
                <p className={`${styles.amt} font12`}>₹ { !isNaN(apiData.estimatedReturns) ? parseInt(apiData.estimatedReturns).toLocaleString('en-IN'):''}</p>
              </div>
              <div className={`${styles.amount} ${styles.total}`}>
                <p className={styles.info} >Maturity Value</p>
                 <p className={styles.amt}> ₹ { !isNaN(apiData.totalValue) ? parseInt(apiData.totalValue).toLocaleString('en-IN'):'' }</p>
              </div>
            </div>
          </div>
      </div>
    </div>
    {cmsData.length>0  && 
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


