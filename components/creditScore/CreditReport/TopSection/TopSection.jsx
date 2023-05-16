import styles from "./TopSection.module.css"
import moment from 'moment'
import React from 'react';
import dynamic from 'next/dynamic';
import {downloadCreditReport} from './../../../../services/creditScore';
import { decrypt_object } from "../../../../helpers/Base64Encode";
const ReactSpeedometer = dynamic(
  () => import('react-d3-speedometer'),
  { ssr: false },
);



import Link from 'next/link';
const colorHeading = (score) => {
    if (300 <= score && score <= 579) {
        return("Poor");
      }
      if (580 <= score && score <= 669) {
        return("Fair");
      }
      if (670 <= score && score <= 739) {
        return("Good");
      }
      if (740 <= score && score <= 799) {
        return("VeryGood");
      }
      if (800 <= score) {
        return("Excellent");
      }
}
const creditScroreText = (score) => {
    if (300 <= score && score <= 579) {
        return("Your credit score is below the minimum requirement for a credit line. This demonstrates to the lenders that you are a risky borrower. Most lenders and NBFCs might hesitate to lend money to you.");
      }
      if (580 <= score && score <= 669) {
        return("You are just a few steps away from a good credit score. There are a few steps you can take to improve your credit score and become eligible for loans and credit cards from most lenders.");
      }
      if (670 <= score && score <= 739) {
        return(" You are just above the minimum credit score requirement for a credit line. Lenders will easily approve your loan or credit card applications. You can always improve your credit score by taking a few extra steps.");
      }
      if (740 <= score && score <= 799) {
        return("You are at a healthy credit score range. Most  lenders will view you as a dependable borrower. You are eligible for exclusive pre approved loans and valuable credit card plans.");
      }
      if (800 <= score) {
        return("Your credit score exhibits excellent credit history and repayment capacity. You are viewed as a reliable borrower with minimal credit risk. Any lender will be happy to help with your financial needs.");
      }
}

export const TopSection = ({ creditData,autoToken }) => {
  const downLoadReport =async ()=>{
    let respon = await downloadCreditReport(autoToken);
    if(respon.status === 200){
        let object = decrypt_object(respon.data.api_response, 'Object');
        window.open(object.filePath, '_blank')
    }
  }
  return (
      <>
        <section className={styles.topSection}>
          {/* <img
            src="/assets/images/experian.png"
            className={`imgResponsive mb30 ${styles.TopLogo}`}
          alt=""
          
          /> */}
            <div className={`${styles.personDetails} mb30`}>
                <div className="personName">
                <h2 className="font22 text454ec2 fontMedium mb10">
                  Hey, {creditData.applicantDetails.firstName || ''}! Here is Your {process.env.CREDIT_SCORE_VENDOR === '2' ?'Credit':process.env.CREDIT_SCORE_VENDOR === '3'?'CIBIL':null} Score.
                </h2>
                <p className="font14 text777">
                          Last Fetched on: <span className="text444">{moment(creditData.summary.latestFetchedOn).format('ll') || ''}</span>
                </p>
                </div>
                <button className="btn btn-primary textCenterSm btn25 font14" onClick={()=>downLoadReport()}>
                Download Report <em className="download"></em>
                </button>
            </div>
            <div className={styles.basicDetail}>
                <div className={styles.basicDetailContent}>
                  <h2 className="font16 fontsemiBold mb15">
                      What does 
                      <span className={`fontsemiBold ${colorHeading(creditData.summary.creditScore)} `}> {creditData.summary.status}</span> credit
                      score mean?
                  </h2>
                  <p className="font14 lineHeight24">
                  {creditScroreText(creditData.summary.creditScore) || ''}
                  </p>
                  <div className={styles.creditFactors}>
                      <div className={styles.impscore}>
                        <figure>
                            <img
                            src="/assets/images/factors-icon.svg"
                            className="imgResponsive"
                            alt="Urban Money"
                            
                            />
                        </figure>
                        <div className="creditFactorText">
                            <a href="#creditFactor">
                                <a><h3 className="font16 text181b30 fontsemiBold mb5">
                                See details that impact your score
                                </h3>
                                <p className="textLink font12">Check Score Factors</p></a>
                            </a>
                        </div>
                      </div>
                      <img src="/assets/images/ic-dropdown-blue-copy-2.svg" alt="Urban Money"/>
                  </div>
                </div>
                {creditData.summary.creditScore < 300 && <div className={styles.noHistory}>NH<br/>(No-History)</div>}
                <div className={styles.basicDetailImg}>
                  {creditData.summary.creditScore >= 300?
                    <div className={styles.dmeter}>
                        <ReactSpeedometer
                          fluidWidth={true}
                          forceRender={true}
                          ringWidth={30}
                          needleTransitionDuration={3333}
                          needleTransition="easeElastic"
                          needleColor="black"
                          needleHeightRatio={0.7}
                          maxSegmentLabels={6}
                          segments={3}
                          minValue={300}
                          maxValue={900}
                          customSegmentStops={[300, 580, 670, 740, 800, 900]}
                          segmentColors={["#DD412E","#E3863A","#DFB42A","#96C16C","#159839"]}
                          value={creditData.summary.creditScore || 333}
                          paddingVertical={15}
                          valueTextFontSize={25}
                        />
                    </div>
                  :
                  <div>
                    <h2 className="mb10">Where is my CIBIL Score</h2>
                    <p className="font14 lineHeight16 mb15">You may not be eligible for a CIBIL Score because of any of the following reasons:</p>
                    <ul className={styles.notFound}>
                      <li> You have a credit card or loan account, but no credit activity in the last three years.</li>
                      <li> Lenders may have made enquiries, but you do not have any credit activity.</li>
                      <li> You only have add-on credit cards, and no credit exposure.</li>
                    </ul>
                  </div>
                
                }
                    
                </div>
            </div>
        </section>
      </>
  )
}
