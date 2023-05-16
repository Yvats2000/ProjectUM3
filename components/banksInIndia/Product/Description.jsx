import styles from "./Description.module.css";
import { InterestRate,Loader, PopUp }  from "../../shared";
import Image from "next/image";
import {NavLink} from '../../ui';
import { EligibilityLeadForm } from "../../../components/calculator";
import { LeadFormBody } from "../../../components/shared/LeadPopup/LeadFormBody";
import React, { useState } from "react";
export const Description = ({data, productName, loanType, title, cmsData}) => {
  const [loader,setLoader] = useState(false);
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
  let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
  let description = cmsData && cmsData.length > 0 && cmsData.filter((value) => value.short_description && value.short_description != '')
    return (
      <>
      {loader ? <Loader /> : <React.Fragment />}
      {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
      <section className={`${styles.bankLoanDetail} container mt15`}>
        <div className={styles.logoandRatingBox}>
          <h1 className="font24 text2828 bottomborderf5a623 Innerheading fontMedium ">{data[0].plans[0].lenderName} {productName}</h1>
          <figure className={styles.displayNoneOnMobile}>
            {data ? <NavLink href={`${process.env.BASE_URL}/banks-in-india/${data[0].plans[0].lenderSlug}`}><Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + data[0].plans[0].lenderLogo} width={166} height={40} alt={data[0].plans[0].lenderName}/></NavLink> : <React.Fragment />}
          </figure>
          {data ? <span className={styles.ratingBox}>{data[0].plans[0].lenderRating} <em className={styles.ratingStar}></em> </span> : <React.Fragment />}
        </div>
        <div className={`${styles.bankText} mb20`}>
        <span dangerouslySetInnerHTML={{__html: description && description.length > 0  && description[0].short_description ? description[0].short_description : data && data[0].description}}></span>
        </div>
        {loanType === 'home-loan' || loanType === 'personal-loan' ?
        <div className="elegibiltyForm">
          <EligibilityLeadForm loanType={loanType} title={title} /> 
          </div>
        : <div className="homeLoanForm">
          <LeadFormBody setThankYouPopUp={() => setThankYouPopUp(true)} setLoader={setLoader} productName={loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())} loanPage={true} />   
          <figure className="formImg homeLoan">
          <img src="/assets/images/Call-center-rafiki.svg" alt="Urban Money" className="imgResponsive" />
          </figure>
        </div>}
        <InterestRate interestRates={data}/>
      </section>
      </>
    );
};