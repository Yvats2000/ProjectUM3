import { Sip } from "../../components/calculator/SipCalculator";
import sipMonthly from '../../data/sipMonthlyCalculations.json';
import { MetaHead, SchemaHead } from "../../components/shared";
import {getGeneralContent} from "../../services/blogs";
const SIPCalculator = ({rightNavBar,cmsData}) => {
  const metaData = {
    "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : "SIP Calculator - Calculate SIP Returns & Interest Rate Online - Urban Money",
    "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description :"SIP Calculator - Calculate your SIP Return and SIP Interest Rate online at Urban Money. Use SIP Calculator & calculate maximum interest earned on your investment",
    "url" : `${process.env.BASE_URL}/calculator/sip-calculator`
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
        "name": "SIP Calculator",
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
          "name": "Calculators",
          "item": "${process.env.BASE_URL}/calculator"  
        },
        {
          "@type": "ListItem", 
          "position": 3, 
          "name": "SIP Calculator",
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
      <Sip cmsData={cmsData} calculations={sipMonthly} calculatorType={'sip-calculator'} rightNavBar={rightNavBar}  />
    </>
  );
}
export async function getServerSideProps(context) {
  const genericUrl = context.resolvedUrl.substring(1);
  const cmsData = await getGeneralContent(`${genericUrl}`);
  if (cmsData && Object.keys(cmsData).length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { cmsData : cmsData} }
}
export default SIPCalculator;
