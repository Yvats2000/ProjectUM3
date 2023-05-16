import { useState } from "react";
import styles from "./YesBank.module.css";
import { CreditScore,BreadCrumb } from "../../shared";
import { Link } from "../../ui";
import { FAQ,InternalBlog } from "../../shared";
import faqData from '../../../data/yesBankFaq.json'
export function YesBank({breadCrumbLinks,blogsData}) {
   return (
      <>
         <section className={styles.banner}>
            <div className="container">
               <div className={styles.tpSection}>
                  <div className={styles.txtSection}>
                     <a href="https://applycc.yesbank.in/YESBankCreditCard?uid=ab047" className="idfc_credit_card">
                        <img className={`imgResponsive ${styles.bankLogo} mb10`} src="/assets/images/yesBank.jpg" alt="Yes Bank" />
                     </a>
                     <p className={`text181b30 font28 lineHeight40 ${styles.head} font100`}>Get a rewarding experience with lifestyle benefits
                        <h1 className="font52 fontThin lineHeight62">Welcome rewards<br/><span>Yes Bank Credit Card</span></h1>
                     </p>
                     <div className={styles.offerTile}>
                        <div className={styles.indOffer}>
                           <figure><img className="imgResponsive" src="/assets/images/tax-free.svg" alt="Yes Bank" /></figure>
                           <div className={styles.offerTileText}>
                              <p className="font16  lineHeight26 text181b30 fontsemiBold">Super Saver Interest Rates</p>
                              <p className="font14  lineHeight22 text818181 ">from 0.75% - 3.5% p.m.</p>
                           </div>
                        </div>
                        <div className={styles.indOffer}>
                           <figure><img className="imgResponsive" src="/assets/images/premium-quality-2.svg" alt="Yes Bank" /></figure>
                           <div className={styles.offerTileText}>
                              <p className="font16  lineHeight26 text181b30 fontsemiBold">10x Rewards*</p>
                              <p className="font14  lineHeight22 text818181 ">On exceeding monthly spends threshold </p>
                           </div>
                        </div>
                     </div>
                     <a className={`btn btn-primary font14 btn25 textCenterSm ${styles.webbtn} idfc_credit_card`} href="https://applycc.yesbank.in/YESBankCreditCard?uid=ab047">Apply Now<em className="icon-arrow-right font14"></em></a>
                  </div>
                  <div className={styles.imgSection}>
                     <img className="imgResponsive" src="/assets/images/Yesbannercard.png" alt="Yes Bank" />
                     <a className={`btn btn-primary font14 btn25 textCenterSm idfc_credit_card ${styles.mobilebtn}`} href="https://applycc.yesbank.in/YESBankCreditCard?uid=ab047">Apply Now<em className="icon-arrow-right font14"></em></a>
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
               <h2 className={`${styles.heading} textBlack fontsemiBold mb60`}>More reasons to love our Yes Bank Credit Card</h2>
               <div className={styles.offertiles}>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cashwithd.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Competitive Interest Rates</p>
                  <p className="font14 text777">YES Bank Credit Card comes with attractive and competitive interest rates which starts at 3.60% on a revolving credit balance.</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/accer.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Reward Points</p>
                  <p className="font14 text777">Grab lifetime reward points redeemable across various categories along with the provision to share them with friends and family. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/norush.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">No rush to redeem</p>
                  <p className="font14 text777">With more secure and stable fund clearance, there is no rush to redeem your reward points. Enjoy lifetime access to rewards and benefits. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/movieoffer.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Movie offer</p>
                  <p className="font14 text777">Procure your ticket to premium access with the YES Bank credit card with provisions including buy-one-get-one-free offers and special discounts. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/dinigoffer.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Dining offer</p>
                  <p className="font14 text777">Make your dining experience convenient with specialised discounts on selective restaurant partners with the YES Bank credit card payment. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cardwelocme.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Welcome Offer</p>
                  <p className="font14 text777">On signing up for a YES Bank credit card and get free gift vouchers worth INR 1500 on your first transaction. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cashabckonemi.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Convert Purchases into EMIs</p>
                  <p className="font14 text777">Enjoy the advantage of making your purchases into simplified chunks of EMIs with flexible repayment tenure options. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cardwelocme.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Get yourself insured</p>
                  <p className="font14 text777">Use the YES Bank credit cards to avail yourself of the benefits of an array of insurance policies.</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/moreoffer.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">More offers</p>
                  <p className="font14 lineHeight21  text777">Provision to earn accelerated reward points on transactions at hotels and restaurants. Additionally, make travel fun with rewarding schemes on purchases on the go. </p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/moreoffer.svg" alt="Yes Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Lifestyle Benefits</p>
                  <p className="font14 lineHeight21  text777">Fantastic opportunity to get rewarding benefits with complimentary domestic and international lounge access, golf lessons, and fuel purchase discounts.</p>
               </div>
               </div>
               <a href="https://applycc.yesbank.in/YESBankCreditCard?uid=ab047" className="idfc_credit_card btn btn-primary font14 btn25 textCenterSm">Apply Now<em className="icon-arrow-right font14"></em></a>
               <div className={styles.imgBox}>
                  <img className="imgResponsive" src="/assets/images/yesbankCard.webp" alt="Yes Bank" />
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
