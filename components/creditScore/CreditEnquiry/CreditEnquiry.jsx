
import React, { useState,useEffect } from "react";
import { SideBar } from "../SideBar";
import { BreadCrumb } from "../../shared";
import { BtnTabs } from "../../shared";
import styles from "./../CreditReport.module.css";
import { CreditEnquiryImpact } from './PaymentHistory/';
import { BankList } from "./PaymentHistory/BankList";
import { CardUtilisation, UtilisationList } from './CreditCardUtilisation';
import { CreditCardImpact } from './CreditHistory';
import { CreditCardList } from "./CreditHistory";
import { AccountList } from './TotalAccounts';
import { ActiveAccount } from "./TotalAccounts";
import { CreditEnquires } from "./CreditEnquires";
import { CreditEnquiresList } from "./CreditEnquires/";
import { useRouter } from 'next/router'
import { getCreditReport } from "../../../services/creditScore";
import { decrypt_object } from "../../../helpers/Base64Encode";
import Image from "next/image";
export const CreditEnquiry = ({autoToken,userCardList}) => {
  const [creditData, setcreditData] = useState();
  const router = useRouter()
  useEffect(()=>{
    const crditData = async () => {
      if (autoToken) {
        const respon = await getCreditReport(autoToken);
        if (respon.status === 403) {
          router.push('/credit-score');
        } else {
          let encodeData = decrypt_object(respon.data.api_response, 'Object');
          setcreditData(encodeData);
        }
        
      } else {
        router.push('/credit-score');
      }
    }
    crditData()
  }, []);
  
  const [currentTabs, setcurrentTab] = useState(router.query ? Object.keys(router.query)[0] : 'paymentHistory');
  const breadCrumbLinks = [
    {
      "text": "Credit Score",
      "path": "/credit-score",
      "class": ""
    },
    {
      "text": "Credit Enquiry",
      "path": "",
      "class": ""
    }
  ]
  const currentTab = (tab) => {
    setcurrentTab(tab);
  }
  const allTabs = () => {
    switch (currentTabs) {
      case 'paymentHistory':
        return (<><CreditEnquiryImpact paymentHistory={creditData.paymentHistory} />
          <h2 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36">Loan</h2>
          <BankList historyLoan={creditData.paymentHistory.payments} /></>);
      case 'CreditCardUtilisation':
        return (<>
          <CardUtilisation CardUtilis={creditData.creditCardUtilisation} />
          <UtilisationList CardList={creditData.creditCardUtilisation.creditCards} />
        </>);
      case 'CreditHistory':
        return (<>
          <CreditCardImpact creditHistory={creditData.creditHistory} />
          <CreditCardList creditCard={creditData.creditHistory.credits} />
        </>);
      case 'TotalAccounts':
        return (<>
          <AccountList AccountStatus={creditData.totalAccounts} />
          <h2 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36">Account List</h2>
          <ActiveAccount accList={creditData.totalAccounts.accounts}/>
        </>)
      case 'CreditEnquiries':
        return (<>
          <CreditEnquires enquireList={creditData.creditEnquiries} />
          <CreditEnquiresList enquiryTypeList={creditData.creditEnquiries.credits} />
        </>);
      default:
        return(<><CreditEnquiryImpact paymentHistory={creditData.paymentHistory} />
        <h2 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36">Loan</h2>
        <BankList historyLoan={creditData.paymentHistory.payments} /></>)
    }
    
  }
  return (
    <>
      <div className="container">
        <BreadCrumb links={ breadCrumbLinks } />
      </div>
      <div className="creditReport container">
        <div className={styles.creditReport}>
          <SideBar userCardList={userCardList} />
          <div className={styles.reportDetails}>
            <BtnTabs currentTab={currentTab} currentTabs={currentTabs} />
            {creditData && Object.keys(creditData).length > 0 ?allTabs():null}
          </div>
        </div>
        {process.env.CREDIT_SCORE_VENDOR === '3' ?<figure className="dlfex justifyEnd mb30"><Image className="imgResponsive mb35" width={65} height={44} src="/assets/images/cibil-logo.png" alt=""/></figure>:process.env.CREDIT_SCORE_VENDOR === '3'?'CIBIL':null}
    </div>
    </>
  );
}
