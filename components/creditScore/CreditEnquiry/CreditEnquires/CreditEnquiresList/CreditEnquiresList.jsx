import { useState } from "react";
import moment from 'moment'
import styles from "./CreditEnquiresList.module.css";
export const CreditEnquiresList = ({ enquiryTypeList }) => {

  const [showtab, setshowtab] = useState(-1);
  const showTabs = (tab) => {
    if (showtab != tab) {
      setshowtab(tab)
    } else {
      setshowtab(-1)
    }
  }
  return (
    <>
      
      <div className={styles.banks} >
        {enquiryTypeList.map((loan, index) => (
          <div className={`${styles.bankDetails} ${showtab === index?styles.active:null}`} key={index} id={index}>
            <div className={`${styles.bankadd} ${styles.tlaccc}`}>
              <div className={styles.logoBankname}>
                <div className={styles.details}>
                  <p className={styles.Bankname}>{ loan.subscriberName}</p>
                  <p className={`text777  font14`}>
                    Enquiry Date: <span className="text444">{moment(loan.enquiredOn).format('ll')}</span>
                  </p>
                </div>
              </div>
              <div className={styles.postDate}>
                <p className={styles.Bankname}>{ loan.productType}</p>
                <p className={styles.historyLoan}>Products Type</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      
        
      </>
  )
}
