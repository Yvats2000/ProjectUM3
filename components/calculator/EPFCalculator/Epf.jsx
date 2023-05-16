import React, { useState, useEffect } from 'react'
import styles from "../calculator.module.css";
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import InputText from '../../../form/inputText';
import { isPincode, isyear } from '../../../form/inputValidators';
import Validation from '../../../form/Validation';
export const Epf = ({ cmsData ,rightNavBar}) => {
  const breadCrumbLinks = [
    {
      "text": "Calculators",
      "path": "/calculator",
      "class": ""
    },
    {
      "text": "EPF Calculator",
      "path": "/calculator/epf-calculator",
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
  const [formDetails, setFormDetails] = useState({
    age: 30,
    retirementAge: 55,
    mohthlyBasicSalary: 50000,
    currentEPFBalance: 0,
    contribution: 12,
    avgAnnualIncreaseInSalary: 5,
    isApiCall: false
  });

  const [data, setData] = useState({})


  const isAllowed = (value, type) => {
    switch (type) {
      case 'age':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'retirementAge':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'mohthlyBasicSalary':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'currentEPFBalance':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'contribution':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'avgAnnualIncreaseInSalary':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      default:
        return true;
    }
  }

  const handleChange = (e) => {
    const { name, value, max, min } = e.target;
    formDetails.isApiCall = true
    if (value) value = value.toString().replace(/,/g, "");
    if (parseInt(value) > parseInt(max)) {
      value = max;
    }
    let isValid = isAllowed(value, name)
    if (isValid) {
      setFormDetails({ ...formDetails, [name]: value });
    }
  };
  const checkemiFields = () => {
    let check = true
    for (let key in formDetails) {
      if (formDetails[key] == '' || formDetails[key] == 0 || formDetails[key] == undefined) {
        check = false
      }
    }
    return check
  }
  useEffect(async () => {
    await getBalance()
  }, [formDetails])

  const getBalance = async () => {
    if (checkemiFields) {
      let fieldsdata = {
        "currentage": formDetails.age,
        "retirementage": formDetails.retirementAge,
        "mohthlyBasicSalary": formDetails.mohthlyBasicSalary,
        "currentEPFBalance": formDetails.currentEPFBalance,
        "contribution": formDetails.contribution,
        "avgAnnualIncreaseInSalary": formDetails.avgAnnualIncreaseInSalary,
        "currentEPFRoi": 8.1
      }
      let sumemployeecontri = 0;
      let sumemployercontri = 0;
      let time = fieldsdata.retirementage - fieldsdata.currentage
      let totalcontribution = parseInt(fieldsdata.contribution) + 3.67
      let epfcontribasic = parseInt(fieldsdata.mohthlyBasicSalary) * 12 * (totalcontribution / 100)
      let employercontri = parseInt(fieldsdata.mohthlyBasicSalary) * 12 * (3.67 / 100)
      let employeecontri = parseInt(fieldsdata.mohthlyBasicSalary) * 12 * (parseInt(fieldsdata.contribution) / 100)
      let epfamt = epfcontribasic + parseInt(fieldsdata.currentEPFBalance)
      let annualepfinterest = epfamt * ((parseFloat(fieldsdata.currentEPFRoi) / 100))
      let amountclosing = epfamt + annualepfinterest
      sumemployeecontri = sumemployeecontri + employeecontri
      sumemployercontri = sumemployercontri + employercontri

      for (let i = 1; i <= time; i++) {
        epfcontribasic = epfcontribasic * (1 + fieldsdata.avgAnnualIncreaseInSalary / 100)
        employeecontri = employeecontri * (1 + fieldsdata.avgAnnualIncreaseInSalary / 100)
        employercontri = employercontri * (1 + fieldsdata.avgAnnualIncreaseInSalary / 100)
        sumemployeecontri = Math.round(sumemployeecontri + employeecontri)
        sumemployercontri = Math.round(sumemployercontri + employercontri)
        epfamt = epfcontribasic + amountclosing;
        annualepfinterest = epfamt * 0.081
        amountclosing = epfamt + annualepfinterest
      }

      setData({
        "annualepfinterest": annualepfinterest,
        "amountclosing": amountclosing,
        "sumemployercontri": sumemployercontri,
        "sumemployeecontri": sumemployeecontri,
      }
      )

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
  const betterFunction = debounced(getBalance, 0.5);
  return (
    <>
      <div className="container">
        <BreadCrumb links={breadCrumbLinks} />
        <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">EPF Calculator</h1>
        {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
        <div className={styles.calcwrap}>
          <div className={styles.calculator}>
            <div className={styles.twoinput}>
              <div className="form-item">
                <InputText type="text"
                  id="age"
                  name="age"
                  autoComplete="off"
                  className={`${"formInput "}`}
                  value={parseInt(formDetails.age || 0).toLocaleString('en-IN')}
                  handleChange={handleChange}
                  handleBlur={betterFunction}
                  onMouseOver={betterFunction}
                  required={true}
                  min='15'
                  max='58'
                />
                <label htmlFor="Age">Age</label>
              </div>
              <div className="form-item">
                <InputText type="text"
                  id="retirementAge"
                  name="retirementAge"
                  autoComplete="off"
                  className={`${"formInput "}`}
                  value={parseInt(formDetails.retirementAge || 0).toLocaleString('en-IN')}
                  handleChange={handleChange}
                  handleBlur={betterFunction}
                  onMouseOver={betterFunction}
                  required={true}
                  min='30'
                  max='65'
                />
                <label htmlFor="retirementAge">Retirement Age</label>
              </div>
              <div className="form-item">
                <InputText type="text"
                  id="mohthlyBasicSalary"
                  name="mohthlyBasicSalary"
                  autoComplete="off"
                  className={`${"formInput "}`}
                  value={parseInt(formDetails.mohthlyBasicSalary || 0).toLocaleString('en-IN')}
                  handleChange={handleChange}
                  handleBlur={betterFunction}
                  onMouseOver={betterFunction}
                  min='1000'
                  max='500000'
                  required={true}
                />
                <label htmlFor="mohthlyBasicSalary">Monthly Basic Salary</label>
              </div>
              <div className="form-item">
                <InputText type="text"
                  id="currentEPFBalance"
                  name="currentEPFBalance"
                  autoComplete="off"
                  className={`${"formInput "}`}
                  value={parseInt(formDetails.currentEPFBalance || 0).toLocaleString('en-IN')}
                  handleChange={handleChange}
                  handleBlur={betterFunction}
                  onMouseOver={betterFunction}
                  min='0'
                  max='10000000'
                  required={true}
                />
                <label htmlFor="currentEPFBalance">Current EPF Balance</label>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Your Contribution</label>
                <div className={styles.inputGrp} >
                  <InputText
                    type="text"
                    name="contribution"
                    className={`${styles.calcValuesInput} ${styles.lwidth}`}
                    validateInput={isyear}
                    value={parseInt(formDetails.contribution || 0).toLocaleString('en-IN')}
                    handleChange={handleChange}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    min='12'
                    max='20'
                  />
                  <span className={styles.Sign}>%</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl"
                  name="contribution"
                  onChange={handleChange}
                  onMouseUp={betterFunction}
                  value={formDetails.contribution}
                  onTouchEnd={betterFunction}
                  min='12'
                  max='20'
                />
                <ul className={styles['range-labels']}>
                  <li>{'12'}</li>
                  <li>{'20'}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Average Annual Increase in Salary</label>
                <div className={styles.inputGrp} >

                  <InputText
                    type="text"
                    name="avgAnnualIncreaseInSalary"
                    className={`${styles.calcValuesInput} ${styles.lwidth}`}
                    value={parseInt(formDetails.avgAnnualIncreaseInSalary || 0).toLocaleString('en-IN')}
                    handleChange={handleChange}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    min='0'
                    max='50'

                  />
                  <span className={styles.Sign}>%</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
                <input type="range"
                  className="slider maxl"
                  name="avgAnnualIncreaseInSalary"
                  onChange={handleChange}
                  onMouseUp={betterFunction}
                  value={formDetails.avgAnnualIncreaseInSalary}
                  onTouchEnd={betterFunction}
                  min='0'
                  max='50'
                />
                <ul className={styles['range-labels']}>
                  <li>{'0'}</li>
                  <li>{'50'}</li>
                </ul>
              </div>
            </div>
            <div className={styles.showInterest}>
              <label className="font12 fontsemiBold text231f20">Current EPF Rate of Interest</label>
              <p className="fontBold textBlack">8.1%</p>
            </div>
          </div>
          <div className={`${styles.resultwrap} ${styles.ppfwidth}`}>
            <p className="font12 font600 textBlack mb30 textCenter">
              EPF Investment Breakdown
            </p>
            {/* <div className={styles['chart-container']}>
              <Doughnut data={{labels: [],datasets: [{data: [!isNaN(apiAmount.investedAmount) ? parseInt(apiAmount.investedAmount):'', !isNaN(apiAmount.maturityValue) ? parseInt(apiAmount.maturityValue):''],backgroundColor: ['rgba(255, 67, 86, 1)','rgba(59, 65, 158, 1)']}]}} options={{rotation: -90,circumference: 180}} />
            </div> */}

            <div className={styles.calculatevalues}>
              {/* <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}>  Invested AmountCCC</p>
                </div>
                <p className={styles.amt}>{!isNaN(data.amountclosing) ? parseInt(data.amountclosing).toLocaleString('en-IN') : ''}</p>
              </div>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}>  Maturity Value</p>
                </div>
                <p className={styles.amt}>{!isNaN(data.amountclosing) ? parseInt(data.amountclosing).toLocaleString('en-IN') : ''}</p>
              </div> */}
              {/* <div className={`${styles.amount} ${styles.total}`}>
                <p className={styles.info} >Maturity Amount</p>
                <p className={styles.amt}>₹ {!isNaN(data.amountclosing) ? parseInt(data.amountclosing).toLocaleString('en-IN') : ''}</p>
              </div> */}
            </div>
            <div className={` ${styles.calcInnerGrid}  w100`}>
              <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                <span className="font600 font16 mb10 textBlack"> ₹ {!isNaN(data.amountclosing) ? parseInt(data.amountclosing).toLocaleString('en-IN') : ''}</span>
                <p className="font12  textCenter text757575">Maturity Amount</p>
              </div>
              <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                <span className="font600 font16 mb10 textBlack"> ₹ {!isNaN(data.sumemployeecontri) && !isNaN(data.sumemployercontri) ? parseInt(data.sumemployeecontri + data.sumemployercontri).toLocaleString('en-IN') : ''}</span>
                <p className="font12  textCenter text757575">Total Contribution </p>
              </div>
              <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                <span className="font600 font16 mb10 textBlack"> ₹{!isNaN(data.sumemployercontri) ? parseInt(data.sumemployercontri).toLocaleString('en-IN') : ''}</span>
                <p className="font12  textCenter text757575">Employer Contribution</p>
              </div>
              <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                <span className="font600 font16 mb10 textBlack"> ₹{!isNaN(data.sumemployeecontri) ? parseInt(data.sumemployeecontri).toLocaleString('en-IN') : ''}</span>
                <p className="font12  textCenter text757575">Your Contribution</p>
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