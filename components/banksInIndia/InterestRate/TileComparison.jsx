import Image from "next/image";
import React, { useState } from "react";
import { LeadPopup, PopUp } from "../../shared";
import { NavLink } from "../../ui";
import styles from "./TileComparison.module.css";

export const TileComparison = ({data,loanType, bankName, comparsion,bankSlugUrl, cmsData}) => {
    let loan = loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    let bank = bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const [openDetails, setOpen] = useState(-1);
    const [openThankYouPopup,setThankYouPopUp] = useState(false);
    const [openLeadPopup, setLeadPopup] = useState(false);
    const [bankSlug, setBankSlug] = useState('');
    const [productName, setProductName] = useState('');
    let title = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
    
    let interestRates = data && data.length > 0 ? data[0].plans : [];
    let compare = comparsion && comparsion.length > 0 ? comparsion[0] && comparsion[0].plans && comparsion[0].plans.filter((item) => item.lenderSlug !== bankSlugUrl) : [];
    let value = loanType.split("-")
    let zero = value[0].charAt(0).toUpperCase()
    let first = value[1].charAt(0).toUpperCase()

    const enquireNowHandle = (bankSlug, productName) => {
        if(bankSlug === 'icici-bank' && productName === 'Home Loan'){
            router.push('https://loan.urbanmoney.com/home-loan-journey?instantLoan=ICICI_HOME_LOAN')
        }else if(bankSlug === 'godrej-housing-finance' && productName === 'Home Loan'){
            router.push('https://loan.urbanmoney.com/home-loan-journey?instantLoan=GHF_LOAN')
        }else{
            setProductName(productName);
            setBankSlug(bankSlug);
            setLeadPopup(true);
        }
    }
    return(
        <>
        {openLeadPopup ? <LeadPopup bankSlug={bankSlug} productName={productName} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
        {openThankYouPopup ? <PopUp title={title} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
    <div className="container">
        <div className={styles.ctaSection}>
         {interestRates.map((item, index) =>
        <div className={styles.webCtaContent} key={index}>
            <Image className="imgResponsive " src="/assets/images/ctaBg.png"  layout='fill'/>           
            <ul>
                <li>
                <NavLink href={`${process.env.BASE_URL}/banks-in-india/${bankName}/${loanType}`}>
                <Image className="imgResponsive " src={process.env.IMAGE_BASEURL + '/banklogo/' + item.lenderLogo} width={140} height={40} alt={`${item.lenderName} ${item.planName} Interest Rate`}/>
                </NavLink>
                    <p className="font16 lineHeight16 mt10 text222">{loan} offer for You</p>
                </li>
                <li>
                    <p className="font26 text505050 fontBold">{item.interestRateMetadata.text || '--'}</p>
                    <span className="font16 lineHeight16 text222">Interest Rate (p.a.)</span>
                </li>
                <li>
                    <p className="font26 text505050 fontBold">{item.loanAmountMetadata.text}</p>
                    <span className="font16 lineHeight16 text222">{item.tenureMetadata.text}</span>
                </li>
                <li>
                    <p className="font26 text505050 fontBold">{item.processingFeeMetadata.text === 'Nil'?<div className={styles.nillAplly}>0 Processing Fee</div>:item.processingFeeMetadata.text || '--'}</p>
                    <span className="font16 lineHeight16 text222">Processing Fee</span>
                </li>
                <li>
                    <button className="textWhite font14" onClick={() => enquireNowHandle(item.lenderSlug, item.planName)}>Enquire Now</button>
                </li>
            </ul>
        </div>
        )}
        {interestRates.map((item, index) => 
        <div className={styles.mobCtaContent} key={index}>
            <div className={styles.ctaContent}>
            {/* <Image className="imgResponsive" src="/assets/images/ctaBg.png"  width={300} height={78}/>    */}
                <ul className={styles.logoBox}>
                    <li>
                    <NavLink href={`${process.env.BASE_URL}/banks-in-india/${bankName}/${loanType}`}>
                    <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + item.lenderLogo} width={100} height={30} alt={`${item.lenderName} ${item.planName} Interest Rate`}/>
                    </NavLink>
                        <span className="font12 text222">{loan} offer for You</span>
                    </li>
                    <li>
                        <button className="textWhite font12" onClick={() => enquireNowHandle(item.lenderSlug, item.planName)}>Enquire Now</button>
                    </li>
                </ul>
            </div>
            <ul className={styles.contentBox}>
                <li>
                    <p className="font14 text505050 fontBold">{item.interestRateMetadata.text || '--'}</p>
                    <span className="font10 text505050 text222">Interest Rate (p.a.)</span>
                </li>
                <li>
                    <p className="font14 text505050 fontBold">{item.loanAmountMetadata.text}</p>
                    <span className="font10 text505050 text222">{item.tenureMetadata.text}</span>
                </li>
                <li>

                    <p className="font14 text505050 fontBold">{item.processingFeeMetadata.text === 'Nil'?<div className={styles.nillAplly}>0 Processing Fee</div>:item.processingFeeMetadata.text || '--'}</p>
                    <span className="font10 text505050 text222">Processing Fee</span>
                </li>
            </ul>
        </div>
        )}
    
</div>

<div className={styles.compareRateTable}> 
    <p className="font24  textBlack centerheading mb10">{cmsData && cmsData.length > 0 && cmsData[0].compare_title ? cmsData[0].compare_title : `Compare ${bank} ${loan} Interest Rate with Other Lenders`}</p>
    {cmsData && cmsData.length > 0 && cmsData[0].compare_description && 
        <div className={`${styles.bankText} mb20`}>
        <div dangerouslySetInnerHTML={{__html: cmsData[0].compare_description}}></div>
    </div>}
    <div className={styles.LoanTABLEWRAP}>
        <div className={styles.tableHeadings}>
            <ul>
                <li className="font14 text222 fontsemiBold">Starting Interest Rate (p.a)</li>
                <li className="font14 text222 fontsemiBold">Processing Fee</li>
                <li className="font14 text222 fontsemiBold">Rating</li>
                <li className="font14 text222 fontsemiBold">Min. Loan Amount</li>
            </ul>
        </div>
        <div className={styles.allLoanstable}>
        {compare.map((item, size) =>
        <>
        { size < 4 &&  
            <div className={styles.bankTable} key={size}>
                <ul>
                    <li>
                    <NavLink href={`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}/${loanType}/interest-rate`}>
                        <figure className="mb10"><Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + item.lenderLogo} width={100} height={25} alt={`${item.lenderName} ${item.planName} Interest Rate`}/></figure>
                        <p className="font10 fontsemiBold text3c4099 textCenter">{item.lenderName} {zero+first} Interest Rate</p>
                    </NavLink>
                    </li>
                    <li>
                        <p className="font14 fontsemiBold textBlack">{item && item.interestRateMetadata.text || "--"}</p>
                    </li>
                    <li>
                        <p className="font14 fontsemiBold textBlack">{item && item.processingFeeMetadata.text}</p>
                    </li>
                    <li>
                        <p className="font14  alingcenter fontsemiBold textBlack dlfex alingcenter"><svg className="marg5R" width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="m7 0 2.016 4.225 4.641.612-3.395 3.223.852 4.603L7 10.43l-4.114 2.233.852-4.603L.343 4.837l4.64-.612L7 0z" fill="#EFB82C"/>
</svg>{item && item.lenderRating}</p>
                    </li>
                    <li>
                        <p className="font14 fontsemiBold textBlack mb5">{item && item.loanAmountMetadata.text}</p>
                        <p className="font10 text505050 textBlack">{item && item.tenureMetadata.text}</p>
                    </li>
                    <li>
                        <button className="btn btn-primary font12 btn25 textCenterSm webbtn" onClick={() => enquireNowHandle(item.lenderSlug, item.planName)}>Enquire Now</button>
                    </li>

                </ul>
            </div>
}
            </>
            )}
        </div>
    </div>
</div>
</div>
        </>
    )
}