import styles from "../error.module.css";
export function Page500() {
    return (
        <section className={styles.topsection}>
          <div className={styles.wrap}>
            <div className={`${styles.textSection}`}>
              <h1 >Internal <br /><span>Server error</span></h1>
              <p>We are working to solve the problem, sorry for the inconvenience</p>
            </div>
            <div className={styles.imgSection}>
              <figure><img src="/assets/images/500.png"  className="imgResponsive" alt="500" /></figure>
            </div>
          </div>  
        </section>
    );
}