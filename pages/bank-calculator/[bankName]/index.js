
import {getGeneralCalculator, getBankCalculatorContent} from "../../../services/blogs";
import { MetaHead, SchemaHead } from "../../../components/shared";
import {BankCalculatorList} from "../../../components/calculator/BankCalculator";
import { getIfscMaster } from "../../../services/banksInIndia";
import { getMaster } from "../../../services/master";
const AllBankCalculator = ({cmsData , bank, rightNavBar,attributeData,bankProducts, calculatorData}) => {
  const bankName = bank.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `${bankName} Calculators – Estimate your EMI for all Loan Needs`, 
    "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `${bankName} Calculators provide the details and show you accurate yearly & monthly instalment of your loan amount. Get your Loan Estimate today, Free.`,
    "url" : `${process.env.BASE_URL}/bank-calculator/${bank}`
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
      <BankCalculatorList cmsData={cmsData} calculatorData={calculatorData} bank={bank} attributeData={attributeData} bankProducts={bankProducts} rightNavBar={rightNavBar}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const calculatorData = await getGeneralCalculator(`${bankName}`);
  const cmsData = await getBankCalculatorContent(`${bankName}`);
  const attributeData = await getIfscMaster(`branch/${bankName}`);
  const bankProducts = await getMaster("bank_products");
  if(calculatorData && Object.keys(calculatorData).length === 0){
    return {
      notFound:true,
    }
  }
  return{props:{bank : bankName, cmsData : cmsData, calculatorData : calculatorData, attributeData:attributeData , bankProducts:bankProducts }}

}
export default AllBankCalculator;
