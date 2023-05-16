import {BankCalculator} from "../../../../components/calculator";
import {getCategoryBlog, getGeneralCalculator} from "../../../../services/blogs";
import {getBankDetails} from "../../../../services/banksInIndia";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import { getMaster } from "../../../../services/master";
import {getIfscMaster} from "../../../../services/banksInIndia";
import commonFunctions from './../../../../utils/CommonFunctions';

const BankCalculatorPage = ({bankCalculatorData, cmsData , interLinkingData, bank, calculator, rightNavBar, bankProducts, attributeData,blogsData, blogSlug}) => {
  const bankName = bank.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const calculatorName = calculator.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : cmsData[0].meta_title, 
    "description" : cmsData[0].meta_description,
    "keywords" : cmsData[0].meta_keywords,
    "url" : `${process.env.BASE_URL}/bank-calculator/${bank}/${calculator}`
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
        "name": "${cmsData[0].meta_title}",
        "headline": "${cmsData[0].meta_title}",
        "description": "${cmsData[0].meta_description}"
        }
      }`
    },
    {
      __html: `
      {
        "@context": "https://schema.org/", 
        "@type": "BreadcrumbList", 
        "itemListElement": [{
          "@type": "ListItem", 
          "position": 1, 
          "name": "Home",
          "item": "${process.env.BASE_URL}"  
        },
        {
          "@type": "ListItem", 
          "position": 2, 
          "name": "Bank Calculator",
          "item": "${process.env.BASE_URL}/calculator"  
        },
        {
          "@type": "ListItem", 
          "position": 3, 
          "name": "${bankName}",
          "item": "${process.env.BASE_URL}/bank-calculator/${bank}"  
        },
        {
          "@type": "ListItem", 
          "position": 4, 
          "name": "${calculatorName}",
          "item": "${metaData.url}"  
        }
      ]
      }`
    }
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
      <BankCalculator data={bankCalculatorData} cmsData={cmsData} interLinkingData={interLinkingData} bank={bank} calculator={calculator} bankProducts={bankProducts} attributeData={attributeData} blogsData={blogsData} blogSlug={blogSlug} rightNavBar={rightNavBar}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const calculatorName = context.params.calculatorName;
  const lastIndex = calculatorName.lastIndexOf("-");
  const blogSlug = calculatorName.substring(0, lastIndex);
  const bankCalculatorData = await getBankDetails(bankName);
  const cmsData = await getGeneralCalculator(`${bankName+'/'+calculatorName}`);
  const interLinkingData = await getGeneralCalculator(`${bankName}`);
  //const cmsData = await getGeneralCalculator(`yes-bank/test-cal`);
  const bankProducts = await getMaster("bank_products,bank_calculators");
  const attributeData = await getIfscMaster(`branch/${bankName}`);
  const blogsData = await getCategoryBlog(blogSlug);
  if (bankCalculatorData && Object.keys(bankCalculatorData).length === 0) {
    return {
      notFound: true,
    }
  }else if(cmsData && Object.keys(cmsData).length === 0){
    return {
      notFound:true,
    }
  }
  return { props: { bankCalculatorData : bankCalculatorData , cmsData : cmsData, interLinkingData : interLinkingData, bank : bankName, calculator : calculatorName, bankProducts: bankProducts, attributeData:attributeData,blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], blogSlug:blogSlug } }
}
export default BankCalculatorPage;
