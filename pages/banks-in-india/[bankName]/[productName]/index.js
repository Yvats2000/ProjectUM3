import { Product } from "../../../../components/banksInIndia";
import {getCategoryBlog, getBankProductContent, getGeneralCalculator} from "../../../../services/blogs";
import {getBankProductDetails} from "../../../../services/banksInIndia";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import { useRouter } from 'next/router';
import {getIfscMaster} from "../../../../services/banksInIndia";
import { getMaster } from "../../../../services/master";
import commonFunctions from './../../../../utils/CommonFunctions';

const dateWithMonthsDelay = (months) => {  
  const date = new Date()
  date.setMonth(date.getMonth() + months)
  return date
}
const BankProduct = ({bankProductData, cmsData ,blogsData, rightNavBar, interLinkingData, attributeData, bankProducts}) => {
  const router = useRouter()
  const bankName = router.query.bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const productName = router.query.productName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : `${bankName} ${productName} - Check Loan Eligibility and Apply Online`,
    "description" : `${bankName} ${productName} - Check eligibility criteria, documents required, fees and charges, application process, Loan Amount/Tenure and lot more`,
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/${router.query.productName}`
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
  cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.content.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer))))
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/${router.query.productName}",
        "name": "${bankName} ${productName}",
        "headline": "${bankName} ${productName} @<ROI>% - Check Eligibility & EMI",
        "description": "${bankName} ${productName} Loan Interest Rates - Check Eligibility Criteria, Documentions Required, Application Process, Bank Fees & Charges, Loan Amount/Tenure and lot more"
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
          "name": "Banks In India",
          "item": "${process.env.BASE_URL}/banks-in-india"  
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "${bankProductData && bankProductData[0] ? bankProductData[0].plans[0].lenderName : ""}",
          "item": "${process.env.BASE_URL}/banks-in-india/${bankProductData && bankProductData[0] ? bankProductData[0].plans[0].lenderSlug : ""}"  
        },{
          "@type": "ListItem", 
          "position": 4, 
          "name": "${bankProductData && bankProductData[0] ? bankProductData[0].productName : ""}",
          "item": "${process.env.BASE_URL}/banks-in-india/${bankProductData && bankProductData[0] ? bankProductData[0].plans[0].lenderSlug : ""}/${bankProductData && bankProductData[0] ? bankProductData[0].productSlug : ""}"  
        }]
      }`
    },
    {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${metaData.title}",
        "url": "${metaData.url}",
        "image": "${process.env.IMAGE_BASEURL + '/banklogo/' + (bankProductData && bankProductData[0] ? bankProductData[0].plans[0].lenderLogo : '')}",
        "description": "${metaData.description}",
        "sku": "UM",
        "mpn": "${Math.floor(Math.random()*90000) + 1000000}",
        "aggregateRating": {
          "@type":"AggregateRating",
          "ratingValue":4.5,
          "bestRating":"5",
          "ratingCount":"2500"
         },
         "author": {
          "@type":"Organization",
          "name":"Urban Money"
        }
      }`
    },
  ]
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
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <Product data={bankProductData} cmsData={cmsData} bankName={router.query.bankName} interLinkingData={interLinkingData} blogsData={blogsData} productName={productName} attributeData={attributeData} bankProducts={bankProducts} rightNavBar={rightNavBar}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const productName = context.params.productName;
  const bankProductData = await getBankProductDetails(bankName, productName);
  const blogsData = await getCategoryBlog(productName);
  const cmsData = await getBankProductContent(bankName, productName);
  const interLinkingData = await getGeneralCalculator(bankName);
  const attributeData = await getIfscMaster(`branch/${bankName}`);
  const bankProducts = await getMaster("bank_products");
  if (bankProductData && Object.keys(bankProductData).length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { bankProductData : bankProductData , cmsData : cmsData, interLinkingData : interLinkingData, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], attributeData:{attributeData}, bankProducts:{bankProducts} } }
}
export default BankProduct;
