import React from 'react'
import styles from './MyCreditCards.module.css'
import Image from 'next/image'
import { Link } from '../../ui';
import { ProfileTemplate } from '../profileTemplete';
import moment from 'moment';
export const MyCreditCards = ({userCardList}) => {
  return (
    <ProfileTemplate userCardList={userCardList}>
        <div className={styles.applicationStatus}>
            {/* <p className={`font24 mb40 textBlack fontsemiBold centerheading  ${styles.centerheading} mobfont18`}>Your Application Status</p> */}
            <p className={`font22 text454ec2 fontMedium mb20`}>Your Credit Card Applications</p>
            {/* <p className="font16 mb20 text444 mobfont16 moblineheight24 lineHeight28 ">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe fugit iure optio eum laborum nobis adipisci. Dolorem amet nesciunt nulla.</p> */}
                <div className={styles.cardsStatus}>
                    {userCardList && userCardList.length > 0  && userCardList.map((item,index)=>(
                        <div className={`${styles.bankCard} ${styles.sccardtile}`} key={index}>
                            <figure className={styles.cardimg}>
                                <Image className="imgResponsive" width={98} height={62} src={'https://www.urbanmoney.com/_next/image?url=%2Fassets%2Fimages%2Fstandarchartedtcard.webp&w=256&q=75'} alt="IDFC_Card"/>
                            </figure>
                            <figure className={styles.bankLogoabs}>
                                <Image className="imgResponsive" width={70} height={25} src={item.logo} alt="" srcset=""/>
                            </figure>
                            <h2 className={`mt15 font16 fontsemiBold lineHeight22 ${styles.centerheading} ${styles.cardbtmhead} ${styles.scbtmgrad}  text181b30`}>{item.ccName} </h2>
                            <p className="font14 lineHeight24 mb10 text777">Applied Date: <span className="text444">{moment(item.createdAt).format('MMM DD, YYYY')}</span></p>
                            {item.status === "In Progress"?
                                <>
                                    <button className={`btn btn-primary mb30 font12 fontsemiBold ${styles.pending}  textCenterSm noWrap`}>{item.status}</button>
                                        <div className={`${styles.applicationProgress} mb15`}>
                                            <ul>
                                                <li className={styles.steps}>
                                                    <figure className={styles.progressicon}> 
                                                        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.094 4.779a.547.547 0 0 1 0 .773l-3.668 3.67a.547.547 0 0 1-.774 0L3.906 7.474a.547.547 0 1 1 .773-.774l1.36 1.36L9.32 4.78a.547.547 0 0 1 .773 0zM14 7c0 3.87-3.131 7-7 7-3.87 0-7-3.131-7-7 0-3.87 3.131-7 7-7 3.87 0 7 3.131 7 7zm-1.094 0A5.903 5.903 0 0 0 7 1.094 5.903 5.903 0 0 0 1.094 7 5.903 5.903 0 0 0 7 12.906 5.903 5.903 0 0 0 12.906 7z" fill="#BEBEBE" fillRule="evenodd"></path>
                                                        </svg>
                                                    </figure>
                                                    <div className={styles.applicationtxt}>
                                                        
                                                        <span className={`${styles.applicationStatus} font12 mb10`}>Complete your application</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <Link href={(`${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form?token=${item.accessToken}`)} className="btn btn-primary font14 displayInlineBlock  fontsemiBold textCenterSm noWrap">
                                            Continue
                                        </Link>    
                                </>     
                                :
                                    <div className={`${styles.applicationProgress} mb15`}>
                                            <ul>
                                                <li className={`${styles.steps} ${styles.active}`}>
                                                    <figure className={styles.progressicon}> 
                                                        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.094 4.779a.547.547 0 0 1 0 .773l-3.668 3.67a.547.547 0 0 1-.774 0L3.906 7.474a.547.547 0 1 1 .773-.774l1.36 1.36L9.32 4.78a.547.547 0 0 1 .773 0zM14 7c0 3.87-3.131 7-7 7-3.87 0-7-3.131-7-7 0-3.87 3.131-7 7-7 3.87 0 7 3.131 7 7zm-1.094 0A5.903 5.903 0 0 0 7 1.094 5.903 5.903 0 0 0 1.094 7 5.903 5.903 0 0 0 7 12.906 5.903 5.903 0 0 0 12.906 7z" fill="#BEBEBE" fillRule="evenodd"></path>
                                                        </svg>
                                                        
                                                    </figure>
                                                    <div className={styles.applicationtxt}>
                                                        <span className={`${styles.applicationStatus} font12 mb10`}>Application Recieved </span>
                                                        <p className="font13  lineHeight18 opt80 text444">Bank will contact you for further application process</p>
                                                    </div>
                                                </li>
                                                <li className={styles.steps}>
                                                    <figure className={styles.progressicon}> 
                                                        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.094 4.779a.547.547 0 0 1 0 .773l-3.668 3.67a.547.547 0 0 1-.774 0L3.906 7.474a.547.547 0 1 1 .773-.774l1.36 1.36L9.32 4.78a.547.547 0 0 1 .773 0zM14 7c0 3.87-3.131 7-7 7-3.87 0-7-3.131-7-7 0-3.87 3.131-7 7-7 3.87 0 7 3.131 7 7zm-1.094 0A5.903 5.903 0 0 0 7 1.094 5.903 5.903 0 0 0 1.094 7 5.903 5.903 0 0 0 7 12.906 5.903 5.903 0 0 0 12.906 7z" fill="#BEBEBE" fillRule="evenodd"></path>
                                                        </svg>
                                                        
                                                    </figure>
                                                    <div className={styles.applicationtxt}>
                                                        <span className={`${styles.applicationStatus} font12 mb10`}>Application Under Process</span>
                                                    </div>
                                                </li>
                                                <li className={styles.steps}>
                                                    <figure className={styles.progressicon}> 
                                                        <svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M10.094 4.779a.547.547 0 0 1 0 .773l-3.668 3.67a.547.547 0 0 1-.774 0L3.906 7.474a.547.547 0 1 1 .773-.774l1.36 1.36L9.32 4.78a.547.547 0 0 1 .773 0zM14 7c0 3.87-3.131 7-7 7-3.87 0-7-3.131-7-7 0-3.87 3.131-7 7-7 3.87 0 7 3.131 7 7zm-1.094 0A5.903 5.903 0 0 0 7 1.094 5.903 5.903 0 0 0 1.094 7 5.903 5.903 0 0 0 7 12.906 5.903 5.903 0 0 0 12.906 7z" fill="#BEBEBE" fillRule="evenodd"></path>
                                                        </svg>
                                                    </figure>
                                                    <div className={styles.applicationtxt}>
                                                        <span className={`${styles.applicationStatus} font12 mb10`}>Card Approval</span>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>                       
                        }
                            
                        </div>
                    ))}
                    
                </div>
        </div>
    </ProfileTemplate>
    
  )
}
