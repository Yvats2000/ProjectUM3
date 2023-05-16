import styles from "./PopUp.module.css";

export const TermsPopupCivil = ({setThankYouPopUp}) => {
  return (
    <div className={`${styles.popUpBox} ${styles.active}`}>
      <form className={`${styles.popUpWindow} ${styles.termspopup}`}>
        <div className={styles.headingBox}>
          <h2 className={`font20 mb30 textBlack bottomborderf5a623 ${styles.popupHeading} fontBold lineHeight36`}>Terms and Conditions</h2>
          <span className={`${styles.close} cursorPointer `} onClick={(e) => setThankYouPopUp()}></span>
        </div>
        <div className={styles.termsContent}>

          <p className="mb20">To,
            TransUnion CIBIL Limited<br/>
            [Formerly known as Credit Information Bureau (India) Limited]<br/>
            19th Floor, One World Centre Tower-2A-2B, <br/>
            841 Senapati Bapat Marg, <br/>
            Lower Parel, <br/>
            Mumbai – 400 013<br/>

            Sub:   Grant of Consent <br/>

            Dear Sirs,
            </p>
          <p className="mb20 fontBold">In connection with submission of the application for my credit information (“Consumer Credit Information”) and other related credit products (Credit Products) offered by CIBIL through [Insert: Name of the Company] (referred to as the “Company”) and delivery of the Consumer Credit Information and Credit Products to the Company, I hereby acknowledge and agree to the following: </p>
            <ul className={styles.termsList}>
              <li className="font12 mb10 lineHeight20">The Company is my lawfully appointed agent and he / it has agreed to be my agent for the purposes, including, without limitation, to receive the Consumer Credit Information and Credit Products from TUCL on my behalf and use it and the Company has granted its consent for being appointed for the aforesaid purpose.</li>
              <li className="font12 mb10 lineHeight20">I grant my unconditional consent to the Company to receive the Consumer Credit Information and Credit Products from TUCL on my behalf and the Company has granted its consent for being appointed for the aforesaid purpose. I hereby represent and acknowledge that the Terms of Understanding in relation to the use of the Consumer Credit Information and Credit Products has been agreed between me and the Company.  </li>
              <li className="font12 mb10 lineHeight20">I hereby expressly grant unconditional consent to, and direct, TUCL to deliver my Consumer Credit Information and Credit Products to the Company on my behalf. </li>
              <li className="font12 mb10 lineHeight20">I agree that my consent shall be stored by the Company on a permanent basis and shall be verifiable from time to time. I understand that the Company cannot access the Consumer Credit Information for more than 6 months on a single Consumer Consent and the same shall be required to be refreshed every six (6) months. Company can store the Consumer Credit Information only for (i) a limited time period of six months or (ii) till such time the credit information is required to be retained to satisfy the purpose for which it was provided or (iii) until I withdraw my consent to store such Consumer Credit Information, whichever is earlier and thereafter, the stored Consumer Credit Information shall be deleted, purged, expunged by the Company. </li>
              <li className="font12 mb10 lineHeight20">I shall not hold TUCL  responsible or liable for any loss, claim, liability, or damage of any kind resulting from, arising out of, or in any way related to: (a) delivery of my Consumer Credit Information and Credit Products to the Company ; (b) any use, modification or disclosure by the Company  of the contents, in whole or in part, of my Consumer Credit Information or Credit Products , whether authorized or not; (c) any breach of confidentiality or privacy in relation to delivery of my Consumer Credit Information  to the Company. </li>
              <li className="font12 mb10 lineHeight20">I acknowledge and accept that TUCL has not made any promises or representations to me in order to induce me to provide my Consumer Credit Information   or seek any consent or authorization in this regard. </li>
              <li className="font12 mb10 lineHeight20">I agree that I may be required to record my consent / provide  consent  electronically and in all such cases I understand that by clicking on the &quot;I Accept &quot; button below, I am providing &quot;written  consent &quot; to [COMPANY] authorizing [COMPANY] to obtain my Consumer Credit Information from my personal credit profile from TransUnion CIBIL LIMITED]. I further authorize [COMPANY] to obtain such information solely to confirm my identity and display my Consumer Credit Information to me.  Further in all such cases &quot;By checking this box and clicking on the &quot;Authorize button,  I agree to the terms and conditions, acknowledge receipt of TUCL privacy policy and agree to its terms, and confirm my  authorization for [COMPANY] to obtain my Consumer Credit Information and Credit Products.</li>
              <li className="font12 mb10 lineHeight20">I understand that in order to deliver the product to me, I hereby authorize [COMPANY], to obtain my Consumer Credit Information and Credit Products from TUCL. </li>
              <li className="font12 mb10 lineHeight20">By submitting this registration form, I understand that I am providing express written consent  for [COMPANY] to request and receive information about me from third parties, including but not limited to a copy of my consumer credit report and score from consumer reporting agencies, at any time for so long as I have an active [COMPANY] account. I further authorize [COMPANY] to retain a copy of my information for use in accordance with [COMPANY’S] Terms of Use and Privacy Policy.</li>
              <li className="font12 mb10 lineHeight20">I UNDERSTAND THAT THE PRODUCT IS PROVIDED ON AN “AS-IS”, “AS AVAILABLE” BASIS AND TUCL EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. </li>
              <li className="font12 mb10 lineHeight20">I shall not sue or otherwise make or present any demand or claim, and I irrevocably, unconditionally and entirely release, waive and forever discharge TUCL , its officers, directors, employees, agents, licensees, affiliates, successors and assigns, jointly and individually (hereinafter “Releasee”), from any and all manner of liabilities, claims, demands, losses, claims, suits, costs and expenses (including court costs and reasonable attorney fees) (“Losses”), whatsoever, in law or equity, whether known or unknown, which I ever had, now have, or in the future may have against the Releasee with respect to the submission of my Consumer Credit Information or Credit Products  and / or my decision to provide TUCL with the authority to deliver my Consumer Credit Information  and Credit Products to the Company . I agree to defend, indemnify, and hold harmless the Releasee from and against any and all Losses resulting from claims made against TUCL L by third parties arising from and in connection with this letter.</li>
              <li className="font12 mb10 lineHeight20">I agree that the terms of this confirmation letter shall be governed by the laws of India and shall be subject to the exclusive jurisdiction of the courts located in Mumbai in regard to any dispute arising hereof. TUCL is entitled to assign its rights hereunder to any third person without taking my prior written consent. </li>
            </ul>
            <p className="mb20">hereof. TUCL is entitled to assign its rights hereunder to any third person without taking my prior written consent.</p>
            <p className="mb20">
            Yours faithfully,<br/>
              Signature 	:____________________________<br/>
              Name	 	 :____________________________<br/>
              Address	 	 : ____________________________<br/>

              CC: 	[Name of Company]<br/>
              Address
            </p>
        </div>
      </form>
    </div>
  );
};
