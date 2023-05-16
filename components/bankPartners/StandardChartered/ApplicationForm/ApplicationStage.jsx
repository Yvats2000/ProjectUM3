import styles from "./ApplicationForm.module.css";
import Image from "next/image";
export const ApplicationStage = ({activeTile}) => {
  return (
    <div className={styles.bankinputdetails}>
      <Image className={`imgResponsive`} src="/assets/images/StandardChartered.png" width={115} height={50} alt="Standard Chartered" />
      <p className={`${styles.mobheading} text000c4d font20 fontsemiBold ${styles.centerheading}`}>Standard Charted Credit Card Application!</p>
      <ul className={styles.bankinfos}>
        <li className={activeTile === 0 ? styles.active : styles.completed}>
          <p className={`font14 text686868 lineHeight20 ${styles.displayblock} ${styles.textactive} mobfont14`}>Personal Details 
          <span className={`texta1a1a1 ${styles.filldeatils}`}>Fill your details</span></p>
          <p className={styles.progress}><span className={styles.stepnumber}>1</span> 
          <div className={styles.completedcheck}><Image className={`imgResponsive`} src="/assets/images/greencheck.svg" width={10} height={8} alt="Standard Chartered Personal Details" /></div>
          </p>
        </li>
        <li className={activeTile === 1 ? styles.active : activeTile > 1 ? styles.completed : ''}>
          <p className={`font14 text686868 lineHeight20 ${styles.displayblock} ${styles.textactive} mobfont14`}>Residential Info
          <span className={`texta1a1a1 ${styles.filldeatils}`}>Fill your details</span></p>
          <p className={styles.progress}><span className={styles.stepnumber}>2</span> 
          <div className={styles.completedcheck}><Image className={`imgResponsive`} src="/assets/images/greencheck.svg" width={10} height={8} alt="Standard Chartered Property Details" /></div>
          </p>
        </li>
        <li className={activeTile === 2 ? styles.active : activeTile > 2 ? styles.completed : ''}>
          <p className={`font14 text686868 lineHeight20 ${styles.displayblock} ${styles.textactive} mobfont14`}>Employment Details 
          <span className={`texta1a1a1 ${styles.filldeatils}`}>Fill your details</span></p>
          <p className={styles.progress}><span className={styles.stepnumber}>3</span> 
          <div className={styles.completedcheck}><Image className={`imgResponsive`} src="/assets/images/greencheck.svg" width={10} height={8} alt="Standard Chartered Employment Details" /></div>
          </p>
        </li>
        <li className={activeTile === 3 ? styles.active : ''}>
          <p className={`font14 text686868 lineHeight20 ${styles.displayblock} ${styles.textactive} mobfont14`}>Income Details 
          <span className={`texta1a1a1 ${styles.filldeatils}`}>Fill your details</span></p>
          <p className={styles.progress}><span className={styles.stepnumber}>4</span> 
          <div className={styles.completedcheck}><Image className={`imgResponsive`} src="/assets/images/greencheck.svg" width={10} height={8} alt="Standard Chartered Income Details" /></div>
          </p>
        </li>
      </ul>
    </div>
  );
};