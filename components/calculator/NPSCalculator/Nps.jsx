import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import styles from "../calculator.module.css";
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import InputText from '../../../form/inputText';
import { npsCal } from '../../../services/calculators';
import { isPincode, isRate, isyear } from '../../../form/inputValidators';
import Validation from '../../../form/Validation';
export const Nps = ({ cmsData,rightNavBar }) => {
  const breadCrumbLinks = [
    {
      "text": "Calculators",
      "path": "/calculator",
      "class": ""
    },
    {
      "text": "NPS Calculator",
      "path": "/calculator/nps-calculator",
      "class": ""
    }
  ]
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
  const [activeButton, setActiveButton] = useState(0)
  const [formDetails, setFormDetails] = useState({
    investmentPerMonth: activeButton == 0 ? "10000" : "150000" ,
    age: '34',
    retirement: '60',
    expectedReturnOnAnnuity: '10',
  });
  const [amountInvested, setAmountInvested] = useState()
  const [maturityAmount, setMaturityAmount] = useState()
  const [interestEarned, setInterestEarned] = useState()
  const [minAnnuity, setMinAnnuity] = useState()
  useEffect(async () => {
    await getBalance()
  }, [formDetails, activeButton])

  useEffect(() => {
    if (activeButton==0) setFormDetails({
      investmentPerMonth:"10000" ,
      age: '34',
      retirement: '60',
      expectedReturnOnAnnuity: '10',
    })
    else{
      setFormDetails({
        investmentPerMonth:  "150000" ,
        age: '34',
        retirement: '60',
        expectedReturnOnAnnuity: '10',
      })
    }
  }, [activeButton]);

  const handleChange = (e) => {
    let { name, value, max, min } = e.target;
    if (value) value = value.toString().replace(/,/g, "");
    if (parseInt(value) > parseInt(max)) {
      value = max;
    }
    let isValid = isAllowed(value, name);
    if (isValid) {
      setFormDetails({ ...formDetails, [name]: value });
    }
  };
  const checkemiFields = () => {
    let check = true
    for (let key in formDetails) {
      if (formDetails[key] == '' || formDetails[key] == undefined) {
        check = false
      }
    }
    return check
  }
  const isAllowed = (value, type) => {
    switch (type) {
      case 'investmentPerMonth':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'expectedReturnOnAnnuity':
        return ((value === '' || Validation.validateRate(value)) && value.length < 5);
      default:
        return true;
    }
  }

  const getBalance = async () => {
    if (checkemiFields()) {
      let principal = formDetails.investmentPerMonth > 0 ? formDetails.investmentPerMonth : 0 ;
      let calculatedage = formDetails.retirement - formDetails.age
      let amount = activeButton === 0 ? principal * 12 * calculatedage : principal * calculatedage
      setAmountInvested(amount > 0 ? amount : 0)
      let maturityamt = 0

      if (activeButton === 1) {

        for (let i = 0; i < calculatedage; i++) {
          let e = (principal * 1) + maturityamt;
          let f = formDetails.expectedReturnOnAnnuity / 100 * e;
          maturityamt = e + f
        }
      }

      if (activeButton === 0) {
        for (let i = 0; i < calculatedage; i++) {
          for (let j = 0; j < 12; j++) {
            let e = (principal * 1) + maturityamt;
            let f = (formDetails.expectedReturnOnAnnuity / 1200) * e;
            maturityamt = e + f
          }
        }
      }
      setMaturityAmount((Number((maturityamt + "").split(".")[1]) >= 5) ? Math.ceil(maturityamt) : Math.floor(maturityamt))
      let interest = maturityamt && amount && maturityamt>0 && parseInt(maturityamt) - amount
      setInterestEarned(parseInt(interest))
      let min = 40 / 100 * parseInt(maturityamt)
      setMinAnnuity(parseInt(min))
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
  const betterFunction = debounced(getBalance, 0);

  var validate = (value) => {
    let p1 = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
    return p1
  }

  return (
    <>
      <div className="container">
        <BreadCrumb links={breadCrumbLinks} />
        <h1 className="font24  textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36 mb50">NPS Calculator</h1>
        {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
        <div className={`${styles.calcwrap} mb40`}>
          <div className={styles.calculator}>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>    
            <p className='font14 mb10 textBlack fontsemiBold'>Investment</p>
            <div className={`${styles.buttonTab} mb0`}>
                  <button className={activeButton === 0 ? `${styles.active}` : ""} onClick={() => setActiveButton(0)}>Monthly</button>
                  <button className={activeButton === 1 ? `${styles.active}` : ""} onClick={() => setActiveButton(1)}>Yearly</button>
                </div>
              <div className={styles.calcValues}>
                <label>
                </label>   
                <div className={styles.inputGrp} >
                  <span className={styles.Sign}>₹</span>
                  <InputText
                    type="text"
                    name="investmentPerMonth"
                    className={`${styles.calcValuesInput}`}
                    value={parseInt(formDetails.investmentPerMonth || 0).toLocaleString('en-IN')}
                    handleChange={handleChange}
                    validateInput={isPincode}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    min='500'
                    max={activeButton==0 ? '150000' : '2500000'}
                  />
                </div>
              </div>
              <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl"
                  name="investmentPerMonth"
                  onChange={handleChange}
                  onMouseUp={betterFunction}
                  value={formDetails.investmentPerMonth}
                  onTouchEnd={betterFunction}
                  min='500'
                  max={activeButton==0 ? '150000' : '2500000'}
                />
                <ul className={styles['range-labels']}>
                  <li>500</li>
                  <li>{activeButton==0 ? '1.5L' : '25L'}</li>
                </ul>
              </div>
            </div>
            <div className={`mb30 ${styles.twoinput}`}>
              <div className="form-item">
                <InputText type="number"
                  id="age"
                  name="age"
                  autoComplete="off"
                  className={`${"formInput "}`}
                  value={formDetails.age}
                  handleChange={handleChange}
                  validateInput={isyear}
                  handleBlur={betterFunction}
                  onMouseOver={betterFunction}
                  required={true}
                  min='18'
                  max='60'
                />
                <label htmlFor="Age">Age</label>
              </div>
              <div className="form-item">
                <InputText type="number"
                  id="age"
                  name="retirement"
                  autoComplete="off"
                  className={`${"formInput "}`}
                  value={formDetails.retirement}
                  handleChange={handleChange}
                  handleBlur={betterFunction}
                  validateInput={isyear}
                  onMouseOver={betterFunction}
                  required={true}
                  min='18'
                  max='60'
                />
                <label htmlFor="Age">Retirement Age</label>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Rate Of Interest</label>
                <div className={styles.inputGrp} >
                  <InputText
                    type="text"
                    name="expectedReturnOnAnnuity"
                    className={`${styles.calcValuesInput} ${styles.ratel} `}
                    value={validate(formDetails.expectedReturnOnAnnuity)}
                    handleChange={handleChange}
                    validateInput={isRate}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    min="8"
                    max="15"
                  />
                  <span className={styles.Sign}>%</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl"
                  name="expectedReturnOnAnnuity"
                  onChange={handleChange}
                  onMouseUp={betterFunction}
                  value={formDetails.expectedReturnOnAnnuity}
                  onTouchEnd={betterFunction}
                  min='8'
                  max='15'
                />
                <ul className={styles['range-labels']}>
                  <li>8</li>
                  <li>15</li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.resultwrap} ${styles.ppfwidth}`}>
            <p className="font12 font600 textBlack mb30 textCenter">
              NPS Investment Breakdown:
            </p>
            <div className={` ${styles.calcInnerGrid}  w100`}>
              <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                <span className="font600 font16 mb10 textBlack"> ₹ {amountInvested && !isNaN(amountInvested) ? parseInt(amountInvested).toLocaleString('en-IN') : ''}</span>
                <p className="font12  textCenter text757575">Total Investment</p>
              </div>
              <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                <span className="font600 font16 mb10 textBlack"> ₹ {interestEarned && !isNaN(interestEarned) ? parseInt(interestEarned).toLocaleString('en-IN') : ''}</span>
                <p className="font12  textCenter text757575">Interest Earned</p>
              </div>
              <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                <span className="font600 font16 mb10 textBlack"> ₹ {maturityAmount && !isNaN(maturityAmount) ? parseInt(maturityAmount).toLocaleString('en-IN') : ''}</span>
                <p className="font12  textCenter text757575">Maturity Amount</p>
              </div>
              <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                <span className="font600 font16 mb10 textBlack"> ₹ {minAnnuity && !isNaN(minAnnuity) ? parseInt(minAnnuity).toLocaleString('en-IN') : ''}</span>
                <p className="font12  textCenter text757575">Min. Annuity Investment</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {cmsData.length > 0 &&
        <>
          <div className="container containerFlex mb40">
            <section className={contentStyles.eligible}>
              <div className="container">
                <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
              </div>
            </section>
            <RightSideBar menuLinks={internalLinkEmiCalculator} paddingTop={true} />
          </div>
          {cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
            <section className="faq">
              <div className="container">
                <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
                <div className="faqBx">
                  <FAQ data={cmsData[0].faq_content} />
                </div>
              </div>
            </section>
            : null}
        </>}
    </>
  )
}