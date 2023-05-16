
import {CreditScore,BreadCrumb, FAQ} from "../../shared";
import React, { useState } from "react";
import { RightSideBar } from '../../shared'
import { MutualFundCalculator } from "./MutualFundCalculator";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import { useRouter } from 'next/router';

export const MutualFundHome = ({cmsData,rightNavBar}) => {
  const router = useRouter()
  const calName = router.asPath
  const renderName = calName.split('/')[2].split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())

  //Financial calculators Box
  let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))
  
  const internalLinkEmiCalculator = [
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
  interLinkingFinancialArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingFinancialArray);
  const breadCrumbLinks = [
    {   
      "text": "Calculators",
      "path": "/calculator", 
      "class": ""
    },
    {   
      "text": renderName,
      "path": calName, 
      "class": ""
    }
  ]

return (
    <>
    <div className="container"> 
      <div className="breadCrumb">
      <BreadCrumb links={breadCrumbLinks} />
    </div>
    <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36">{renderName}</h1>
    {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
    </div>
    
    <MutualFundCalculator />
    {cmsData.length>0 &&
    <>
    <div className="container containerFlex">
      <section className={cmsStyles.eligible}>
        <div className="container">
          <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
        </div>
      </section>
      <RightSideBar menuLinks={internalLinkEmiCalculator} paddingTop={true} />
    </div>
    <CreditScore />
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
  </> 
)}