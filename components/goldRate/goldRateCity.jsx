import React from 'react'
import styles from './gold&silver.module.css';
import { GoldTopSection } from './goldTopSection/';
import {NearcityList} from './nearByCity';
import { RightSideBar,FAQ, BreadCrumb } from '../shared'
import { GoldPricePerGram,SilverPricePerGram } from './goldPricePerGram';
import cmsStyles from "../shared/CmsContent/CmsContent.module.css";
import commonFunctions from '../../utils/CommonFunctions';
import { LastTenDays } from './cityTable';
export const GoldRatesCity = ({data,cityList,goldCity,pageType,cmsData}) => {
  const pageName = (pageType == 'silver' ? `Silver Rate`: `Gold Rate`);
  const pageUrl = (pageType == 'silver' ? `silver-rate`: `gold-rate`);
  const sideBarName = (pageType == 'silver' ? `Gold Rate`: `Silver Rate`);
  const sideBarUrl = (pageType == 'silver' ? `/gold-rate`: `/silver-rate`);
  const breadCrumbLinks = [
    {
      "text": pageName,
      "path": "/"+pageUrl,
      "class": ""
    },
    {
      "text": goldCity?commonFunctions.capitalize(goldCity):'India',
      "path": "/",
      "class": ""
    }
  ]
  const topCity = [
    {"slug" : "delhi"},
    {"slug" : "bangalore"},
    {"slug" : "chennai"},
    {"slug" : "mumbai"},
    {"slug" :"kolkata"},
    {"slug" :"hyderabad"},
    {"slug" :"pune"},
    {"slug" : "gurgaon"},
    {"slug" :"surat"},
    {"slug" :"coimbatore"}
  ];
  const internalLinkEmiCalculator = [
    {
      "text":"",
      "child":[
        {
          "text":`Today ${sideBarName}`,
          "path":`${sideBarUrl}`
        }
      ]
    },
    {
      "text": "Check Eligibility",
      "child": [
        {
          "text": `Home Loan Eligibility Calculator`,
          "path": `/loans/home-loan/eligibility-calculator`
        },
        {
          "text": `Personal Loan Eligibility Calculator`,
          "path": `/loans/personal-loan/eligibility-calculator`
        }
      ]
    },
    {
      "text": "Top 10 Banks",
      "child": [
        {
          "text": "CITI Bank",
          "path": "/banks-in-india/citi-bank"
        },
        {
          "text": "RBL Bank",
          "path": "/banks-in-india/rbl-bank"
        },
        {
          "text": "Bank of Baroda",
          "path": "/banks-in-india/bank-of-baroda"
        },
        {
          "text": "Canara Bank",
          "path": "/banks-in-india/canara-bank"
        },
        {
          "text": "Bajaj Finserv",
          "path": "/banks-in-india/bajaj-finserv"
        },
        {
          "text": "Yes Bank",
          "path": "/banks-in-india/yes-bank"
        },
        {
          "text": "Deutsche Bank",
          "path": "/banks-in-india/deutsche-bank"
        },
        {
          "text": "IDFC FIRST Bank",
          "path": "/banks-in-india/idfc-first-bank"
        },
        {
          "text": "DCB Bank",
          "path": "/banks-in-india/dcb-bank"
        },
        {
          "text": "Kotak Bank",
          "path": "/banks-in-india/kotak-bank"
        }
      ]
    }
  ]
  const topTen = cityList.filter(({ slug: id1 }) => topCity.some(({ slug: id2 }) => id2 === id1));
  const cityListOther = cityList.filter(({ slug: id1 }) => !topCity.some(({ slug: id2 }) => id2 === id1));
  return (
    <div className={styles.tableSection}>
        <div className="container">
          <BreadCrumb links={breadCrumbLinks} />
            <h1 className="font24 mb40 text2828  Innerheading">{pageType=='silver'?`Silver Rate in ${goldCity?commonFunctions.capitalize(goldCity):'India'}`:`Gold Rate in ${goldCity?commonFunctions.capitalize(goldCity):'India'}`}</h1>
            {cmsData && cmsData.length>0 ?
            <div className="font14 short_description text444 mb30 lineHeight24" dangerouslySetInnerHTML={{__html:cmsData.length > 0 && cmsData[0].short_description ? cmsData[0].short_description : ''}}></div>
             :pageType == 'silver' ? 
            <p className="font14 textBlack lineHeight24 mb15">Check out todays silver rate in {commonFunctions.capitalize(goldCity)}. Compare 10 gram and
                1 Kg silver prices in {commonFunctions.capitalize(goldCity)} & get the best value for your money.</p> :
            <p className="font14 textBlack lineHeight24 mb15">Check out todays gold rate in {commonFunctions.capitalize(goldCity)}. Compare 22-carat and
                24-carat gold prices per gram in {commonFunctions.capitalize(goldCity)} & get the best value for your money.</p>}

            <GoldTopSection mergeCity={true} topTen={topTen} cityListOther={cityListOther} data={data} pageType={pageType} goldCity={goldCity} cityList={cityList} showTabs={true} shoDate={true}/>
            <div className={styles.pricelistDetails}>
              <div className={styles.listingTable}>
              
               {pageType=='silver'?
               <>
                <LastTenDays data={data} pageType={pageType} heading={`${pageType=='silver'?'Silver Rate in India for Last 10 Days':'Gold Rate in India for Last 10 Days (10 g)'}`}/>
                
               </>
               :
               <>
                <GoldPricePerGram data={data} type={24} goldCity={goldCity?commonFunctions.capitalize(goldCity):'Delhi'} />
                <GoldPricePerGram data={data} type={22} goldCity={goldCity?commonFunctions.capitalize(goldCity):'Delhi'} />
               </>}
               <SilverPricePerGram data={topTen} pageType={pageType} heading={`Today ${pageType=='silver'?'Silver':'Gold'} Rate of Metro Cities in India`}/>
               {pageType == 'silver' && <SilverPricePerGram data={cityList} pageType={pageType} heading={'Today Silver Rate of Other Cities in India'}/>}
               {cmsData && cmsData.length>0 && <div className="container containerFlex">
                  <section className={cmsStyles.eligible}>
                      <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
                  </section>
                </div>}
              </div>
              <div className={styles.sibeBar}>
                <RightSideBar menuLinks = {internalLinkEmiCalculator} mgTop={false} />
                <NearcityList cityList={topTen} pageType={pageType} heading={`Today ${pageType=='silver'?'Silver':'Gold'} Rate of Metro Cities in India`}/>
                <NearcityList cityList={cityListOther} pageType={pageType} heading={`Today ${pageType=='silver'?'Silver':'Gold'} Rate of Other Cities in India`}/>
              </div>
            </div>
        </div>
        {cmsData && cmsData.length>0 &&
          <>
          {cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
          <section className="faq">
            <div className="container">
              <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
              <div className="faqBx">
                <FAQ data={cmsData[0].faq_content}  />
              </div>
            </div>
          </section>
          :null}
          </>}
      </div>
    
  )
}
