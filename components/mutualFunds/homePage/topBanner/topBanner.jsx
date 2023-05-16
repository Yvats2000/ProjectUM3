import styles from './topBanner.module.css';
import Image from "next/image";
import { FundSearch,FundSearchElastic } from '../../../shared';
export const TopBanner = () => {
  return (
    <section className={styles.homeBanner}>
        <div className="container">
            <div className={styles.bannerSection}>
                <div className={styles.textSection}>
                    <h1 className={`font36 text181b30 lineHeight40 fontThin mb35 Innerheading ${styles.mainHead}`}><span className="font100">Best Mutual</span> <span className="font48 font300 text181b30 lineHeight58 ">  Funds to Invest <label className="textf1444a" >2023</label></span></h1>
                    <p className="font14 text2828 lineHeight24 opt80 mb30">Aim to strike the right balance with the best mutual funds schemes. Unlock higher returns on investments, meet your financial obligations, and secure your fortune to safeguard your future. 
                    </p>
                    <ul className={styles.anchors}>
                        <li>Smart Investment</li>
                        <li>High Return</li>
                    </ul>
                    <p className="font14 fontsemiBold lineHeight18 textBlack mb10 fontsemiBold">Discover Mutual funds</p>
                {/* <FundSearch /> */}
                <FundSearchElastic />
                </div>
                <div className={styles.imgSection}>
                    <img className="imgResponsive" src="/assets/images/newmutualfundbanner.webp" alt="Urban Money Mutual Funds"/>
                </div>
            </div>
        </div>
    </section>
  )
}
