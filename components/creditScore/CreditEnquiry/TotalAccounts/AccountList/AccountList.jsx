import styles from './AccountList.module.css'
export const AccountList = (props) => {
  const { AccountStatus } = props;
  return (
      <>
        <div className={styles.crdeqnimpacts}>
                  <figure className={styles.iconBord}>
                    <img
                      src="/assets/images/ic-004.svg"
                      className="imgResponsive"
                      alt="Urban Money"
                    />
                  </figure>
                  <div className={styles.noOfenq}>
                    <p>
                    Your age of credit history is <span className='text434ec9 fontsemiBold'>Excellent</span> 
                    </p>
                  <span className={`${styles.impact} ${styles.lowImpact}`}>Low Impact</span>
                  </div>
                  
                    <div className={styles.allenq }>
                      <p className={styles.value}>{AccountStatus.totalAccount }</p>
                      <p className={styles.type}>Total accounts</p>
                    </div>
                    <div className={styles.allenq }>
                      <p className={styles.value}>{ AccountStatus.activeAccount}</p>
                      <p className={styles.type}>Active account(s)</p>
                    </div>
                    <div className={styles.allenq }>
                      <p className={styles.value}>{ AccountStatus.closedAccount}</p>
                      <p className={styles.type}>Closed account</p>
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
