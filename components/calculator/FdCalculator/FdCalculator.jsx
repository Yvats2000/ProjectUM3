import styles from "../calculator.module.css";
import InputText from '../../../form/inputText'
import { isPincode } from '../../../form/inputValidators'
import { fdCal } from "../../../services/calculators";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from 'react-chartjs-2';
import React, { useEffect, useState } from "react";
import commonFunctions from '../../../utils/CommonFunctions';

export const FdCalculator = ({calculations}) => {
    const [apiAmount, setApiAmount] = useState({})
  const [fdval, setFdVal] = useState({
    investment : calculations.investment.defaultValue,
    roi : calculations.roi.defaultValue,
    timeperiod : calculations.timeperiod.defaultValue,
    types: "Monthly" 
  })
  useEffect(async() =>{
    await getBalance()
  },[fdval.types])
  
  const handleRadio = (e) => {
    const { name, value} = e.target;
    setFdVal({ ...fdval, [name]: value});
  };
  
  const handleChange = (e) => {
	const { name, value} = e.target;
    fdval.isApiCall = true 
    if(value)value=value.toString().replace(/,/g,"");
    if (parseInt(value) > parseInt(calculations[name].maxValue)){
      value = calculations[name].maxValue;
    }
    setFdVal({ ...fdval, [name]: value });
  }; 

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
      let data = {
        principal : fdval.investment,
        rate :fdval.roi,
        tenureInYears :  fdval.timeperiod,
        mode : fdval.types
      }
      let balcal = await fdCal(data)
      setApiAmount(balcal.data)
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
    <section className="calculator">
      <div className="container">
        <div className={styles.calcBox}>
          <div className="form-container w100 ptl15Sm">
            <div className="raidoInputBox mb20">
                <label className="radioInput text313541" onChange={handleRadio}  >
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Monthly" 
                    name="types"
                  defaultChecked={fdval.types=='Monthly'}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12"  >Monthly</span>
                </label>
                <label className="radioInput text313541" onChange={handleRadio}  >
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Quarterly" 
                    name="types"
                  defaultChecked={fdval.types=='Quarterly'}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12"  >Quarterly</span>
                </label>
                <label className="radioInput text313541" onChange={handleRadio}  >
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Half Yearly" 
                    name="types"
                  defaultChecked={fdval.types=='Half Yearly'}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12"  >Half Yearly</span>
                </label>
                <label className="radioInput text313541" onChange={handleRadio}  >
                  <input
                    className="form-check-input"
                    type="radio"
                    value="Yearly" 
                    name="types"
                  defaultChecked={fdval.types=='Yearly'}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12"  >Yearly</span>
                </label>
            </div>
          </div>
          <div className={styles.calc}>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Investment Amount</label>
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
                    />
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input type="range" className="slider maxl" 
                min={calculations.investment.minValue}
                max= {calculations.investment.maxValue}
                name="investment"
                value={fdval.investment} 
                onChange={handleChange}
                onTouchEnd={betterFunction}
                onMouseUp={betterFunction}
                />
                <ul className={styles['range-labels']}>
                <li>{calculations.investment.minText}</li>
                  <li>{calculations.investment.maxText}</li>
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
                    /> 
                  <span className={styles.Sign}>Years</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input 
                  type="range" 
                  className="slider minl" 
                  min={calculations.timeperiod.minValue}
                  max= {calculations.timeperiod.maxValue}
                  name="timeperiod"
                  value={fdval.timeperiod}
                  onChange={handleChange}
                  onTouchEnd={betterFunction}
                  onMouseUp={betterFunction}
                  />
                <ul className={styles["range-labels"]}>
                <li>{calculations.timeperiod.minText}</li>
                  <li>{calculations.timeperiod.maxText}</li>

                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Rate of interest</label>
                <div className={styles.inputGrp}>
                <InputText 
                    type="number"   
                    name="roi"
                    className={`${styles.calcValuesInput} ${styles.ratel} `}
                    value={validate(fdval.roi)}    
                    handleChange={handleChange}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}             
                    />
                  <span className={styles.Sign}>%</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input 
                  type="range" 
                  className="slider minl" 
                  min={calculations.roi.minValue}
                  max= {calculations.roi.maxValue}
                  name="roi" 
                  onChange={handleChange}
                  value={fdval.roi} 
                  onTouchEnd={betterFunction}
                  onMouseUp={betterFunction}                  
                  step={0.05}
                  />
                <ul className={styles["range-labels"]}>
                <li>{calculations.roi.minText}</li>
                  <li>{calculations.roi.maxText}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.newcalcDetails}>
          <p className="font12  text7c7f87 fontsemiBold mb20 type widthadj">Future Value</p>
            <div className={`mb20 ${styles.totalamt}`}>
              <sup className={styles.rupee}>₹</sup>
              <span className={styles.price}>{ !isNaN(apiAmount.totalValue) ? parseInt(apiAmount.totalValue).toLocaleString('en-IN'):'' }</span>
              </div>
              <p className="font12 fontStyleItalic lineHeight20  text7c7f87 fontsemiBold textCenter type widthadj">{commonFunctions.convertNumberToWords(apiAmount.totalValue ? parseInt(apiAmount.totalValue).toLocaleString('en-IN') : '')}</p>
            
          </div>
          <div className={styles.calcDetail}>

            <p className="font18 fontsemiBold text181d mb30 textCenter">
            Investments To Returns Ratio:
            </p>
            <div className={styles['chart-container']}>
              <Doughnut data={{labels: [],datasets: [{data: [!isNaN(apiAmount.investedAmount) ? parseInt(apiAmount.investedAmount):'', !isNaN(apiAmount.investedAmount) ? parseInt(apiAmount.estimatedReturns):''],backgroundColor: ['rgba(255, 67, 86, 1)','rgba(59, 65, 158, 1)']}]}} options={{rotation: -90,circumference: 180}} />
            </div>
            <div className={styles.calculatevalues}>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}>Amount Invested </p>
                </div>
                <p className={styles.amt}>₹{ !isNaN(apiAmount.investedAmount) ? parseInt(apiAmount.investedAmount).toLocaleString('en-IN'):'' }</p>
              </div>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}> Wealth Gained</p>
                </div>
                <p className={styles.amt}>₹{ !isNaN(apiAmount.estimatedReturns) ? parseInt(apiAmount.estimatedReturns).toLocaleString('en-IN'):'' }</p>
              </div>
              <div className={`${styles.amount} ${styles.total}`}>
                <p className={styles.info} >Future Value</p>
                 <p className={styles.amt}>₹ { !isNaN(apiAmount.totalValue) ? parseInt(apiAmount.totalValue).toLocaleString('en-IN'):'' }</p>
               </div>
              </div>
          </div>
        </div>
      </div>
    </section>
  )
}
