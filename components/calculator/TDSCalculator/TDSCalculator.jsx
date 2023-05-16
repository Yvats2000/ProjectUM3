import React, { useState, useEffect } from 'react'
import styles from "../calculator.module.css";
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import InputText from '../../../form/inputText';
import Validation from '../../../form/Validation';
import { Select as SelectBox } from "../../ui";
export const TDSCalculator = ({ cmsData,rightNavBar }) => {
    const breadCrumbLinks = [
        {
            "text": "Calculators",
            "path": "/calculator",
            "class": ""
        },
        {
            "text": "TDS Calculator",
            "path": "/calculator/tds-calculator",
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
    const panData = [
        {
            "id": 1,
            "isPanAvailable": "Yes",
            "isPan": true
        },
        {
            "id": 2,
            "isPanAvailable": "No",
            "isPan": false
        }
    ]

    const natureOfPaymentData = [
        {
            "id": 1,
            "sectionName": "Section 192A-Premature PF withdrawal",
            "isPanAvailable": "Yes",
            "limitAmount": 50000,
            "isPanRate": 10,
            "isNotPanRate": 30,
            "isOtherPanRate": 0,
            "isOtherNotPanRate": 0,
            "NotePAN": "Rule of TDS : If gross withdrawal before 5 year continuous services during the F.Y. exceeds Rs. 50,000 then TDS will be applicable @ 10 %.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross withdrawal before 5 year continuous services during the F.Y. exceeds Rs. 50,000 then TDS will be applicable @ 10 %",
        },
        {
            "id": 2,
            "sectionName": "Section 193-Interest received on securities",
            "isPanAvailable": "Yes",
            "limitAmount": 10000,
            "isPanRate": 10,
            "isNotPanRate": 20,
            "isOtherPanRate": 10,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 10,000 then TDS will be applicable @ 10 %. In case where debentures are issued by the listed companies, no TDS shall be deducted upto Rs. 5000/-",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 10,000 then TDS will be applicable @ 10 %. In case where debentures are issued by the listed companies, no TDS shall be deducted upto Rs. 5000/-",
        },
        {
            "id": 3,
            "sectionName": "Section 194 and 194K-Dividends received on the company's shares and on mutual funds",
            "isPanAvailable": "Yes",
            "limitAmount": 5000,
            "isPanRate": 10,
            "isNotPanRate": 20,
            "isOtherPanRate": 10,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 5,000/- then TDS will be applicable @ 10 %",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 5,000/- then TDS will be applicable @ 10 %",
        },
        {
            "id": 4,
            "sectionName": "Section 194A-Interest other than interest on securities (fixed deposit interest)",
            "isPanAvailable": "Yes",
            "limitAmount": 5000,
            "isPanRate": 10,
            "isNotPanRate": 20,
            "isOtherPanRate": 10,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 5,000 then TDS will be applicable @ 10 %.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 5,000 then TDS will be applicable @ 10 %.",
        },
        {
            "id": 5,
            "sectionName": "Section 194A-Interest from Banks",
            "isPanAvailable": "Yes",
            "limitAmount": 40000,
            "isPanRate": 10,
            "isNotPanRate": 20,
            "isOtherPanRate": 10,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 40,000 then TDS will be applicable @ 10 %. For senior citizen this limit is Rs. 50,000.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 40,000 then TDS will be applicable @ 10 %. For senior citizen this limit is Rs. 50,000",
        },
        {
            "id": 6,
            "sectionName": "Section 194B-Winnings from crosswords, lotteries or any game",
            "isPanAvailable": "Yes",
            "limitAmount": 10000,
            "isPanRate": 30,
            "isNotPanRate": 30,
            "isOtherPanRate": 30,
            "isOtherNotPanRate": 30,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 10,000 then TDS will be applicable @ 30 %.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 10,000 then TDS will be applicable @ 30 %.",
        },
        {
            "id": 7,
            "sectionName": "Section 194BB-Winnings from horse races",
            "isPanAvailable": "Yes",
            "limitAmount": 10000,
            "isPanRate": 30,
            "isNotPanRate": 30,
            "isOtherPanRate": 30,
            "isOtherNotPanRate": 30,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 10,000 then TDS will be applicable @ 30 %",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 10,000 then TDS will be applicable @ 30 %.",
        },
        {
            "id": 8,
            "sectionName": "Section 194C-Payment of contractors and sub-contractors",
            "isPanAvailable": "Yes",
            "limitAmount": 30000,
            "isPanRate": 1,
            "isNotPanRate": 20,
            "isOtherPanRate": 2,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 1,00,000 then TDS will be applicable @ 1% for individuals and HUF and 2% for others. Also, if single payment exceeds Rs. 30,000 then also TDS will be applicable at the same rate.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 1,00,000 then TDS will be applicable @ 1% for individuals and HUF and 2% for others. Also, if single payment exceeds Rs. 30,000 then also TDS will be applicable at the same rate.",
        },
        {
            "id": 9,
            "sectionName": "Section 194D-Insurance commission received by other others",
            "isPanAvailable": "Yes",
            "limitAmount": 15000,
            "isPanRate": 5,
            "isNotPanRate": 20,
            "isOtherPanRate": 10,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 15,000 then TDS will be applicable @ 5 %.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 15,000 then TDS will be applicable @ 5 %.",
        },
        {
            "id": 10,
            "sectionName": "Section 194DA-Life insurance policies not exempt under Section 10(10D)",
            "isPanAvailable": "Yes",
            "limitAmount": 99999,
            "isPanRate": 5,
            "isNotPanRate": 20,
            "isOtherPanRate": 5,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: Rule of TDS needs to be changed : In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. is Rs. 1,00,000 or more then TDS will be applicable @ 5 % & it is not applicable if amount is exempt u/s 10(10D).",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. Rule of TDS needs to be changed : In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. is Rs. 1,00,000 or more then TDS will be applicable @ 5 % & it is not applicable if amount is exempt u/s 10(10D).",
        },
        {
            "id": 11,
            "sectionName": "Section 194H-Brokerage or Commission",
            "isPanAvailable": "Yes",
            "limitAmount": 15000,
            "isPanRate": 5,
            "isNotPanRate": 20,
            "isOtherPanRate": 5,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 15,000 then TDS will be applicable @ 5%.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 15,000 then TDS will be applicable @ 5%.",
        },
        {
            "id": 12,
            "sectionName": "Section 194I(a)-Rent on Plant & Machinery",
            "isPanAvailable": "Yes",
            "limitAmount": 240000,
            "isPanRate": 2,
            "isNotPanRate": 20,
            "isOtherPanRate": 2,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 2,40,000 then TDS will be applicable @ 2% in case of Plant& machinery and 10 % in case of land & building or furniture & fitting.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 2,40,000 then TDS will be applicable @ 2% in case of Plant& machinery and 10 % in case of land & building or furniture & fitting.",
        },
        {
            "id": 13,
            "sectionName": "Section 194IA-Payment on transfer of certain immovable Property other than agricultural land",
            "isPanAvailable": "Yes",
            "limitAmount": 4999999,
            "isPanRate": 1,
            "isNotPanRate": 20,
            "isOtherPanRate": 1,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: Rule of TDS needs to be changed :If gross payment to the party during the F.Y. is Rs. 50,00,000 or more then TDS will be applicable @ 1 %.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. Rule of TDS needs to be changed :If gross payment to the party during the F.Y. is Rs. 50,00,000 or more then TDS will be applicable @ 1 %.",
        },
        {
            "id": 14,
            "sectionName": "Section 194IB-Rent payment by HUF or individual exceeding ₹50,000 per month",
            "isPanAvailable": "Yes",
            "limitAmount": 240000,
            "isPanRate": 10,
            "isNotPanRate": 20,
            "isOtherPanRate": 10,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 2,40,000 then TDS will be applicable @ 2% in case of Plant& machinery and 10 % in case of land & building or furniture & fitting.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 2,40,000 then TDS will be applicable @ 2% in case of Plant& machinery and 10 % in case of land & building or furniture & fitting.",
        },
        {
            "id": 15,
            "sectionName": "Section 194J-Payment of Professional Services / Royalty etc.(Normally in all cases)",
            "isPanAvailable": "Yes",
            "limitAmount": 30000,
            "isPanRate": 10,
            "isNotPanRate": 20,
            "isOtherPanRate": 10,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 30,000 then TDS will be applicable @ 10 %.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 30,000 then TDS will be applicable @ 10 %.",
        },
        {
            "id": 16,
            "sectionName": "Section 194J-Fees for technical services,Fees to Call centre operator",
            "isPanAvailable": "Yes",
            "limitAmount": 30000,
            "isPanRate": 2,
            "isNotPanRate": 20,
            "isOtherPanRate": 2,
            "isOtherNotPanRate": 20,
            "NotePAN": "Rule of TDS: If gross payment to the party during the F.Y. exceeds Rs. 30,000 then TDS will be applicable @ 2%.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If gross payment to the party during the F.Y. exceeds Rs. 30,000 then TDS will be applicable @ 2%.",
        },
        {
            "id": 17,
            "sectionName": "Section 194O-TDS on e-commerce participants (w.e.f. 1.10.2020)",
            "isPanAvailable": "Yes",
            "limitAmount": 500000,
            "isPanRate": 1,
            "isNotPanRate": 5,
            "isOtherPanRate": 1,
            "isOtherNotPanRate": 5,
            "NotePAN": "Rule of TDS: If sale of goods or provision of services during the F.Y. exceeds Rs. 5,00,000 then TDS will be applicable @ 1 %.",
            "NoteNotPAN": "Rule of TDS: In case PAN is not available then TDS would be applicable at higher rates. If sale of goods or provision of services during the F.Y. exceeds Rs. 5,00,000 then TDS will be applicable @ 1 %.",
        },
    ]


    const [formDetails, setFormDetails] = useState({
        recipient: 1,
        isPanCard: 1,
        sectionId: 0,
        income: ""
    });
    const [data, setData] = useState({})
    const test = [];
    


    const isAllowed = (value, type) => {
        switch (type) {
            case 'income':
                return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
            default:
                return true;
        }
    }

    const handleChange = (e) => {
        const { name, value, max, min } = e.target;
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
    useEffect(() => {
        const setTestData = natureOfPaymentData.filter(a => a.id == formDetails.sectionId);
        test = setTestData || [];
        getBalance();
    }, [formDetails])


    const getBalance = () => {
        if (checkemiFields) {

            let tds = 0;
            let rate = 0;
            let note = ""
            if (test.length>0 && formDetails.isPanCard == 1 && formDetails.recipient == 1) {
                note = test && test[0].NotePAN
                rate = test && test[0].isPanRate
                tds = test && test[0].limitAmount && formDetails.income > test[0].limitAmount ? parseInt(formDetails.income) * (parseInt(rate) / 100) : 0;
            }
            else if (test.length>0 && formDetails.isPanCard == 2 && formDetails.recipient == 1) {
                note = test && test[0].NoteNotPAN
                rate = test && test[0].isNotPanRate
                tds = test && test[0].limitAmount && formDetails.income > test[0].limitAmount ? parseInt(formDetails.income) * (parseInt(rate) / 100) : 0;
            }
            else if (test.length>0 && formDetails.isPanCard == 1 && formDetails.recipient == 2) {
                note = test && test[0].NotePAN
                rate = test && test[0].isOtherPanRate
                tds = test && test[0].limitAmount && formDetails.income > test[0].limitAmount ? parseInt(formDetails.income) * (parseInt(rate) / 100) : 0;
            }
            else if (test.length>0 && formDetails.isPanCard == 2 && formDetails.recipient == 2) {
                note = test && test[0].NoteNotPAN
                rate = test && test[0].isOtherNotPanRate
                tds = test && test[0].limitAmount && formDetails.income > test[0].limitAmount ? parseInt(formDetails.income) * (parseInt(rate) / 100) : 0;
            }
            else {
               
            }
            setData({
                "tds": tds,
                "note": note
            })

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
    const handleRadio = (e) => {
        const { name, value } = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };
    const betterFunction = debounced(getBalance, 0.5);
    return (
        <>
            <div className="container">
                <BreadCrumb links={breadCrumbLinks} />
                <h1 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">TDS Calculator</h1>
                {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
                <div className={styles.calcwrap}>
                    <div className={`${styles.calculator} ${styles.padingbtm0}`}>
                        <div className={`${styles.newflex}  `}>
                            <div className='radiogrp grid2Span'>
                                <p className='mb10 font14'>Recipient :</p>
                                <div className="raidoInputBox mb20">
                                    <label className="radioInput text313541" onChange={handleRadio}  >
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value={1}
                                            name="recipient"
                                            defaultChecked={formDetails.recipient == 1}
                                        />
                                        <span className="radioCheck"></span>
                                        <span className="radioText font12"  >Individual / HUF / Sole Proprietor</span>
                                    </label>
                                    <label className="radioInput text313541" onChange={handleRadio}  >
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            value={2}
                                            name="recipient"
                                            defaultChecked={formDetails.recipient == '2'}
                                        />
                                        <span className="radioCheck"></span>
                                        <span className="radioText font12">Others</span>
                                    </label>
                                </div>
                            </div>
                            <div className={`form-item ${styles.flexcoloum}`}>
                                <span className="radioText font12"  >PAN of recipient is available</span>
                                <SelectBox name="isPanCard" required onChange={(e) => handleChange(e)}>
                                    <>
                                        {panData.map((e) => {
                                            return <option value={e.id} key={e.id} selected={formDetails.isPanAvailable === e.isPanAvailable}>{e.isPanAvailable}</option>
                                        })}
                                    </>
                                </SelectBox>
                            </div>
                            <div className={`form-item ${styles.flexcoloum}`}>
                                <p className="radioText font12"  >Nature Of Payment</p>
                                <SelectBox name="sectionId" required onChange={(e) => handleChange(e)}>
                                    <>
                                        <option value={""} disabled selected> --Select-- </option>
                                        {natureOfPaymentData.map((e,index) => {
                                            return <option value={e.id} key={e.id} selected={formDetails.sectionId === e.id}>{e.sectionName}</option>
                                        })}
                                    </>
                                </SelectBox>
                            </div>
                            <div className={`form-item ${styles.flexcoloum}`}>
                                <InputText type="text"
                                    id="income"
                                    name="income"
                                    autoComplete="off"
                                    className={`${"formInput "}`}
                                    value={formDetails.income ? parseInt(formDetails.income).toLocaleString('en-IN') : formDetails.income}
                                    handleChange={handleChange}
                                    onMouseOver={betterFunction}
                                    required={true}
                                    min='0'
                                    max='100000000'
                                />
                                <label htmlFor="income">Amount of payment</label>
                            </div>


                        </div>
                    </div>
                    <div className={`${styles.resultwrap} ${styles.ppfwidth}`}>
                        <div className={`${styles.totalamtRight} ${styles.incpading} ${styles.leftspace}`}>
                            <p className="font28 fontBold mb10  textCenter text757575">Total TDS</p>
                            <span className="font600 font26 mb10 textBlack"> ₹ {!isNaN(data.tds)? parseInt(data.tds).toLocaleString('en-IN') : ''}</span>
                            <p className="font14  textCenter text757575 fontSm12">{test && data && data.note}</p>
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