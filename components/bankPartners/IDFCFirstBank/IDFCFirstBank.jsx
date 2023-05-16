import { useState } from "react";
import styles from "./IDFCFirstBank.module.css";
import { CreditScore,BreadCrumb,InternalBlog } from "../../shared";
import { Link } from "../../ui";
export function IDFCFirstBank({breadCrumbLinks,blogsData}) {
   const [faqCurrent, setfaqCurrent] = useState(0);
   const FaqOpen =(value)=>{
      faqCurrent === value?setfaqCurrent(0):setfaqCurrent(value);
   }
   return (
      <>
         <section className={styles.banner}>
            <div className="container">
               <div className={styles.tpSection}>
                  <div className={styles.txtSection}>
                     <a href="https://www.idfcfirstbank.com/credit-card/ntb-diy/apply?utm_source=Partner&utm_medium=NTB_Urban_Money&utm_campaign=NTB_Urban_Money" className="idfc_credit_card">
                        <img className={`imgResponsive ${styles.bankLogo} mb10`} src="/assets/images/IDFC_First_Bank_logo 1@3x.png" alt="IDFC First Bank" />
                     </a>
                     <p className={`text181b30 font28 lineHeight40 ${styles.head} font100`}>Top reasons why our
                        <h1 className="font52 fontThin lineHeight62">Customers love this<br/><span>Credit Card</span></h1>
                     </p>
                     <div className={styles.offerTile}>
                        <div className={styles.indOffer}>
                           <figure><img className="imgResponsive" src="/assets/images/tax-free.svg" alt="IDFC First Bank" /></figure>
                           <div className={styles.offerTileText}>
                              <p className="font16  lineHeight26 text181b30 fontsemiBold">Super Saver Interest Rates</p>
                              <p className="font14  lineHeight22 text818181 ">from 0.75% - 3.5% p.m.</p>
                           </div>
                        </div>
                        <div className={styles.indOffer}>
                           <figure><img className="imgResponsive" src="/assets/images/premium-quality-2.svg" alt="IDFC First Bank" /></figure>
                           <div className={styles.offerTileText}>
                              <p className="font16  lineHeight26 text181b30 fontsemiBold">10x Rewards*</p>
                              <p className="font14  lineHeight22 text818181 ">On exceeding monthly spends threshold </p>
                           </div>
                        </div>
                     </div>
                     <a className={`btn btn-primary font14 btn25 textCenterSm ${styles.webbtn} idfc_credit_card`} href="https://www.idfcfirstbank.com/credit-card/ntb-diy/apply?utm_source=Partner&utm_medium=NTB_Urban_Money&utm_campaign=NTB_Urban_Money">Apply Now<em className="icon-arrow-right font14"></em></a>
                  </div>
                  <div className={styles.imgSection}>
                     <img className="imgResponsive" src="/assets/images/bannercard.png" alt="IDFC First Bank" />
                     <a className={`btn btn-primary font14 btn25 textCenterSm idfc_credit_card ${styles.mobilebtn}`} href="https://www.idfcfirstbank.com/credit-card/ntb-diy/apply?utm_source=Partner&utm_medium=NTB_Urban_Money&utm_campaign=NTB_Urban_Money">Apply Now<em className="icon-arrow-right font14"></em></a>
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
               <h2 className={`${styles.heading} textBlack fontsemiBold mb60`}>More reasons to love our Credit Card</h2>
               <div className={styles.offertiles}>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cashwithd.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Interest free cash withdrawal</p>
                  <p className="font14 text777">from ATM upto 48 days</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/accer.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">3X rewards</p>
                  <p className="font14 text777">for offline purchases and rental spends</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/accer.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Accelerated rewards</p>
                  <p className="font14 text777">6x for online purchases</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/norush.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">No rush to redeem</p>
                  <p className="font14 text777">Reward points that never expire</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/movieoffer.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Movie offer</p>
                  <p className="font14 text777">Discount offers between 25-50% on movie tickets every month</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/dinigoffer.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Dining offer</p>
                  <p className="font14 text777">Upto 20% across 1500 restaurants</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cardwelocme.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Welcome Offer</p>
                  <p className="font14 text777">Gift Voucher worth ₹500 on spending ₹15,000 in first 3 months</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cashabckonemi.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Cashback on EMI</p>
                  <p className="font14 text777">5% cashback (up to ₹1000) on the transaction value of first EMI done
                     within 90 days of card generation</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/cardwelocme.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">Get yourself insured</p>
                  <p className="font14 text777">Personal Accident cover upto ₹10,00,000 (min. 1 transaction last
                     month)</p>
               </div>
               <div className={styles.Indtile}>
                  <figure className="mb10"><img className="imgResponsive" src="/assets/images/moreoffer.svg" alt="IDFC First Bank" /></figure>
                  <p className="font16 lineHeight26 mb5 text181b30">More offers</p>
                  <p className="font14 lineHeight21  text777">50+ in-app discounts; complimentary lounge and golf access on premium
                     card variants</p>
               </div>
               </div>
               <a href="https://www.idfcfirstbank.com/credit-card/ntb-diy/apply?utm_source=Partner&utm_medium=NTB_Urban_Money&utm_campaign=NTB_Urban_Money" className="idfc_credit_card btn btn-primary font14 btn25 textCenterSm">Apply Now<em className="icon-arrow-right font14"></em></a>
               <div className={styles.imgBox}>
                  <img className="imgResponsive" src="/assets/images/milneumsmall.png" alt="IDFC First Bank" />
               </div>
            </div>
         </section>

         <CreditScore />
         <section className={styles.faq}>
            <div className={styles.faqContainer}>
               <div className={`${styles.heading} font24 textCenter`}>Frequently Asked Questions</div>
               <p className="font14 lineHeight24 text444 mb45 textCenter">From refinancing to reducing your interest, we have the answers right here.</p>
               <div className={styles.faqBx}>
                  <div className={`${styles.question} ${faqCurrent ==1?styles.active:null }`} onClick={()=>FaqOpen(1)}>
                     <div className={styles.faqQuestn}>
                        <div className={styles.txt}>Is there a Joining/Membership fee for IDFC FIRST Bank Credit Cards?</div>
                        <span className={`${styles.pluseIcon} ${faqCurrent === 1 ? styles.expendIcon : ''}`}></span>
                     </div>
                     <div className={styles.content}>
                        <p className=" textWhite">There is NO Joining or Membership fee applicable on any of IDFC FIRST Bank Credit Cards.</p>
                     </div>
                  </div>
                  <div className={`${styles.question} ${faqCurrent ==2?styles.active:null }`} onClick={()=>FaqOpen(2)}>
                     <div className={styles.faqQuestn}>
                        <div className={styles.txt}>What are the current offers available on IDFC FIRST Bank credit cards?</div>
                        <span className={`${styles.pluseIcon} ${faqCurrent === 2 ? styles.expendIcon : ''}`}></span>
                     </div>
                     <div className={styles.content}>
                        <p className=" textWhite mb35">IDFC FIRST Bank Bank Credit Cards are loaded with a host of benefits, offers & features.</p>
                        <p className=" textWhite mb35">Some of them are listed below and will be applicable as per card variant available with you:</p>
                        <p className=" textWhite mb35">Lifestyle benefits - Discounts on shopping, dining & movies, complimentary round of golf every month, etc.</p>
                        <p className=" textWhite mb35">Travel benefits - Complimentary airport lounge access.</p>
                        <p className=" textWhite">Other benefits - various in-app online discounts, discounts on health and wellness outlets, etc.</p>
                     </div>
                  </div>
                  <div className={`${styles.question} ${faqCurrent ==3?styles.active:null }`} onClick={()=>FaqOpen(3)}>
                     <div className={styles.faqQuestn}>
                        <div className={styles.txt}>Is there an expiry date on the reward points accrued on my card?</div>
                        <span className={`${styles.pluseIcon} ${faqCurrent === 3 ? styles.expendIcon : ''}`}></span>
                     </div>
                     <div className={styles.content}>
                        <p className="textWhite">There is NO expiry date to the reward points accrued on your IDFC FIRST Bank Credit Card</p>
                     </div>
                  </div>
                  <div className={`${styles.question} ${faqCurrent ==4?styles.active:null }`} onClick={()=>FaqOpen(4)}>
                     <div className={styles.faqQuestn}>
                        <div className={styles.txt}>How do I generate my credit card PIN?</div>
                        <span className={`${styles.pluseIcon} ${faqCurrent === 4 ? styles.expendIcon : ''}`}></span>
                     </div>
                     <div className={styles.content}>
                        <p className="font14 text666 mb15 fontBold">Net Banking</p>

                        <p className="font14 text666  fontsemiBold">Pre-login</p>

                        <p className="text666 lineHeight20 mb15">Click on the “Generate Credit Card PIN” on the pre-login page [https://my.idfcfirstbank.com/login]
                        Enter “Customer ID” & “Credit Card number” and click on Get OTP
                        Verify using the OTP sent on your registered mobile number
                        Enter and Re-enter PIN of your choice and click on confirm
                        Your Credit Card PIN is set</p>
                        <p className="font14 text666 mb15 fontBold fontsemiBold">Login</p>

                        <p className="text666 lineHeight20 mb15">
                           Login to your Net Banking account
                           Select Credit Card section
                           Select Set new PIN
                           Enter and Re-enter PIN of your choice and click on Get OTP
                           Please verify through the OTP sent to your registered mobile number
                           Your Credit Card PIN is set
                           Mobile Banking App
                        </p>
                        <p className="font14 text666 mb15 fontBold fontsemiBold">Pre-login</p>

                        <p className="text666 lineHeight20 mb15">Select browse icon from the right side top menu on login page
                        Enter “Customer ID” & “Credit Card number” and click on Get OTP
                        Please verify through the OTP sent to your registered mobile number
                        Enter and Re-enter PIN of your choice and click on confirm
                        Your Credit Card PIN is set</p>
                        <p className="font14 text666 mb15 fontBold fontsemiBold">Login:</p>

                        <p className="  text666 lineHeight20 mb15">Login to Mobile Banking App
                        Access Credit Card section
                        Select Set new PIN
                        Enter and Re-enter PIN of your choice and click on Get OTP
                        Your Credit Card PIN is set</p>
                        <p className="font14 text666 mb15 fontBold fontsemiBold">Customer Care:</p>

                        <p className="">Dial our Customer Care and follow the instructions to generate the PIN</p>
                        <p className="">
                        There is NO expiry date to the reward points accrued on your IDFC FIRST Bank Credit Card
                        </p>
                     </div>
                  </div>
                  <div className={`${styles.question} ${faqCurrent ==5?styles.active:null }`} onClick={()=>FaqOpen(5)}>
                     <div className={styles.faqQuestn}>
                        <div className={styles.txt}>Will I be asked for my Credit Card PIN at every POS terminal, be it domestic or international?</div>
                        <span className={`${styles.pluseIcon} ${faqCurrent === 5 ? styles.expendIcon : ''}`}></span>
                     </div>
                     <div className={styles.content}>
                        <p className="">For all transactions in India, yes, you will be asked for a PIN for completing the transactions. However, outside India, you will be asked for the PIN only if the POS terminal is enabled for PIN authentication.</p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         {/* <section className={styles.disclamer}>
            <p className="font12 text444 textCenter">© {year} www.urbanmoney.com. All rights reserved.</p>
         </section> */}
         <InternalBlog loanType={'Credit Card'} data={blogsData} />
      </>
  );
}
