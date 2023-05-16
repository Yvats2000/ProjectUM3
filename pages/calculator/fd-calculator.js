import { Fd } from "../../components/calculator/FdCalculator";
import fdCalculations from '../../data/fdCalculations.json';
import { MetaHead, SchemaHead } from "../../components/shared";
import {getGeneralContent} from "../../services/blogs";
const FDCalculator = ({rightNavBar,cmsData}) => {
  const metaData = {
    "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : "FD Calculator - Calculate Fixed Deposit Interest Rate Online - Urban Money",
    "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : "FD Calculator - Calculate your fixed deposit interest rates & maturity online at Urban Money. Use FD Calculator & calculate maximum interest earned on your investment",
    "url" : `${process.env.BASE_URL}/calculator/fd-calculator`
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
        "name": "FD Calculator",
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
          "name": "FD Calculator",
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
      <Fd cmsData={cmsData} calculations={fdCalculations} rightNavBar={rightNavBar} />
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
export default FDCalculator;
