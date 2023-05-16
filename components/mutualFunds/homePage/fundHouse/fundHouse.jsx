import React from 'react';
import styles from './fundHouse.module.css';
import Image from "next/image";
import { NavLink } from '../../../ui';
import {useGlobalContext} from '../../../../libs/context';
export const FundHouse = ({amcList}) => {
    const { isMobile } = useGlobalContext();
  return (
    <section  className={styles.fundHouse}>
        <div className="container">
            <div className={styles.fundHouseWrap}>
                <div className={styles.textSection}>
                    <h2 className={`font24 textBlack lineHeight40 fontsemiBold bottomborderf5a623 Innerheading ${styles.mainHead} mb30`}>Mutual Fund Houses</h2>
                    <p className="font14 text2828 lineHeight26 mb50">The presence of various mutual fund houses in India seeds the availability of different schemes. It allows investors to choose the one that best fits with their investment goals.</p>
                    {isMobile?null:<NavLink className={`font14 textLink fontBold textCenter`} href={`${process.env.BASE_URL}/mutual-funds/amc`}>View All Fund Houses <Image className="imgResponsive" src="/assets/images/arrow-submit-copy.svg" alt="" srcSet="" width = {50} height = {10}/></NavLink>}
                    
            </div>
                <div className={styles.floatingTles}>
                    {amcList && amcList.data && amcList.data.length>0 &&  amcList.data.slice(0,6).map((item,index)=>{
                        return(
                        <div className={styles.float} key={index}>
                            <NavLink href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}`}><figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/logo/${item.amcLogo}`} alt="" width = {110} height = {40}/></figure></NavLink>
                        </div> 
                        )
                    })} 
                </div> 
            </div>
            {isMobile?<div className={styles.ctamobile}>
                <NavLink href={`${process.env.BASE_URL}/mutual-funds/amc`} className="font14 textLink fontBold textCenter  ">View All Fund Houses <Image className="imgResponsive" src="/assets/images/arrow-submit-copy.svg" alt="" srcSet="" width = {14} height = {10}/></NavLink>
            </div>:null}
            
        </div>
    </section>
  )
}
