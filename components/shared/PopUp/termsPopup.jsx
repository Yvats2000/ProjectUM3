import styles from "./PopUp.module.css";

export const TermsPopup = ({setThankYouPopUp}) => {
  return (
    <div className={`${styles.popUpBox} ${styles.active}`}>
      <form className={`${styles.popUpWindow} ${styles.termspopup}`}>
        <div className={styles.headingBox}>
          <h2 className={`font20 mb30 textBlack bottomborderf5a623 ${styles.popupHeading} fontBold lineHeight36`}>Terms and Conditions</h2>
          <span className={`${styles.close} cursorPointer `} onClick={(e) => setThankYouPopUp()}></span>
        </div>
        <div className={styles.termsContent}>
          <p className="mb20 fontBold">CONSENT IN RELATION TO ACCESS TO CREDIT INFORMATION THROUGH Equifax</p>
                <p className="mb10">End-user (customer)hereby consents to Loantap financial technology being appointed as your authorized representative to receive your Credit Information from Equifax on an ongoing basis until the purpose of Credit Risk Assessment. is satisfied or the expiry of 6 months from the date the consent is collected; whichever is earlier.</p>
                <p className="mb10">
                This End User Agreement (the “Agreement” ) is made between you (the “User” or “You” ) and Urban Money Private Limited hereinafter referred to as “URBAN MONEY ”, a private limited company having its registered office at Good Earth Business Bay, 9th Floor, Sector 58, Gurgaon, Haryana, Pin Code: 122011. (“Urban Money ”, “Us” or “We”, which term shall include its successors and permitted assigns). The User and URBAN MONEY shall be collectively referred to as the “Parties” and individually as a “Party”.
                </p>
                
        </div>
      </form>
    </div>
  );
};
