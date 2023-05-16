import styles from "../calculator.module.css";
import React, { useEffect, useState } from 'react';
import InputText from '../../../form/inputText'
import { preCal } from "../../../services/calculators";
import { isyear, isRate, isInrAmount,isNoEmi, isPincode} from '../../../form/inputValidators';
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import {Doughnut} from 'react-chartjs-2';
import commonFunctions from '../../../utils/CommonFunctions';
import { NavLink } from "../../ui";
import {useRouter} from "next/router";
import { LeadPopup, PopUp } from "../../shared";

export const PrePaymentCalculator = ({calculatorType, title, calculation, bankName=''}) => {
  const router = useRouter()
  const [productName, setProductName] = useState('');
  const [openLeadPopup, setLeadPopup] = useState(false);
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
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

  const enquireNowHandle = (productName) => {
    setProductName(productName);
    setLeadPopup(true);
  }


  var validate = (value) => {
    let p1 = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
    return p1
  }

  return (
  <>
   {openLeadPopup ? <LeadPopup productName={productName} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
    {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
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
            <div className={`${styles.rangecalc} ${styles.premarg}`}>
              <div className={styles.calcValues}>
                <label>Loan Amount</label>
                <div className={styles.inputGrp}>
                  <span className={styles.Sign}>₹</span>
                  <InputText 
                    type="text" 
                    name="loanAmount"
                    className={styles.calcValuesInput}    
                    id="" 
                    value={parseInt(pre.loanAmount || 0).toLocaleString('en-IN')}
                    handleChange={e=>handleChange(e,calculation.loanAmount.maxValue)}
                    validateAmount = {isInrAmount}
                    validateInput={isPincode}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                  />
                </div>
              </div>
              <div className={styles.rangeSlider}>
                <input type="range" 
                  className="slider maxl" 
                  min={calculation.loanAmount.minValue} 
                  max={calculation.loanAmount.maxValue}
                  name="loanAmount" 
                  value={pre.loanAmount||0}
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
            <div className={`${styles.rangecalc} ${styles.premarg}`}>
                <div className={styles.calcValues}>
                  <label>Original Loan Tenure</label>
                  <div className={styles.inputGrp}>
                    <InputText 
                      type="number" 
                      name="tenure" 
                      id=""  
                      className={`${styles.calcValuesInput} ${styles.lwidth}`}  
                      value={pre.tenure}
                      handleChange={e=>handleChange(e,calculation.tenure.maxValue)}
                      validateInput={isyear}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                    />
                    <span className={styles.Sign}>Years</span>
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                  <input type="range" 
                    className="slider minl" 
                    min={calculation.tenure.minValue} 
                    max={calculation.tenure.maxValue}
                    name="tenure" 
                    value={pre.tenure} 
                    onChange={e=>handleChange(e,calculation.tenure.maxValue)}
                    onMouseUp={betterFunction}
                    onTouchEnd={betterFunction}
                  />
                  <ul className={styles['range-labels']}>
                  <li>{calculation.tenure.minText}</li>
                  <li>{calculation.tenure.maxText}</li>
                  </ul>
                </div>
              </div>
              <div className={`${styles.rangecalc} ${styles.premarg}`}>
                <div className={styles.calcValues}>
                  <label>Current Rate Of Interest</label>
                  <div className={styles.inputGrp}>
                    <InputText 
                    type="number" 
                    name="rate" id=""  
                    className={`${styles.calcValuesInput} ${styles.ratel}`} 
                    value={validate(pre.rate)} 
                    handleChange={e=>handleChange(e,calculation.rate.maxValue)}
                    validateInput={isRate}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    />
                    <span className={styles.Sign}>%</span>
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                  <input type="range" 
                  className="slider minl" 
                  min={calculation.rate.minValue} 
                  max={calculation.rate.maxValue}
                  name="rate" 
                  value={pre.rate} 
                  onChange={e=>handleChange(e,calculation.rate.maxValue)}
                  onMouseUp={betterFunction}
                  onTouchEnd={betterFunction}
                  step={0.05}
                  />
                  <ul className={styles['range-labels']}>
                  <li>{calculation.rate.minText}</li>
                  <li>{calculation.rate.maxText}</li>
                  </ul>
                </div>
              </div>
              <div className={`${styles.rangecalc} ${styles.premarg}`}>
                <div className={styles.calcValues}>
                  <label>Prepayment Amount</label>
                  <div className={styles.inputGrp}>
                  <span className={styles.Sign}>₹</span>
                    <InputText 
                      type="text" 
                      name="prepayament" 
                      id=""
                      value={parseInt(pre.prepayament || 0).toLocaleString('en-IN')}
                      className={styles.calcValuesInput}  
                      handleChange={e=>handleChange(e,banks && banks.principalAfterNoOfEmiPaid ? banks.principalAfterNoOfEmiPaid : calculation.prepayament.maxValue)}
                      validateInput={isPincode}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                    />
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                  <input type="range" 
                  className="slider minl" 
                  min={calculation.prepayament.minValue} 
                  // min={calculation.prepayament.maxValue} 
                  max={banks && banks.principalAfterNoOfEmiPaid ? banks.principalAfterNoOfEmiPaid : calculation.prepayament.maxText}
                  name="prepayament" 
                  value={pre.prepayament} 
                  onChange={e=>handleChange(e,banks && banks.principalAfterNoOfEmiPaid ? banks.principalAfterNoOfEmiPaid : calculation.prepayament.maxValue)}
                  onMouseUp={betterFunction}
                  onTouchEnd={betterFunction}
                  />
                  <ul className={styles['range-labels']}>
                  <li>{calculation.prepayament.minText}</li>
                  {/* <li>{calculation.prepayament.maxText}</li> */}
                  <li>{commonFunctions.numformat(banks && banks.principalAfterNoOfEmiPaid ? banks.principalAfterNoOfEmiPaid : calculation.prepayament.maxText)}</li>
                  </ul>
                </div>
                
              </div>
              <div className={`${styles.rangecalc} ${styles.premarg}`}>
                <div className={styles.calcValues}>
                  <label>Number Of EMI&apos;s Paid</label>
                  <div className={styles.inputGrp}>
                    <InputText 
                      type="number" 
                      name="numberofemi" id="" 
                      className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                      value={pre.numberofemi}
                      handleChange={e=>handleChange(e,pre.tenure * 12 - 1)}
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
                   min={calculation.numberofemi.minValue} 
                  //  max={calculation.numberofemi.maxValue}
                   max={pre.tenure * 12 - 1}
                   name="numberofemi" 
                   value={pre.numberofemi} 
                   onChange={e=>handleChange(e,pre.tenure * 12 - 1)}
                   onMouseUp={betterFunction}
                   onTouchEnd={betterFunction}
                   />
                  <ul className={styles['range-labels']}>
                  <li>{calculation.numberofemi.minText}</li>
                  {/* <li>{calculation.numberofemi.maxText}</li> */}
                  <li>{pre.tenure * 12 - 1}</li>
                  </ul>
                </div>
                
              </div>
                
          </div>
          <div className={`${styles.newcalcDetails} ${styles.nh}`}>
          <p className="font12  text7c7f87 fontsemiBold type widthadj mb20">Revised Monthly EMI</p>
            {banks.revisedEmi && <div className={styles.totalamt}>
              <sup className={styles.rupee}>₹</sup>
              <span className={styles.price}>{parseInt(banks.revisedEmi).toLocaleString('en-IN')}</span>
            </div>}
            <p className="font12 lineHeight20 fontStyleItalic text7c7f87 fontsemiBold textCenter type widthadj">{commonFunctions.convertNumberToWords(banks.revisedEmi &&  banks.revisedEmi ? parseInt(banks.revisedEmi).toLocaleString('en-IN') : '')}</p>
          </div>
          <div className={styles.calcDetail}>

            <p className="textCenter font18 fontsemiBold text181d mb30">
            Key Takeaways:
            </p>
            <div className={styles['chart-container']}>
              <Doughnut data={{labels: [],datasets: [{data: [banks && banks.originalEmi  ? parseInt(banks.originalEmi) : '', banks &&  banks.revisedEmi ? parseInt(banks.revisedEmi) : ''],backgroundColor: ['rgba(255, 67, 86, 1)','rgba(59, 65, 158, 1)']}]}} options={{rotation: -90,circumference: 180}} />
            </div>
            {/* <figure className={styles.piechart}>
              <img src="/assets/images/pie chart.svg" className="imgResponsive" alt="" />
            </figure> */}
            <div className={styles.calculatevalues}>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}>Original EMI</p>
                </div>
                <p className={styles.amt}>{banks && banks.originalEmi  ? '₹' + parseInt(banks.originalEmi).toLocaleString('en-IN') : ''}</p>
              </div>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}>Revised EMI</p>
                  
                </div>
                <p className={styles.amt}>{banks &&  banks.revisedEmi ? '₹' + parseInt(banks.revisedEmi).toLocaleString('en-IN') : ''}</p>
              </div>
              <div className={`${styles.amount} ${styles.total}`}>
                <p className={styles.info} >Savings in Interest</p>
                 <p className={styles.amt}>{banks.savingsInInterest && banks.savingsInInterest ? '₹' + parseInt(banks.savingsInInterest).toLocaleString('en-IN') : '' }</p>
               </div>
            </div>
            <button className="btn font12 btn25 textCenterSm" onClick={() => enquireNowHandle(title)}>Apply for a Loan<em className="icon-arrow-right font14"></em>
            </button>
          </div>
        </div>
  </>    
  );
};
