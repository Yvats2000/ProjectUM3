import styles from "./BannerTop.module.css";
import { Button } from "../../ui/button";
import { useRouter } from 'next/router'
import Image from "next/image";
import { NavLink } from "../../ui";
import bannerPic from '../../../public/assets/images/herobanner-creditscore.svg'
import bannerPicPng from '../../../public/assets/images/herobanner-creditscore.png'
import {useGlobalContext} from '../../../libs/context';

export const BannerTop = () => {
  const { isMobile } = useGlobalContext();
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  return (
    <section className={styles.bannerTop}>
      <div className={styles.bannerLeft}>
        <p className={styles.getYour}>Get your</p>
        <h2 className={styles.bannerHeading}>
          Latest Credit Score,
          <br />
          Absolutely <span>FREE</span>
        </h2>
        <p className={`${styles.freeUpdate} font14 text444`}>
          - Free monthly updates
          <br />- No impact on credit score
        </p>
        <figure className={styles.bannerIcon}>
          <Image className="imgResponsive" src={isMobile ? bannerPicPng : bannerPic} width={288} height={256} alt="Credit Score" priority /> 
        </figure>
        <NavLink className="btn credit_score_hb btn-primary font14 btn25 textCenterSm btnFull" href={`${process.env.BASE_URL}/credit-score`}>Check Credit Score <em className="icon-arrow-right font14"></em></NavLink>
      </div>
      <div className={styles.bannerRight}>
        <h1 className={styles.serviceHading}>Financial and Banking Services</h1>
        <p className={`${styles.cKyc} font16`}>
          <span className="fontMedium">100%</span> Paperless
        </p>
        <p className={styles.instantLoan}>Instant Home Loan</p>
        <p className={`${styles.loanInterest} ${styles.cKyc} font16 text444`}>
          Lowest interest rate <span className="fontMedium">8.35%</span>
        </p>
        <Button className="btn hl_eligbility_hb btn-Warning btnOutline font14 btn150 bg-f7f6f6 fontMedium btnFull" onClick={(e) => handleClick(e, "/loans/home-loan")}>Apply Now <em className="icon-arrow-right"></em></Button>
      </div>
    </section>
  );
};