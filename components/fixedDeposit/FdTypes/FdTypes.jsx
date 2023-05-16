import { useState } from "react";
import styles from "../FdRates.module.css";
import {BreadCrumb,FAQ} from "../../shared/";
import {FdType} from "../../calculator/MainCalculator";
import { RightSideBar } from "../../shared";
import { Link } from "../../ui";
import { isMobile } from "react-device-detect";
import FaqData from "../../../data/FdRatesFaq.json"
export function FdTypes({data, topBanks}) {
    
    let interLinkingDataArray = {"text": "fdTypes","child": []};
    data && data.schemes.map((data)=> interLinkingDataArray.child.push({"title": data.type, "text": data.description, "path": data.typeSlug}))
    const  HomePageCalculator = [interLinkingDataArray]
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
            "text": "Scheme",
            "path": "/fixed-deposit-rate/scheme", 
            "class": ""
        },
        
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
              interLinkingFdBankArray,
              interLinkingFdSchemeArray
            ];    
    return (
        <>
        <div className="container containerFlex">
            <div className="container">
                <BreadCrumb links={breadCrumbLinks} />
                <div className={styles.loanintrestwrap}>
                    <div className={` ${styles.top0} mb30`}>
                        <h1 className="font24  textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36 mb15">Types of Fixed Deposit | Fixed Deposit Scheme</h1>
                    </div>
                    <p className="font14 textBlack lineHeight20 mb15">Banks and NBFCs in India offer a number of different types of fixed deposits according to the customer’s specific investment needs. Fixed deposits are categorised into different types according to their features, characteristics, limitations and liquidity. On this page, we will take a look at the different types of fixed deposits available and how you can invest in them.</p>
                    <div className={styles.heading}>
                        <h2 className="font18 textBlack mb10 fontMedium">Top Fixed Deposit Scheme / Type</h2>
                    </div>
                    <p className="font14 textBlack lineHeight20 mb25">Banks offer many types of fixed deposits to their customers, allowing them to invest in Fixed Deposits that are modified to their specific needs and budget.</p>
                    <div className={styles.loantableWrap}>
                        <div className={styles.planDiv}>
                            <div className={styles.tblwrap}>
                                {isMobile?data && data.schemes.filter(item => item.isVisible === true).map((item, index)=> (
                                <div className={styles.responsivetable} key={index}>
                                    <table className={styles.intrestratebanks}>
                                        <thead>
                                            <tr>
                                                <th colSpan="2" align="left">
                                                    <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/scheme/${item.typeSlug}`}><span title={`${item.type}`} className={`font12 textLink ${styles.link}`}>{item.type}</span></Link> 
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <p className="font12 text666  fontsemiBold">For General Citizen (p.a.)</p>
                                                </td>
                                                {data.schemes.filter(item => item.seniorCitizen !== null).length > 0 &&
                                                <td>
                                                    <p className="font12 text666 fontsemiBold ">For Senior Citizen (p.a.)</p>
                                                </td>}
                                            </tr>
                                            <tr>
                                                <td>
                                                    <p className="font12 text666 ">{item.normalCitizen || "--"}</p>
                                                </td>
                                                {data.schemes.filter(item => item.seniorCitizen !== null).length > 0 &&
                                                <td>
                                                    <p className="font12 text666 ">{item.seniorCitizen || "--"}</p>
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
                                        {data.schemes.filter(item => item.seniorCitizen !== null).length > 0 &&
                                        <th className="font14">
                                            <p className={styles.textover}> For Senior Citizen (p.a.)</p>
                                        </th>}
                                    </tr>
                                </thead>
                                <div className={styles.webwrap}>
                                    <tbody>
                                        {data && data.schemes.filter(item => item.isVisible === true).map((item, index)=> (
                                        <tr key={index}>
                                            <td>
                                                <Link href={`${process.env.BASE_URL}/fixed-deposit-rate/scheme/${item.typeSlug}`}><span title={`${item.type}`} className={`font14 textLink ${styles.link}`}>{item.type}</span></Link> 
                                            </td>
                                            <td>
                                                <p className="font14 text666 ">{item.normalCitizen || "--"}</p>
                                            </td>
                                            {data.schemes.filter(item => item.seniorCitizen !== null).length > 0 &&
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
                {data && data.schemes.filter(item => item.isVisible === false).length>0 && <>
                    <div className={styles.heading}>
                        <h3 className="font18 textBlack mb15 fontMedium">Other Fixed Deposit Scheme / Type</h3>
                    </div>
                <ul className={`${styles.otherFdSche} mb10`}>
                    {data && data.schemes.filter(item => item.isVisible === false).map((item, index)=> (
                        <li key={index}><Link href={`${process.env.BASE_URL}/fixed-deposit-rate/scheme/${item.typeSlug}`} title={`${item.type}`} className={`font14 ${styles.ofsLink}`} >{item.type}</Link> </li>
                    ))}
                </ul>
                </>}
                    
                    {/* <p className="font14 textBlack lineHeight20 mb15">Given below are the latest interest rates offered by top banks for tenures ranging from 7 days to 10 years as of June 2023.</p> */}
                    <div className={styles.fdpage}>
                            <h2 className="mt30 mb15 font18 text181d fontMedium">Overview of Fixed Deposits </h2>
                            <p className="font14 textBlack lineHeight20 mb15">Lets start with a quick overview of fixed deposits which will help to determine how it’s
                                different from other financial instruments:</p>
                                <div className={styles.respTable}>
                                    <table className={`${styles.table} mb50`} cellPadding="0" cellSpacing="0">
                                        <thead>
                                            <tr>
                                                <th>Parameters</th>
                                                <th>Description</th>
                                            </tr>

                                        </thead>
                                        <tbody>

                                            <tr>
                                                <td>Fixed Deposits</td>
                                                <td>It is one of the various investment options in which investors deposit a
                                                    fixed amount for a set time frame. Depositors get the investment returns
                                                    through interest on the deposited amount at the time of FD maturity.
                                                    However, banks and financial institutions prohibit premature withdrawal
                                                    from
                                                    the accumulated amount.
                                                    Additionally, you will have to pay the penalty if you decide to reinvest
                                                    the
                                                    amount after maturity.
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Provided By</td>
                                                <td>Banks and Financial institutions</td>
                                            </tr>
                                            <tr>
                                                <td>How to open FD</td>
                                                <td>Online through the official website or offline by making an in-person
                                                    visit
                                                    to the provider</td>
                                            </tr>
                                            <tr>
                                                <td>Fixed Deposit Types</td>
                                                <td>Fixed Deposit Types Senior Citizen Fixed Deposits
                                                    Tax Saving Fixed Deposits
                                                    Flexi Fixed Deposit
                                                    Company Deposits
                                                    Cumulative Fixed Deposit
                                                    NRI Fixed Deposits
                                                    Non-Cumulative Fixed Deposit
                                                    Bank Deposits
                                                    Regular Fixed Deposits
                                                    Standard Fixed Deposits
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Risk</td>
                                                <td>Risk-free investment instrument</td>
                                            </tr>
                                            <tr>
                                                <td>Premature FD Withdrawals</td>
                                                <td>Depositors can make a premature withdrawal but have to pay an associated
                                                    penalty </td>
                                            </tr>
                                            <tr>
                                                <td>How to calculate FD returns</td>
                                                <td>Through online FD calculator</td>
                                            </tr>
                                            <tr>
                                                <td>Fixed Deposit Interest rates</td>
                                                <td>Fixed Deposit Interest rates</td>
                                            </tr>

                                        </tbody>
                                    </table>
                                </div>
                            <h2 className="mt30 mb15 font18 text181d fontMedium">Types of Fixed Deposits in India </h2>
                            <p className="font14 textBlack lineHeight20 mb15">You get the option to open a fixed deposit account and invest amounts based on your
                                financial needs. Fixed deposit returns allow you to cope with your short-term and
                                long-term goals. To fulfil versatile customer needs, banks offer different types of
                                fixed deposits. Every fixed deposit has its features, limitations, and advantages. Thus,
                                before starting your investment, determine what benefits you are looking for and which
                                FD best suits your needs. </p>
                            <p className="font14 textBlack lineHeight20 mb15">Based upon varying customer needs, the following types of fixed deposits in India are
                                available for investment</p>
                            <div className={styles.respTable}>
                                <table className={`${styles.table} mb50`} cellPadding="0" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Type of Fixed Deposit</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Description</p>
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>&nbsp;Bank Fixed Deposits</span></p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Banks specifically offers these to customers with existing
                                                        savings accounts. A few banks offer additional features such as
                                                        insurance of up to Rs. 5 lakhs.</span></p>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Additionally, bank fixed deposit interest rates are usually
                                                        lower than the ones provided by non-banking finance companies or
                                                        NBFCs.</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Company Deposits</span></p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>NBFCs offer Company or Corporate fixed deposits with higher
                                                        interest rates. However, higher returns aren&rsquo;t enough, as
                                                        you need to look into which companies your funds will be
                                                        invested in. Invest in companies that have good credit ratings
                                                        from CRISIL and ICRA.</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Cumulative Fixed Deposits</span></p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>In Cumulative Fixed Deposits, investors can access the earned
                                                        interest only at the time of FD maturity. In simple words, the
                                                        interest amount will not be added to the FD account at regular
                                                        intervals. This type of fixed deposit is highly suitable for
                                                        investors not looking forward to regular incomes. The key focus
                                                        is end returns. Investment tenure for Cumulative fixed deposits
                                                        ranges from 12 to 60 months.&nbsp;</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Non-Cumulative Fixed Deposits</span></p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Non-cumulative FDs are a subset of FDs in which you receive
                                                        periodic payments of the interest accrued on the principal
                                                        amount from the financial institution. When opening an FD
                                                        account with the bank or financial institution, you get the
                                                        flexibility to select interest frequency for a month, quarter,
                                                        six months or a year. The time frame for non-cumulative FDs
                                                        ranges from 12 to 60 months. However, you must know that a more
                                                        significant interest payout frequency results in a lower
                                                        maturity amount. The benefit of this FD is that you can get
                                                        consistent interest payments to cover your short-term financial
                                                        needs. These FDs are suitable for retirees or pensioners who
                                                        require consistent investment returns.</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Tax-Saving Fixed Deposits</span></p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Tax-saving FDs usually come with a fixed investment tenure of 5
                                                        years. The main advantage of counting on tax saver fixed
                                                        deposits is that you can get a tax deduction as per Section 80C
                                                        of the Income Tax Act of 1.5 lakhs at maximum. However, you
                                                        cannot make early or premature withdrawals from this sort of FD.
                                                        In addition, a lock-in period applies to tax-saver FDs
                                                        prohibiting early withdrawals.</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Senior Citizen Fixed Deposits</span></p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Senior Citizen Fixed Deposits are a particular kind of fixed
                                                        deposit available to anyone aged 60 or above. The critical
                                                        advantage of senior citizen FD over other types of FD is that it
                                                        offers a higher rate of return, enabling seniors to satisfy
                                                        various financial needs. Senior folks can invest in the FDs
                                                        designed explicitly for them and avail themselves of an
                                                        additional 0.25 to 0.75% interest returns on the deposited
                                                        amount.</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>NRI Fixed Deposits</span></p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>NRI fixed deposits offer higher interest returns contrary to
                                                        savings accounts. NRI FDs provide higher returns and protect the
                                                        investor from market volatility.</span></p>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Examples include exceptional returns and a flexible time frame
                                                        from&nbsp;12 to 60 months.</span></p>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Additionally, these FDs come with a quick renewal feature and
                                                        offer investors multiple deposit options. If you belong to the
                                                        Non-Resident Indian category, invest in this FD from your NRO
                                                        account as an NRI.</span></p>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Additionally, if you fall in the Person of Indian Origin (PIO)
                                                        or Overseas Citizen of India, you can invest in NRI fixed
                                                        deposits.</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Standard/Regular Fixed Deposits:</span></p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15"><span>Of all FDs, &nbsp;Standard Fixed Deposits are the most
                                                        prevalent ones. Such FDs allow investors to invest for a
                                                        specified time frame. The interest rate will be fixed for the
                                                        said tenure. It is the simplest form of fixed deposit.
                                                        Typically, banks and financial institutions allow you to deposit
                                                        money for a term between one and ten years. The best part about
                                                        Regular fixed deposits is the principal amount remains secure,
                                                        and the investor gets a higher interest rate. The entire process
                                                        is simple and highly convenient.</span></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h2 className="mt30 mb15 font18 text181d fontMedium">
                                Types of FDs for NRIs </h2>
                            <p className="font14 textBlack lineHeight20 mb15">The benefits of fixed deposits are offered to NRIs through Non-resident External (NRE)
                                fixed deposits, and Non-resident Ordinary (NRO) fixed deposits. Here’s what you should
                                know about these types of FDs for NRIs.</p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">NRE Fixed Deposit</h3>
                            <p className="font14 textBlack lineHeight20 mb15">NRE fixed deposits are considered the foremost choice for individuals looking forward to
                                investing in foreign currency in Indian rupees. The interest accumulated in the
                                Non-Resident External fixed deposit account is tax-free.
                                Additionally, the principal and interest income are fully refundable, making it entirely
                                different from other types of fixed deposit accounts. One crucial point you need to
                                consider while opening an NRE fixed deposit account is that changes in exchange rates
                                may impact the amount deposited in the FD account.
                            </p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">NRO Fixed Deposit</h3>
                            <p className="font14 textBlack lineHeight20 mb15">Non-Resident Ordinary (NRO) fixed deposit accounts allow individuals to deposit money in
                                foreign and Indian currency as per their preference. It is the perfect investing tool
                                for overseas people who want to generate additional income from the Indian financial
                                sector. However, unlike NRO fixed deposits, the funds accumulated in NRO FDs are subject
                                to a 30% tax under Income Tax Act. The absence of an exchange rate adds a benefit to NRO
                                fixed deposits. Another intriguing benefit is that interest income and principal can be
                                fully obtained up to a specific threshold or specified limit. </p>


                            <h2 className="mt30 mb15 font18 text181d fontMedium">
                                Benefits of Fixed Deposits</h2>
                            <p className="font14 textBlack lineHeight20 mb15">Fixed deposits are considered among the best investment instruments. Investing in fixed
                                deposits opens the door to numerous benefits you definitely dont want to miss out on.
                                Before opening a fixed deposit account, get familiar with an array of benefits FDs offer
                                investors. A few benefits of fixed deposits are listed below:</p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">Risk-Free Investment Instrument </h3>
                            <p className="font14 textBlack lineHeight20 mb15">FDs are said to be the safest investment instruments easily accessible in the investment
                                market. It allows you to secure high returns without the involvement of any risks.
                                Investors get a fixed rate of interest throughout the investment time frame. The market
                                fluctuation does not hamper the offered fixed deposit interest rates. </p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">Assured Interest Rates</h3>
                            <p className="font14 textBlack lineHeight20 mb15">Regardless of the fixed deposit chosen, the interest returns are deposited in the FD
                                account. You can compute fixed deposit interest through the banks official websites or
                                an FD calculator. It allows you to compute the amount you will receive upon FD maturity.
                            </p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">Hassle-Free Investment Procedure, </h3>
                            <p className="font14 textBlack lineHeight20 mb15">The best part about FD investments is that it is simple and hassle-free. You just need a
                                savings account with the bank, and you can use the same to invest in a fixed deposit.
                                You can make your investment online through an official portal or by visiting the
                                nearest bank branch offline. At maturity, it is entirely your call if you want to
                                reinvest the amount or credit it in your savings account. </p>

                            <h3 className="mt10 mb15 font16 text181d fontMedium">Availability of Compound Interest</h3>
                            <p className="font14 textBlack lineHeight20 mb15">Depositors gets the opportunity to reinvest the FD amount gained at maturity. The
                                depositor chooses the reinvestment tenure based on financial requirements. By
                                compounding the interest, we mean you will get interested in the principal amount and
                                the earned interest amount. </p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">Ease Reinvestment Options</h3>
                            <p className="font14 textBlack lineHeight20 mb15">At the time of FD maturity, and you get the option to reinvest the generated returns. The
                                reinvestment process is quick and straightforward.
                                You must ask the bank executive to reinvest the amount in the FD account with a new FD
                                investment tenure.</p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">Flexible Time Frame </h3>
                            <p className="font14 textBlack lineHeight20 mb15">Banks and financial institutions allow investors to decide the investment tenure of the
                                fixed deposit. Usually, banks offer flexible time frames from 7 days up to 10 years.
                            </p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">Tax Saving Benefits</h3>
                            <p className="font14 textBlack lineHeight20 mb15">Major Indian banks provide tax-saving fixed deposits which cater to lower the payable tax
                                amount. However, you must get in touch with the bank to get detailed information about
                                the tax benefits of FD and other associated data.</p>
                            <h3 className="mt10 mb15 font16 text181d fontMedium">Availability of Loan Against Fixed Deposits</h3>
                            <p className="font14 textBlack lineHeight20 mb15">You can use the accumulated amount to cope with your urgent financial requirements. There
                                is no need to withdraw the amount by paying the penalty as banks allow you to secure a
                                loan against FD.</p>

                            <h2 className="mt30 mb15 font18 text181d fontMedium">
                                Comparison of Fixed Deposit Rates</h2>
                            <p className="font14 textBlack lineHeight20 mb15"> Once you are aware of the benefits that you can avail of through fixed deposits, the
                                very next thing you need to decide is which bank or financial institution you want to
                                open your FD account with. To come up with the final decision, compare the fixed deposit
                                rates offered by the top banks in India. To make it easier for you, we have compared and
                                tabulated the FD interest rates of top banks. </p>

                            <div className={styles.respTable}>
                                <table className={`${styles.table} mb50`} cellPadding="0" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            <th>Bank Name</th>
                                            <th>Fixed Deposit Rates for General Citizens (per annum)</th>
                                            <th>Fixed Deposit Rates for Senior Citizens (per annum)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td> State Bank of India Fixed Deposit</td>
                                            <td> 2.9 to 5.5 Per cent </td>
                                            <td> 3.4 to 6.3 Per cent</td>

                                        </tr>
                                        <tr>
                                            <td> HDFC Bank Fixed Deposit</td>
                                            <td> 2.75 to 5.75 Per cent </td>
                                            <td> 3.25 to 6.5 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> IDBI Bank Fixed Deposit</td>
                                            <td> 2.7 to 5.75 Per cent</td>
                                            <td> 3.2 to 6.5 Per cent</td>

                                        </tr>
                                        <tr>
                                            <td> Kotak Mahindra Bank Fixed Deposit</td>
                                            <td> 2.5 to 5.9 Per cent </td>
                                            <td> 3 to 6.4 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> RBL Bank Fixed Deposit</td>
                                            <td> 3.25 to 6.65 Per cent</td>
                                            <td> 3.75 to 7.15 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> Punjab National Bank Fixed Deposi</td>
                                            <td> 3 to 5.6 Per cent </td>
                                            <td> 3.5 to 6.1 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> Canara Bank Fixed Deposit</td>
                                            <td> 2.9 to 5.75 Per cent</td>
                                            <td> 2.9 to 6.25 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> Axis Bank Fixed Deposit</td>
                                            <td> 2.5 to 5.75 Per cent</td>
                                            <td> 2.5 to 6.5 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> Bank of Baroda Fixed Deposit</td>
                                            <td> 2.8 to 5.35 Per cent</td>
                                            <td> 3.3 to 6.35 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> IDFC First Bank Fixed Deposit</td>
                                            <td> 3.5 to 6.5 Per cent </td>
                                            <td> 4 to 7 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> Bank of India Fixed Deposit</td>
                                            <td> 2.85 to 5.2 Per cent</td>
                                            <td> 3.35 to 5.95 Per cent</td>
                                        </tr>
                                        <tr>
                                            <td> Punjab and Sind Bank Fixed Deposi</td>
                                            <td> 3 to 5.4 Per cent </td>
                                            <td> 3.5 to 5.9 Percent</td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <p className="font14 textBlack lineHeight20 mb15">After going through the list of top banks, here’s the list of other banks along with
                                their interest rates specific to an investment tenure</p>
                        <div className={styles.respTable}>
                                <table className={`${styles.table} mb50`} cellPadding="0" cellSpacing="0">
                                    <tbody>
                                        <tr>
                                            <td rowSpan="2">
                                                <p className="font14 textBlack lineHeight20 mb15">Bank Name</p>
                                            </td>
                                            <td colSpan="4">
                                                <p className="font14 textBlack lineHeight20 mb15">Interest Rates (per annum)</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Highest slab (In Per cent)</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">One Year Time Frame</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Three Year Time Frame</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Five Year Time Frame</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Suryoday Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.49 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.75 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Jana Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.35 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.25 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.25 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">ESAF Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.25 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.75 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.25 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Utkarsh Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.25 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.9 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.75 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.75 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Ujjivan Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.2 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.2 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Fincare Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.25 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">North East Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.25 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Shivalik Small Finance Bank Limited FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.75 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.5 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Deutsche Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.25 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.75 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">Equitas Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.6 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.9 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">AU Small Finance Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.9 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.35 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.9 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.9 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">RBL Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.55 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.55 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">DCB Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.6 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.1 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.6 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.6 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">SBM Bank India FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">7.05 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.85 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">5.85 %</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">IndusInd Bank FD</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.5 %</p>
                                            </td>
                                            <td>
                                                <p className="font14 textBlack lineHeight20 mb15">6.5 %</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="font14 textBlack lineHeight22 mb30">In India, there are various investing possibilities, although fixed deposits are more popular. FDs foremost features, including safety, security, and constant growth, are the key reasons for escalated FD investments. The bank returns the investment amount plus interest when the FDs term is over, i.e. FD maturity. You can choose an appropriate fixed deposit option from the several fixed deposit kinds that banks provide.</p>
                        </div>
                </div>
                {/* <FdType calculator={HomePageCalculator} heading={false}/> */}
                
            </div>
            <RightSideBar menuLinks={interLinkingData} paddingTop={ true} />
            </div>
            {FaqData && FaqData.length > 0 ?
                <section className="faq">
                    <div className="container">
                        <h2 className="faqHeading font24">Faq</h2>
                        <div className="faqBx">
                        <FAQ data={FaqData}/>
                        </div>
                    </div>
                </section>
            :null}
        </>
    );
}