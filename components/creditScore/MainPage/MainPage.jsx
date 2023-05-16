import styles from "./MainPage.module.css";
import { LeadForm } from  "../LeadForm";
import { BreadCrumb } from "../../shared";
import Image from "next/image";
export const MainPage = () => {
  const breadCrumbLinks = [
    {
      "text": "Credit Score",
      "path": "/credit-score",
      "class": ""
    }
  ]
  return (
    <section className={styles.creditReportSection}>
      <div className={`container ${styles.creditCont}`}>
        <div className={styles.creditFormSection}>
          <BreadCrumb links={breadCrumbLinks} />
          <div className={styles.creditForm}>
            <LeadForm />
          </div>
        </div>
        <div className={styles.creditReportmeaning}>
          {/* <h3 className="font24 fontMedium textBlack mb30 lineHeight36">Free and Secure Credit Checks</h3>
          <p className="font16 fontMedium mb10 text181d lineHeight26">A Safe Space to Get Comprehensive Credit Checks With Zero Impact on Credit Scores.</p>
          <p className="font14 text444 mb30 lineHeight22 opt80">Check your credit scores for free in a safe and secure digital environment. Incorporating cutting edge technology, Urban Money ensures completely non-invasive and anonymous credit checks promising zero impact on your credit reputation.</p>
          <div className={styles.slideBox}>
            <figure><img src="./assets/images/herobanner-creditscore.svg" className={styles.imgResponsive} alt="" /></figure>
            <div className="desc"> 
              <p className="text181d font16 fontMedium lineHeight26">A Safe Space for Credit Checks </p>
              <p className="font14 text444 lineHeight22 opt80">At Urban Money, we bring you a completely safe and transparent digital environment where you can check your credit scores for free without fearing any negative impact on your score. </p>
            </div>
          </div> */}
          <figure className="mb25"><Image className={`imgResponsive`} width = {200} height = {131}  src={process.env.IMAGE_BASEURL + '/images/creditScoreicon.svg'} alt="Urban Money" /></figure>
          
          <ul className={styles.freeSecureList}>
            <li className='font16 text444 fontBold'>
              Free and Secure CIBIL Score Check<br/>
              <span className='font14'>A Safe Space to Get Comprehensive Credit Checks With Zero Impact on Credit Scores</span>
            </li>
            <li className='font16 text444 fontBold'>
              Credit Score Monitoring with Minimal Information<br/>
              <span className='font14'>Check Your CIBIL Score Daily and Get Regular Credit Improvement Tips only on Urban Money.</span>
            </li>
            <li className='font16 text444 fontBold'>
            Get the Lender&apos;s Perspective<br/>
              <span className='font14'>See How the Lender Sees You and Your Credit Report only at Urban Money</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
