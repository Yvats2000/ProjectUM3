import { BankFdGeneric } from "../../components/fixedDeposit";
import {getGeneralContent} from "../../services/blogs";
import { MetaHead, SchemaHead } from "../../components/shared";
import { getMaster } from "../../services/master";

const topBanksProvidingHigherFdInterestRates = ({cmsData, genericUrl, rightNavBar, bankFdData, topBanks}) => {
  const pageName = genericUrl.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : cmsData && cmsData.length > 0 ? cmsData[0].meta_title : 'Top Banks Highest Fixed Deposit Rates',
    "description" : cmsData && cmsData.length > 0 ? cmsData[0].meta_description : 'Check Top Banks Highest Fixed Deposit Rates in India.',
    "keywords" : cmsData && cmsData.length > 0 ? cmsData[0].meta_keywords : '',
    "url" : `${process.env.BASE_URL}/fixed-deposit-rate/${genericUrl}`
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
          "name": "Fixed Deposit",
          "item": "${process.env.BASE_URL}/fixed-deposit-rate"  
      },{
        "@type": "ListItem", 
        "position": 3, 
        "name": "${pageName}",
        "item": "${metaData.url}"  
      }]
    }`
    }
  ]
  const addFaqSchema = () => {
    return {
      __html: `{
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[${FaqArray}]
      }`
    }
  }
  FaqArray.length > 0 && schemaData.push(addFaqSchema());
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <BankFdGeneric cmsData={cmsData} topBanks={topBanks} pageUrl={genericUrl} bank={true} bankFdData={bankFdData} title={pageName} />
    </>
  );
}
export async function getServerSideProps(context) {
    const genericUrl = context.resolvedUrl.substring(1);
    const cmsData = await getGeneralContent(`${genericUrl}`);
    const bankFdData = await getMaster("topPrivateBanksProvidingHigherFdInterestRates");
    const topBanks = await getMaster("top_fd_banks,top_fd_banks_scheme");
    /*if (cmsData && Object.keys(cmsData).length === 0) {
      return {
        notFound: true,
      }
    }*/
    return { props: { cmsData : cmsData, topBanks : topBanks, genericUrl : genericUrl.split('fixed-deposit-rate')[1].substring(1), bankFdData : bankFdData.topPrivateBanksProvidingHigherFdInterestRates || {} } }
}
export default topBanksProvidingHigherFdInterestRates;
