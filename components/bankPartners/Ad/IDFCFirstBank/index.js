import styles from './index.module.css'
export function IDFCAD(){
    return(
        <div className={styles.crdCard}>
            <div className={styles.txtSection}>
                <img src="../assets/images/IDFC_First_Bank_logo.png" className={`${styles.logo} imgResponsive`} alt="Urban Money"/>
                <img src="../assets/images/apllynow.svg" className={`imgResponsive ${styles.text}`} alt="Urban Money"/>
                <a href='https://www.idfcfirstbank.com/credit-card/ntb-diy/apply?utm_source=Partner&utm_medium=NTB_Urban_Money&utm_campaign=NTB_Urban_Money' className={styles.applycard}>Apply Now <img src="../assets/images/whitearw.svg" className="imgResponsive" alt=""/></a>
            </div>
            <div className={styles.imgSection}> 
                <img src="../assets/images/Millennia_Male_Landing_Page.png" className="imgResponsive" alt="Urban Money"/>
                <p className="font14 textBlack ">*T&amp;C Apply</p>
            </div>
        </div>
        
    )
}