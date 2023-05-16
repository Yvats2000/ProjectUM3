import styles from "./CreditFactors.module.css";
import { FactorsList } from "./FactorsList";
import Link from 'next/link'
export const CreditFactors = ({creditData}) => {
  return (
    <>
      <section className={`${styles.creditFactor}`} id="creditFactor">
              <h2 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36">Credit Factors</h2>
              <div className={styles.cards} >
                <Link href={`${process.env.BASE_URL}/credit-score/enquiry?paymentHistory`}><a><FactorsList img={'ic-001.svg'} pay={creditData.summary.paymentHistory} text='Payments on time' impact={'High'}/></a></Link>
                <Link href={`${process.env.BASE_URL}/credit-score/enquiry?CreditCardUtilisation`}><a><FactorsList img={'credit.svg'} pay={creditData.summary.creditCardUtilisation} text='Credit Card Utilisation' impact={'High'}/></a></Link>
                <Link href={`${process.env.BASE_URL}/credit-score/enquiry?CreditHistory`}><a><FactorsList img={'ic-003.svg'} pay={creditData.summary.creditHistory} text='Age of Oldest Account' impact={'Medium'}/></a></Link>
                <Link href={`${process.env.BASE_URL}/credit-score/enquiry?TotalAccounts`}><a><FactorsList img={'ic-004.svg'} pay={creditData.summary.totalAccounts} text='Total Accounts' impact={'Low'}/></a></Link>
                <Link href={`${process.env.BASE_URL}/credit-score/enquiry?CreditEnquiries`}><a><FactorsList img={'ic-005.svg'} pay={creditData.summary.creditEnquiries} text='Total Enquiries' impact={'Low'}/></a></Link>
                <div className={`${styles.indCard} ${styles.health}`}>
                <p className="font18 textWhite fontsemiBold mb15">
                  Credit Health Report
                </p>
                <figure className={styles.iconBord}>
                  <img
                      src="/assets/images/ic-001.svg"
                      className="imgResponsive"
                      alt="Urban Money"
                  />
                    </figure>
                    <ul>
                      <li>- Expert insights into credit health</li>
                      <li>- Tips to improve credit score</li>
                  </ul>
                </div>  
              </div>
          </section>
        
      </>
  )
}
