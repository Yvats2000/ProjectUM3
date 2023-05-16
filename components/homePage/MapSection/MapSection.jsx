import Image from "next/image";
import styles from "./MapSection.module.css";

export const MapSection = () => {
  return (
    <section className={styles.mapSection}>
      <div className={styles.mpScreen}>
        <div className={styles.mapImage}>
          <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/images/mapImg.svg'} width={657} height={620} alt="Office Location"/> 
        </div>
      </div>
      <div className={styles.playStore}>
        <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/images/logoBlack.svg'} width={100} height={32} alt="Urban Money"/> 
        <h3 className={`font24 textBlack fontMedium ${styles.heading}`}>Partner Business Program</h3>
        <p className={`${styles.prtnerText} text444 font14`}>Designed exclusively to help Urban Money (Square Capital) authorized partners, the Urban Money Partner app lets you view offers, earnings and cases updates in real time, and get privileged access.</p>
        <div className={styles.googlePlay}>
          
          <div className={styles.playStoreIcon}>
          <a href="https://play.google.com/store/apps/details?id=com.app.umpartner" rel="noreferrer" target="_blank" >
              <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/images/google-play-badge.svg'} width={151} height={54} alt="Google Play App" /> 
            </a>
          </div>
          
          
          <div className={styles.playStoreIcon}>
          <a href="https://apps.apple.com/us/app/urban-money-partner/id1600202687" rel="noreferrer" target="_blank" >
              <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/images/app-store-badge.svg'} width={137} height={54} alt="App Store App" /> 
            </a>
          </div>
          
        </div>
        <div className={styles.loginScreen}>
        <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/images/heroimage.svg'} width={389} height={232} alt="Urban Money Screen"/>
        </div>
      </div>
    </section>
  );
};
