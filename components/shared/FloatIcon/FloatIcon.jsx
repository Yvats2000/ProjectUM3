import Image from 'next/image'
import React, { useState } from 'react';
import styles from './FloatIcon.module.css';
import {LeadPopup, PopUp} from "../../shared";
import { useRouter } from 'next/router';
export const FloatIcon = () => {
  const router = useRouter();
  const [showTitle, setShowTitle] = useState(true);
  const [openLeadPopup, setLeadPopup] = useState(false);
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
  let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
  const enquireNowHandle = () => {
    setLeadPopup(true);
  }
  return (
    router.pathname != '/credit-card/standard-chartered/online-application-form' ?
    <>
    {openLeadPopup ? <LeadPopup productName={''} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
    {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
    <div className={styles.FloatIcon}>
        <div className={styles.Icon} onClick={() => enquireNowHandle()}>
          <Image src="/assets/images/FloatIcon.svg" width={28} height={25} alt="Urban Money Float Icon"/>
        </div>
        {showTitle?
        <div className={styles.title}>
            <div className={styles.closeIcon} onClick={()=>setShowTitle(false)}></div>
            <p className='fontBold font12 mb10'>Need Loan Assistance?</p>
            <button className={`btn ${styles.connectNow}`} onClick={() => enquireNowHandle()}>Connect Now <em className='icon-arrow-right font12'></em> </button>
        </div>
        :null}
    </div>
    </>
    :null
  )
}
