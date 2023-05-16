import React, { useState } from 'react';
import styles from './creditCardBanner.module.css';
import {useGlobalContext} from '../../../libs/context';
import Image from 'next/image';
import {LeadPopup, PopUp } from '../../../components/shared'
import { useRouter } from 'next/router';
export function CreditCardBanner() {
    const router = useRouter()
    const { isMobile } = useGlobalContext();
    const [openLeadPopup, setLeadPopup] = useState(false);
    const [openThankYouPopup,setThankYouPopUp] = useState(false);
    let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
    const enquireNowHandle = () => {
        setLeadPopup(true);
    }
    const product = router.route.split('/');
    const productName = product[1].split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    return(<>
        {openLeadPopup ? <LeadPopup productName={productName?productName:''} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
        {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
        <section className={styles.creditCardbanner}>
            <div className="container">
                <div className={styles.bannerWrap}>
                    <div className={styles.bannerText}>
                        <h1 className={`font36 mb40 text181b30 fontThin lineHeight62  mobfont32 ${styles.centerheading}  ${styles.mainTextHead}`}>INDIA&apos;S BEST <span className="fontsemiBold mobfont42 font48">CREDIT CARD </span> <span className={`${styles.fontgradient} mobfont42`}>Payment Easier</span></h1>
                        <p className="mb20 text2828 font16 lineHeight28 mobfont16 moblineheight24">Get faster approval for limitless and all-purpose Credit Cards that boasts alluring reward points, attractive interest rates, and lifetime access.</p>
                        {!isMobile && <button className="btn btn-primary webcta  font14" onClick={() => enquireNowHandle()}>Apply Now <em className="icon-arrow-right font14"></em></button>}
                    </div>
                    <div className={styles.bannerImg}>
                    <div>
                            <Image width={555} height={484} className="imgResponsive" src="/assets/images/Creditcardbannerimg.png" alt=""/>
                            <span className={`${styles.opentext} ${styles.tranfermoney} font14 fontsemiBold text181b30`}><Image width={51} height={51} src="/assets/images/transfermoney.svg" alt=""/>Dining  <br/> Discounts </span>
                            <span className={`${styles.opentext} ${styles.safetransfer} font14 fontsemiBold text181b30`}><Image width={51} height={51} src="/assets/images/saletranfer.svg" alt=""/>Lounge  <br/> Access </span>
                            <span className={`${styles.opentext}  ${styles.realpart} font14 fontsemiBold text181b30`}>Accelerated  <br/> Rewards  <Image width={51} height={51} src="/assets/images/Realparternship.svg" alt=""/></span>
                    </div>
                        {isMobile && <button className={`btn btn-primary  fontBold font14 ${styles.mobilecta}`}   onClick={() => enquireNowHandle()}>Apply Now <em className="icon-arrow-right font14"></em></button>}
                    </div>
                </div>
            </div>
            <figure className={styles.bannerback}>
                <Image width={1358} height={663} src="/assets/images/creditCardbannerbackground.png" alt=""/>
            </figure>
        </section>
        </>
    )
}