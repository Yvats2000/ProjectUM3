import { useState } from "react";
import { FAQ, BreadCrumb, RightSideBar } from "../shared";
import Image from "next/image";
import styles from "../shared/CmsContent/CmsContent.module.css";
import TopAmc from '../../data/top10Amc.json'

export function Content({cmsData, breadCrumbs, interLinkingData, pageUrl, rightNavBar}) {
  const pageName = pageUrl.split('/')[1]; 
  const category = pageUrl.split('/')[0]; 
  const catName = pageUrl.split('/')[0].split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  
  //Articles based upon category box
  let interLinkingDataArray = {"text": 'About ' + catName,"child": []};
  if(category != 'calculator'){
    interLinkingData && interLinkingData.filter(item => item.path != null && item.path != pageName).map((data) => interLinkingDataArray.child.push({"text": data.post_title,"path": "/" + `${pageUrl.split('/')[0]}` + "/" + data.path}));
  }
  // Loans interlink Box
  let interLinkingLoanDataArray = {"text": "Loans","child": []};
  let loans = rightNavBar.filter((data) =>  data.text === "Loan").map(data => data.child.map((item)=> interLinkingLoanDataArray.child.push({"text": item.text,"path": item.path})))
  //Investment options box
  let interLinkingInvestmentArray = {"text": "Investment","child": []};
  let investment = rightNavBar.filter((data) =>  data.text === "Investment").map(data => data.child.map((item)=> interLinkingInvestmentArray.child.push({"text": item.text,"path": item.path})))
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
    TopAmc,
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
  interLinkingInvestmentArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingInvestmentArray);
  interLinkingLoanDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingLoanDataArray);
  interLinkingDataArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingDataArray);
  
  if (!cmsData || cmsData.length == 0 || Object.keys(cmsData).length === 0)
  return null;
  const breadCrumbLinks = [];
  breadCrumbs.map((url) => breadCrumbLinks.push({"text": url.name,"path": '/'+url.path,"class": ""}));
   return (
    <>
    <div className="container">	
      <BreadCrumb links={breadCrumbLinks} />
    </div>
      <div className='container containerFlex'>
    <section className={styles.eligible}>
      <div className="container">
        <h1 className="font24 fontMedium text181d Innerheading mb40 lineHeight36">{cmsData[0].post_title || ''}</h1>
        <div className={styles.genericBanner}>
          {cmsData[0].post_thumbnail?<Image className="imgResponsive" src={cmsData[0].post_thumbnail} layout='responsive' width={1200} height={600} alt={cmsData[0].post_title}/>:null}
        </div>
        
        <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
      </div>
    </section>
        <RightSideBar menuLinks={internalLinkEmiCalculator} paddingTop={ true} />
      </div>
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
    </>
  );
}
