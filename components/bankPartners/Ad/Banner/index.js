import styles from './index.module.css'
import { Link, NavLink } from "../../../ui";
import Image from 'next/image';
import { useGlobalContext } from '../../../../libs/context';
import { useEffect, useState } from 'react';
export function CreditBanner() {
    const { isMobile } = useGlobalContext();
    const [active, setActive] =useState(0);
    const delay = 4500;
     useEffect(() => {
        setTimeout(
        () =>
        setActive((active) =>
            active === carouselData.length - 1 ? 0 : active + 1
            ),
        delay
        );
    }, [active]);

   const carouselData= [
        {
            "slide":"1",
            "title":"Yes Bank",
            "ctaLink":"https://applycc.yesbank.in/YESBankCreditCard?uid=ab047",
            "img" : "/assets/images/SCcard.png"
        },
        {
            "slide":"2",
            "title":"IDFC",
            "ctaLink":"https://www.idfcfirstbank.com/credit-card/ntb-diy/apply?utm_source=Partner&utm_medium=NTB_Urban_Money&utm_campaign=NTB_Urban_Money",
            "img" : "/assets/images/IDFCcard.png"
        },
        {
            "slide":"3",
            "title":"Standard Chartered",
            "ctaLink":"/credit-card/standard-chartered/online-application-form",
            "img" : "/assets/images/SCcard2.png"
        }
    ]

    return (
        <section className={styles.creditcards}>
            <div className="container">
                <h2 className={`font24 fontMedium textBlack textCenter ${styles.mainHeading}`}>Swipe Like A Pro - Credit Card on the Go!</h2>
                <p className={`font14 text2828 ${styles.subHeading} mb30`}>Urban Money is your one-stop solution for informed consultations pertaining to your next online credit card purchase. Not only does a Credit Card improve your credit score, but it also allows you to purchase high-end commodities. However, with a massive range of credit cards, we have hand-picked some of the best credit cards across various banks. Conveniently apply online today! </p>
                <div className={styles.allCards} >
                {carouselData && carouselData.length > 0 && carouselData.map((item, index) => (
                    <>
                    {isMobile ? 
                    <div className={`${styles.banner} ${active === index ?styles.active:styles.inactive}`} key={index}> 
                    <NavLink href={item.ctaLink}>
                    <figure><Image className={`imgResponsive ${styles.cards}`} src={item.img} width={377} height={436} alt="" /></figure>
                    </NavLink>
                    </div>
                    :
                    <NavLink href={item.ctaLink} key={index}>
                        <figure className='test'><Image className={`imgResponsive ${styles.cards} `} src={item.img} width={377} height={436} alt="" /></figure>
                    </NavLink>
                    }
                    </>
                ))}
                </div>
            </div>
            {isMobile && <div className={styles.paginations}>
            {carouselData && carouselData.length > 0 && carouselData.map((item, index) => {
                return <span key={index} className={`${styles.StepNumber} ${active === index ? styles.active : ''}`} onClick={()=>setActive(index)}></span>
            })}
        </div>}
        </section>
    )
}