
import React, { useState } from 'react'
import Image from "next/image";
import { NavLink } from "../ui";
import carouselData from "./../../data/carouselData.json"
import styles from './carousel.module.css'
import {useGlobalContext} from '../../libs/context';
export const Carousel = () => {
    const { isMobile } = useGlobalContext();
    const [active, setActive] =useState(0);
    const delay = 6500;
    React.useEffect(() => {
        const onPageLoad = () => {
            setTimeout(
            () =>
            setActive((prevIndex) =>
                prevIndex === carouselData.length - 1 ? 0 : prevIndex + 1
                ),
            delay
            );
        };
        if (document.readyState === 'complete') {
          onPageLoad();
        } else {
          window.addEventListener('load', onPageLoad);
          return () => window.removeEventListener('load', onPageLoad);
        }
    }, [active]);

  return (
    <>
    <section className={styles.homeBanner}>
        {!isMobile && <img className={`${styles.homebannerbackground} imgResponsive`}  src="/assets/images/bg-herobanner.png" alt="Urban Money Hero Banner" />}
        <div className={styles.firstBanner}>
            <div className="container">
            {carouselData && carouselData.length > 0 && carouselData.map((item, index) => (
                    <div className={`${styles.banner} ${active === index?styles.active:null}`} key={index}>
                        <div className={styles.textSection}>
                            <p className={`font100 ${styles.titleHead}`}>
                            <span dangerouslySetInnerHTML={{__html:item.title}}></span>
                            </p>
                            <p className={` text181b30 font100 mobfont28 ${styles.mainHead}`}>
                                <span dangerouslySetInnerHTML={{__html:item.heading}}></span>
                            </p>
                            <p className={` font16 lineHeight28 opt80 mb30 text2828`} key={index}>
                            {item.point.map((itemChild,index)=>(
                                <span key={index}>{itemChild}<br/></span>
                            ))}
                            </p>
                            {!isMobile && <NavLink className="btn btn-primary font14 btn25 textCenterSm btnFull" href={item.ctaLink}>{item.cta} <em className="icon-arrow-right font14"></em></NavLink>}
                        </div>
                        <div className={styles.ImgSection}>
                            <figure>
                                <img src={isMobile?item.mobImg:item.img} alt={`Urban Money ${item.slide}`} />
                                {/* <Image className={`imgResponsive`} src={isMobile?item.mobImg:item.img} width = {isMobile ? 268 : 450} height = {isMobile ? 240 : 350} alt={`Urban Money ${item.slide}`} /> */}
                            </figure>
                            {isMobile && <NavLink className={`btn btn-primary font14 btn25 textCenterSm btnFull ${styles.mobilecta}`} href={item.ctaLink}>{item.cta} <em className="icon-arrow-right font14"></em></NavLink>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <div className={styles.paginations}>
            {carouselData && carouselData.length > 0 && carouselData.map((item, index) => {
                return <span key={index} className={`${styles.StepNumber} ${active === index ? styles.active : ''}`} onClick={()=>setActive(index)}></span>
            })}
        </div>

    </section>
        
    </>
    
  )
}
