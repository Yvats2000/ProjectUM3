import { useState } from "react";
import moment from 'moment';
import styles from "./ActiveAccount.module.css";
export const ActiveAccount = ({ accList }) => {

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
        {accList.map((loan, index) => (
          <div className={`${styles.bankDetails} ${showtab === index?styles.active:null}`} key={index} id={index}>
            <div className={`${styles.bankadd} ${styles.tlaccc}`}>
              <div className={styles.logoBankname}>
                {/* <figure>
                  <img src="/assets/images/hdfc1.png" alt=""  />
                </figure> */}
                <div className={styles.details}>
                  <p className={styles.Bankname}>{ loan.lender || ''}</p>
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
                <p className={styles.Bankname}> ₹ { loan.creditLimitAmount ? loan.creditLimitAmount.toLocaleString('en-IN') : 0}</p>
                <p className={styles.historyLoan}>Total Limit</p>
              </div>
              <div className={styles.postDate}>
                <p className={styles.active}>{loan.status }</p>
                <p className={styles.historyLoan}>Status</p>
              </div>
              
            </div>
            
            <div className={styles.detailexpand}>
              <ul>
                <li>
                  <p className={styles.accdetails}>Account Number</p>
                  <p className={styles.values}>{ loan.accountNumber}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Remaining Amount</p>
                  <p className={styles.values}>₹ { loan.amountRemaining}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Opening Date</p>
                  <p className={styles.values}>{ moment(loan.openingDate).format('ll')}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Account Holder Type</p>
                  <p className={styles.values}>{ loan.accountType}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Last Update</p>
                  <p className={styles.values}>{ moment(loan.lastUpdateOn).format('ll')}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Credit Limit</p>
                  <p className={styles.values}>₹ { loan.creditLimitAmount ? loan.creditLimitAmount.toLocaleString('en-IN') : 0}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Highest Credit</p>
                  <p className={styles.values}>₹ { loan.highestCredit ? loan.highestCredit.toLocaleString('en-IN') : 0}</p>
                </li>
               
                
              </ul>
            
            </div>
            <div className={`${styles.error} ${styles.moreDetails}`}>
              <button className={styles.btn} onClick={() => showTabs(index)}> {showtab ==-1?'View Details':'Hide Details' } <img
                src="/assets/images/ic-dropdown-blue-copy-2.svg"
                alt="Urban Money"
              /></button>
              {/* <button className={styles.btn}>Noticed an error?</button> */}
            </div>
            
          </div>
        ))}
        </div>
      
        
      </>
  )
}
