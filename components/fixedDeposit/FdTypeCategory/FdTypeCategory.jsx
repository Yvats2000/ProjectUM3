import styles from "../FdRates.module.css";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import {BreadCrumb} from "../../shared/BreadCrumb/BreadCrumb";
import { Link } from "../../ui";
import { useState } from "react";
import { FAQ, RightSideBar } from "../../shared";
import { isMobile } from "react-device-detect";
export function FdTypeCategory({cmsData, data, slug, topBanks, otherSchemes}) {
    const categoryName = slug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    //Top Bank FD Schemes
    let interLinkingFdSchemeArray = {"text": 'Top Bank FD Schemes', "child": []};
    topBanks.top_fd_banks_scheme.map((data)=> interLinkingFdSchemeArray.child.push({"text": data.fdname,"path": "/fixed-deposit-rate/" + data.slug}))

    //Top Bank FD Schemes
    let interLinkingSimilarFd = {"text": 'Other Schemes', "child": []};
    otherSchemes.map((data)=> interLinkingSimilarFd.child.push({"text": data.type,"path": "/fixed-deposit-rate/scheme/" + data.typeSlug}))
    const breadCrumbLinks = [
        {   
            "text": "Fixed Deposit",
            "path": "/fixed-deposit-rate", 
            "class": ""
        },
        {   
            "text": "Scheme",
            "path": "/fixed-deposit-rate/scheme", 
            "class": ""
        },
        {   
            "text": `${categoryName}`,
            "path": `/fixed-deposit-rate/scheme/${slug}`, 
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
          interLinkingSimilarFd,
          interLinkingFdSchemeArray
    ]
    return (
        <>
        <div className="container containerFlex">
        <div className="container">
            <BreadCrumb links={breadCrumbLinks} />
            {data && data[0] && data[0].isVisible === true && 
            <>
            <div className={styles.loanintrestwrap}>
                <div className={` ${styles.gap30}`}>
                    <h1 className="font24  textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36 mb30">{cmsData && cmsData[0] && cmsData[0].post_title ? cmsData[0].post_title : `Best ${data[0].type} Scheme in India`}</h1>
                    {/* <i className={styles.topB}>Updated on 10 June 2023</i> */}
                </div>
                <p className="font14 textBlack lineHeight20 mb15">{data[0].description}
                </p>
                <div className={styles.heading}>
                    <h2 className="font18 textBlack mb10 fontMedium">Interest Rates on {data[0].type} FD</h2>
                </div>
                <p className="font14 textBlack lineHeight20 mb15">Given below are the latest interest rates offered by top banks under this FD category.</p>
            </div>
            <div className={styles.loantableWrap}>
                <div className={styles.planDiv}>
                    <div className={styles.tblwrap}>
                        {isMobile?data && data[0] && data[0].fds.map((data,index)=>(
                            <div className={styles.responsivetable} key={index}>
                                <table className={styles.intrestratebanks}>
                                    <thead>
                                        <tr><th colSpan="2" align="left">
                                        <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${data.bankSlug}/${data.slug}`}> <span title={`${data.name}`} className="font12 textLink link">{data.name}</span></Link>
                                        </th></tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td><p className="font10 text666  fontsemiBold">For General Citizen (p.a.)</p></td>
                                            <td><p className="font10 text666 fontsemiBold ">For Senior Citizen (p.a.)</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font10 text666 ">{data.normalCitizen}</p></td>
                                            <td><p className="font10 text666 ">{data.seniorCitizen}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )):<table className={`${styles.planTable} ${styles.maxWidth}`} cellPadding="0" cellSpacing="0">
                        <thead>
                       
                            <tr>
                                <th className="font14">
                                    <p className="textover"> Name of Bank</p>
                                </th>
                                <th className="font14">
                                    <p className="textover"> For General Citizen (p.a.)</p>
                                </th>
                                <th className="font14">
                                    <p className="textover"> For Senior Citizen (p.a.)</p>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="mt15">
                        {data && data[0] && data[0].fds.map((data,index)=>(
                            <tr key={index}>
                                <td>
                                   <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${data.bankSlug}/${data.slug}`}><span title={`${data.name}`} className={`font14 textLink ${styles.link}`}>{data.name}</span></Link>
                                </td>
                                <td>

                                    <p className="font14 text666 ">{data.normalCitizen}</p>
                                </td>
                                <td>

                                    <p className="font14 text666 ">{data.seniorCitizen || "--"}</p>
                                </td>
                            </tr>
                                 ))}
                        </tbody>
                    </table>}
                        
                        
                        </div>
                    </div>
            </div>
            </>}
            {cmsData && cmsData[0] &&
            <section className={cmsStyles.eligible}>
                {data && data[0] && data[0].isVisible === false && <h1 className="font24 fontMedium text181d Innerheading mb40 lineHeight36">{cmsData[0].post_title || ''}</h1>}
                <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
            </section>
            }
        </div>
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
    );
}