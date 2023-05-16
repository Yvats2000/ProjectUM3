import { Bank } from "../../../components/banksInIndia";
import {getLatestBlog, getBankContent, getGeneralCalculator} from "../../../services/blogs";
import {getBankDetails} from "../../../services/banksInIndia";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { useRouter } from 'next/router';
import { getMaster } from "../../../services/master";
import {getIfscMaster} from "../../../services/banksInIndia";
import commonFunctions from './../../../utils/CommonFunctions';
  const BankDetail = ({bankData, cmsData, blogsData, rightNavBar, interLinkingData, topBanks, attributeData}) => {
  const router = useRouter()
  const bankName = router.query.bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : `Apply for ${bankName} Loans Online - Check Interest Rates & Eligibility`,
    "description" : `${bankName} offers wide range of loan Solutions at competitive interest rates. Check out products offered by ${bankName} like bank accounts, investment options, debit/credit cards, insurance services etc.`,
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/banks-in-india/${router.query.bankName}`
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
      __html: `
      {
      "@context": "https://schema.org",
      "@type": "Webpage",
      "url": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}",
      "name": "${bankName}",
      "headline": "${bankName} - ${bankName} Banking Services | NetBanking - Urban Money",
      "description": "${bankName} offers wide range of Financial Solutions - Check out Products offered by ${bankName} , Home Loans, Bank Accounts, Investment Options, Debit/Credit Cards, Insurance Services & lot more"
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
          "name": "${bankData ? bankData.lenderName : ""}",
          "item": "${process.env.BASE_URL}/banks-in-india/${bankData ? bankData.lenderSlug : ""}"  
        }]
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
      <Bank data={bankData} cmsData={cmsData} interLinkingData={interLinkingData} blogsData={blogsData} topBanks={topBanks} attributeData={attributeData} />
    </>
  );
}
export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const bankData = await getBankDetails(bankName);
  const blogsData = await getLatestBlog();
  const cmsData = await getBankContent(bankName);
  const interLinkingData = await getGeneralCalculator(bankName);
  const topBanks = await getMaster("top_banks");
  const attributeData = await getIfscMaster(`branch/${bankName}`);
  if (bankData && Object.keys(bankData).length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { bankData : bankData, cmsData: cmsData, interLinkingData : interLinkingData, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], topBanks: topBanks || [], attributeData: {attributeData} } 
  }
}
export default BankDetail;