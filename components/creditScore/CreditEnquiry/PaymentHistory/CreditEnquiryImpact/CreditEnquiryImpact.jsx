import styles from './CreditEnquiryImpact.module.css'
export const CreditEnquiryImpact = (props) => {
  const { paymentHistory } = props;
  return (
      <>
        <div className={styles.crdeqnimpacts}>
                  <figure className={styles.iconBord}>
                    <img
                      src="/assets/images/ic-001.svg"
                      className="imgResponsive"
                      alt="Urban Money"
                    />
                  </figure>
                  <div className={styles.noOfenq}>
                    <p>
                    Payments on time
                    </p>
                  <span className={`${styles.impact} ${styles.highImpact}`}>High Impact</span>
                  </div>
                  
                    <div className={styles.allenq }>
                      <p className={styles.value}>{paymentHistory.paymentOntime }</p>
                      <p className={styles.type}>Payment on time</p>
                    </div>
                    <div className={styles.allenq }>
                      <p className={styles.value}>{ paymentHistory.totalDelayedPaymentCount}</p>
                      <p className={styles.type}>Late Payments</p>
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
