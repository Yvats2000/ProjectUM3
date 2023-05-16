import styles from "../IfscCode.module.css"
export function StateContent({bank, state}) {
  return (
    <>
      <section className={styles.banks}>
        <div className={styles.allbanksList}>
          <div className={styles.ifscBankContent}>
            <p>The {bank || ''} has its operational branches across multiple districts of {state || ''}. It offers a diverse range of banking and loan products catering to all monetary needs.</p>
            <p>To have a great banking experience know the IFSC, RTGS and SWIFT Codes for each {bank || ''} branch in all cities of {state || ''}. The working hours of {bank || ''} are 9:30 AM to 3:30 PM, except the second and fourth Saturdays. Know the {bank || ''} address and pin code along with their customer care number to easily reach out to the banking personnel. Check the information associated with the nearest {bank || ''} branch located in {state || ''}.</p>
            <h2 className={styles.bankHead}>{bank || ''} NEFT Fund Transfer Timing</h2>
            <p>For Bank Branch: Monday to Friday and Saturday (except 2nd & 4th) from  9:30 AM to 3:30 PM.</p>
            <p>For Net Banking: Monday to Saturday from 8 AM to 6:30 PM.</p>
            <h2 className={styles.bankHead}>{bank || ''} RTGS Timings</h2>
            <p>For Bank Branch: On weekdays i.e Monday to Saturday till 3:30 PM except for 2nd and 4th Saturdays.</p>
            <p>For Net Banking: On weekdays till 4 PM  except for 2nd  and 4th Saturdays.</p>
            <h2 className={styles.bankHead}>{bank || ''} IMPS Timing</h2>
            <p>Customers can transfer money through IMPS regardless of working hours and working days, The service is available 24/7 even on bank holidays.</p>
          </div>
        </div>
      </section>
    </>
  );
}
