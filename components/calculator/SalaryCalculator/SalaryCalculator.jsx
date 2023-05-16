import React, { useState, useEffect } from 'react'
import styles from "../calculator.module.css";
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import InputText from '../../../form/inputText';
import { isPincode, isyear } from '../../../form/inputValidators';
import Validation from '../../../form/Validation';
export const SalaryCalculator = ({ cmsData,rightNavBar }) => {
    const breadCrumbLinks = [
        {
            "text": "Calculators",
            "path": "/calculator",
            "class": ""
        },
        {
            "text": "Salary Calculator",
            "path": "/calculator/salary-calculator",
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
        ctc: 600000,
        bonus: 50000,
        monthlyProfessionalTax: 200,
        monthlyEmployerPf: 1800,
        monthlyEmployeePf: 1800,
        monthlyAdditionalDeduction: "",
        otherDeduction: ""
    });

    const [data, setData] = useState({})


    const isAllowed = (value, type) => {
        switch (type) {
            case 'ctc':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'bonus':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'monthlyProfessionalTax':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'monthlyEmployerPf':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'monthlyEmployeePf':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'monthlyAdditionalDeduction':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            case 'otherDeduction':
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
                "ctc": formDetails.ctc,
                "bonus": formDetails.bonus,
                "monthlyProfessionalTax": formDetails.monthlyProfessionalTax> 0? formDetails.monthlyProfessionalTax : 0 ,
                "monthlyEmployerPf": formDetails.monthlyEmployerPf > 0 ? formDetails.monthlyEmployerPf : 0,
                "monthlyEmployeePf": formDetails.monthlyEmployeePf > 0 ? formDetails.monthlyEmployeePf : 0,
                "monthlyAdditionalDeduction": formDetails.monthlyAdditionalDeduction > 0 ? formDetails.monthlyAdditionalDeduction : 0,
                "otherDeduction": formDetails.otherDeduction > 0 ? formDetails.otherDeduction : 0
            }
            let totalDeduction = parseInt(fieldsdata.monthlyProfessionalTax) + parseInt(fieldsdata.monthlyEmployerPf) + parseInt(fieldsdata.monthlyEmployeePf) + parseInt(fieldsdata.monthlyAdditionalDeduction) + parseInt(fieldsdata.otherDeduction) + (parseInt(fieldsdata.bonus || 0) / 12);
            let totalAnnualDeduction = totalDeduction * 12
            let takeHomeAnnualSalary = (fieldsdata.ctc - totalAnnualDeduction)
            let takeHomeMonthlySalary = takeHomeAnnualSalary / 12

            setData({
                "totalMonthlyDeduction": totalDeduction,
                "totalAnnualDeduction": totalAnnualDeduction,
                "takeHomeAnnualSalary": takeHomeAnnualSalary,
                "takeHomeMonthlySalary": takeHomeMonthlySalary,
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
                <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">Salary Calculator</h1>
                {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
                <div className={styles.calcwrap}>
                    <div className={styles.calculator}>
                        <div className={styles.twoinput}>
                            <div className="form-item">
                                <InputText type="text"
                                    id="ctc"
                                    name="ctc"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={(formDetails.ctc ).toLocaleString('en-IN')}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    required={true}
                                    min='100000'
                                    max='100000000'
                                />
                                <label htmlFor="Ctc">Annual CTC</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="bonus"
                                    name="bonus"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={(formDetails.bonus ).toLocaleString('en-IN')}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    required={true}
                                    min='100'
                                    max='5000000'
                                />
                                <label htmlFor="bonus">Bonus (₹)</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="monthlyProfessionalTax"
                                    name="monthlyProfessionalTax"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={(formDetails.monthlyProfessionalTax ).toLocaleString('en-IN')}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='2500'
                                    required={true}
                                />
                                <label htmlFor="monthlyProfessionalTax">Monthly Professional Tax</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="monthlyEmployerPf"
                                    name="monthlyEmployerPf"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={(formDetails.monthlyEmployerPf ).toLocaleString('en-IN')}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='50000'
                                    required={true}
                                />
                                <label htmlFor="monthlyEmployerPf">Monthly Employer PF</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="monthlyEmployeePf"
                                    name="monthlyEmployeePf"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={(formDetails.monthlyEmployeePf ).toLocaleString('en-IN')}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='50000'
                                    required={true}
                                />
                                <label htmlFor="monthlyEmployeePf">Monthly Employee PF</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="monthlyAdditionalDeduction"
                                    name="monthlyAdditionalDeduction"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={(formDetails.monthlyAdditionalDeduction ).toLocaleString('en-IN')}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='1000000'
                                    required={true}
                                />
                                <label htmlFor="monthlyAdditionalDeduction">Monthly Additional Deduction</label>
                            </div>
                            <div className="form-item">
                                <InputText type="text"
                                    id="otherDeduction"
                                    name="otherDeduction"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={(formDetails.otherDeduction).toLocaleString('en-IN')}
                                    handleChange={handleChange}
                                    handleBlur={betterFunction}
                                    onMouseOver={betterFunction}
                                    min='0'
                                    max='1000000'
                                    required={true}
                                />
                                <label htmlFor="otherDeduction">Other Deductions</label>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles.resultwrap} ${styles.ppfwidth}`}>
                        <p className="font16 font600 textBlack mb30 textCenter">
                            Salary Breakdown
                        </p>
                        <div className={styles.calculatevalues}>
                        </div>
                        <div className={` ${styles.calcInnerGrid}  w100`}>
                            <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                                <span className="font600 font16 mb10 textBlack"> ₹ {!isNaN(data.totalMonthlyDeduction) ? parseInt(data.totalMonthlyDeduction).toLocaleString('en-IN') : ''}</span>
                                <p className="font12  textCenter text757575">Total Monthly Deductions</p>
                            </div>
                            <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                                <span className="font600 font16 mb10 textBlack"> ₹ {!isNaN(data.totalAnnualDeduction)  ? parseInt(data.totalAnnualDeduction).toLocaleString('en-IN') : ''}</span>
                                <p className="font12  textCenter text757575">Total Annual Deductions </p>
                            </div>
                            <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                                <span className="font600 font16 mb10 textBlack"> ₹{!isNaN(data.takeHomeAnnualSalary) ? parseInt(data.takeHomeAnnualSalary).toLocaleString('en-IN') : ''}</span>
                                <p className="font12  textCenter text757575">Take Home Annual Salary</p>
                            </div>
                            <div className={`${styles.totalamtRight} ${styles.incpading}`}>
                                <span className="font600 font16 mb10 textBlack"> ₹{!isNaN(data.takeHomeMonthlySalary) ? parseInt(data.takeHomeMonthlySalary).toLocaleString('en-IN') : ''}</span>
                                <p className="font12  textCenter text757575">Take Home Monthly Salary</p>
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