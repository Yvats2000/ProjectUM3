import { LifeInsurancePlan } from "../../components/insurancePolicy";
import {getGeneralContent} from "../../services/blogs";
import { MetaHead, SchemaHead } from "../../components/shared";

const LifeInsurancePlanPage = ({cmsData, rightNavBar}) => {
  const metaData = {
    "title" : "Life Insurance: List of Life Insurance Companies in India - Urban Money",
    "description" : "A quick guide to understanding Life Insurance Plan: Learn more about life insurance, check and compare list of life insurance companies in India.",
    "keywords" : "life insurance, life insurance policy, types of life insurance, life insurance plans, best life insurance, non life insurance",
    "url" : `${process.env.BASE_URL}/insurance-policy/life-insurance-plans`
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
        "url": "${process.env.BASE_URL}/insurance-policy/life-insurance-plans",
        "name": "Life Insurance Plans",
        "headline": "Life Insurance: List of Life Insurance Companies in India - Urban Money",
        "description": " A quick guide to understanding Life Insurance Plan: Learn more about life insurance, check and compare list of life insurance companies in India."
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
        "name": "Life Insurance Plans",
        "item": "${process.env.BASE_URL}/insurance-policy/life-insurance-plans"  
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
      <LifeInsurancePlan cmsData={cmsData} />
      </>
    );
}
export async function getServerSideProps() {
    const cmsData = await getGeneralContent('insurance-policy/life-insurance-plans');
    return { props: { cmsData : cmsData } }
}
export default LifeInsurancePlanPage;
  