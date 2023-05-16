import React from 'react'
import { GoldRates } from '../../components/goldRate/';
import {goldCityPrice,cityMaster} from './../../services/goldSilver';
import { MetaHead, SchemaHead } from "../../components/shared";
import {getGeneralContent} from "../../services/blogs";
import moment from 'moment';
const SilverRate = ({goldPrice,cityList,cmsData}) => {
  console.log(goldPrice, 'goldPrice');
  console.log(cityList, 'cityList');
  const metaData = {
    "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `Today Silver Rate - 100 Gram & 1Kg Current Silver Price in India `,
    "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Silver Rate Today - Get current silver price in India as per 10 gram, 100 gram 1KG etc. Know about the latest trend and historical value of silver price today.`,
    "url" : `${process.env.BASE_URL}/silver-rate`
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
          "categoires":"Silver",
          "country":"India",
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
        <GoldRates showDropdown={true} cmsData={cmsData} data={goldPrice} cityList={cityList} pageType={'silver'}/>
    </>
  )
}
export async function getServerSideProps(context) {
  const goldPriceData = await goldCityPrice("silver/delhi");
  const genericUrl = 'silver-rate';
  const cmsData = await getGeneralContent(`${genericUrl}`);
  const cityList = await cityMaster();
  return { props: { goldPrice : goldPriceData, cityList:cityList,cmsData:cmsData } }
}
export default SilverRate;