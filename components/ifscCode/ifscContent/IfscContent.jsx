import React from 'react';
import styles from "../IfscCode.module.css"
import { FAQ } from "../../shared";
import FaqData from "../../../data/ifscCodeFaq.json";
export function IfscContent() {
  return (
    <>
      <section className={styles.banks}>
        <div className="container">
          <div className={styles.allbanksList}>
            <div className={styles.ifscBankContent}>
              <h2 className={styles.bankHead}>IFSC Code in India</h2>
              <p className={styles.subHead}>What is IFSC Code?</p>
              <p>The IFSC Code also known as IFSC or the Indian Financial System Code is a unique alphanumeric code sequence assigned to bank branches engaged in the three major settlement payment systems in India, i.e., the NEFTs, RTGS and IMPS. This numeric sequence is instrumental in smoothening the e-transfer of funds across financial institutions within the country.</p>
              
              <h2 className={styles.bankHead}>IFSC Code Features and Benefits</h2>
              <p>The features of IFSC Codes are as follows:</p>
              <ul className="oList blueList listSpanbold mb20">
                <li>Particular bank branches are assigned distinctive IFSCs for accuracy.</li>
                <li>Quickens the process of online fund transfer.</li>
                <li>Instrumental in the execution of varied payment types, such as NEFT, RTGS and IMPS.</li>
                <li>IFSC enables tracking-friendly operations for efficient management.</li>
                <li>Ensures highly secured transactions with an overall evident reduction in errors and discrepancies.</li>
              </ul>
              <p>Customers with their bank IFSC can be assured of accurate payment transfers to and from  their accounts as IFSCs play a crucial role in channeling transfers. This is possible because each bank branch is tagged with a distinctive IFSC Code which further assists parties with documented SMS for transparent communication. Also, it enables customers to perform online transactions fast from the comfort of their homes and indirectly promotes digital India’s vision of paperless/cashless transactions.</p>
              <h2 className={styles.bankHead}>The Function of a Bank&apos;s IFSC Code</h2>
              <p>IFSC Code, which enables transactions within the territory of India, has a brief and well-defined functionality in the whole transaction process. We know that every major bank in India has thousands of branches across the country. And to transfer funds to any of these branches demands accuracy and security, both of which are ensured to perfection by the IFSC code.</p>
              <ul className="oList blueList listSpanbold mb20">
                <li>One of the major functions of an IFSC code is to act as a reference for the senders.</li>
                <li>IFSC Codes along with the receiver&apos;s bank account will act as a two-way authentication system ensuring that the funds are transferred to the correct account in the correct branch. IFSCs are very similar to pincodes of a region.</li>
                <li>Indian Financial System Codes assists in easy  NEFT, RTGS and IMPS transactions.</li>
              </ul>
              <h2 className={styles.bankHead}>How to Find IFSC Code?</h2>
              <p>Generally, an IFSC code can be found on bank cheques, official websites of banks and the RBI website. However, It could be a little tricky to search through websites or cheques, but users can simply bypass these efforts by using the Urban Money IFSC Finder. It is a simple online tool that will provide users with any bank’s IFSC. Users who wish to search banks by IFSC Code may also do so by feeding  the IFSC Code in the tool. This will generate the bank branch name, address and other details.</p>
              <h2 className={styles.bankHead}>Use of IFSC Code for Net Banking</h2>
              <p>Net Banking or online banking enables parties to send and receive funds electronically without the need to visit any bank. There are quite a few ways in which one can make use of the Net Banking tool. This includes National Electronic Funds Transfer (NEFT), Real Time Gross Settlement (RTGS), Immediate Payment System (IMPS), etc. Whatever the case may be, the use of an Indian Financial System Code is imperative as it is important to pin the payment to the correct endpoint.</p>
              <p>In case of a transfer, users have to log in to their Net Banking account and in the fund transfer section, they need to select the type of payment they want to make like NEFT, REGS, IMPS, etc. Senders will have to add a fund beneficiary. Enter in the details, such as Name, Account Number, Bank Name and IFSC Code. The IFSC code will help the system narrow down the branch of the bank.</p>
              <h2 className={styles.bankHead}>What is MICR Code?</h2>
              <p>An MICR Code, short form for Magnetic Ink Character Recognition, is a tool that uses the technology to read and interpret an encoded text allotted to a specific bank branch. Its primary functionality includes hassle-free and efficient clearance of cheques and vouchers. Furthermore, the MICR Code also assists in identifying Electronic Clearing System (ECS)-friendly bank branches. Generally, MICR Code can be found printed on a bank cheque.</p>
              <h2 className={styles.bankHead}>MICR Code Features and Benefits</h2>
              <p>There are indeed a few layers of benefits and advantages of the MICR technology.</p>
              <ul className="oList blueList listSpanbold mb20">
                <li>The MICR code is legit fast and ensures a smooth process. With the help of MICR, banks process numerous cheques on a daily basis.</li>
                <li>MICR is also of great importance when it comes to security. The printed characters on the cheques are inscribed with a special ink making them extremely difficult to forge.</li>
                <li>With the help of MICR Codes, one can ensure accurate transactions. This is due to the construction of characters which involves unique combinations. This makes it efficient to channel funds to the right destination.</li>
              </ul>
              <h2 className={styles.bankHead}>Top Banks with IFSC and MICR Code</h2>
              <p>The table below showcases some of the top banks with a massive number of branches that made it imperative to allot an IFSC code and MICR code to each branch.</p>
              
                <div className={`${styles.tableResponsive} mb15`}>
                  <table className={styles.table}>
                    <tbody>
                      <tr>
                        <td width='80px'>S. No.</td>
                        <td>Bank Name</td>
                        <td>Details</td>
                      </tr>
                      <tr>
                        <td>1.</td>
                        <td>HDFC Bank</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>A private company offering financial services since 1994, now has over 5,000 branches in India.</li>
                            <li>With 200 billion dollars worth of assets, HDFC is one of the largest banks in the country.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>SBI Bank</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>A public company owned by the Government of India offering financial services and aid.It has more than 24,000 branches in India.</li>
                            <li>With this massive number of branches, having IFSC allotted to each branch is highly essential for efficiency.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>ICICI Bank</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>A private sector bank offering banking and financial services has more than 5,000 branches in India.</li>
                            <li>ICICI Bank has over 140 billion dollars of assets making it another significant bank functioning in the country.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>4.</td>
                        <td>Axis Bank</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>Another booming private sector bank with a distribution of more than 4,000 branches and assets worth more than 110 billion USD, Axis bank is definitely a major unit for IFSC allocation.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>5.</td>
                        <td>Kotak Mahindra Bank</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>With about 1,500 branches all over India, Kotak Mahindra Bank is steadily expanding its operations.</li>
                            <li>In just under 20 years, Kotak Mahindra Bank was able to create a revenue of more than 30 billion USD.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>6.</td>
                        <td>IndusInd Bank</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>Indusind Bank is a privatized banking and financial company with over 1,500 branches across India.</li>
                            <li>It has managed to yield a revenue of more than 23 billion USD since its establishment in 1994.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>7.</td>
                        <td>Yes Bank</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>Yes Bank is another private sector bank founded in 2004 that has expanded its territories to about 1,000 branches as of now.</li>
                            <li>With its operations progressing steadily, this financial sector company has managed to raise a 42 billion USD revenue.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>8.</td>
                        <td>Punjab National Bank</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>Punjab National Bank, founded in 1895, is one of the oldest and most trusted banks in India.</li>
                            <li>PNB has a decent expansion rate and managed to set up over 7,000 branches across India.</li>
                          </ul>
                        </td>
                      </tr>
                      <tr>
                        <td>9.</td>
                        <td>Bank of Baroda</td>
                        <td>
                          <ul className="mb15 listSpanbold blueList oList">
                            <li>It is an Indian nationalized banking and financial sector company founded in 1908.</li>
                            <li>Since its establishment, BoB has set up more than 9,500 branches pan India. </li>
                          </ul>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              
              <h2 className={styles.bankHead}>Difference Between IFSC and MICR Code</h2>
              <div className={`${styles.tableResponsive} mb15`}>
                  <table className={styles.table}>
                    <tbody>
                      <tr>
                        <td>S. No.</td>
                        <td>Bank Name</td>
                        <td>Details</td>
                      </tr>
                      <tr>
                        <td>1.</td>
                        <td>IFSC or the Indian Financial System Code is an 11-digit alphanumeric sequence that is unique to bank branches.</td>
                        <td>MICR Code or Magnetic Ink Character Recognition Code is a 9-digit encrypted code that is meant to smoothen the process of cheque and voucher clearance.</td>
                      </tr>
                      <tr>
                        <td>2.</td>
                        <td>IFSC is used to execute online money transfers across banks within India without any issues.</td>
                        <td>MICR Code is meant to make clearance of cheques and other documents smoother and faster.</td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>IFSC contains a code for the bank name and code for the branch assigned by the Reserve Bank of India. Also, it contains a “0” kept for future use.</td>
                        <td>MICR Code contains a code representing the city code, a code representing the bank name, and a code representing the branch.</td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>With IFSC, one can execute payments based on NEFT, RTGS, and IMPS.</td>
                        <td>With MICR Code, one can execute payments based on cheques or vouchers.</td>
                      </tr>
                      <tr>
                        <td>3.</td>
                        <td>IFSC usage is meant for electronic transfer of payments.</td>
                        <td>MICR Code is meant for decryption of codes printed on the cheques, vouchers, and other documents.</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <h2 className={styles.bankHead}>Where to Find IFSC or MICR Code on a Bank Cheque?</h2>
              <p>Information like IFSC and MICR Code are very much part of a bank cheque layout. If one needs to find out the IFSC and MICR code of their bank branch, they can locate so in a cheque book issued by their bank.</p>
              <h3>Find Indian Financial System Code (IFSC Code)</h3>
              <p>You will find the IFSC code on a bank cheque at the top section of the cheque leaf. This Code will be given along with the address of the branch of the bank. Users will be able to easily locate it as they are generally titled and specified.</p>
              <h3>Find Magnetic Ink Character Recognition (MICR Code)</h3>
              <p>The MICR code (Magnetic Ink Character Recognition Code) is printed in a special font on the bottom strip of a bank cheque leaf. The MICR code is given along with other information, such as cheque number, account ID and transaction code. The MICR Code is created with a font known as E13B which is identified by MICR Code scanner.</p>
          </div>
        </div>
      </div>
      </section>
      {FaqData && FaqData.length > 0 ?
    <section className="faq">
      <div className="container">
        <h2 className="faqHeading font24">FAQs</h2>
        <p className="font14 lineHeight24 text444 mb45 faqP">From refinancing to reducing your interest, we have the answers right here.</p>
        <div className="faqBx">
          <FAQ data={FaqData}  />
        </div>
      </div>
    </section>
    :null}
    </>
  );
}
