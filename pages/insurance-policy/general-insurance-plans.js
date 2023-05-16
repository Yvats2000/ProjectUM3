import { GeneralInsurancePlan } from "../../components/insurancePolicy";
import {getGeneralContent} from "../../services/blogs";
import { MetaHead, SchemaHead } from "../../components/shared";
const GeneralInsurancePlanPage = ({cmsData, rightNavBar}) => {
  const metaData = {
    "title" : "General Insurance: List of General Insurance Companies in India - Urban Money",
    "description" : "A quick guide to understanding General Insurance Plan: Learn more about general insurance, check and compare list of general insurance companies in India.",
    "keywords" : "general insurance meaning, general insurance company, general insurance corporation, general insurance includes, general insurance products, general insurance india, general insurance definition",
    "url" : `${process.env.BASE_URL}/insurance-policy/general-insurance-plans`
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
  cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer))))
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/insurance-policy/general-insurance-plans",
        "name": "General Insurance Plan",
        "headline": "General Insurance: List of General Insurance Companies in India - Urban Money",
        "description": " A quick guide to understanding General Insurance Plan: Learn more about general insurance, check and compare list of general insurance companies in India."
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
          "name": "Insurance",
          "item": "${process.env.BASE_URL}/insurance-policy"  
      },{
        "@type": "ListItem", 
        "position": 3, 
        "name": "General Insurance Plans",
        "item": "${process.env.BASE_URL}/insurance-policy/general-insurance-plans"  
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
      <GeneralInsurancePlan cmsData={cmsData} />
      </>
    );
}
export async function getServerSideProps() {
    const cmsData = await getGeneralContent('insurance-policy/general-insurance-plans');
    return { props: { cmsData : cmsData } }
}
export default GeneralInsurancePlanPage;
  