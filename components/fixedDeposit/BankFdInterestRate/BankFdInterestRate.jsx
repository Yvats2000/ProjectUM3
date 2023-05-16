import styles from "./BankFdInterestRate.module.css";
import {FilterBy,FilterTable}  from './'

export function BankFdInterestRate() {
    return (
        <div className="container">
            <h2 className={styles.mainHeading}>Fixed Deposite Categories</h2>
            <div className={styles.filterWrap}>
                <FilterBy />
                <FilterTable />
                <div className={styles.floatingbtn}><img src="/assets/images/floating-filter.svg" alt="Filter" className="img-responsive" /></div>
            </div>
        </div>
        
    );
}