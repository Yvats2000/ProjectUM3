import { useState } from "react";
import styles from "./BankList.module.css";
import moment from 'moment';
import { Tooltip } from "../../../../shared";
export const BankList = ({ historyLoan }) => {
  const [showtab, setshowtab] = useState(-1);
  const showTabs = (tab) => {
    if (showtab != tab) {
      setshowtab(tab)
    } else {
      setshowtab(-1)
    }
  }
  const paymentStauts = (color) => {
    if(color && color.length > 0)
    switch (color[0].status) {
      case 'YELLOW':
        return (<figure><img src="/assets/images/attention.svg" alt="Urban Money"/></figure>)
      case 'RED':
        return(<figure><Tooltip tooltip={color[0].statusText} toolType={true}><img src="/assets/images/late.svg" alt="Urban Money" /></Tooltip></figure>);
      case 'ORRANGE':
        return(<figure><img src="/assets/images/change.svg" alt="Urban Money" /></figure>);
      case 'GREEN':
        return(<figure><img src="/assets/images/checkmark.svg" alt="Urban Money" /></figure>);
      default:
        break;
    }
  }
  let month = [
    {
      "id": 1,
      "name":"Jan"
    },
    {
      "id": 2,
      "name":"Feb"
    },
    {
      "id": 3,
      "name":"Mar"
    },
    {
      "id": 4,
      "name":"Apr"
    },
    {
      "id": 5,
      "name":"May"
    },
    {
      "id": 6,
      "name":"Jun"
    },
    {
      "id": 7,
      "name":"July"
    },
    {
      "id": 8,
      "name":"Aug"
    },
    {
      "id": 9,
      "name":"Sep"
    },
    {
      "id": 10,
      "name":"Oct"
    },
    {
      "id": 11,
      "name":"Nav"
    },
    {
      "id": 12,
      "name":"Dec"
    },
  ]
  return (
    <>
      
      <div className={styles.banks} >
        {historyLoan.map((loan, index) => (
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
                    Last updated on: <span className="text444">{moment(loan.lastUpdateOn).format('ll')}</span>
                  </p>
                </div>
              </div>
              <div className={styles.postDate}>
                <p className={styles.Bankname}>{ loan.accountNumber}</p>
                <p className={styles.historyLoan}>Account Number</p>
              </div>
              <div className={styles.postDate}>
                <p className={styles.Bankname}>{loan.onTimePayments}</p>
                <p className={styles.historyLoan}>On Time Payments</p>
              </div>
              <div className={styles.postDate}>
                <p className={styles.active}>{loan.status }</p>
                <p className={styles.historyLoan}>Status</p>
              </div>
              
            </div>
            
            <div className={styles.detailexpand}>
              <div className={styles.topSection}>
                <p className={styles.topHead}>Payment history of this account</p>
                <ul>
                  <li>
                    <figure><img src="/assets/images/checkmark.svg" alt="Urban Money"/></figure>
                    <span className={styles.ontime}> Paid on time</span>
                  </li>
                  <li>
                    <figure><img src="/assets/images/attention.svg" alt="Urban Money"/></figure>
                    <span className={styles.ontime}> 1-89 days late</span>
                  </li>
                  <li>
                    <figure><img src="/assets/images/change.svg" alt="Urban Money"/></figure>
                    <span className={styles.ontime}> 90+ days late</span>
                  </li>
                  <li>
                    <figure><img src="/assets/images/late.svg" alt="Urban Money"/></figure>
                    <span className={styles.ontime}> Alert</span>
                  </li>
                </ul>
              </div>
              <div className={styles.paymentHistoryTab}>
                
                  {loan.payments.map((history, index) => (
                    <div className={styles.indYear} key={index}>
                      <strong>{history.year}</strong>
                      <ul>
                        {month.map((list, index) => (
                          <li key={index}>
                            <p>{list.name}</p>
                            {paymentStauts(history.paymentHistoryMonth.filter((value) => value.id === list.id))}
                          </li>
                        ))}
                        
                      </ul>
                    </div>
                  )) }
              </div>
            </div>
            <div className={`${styles.error} ${styles.moreDetails}`}>
              <button className={styles.btn} onClick={()=>showTabs(index)}>{showtab === index?'Hide Details':'View Details'} <img
                src="/assets/images/ic-dropdown-blue-copy-2.svg"
                alt="Urban Money"
              /></button>
            </div>
            
          </div>
        ))}
        </div>
      
        
      </>
  )
}
