import React, {useState, useEffect} from 'react'
import styles from './Gratuity.module.css';
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import InputText from '../../../form/inputText'
import {isPincode, isyear } from '../../../form/inputValidators'
import { gratuityCal } from '../../../services/calculators';
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";

export const Gratuity = ({calculations, cmsData,rightNavBar}) => {
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
          "text": "Gratuity Calculator",
          "path": "/calculator/gratuity-calculator", 
          "class": ""
        }
      ]
    
    const [formDetails, setFormDetails] = useState({
        MonthlySalary : calculations.MonthlySalary.defaultValue,
        Years : calculations.Years.defaultValue,
        isApiCall : false
    })
    const [apiAmount, setApiAmount] = useState('')
    useEffect(async()=>{
        await getBalance()
    },[])
    const handleChange = (e) => {
        const { name, value} = e.target;
        formDetails.isApiCall = true
        if(value)value=value.toString().replace(/,/g,"");
        if (parseInt(value) > parseInt(calculations[name].maxValue)){
            value = calculations[name].maxValue;
        }
        setFormDetails({ ...formDetails, [name]: value});
    }; 
    const checkemiFields =() =>{
        let check=true
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
           "basicPlusDA": formDetails.MonthlySalary,
           "noOfYears" : formDetails.Years
          }
          let balcal = await gratuityCal(data)
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

    return (
        <>
        <div className="container"> 
            <div className="breadCrumb">
                <BreadCrumb links={breadCrumbLinks} />
            </div>
            <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">Gratuity Calculator</h1>
            {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
        </div>
        <div className="container">
            <div className={styles.calcwrap}>
                <div className={styles.calculator}>
                    <div className={`${styles.rangecalc} 'emimarg'`}>
                        <div className={styles.calcValues}>
                          <label>Monthly Salary (Basic + DA)</label>
                          <div className={styles.inputGrp}>
                            <span className="Sign">₹</span>
                            <InputText 
                               type="text" 
                               name="MonthlySalary"
                               validateInput={isPincode}
                               value={parseInt(formDetails.MonthlySalary || 0).toLocaleString('en-IN')}
                               handleChange={handleChange}
                               handleBlur={betterFunction}
                               onMouseOver={betterFunction}
                               />
                          </div>
                        </div>
                        <div className={styles.rangeSlider}>
                          <input  
                            type="range"  
                            name="MonthlySalary" 
                            value={formDetails.MonthlySalary} 
                            onChange={handleChange} 
                            className="slider maxl " 
                            onMouseUp={betterFunction}
                            onTouchEnd={betterFunction}
                            min={calculations.MonthlySalary.minValue}
                            max= {calculations.MonthlySalary.maxValue} 
                            />
                          <ul className={styles.rangelabels}>
                            <li>₹ {calculations.MonthlySalary.minText}</li>
                            <li> ₹ {calculations.MonthlySalary.maxText}</li>
                          </ul>
                        </div>
                      </div>
                      <div className={`${styles.rangecalc} emimarg`}>
                        <div className={styles.calcValues}>
                          <label>Years in Service</label>
                          <div className={`${styles.inputGrp} ${styles.lwidth}`}>
                          <InputText 
                               type="text" 
                               name="Years"
                               validateInput={isyear}
                               
                               value={parseInt(formDetails.Years || 0).toLocaleString('en-IN')}
                               handleChange={handleChange}
                               handleBlur={betterFunction}
                               onMouseOver={betterFunction}
                               />                            
                            <span className="Sign">Years</span>
                          </div>
                        </div>
                        <div className={styles.rangeSlider}>
                        <input  
                            type="range"  
                            name="Years" 
                            value={formDetails.Years} 
                            onChange={handleChange} 
                            className="slider maxl" 
                            onMouseUp={betterFunction}
                            onTouchEnd={betterFunction}
                            min={calculations.Years.minValue}
                            max= {calculations.Years.maxValue} />
                          <ul className={styles.rangelabels}>
                            <li>{calculations.Years.minText}</li>
                            <li>{calculations.Years.maxText}</li>
                          </ul>
                        </div>
                      </div>
                </div>
                <div className={styles.calcResult}>
                    <p className="font14 textWhite mb15">Total Gratuity Payable to You</p>
                    <p className="font26  textWhite fontBold mb15">₹{Math.round(apiAmount).toLocaleString('en-IN')}</p>
                    <p className= { `font14 ${styles.desc} lineHeight20`}> You’re eligible for gratuity after working
                        for 5 years in the same organization</p>
                </div>
            </div>
        </div>
        {cmsData.length>0 && 
        <>
        <div className="container containerFlex">
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