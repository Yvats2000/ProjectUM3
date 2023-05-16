import styles from "../calculator.module.css";
import InputText from '../../../form/inputText'
import { isPincode } from '../../../form/inputValidators'
import { fdCal } from "../../../services/calculators";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import Validation from '../../../form/Validation';
import commonFunctions from '../../../utils/CommonFunctions';
import { NavLink } from "../../ui";
import Router from "next/router";

export const MutualFundCalculator = () => {
  const [apiAmount, setApiAmount] = useState({})
  const [totalValue, setTotalValue] = useState()
  const [fdval, setFdVal] = useState({
    investment : "100000",
    roi : "8",
    timeperiod : '10',
    types: "One-Time Investment" 
  })
  useEffect(async() =>{
    await getBalance()
  },[fdval])
  
  const handleRadio = (e) => {
    const { name, value} = e.target;
    setFdVal({ ...fdval, [name]: value});
  };
  
  const handleChange = (e) => {
    const { name, value, max} = e.target;
    if(value)value=value.toString().replace(/,/g,"");
    if (parseInt(value) > parseInt(max)){
      value = max;
    }
    let isValid = isAllowed(value, name);
    if(isValid){
    setFdVal({ ...fdval, [name]: value });
    }
    }; 
    const isAllowed = (value, type) => {
      switch (type){
        case 'investment':
          return  ((value === '' || Validation.validateNumber(value)) && value.length < 11);
        default:
          return  true;
      }
    }
  const  checkfdcal =() =>{
    let check=true
    for (let key in fdval){
      if(fdval[key]==''|| fdval[key]==undefined){
       check=false
      }
    }
    return check
  }
  
  const getBalance = async() => {
    if(checkfdcal()){
      let p = fdval && fdval.investment
      let r = fdval && fdval.roi
      let n = fdval && fdval.timeperiod
      let value = p * (1 + r/100) ** n
      setApiAmount(value)
      setTotalValue(parseInt(value) + parseInt(fdval.investment))
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

  

var validate = (value) => {
  let p1 = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
  return p1
}

  return (
    <section className="calculator">
      <div className="container">
        <div className={styles.calcBox}>
          <div className="form-container w100 ptl15Sm">
            <div className="raidoInputBox mb20">
                <label className="radioInput text313541" onChange={handleRadio}  >
                  <input
                    className="form-check-input"
                    type="radio"
                    value="One-Time Investment" 
                    name="types"
                  defaultChecked={fdval.types=='One-Time Investment'}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12">One-Time Investment</span>
                </label>
               
                  <NavLink href={`${process.env.BASE_URL+'/calculator/sip-calculator'}`}>
                <label className="radioInput text313541" onChange={handleRadio}  >
                  <input
                    className="form-check-input"
                    type="radio"
                    value="SIP investment" 
                    name="types"
                  defaultChecked={fdval.types=='SIP investment'}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12">SIP investment</span>
                </label>
                </NavLink>
            </div>
          </div>
          <div className={styles.calc}>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Total Investment</label>
                <div className={styles.inputGrp} >
                  <span className={styles.Sign}>₹</span>
                  <InputText 
                    type="text"
                    name="investment" 
                    validateInput={isPincode}
                    className={styles.calcValuesInput} 
                    value={parseInt(fdval.investment || 0).toLocaleString('en-IN')}
                    handleChange={handleChange}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    min="500" 
                    max= "1000000"
                    />
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input type="range" className="slider maxl" 
                name="investment"
                value={fdval.investment} 
                onChange={handleChange}
                onTouchEnd={betterFunction}
                onMouseUp={betterFunction}
                min="500" 
                max= "1000000"
                />
                <ul className={styles['range-labels']}>
                <li>500</li>
                  <li>10L</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Tenure</label>
                <div className={styles.inputGrp}>                  
                <InputText 
                    type="number"
                    name="timeperiod" 
                    className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                    value={fdval.timeperiod} 
                    handleChange={handleChange}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    min="1" 
                    max= "30"
                    /> 
                  <span className={styles.Sign}>Years</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input 
                  type="range" 
                  className="slider minl" 
                  min="1" 
                  max= "30"
                  name="timeperiod"
                  value={fdval.timeperiod}
                  onChange={handleChange}
                  onTouchEnd={betterFunction}
                  onMouseUp={betterFunction}
                  />
                <ul className={styles["range-labels"]}>
                <li>1</li>
                  <li>30</li>

                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Estimated Rate of Return</label>
                <div className={styles.inputGrp}>
                <InputText 
                    type="number"   
                    name="roi"
                    className={`${styles.calcValuesInput} ${styles.ratel} `}
                    value={validate(fdval.roi)}    
                    handleChange={handleChange}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    min="1" 
                    max= "50"             
                    />
                  <span className={styles.Sign}>%</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input 
                  type="range" 
                  className="slider minl" 
                  min="1" 
                  max= "50" 
                  name="roi" 
                  onChange={handleChange}
                  value={fdval.roi} 
                  onTouchEnd={betterFunction}
                  onMouseUp={betterFunction}                  
                  step={0.05}
                  />
                <ul className={styles["range-labels"]}>
                <li>1</li>
                  <li>50</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.totalEstimateBx}>
                    <div className={styles.estimateContainer}>
                        <div className={styles.investProfit}>
                            <span className="font16 text444 fontBold">₹{ !isNaN(fdval.investment) ? parseInt(fdval.investment).toLocaleString('en-IN'):'' }</span>
                            <p className="font14 text666 mt15">Total Investment</p>
                        </div>
                        <span className={styles.plus}> +</span>
                        <div className={styles.investProfit}>
                            <span className="font16 text444 fontBold">₹ { !isNaN(apiAmount) ? parseInt(apiAmount).toLocaleString('en-IN'):'' }</span>
                            <p className="font14 text666 mt15">Profit</p>
                        </div>
                    </div>
                <button className="btn-primary"><span className="font16 textWhite fontBold">₹ { !isNaN(totalValue) ? parseInt(totalValue).toLocaleString('en-IN'):'' }</span><label className="font14 textWhite">Current Value of Investment </label></button>
            </div>
        </div>
      </div>
    </section>
  )
}
