import React from "react";
import styles from './BtnTabs.module.css'
export const BtnTabs = ({tabsBtn,currentTab,currentTabs }) => {
  return (
      <>
      <div className={styles.buttonTab}>
              <button className={`${styles.tabBtn} ${currentTabs==='paymentHistory'?styles.active:<React.Fragment />}`} onClick={()=>currentTab('paymentHistory')}>Payment History</button>
              <button className={`${styles.tabBtn} ${currentTabs==='CreditCardUtilisation'?styles.active:<React.Fragment />}`} onClick={()=>currentTab('CreditCardUtilisation')}>Credit Card Utilisation</button>
              <button className={`${styles.tabBtn} ${currentTabs==='CreditHistory'?styles.active:<React.Fragment />}`} onClick={()=>currentTab('CreditHistory')}>Credit History</button>
              <button className={`${styles.tabBtn} ${currentTabs==='TotalAccounts'?styles.active:<React.Fragment />}`} onClick={()=>currentTab('TotalAccounts')}>Total Accounts</button>
              <button className={`${styles.tabBtn} ${currentTabs==='CreditEnquiries'?styles.active:<React.Fragment />}`} onClick={()=>currentTab('CreditEnquiries')}>Credit Enquiries</button>
        </div>
      </>
  )
}
