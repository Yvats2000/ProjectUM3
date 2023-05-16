import React from 'react'
import { GoldRates } from '../../components/goldRate/';
import {goldCityPrice,cityMaster} from './../../services/goldSilver';
import { MetaHead, SchemaHead } from "../../components/shared";
import {getGeneralContent} from "../../services/blogs";
import moment from 'moment';
const GoldRate = ({goldPrice,cityList,cmsData}) => {
  const metaData = {
    "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `Today Gold Rate - 22 & 24 Carat Current Gold Price in India`,
    "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Gold Price Today - Get current gold rate in India as per 1 gram, 10 gram etc. Know about the latest trend and historical value of 18, 22 & 24 carat gold price.`,
    "url" : `${process.env.BASE_URL}/gold-rate`
  }
  const FaqArray = [];
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
          "categoires":"Gold",
          "country":"India",
          "Price": "₹ ${goldPrice[0].rate[0].twenty_two_k}",
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
          "name": "Gold Rate",
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
        <GoldRates showDropdown={true} cmsData={cmsData} data={goldPrice} cityList={cityList} pageType={'gold'}/>
    </>
  )
}
export async function getServerSideProps(context) {
  const goldPriceData = await goldCityPrice("gold/delhi");
  const genericUrl = 'gold-rate';
  const cmsData = await getGeneralContent(`${genericUrl}`);
  const cityList = await cityMaster();
  return { props: { goldPrice : goldPriceData, cityList:cityList,cmsData:cmsData } }
}
export default GoldRate;