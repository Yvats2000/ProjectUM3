import styles from "../IfscCode.module.css"
export function CityContent({bank, state, city}) {
  return (
    <>
      <section className={styles.banks}>
        <div className={styles.allbanksList}>
          <div className={styles.ifscBankContent}>
            <p>In total, {bank} operates through numerous branches in {city || ''}, {state || ''}. To offer a satisfying client experience, an wide range of banking and loan products are offered by {bank || ''} in {city || ''}, {state || ''}. </p>
            <p>Check the IFSC, RTGS and SWIFT Code for each {bank || ''} branch in the {city || ''} district before carrying out any banking transaction. {bank || ''} branch office opens at 9:30 AM and closes at 3:30 PM.</p>
            <p>The ATM service is available 24/7 regardless of working hours.</p>
            <p>You may contact the branch executive of your {bank || ''} branch {city || ''} to get the information associated with your bank account.</p>
            <p>Get the list of nearest {bank || ''} branches in other cities of {state || ''} to experience hassle-free banking while traveling and relocating. To make NEFT and RTGS transactions easier, check and validate the IFSC code through {bank || ''} IFSC Code List. Additionally, get familiar with the loan interest rates and other details to avail of the maximum possible benefits of the available banking products offered by {bank || ''}.</p>
          </div>
        </div>
      </section>
    </>
  );
}
