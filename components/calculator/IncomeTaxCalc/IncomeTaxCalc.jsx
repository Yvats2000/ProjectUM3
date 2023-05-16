import React, { useState, useEffect } from 'react'
import styles from "../calculator.module.css";
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar, Tooltip } from "../../shared";
import InputText from '../../../form/inputText';
import { Select as SelectBox } from "../../ui";
import Validation from '../../../form/Validation';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Image from 'next/image';


export const IncomeTaxCalc = ({ cmsData,rightNavBar }) => {

    //Financial calculators Box
  let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))

    const cityData = [
        {
            "id": 1,
            "cityName": "Delhi",
            "isMetroCity": true
        },
        {
            "id": 1,
            "cityName": "Mumbai",
            "isMetroCity": true
        },
        {
            "id": 1,
            "cityName": "Chennai",
            "isMetroCity": true
        },
        {
            "id": 1,
            "cityName": "Kolkata",
            "isMetroCity": true
        },
        {
            "id": 2,
            "cityName": "Others",
            "isMetroCity": false
        }
    ]
    const breadCrumbLinks = [
        {
            "text": "Calculators",
            "path": "/calculator",
            "class": ""
        },
        {
            "text": "Income Tax Calculator",
            "path": "/calculator/income-tax-calculator",
            "class": ""
        }
    ]
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
        grossIncome: "",
        basicPay: "",
        annualHRA: "",
        Investment_80C: "",
        Investment_80CCD: "",
        Investment_80D: "",
        house_rent_monthly: ""
    });

    const [data, setData] = useState({})
    const [formErrors, setFormErrors] = useState({})
    const [age, setAge] = useState()


    const isAllowed = (value, type) => {
        switch (type) {
            case 'grossIncome':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'basicPay':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'annualHRA':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'Investment_80C':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'Investment_80CCD':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'Investment_80D':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'house_rent_monthly':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            default:
                return true;
        }
    }
    const handleChange = (e) => {
        let { name, value, max, min } = e.target;
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
                "grossIncome": formDetails.grossIncome,
                "basicPay": formDetails.basicPay,
                "city": "",
                "annualHRA": formDetails.annualHRA,
                "Investment_80C": formDetails.Investment_80C,
                "Investment_80CCD": formDetails.Investment_80CCD,
                "Investment_80D": formDetails.Investment_80D,
                "house_rent_monthly": formDetails.house_rent_monthly,
                "cess": 0.04,
                "gender": "Male",
                "dob": ""
            }

            //   old tax regime
            let metrocitytax = formDetails.city === "1" ? 0.50 : 0.40
            let hra1 = fieldsdata.annualHRA > 0 ? fieldsdata.annualHRA : 0;
            let hra2 = (fieldsdata.house_rent_monthly * 12 - 0.1 * fieldsdata.basicPay) > 0 ? parseInt(fieldsdata.house_rent_monthly * 12 - 0.1 * fieldsdata.basicPay) : 0
            let hra3 = (metrocitytax * fieldsdata.basicPay) > 0 ? (metrocitytax * fieldsdata.basicPay) : 0;
            let hraarr = []
            if ((hra1 || hra2 || hra3) != 0) {
                hra1 && hraarr.push(hra1)
                hra2 && hraarr.push(hra2)
                hra3 && hraarr.push(hra3)
            }

            let total_Investment = 0
            let a = fieldsdata.Investment_80C === "" ? 0 : parseInt(fieldsdata.Investment_80C)
            let b = fieldsdata.Investment_80D === "" ? 0 : parseInt(fieldsdata.Investment_80D)
            let sumab = a + b > 150000 ? 150000 : a + b
            let c = fieldsdata.Investment_80CCD === "" ? 0 : parseInt(fieldsdata.Investment_80CCD)
            total_Investment = (parseInt(sumab + c))
            let house_rent_excemption = hraarr.length > 0 ? Math.min(...hraarr) : 0;
            let taxable_income = fieldsdata.grossIncome - (house_rent_excemption + total_Investment + 50000)
            let Oldamount = 0;
            let incomeTaxOld = 0;
            const oldintervals = [250000, 500000, 750000, 1000000, 1250000];
            const oldrates = [0.05, 0.20, 0.20, 0.30, 0.30];

            for (let i = 0; i < oldintervals.length; i++) {
                if (taxable_income > oldintervals[i]) {
                    Oldamount = taxable_income - oldintervals[i];
                    incomeTaxOld += oldrates[i] * Math.min(Oldamount, 250000);
                }
            }
            if (taxable_income > 1500000) {
                Oldamount = taxable_income - 1500000;
                incomeTaxOld += 0.30 * Oldamount
            }

            let old_regime_tax = incomeTaxOld + incomeTaxOld * fieldsdata.cess
            //new tax regime
            const intervals = [250000, 500000, 750000, 1000000, 1250000];
            const rates = [0.05, 0.10, 0.15, 0.20, 0.25, 0.30, 0.30];
            let amount = 0;
            let incomeTaxNew = 0;

            for (let i = 0; i < intervals.length; i++) {
                if (fieldsdata.grossIncome > intervals[i]) {
                    amount = fieldsdata.grossIncome - intervals[i];
                    incomeTaxNew += rates[i] * Math.min(amount, 250000);
                }
            }
            if (fieldsdata.grossIncome > 1500000) {
                amount = fieldsdata.grossIncome - 1500000;
                incomeTaxNew += 0.30 * amount
            }

            let new_regime_tax = incomeTaxNew + incomeTaxNew * fieldsdata.cess
            setData({
                "total_income": fieldsdata.grossIncome,
                "total_Investment": total_Investment,
                "house_rent_excemption": house_rent_excemption,
                "new_regime_tax": new_regime_tax,
                "old_regime_tax": old_regime_tax,
            }
            )

            const birthDate = moment(formDetails.dob).format('YYYY-MM-DD');
            var years = moment().diff(birthDate, 'years', false);
            setAge(years)
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

    const handleRadio = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };

    const handleDobChnage = async (date) => {
        setFormDetails({ ...formDetails, dob: date })
        setFormErrors({ ...formErrors, dob: '' })
    };

    const handleDateChangeRaw = (e) => {
        e.preventDefault();
    }

    const calendarRef = React.useRef();
    return (
        <>
            <div className="container">
                <BreadCrumb links={breadCrumbLinks} />
                <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">Income Tax Calculator</h1>
                {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
                <div className={`${styles.calcwrap} mb0`}>
                    <div className={styles.calculator}>
                        <p className="font16 font600 textBlack mb20 ">Basic Details</p>
                        <div className={`${styles.twoinput} ${styles.baseline}`}>
                            <div className='radiogrp grid2Span'>
                                <p className='mb10 font14'>Gender :</p>
                                <div className="raidoInputBox mb20">
                                    <label className="radioInput text313541" onChange={handleRadio}  >
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value="Male"
                                            name="gender"
                                            defaultChecked={formDetails.gender == 'Male'}
                                        />
                                        <span className="radioCheck"></span>
                                        <span className="radioText font12"  >Male</span>
                                    </label>
                                    <label className="radioInput text313541" onChange={handleRadio}  >
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value="Female"
                                            name="gender"
                                            defaultChecked={formDetails.gender == 'Female'}
                                        />
                                        <span className="radioCheck"></span>
                                        <span className="radioText font12"  >Female</span>
                                    </label>
                                </div>
                            </div>
                            <div className="formGroup mb30 zIndex4">
                                <div className="inputIcon">
                                    <div className="calendar" >
                                        <Image onClick={() => calendarRef.current.setOpen(true)} src={process.env.IMAGE_BASEURL + '/images/ic_calendar.svg'} width={19} height={20} className="imgResponsive" alt="bt svg" ></Image>
                                    </div>
                                    <DatePicker
                                        dateFormat="dd/MM/yyyy"
                                        name="dob"
                                        autoComplete="off"
                                        className={`formInput `}
                                        selected={formDetails.dob}
                                        placeholderText="DOB (DD/MM/YYYY)"
                                        onChange={(date) => handleDobChnage(date)}
                                        showYearDropdown
                                        yearDropdownItemNumber={50}
                                        scrollableYearDropdown
                                        minDate={moment().subtract(82, "years")._d}
                                        maxDate={moment().subtract(18, 'years')._d}
                                        ref={calendarRef}
                                    />
                                </div>
                                {formDetails.dob && age && age > 0 && <span className={styles.agecalc}>{age} years old</span>}
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="grossIncome"
                                    name="grossIncome"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={formDetails.grossIncome ? parseInt(formDetails.grossIncome).toLocaleString('en-IN') : formDetails.grossIncome}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    required={true}
                                    min='0'
                                    max='100000000'
                                />
                                <label htmlFor="grossincome">Gross Income (Annual)</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="basicPay"
                                    name="basicPay"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={formDetails.basicPay ? parseInt(formDetails.basicPay).toLocaleString('en-IN') : formDetails.basicPay}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    required={true}
                                    min='0'
                                    max='100000000'
                                />
                                <label htmlFor="basicPay">Basic Pay (Annual)</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="annualHRA"
                                    name="annualHRA"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={formDetails.annualHRA ? parseInt(formDetails.annualHRA).toLocaleString('en-IN') : formDetails.annualHRA}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='100000000'
                                    required={true}
                                />
                                <label htmlFor="annualHRA">Annual HRA (House Rent Allowance)</label>
                            </div>
                            <div className="form-item">
                                <SelectBox name="city" required onChange={(e) => handleChange(e)}>
                                    <>
                                        <option value="" disabled selected>Select City</option>
                                        {cityData.map((e) => {
                                            return <option value={e.id} key={e.id} selected={formDetails.city === e.cityName}>{e.cityName}</option>
                                        })}
                                    </>
                                </SelectBox>
                            </div>
                        </div>
                        <p className="font16 font600 textBlack mb30 ">Investment Details</p>
                        <div className={styles.twoinput}>
                            <div className="form-item">
                                <InputText type="text"
                                    id="Investment_80C"
                                    name="Investment_80C"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={formDetails.Investment_80C ? parseInt(formDetails.Investment_80C).toLocaleString('en-IN') : formDetails.Investment_80C}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='150000'
                                    required={true}
                                />
                                <label htmlFor="Investment_80C">Investments u/s 80C of Income Tax Act 1961</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="Investment_80CCD"
                                    name="Investment_80CCD"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={formDetails.Investment_80CCD ? parseInt(formDetails.Investment_80CCD).toLocaleString('en-IN') : formDetails.Investment_80CCD}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='50000'
                                    required={true}
                                />
                                <label htmlFor="Investment_80CCD">Investments u/s 80CCD of Income Tax Act 1961</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="Investment_80D"
                                    name="Investment_80D"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={formDetails.Investment_80D ? parseInt(formDetails.Investment_80D).toLocaleString('en-IN') : formDetails.Investment_80D}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='1000000'
                                    required={true}
                                />
                                <label htmlFor="Investment_80D">Medical Insurance - 80D</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="house_rent_monthly"
                                    name="house_rent_monthly"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={formDetails.house_rent_monthly ? parseInt(formDetails.house_rent_monthly).toLocaleString('en-IN') : formDetails.house_rent_monthly}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='1000000'
                                    required={true}
                                />
                                <label htmlFor="house_rent_monthly">House Rent (monthly)*</label>
                            </div>
                        </div>
                    </div>
                    <div className={styles.taxResult}>
                        <p className="font16 fontBold textBlack mb25">Summary of your Investment</p>
                        <div className={styles.allDetails}>
                            <div className={styles.totalIncome}>
                                <p className="font16  text666">Total Income -</p>
                                <p className="font16 fontBold  text3c4198">₹ {!isNaN(data.total_income) ? parseInt(data.total_income * 1).toLocaleString('en-IN') : ''}</p>
                            </div>
                            <div className={styles.otherFactors}>
                                <ul>
                                    <li>
                                        <p className={`font14 text666 lineHeight20 ${styles.headT} textLeft`}>Total <br /> Investment</p>
                                        <p className="font14 fontBold textBlack">₹ {!isNaN(data.total_Investment) ? parseInt(data.total_Investment).toLocaleString('en-IN') : ''}</p>
                                    </li>
                                    <li>
                                        <p className={`font14 text666 lineHeight20 ${styles.headT} textLeft`}>HRA  <br />Exemption</p>
                                        <p className="font14 fontBold textBlack">₹ {!isNaN(data.house_rent_excemption) ? parseInt(data.house_rent_excemption * 1).toLocaleString('en-IN') : ''}</p>
                                    </li>
                                    <li>
                                        <p className={`font14 text666 lineHeight20 ${styles.headT} textLeft`}>Old <br /> Tax Regime</p>
                                        <p className="font14 fontBold textBlack">₹ {!isNaN(data.old_regime_tax) ? parseInt(data.old_regime_tax).toLocaleString('en-IN') : ''}</p>
                                    </li>
                                </ul>
                            </div>
                            <div className={styles.finalOutput}>
                                <p className="font14 text666 mb15">New Tax Regime</p>
                                <p className="font24 fontBold text3c4198 mb5">₹ {!isNaN(data.new_regime_tax) ? parseInt(data.new_regime_tax).toLocaleString('en-IN') : ''}</p>
                                <p className="font14  text3c4198 ">Tax payable *</p>
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