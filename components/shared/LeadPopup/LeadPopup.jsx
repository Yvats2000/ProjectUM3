import styles from "./LeadPopup.module.css";
import { Loader } from "../";
import React, { useState } from "react";
import { LeadFormBody } from "./LeadFormBody";
export const LeadPopup = ({setPopUpClose, setThankYouPopUp,  productName, bankSlug}) => {
  const [loader,setLoader] = useState(false);
  return (
    <>
    {loader ? <Loader /> : <React.Fragment />}
    <div className={`${styles.popUpBox} ${styles.active}`}>
    <form className={styles.popUpWindow}>
      <div className={styles.headingBox}>
        <h2 className="font24 lineHeight36 text2828 Innerheading fontMedium bottomborderf5a623">Get Best Offers</h2>
        <span className={`${styles.close} cursorPointer`} onClick={(e) => setPopUpClose()}></span>
      </div>
      <LeadFormBody bankSlug={bankSlug} setThankYouPopUp={setThankYouPopUp} productName={productName} setLoader={setLoader}  setPopUpClose={ setPopUpClose}/>
    </form>
  </div>
  </>
  );
};
