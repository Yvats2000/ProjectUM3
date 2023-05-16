import styles from './CardUtilisation.module.css'
export const CardUtilisation = (props) => {
  const { CardUtilis } = props;
  return (
      <>
        <div className={styles.crdeqnimpacts}>
                  <figure className={styles.iconBord}>
                    <img
                      src="/assets/images/credit.svg"
                      className="imgResponsive"
                      alt="Urban Money"
                    />
                  </figure>
                  <div className={styles.noOfenq}>
                    <p>
                    Credit Card Utilisation
                    </p>
                  <span className={`${styles.impact} ${styles.highImpact}`}>High Impact</span>
                  </div>
                  
                    <div className={styles.allenq }>
                      <p className={styles.value}>{CardUtilis.creditLimitUsed?CardUtilis.creditLimitUsed:0 }%</p>
                      <p className={styles.type}>Credit limit used</p>
                    </div>
                    <div className={styles.allenq }>
                      <p className={styles.value}>₹ { CardUtilis.totalCreditUtilised ? CardUtilis.totalCreditUtilised.toLocaleString('en-IN') : 0}</p>
                      <p className={styles.type}>Total Spends</p>
                    </div>
                    <div className={styles.allenq }>
                      <p className={styles.value}>₹ { CardUtilis.totalCreditLimit ? CardUtilis.totalCreditLimit.toLocaleString('en-IN') : 0}</p>
                      <p className={styles.type}>Total credit limit</p>
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
