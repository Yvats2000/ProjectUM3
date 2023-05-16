import styles from "./ApplicationForm.module.css";
import Image from "next/image";
import { NavLink } from "../../../ui";
export const SuccessFailure = ({status}) => {
  return (
    <div className={styles.errorandSucess}>
      <div className={styles.textScreen}>
        <Image src="/assets/images/scbanklogo.png" width={115} height={50} alt="Standard Chartered Journey" />
        <div className={styles.screens}>
          {!status && <Image src="/assets/images/failed.svg" width={187} height={92} alt="Standard Chartered Application Failed" />}
          {status && <Image src="/assets/images/success-5.svg" width={187} height={92} alt="Standard Chartered Application Success" />}
          <p className="text000c4d font32 fontsemiBold mb20">{status ? `Success` : `Failed`}</p>
          {!status &&<><p className="font14 text444 opt80 lineHeight21 fontSm12">Thank you for submitting your application for Credit Card. Unfortunately, the bank is unable to approve your application at this time. It is based on a number of factors, including your credit history, income, and other financial obligations.</p>
          <p className="font14 text444 opt80 lineHeight21 fontSm12">We understand that this may be disappointing news, but we encourage you to review your credit report and credit score to ensure that all information is accurate.</p></>}
          {status && <p className="font14 text444 opt80 lineHeight21 fontSm12">Thank you for submitting your credit card application. We are pleased to inform you that your application has been received and is now being processed. Our team will carefully review your application and may contact you if any additional information is required.</p>}
          {!status && <NavLink href="/credit-score"><button className={`btn btn-primary font16 btn25 fontsemiBold textCenterSm ${styles.screnbtn} ${styles.tryagain}`}>Check Credit Score
            <em className="icon-arrow-right font16 fontsemiBold"></em>
          </button></NavLink>}
          {status && <NavLink href="/"><button className={`btn btn-primary font16 btn25 fontsemiBold textCenterSm  ${styles.screnbtn} ${styles.continue}`}>Continue
            <em className="icon-arrow-right font16 fontsemiBold"></em>
          </button></NavLink>}
        </div>
      </div>
      <div className={styles.imgScreen}>
        <figure className={styles.img}>
          <Image className={`imgResponsive`} src="/assets/images/img-popup.png" width={457} height={502} alt="Standard Chartered Application" />
        </figure>
      </div>
    </div>
  );
};