import styles from "./Description.module.css";
import { Button } from "../../ui/button";
import { InterestRate, Loader, PopUp }  from "../../shared";
import { useRouter } from 'next/router';
import { EligibilityLeadForm } from "../../calculator";
import { LeadFormBody } from "../../shared/LeadPopup/LeadFormBody";
import React, { useState } from "react";
export const Description = ({data, loanType, title}) => {
  const router = useRouter();
  const [loader,setLoader] = useState(false);
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
  let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  if (!data || data.length == 0)
        return null;
    return (
    <>
    {loader ? <Loader /> : <React.Fragment />}
    {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
    <section className={styles.loanDetails}>
      <div className="container">
        <h1 className="font24 mb30 text2828  Innerheading fontMedium lineHeight36 ">{data && data[0].productName}</h1>
        <p className="font14  text444 mb30 lineHeight24" dangerouslySetInnerHTML={{__html: data && data[0].description}}></p>
        {/* <section className="elegibiltyForm">
        <div className='container'>   */}
        {
          loanType === 'home-loan' || loanType === 'personal-loan' ?
          <EligibilityLeadForm loanType={loanType} title={title} /> :
          <div className="homeLoanForm">
            <LeadFormBody setThankYouPopUp={() => setThankYouPopUp(true)} setLoader={setLoader} productName={loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())} loanPage={true} />   
            <figure className="formImg homeLoan">
              <img src="/assets/images/Call-center-rafiki.svg" alt="Urban Money" className="imgResponsive" />
            </figure>
          </div>
        }
        {/* </div>
        </section> */}
        <h2 className="font24 w100 mb40 text2828 grid4Span Innerheading fontMedium lineHeight36 ">Best {loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())} Interest Rates Available from India&apos;s Top Banks</h2>
        <div className={styles.bankDetailBox}>
          <div className={styles.bankDetails}>
            <InterestRate interestRates={data} detailShow={false}/>
          </div>
        </div>
        <h2 className="font24 mb30 text2828  fontMedium lineHeight36 ">Compare {data && data[0].productName}</h2>
        <p className="font14 text444 lineHeight24 mb20" dangerouslySetInnerHTML={{__html: data && data[0].shortDescription}}></p>
        {data[0].productSlug === 'home-loan' || data[0].productSlug === 'personal-loan' ? <Button className="btn btn-primary font14 btnMd textCenterSm" onClick={(e) => handleClick(e, "/loans/"+data[0].productSlug+"/eligibility-calculator")}>Check Your {data && data[0].productName} Eligibility <em className="icon-arrow-right font14"></em></Button> : null}
      </div>
    </section>
    </>
  );
};