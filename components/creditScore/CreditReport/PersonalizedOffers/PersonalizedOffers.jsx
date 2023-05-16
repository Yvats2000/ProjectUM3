import styles from "./PersonalizedOffers.module.css"
import { IDFCAD } from "../../../bankPartners/Ad/"
export const PersonalizedOffers = () => {
  return (
      <>
        <section className={styles.PersonalizedOffers}>
              <h2 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36">Personalized Offers</h2>
              <div className={styles.bankCards}>
                <IDFCAD />
                  {/* <div className={`${styles.indBankCard} ${styles.sbi}`}>
                        <div className={`${styles.ribbon} ${styles.red}`}>
                            <span className={styles.ribbonArrow}>
                            
                            </span>
                            100% paperless Approval
                        </div>
                        <div className={styles.rigtside}>
                            <figure className="mb30">
                            <img src="/assets/images/sbi.png" alt="" />
                            </figure>
                            <p className="font18 fontBold text181b30 lineHeight26">
                            SPECIAL OFFER
                            </p>
                            <p className={`textb00202 lineHeight51 fontBold ${styles.loans}`}>
                            HOME
                            </p>
                            <p className={`${styles.loans} textb00202 lineHeight51 fontBold mb30 loans`}>
                            LOAN
                            </p>
                            <p className={`${styles.fontA} fontBold text2828`}>
                            7.85 <span className="font22">% p.a</span>
                            </p>
                            <p className="font16 fontsemiBold textc10000 mb20 textUC">Interest Rate</p>
                            <p className="fontsemiBold font16 text2828 mb25">
                            No Proccesing free
                            </p>
                            <button className="btn btnOutline font14 fontMedium btnsmall textLink" >
                            Apply Now <em className="icon-arrow-right"></em>
                            </button>
                        </div>
                        <figure className={styles.postionrigt}>
                            <img
                            src="/assets/images/sbiabsolute.png"
                            className="imgResponsive"
                            alt=""
                            />
                        </figure>
                  </div>
                  <div className={`${styles.indBankCard} ${styles.hdfc}`}>
                    <div className={`${styles.ribbon} ${styles.blue}`}>
                        <span className={styles.ribbonArrow}>
                        </span>
                        Instant Sanction
                    </div>
                    <figure className="mb30">
                        <img src="/assets/images/hdfc.png" alt="" />
                    </figure>
                    <p className={`lineHeight45 fontBold text000000d9 ${styles.loans}`}>
                        Home Loan
                    </p>
                    <p className={`mb20 lineHeight45 fontBold text000000d9 ${styles.loans}`}>
                        Approval
                    </p>
                    <div className={`${styles.priceRate} mb30`}>
                        <div className={styles.price}>
                        <p className="font14 text666">Get upto</p>
                        <p className={`${styles.fontA} text32356b fontBold`}>₹ 45 Lakh</p>
                        </div>
                        <div className={styles.rate}>
                        <p className={`${styles.fontA} textLink fontBold mb5`}>8.7%</p>
                        <p className="font14 text666">Lowest</p>
                        <p className="font16 fontsemiBold text2828">Interest Rate</p>
                        </div>
                    </div>
                    <p className="font16 fontBold text444 mb40">
                        1000<span className="font14">+GST</span> 
                        <span className="font16 text666 opt80 fontMedium"> Proccesing free</span>
                    </p>
                    <div className={styles.lstsection}>
                        <button className={`btn btn-primary font14 textCenterSm ${styles.btnsmall}`}>
                        Apply Now <em className="icon-arrow-right font14"></em>
                        </button>
                        <p className="font14 text908f8f">*T&C Apply</p>
                    </div>
                    </div> */}
              </div>
          </section>
          
      </>
  )
}
