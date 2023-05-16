import { useState } from "react";
import moment from 'moment'
import styles from "./UtilisationList.module.css";
export const UtilisationList = ({ CardList }) => {
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
        {CardList.map((loan, index) => (
          <div className={`${styles.bankDetails} ${showtab === index?styles.active:null}`} key={index} id={index}>
            <div className={`${styles.bankadd} ${styles.tlaccc}`}>
              <div className={styles.logoBankname}>
                {/* <figure>
                  <img src="/assets/images/hdfc1.png" alt=""  />
                </figure> */}
                <div className={styles.details}>
                  <p className={styles.Bankname}>{ loan.lender}</p>
                  <p className={styles.historyLoan}>{ loan.accountType}</p>
                  <p className={`text777  font14 ${styles.toppadding}`}>
                    Last updated on: <span className="text444">{ moment(loan.lastUpdateOn).format('ll')}</span>
                  </p>
                </div>
              </div>
              <div className={styles.postDate}>
                <p className={styles.Bankname}>{ loan.accountNumber}</p>
                <p className={styles.historyLoan}>Account Number</p>
              </div>
              <div className={styles.postDate}>
                <p className={styles.Bankname}>₹ {loan.highestLimit ? loan.highestLimit.toLocaleString('en-IN') : 0}</p>
                <p className={styles.historyLoan}>Total Limit</p>
              </div>
              <div className={styles.postDate}>
                <p className={styles.Bankname}>₹ {loan.creditlimitUsed ? loan.creditlimitUsed.toLocaleString('en-IN'): 0}</p>
                <p className={styles.historyLoan}>Credit Limit used</p>
              </div>
              <div className={styles.postDate}>
                <p className={styles.active}>{loan.status }</p>
                <p className={styles.historyLoan}>Status</p>
              </div>
            </div>
          </div>
        ))}
        </div>
      
        
      </>
  )
}
