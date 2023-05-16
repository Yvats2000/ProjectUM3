import { useState } from "react";
import moment from 'moment';
import styles from "./CreditCardList.module.css";
export const CreditCardList = ({ creditCard }) => {
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
        {creditCard.map((loan, index) => (
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
                <p className={styles.Bankname}>{ loan.ageOfAccount}</p>
                <p className={styles.historyLoan}>Age Of Account</p>
              </div>
              <div className={styles.postDate}>
                <p className={styles.active}>{loan.status }</p>
                <p className={styles.historyLoan}>Status</p>
              </div>
              
            </div>
            
            {/* <div className={styles.detailexpand}>
              <ul>
                <li>
                  <p className={styles.accdetails}>Account Number</p>
                  <p className={styles.values}>{ loan.accountNumber}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Opening Date</p>
                  <p className={styles.values}>{ loan.openingDate}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Account Holder Type</p>
                  <p className={styles.values}>{ loan.accountType}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Age Of Account</p>
                  <p className={styles.values}>{ loan.ageOfAccount}</p>
                </li>
                <li>
                  <p className={styles.accdetails}>Last Update On</p>
                  <p className={styles.values}>{ moment(loan.lastUpdateOn).format('ll')}</p>
                </li>
              </ul>
            
            </div> */}
            {/* <div className={`${styles.error} ${styles.moreDetails}`}>
              <button className={styles.btn} onClick={()=>showTabs(index)}>View Details <img
                src="/assets/images/ic-dropdown-blue-copy-2.svg"
                alt=""
              /></button>
              <button className={styles.btn}>Noticed an error?</button>
            </div> */}
            
          </div>
        ))}
        </div>
      
        
      </>
  )
}
