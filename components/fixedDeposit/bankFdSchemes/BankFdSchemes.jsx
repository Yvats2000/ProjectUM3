import styles from "./../FdRates.module.css";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import { useState } from "react";
import commonFunctions from "../../../utils/CommonFunctions";
import {useGlobalContext} from '../../../libs/context';
export function BankFdSchemes({cmsData, bankSlug, schemeSlug, bankSchemeFdData,rightNavBar,fdData,bankFdData, topBanks, externalLinksHomePageData}){
    const { isMobile } = useGlobalContext();
    let schemeValues = Object.keys(bankSchemeFdData[1]);
    const bankName = bankSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const schemeName = schemeSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    //Top Bank FD Schemes
    let interLinkingFdSchemeArray = {"text": 'Top Bank FD Schemes', "child": []};
    topBanks.top_fd_banks_scheme.map((data)=> interLinkingFdSchemeArray.child.push({"text": data.fdname,"path": "/fixed-deposit-rate/" + data.slug}))

    //`Other FD Schemes by bankSlug`
    let filteredArray = bankFdData.fdTypes.filter((data)=> data.fdSlug !== schemeSlug)
    let interLinkingSimilarFdScheme = {"text": `Other FD Schemes By ${bankName}`, "child": []};
    filteredArray.map((data)=> interLinkingSimilarFdScheme.child.push({"text": data.fdName,"path": `/fixed-deposit-rate/${bankSlug}/${data.fdSlug}`}))

    //Fd Scheme Other Bank
    const type = bankFdData.type
    const schemeData = fdData.schemes.filter((data) => data.type == type)
    const similarFDSchemes = schemeData.map((data) => data.fds.filter((item)=> item.bankSlug !== bankSlug))
    let interLinkingFdSchemeOtherBank = {"text": `Similar FD Schemes`, "child": []};
    similarFDSchemes.map((data)=> interLinkingFdSchemeOtherBank.child.push({"text": data.name,"path": `/fixed-deposit-rate/${data.bankSlug}/${data.slug}`}))



    const breadCrumbLinks = [
        {   
            "text": "Fixed Deposit",
            "path": "/fixed-deposit-rate", 
            "class": ""
        },
        {   
            "text": `${bankName}`,
            "path": `/fixed-deposit-rate/${bankSlug}`, 
            "class": ""
        },
        {   
            "text": `${schemeName}`,
            "path": `/fixed-deposit-rate/${bankSlug}/${schemeSlug}`, 
            "class": ""
        }
    ];
    const interLinkingData = [
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
          interLinkingSimilarFdScheme.child.length > 0 && interLinkingSimilarFdScheme,
          interLinkingFdSchemeOtherBank.child.length > 0 && interLinkingFdSchemeOtherBank,
          interLinkingFdSchemeArray.child.length > 0 && interLinkingFdSchemeArray
        ];    
        const showHeading = (value) => {
            let data = value.split(':');
           if(data[0] === 'null'){
                return (
                    `${bankName} ${bankSchemeFdData[0].type} Scheme for amount below ₹ ${commonFunctions.numformat(data[1])}`
                )
           }else if(data[1] === 'null'){
                return (
                    `${bankName} ${bankSchemeFdData[0].type} Scheme for amount above ₹ ${commonFunctions.numformat(data[0])}`
                )
           }else{
                return (
                    `${bankName} ${bankSchemeFdData[0].type} Scheme for amount ranging from ₹ ${commonFunctions.numformat(data[0])} to ₹ ${commonFunctions.numformat(data[1])}`
                )
           }
        }
        const showDescription = (value) => {
            let data = value.split(':');
           if(data[0] === 'null'){
                return (
                    `The rate of interest for deposited amount less than ₹ ${commonFunctions.numformat(data[1])} is as below`
                )
           }else if(data[1] === 'null'){
                return (
                    `The rate of interest for deposited amount above ₹ ${commonFunctions.numformat(data[0])} is as below`
                )
           }else{
                return (
                    `The rate of interest for deposited amount ranging from ₹ ${commonFunctions.numformat(data[0])} to ₹ ${commonFunctions.numformat(data[1])} is as below`
                )
           }
        }
        return (
        <>
        <div className="container containerFlex">
        <section>
            <div className="container">
                <BreadCrumb links={breadCrumbLinks} />
                <div className={styles.loanintrestwrap}>
                    <div className={styles.heading}>
                        <h1 className="font24  textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36 mb30">{cmsData && cmsData[0] && cmsData[0].post_title ? cmsData[0].post_title : `${bankName} ${bankSchemeFdData[0].type} Scheme`}</h1>
                    </div>
                    <p className="font14 textBlack lineHeight20 mb15">The {bankName} {bankSchemeFdData[0].type} tenure ranges from min {commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].mintenuredays)} to max {commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].maxtenuredays)}. The ROI ranges from {bankSchemeFdData[0].normalCitizen} for the general public. The lock-in period for this scheme is {commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].lockInDays)} </p>
                    <div className={styles.loantableWrap}>
                        <div className={styles.planDiv}>
                            {schemeValues.map((value, index) => (
                            <>
                            <div className={`${styles.heading} mb10`} key={index}>
                                <h2 className="font18 textBlack fontMedium">{showHeading(value)}</h2>
                            </div>
                            <p className="font14 textBlack lineHeight20 mb25">{showDescription(value)}</p>
                            
                            <div className={styles.tblwrap}>
                                {isMobile?
                                <div className={styles.responsivetable}>
                                    <table className={styles.intrestratebanks}>
                                        <thead>
                                            <tr>
                                                <th className="font10">
                                                    <p className={styles.textover}> Tenure</p>
                                                </th>
                                                <th className="font10">
                                                    <p className={styles.textover}> Interest Rates for Public</p>
                                                </th>
                                                {bankSchemeFdData[1][value].filter(item => item.seniorRoi !== null).length > 0 &&
                                                <th className="font10">
                                                    <p className={styles.textover}> Interest Rates for Senior Citizens</p>
                                                </th>}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {bankSchemeFdData[1][value].map((data,index)=> (
                                            <tr key={index}>
                                                <td className="font14 ">
                                                    <span >{data.minTenureDays ? commonFunctions.getFormatedStringFromDays(data.minTenureDays) : null} <span className="fontBold">Upto</span> {commonFunctions.getFormatedStringFromDays(data.maxTenureDays)}</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{data.normalRoi || "--"}</p>
                                                </td>
                                                {bankSchemeFdData[1][value].filter(item => item.seniorRoi !== null).length > 0 &&
                                                <td>
                                                    <p className="font14 text666 ">{data.seniorRoi || "--"}</p>
                                                </td>}
                                            </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>:
                                <table className={`${styles.planTable} mb50`} cellPadding="0" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th className="font14">
                                                <p className={styles.textover}> Tenure</p>
                                            </th>
                                            <th className="font14">
                                                <p className={styles.textover}> Interest Rate for General Public (p.a.)</p>
                                            </th>
                                            {bankSchemeFdData[1][value].filter(item => item.seniorRoi !== null).length > 0 &&
                                            <th className="font14">
                                                <p className={styles.textover}> Interest Rates for Senior Citizens (p.a.)</p>
                                            </th>}
                                        </tr>
                                    </thead>
                                    <div className={styles.webwrap}>
                                        <tbody>
                                                {bankSchemeFdData[1][value].map((data,index)=> (
                                                <tr key={index}>
                                                    <td className="font14 ">
                                                        <span >{data.minTenureDays ? commonFunctions.getFormatedStringFromDays(data.minTenureDays) :null} <span className="fontBold">Upto</span> {commonFunctions.getFormatedStringFromDays(data.maxTenureDays)}</span>
                                                    </td>
                                                    <td>
                                                        <p className="font14 text666 ">{data.normalRoi || "--"} p.a.</p>
                                                    </td>
                                                    {bankSchemeFdData[1][value].filter(item => item.seniorRoi !== null).length > 0 &&
                                                    <td>
                                                        <p className="font14 text666 ">{data.seniorRoi || "--"} p.a.</p>
                                                    </td>}
                                                </tr>
                                                ))}
                                            </tbody>
                                    </div>
                                </table>}
                            </div>
                            </>
                            ))}
                            <div className={styles.heading}>
                                <h2 className="font18 textBlack mb10 fontMedium" >{`Key features of ${bankName} ${bankSchemeFdData[0].type} Scheme`}</h2>
                            </div>
                            <p className="font14 textBlack lineHeight20 mb15">{`Summary of ${bankName} ${bankSchemeFdData[0].type} Scheme features :`}</p>
                            <div className={styles.tblwrap}>
                                {isMobile?
                                <div className={styles.responsivetable}>
                                    <table className={styles.intrestratebanks}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Mutual Fund Schemes</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].type || '--'}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">CRISIL Rating</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].idCrisil || '--'}</p>
                                                    {/* <p className="font14 text666 ">Maximum: 10 years</p> */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Lock-in Days</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].lockInDays ? commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].lockInDays) : '--'}</p>
                                                    {/* <p className="font14 text666 ">5.80% p.a. (for senior citizens)</p> */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Loan Against FD</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].loanAgainstFd == false ? "NA" :bankSchemeFdData[0].loanAgainstFd == true ? "Available" : "--"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 "> Pre-mature Withdrawal	</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].prematureWithdrwal == false ? "NA" :bankSchemeFdData[0].prematureWithdrwal == true ? "Available" : "--"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 "> FD Nominee	</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].fdNominee == 1 ? "Yes" :bankSchemeFdData[0].fdNominee == 0 ? "NO" : "--"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 "> Tenure </span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{(bankSchemeFdData[0].mintenuredays ? commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].mintenuredays) + " to " : "Upto ") + commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].maxtenuredays)}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">General Public</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].normalCitizen || '--'}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Senior Citizen</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].seniorCitizen || '--'}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Amount</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].amount || '--'}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>:
                                <table className={`${styles.planTable} mb50 ${styles.scheme}`} cellPadding="0" cellSpacing="0"> 
                                    <tbody>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Mutual Fund Schemes</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].type}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">CRISIL Rating</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].idCrisil || '--'}</p>
                                                    {/* <p className="font14 text666 ">Maximum: 10 years</p> */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Lock-in Days</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].lockInDays ? commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].lockInDays) : '--'}</p>
                                                    {/* <p className="font14 text666 ">5.80% p.a. (for senior citizens)</p> */}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Loan Against FD</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].loanAgainstFd == false ? "NA" :bankSchemeFdData[0].loanAgainstFd == true ? "Available" : "--"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 "> Pre-mature Withdrawal	</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].prematureWithdrwal == false ? "NA" :bankSchemeFdData[0].prematureWithdrwal == true ? "Available" : "--"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 "> FD Nominee	</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].fdNominee == 1 ? "Yes" :bankSchemeFdData[0].fdNominee == 0 ? "NO" : "--"}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 "> Tenure </span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{(bankSchemeFdData[0].mintenuredays ? commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].mintenuredays) + " to " : "Upto ") + commonFunctions.getFormatedStringFromDays(bankSchemeFdData[0].maxtenuredays)}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">General Public</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].normalCitizen || '--'}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Senior Citizen</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].seniorCitizen || '--'}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <span className="font14 ">Amount</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{bankSchemeFdData[0].amount || '--'}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                </table>}
                                
                                
                            </div>
                            <p className="font14  mb50 textBlack lineHeight20">*Interest rates are subject to change at the discretion of the bank. These Interest rates are with effect from 10 November 2021.</p>
                            {/* <div className="heading">
                                <h3 className="font18 textBlack ">{bankName} Tax Saving FD Interest Calculator</h3>
                            </div>
                            <p className="font14 textBlack lineHeight20 ">Its recommended to calculate your SBI FD interest rate before hand so that you know how much returns you will receive in the future. In order to do that, you can use any online fixed
                                deposit calculator. The easy-to-use online tool lets you calculate the maturity amount in no time. All you need to do is enter the relevant details, including the deposit term, investment
                                amount, and the rate of interest.
                            </p> */}
                        </div>
                  
                    </div>
                </div>
                {cmsData && cmsData[0] &&
                    <section className={cmsStyles.eligible}>
                            {/* <h1 className="font24 fontMedium text181d Innerheading mb40 lineHeight36">{cmsData[0].post_title || ''}</h1> */}
                            <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
                    </section>
                    }
            </div>
        </section>
        <RightSideBar menuLinks={interLinkingData} paddingTop={ true} />
        </div>
        
        {cmsData && cmsData.length > 0 && cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 &&
        <section className="faq">
            <div className="container">
                <h2 className="faqHeading font24 fontMedium">{cmsData[0].faq_name}</h2>
                <div className="faqBx">
                    <FAQ data={cmsData[0].faq_content}  />
                </div>
            </div>
        </section>}
        </>
    )
}