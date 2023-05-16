import React from 'react'
import styles from './gold&silver.module.css';
import { GoldTopSection } from './goldTopSection/';
import {NearcityList} from './nearByCity';
import { CitySelect } from './citySelect';
import { CityTable,LastTenDays } from './cityTable';
import { RightSideBar,FAQ, BreadCrumb } from '../shared'
import { SilverPricePerGram,GoldPriceToday } from './goldPricePerGram';
import cmsStyles from "../shared/CmsContent/CmsContent.module.css";
export const GoldRates = ({data,cityList,pageType,cmsData,goldCity=''}) => {
  const pageName = (pageType == 'silver' ? `Silver Rate`: `Gold Rate`);
  const pageUrl = (pageType == 'silver' ? `silver-rate`: `gold-rate`);
  const sideBarName = (pageType == 'silver' ? `Gold Rate`: `Silver Rate`);
  const sideBarUrl = (pageType == 'silver' ? `/gold-rate`: `/silver-rate`);
  const breadCrumbLinks = [
    {
      "text": pageName,
      "path": "/"+ pageUrl,
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
  const topTen = cityList.filter(({ slug: id1 }) => topCity.some(({ slug: id2 }) => id2 === id1));
  const cityListOther = cityList.filter(({ slug: id1 }) => !topCity.some(({ slug: id2 }) => id2 === id1));
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
  return (
    <>
    <div className={styles.tableSection}>
        <div className="container">
        <BreadCrumb links={breadCrumbLinks} />
            <h1 className="font24 mb40 text2828  Innerheading">{pageType=='silver'?'Silver':'Gold'} Price in India</h1>
            {cmsData && cmsData.length>0 ?
            <div className="font14 short_description text444 mb30 lineHeight24" dangerouslySetInnerHTML={{__html:cmsData.length > 0 && cmsData[0].short_description ? cmsData[0].short_description : ''}}></div>
             :
             pageType=='silver'?<p className="font14 textBlack lineHeight24 mb15">Check out todays silver rate in Delhi. Compare 1 gram and
                1 Kg silver prices in Delhi & get the best value for your money.</p>:
            <p className="font14 textBlack lineHeight24 mb15">Check out todays gold rate in Delhi. Compare 22-carat and
                24-carat gold prices per gram in Delhi & get the best value for your money.</p>}
            <GoldTopSection data={data} pageType={pageType} cityList={cityList} shoDate={false}/>
            <div className={styles.pricelistDetails}>
              <div className={styles.listingTable}>
                <h2 className="font24 mb20 text2828"> Today {pageType=='silver'?'Silver':'Gold'} Rate in Different Cities of India</h2>
                <CitySelect mergeCity={true} topTen={topTen} cityListOther={cityListOther} cityList={cityList}/>
                {pageType=='silver'?
                  <>
                    <LastTenDays data={data} pageType={pageType} heading={`${pageType=='silver'?'Silver Rate in India for Last 10 Days':'Gold Rate in India for Last 10 Days (10 g)'}`}/>
                    <SilverPricePerGram data={topTen} pageType={pageType} heading={`Today ${pageType=='silver'?'Silver':'Gold'} Rate of Metro Cities in India`}/>
                    <SilverPricePerGram data={cityListOther} pageType={pageType} heading={`Today ${pageType=='silver'?'Silver':'Gold'} Rate of Other Cities in India`}/>
                    
                  </>: 
                  <>
                    <GoldPriceToday data={data} goldCity={goldCity?commonFunctions.capitalize(goldCity):'India'} />
                    <LastTenDays data={data} pageType={pageType} heading={`Today ${pageType=='silver'?'Silver Rate in India for Last 10 Days':'Gold Rate in India for Last 10 Days (10 g)'}`}/>
                    <CityTable data={topTen} pageType={pageType} heading={`${pageType=='silver'?'Silver':'Gold'} Rate of Metro Cities in India`}/>
                    <CityTable data={cityListOther} pageType={pageType} heading={`Today ${pageType=='silver'?'Silver':'Gold'} Rate of Other Cities in India`}/>
                    
                  </>
                  }
                  {cmsData && cmsData.length>0 &&
                  <>
                  <div className="container containerFlex">
                    <section className={cmsStyles.eligible}>
                      <div className="container">
                        <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
                      </div>
                    </section>
                  </div>
                  </>}
                {/* <LastTenDays data={data}/> */}
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
    </>
  )
}
