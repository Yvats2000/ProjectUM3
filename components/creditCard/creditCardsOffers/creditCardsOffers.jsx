import React, { useEffect, useState } from 'react';
import styles from './creditCardsOffers.module.css';
import CreditOffer from "../../../data/creditCardOffers.json";
import { useGlobalContext } from '../../../libs/context';
import {LeadPopup, PopUp } from '../../../components/shared'
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Link } from '../../ui';
export function CreditCardsOffers() {
    const { isMobile } = useGlobalContext();
    const router = useRouter();
    const [active, setActive] =useState(0);
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
    const delay = 4500;
     useEffect(() => {
        setTimeout(
        () =>
        setActive((active) =>
            active === CreditOffer.length - 1 ? 0 : active + 1
            ),
        delay
        );
    }, [active]);
    return(
        <>
        {openLeadPopup ? <LeadPopup productName={productName?productName:''} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
        {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
        <section className={styles.popularCreditCards}>
            <figure className={styles.popularcreditblue}>
                <Image width={139} height={380} src="/assets/images/popularcreditblue.png" alt=""/>    
            </figure>
             <figure className={styles.yellowbackcardfeature}>
                <Image className={` imgResponsive`} width={616} height={616} src="/assets/images/latestcreditleft.png" alt=""/>
            </figure>
            <figure className={styles.bluebackcardfeature}>
                <Image className={`imgResponsive`} width={690} height={690} src="/assets/images/popularceditright.png" alt=""/>
            </figure>
            
            <div className="container">
                <p className="font28 textBlack fontsemiBold mb15 textCenter mobfont24 respmarg5">Popular Credit Cards Offers</p>
                <p className={`font14 text2828 lineHeight26 opt80 ${styles.centerheading} textCenter`}>Scout through some of the best hand-picked credit card offers.</p>
                <div className={styles.allCreditCards}>
                    {CreditOffer && CreditOffer.length>0 && CreditOffer.map((item,index)=>(
                        <div className={`${styles.bankCard} ${isMobile?active===index?styles.active:styles.inActive:styles.active}`} key={index}>
                            <div className={`${styles.ribbon} ${styles.red}`}>
                                <span className={styles.ribbonArrow}>
                                        <svg viewBox="0 0 22 32" width="14" height="21" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                                                <g id="09_Urban-Money-Copy-4" transform="translate(-476.000000, -1296.000000)" fill="currentColor" fillRule="nonzero">
                                                    <g id="paths" transform="translate(476.000000, 1296.000000)">
                                                    <path d="M1.11201212,16.8087361 L22,32 L22,32 L22,0 L1.11201212,15.1912639 C0.66535951,15.5161022 0.56660947,16.1415191 0.891447729,16.5881717 C0.952979393,16.6727777 1.02740608,16.7472044 1.11201212,16.8087361 Z" id="Path"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </svg>
                                </span>
                               {item.approval}
                            </div>
                            <figure>
                                <Image width={160} height={101} className="imgResponsive" src={item.creditCardImg} alt={item.bankName}/>
                            </figure>
                            <h2 className="mt15 font16 fontsemiBold lineHeight24 text1b1d1f" dangerouslySetInnerHTML={{__html: item.bankName}}></h2>
                            <p className="mt15 font14 lineHeight20 text666 mb15">{item.cardDetails}</p>
                            <span className={`mt18 font14 lineHeight26  text181b30 fontsemiBold`}>{item.annualFee}</span>
                            <div className={styles.cardDesc}>
                            <ul >
                                <li className="font13 lineHeight18 text666"><Image width={24} height={25} src="/assets/images/cashwithd.svg" alt="icon"/> {item.bonusPoint}</li>
                                <li className="font13 lineHeight18 text666"><Image width={25} height={25} src="/assets/images/justWelcome.svg" alt="icon"/> {item.memberShipReward}</li>
                                <li className="font13 lineHeight18 text666"><Image width={25} height={25} src="/assets/images/cashabckonemi.svg" alt="icon"/> {item.redeemPoint}</li>
                            </ul>
                            {/* <span className={`${styles.opnBox } textLink`} onClick={()=>setReadMore(!readMore)}>{readMore?'Read Less':'Read More'}<em class="icon-icon-angle-right arrowSm topmarg"></em></span> */}
                            </div>
                            <div className={styles.cardBtnBox}>
                                <Link href={item.exploreMoreLink} className={`btn font14 btn-default textCenterSm ${styles.noWrap}`}>
                                   {item.exploreMore} <em className="icon-arrow-right font14"></em>
                                </Link>
                                {/* {item.bankName ==='Standard Chartered Platinum Rewards<br/>Credit Card'?<Link  href='javascript:void(0)' onClick={() => enquireNowHandle()} className={`btn btn-primary font14  textCenterSm ${styles.noWrap}`}>
                                    {item.applyNow} <em className="icon-arrow-right font14"></em>
                                </Link>: */}
                                <Link  href={item.applyNowLink} className={`btn btn-primary font14  textCenterSm ${styles.noWrap}`}>
                                    {item.applyNow} <em className="icon-arrow-right font14"></em>
                                </Link> 
                                {/* } */}
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            {isMobile && <div className={styles.paginations}>
            {CreditOffer && CreditOffer.length > 0 && CreditOffer.map((item, index) => {
                return <span key={index} className={`${styles.StepNumber} ${active === index ? styles.active : ''}`} onClick={()=>setActive(index)}></span>
            })}
        </div>}
        </section>
        </>
    )
}