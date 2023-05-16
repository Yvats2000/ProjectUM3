import Image from "next/image";
import styles from "./CheckCreditBanner.module.css";
import { useRouter } from "next/router";
import { useGlobalContext } from "../../../libs/context";

export const CheckCreditBanner = () => {
    const { isMobile } = useGlobalContext();
    const router = useRouter();
    const handleClick = (e, path) => {
      e.preventDefault();
      router.push(path)
    };
  return (
    <section className="cibilScoreBanner">
    <div className="container">
        <div className={styles.cibilBannerWeb}>
            <Image className={styles.webBackImg} src="/assets/images/webBackImg.png" alt="" srcset="" layout="fill"/>
            {isMobile && <Image className={styles.mobileBackImg} src="/assets/images/mobilebackcibil.png" alt="" srcset="" layout='fill'/>}
            <div className={styles.sideWrap}>
                <figure className={styles.cibilmeter}>
                    <Image src="/assets/images/cibil.svg" width={180} height={135}  alt="" srcset=""  />

                </figure>
                <div className={styles.cibilContent}>
                    <p className={`${styles.cibilheading} textWhite mb5`}><span className={styles.mobfontthin}>Get your</span>  <span className={styles.dblock}>latest CIBIL <span className="fontsemiBold textf2e455">credit</span></span> <span className={`${styles.dblock} textf2e455`}>report for free <span className="textWhite">here</span></span> </p>
                    <p className={`font15 lineHeight18 textd9e2e7 ${styles.mobdisplaynoneheading}`}>5 Lac+ people have got their Credit Scores for FREE!</p>
                </div>
            </div>
            <button className={`btn btn-blue  font14 font600 ${styles.cibilBtnweb} noWrap`} onClick={(e) => handleClick(e, "/credit-score")}>Check Your <span className="texte02020">FREE</span>  Credit Score <em className="icon-arrow-right font14 marg5L"></em></button>
            <button className={`btn btn-blue  font12 fontsemiBold ${styles.cibilBtnmob}`} onClick={(e) => handleClick(e, "/credit-score")}>Check Credit Score <em className="icon-arrow-right font12"></em></button>
        </div>
    </div>
</section>
  );
  };
   

