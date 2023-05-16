import React, {useState} from 'react';
import {FAQ,BreadCrumb,BankFundList,FundTable, CreditScore} from '../../shared';
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import {KeyInformation,FundManager,CloserLook} from './'
import styles from "./bankAmcDetails.module.css";
import { MutualFundsTopSearch } from '../mutualFundsTopSearch/mutualFundsTopSearch';

export const BankAmcDetails = ({cmsData,amcName,amcUrl,amcList, amcData}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(0);
  const breadCrumbLinks = [
    {   
      "text": `Mutual Funds`,
      "path": `/mutual-funds`, 
      "class": ""
    },
    {   
      "text": `AMC`,
      "path": `/mutual-funds/amc`, 
      "class": ""
    },
    {   
      "text": `${amcName}`,
      "path": `/mutual-funds/${amcUrl}`, 
      "class": ""
    }
  ];
  return (
    <>
      <div className="container">
        <div className="breadCrumb">
          <BreadCrumb links={breadCrumbLinks}/>
        </div>
       </div>
      <MutualFundsTopSearch breadCrumbLinks={breadCrumbLinks} titleText={amcList && amcList.data && amcList.data.length > 0 ? amcList.data[0].fund : amcName} short_description={cmsData && cmsData[0] && cmsData[0].short_description ? cmsData[0].short_description : ''}/>
      <section className={`${styles.section} ${styles.bgFund}`}>
        <div className="container">
          <div className={styles.mutualFund}>
            <BankFundList amcBank={amcList.data} />
            <FundTable amcUrl={amcUrl} data={amcData} showTabs={true} currentActiveTab={currentActiveTab} setCurrentActiveTab={setCurrentActiveTab} />
          </div>
        </div>
      </section>
      {amcData.amcKeyInformation && <KeyInformation data={amcData && amcData.amcKeyInformation} />}
      {amcData.amcFundManager.length > 0 && <FundManager managersData={amcData && amcData.amcFundManager}/>}
      <CloserLook data={amcData && amcData.data[currentActiveTab]}/>
      {cmsData && cmsData[0] &&
      <section className={`${cmsStyles.eligible} mb50`}>
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt15"></div>  
        </div>
      </section>
      }
      <CreditScore />
      {cmsData && cmsData.length>0 && cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
      <section className="faq">
        <div className="container">
          <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
          <div className="faqBx">
            <FAQ data={cmsData[0].faq_content}  />
          </div>
        </div>
      </section>
      :null}
    </>
  )
}
