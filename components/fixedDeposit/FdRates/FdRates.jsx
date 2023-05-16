import styles from "../FdRates.module.css";
import { useState } from "react";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import {FAQ, BreadCrumb} from "../../shared/"
import { RightSideBar } from "../../shared";
import { Link }     from "../../ui";
import { isMobile } from "react-device-detect";
import topAmc from '../../../data/top10Amc.json'

export function FdRates({cmsData, fdData, topBanks, rightNavBar, externalLinksHomePageData, FdRatesFaq}) {
  let interLinkingDataArray = {"text": 'Fixed Deposit Types',"child": []};
  fdData && fdData.schemes.map((data)=> interLinkingDataArray.child.push({"text":data.type,"path":`/fixed-deposit-rate/scheme/${data.typeSlug}`}))
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
          interLinkingDataArray,
          interLinkingFdBankArray,
          interLinkingFdSchemeArray,
          {
            "text": "Best FD Schemes",
            "child": [
              {
                "text": `Best FD Interest Rates with 1-Year Tenure in 2023`,
                "path": `/fixed-deposit-rate/best-fd-interest-rates-with-1-year-tenure`
              },
              {
                "text": `Best FD Rates For 2 Years 2023`,
                "path": `/fixed-deposit-rate/best-fd-interest-rates-with-2-year-tenure`
              },
              {
                "text": `Best FD Rates for 3 Years Tenure in 2023`,
                "path": `/fixed-deposit-rate/best-fd-interest-rates-with-3-year-tenure`
              },
              {
                "text": `Best FD Rates offered for a 4-year tenure in 2023`,
                "path": `/fixed-deposit-rate/best-fd-interest-rates-with-4-year-tenure`
              },
              {
                "text": `Best FD Rates for 5 Years Tenure in 2023`,
                "path": `/fixed-deposit-rate/best-fd-interest-rates-with-5-year-tenure`
              },
              {
                "text": `Top 10 Banks FD with highest return Year`,
                "path": `/fixed-deposit-rate/top-banks-fd-with-highest-return`
              },
              {
                "text": `Top 10 Private Banks Providing Higher Interest Rates On FD Accounts`,
                "path": `/fixed-deposit-rate/top-banks-providing-higher-fd-interest-rates`
              },
              {
                "text": `Top 10 best fixed deposit for senior citizens`,
                "path": `/fixed-deposit-rate/top-10-fixed-deposit-for-senior-citizens`
              }
            ]
          },
          topAmc
        ];
    return (
        <>
        <div className="container containerFlex">
        <section>
            <div className="container">
                <BreadCrumb links={breadCrumbLinks} />
                <div className={styles.loanintrestwrap}>
                    <div className={`${styles.heading} ${styles.mixhead} mb30`}>
                        <h1 className={`font24  textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36 ${styles.mixhead}`}>Fixed Deposit Interest Rates</h1>
                        {/* <i className={styles.topB}>Updated on 10 June 2023</i> */}
                    </div>
                    <p className="font14 textBlack lineHeight20 mb35">A recent survey conducted by the Securities and Exchange Board of India (SEBI) reveals, that 95% of Indians pin their hopes on parking funds in a fixed deposit. Although there are many other profitable investment tools, why do people prefer fixed deposits as their investment? Well, at the very least, we can say it is due to fixed deposit interest rates. Banks and NBFCs offer a good deal of FD interest rates, making it one of the best investment tools.</p>
                    <div className={styles.heading}>
                        <h2 className="font18 textBlack fontMedium mb15" >FD Interest Rates By Top Banks</h2>
                    </div> 
                    <p className="font14 textBlack lineHeight20 mb25">If you have made it clear in your head that you want to invest in fixed deposits, count on the banks offering the highest FD interest rates. You may need to explore and invest some time in visiting banks websites to understand what they offer. To simplify, we have prepared a list of the top  banks that offer the best FD interest rates in India. The FD interest rates are specific to amounts below 5 crores.</p>
                    <div className={styles.loantableWrap}>
                        <div className={styles.planDiv}>
                            <div className="tblwrap">
                                {isMobile?fdData && fdData.banks[0].map((item,index)=> (
                                <div className={styles.responsivetable} key={index}>
                                    <table className={styles.intrestratebanks}>
                                        <thead>
                                            <tr>
                                                <th colSpan="2" align="left">
                                                    <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${item.bankSlug}`}><span title={`${item.bankName} FD Rate`} className={`font12 textLink ${styles.link}`}>{item.bankName} FD Rate</span></Link> 
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="font10 text666  fontsemiBold">For General Citizen (p.a.)</p>
                                                </td>
                                                {fdData.banks[0].filter(item => item.seniorCitizen !== null).length > 0 &&
                                                <td>
                                                    <p className="font10 text666 fontsemiBold ">For Senior Citizen (p.a.)</p>
                                                </td>}
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="font10 text666 ">{item.normalCitizen || "--"}</p>
                                                </td>
                                                {fdData.banks[0].filter(item => item.seniorCitizen !== null).length > 0 &&
                                                <td>
                                                    <p className="font10 text666 ">{item.seniorCitizen || "--"}</p>
                                                </td>}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                )):<table className={`${styles.planTable} mb20`} cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        <th className="font14">
                                            <p className={styles.textover}> Name of Bank</p>
                                        </th>
                                        <th className="font14">
                                            <p className={styles.textover}> For General Citizen (p.a.)</p>
                                        </th>
                                        {fdData.banks[0].filter(item => item.seniorCitizen !== null).length > 0 &&
                                        <th className="font14">
                                            <p className={styles.textover}> For Senior Citizen (p.a.)</p>
                                        </th>}
                                    </tr>
                                </thead>
                                <div className={styles.webwrap}>
                                    <tbody>
                                        {fdData && fdData.banks[0].map((item,index)=>(
                                        <tr key={index}>
                                            <td>
                                                <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${item.bankSlug}`}><span title={`${item.bankName} FD Rate`} className={`font14 textLink ${styles.link}`}>{item.bankName} FD Rate</span></Link> 
                                            </td>
                                            <td>
                                                <p className="font14 text666 ">{item.normalCitizen || "--"}</p>
                                            </td>
                                            {fdData.banks[0].filter(item => item.seniorCitizen !== null).length > 0 &&
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
                    
                    <p className="font14 text444 lineHeight24 mb20">For investors over sixty years old who are more experienced than other investors, banks, and Non-Banking Institutions often offer a greater rate per unit on FDs, typically providing 25 to 50 basis points (0.25 to 0.5%) more. Moreover, banks also provide an additional tax deduction to senior citizens. If FDs dont exceed INR 50,000 annually, no tax will be deducted. This tax benefit to senior citizens is not available in other investment options.</p>
                    <p className="font14 text444 lineHeight24 mb20">The annual TDS deduction cap for people who don’t fall in the category of senior citizens is INR 40,000. The overall tax burden reduces significantly while investing in FDs as you age, enhancing returns.</p>
                    
                    <h2 className="font18 textBlack fontMedium mb15">Fixed Deposit Scheme by Bank</h2>
                    {fdData && fdData.schemes.filter(item => item.isVisible === true).map((data,index)=>(
                        <>
                            <div className={styles.heading} key={index}>
                                <h3 className="font18 textBlack mb15">{data.type} Interest Rates of Top Banks in India.</h3>
                                <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/scheme/${data.typeSlug}`}><i className={`${styles.topB} ${styles.blue}`}>View All</i></Link>
                            </div> 
                            <p className="font14 textBlack lineHeight20 mb25">{data.description}
                            </p>
                            <div className={styles.loantableWrap}>
                                <div className={styles.planDiv}>
                                    <div className="tblwrap">
                                        {isMobile?data.fds.map((item,index)=> (
                                        <div className={styles.responsivetable} key={index}>
                                            <table className={styles.intrestratebanks}>
                                                <thead>
                                                    <tr>
                                                        <th colSpan="2" align="left">
                                                            <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${item.bankSlug}/${item.slug}`}><span title={`${item.name}`} className={`font12 textLink ${styles.link}`}>{item.name}</span></Link> 
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p className="font10 text666  fontsemiBold">For General Citizen (p.a.)</p>
                                                        </td>
                                                        {data.fds && data.fds.filter(item => item.seniorCitizen !== null).length > 0 &&
                                                        <td>
                                                            <p className="font10 text666 fontsemiBold ">For Senior Citizen (p.a.)</p>
                                                        </td>}
                                                    </tr>
                                                    <tr>
                                                        <td>
                                                            <p className="font10 text666 ">{item.normalCitizen || "--"}</p>
                                                        </td>
                                                        {data.fds && data.fds.filter(item => item.seniorCitizen !== null).length > 0 &&
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
                                                    <p className={styles.textover}> Name of Bank</p>
                                                </th>
                                                <th className="font14">
                                                    <p className={styles.textover}> For General Citizen (p.a.)</p>
                                                </th>
                                                {data.fds && data.fds.filter(item => item.seniorCitizen !== null).length > 0 &&
                                                <th className="font14">
                                                    <p className={styles.textover}> For Senior Citizen (p.a.)</p>
                                                </th>}
                                            </tr>
                                        </thead>
                                        <div className={styles.webwrap}>
                                            <tbody>
                                                {data.fds && data.fds.map((item,index)=>(
                                                <tr key={index}>
                                                    <td>
                                                        <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/${item.bankSlug}/${item.slug}`}><span title={`${item.name}`} className={`font14 textLink ${styles.link}`}>{item.name}</span></Link> 
                                                    </td>
                                                    <td>
                                                        <p className="font14 text666 ">{item.normalCitizen || "--"}</p>
                                                    </td>
                                                    {data.fds && data.fds.filter(item => item.seniorCitizen !== null).length > 0 &&
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
                        </>
                    ))}
                    <h2 className="font24 fontMedium mb15 textBlack">Features of Fixed Deposits</h2>
                    <p className="font14 text444 lineHeight24 mb20">Fixed deposits offer investors an array of benefits. Here are what you get when you invest your money in fixed deposits:</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Dependable Returns</h3>
                    <p className="font14 text444 lineHeight24 mb20">When you deposit money in FDs, you get promised returns at the time of FD maturity.</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Safe investment Tool</h3>
                    <p className="font14 text444 lineHeight24 mb20">The finance market offers you several investment tools, but fixed deposits are considered to be the safest ones. It is not led by market fluctuations, ensuring the investors get the promised returns. The fact that the returns are not dependent on the stock-market swings makes it a safe investment tool.</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Fixed Deposit Rates</h3>
                    <p className="font14 text444 lineHeight24 mb20">The FD interest rates range from 2.3% to 7.75%. The offered FD rates vary from one bank to another. Additionally, senior citizens get an interest rate of 0.5-1% more than the one offered to the general citizens. However, the offered fixed deposit interest rate will be subject to deposit time and tenure.</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Flexibility</h3>
                    <p className="font14 text444 lineHeight24 mb20">You get the option to withdraw funds from your fixed deposit if needed. Additionally, you can increase the deposit amount by a multiple of ten. In other words, you get high returns with flexible deposit options.</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Loan Against FD</h3>
                    <p className="font14 text444 lineHeight24 mb20">The utmost feature you get with FD is that you can take out a loan against FD to meet your financial obligations. This comes in handy if you need urgent funds. There’s no need to make premature withdrawals from your long-saved fixed deposit.</p>
                    <h2 className="font24 fontMedium mb15 textBlack">Factors that Affect FD Interest Rates</h2>
                    <p className="font14 text444 lineHeight24 mb20">There are certain factors that affect the FD interest rates. If you are investing in a fixed deposit, it is obvious you are looking for savings and returns. The interest rate you will get becomes crucial as it will determine the returns you will receive in the end. You must be familiar with the factors that affect the interest on fixed deposits.</p>
                    <p className="font14 text444 lineHeight24 mb20">Below-depicted factors affect the fixed deposit interest rates in banks:</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Time Frame of FD Investment</h3>
                    <p className="font14 text444 lineHeight24 mb20">Interest on fixed deposits varies as per the chosen time frame at the time of opening a fixed deposit account. Many banks and NBFCs offer investors high FD interest rates for a specific tenure. For instance, you will get higher FD returns if you opt for a duration of 1.5 years rather than 1 year</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Invested Amount</h3>
                    <p className="font14 text444 lineHeight24 mb20">The total amount that you have decided to invest in your FD during the investment tenure also affects the offered FD interest rates. For instance, if you are investing an amount of INR 25,000, you can get an interest rate of 8.75% from the top FD rate providers.</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Renewals</h3>
                    <p className="font14 text444 lineHeight24 mb20">Banks and NBFCs allow investors to count on auto-renewal. With auto-renewals, you can secure higher fixed deposit interest rates. Additionally, you dont have to keep track of your FD renewal date. In general, investors can get an additional 0.10% to 0.50% interest rate on their FDs through auto-renewal.</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Age of the Investor</h3>
                    <p className="font14 text444 lineHeight24 mb20">Investors age also plays a significant role in determining the applicable interest rate on an FD. Usually, senior citizens earn a higher rate of interest compared to investors of average age. Moreover, banks offer 0.35% higher interest rates of fixed deposits to senior citizens on the contrary to general citizens.</p>
                    <h3 className="text181d font18 fontMedium mt30 mb15">Economic Conditions</h3>
                    <p className="font14 text444 lineHeight24 mb20">Ongoing economic conditions across the nation, together with monetary policy and fiscal policy can create a significant impact on FD interest rates.</p>
                    <h2 className="font24 fontMedium mb15 textBlack">Fixed Deposit Interest Rate Calculator</h2>
                    <p className="font14 text444 lineHeight24 mb20">Fixed deposit interest rate calculator is an advanced tool that allows you to compute FD returns by just entering a few values in the calculators. The interest you will get on the deposited amount depends upon the invested amount, duration, offered FD interest rate and frequency of interest computation.</p>
                    <p className="font14 text444 lineHeight24 mb20">All you have to do is enter the said details in the text area, and the computed value, i.e. fixed deposit returns that you will get, will be displayed on your screen. Now you can compare fixed deposit interest rates offered by numerous banks in one place. Just enter the interest rate banks offer and compare the returns you will get at maturity.</p>
                    <p className="font14 text444 lineHeight24 mb20">Move forward with the provider that offers the best FD interest rates and higher returns.</p>
                    <h2 className="font24 fontMedium mb15 textBlack">Fixed Deposit Interest and Income Tax</h2>
                    <p className="font14 text444 lineHeight24 mb20">As you know all such incomes are subject to income tax. So the very next question that strikes through your mind is whether the income that you will earn through FDs will be taxable or not. So, here is what you must go through before investing in fixed deposits:</p>
                    <ul className="blueList mb20">
                        <li><span>The income earned through FDs falls in the category of Income from Other Source and is taxable.</span></li>
                        <li><span>Banks do not deduct Tax Deducted at Source or TDS if the investors interest income is below INR 40,000 (annually)</span></li>
                        <li><span>FD investors must submit the Form 15G as well as Form 15H in the bank. This needs to be done at the beginning of the fiscal year. If you submit the said form on time the TDS will not be deducted, else there will be a TDS deduction too.</span></li>
                    </ul>
                    <h2 className="font24 fontMedium mb15 textBlack ">CRISIL & ICRA Rating List for Corporate Fixed Deposits</h2>
                    <p className="font14 text444 lineHeight24 mb20">Individuals also have the option to invest in corporate fixed deposits. But before investing in corporate FDs you must get familiar with the credit ratings. Each corporate fixed deposit has a credit rating which acts as a testament to its credibility and consistency as well as stability.</p>
                    <h2 className="font24 fontMedium mb15 textBlack">The following table depicts the CRISIL credit ratings:</h2>
                    <div className={styles.respTable}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td><b>Standard</b></td>
                                <td><b>Rating</b></td>
                            </tr>
                            <tr>
                                <td><span>Highest safety</span></td>
                                <td><span>FAAA</span></td>
                            </tr>
                            <tr>
                                <td><span>High safety</span></td>
                                <td><span>FAA</span></td>
                            </tr>
                            <tr>
                                <td><span>Adequate safety</span></td>
                                <td><span>FA</span></td>
                            </tr>
                            <tr>
                                <td><span>Inadequate safety</span></td>
                                <td><span>FB</span></td>
                            </tr>
                            <tr>
                                <td><span>High-risk</span></td>
                                <td><span>FC</span></td>
                            </tr>
                            <tr>
                                <td><span>Default</span></td>
                                <td><span>FD</span></td>
                            </tr>
                            <tr>
                                <td><span>Not Meaningful</span></td>
                                <td><span>NM</span></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <h2 className="font24 fontMedium mb15 textBlack">The following table depicts the ICRA credit ratings:</h2>
                    <div className={styles.respTable}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td><b>Standard</b></td>
                                <td><b>Rating</b></td>
                            </tr>
                            <tr>
                                <td><span>Highest credit quality</span></td>
                                <td><span>MAAA</span></td>
                            </tr>
                            <tr>
                                <td><span>High credit quality</span></td>
                                <td><span>MAA</span></td>
                            </tr>
                            <tr>
                                <td><span>Adequate credit quality</span></td>
                                <td><span>MA</span></td>
                            </tr>
                            <tr>
                                <td><span>Inadequate credit quality</span></td>
                                <td><span>MB</span></td>
                            </tr>
                            <tr>
                                <td><span>Risk-prone credit quality</span></td>
                                <td><span>MC</span></td>
                            </tr>
                            <tr>
                                <td><span>Lowest credit quality</span></td>
                                <td><span>MD</span></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <h2 className="font24 fontMedium mb15 textBlack">Top 5 Corporate FD Rates in India – 2023</h2>
                    <p className="font14 text444 lineHeight24 mb20">The following table lists top five corporate FD rates in India 2023.</p>
                    <div className={styles.respTable}>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td><b>Company Name</b></td>
                                <td><b>1-year (Interest Rate p.a.)</b></td>
                                <td><b>3-year (Interest Rate p.a.)</b></td>
                                <td><b>5-year (Interest Rate p.a.)</b></td>
                                <td><b>Duration</b></td>
                                <td><b>FD Interest rate for Senior Citizen (In Percent)</b></td>
                            </tr>
                            <tr>
                                <td><span>Shriram Transport Finance Company Limited.</span></td>
                                <td><span>6.31%</span></td>
                                <td><span>7.48%</span></td>
                                <td><span>7.62%</span></td>
                                <td><span>12 to 60 months</span></td>
                                <td><span>0.5</span></td>
                            </tr>
                            <tr>
                                <td><span>Shriram City Union Finance Company Limited.</span></td>
                                <td><span>6.31%</span></td>
                                <td><span>7.48%</span></td>
                                <td><span>7.62%</span></td>
                                <td><span>12 to 60 months</span></td>
                                <td><span>0.5</span></td>
                            </tr>
                            <tr>
                                <td><span>Muthoot Capital Services Limited.</span></td>
                                <td><span>6.25%</span></td>
                                <td><span>6.75%</span></td>
                                <td><span>7.25%</span></td>
                                <td><span>12 to 60 months</span></td>
                                <td><span>0.25</span></td>
                            </tr>
                            <tr>
                                <td><span>Bajaj Finance Limited.</span></td>
                                <td><span>6.2%</span></td>
                                <td><span>7.4%</span></td>
                                <td><span>7.4%</span></td>
                                <td><span>12 to 60 months</span></td>
                                <td><span>0.25</span></td>
                            </tr>
                            <tr>
                                <td><span>Kerala Transport Development Finance Corporation Limited</span></td>
                                <td><span>6%</span></td>
                                <td><span>6%</span></td>
                                <td><span>5.75%</span></td>
                                <td><span>12 to 60 months</span></td>
                                <td><span>0.25</span></td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <p className="font14 text444 lineHeight24 mb20"><b><i>With fixed deposits investors get an incredible opportunity for earning the highest rate of return. The best part about such an investment tool is, that it is a risk-free investment. You can build a corpus by depositing small amounts in a fixed deposit account for a specific duration of time.</i></b></p>
                </div>
            </div>
        </section>
        
      <RightSideBar menuLinks = {interLinkingData} paddingTop={true}/>
    </div>
        {cmsData && cmsData[0] &&
        <div className='container containerFlex'>
            <section className={cmsStyles.eligible}>
                <div className="container">
                    <h1 className="font24 fontMedium text181d Innerheading mb40 lineHeight36">{cmsData[0].post_title || ''}</h1>
                    <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
                </div>
            </section>
          
            {/* <RightSideBar menuLinks={interLinkingData} paddingTop={true} /> */}
        </div>}
        {cmsData && cmsData.length > 0 && cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
        <section className="faq">
            <div className="container">
                <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
                <div className="faqBx">
                    <FAQ data={cmsData[0].faq_content}  />
                </div>
            </div>
        </section> :
        null}
        </>
    );
}