import styles from "../IfscCode.module.css"
export function BranchContent({bank, state, city , ifsc}) {
  
  return (
    <>
      { ifsc && <section className={styles.banks}>
        <div className={styles.allbanksList}>
          <div className={styles.ifscBankContent}>
            <p>The {bank.lenderName || ''} {state.name || ''} {city.name || ''} {ifsc.branch || ''} IFSC Code is {ifsc.ifsc || ''}. The {ifsc.branch || ''}, {bank.lenderName || ''} branch {ifsc.mircCode ? 'with code '+ ifsc.mircCode : ''} is located in {ifsc.address || ''} in {city.name || ''} District.</p>
            <p>The current address of the {bank.lenderName || ''}  {ifsc.branch || ''} branch is {ifsc.address} {ifsc.branch || ''} {city.name || ''} {state.name || ''}. To perform banking operations with utmost ease, check IFSC, MICR and SWIFT Code. Banking hours of {ifsc.branch || ''} {bank.lenderName || ''} branch is from 9:30 AM to 3:30 PM.</p>
            <p>Check the details associated with the {bank.lenderName || ''} {city.name || ''} {ifsc.branch || ''} branch, including its IFSC, RTGS, NEFT Codes and contact details here.</p>
            <p>{bank.lenderName || ''} {state.name || ''} {city.name || ''} {ifsc.branch || ''} Branch IFSC Code</p>
          </div>
        </div>
      </section>}
    </>
  );
}
