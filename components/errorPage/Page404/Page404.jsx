import styles from "../error.module.css";
export function Page404() {
    return (
        <section className={styles.topsection}>
            <div className={styles.wrap}>
                <div className={styles.textSection}>
                    <h1 >Sorry! we can’t<br/>
                    <span>Find that page</span> </h1>
                    <p>Looks like where you were trying to go no longer exists.</p>
                </div>
                <div className={styles.imgSection}>
                    <figure><img src="/assets/images/404.png"  className="imgResponsive" alt="404" /></figure>
                </div>
            </div>
        </section>
    );
}