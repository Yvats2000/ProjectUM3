import React from 'react'
import {goldCityPrice,cityMaster} from './../../../services/goldSilver';
import { GoldRatesCity } from '../../../components/goldRate/';
import { MetaHead, SchemaHead } from "../../../components/shared";
import {getGeneralContent} from "../../../services/blogs";
import moment from 'moment';
import commonFunctions from '../../../utils/CommonFunctions';
const GoldRateByCity = ({goldPrice,cityList,goldCity,cmsData}) => {
  const FaqArray = [];
  const metaData = {
    "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `Today Silver Rate in ${commonFunctions.capitalize(goldCity)} - 100 Gram & 1Kg Current Silver Price`,
    "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Today Silver Rate in ${commonFunctions.capitalize(goldCity)} - Get current silver price in ${commonFunctions.capitalize(goldCity)} as per 100 gram, 1Kg etc. Know about the latest trend and historical value of silver price in ${commonFunctions.capitalize(goldCity)}.`,
    "url" : `${process.env.BASE_URL}/silver-rate/${goldCity}`
  }
  const addJsonSchema = (question, answer) => {
    return `{
      "@type":"Question",
      "name":"${question.replace(/<[^>]*>?/gm, '')}",
      "acceptedAnswer":{"@type":"Answer",
      "text":"${answer.replace(/<[^>]*>?/gm, '')}"}
    }`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${metaData.url}",
        "name": "${metaData.title}",
        "headline": "${metaData.title}",
        "description": "${metaData.description}"
        }
        }`
    },
    {
      __html: `{
        "@context":"https://schema.org/",
          "@type":"Product",
          "image":"${process.env.IMAGE_BASEURL + '/images/logoBlack.svg'}",
          "name":"${metaData.title}",
          "description":"${metaData.description}",
          "url":"${metaData.url}",
          "categoires":"Silver",
          "cities":"${commonFunctions.capitalize(goldCity)}",
          "Price": "₹ ${goldPrice[0].rate[0].one_kilogram}",
          "sku":"UM",
          "mpn":"UM-${Math.floor(Math.random()*90000) + 1000000}",
          "aggregateRating": {
            "@type":"AggregateRating",
            "ratingValue":4.5,
            "bestRating":"5",
            "ratingCount":"4500"
        },"author": {
          "@type":"Organization",
          "name":"Urban Money"
      }
        }
        }`
    },
    {
      __html: `{
        "@context": "https://schema.org/", 
        "@type": "BreadcrumbList", 
        "itemListElement": [{
          "@type": "ListItem", 
          "position": 1, 
          "name": "Home",
          "item": "${process.env.BASE_URL}"  
        },{
          "@type": "ListItem", 
          "position": 2, 
          "name": "Silver Rate",
          "item": "${process.env.BASE_URL}"
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "Silver Rate in ${goldCity}",
          "item": "${metaData.url}"
        }]
      }`
    }
  ]
  cmsData && cmsData.length && cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer))));
  const addfaqSchema = () => {
    return {
        __html: `{
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[${FaqArray}]
        }`
    }
    }
    FaqArray.length > 0 && schemaData.push(addfaqSchema());
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} />
      <GoldRatesCity showDropdown={false} cmsData={cmsData} goldCity={goldCity} cityList={cityList} pageType={'silver'} data = {goldPrice}/>
    </>
  )
}
export async function getServerSideProps(context) {
  const goldCity = context.params.city;
  const goldPriceData = await goldCityPrice(`silver/${goldCity}`);
  const genericUrl = `silver-rate/${goldCity}`;
  const cmsData = await getGeneralContent(`${genericUrl}`);
  const cityList = await cityMaster();
  return { props: { goldPrice : goldPriceData,cityList:cityList,goldCity:goldCity,cmsData:cmsData } }
}
export default GoldRateByCity