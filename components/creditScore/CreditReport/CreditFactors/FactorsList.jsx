import styles from "./CreditFactors.module.css";
export const FactorsList = ({img,pay,text,impact}) => {
  return (
      <>
        <div className={`${styles.indCard} ${impact?styles.border008834:styles.border454ec2}`}>
            <figure className={styles.iconBord}>
            <img
                src={`/assets/images/${img}`}
                className="imgResponsive"
                alt="Urban Money"
            />
            </figure>
            <p className="font18 text181d fontsemiBold mb5">{pay || '-'}</p>
            <p className="font14 text777 lineHeight24 mb10">{ text}</p>
            <div className={styles.impac}>
            <span className={`${styles.impact}  ${(impact == 'High')?styles.highImpact:(impact=='Low')?styles.lowImpact:(impact=='Medium')?styles.medium:''}`}>{impact} Impact</span>
            <img
                src="/assets/images/ic-dropdown-blue-copy-2.svg"
                alt="Urban Money"
            />
            </div>
        </div>  
      </>
  )
}
