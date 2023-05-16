import { MainPage } from "../../components/insurancePolicy";
import { MetaHead, SchemaHead } from "../../components/shared";
import { getMaster } from "../../services/master";
import {getGeneralContent} from "../../services/blogs";
const InsurancePolicyDetail = ({rightNavBar, topBanks,cmsData}) => {
  const metaData = {
    "title" : "Insurance Plans in India: Check & Compare Life & General Insurance Plan - Urban Money",
    "description" : "Online Insurance: Learn about various insurance types, general insurance plan, life insurance plan, term insurance, group life insurance, motor insurance, health insurance etc.",
    "keywords" : "types of general insurance, buy insurance, compare health insurance policy, general health insurance, compare life insurance plans, types of insurance products",
    "url" : `${process.env.BASE_URL}/insurance-policy`
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
        "url": "${process.env.BASE_URL}/insurance-policy",
        "name": "Insurance Policy",
        "headline": "Insurance Plans in India: Check & Compare Life & General Insurance Plan - Urban Money",
        "description": "Online Insurance: Learn about various insurance types, general insurance plan, life insurance plan, term insurance, group life insurance, motor insurance, health insurance etc."
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
          "name": "Insurance Policy",
          "item": "${process.env.BASE_URL}/insurance-policy"  
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
      <MainPage cmsData={cmsData} rightNavBar={rightNavBar} topBanks={topBanks}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const topBanks = await getMaster("top_banks, bank_calculators");
   const genericUrl = context.resolvedUrl.substring(1);
   const cmsData = await getGeneralContent(`${genericUrl}`);
   if (cmsData && Object.keys(cmsData).length === 0) {
    return {
      notFound: true,
    }
  }

  return { props: { topBanks: topBanks,cmsData:cmsData } }
}
export default InsurancePolicyDetail;
