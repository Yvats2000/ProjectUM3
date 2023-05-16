import styles from './CreditEnquires.module.css'
export const CreditEnquires = (props) => {
  const { enquireList } = props;
  return (
      <>
        <div className={styles.crdeqnimpacts}>
                  <figure className={styles.iconBord}>
                    <img
                      src="/assets/images/ic-005.svg"
                      className="imgResponsive"
                      alt="Urban Money"
                    />
                  </figure>
                  <div className={styles.noOfenq}>
                    <p>
                    You have {enquireList.totalEnquiries } new credit enquiries Low Impact
                    </p>
                  <span className={`${styles.impact} ${styles.lowImpact}`}>Low Impact</span>
                  </div>
                  
                    <div className={styles.allenq }>
                      <p className={styles.value}>{enquireList.totalEnquiries }</p>
                      <p className={styles.type}>Total Enquiries</p>
                    </div>
                    <div className={styles.allenq }>
                      <p className={styles.value}>{ enquireList.enquiryForLoans}</p>
                      <p className={styles.type}>for loan(s)</p>
                    </div>
                    <div className={styles.allenq }>
                      <p className={styles.value}>{ enquireList.enquiryForCreditCards}</p>
                      <p className={styles.type}>for Credit Card(s)</p>
                    </div>
                    {/* <div className={styles.allenq}>
                      <a href=""
                        >Know more about
                        <img
                          src="/assets/images/ic-dropdown-blue-copy-2.svg"
                          alt=""
                        />
                      </a>
                    </div> */}
                  
                </div>
      </>
  )
}
