import React, { useEffect, useState } from "react";
import { NavLink } from "../../ui";
import styles from "../calculator.module.css";
import InputText from '../../../form/inputText'
import { isNumeric, isyear, isRate, isPincode } from '../../../form/inputValidators'
import { ArcElement } from "chart.js";
import {Doughnut} from 'react-chartjs-2';
import commonFunctions from '../../../utils/CommonFunctions';
import { emiCal } from "../../../services/calculators";
import { Button } from "../../ui/button";
export const EmiCalculator = ({ calculatorType, title, calculation, bankCalculator, path, products, isInterest=false,loanType }) => {
  const[breakup, setBreakup] = useState([])
    const [emi, setEmiDetails] = useState({
        loanAmount : calculation.loanAmount.defaultValue,
        tenure : calculation.tenure.defaultValue,
        rate : calculation.rate.defaultValue,
    })
    const[banks, setBanks] = useState([])
    useEffect(async() =>{
        await getBalance()
      },[])
    var validate = (value) => {
        let p1 = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
        return p1
    }
    const[activeYear,setActiveYear] = useState(-1)
  const openTable = (y) => {
    if(activeYear == y){
      setActiveYear(-1)
    }else{
        setActiveYear(y)
    }
  }
  const  checkemiFields =() =>{
    let check=true
    for (let key in emi){
      if(emi[key]==''|| emi[key]==undefined){
       check=false
      }
    }
    return check
  }
    const getBalance = async() => {
        if(checkemiFields()){
          let data = {
            principal : emi.loanAmount,
            rate : emi.rate,
            tenureInMonths :  emi.tenure*12
          }
          let balcal = await emiCal(data)
          setBanks(balcal.data.Emi)
          setBreakup(balcal.data.EmiBreakup)
        }
      };
    const handleChange = (e) => {
		const { name, value} = e.target;
    if(value)value=value.toString().replace(/,/g,"");
		if (parseInt(value) > parseInt(calculation[name].maxValue)){
      value = calculation[name].maxValue;
    }
    setEmiDetails({ ...emi, [name]: value });
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
      const records = 5;
  const [showNumberOfAmc, setShowNumberOfAmc] = useState(records);
  const viewMore = () => {
    setShowNumberOfAmc(showNumberOfAmc+breakup.length - 5)
  }
  return (
    <>
      <div className={styles.calcBox}>
          <div className="form-container w100 ptl15Sm">
            <div className="raidoInputBox mb20">
              {bankCalculator && products && products.length > 0 ? products.map((data, index) => 
                <NavLink href={`${path+ "/" + data.path}`} key={index}>
                <label className="radioInput text313541">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={data.path}
                    defaultChecked={title === data.path.split('-calculator')[0].split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()) ? "checked" : ""}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12">{data.path.split('-calculator')[0].split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}</span>
                </label>
              </NavLink>
              ) :
              <>
              {
                isInterest ?
                <NavLink href={`${process.env.BASE_URL + "/loans/" + loanType + "/" + calculatorType}`}>
                <label className="radioInput text313541">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={loanType}
                    defaultChecked={"checked"}
                  />
                  <span className="radioCheck"></span>
                  <span className="radioText font12">{title}</span>
                </label>
              </NavLink> : 
              <>
              <NavLink href={`${process.env.BASE_URL + "/loans/" + "home-loan" + "/" + calculatorType}`}>
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
              <NavLink href={`${process.env.BASE_URL + "/loans/" + "personal-loan" + "/" + calculatorType}`}>
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
              </>
              }
              {!isInterest &&
              <NavLink href={`${process.env.BASE_URL + "/loans/" + "business-loan" + "/" + calculatorType}`}>
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
              </NavLink>}
              </>
              }
            </div>
          </div>
          <div className={styles.calc}>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Loan Amount</label>
                <div className={styles.inputGrp} >
                  <span className={styles.Sign}>₹</span>
                  <InputText 
                    type="text"
                    name="loanAmount" 
                    className={styles.calcValuesInput}  
                    value={parseInt(emi.loanAmount || 0).toLocaleString('en-IN')}
                    handleChange={handleChange}  
                    validateInput={isPincode}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    />
                </div>
              </div>
              <div className={styles.rangeSlider}>
              <input type="range" className="slider maxl" 
                min={calculation.loanAmount.minValue} 
                max={calculation.loanAmount.maxValue} 
                name="loanAmount" 
                value={emi.loanAmount} 
                onChange={handleChange} 
                onMouseUp={betterFunction}
                onTouchEnd={betterFunction}
                />
                <ul className={styles['range-labels']}>
                  <li>{calculation.loanAmount.minText}</li>
                  <li>{calculation.loanAmount.maxText}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Loan Tenure</label>
                <div className={styles.inputGrp}>                  
                <InputText 
                    type="number"
                    name="tenure" 
                    className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                    value={emi.tenure}
                    handleChange={handleChange}  
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
                  min={calculation.tenure.minValue} 
                  max={calculation.tenure.maxValue}
                  name="tenure"
                  value={emi.tenure} 
                  onChange={handleChange}
                  onMouseUp={betterFunction}
                  onTouchEnd={betterFunction}
                  />
                <ul className={styles["range-labels"]}>
                  <li>{calculation.tenure.minText}</li>
                  <li>{calculation.tenure.maxText}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Rate Of Interest</label>
                <div className={styles.inputGrp}>
                <InputText 
                    type="number"   
                    name="rate"
                    className={`${styles.calcValuesInput} ${styles.ratel} `}
                    value={validate(emi.rate)}
                    handleChange={handleChange}  
                    validateInput={isRate}
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
                  min={calculation.rate.minValue} 
                  max={calculation.rate.maxValue}
                  name="rate" 
                  value={emi.rate} 
                  onChange={handleChange}
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
          </div>
          <div className={styles.newcalcDetails}>
          <p className="font12  text7c7f87 fontsemiBold mb20 type widthadj">Monthly Loan EMI</p>
            {!isNaN(banks.emi) && <div className={`mb20 ${styles.totalamt}`}>
              <sup className={styles.rupee}>₹</sup>
              <span className={styles.price}>{parseInt(banks.emi).toLocaleString('en-IN')}</span>
              </div>}
              <p className="font12 fontStyleItalic lineHeight20  text7c7f87 fontsemiBold textCenter type widthadj">{commonFunctions.convertNumberToWords(banks.emi ? parseInt(banks.emi).toLocaleString('en-IN') : '')}</p>
            
          </div>
          <div className={styles.calcDetail}>
            <p className="font18 fontsemiBold text181d mb30 textCenter">
            Payment Breakdown:
            </p>
            <div className={styles['chart-container']}>
              <Doughnut data={{labels: [],datasets: [{data: [!isNaN(emi.loanAmount) ? parseInt(emi.loanAmount):'', !isNaN(banks.interstPayable) ? parseInt(banks.interstPayable):''],backgroundColor: ['rgba(255, 67, 86, 1)','rgba(59, 65, 158, 1)']}]}} options={{rotation: -90,circumference: 180}} />
            </div>
            {/* <figure className={styles.piechart}>
              <img src="/assets/images/pie chart.svg" className="imgResponsive" alt="" />
            </figure> */}
            <div className={styles.calculatevalues}>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}>  Principal Amount</p>
                </div>
                <p className={styles.amt}>{ !isNaN(emi.loanAmount) ? '₹' + parseInt(emi.loanAmount).toLocaleString('en-IN'):'' }</p>
              </div>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}>  Interest Payable</p>
                  
                </div>
                <p className={styles.amt}>{ !isNaN(banks.interstPayable) ? '₹' + parseInt(banks.interstPayable).toLocaleString('en-IN'):'' }</p>
              </div>
              <div className={`${styles.amount} ${styles.total}`}>
                <p className={styles.info} >Total Amount Payable</p>
                 <p className={styles.amt}>{ !isNaN(banks.totalAmountPayable) ? '₹' + parseInt(banks.totalAmountPayable).toLocaleString('en-IN'):'' }</p>
              </div>
            </div>
            {breakup && Object.keys(breakup).length > 0 ? <button onClick={() => scrollTo()} className="btn font12 btn25 textCenterSm">View EMI Schedule<em className="icon-arrow-right font14"></em></button> : null}
          </div>
      </div>
      <div className="container" id="bankOffers">
      {breakup && breakup.length > 0 ? <h2 className="font24 mb40 text2828 fontMedium lineHeight36">EMI Payment Schedule</h2> : null}
      {breakup.map((split, index) =>
        <div className={`${styles.accordianTable} ${styles.brekup} ${index < showNumberOfAmc ? styles.active : null}`} key={index}>
          <div className={`${styles.table}`}>
            <ul className={styles.showMonthly}>
              <li>
                <p className={styles.amount}>{split.year}</p>
                <p className={styles.type}>Monthly payment</p>
              </li>
              <li>
                <span onClick={(e) =>openTable(split.year)} className="textLink font12 fontsemiBold cursorPointer">{activeYear == split.year?'Hide':'Show'}   Monthly Breakup <em className="icon-icon-angle-right topmarg textLink"></em></span>
              </li>
            </ul>
            {activeYear == split.year ? 
            <div className={styles.dtlbox}>
              <table >
                <thead>
                  <th>Months</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Total Payment</th>
                  <th>Balance</th>
                </thead>
                <tbody >
                  {split.monthData.map((month,index) => 
                  <tr key={index} >
                    <td>{month.monthName}</td>
                    <td>₹ {month.principalRepayment.toLocaleString('en-IN')}</td>
                    <td>₹ {month.interestOnPrincipal.toLocaleString('en-IN')}</td>
                    <td>₹ {month.emiPerMonth.toLocaleString('en-IN')}</td>
                    <td>₹ {month.balance.toLocaleString('en-IN')}</td>
                    </tr>
                     )}
                </tbody>
              </table>
            </div>
            : <React.Fragment /> }
          </div>
        </div>
                  
      )}
      {
        showNumberOfAmc < breakup.length ?<div className={styles.btncenter}>
        <Button className="btn btn-primary font14 btn25 textCenterSm btnFull" onClick={()=>viewMore()}>Show More<em className="icon-arrow-right font14"></em></Button>
    </div>:null
      }
       
      </div>
    </>
    
  )
}
