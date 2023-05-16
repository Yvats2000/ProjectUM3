import React,{ useState } from "react";
import styles from "./StandardChartered.module.css";
import { CreditScore,BreadCrumb } from "../../shared";
import { Link,NavLink } from "../../ui";
import { FAQ,LeadPopup, PopUp,InternalBlog  } from "../../shared";
import faqData from '../../../data/standardCharteredFaq.json'
export function StandardChartered({breadCrumbLinks,blogsData}) {
   const [active, setActive] =useState(0);
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
         {openLeadPopup ? <LeadPopup productName={'Credit Card'} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
        {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
         <section className={styles.banner}>
            <div className="container">
               <div className={styles.tpSection}>
                  <div className={styles.txtSection}>
                     {/* <NavLink href={`${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form`} className="idfc_credit_card"> */}
                        <img className={`imgResponsive ${styles.bankLogo} mb10`} src="/assets/images/StandardChartered.png" alt="Standard Chartered" />
                     {/* </NavLink> */}
                     <p className={`text181b30 font28 lineHeight40 ${styles.head} font100`}>Attractive discounts on hotel and flight bookings
                        <h1 className="font52 fontThin lineHeight62">Attractive welcome rewards on sign up<br/><span>Standard Chartered Credit Card</span></h1>
                     </p>
                     <div className={styles.offerTile}>
                        <div className={styles.indOffer}>
                           <figure><img className="imgResponsive" src="/assets/images/tax-free.svg" alt="Standard Chartered" /></figure>
                           <div className={styles.offerTileText}>
                              <p className="font16  lineHeight26 text181b30 fontsemiBold">Super Saver Interest Rates</p>
                              <p className="font14  lineHeight22 text818181 ">from 0.75% - 3.5% p.m.</p>
                           </div>
                        </div>
                        <div className={styles.indOffer}>
                           <figure><img className="imgResponsive" src="/assets/images/premium-quality-2.svg" alt="Standard Chartered" /></figure>
                           <div className={styles.offerTileText}>
                              <p className="font16  lineHeight26 text181b30 fontsemiBold">10x Rewards*</p>
                              <p className="font14  lineHeight22 text818181 ">On exceeding monthly spends threshold </p>
                           </div>
                        </div>
                     </div>
                     <NavLink href={`${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form`} className={`btn btn-primary font14 btn25 textCenterSm ${styles.webbtn} idfc_credit_card`} >Apply Now<em className="icon-arrow-right font14"></em></NavLink>
                  </div>
                  <div className={styles.imgSection}>
                     <img className="imgResponsive" src="/assets/images/standardBanner.png" alt="Standard Chartered" />
                     <NavLink href={`${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form`} className={`btn btn-primary font14 btn25 textCenterSm idfc_credit_card ${styles.mobilebtn}`}>Apply Now<em className="icon-arrow-right font14"></em></NavLink>
                  </div>
               </div>
            </div>
         </section>
         <div className="container">
            <BreadCrumb links={breadCrumbLinks} />
         </div>
         <section className={styles.benefits}>
            <div className="container">
               <p className="font14 mb12 lineHeight20 text2828">BENEFITS & PRIVILEGES</p>
               <h2 className={`${styles.heading} textBlack fontsemiBold mb60`}>More reasons to love our Standard Chartered Credit Card</h2>
               <div className={styles.offertiles}>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cashwithd.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Competitive Interest Rates</p>
                  <p className="font14 text777">One of the best features of Standard Chartered Credit Card is the absence of joining fees and attractive interest rates. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cashabckonemi.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Convert Purchases into EMIs</p>
                  <p className="font14 text777">No more large payments. Make purchases easy by breaking them into smaller EMI chunks with Standard Chartered Credit Card.</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/accer.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">360 Rewards</p>
                  <p className="font14 text777">A lucrative program where customers can redeem their reward points against any particulars from the latest online catalogue.</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/moreoffer.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Digital Payment Solution</p>
                  <p className="font14 lineHeight21  text777">No need to look around to make payments. Standard Chartered Credit Cards incorporate a wide range of digital payment gateways with instant clearance.</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/moreoffer.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">No Physical Interaction Required</p>
                  <p className="font14 lineHeight21  text777">Enjoy hassle-free credit card approval with online video call KYC, all from the comfort of your home.  </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/moreoffer.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Online Banking</p>
                  <p className="font14 lineHeight21  text777">Now faster and more convenient methods of online banking assist credit card users for an array of purposes, including balance checks, online transfers, etc. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cardwelocme.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Contactless Credit Cards</p>
                  <p className="font14 text777">Don’t miss out on the opportunity to use contactless credit cards, which take you to a new level of convenience with a more secure payment feature.  </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/dinigoffer.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Secure Online Transactions</p>
                  <p className="font14 text777">No more worrying about payment security as Standard Chartered Credit Card incorporate a 3D secure OTP verification system for transactions. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cardwelocme.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Balance Transfer</p>
                  <p className="font14 text777">Enjoy the hassle-free and lucrative option of a balance transfer facility of up to INR 5 Lakhs with attractive interest rate options.</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/movieoffer.svg" alt="Standard Chartered" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">The Good Life Programme</p>
                  <p className="font14 text777">Grab an array of specialised discounts with the Good Life Programme across various dining, shopping, and travel transactions.</p>
               </div>
               </div>
               <NavLink href={`${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form`} className="idfc_credit_card btn btn-primary font14 btn25 textCenterSm">Apply Now<em className="icon-arrow-right font14"></em></NavLink>
               <div className={styles.imgBox}>
                  <img className="imgResponsive" src="/assets/images/standard_bottom.webp" alt="Standard Chartered" />
               </div>
            </div>
         </section>

         <CreditScore />
         <section className="faq">
            <div className="container">
                <h2 className="faqHeading textCenter font24">Frequently Asked Questions</h2>
                <p className="font14 lineHeight24 textCenter text444 mb45 faqP">From refinancing to reducing your interest, we have the answers right here.</p>
                <div className="faqBx">
                    <FAQ data={faqData}/>
                </div>
            </div>
        </section>
        <InternalBlog loanType={'Credit Card'} data={blogsData} />
      </>
  );
}
