import styles from './CreditCardImpact.module.css'
export const CreditCardImpact = (props) => {
  const { creditHistory } = props;
  return (
      <>
        <div className={styles.crdeqnimpacts}>
                  <figure className={styles.iconBord}>
                    <img
                      src="/assets/images/ic-003.svg"
                      className="imgResponsive"
                      alt="Urban Money"
                    />
                  </figure>
                  <div className={styles.noOfenq}>
                    <p>
                    Your age of credit history is <span className='text434ec9 fontsemiBold'>Excellent</span> 
                    </p>
                  <span className={`${styles.impact} ${styles.mediumImpact}`}>Medium Impact</span>
                  </div>
                  
                    <div className={styles.allenq }>
                      <p className={styles.value}>{creditHistory.activeAccount }</p>
                      <p className={styles.type}>Total active account(s)</p>
                    </div>
                    <div className={styles.allenq }>
                      <p className={styles.value}>{ creditHistory.ageOfOldestActiveAccount}</p>
                      <p className={styles.type}>Age of oldest active account</p>
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
