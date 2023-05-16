import styles from "./../FdRates.module.css";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import { Link } from "../../ui";
import commonFunctions from '../../../utils/CommonFunctions';
import { useState } from "react";
import {useGlobalContext} from '../../../libs/context';
import moment from 'moment';
export function BankFdRates({cmsData, bankSlug, bankFdData, topBanks}) {
    const { isMobile } = useGlobalContext();
    const bankName = bankSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    //Top Bank Fd
    let interLinkingFdBankArray = {"text": 'Top Bank FD', "child": []};
    topBanks.top_fd_banks.map((data)=> interLinkingFdBankArray.child.push({"text": data.name,"path": "/fixed-deposit-rate/" + data.slug}))
    //Top Bank FD Schemes
    let interLinkingFdSchemeArray = {"text": 'Top Bank FD Schemes', "child": []};
    topBanks.top_fd_banks_scheme.map((data)=> interLinkingFdSchemeArray.child.push({"text": data.fdname,"path": "/fixed-deposit-rate/" + data.slug}))
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
          interLinkingFdBankArray.child.length > 0 && interLinkingFdBankArray,
          interLinkingFdSchemeArray.child.length > 0 && interLinkingFdSchemeArray
        ];
    return (
        <>
        <div className="container containerFlex">
        <section>
            <div className="container">
                <BreadCrumb links={breadCrumbLinks} />
                <div className={styles.loanintrestwrap}>
                    <div className={`${styles.heading} ${styles.mixhead}`}>
                    <h1 className="font24  textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36 mb30">{cmsData && cmsData[0] && cmsData[0].post_title ? cmsData[0].post_title : `${bankFdData.name} FD Rates`}</h1>
                    {/* <i className={styles.topB}>Updated on 10 June 2023</i> */}
                    </div>
                    <p className="font14 textBlack lineHeight20 mb35">{bankFdData.name} offers a number of fixed deposit schemes. The FDs can be of tenure ranging from min {commonFunctions.getFormatedStringFromDays(bankFdData.minTenureDays)} to {commonFunctions.getFormatedStringFromDays(bankFdData.maxTenureDays)}. The roi for different schemes starts from {bankFdData.fdTypes[0].normalCitizen} for the general public and {bankFdData.fdTypes[0].seniorCitizen} for senior citizens. The min amount required to open an Fixed Deposit with {bankFdData.name} is {bankFdData.minAmount}</p>

                    <div className={`${styles.heading} mb10`}>
                        <h2 className="font18 textBlack  fontMedium">Types Of {bankFdData.name} Fixed Deposit Schemes</h2>
                    </div>
                    <p className="font14 textBlack lineHeight20 mb25">{bankName} is offering a different kinds of fixed deposits to its customers. These are :</p>
                    <div className={styles.loantableWrap}>
                        <div className={styles.planDiv}>
                            <div className={styles.tblwrap}>
                                {isMobile?bankFdData && bankFdData.fdTypes.map((item, index)=> (
                                <div className={styles.responsivetable} key={index}>
                                    <table className={styles.intrestratebanks}>
                                        <thead>
                                            <tr>
                                                <th colSpan="2" align="left">
                                                    <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${bankFdData.slug}/${item.fdSlug}`}><span className={`font12 textLink ${styles.link}`}>{item.fdName}</span></Link> 
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="font10 text666  fontsemiBold">For General Citizen (p.a.)</p>
                                                </td>
                                                {bankFdData.fdTypes.filter(item => item.seniorCitizen !== null).length > 0 &&
                                                <td>
                                                    <p className="font10 text666 fontsemiBold ">For Senior Citizen (p.a.)</p>
                                                </td>}
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="font10 text666 ">{item.normalCitizen || "--"}</p>
                                                </td>
                                                {bankFdData.fdTypes.filter(item => item.seniorCitizen !== null).length > 0 &&
                                                <td>
                                                    <p className="font10 text666 ">{item.seniorCitizen || "--"}</p>
                                                </td>}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                )):<table className={`${styles.planTable} mb50`} cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="font14">
                                            <p className={styles.textover}> Name of Schemes</p>
                                        </th>
                                        <th className="font14">
                                            <p className={styles.textover}> For General Citizen (p.a.)</p>
                                        </th>
                                        {bankFdData.fdTypes.filter(item => item.seniorCitizen !== null).length > 0 &&
                                        <th className="font14">
                                            <p className={styles.textover}> For Senior Citizen (p.a.)</p>
                                        </th>}
                                    </tr>
                                </thead>
                                <div className={styles.webwrap}>
                                    <tbody>
                                        {bankFdData && bankFdData.fdTypes.map((item, index)=> (
                                        <tr key={index}>
                                            <td>
                                                <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${bankFdData.slug}/${item.fdSlug}`}><span className={`font14 textLink ${styles.link}`}>{item.fdName}</span></Link> 
                                            </td>
                                            <td>
                                                <p className="font14 text666 ">{item.normalCitizen || "--"}</p>
                                            </td>
                                            {bankFdData.fdTypes.filter(item => item.seniorCitizen !== null).length > 0 &&
                                            <td>
                                                <p className="font14 text666 ">{item.seniorCitizen || "--"}</p>
                                            </td>}
                                        </tr>
                                        ))}
                                    </tbody>
                                </div>
                            </table>}
                            </div>
                        </div>
                    </div>

                    {bankFdData && bankFdData.fdTypes.map((data, index)=> (
                        <>
                    <div className={`${styles.heading} mb10`} key={index}>
                        <h2 className="font18 textBlack fontMedium">{data.fdName}</h2>
                        <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${bankSlug}/${data.fdSlug}`}><i className={`${styles.topB} ${styles.blue}`}>View Scheme</i></Link>
                    </div>
                    <p className="font14 textBlack lineHeight20 mb25">Given below are the latest {data.fdName}, ranging from {commonFunctions.getFormatedStringFromDays(data.minTenureDays)} to {commonFunctions.getFormatedStringFromDays(data.maxTenureDays)} as of {moment(data.updatedDate).format('MMMM, YYYY')}.</p>
                    <div className={styles.loantableWrap}>
                        <div className={styles.planDiv}>
                            {isMobile?
                            <div className={styles.responsivetable}>
                                <table className={styles.intrestratebanks}>
                                    <thead>
                                        <tr>
                                            <th className="font10">
                                                <p className={styles.textover}> Tenors</p>
                                            </th>
                                            <th className="font10">
                                                <p className={styles.textover}> Interest Rates for Public (p.a.)</p>
                                            </th>
                                            {data.fds.filter(item => item.seniorRoi !== null).length > 0 &&
                                            <th className="font10">
                                                <p className={styles.textover}> Interest Rates for Senior Citizens (p.a.)</p>
                                            </th>}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.fds.map((item,index)=>(
                                            <tr key={index}>
                                                <td className="font14 ">
                                                    <span>{item.minTenureDays ? commonFunctions.getFormatedStringFromDays(item.minTenureDays):null} <span className="fontBold">Upto</span> {commonFunctions.getFormatedStringFromDays(item.maxTenureDays)}</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{item.normalRoi || "--"} p.a.</p>
                                                </td>
                                                {data.fds.filter(item => item.seniorRoi !== null).length > 0 &&
                                                <td>
                                                    <p className="font14 text666 ">{item.seniorRoi || "--"} p.a.</p>
                                                </td>}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>:
                            <div className={styles.tblwrap}>
                                <table className={`${styles.planTable} ${styles.tblbrd} mb20`} cellPadding="0" cellSpacing="0">
                                    <>
                                        <thead>
                                            <tr>
                                                <th className="font14">
                                                    <p className={styles.textover}> Tenors</p>
                                                </th>
                                                <th className="font14">
                                                    <p className={styles.textover}> Interest Rates for Public (p.a.)</p>
                                                </th>
                                                {data.fds.filter(item => item.seniorRoi !== null).length > 0 &&
                                                <th className="font14">
                                                    <p className={styles.textover}> Interest Rates for Senior Citizens (p.a)</p>
                                                </th>}
                                            </tr>
                                        </thead>
                                        <div className={styles.webwrap}>
                                            <tbody>
                                            {data.fds.map((item,index)=>(
                                                <tr key={index}>
                                                <td className="font14 ">
                                                    {/* 2 years Upto 3 years */}
                                                    <span>{item.minTenureDays ? commonFunctions.getFormatedStringFromDays(item.minTenureDays):null } <span className="fontBold">Upto</span>   {commonFunctions.getFormatedStringFromDays(item.maxTenureDays)}</span>
                                                </td>
                                                <td>
                                                    <p className="font14 text666 ">{item.normalRoi || "--"} p.a.</p>
                                                </td>
                                                {data.fds.filter(item => item.seniorRoi !== null).length > 0 &&
                                                <td>
                                                    <p className="font14 text666 ">{item.seniorRoi || "--"} p.a.</p>
                                                </td>}
                                                </tr>
                                                ))}
                                            </tbody>
                                        </div>
                                        </>
                                </table> 
                            </div>}
                        </div>
                    </div>
                    </>
                    ))}
                </div>
                {cmsData && cmsData[0] &&
                <section className={`${cmsStyles.eligible} mb50`}>
                        {/* <h1 className="font24 fontMedium text181d Innerheading mb40 lineHeight36">{cmsData[0].post_title || ''}</h1> */}
                        <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className={`mt15 ${styles.cmsTable}`}></div>
                </section>
                }
            </div>
        </section>
        <RightSideBar menuLinks = {interLinkingData} paddingTop={true}/>
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
    );
}