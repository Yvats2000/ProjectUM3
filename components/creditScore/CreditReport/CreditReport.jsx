import { SideBar } from "../SideBar";
import { BreadCrumb } from "../../shared";
import styles from "./../CreditReport.module.css"
import { TopSection } from "./TopSection";
import { PersonalizedOffers } from "./PersonalizedOffers/PersonalizedOffers";
import { CreditFactors } from "./CreditFactors";
import { getCreditReport } from "../../../services/creditScore";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Router from 'next/router';
import { decrypt_object } from "../../../helpers/Base64Encode";
export const CreditReport = ({autoToken,userCardList}) => {
  const [creditData, setcreditData] = useState();
  useEffect(()=>{
    const crditData = async () => {
      if (autoToken) {
        const respon = await getCreditReport(autoToken);
        if (respon.status === 200) {
          let encodeData = decrypt_object(respon.data.api_response, 'Object');
          setcreditData(encodeData);
        } else {
          Router.push('/credit-score')
        }
      } else {
        Router.push('/credit-score');
      }
    }
    crditData()
  }, []);
  const breadCrumbLinks = [
    {
      "text": "Credit Score",
      "path": "/credit-score",
      "class": ""
    },
    {
      "text": "CIBIL Report",
      "path": "",
      "class": ""
    }
  ]
  return (
    <>
    <div className="container">
      <BreadCrumb links={ breadCrumbLinks } />
    </div>
      <div className="creditReport container">
        <div className={styles.creditReport}>
          <SideBar userCardList={userCardList}/>
          <div className={styles.reportDetails}>
            {creditData && Object.keys(creditData).length > 0 ?<>
            <TopSection creditData={creditData} autoToken={autoToken}/>
            <CreditFactors creditData={ creditData}/>
            {/* <PersonalizedOffers /> */}
            </>:null}
          </div>
        </div>
        {process.env.CREDIT_SCORE_VENDOR === '3' ?<figure className="dlfex justifyEnd mb30"><Image className="imgResponsive mb35" width={65} height={44} src="/assets/images/cibil-logo.png" alt=""/></figure>:process.env.CREDIT_SCORE_VENDOR === '3'?'CIBIL':null}
    </div>
    </>
  );
}
