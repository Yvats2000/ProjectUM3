import React , {useState, useEffect} from 'react';
import styles from "../calculator.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import InputText from '../../../form/inputText';
import { isNumeric, isyear, isRate, isPincode } from '../../../form/inputValidators';
import {Doughnut} from 'react-chartjs-2';
import {swpCal} from '../../../services/calculators'
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";


export const Swp = ({cmsData,rightNavBar}) => {  
  const [details, setDetails] = useState({
  totalInvestment: '500000',
  withdrawlPerMonth: '1000',
  timePeriod: '8',
  expectedReturnRate: '5'
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
      "text": "SWP Calculator",
      "path": "/calculator/swp-calculator",
      "class": ""
    }
   ]

   useEffect(async() =>{
    await getBalance()
  },[])

  const handleChange = (e, min,max) => {
		const { name, value} = e.target;
    if(value)value=value.toString().replace(/,/g,"");
    if (parseInt(value) > parseInt(max)){
      value = max;
    }
    setDetails({ ...details, [name]: value });
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
      let data ={
        "totalInvestment": details.totalInvestment,
        "withdrawlPerMonth": details.withdrawlPerMonth,
        "timePeriod": details.timePeriod,
        "expectedReturnRate": details.expectedReturnRate
      }
      let balcal = await swpCal(data)
      setData(balcal.data)
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
      <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">SWP (Systematic Withdrawl Plan) Calculator</h1>
      {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
      <div className={styles.calcwrap}>
        <div className={styles.calculator}>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Total Investment</label>
                  <div className={styles.inputGrp} >
                    <span className={styles.Sign}>₹</span>
                    <InputText 
                      type="text"
                      name="totalInvestment" 
                      className={styles.calcValuesInput}  
                      value={parseInt(details.totalInvestment || 0).toLocaleString('en-IN')}
                      handleChange={(e)=> handleChange(e,10000,5000000)}
                      validateInput={isPincode}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      />
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl"  
                      name="totalInvestment"
                      value={details.totalInvestment} 
                      onChange={(e)=> handleChange(e,10000,5000000)}
                      onMouseUp={betterFunction}
                      onTouchEnd={betterFunction}
                      min="10000" 
                      max= "5000000"
                      />
                  <ul className={styles['range-labels']}>
                    <li>500</li>
                    <li>50L</li>
                  </ul>
                </div>
          </div>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Withdrawl Per month</label>
                  <div className={styles.inputGrp} >
                    <span className={styles.Sign}>₹</span>
                    <InputText 
                      type="text"
                      name="withdrawlPerMonth" 
                      className={styles.calcValuesInput}  
                      value={parseInt(details.withdrawlPerMonth || 0).toLocaleString('en-IN')}
                      handleChange={(e)=> handleChange(e,500,50000)}
                      validateInput={isPincode}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      />
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl" 
                      name="withdrawlPerMonth"
                      value={details.withdrawlPerMonth}
                      onChange={(e)=> handleChange(e,500,50000)} 
                      onMouseUp={betterFunction}
                      onTouchEnd={betterFunction}
                      min="500" 
                      max= "50000"
                  />
                  <ul className={styles['range-labels']}>
                    <li>500</li>
                    <li>50 K</li>
                  </ul>
                </div>
          </div>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Time Period</label>
                  <div className={styles.inputGrp} >
                    <InputText 
                      type="number"
                      name="timePeriod" 
                      className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                      value={details.timePeriod}
                      handleChange={(e)=> handleChange(e,1,30)}
                      validateInput={isyear}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      />
                      <span className={styles.Sign}>Year</span>
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" 
                        className="slider maxl" 
                        name="timePeriod" 
                        value={details.timePeriod}
                        onChange={(e)=> handleChange(e,1,30)}
                        onMouseUp={betterFunction}
                        onTouchEnd={betterFunction}
                        min="1" 
                        max= "30"
                  />
                  <ul className={styles['range-labels']}>
                    <li>1</li>
                    <li>30</li>
                  </ul>
                </div>
          </div>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Expected Return rate(p.a.)</label>
                  <div className={styles.inputGrp} >
                    <InputText 
                      type="number"
                      name="expectedReturnRate" 
                      className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                      value={validate(details.expectedReturnRate)}
                      handleChange={(e)=> handleChange(e,'1','30')}
                      validateInput={isRate}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      />
                      <span className={styles.Sign}>%</span>
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl"
                    name="expectedReturnRate" 
                    value={details.expectedReturnRate}
                    onChange={(e)=> handleChange(e,'1','30')}
                    onMouseUp={betterFunction}
                    onTouchEnd={betterFunction}
                    min="1" 
                    max= "30"
                  />
                  <ul className={styles['range-labels']}>
                    <li>1</li>
                    <li>30</li>
                  </ul>
                </div>
          </div>
        </div>
        <div className={styles.resultwrap}>

            <p className="font12 font600 textBlack mb30 textCenter">
            SWP Breakup
            </p>
            <div className={styles['chart-container']}>
              <Doughnut data={{labels: [],datasets: [{data: [!isNaN(data.investedAmount) ? parseInt(data.investedAmount):'', !isNaN(data.interestEarned) ? parseInt(data.interestEarned):''],backgroundColor: ['rgba(255, 67, 86, 1)','rgba(59, 65, 158, 1)']}]}} options={{rotation: -90,circumference: 180}} />
            </div>
            <div className={styles.calculatevalues}>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}>  Invested Amount</p>
                </div>
                <p className={styles.amt}>{ data && !isNaN(data.investedAmount) ? '₹' + parseInt(data.investedAmount).toLocaleString('en-IN'):'' }</p>
              </div>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}>Expected Return</p>
                  
                </div>
                <p className={styles.amt}>{ data && !isNaN(data.interestEarned) ? '₹' + parseInt(data.interestEarned).toLocaleString('en-IN'):'' }</p>
              </div>
            </div>
            <div className={`${styles.showDetails} mb20 w100`}>
                  <div className={styles.totalamtRight}>
                      <span className="font600 font16 mb10 textLink"> { data && !isNaN(data.totalWithdrawal) ? '₹' + parseInt(data.totalWithdrawal).toLocaleString('en-IN'):'' }</span>
                      <p className="font12  textCenter text757575">Total Withdrawal</p>
                  </div>
                  <div className={styles.totalamtRight}>
                      <span className="font600 font16 mb10 textLink"> { data && !isNaN(data.finalValue) ? '₹' + parseInt(data.finalValue).toLocaleString('en-IN'):'' }</span>
                      <p className="font12  textCenter text757575">Final Value</p>
                  </div>
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