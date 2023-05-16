import styles from "./BankInterestRate.module.css";
import {Link} from '../../ui';
import { getItemFromCookie } from "../../../helpers/cookie";
import React,{ useState } from "react";
import Image from "next/image";
import { RightSideBar,LeadPopup, PopUp } from '../../shared'
import { Button } from "../../ui/button";
export const BankInterestRate = ({data,productName,loanLink}) => {
    const [openLeadPopup, setLeadPopup] = useState(false);
    const [openThankYouPopup,setThankYouPopUp] = useState(false);
    let thankyouTitle = "Interest submitted";
        let thankyou = "Thank You!";
        let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
    const enquireNowHandle = () => {
        setLeadPopup(true);
    }
  return (
    <>
    {openLeadPopup ? <LeadPopup productName={productName?productName:''} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
    {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
    <div className={styles.bankTile}>
        <div className={styles.bankHead}>
            <div className={styles.bankInfo}>
                <figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/bankIcons/' + data.lenderLogo} width={46} height={46} alt={`${data.lenderName} ${data.planName} Interest Rate`}/></figure>
                <div className={styles.banknameRate}>
                    <Link href={process.env.BASE_URL+'/banks-in-india/'+data.lenderSlug+'/'+loanLink+'/interest-rate'} className="font12 text231f20 mb5" title={`${data.lenderName} ${data.planName} Interest Rate`}>{data.lenderName}</Link>
                    <p className="font12 textBlack dlfex alingstart "><span className='marg5R'><Image width={14} height={13}  src="/assets/images/Star8.svg" alt=""/></span>{data.lenderRating}</p>
                </div>
            </div>
            <Button className={styles.enquireNow} onClick={() => enquireNowHandle()}>Enquire</Button>                                    
        </div>
        <div className={styles.bankRatesInfo}>
            <ul>
                <li>
                    <p className="text474dbb font12 mb5">Starting Interest Rate (p.a.)</p>
                    <p className="text474dbb font20  fontBold">{data.interestRateMetadata.min}%</p>
                </li>
                <li>
                    <p className="font12 text666 mb5">Processing Fee</p>
                    <p className="text505050 font12 fontSm14 fontsemiBold">{data.processingFeeMetadata.text}</p>
                </li>
                <li>
                    <p className="font12  text666 mb5">Maximum Loan Amount</p>
                    <p className="text505050 font20 fontBold">{data.loanAmountMetadata.text}</p>
                </li>
                <li>
                    <p className="font12 text666 mb5">Tenure</p>
                    <p className="text505050 font12 fontSm14 fontsemiBold">{data.tenureMetadata.text}</p>
                </li>
            </ul>
        </div>
    </div>
    </>
  );
};
