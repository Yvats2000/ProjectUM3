import Image from "next/image";
import styles from "./HowItWorks.module.css";
import {Button} from "../../ui/button";
import { useRouter } from 'next/router'

export const HowItWorks = () => {
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  return (
    <section className={styles.howItworks}>
      <div className="container">
        <h3 className="font24 textBlack fontMedium textCenter">How it works?</h3>
        <p className={`font14 text2828 textCenter ${styles.hiwSub}`}>Simple and fast</p>
        <div className={styles.howitMain}>
          <div className={styles.tellAboutus}>
            <div className={styles.hotitCard}>
              <figure className={styles.howitArrow}><Image src={process.env.IMAGE_BASEURL + '/images/leftArrow.svg'} width={196} height={197} className="imgResponsive" alt="Tell us about you" /></figure>
              <p className={`${styles.numberFormat} font20`}>01</p>
              <h3 className={`${styles.loanHeading} ${styles.financialRequire} font18 text181d  fontMedium`}>Tell us about your<br/> financial requirement</h3>
              <p className="font14 text444">Fill out the details in less than<br/> 2 minutes.</p>
            </div>
            <div className={`${styles.hotitCard} ${styles.howitleftbottomSide}`}>
              <figure className={`${styles.howitArrow} ${styles.howItdownArrow}`}><Image src={process.env.IMAGE_BASEURL + '/images/leftArrow.svg'} width={196} height={197} className="imgResponsive" alt="AI based eligibility engine" /></figure>
              <p className={`${styles.numberFormat} font20`}>02</p>
              <h3 className={`${styles.loanHeading} ${styles.basedEligibility} font18 text181d  fontMedium`}>AI based eligibility engine<br/> to match you with best<br/>banks </h3>
              <p className="font14 text444">Based upon your details, our AI engine, using pool of 90+ bank details will match you with the best banks with success rate of over 90%</p>
            </div>
          </div>
          <div className={styles.getStart}>
            <figure><Image src={process.env.IMAGE_BASEURL + '/images/banner-how-its-work.svg'} width={476} height={476} className="imgResponsive" alt="Get Started" /></figure>
            <Button className="btn btn-primary font14 hl_eligibility_get_started textCenterSm btn25" onClick={(e) => handleClick(e, "/loans/home-loan/eligibility-calculator")}>Get Started <em className="icon-arrow-right arw font14 mrg"></em></Button>
          </div>
          <div className={styles.tellAboutus}>
            <div className={`${styles.hotitCard} ${styles.howitrightSide}`}>
              <figure className={`${styles.howItdownArrow} ${styles.howitArrowRight}`}><Image src={process.env.IMAGE_BASEURL + '/images/leftArrow.svg'} width={196} height={197} alt="Digital Bank application" className="imgResponsive" /></figure>
              <p className={`${styles.numberFormat} font20`}>03</p>
              <h3 className={`${styles.loanHeading} ${styles.digitalBank} font18 text181d  fontMedium`}>Digital Bank application</h3>
              <p className="font14 text444">Add few more details in completely digital platform to create bank application.</p>
            </div>
            <div className={`${styles.hotitCard} ${styles.howitrightSide} ${styles.howitrightbottomSide}`}>
              <figure className={`${styles.howItdownArrow} ${styles.howitArrowRightdown}`}><Image src={process.env.IMAGE_BASEURL + '/images/leftArrow.svg'} width={196} height={197} alt="Get quick sanction on your loan" className="imgResponsive" /></figure>
              <p className={`${styles.numberFormat} font20`}>04</p>
              <h3 className={`${styles.loanHeading} ${styles.quickSanction} font18 text181d fontMedium`}>Get quick sanction on your loan</h3>
              <p className="font14 text444">The whole process of application filling to loan sanction gets reduced from weeks to few minutes.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};          
