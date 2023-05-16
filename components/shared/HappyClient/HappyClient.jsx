import styles from "./HappyClient.module.css";
export const HappyClient = () => {
  return (
    <section className={styles.happyClient}>
	    <div className={`container ${styles.clientGrid}`}>
        <div className={`${styles.clientNumer} font14`}>
          <span className="textBlack font16">3 Lacs</span> Happy Customers
        </div>
		    <div className={styles.cricle}></div>
        <div className={`${styles.clientNumer} font14`}>
          <span className="textBlack font16">15,000 CR</span> Disbursed Annually
        </div>
        <div className={styles.cricle}></div>
        <div className={`${styles.clientNumer} font14`}>
          <span className="textBlack font16">50+</span> Cities Covered
        </div>
        <div className={styles.cricle}></div>
        <div className={`${styles.clientNumer} text777 font14`}>
          <span className="textBlack font16">200+</span> Branches
        </div>
	    </div>
    </section>
  );
};

