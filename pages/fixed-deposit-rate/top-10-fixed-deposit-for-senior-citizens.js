import { BankFdGeneric } from "../../components/fixedDeposit";
import {getGeneralContent} from "../../services/blogs";
import { MetaHead, SchemaHead } from "../../components/shared";
import { getMaster } from "../../services/master";

const top10FixedDepositForSeniorCitizens = ({cmsData, genericUrl, rightNavBar, bankFdData, topBanks}) => {
  const pageName = genericUrl.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : cmsData && cmsData.length > 0 ? cmsData[0].meta_title : 'Top 10 Fixed Deposit For Senior Citizens in India 2023.',
    "description" : cmsData && cmsData.length > 0 ? cmsData[0].meta_description : 'Compare and Find the 10 best FD schemes with higher interest return for Senior Citizens in 2023. Invest in Senior Citizens Fixed Deposit and get higher returns from top banks.',
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
      <BankFdGeneric cmsData={cmsData} topBanks={topBanks} pageUrl={genericUrl} bankFdData={bankFdData} title={pageName} />
    </>
  );
}
export async function getServerSideProps(context) {
    const genericUrl = context.resolvedUrl.substring(1);
    const cmsData = await getGeneralContent(`${genericUrl}`);
    const bankFdData = await getMaster("top10FixedDepositForSeniorCitizens");
    const topBanks = await getMaster("top_fd_banks,top_fd_banks_scheme");
    /*if (cmsData && Object.keys(cmsData).length === 0) {
      return {
        notFound: true,
      }
    }*/
    return { props: { cmsData : cmsData, topBanks : topBanks, genericUrl : genericUrl.split('fixed-deposit-rate')[1].substring(1), bankFdData : bankFdData.top10FixedDepositForSeniorCitizens || {} } }
}
export default top10FixedDepositForSeniorCitizens;
