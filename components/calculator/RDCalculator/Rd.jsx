import styles from "../calculator.module.css";
import React, { useEffect, useState } from "react";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import InputText from '../../../form/inputText';
import { rdCal } from "../../../services/calculators";
import { Doughnut } from 'react-chartjs-2';
import { isPincode, isRate, isyear } from '../../../form/inputValidators'
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
export const Rd = ({ cmsData ,rightNavBar}) => {
  const [apiAmount, setApiAmount] = useState({})

  const [rdval, setRdVal] = useState({
    depositAmount: "50000",
    roi: "6.5",
    timeperiod: "3",
    compoundFrequency: "3"
  })
  useEffect(async () => {
    await getBalance()
  }, [])

  const handleChange = (e) => {
    const { name, value, max } = e.target;


    if (value) value = value.toString().replace(/,/g, "");
    if (parseInt(value) > parseInt(max)) {
      value = max;
    }
    setRdVal({ ...rdval, [name]: value });
  };

  const checkrdcal = () => {
    let check = true
    for (let key in rdval) {
      if (rdval[key] == '' || rdval[key] == undefined) {
        check = false
      }
    }
    return check
  }

  const getBalance = async () => {
    if (checkrdcal()) {
      let data = {
        monthlyDepositAmount: rdval.depositAmount,
        rate: rdval.roi,
        timePeriod: rdval.timeperiod,
        compoundFrequency: rdval.compoundFrequency
      }
      let balcal = await rdCal(data)
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

  const breadCrumbLinks = [
    {
      "text": "Calculators",
      "path": "/calculator",
      "class": ""
    },
    {
      "text": "RD Calculator",
      "path": "/calculator/rd-calculator",
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
  var validate = (value) => {
    let p1 = (value.indexOf(".") >= 0) ? (value.substr(0, value.indexOf(".")) + value.substr(value.indexOf("."), 3)) : value;
    return p1
  }
  return (
    <>
      <div className="container">
        <BreadCrumb links={breadCrumbLinks} />
        <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">RD Calculator</h1>
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
                    name="depositAmount"
                    className={styles.calcValuesInput}
                    validateInput={isPincode}
                    value={parseInt(rdval.depositAmount || 0).toLocaleString('en-IN')}
                    handleChange={handleChange}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                    min="100"
                    max='100000000'
                  />
                </div>
              </div>
              <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl"
                  min="100"
                  max="100000000"
                  name="depositAmount"
                  value={rdval.depositAmount}
                  onChange={handleChange}
                  onTouchEnd={betterFunction}
                  onMouseUp={betterFunction}


                />
                <ul className={styles['range-labels']}>
                  <li>{'₹ 100'}</li>
                  <li>{'₹ 10Cr'}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Rate of Interest (p.a.)</label>
                <div className={styles.inputGrp} >
                  <InputText
                    className={`${styles.calcValuesInput} ${styles.lwidth}`}
                    type="number"
                    name="roi"
                    min="3.5"
                    max="16"
                    value={validate(rdval.roi)}
                    validateInput={isRate}
                    handleChange={handleChange}
                    handleBlur={betterFunction}
                    onMouseOver={betterFunction}
                  />
                  <span className={styles.Sign}>%</span>
                </div>
              </div>
              <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl"
                  name="roi"
                  min="3.5"
                  max="16"
                  onChange={handleChange}
                  value={rdval.roi}
                  onTouchEnd={betterFunction}
                  onMouseUp={betterFunction}
                  step={0.05}
                />
                <ul className={styles['range-labels']}>
                  <li>{'3.5'}</li>
                  <li>{'16'}</li>
                </ul>
              </div>
            </div>
            <div className={`${styles.rangecalc} ${styles.emimarg}`}>
              <div className={styles.calcValues}>
                <label>Time Period</label>
                <div className={styles.inputGrp} >

                  <InputText
                    type="text"
                    name="timeperiod"
                    min="1"
                    max="10"
                    className={`${styles.calcValuesInput} ${styles.lwidth}`}
                    value={rdval.timeperiod}
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
                  name="timeperiod"
                  min="1"
                  max="10"
                  value={rdval.timeperiod}
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

          </div>
          <div className={styles.resultwrap}>

            <p className="font12 font600 textBlack mb30 mb30">
              Recurring Deposit Breakdown
            </p>
            <div className={styles['chart-container']}>
              <Doughnut data={{ labels: [], datasets: [{ data: [!isNaN(apiAmount.investedAmount) ? parseInt(apiAmount.investedAmount) : '', !isNaN(apiAmount.estimatedReturns) ? parseInt(apiAmount.estimatedReturns) : ''], backgroundColor: ['rgba(255, 67, 86, 1)', 'rgba(59, 65, 158, 1)'] }] }} options={{ rotation: -90, circumference: 180 }} />
            </div>
            {/* <figure className={styles.piechart}>
            <img src="/assets/images/pie chart.svg" className="imgResponsive" alt="" />
          </figure> */}
            <div className={styles.calculatevalues}>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}>  Invested Amount</p>
                </div>
                <p className={styles.amt}>₹ {!isNaN(apiAmount.investedAmount) ? parseInt(apiAmount.investedAmount).toLocaleString('en-IN') : ''}</p>
              </div>
              <div className={styles.amount}>
                <div className={styles.collect}>
                  <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}>  Estimated Return</p>

                </div>
                <p className={styles.amt}>₹ {!isNaN(apiAmount.estimatedReturns) ? parseInt(apiAmount.estimatedReturns).toLocaleString('en-IN') : ''} </p>
              </div>
              <div className={`${styles.amount} ${styles.total}`}>
                <p className={styles.info} >Maturity Amount</p>
                <p className={styles.amt}>₹ {!isNaN(apiAmount.totalValue) ? parseInt(apiAmount.totalValue).toLocaleString('en-IN') : ''}</p>
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