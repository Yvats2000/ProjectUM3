import styles from "../calculator.module.css";
import InputText from '../../../form/inputText'
import { isPincode } from '../../../form/inputValidators';
import React, { useEffect, useState } from "react";
import { sipCal } from "../../../services/calculators";
import sipLumpsum from '../../../data/sipLumpSumCalculations.json';

import { SIPRadio } from "./SIPRadio";
export const SIPcalculator = ({calculatorType,calculations,ShowHeading=true,}) => {

    const [apiAmount, setApiAmount] = useState({});
    const [formDetails, setFormDetails] = useState({
        investment: calculations.investment.defaultValue,
        timeperiod :calculations.timeperiod.defaultValue,
        roi : calculations.roi.defaultValue,
        types: calculatorType == "sip-calculator" ? "Monthly_Investment"  : calculatorType == "lumpsum-calculator" ?  "Lump_Sum_Amount" : null
    })
  
    useEffect(async()=>{
      await getBalance()
  },[])

    const handleChange = (e) => {
      const { name, value} = e.target;
      calculations = (formDetails.types == 'Monthly_Investment') ? calculations : sipLumpsum;
      if(value)value=value.toString().replace(/,/g,"");
      if (parseInt(value) > parseInt(calculations[name].maxValue)){
        value = calculations[name].maxValue;
      }
      setFormDetails({ ...formDetails, [name]: value });
  };

 
  const  checkemiFields =() =>{
    let check=true
    for (let key in formDetails){
      if(formDetails[key]==''|| formDetails[key]==undefined){
       check=false
      }
    }
    return check
  }
  const getBalance = async() => {
    if(checkemiFields()){
      let data = {
        principalInvested : formDetails.investment,
        roi :formDetails.roi,
        tenureInYears :  formDetails.timeperiod,
        mode :formDetails.types
      }
      let balcal = await sipCal(data)
      setApiAmount(balcal && balcal.data)
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


    return(
        <div className={styles.calcBox}>
                <SIPRadio calculatorType={calculatorType} formDetails={formDetails} setFormDetails={setFormDetails}/>
                <div className={styles.calc}>
                    <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                        <div className={styles.calcValues}>
                            <label>{formDetails.types == 'Monthly_Investment' ? 'Monthly Investment' : 'Total Investment'}</label>
                            <div className={styles.inputGrp} >
                            <span className={styles.Sign}>₹</span>
                            <InputText 
                                type="text"
                                name="investment" 
                                className={styles.calcValuesInput} 
                                value={parseInt(formDetails.investment || 0).toLocaleString('en-IN')} 
                                handleChange={handleChange}
                                validateInput={isPincode}
                                handleBlur={betterFunction}
                                onMouseOver={betterFunction}
                                />
                            </div>
                        </div>
                        <div className={styles.rangeSlider}>
                            <input type="range" className="slider maxl" 
                                    min={calculations.investment.minValue}
                                    max= {formDetails.types == 'Monthly_Investment' ? calculations.investment.maxValue : sipLumpsum.investment.maxValue}
                                    name="investment"
                                    value={formDetails.investment} 
                                    onChange={handleChange}
                                    onMouseUp={betterFunction}
                                    onTouchEnd={betterFunction}
                            />
                            <ul className={styles['range-labels']}>
                                <li>₹ {calculations.investment.minText}</li>
                                <li>₹ {formDetails.types == 'Monthly_Investment' ? calculations.investment.maxText : sipLumpsum.investment.maxText}</li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                        <div className={styles.calcValues}>
                            <label>Time Period</label>
                            <div className={styles.inputGrp}>                  
                            <InputText 
                                type="number"
                                name="timeperiod" 
                                className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                                value={formDetails.timeperiod} 
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
                            name="timeperiod"
                            value={formDetails.timeperiod}
                            min={calculations.timeperiod.minValue}
                            max= {calculations.timeperiod.maxValue}
                            onChange={handleChange}
                            onMouseUp={betterFunction}
                            onTouchEnd={betterFunction}
                            />
                            <ul className={styles["range-labels"]}>
                                <li>{calculations.timeperiod.minText}</li>
                                <li>{calculations.timeperiod.maxText}</li>
                            </ul>
                        </div>
                    </div>
                    <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                        <div className={styles.calcValues}>
                            <label>Expected ROI</label>
                            <div className={styles.inputGrp}>
                            <InputText 
                                type="number"   
                                name="roi"
                                className={`${styles.calcValuesInput} ${styles.ratel} `}
                                value={validate(formDetails.roi)}    
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
                            name="roi" 
                            min={calculations.roi.minValue}
                            max= {calculations.roi.maxValue}
                            onChange={handleChange}
                            value={formDetails.roi} 
                            onMouseUp={betterFunction}                  
                            step={0.05}
                            onTouchEnd={betterFunction}
                            />
                            <ul className={styles["range-labels"]}>
                            <li>{calculations.roi.minText}</li>
                            <li>{calculations.roi.maxText}</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.totalEstimateBx}>
                    <div className={styles.estimateContainer}>
                        <div className={styles.investProfit}>
                            <span className="font16 text444 fontBold">₹ { apiAmount && !isNaN(apiAmount.investmentAmount) ? parseInt(apiAmount.investmentAmount).toLocaleString('en-IN'):'' }</span>
                            <p className="font14 text666 mt15">Total investment</p>
                        </div>
                        <span className={styles.plus}> +</span>
                        <div className={styles.investProfit}>
                            <span className="font16 text444 fontBold">₹ { apiAmount && !isNaN(apiAmount.wealthGained) ? parseInt(apiAmount.wealthGained).toLocaleString('en-IN'):'' }</span>
                            <p className="font14 text666 mt15">Profit</p>
                        </div>
                    </div>
                <button className="btn-primary"><span className="font16 textWhite fontBold">₹ { apiAmount && !isNaN(apiAmount.futureValue) ? parseInt(apiAmount.futureValue).toLocaleString('en-IN'):'' }</span><label className="font14 textWhite">Current value of investment </label></button>
            </div>
        </div>
    )
}