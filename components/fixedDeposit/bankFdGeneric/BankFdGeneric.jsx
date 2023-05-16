import styles from "./../FdRates.module.css";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import { Link } from "../../ui";
import { useState } from "react";
import { isMobile } from "react-device-detect";

export function BankFdGeneric({cmsData, pageUrl, bankFdData, title, bank = false,topBanks}) {
    //Top Bank Fd
    let interLinkingFdBankArray = {"text": 'Top Bank FD', "child": []};
    topBanks.top_fd_banks.map((data)=> interLinkingFdBankArray.child.push({"text": data.name,"path": "/fixed-deposit-rate/" + data.slug}))
    //Top Bank FD Schemes
    let interLinkingFdSchemeArray = {"text": 'Top Bank FD Schemes', "child": []};
    topBanks.top_fd_banks_scheme.map((data)=> interLinkingFdSchemeArray.child.push({"text": data.fdname,"path": "/fixed-deposit-rate/" + data.slug}))
    const pageName = pageUrl.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
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
            interLinkingFdBankArray,
            interLinkingFdSchemeArray
        ];
    const breadCrumbLinks = [
        {   
            "text": "Fixed Deposit",
            "path": "/fixed-deposit-rate", 
            "class": ""
        },
        {   
            "text": `${pageName}`,
            "path": `/fixed-deposit-rate/${pageUrl}`, 
            "class": ""
        }
    ];
    return (
        <>
        <div className="container containerFlex">
        <section>
            <div className="container">
                <BreadCrumb links={breadCrumbLinks} />
                <div className={styles.loanintrestwrap}>
                    <div className={`${styles.heading} ${styles.mixhead}`}>
                    <h1 className="font24  textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36 mb30">{cmsData && cmsData[0] && cmsData[0].post_title ? cmsData[0].post_title : title}</h1>
                    </div>
                    <p className="font14 textBlack lineHeight20 mb35">The FDs can be of tenure ranging from 7 Days to 20 Yr . The ROI for different schemes starts from {bankFdData.length > 0 && bankFdData[0].normalRoi} for the general public and {bankFdData.length > 0 && bankFdData[0].seniorRoi} for senior citizens. The min amount required to open a Fixed Deposit in such scheme is Rs.1,000</p>
                    <div className={styles.loantableWrap}>
                        <div className={styles.planDiv}>
                            <div className="tblwrap">
                                {isMobile?bankFdData.length > 0 && bankFdData.map((item, index)=> (
                                <div className={styles.responsivetable} key={index}>
                                    <table className={styles.intrestratebanks}>
                                        <thead>
                                            <tr>
                                                <th colSpan="2" align="left">
                                                    {bank? 
                                                    <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${item.bankSlug}`}><span className={`font12 textLink ${styles.link}`}>{item.name}</span></Link> 
                                                    :<Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${item.bankSlug}/${item.slug}`}><span className={`font12 textLink ${styles.link}`}>{item.name}</span></Link> }
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="font10 text666  fontsemiBold">For General Citizen (p.a.)</p>
                                                </td>
                                                <td>
                                                    <p className="font10 text666 fontsemiBold ">For Senior Citizen (p.a.)</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="font10 text666 ">{item.normalRoi || "--"}</p>
                                                </td>
                                                <td>
                                                    <p className="font10 text666 ">{item.seniorRoi || "--"}</p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                )):<table className={`${styles.planTable} mb50`} cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="font14">
                                            <p className={styles.textover}> Name of {bank ? 'Bank' : 'Schemes'}</p>
                                        </th>
                                        <th className="font14">
                                            <p className={styles.textover}> For General Citizen (p.a.)</p>
                                        </th>
                                        <th className="font14">
                                            <p className={styles.textover}> For Senior Citizen (p.a.)</p>
                                        </th>
                                    </tr>
                                </thead>
                                <div className={styles.webwrap}>
                                    <tbody>
                                        {bankFdData.length > 0 && bankFdData.map((item, index)=> (
                                        <tr key={index}>
                                            <td>
                                                {bank ?
                                                <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${item.bankSlug}`}><span className={`font14 textLink ${styles.link}`}>{item.name}</span></Link> 
                                                :<Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${item.bankSlug}/${item.slug}`}><span className={`font14 textLink ${styles.link}`}>{item.name}</span></Link>}
                                            </td>
                                            <td>
                                                <p className="font14 text666 ">{item.normalRoi || "--"}</p>
                                            </td>
                                            <td>
                                                <p className="font14 text666 ">{item.seniorRoi || "--"}</p>
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </div>
                            </table>}
                            </div>
                        </div>
                    </div>
                </div>
                {cmsData && cmsData[0] &&
                <section className={`${cmsStyles.eligible} mb50`}>
                    <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt15"></div>
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