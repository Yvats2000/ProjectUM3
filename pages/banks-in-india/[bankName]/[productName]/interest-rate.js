import { BankInterestRate } from "../../../../components/banksInIndia/InterestRate";
import {getLatestBlog, getGeneralCalculator, ProductInterestRateContent} from "../../../../services/blogs";
import {getBankProductDetails} from "../../../../services/banksInIndia";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import { useRouter } from 'next/router';
import {getIfscMaster} from "../../../../services/banksInIndia";
import { getMaster } from "../../../../services/master";
import { getLoanType } from "../../../../services/loans";
import commonFunctions from './../../../../utils/CommonFunctions';
const ProductInterestRate = ({productLoanData,bankProductData, cmsData ,blogsData, rightNavBar, interLinkingData, attributeData, bankProducts, bankCalculators}) => {
  const router = useRouter()
  const bankName = router.query.bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const productName = router.query.productName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `${bankName} ${productName} Interest Rate - Current ${productName} Interest Rate 2023`,
    "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `${bankName} ${productName} Interest Rate start at 6.5. Check Current ${productName} interest rate of ${bankName}, calculate EMI & apply Now!`,
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/${router.query.productName}/interest-rate`
  }
  const FaqArray = [];
  const addFaqJson = (question, answer) => {
    return `{
      "@type":"Question",
      "name":"${question.replace(/<[^>]*>?/gm, '')}",
      "acceptedAnswer":{"@type":"Answer",
      "text":"${answer.replace(/<[^>]*>?/gm, '')}"}
    }`
  } 
  cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addFaqJson(faqs.question,faqs.answer))))
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
        },
        {
          "@type": "ListItem", 
          "position": 5, 
          "name": "Interest Rate",
          "item": "${metaData.url}"  
        }]
      }`
    }
  ];
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
      <BankInterestRate data={bankProductData} productLoanData={productLoanData} cmsData={cmsData} bankName={router.query.bankName} interLinkingData={interLinkingData} blogsData={blogsData} productName={productName} attributeData={attributeData} bankProducts={bankProducts} bankCalculators={bankCalculators}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const productName = context.params.productName;
  if(productName != 'home-loan' && productName != 'personal-loan'){
    return {
      notFound: true,
    }
  }
  const bankProductData = await getBankProductDetails(bankName, productName);
  const blogsData = await getLatestBlog();
  const productLoanData = await getLoanType(productName);
  const cmsData = await ProductInterestRateContent(bankName, productName);
  const interLinkingData = await getGeneralCalculator(bankName);
  const attributeData = await getIfscMaster(`branch/${bankName}`);
  const bankProducts = await getMaster("bank_products");
  const bankCalculators = await getMaster("bank_calculators");
  if (bankProductData && Object.keys(bankProductData).length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { productLoanData: productLoanData, bankProductData : bankProductData , cmsData : cmsData, interLinkingData : interLinkingData, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], attributeData:{attributeData}, bankProducts:{bankProducts}, bankCalculators: bankCalculators } }
}
export default ProductInterestRate;
