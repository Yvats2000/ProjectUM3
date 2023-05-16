import { MainPage } from "../../components/calculator";
import {getMaster} from "../../services/master"
import { MetaHead, SchemaHead } from "../../components/shared";
import {getGeneralContent} from "../../services/blogs";
const CalculatorMainPage = ({rightNavBar ,calculator,cmsData }) => {
  const metaData = {
    "title" : "Financial Calculators - Loan | Investments | Premium | Eligibility - Urban Money",
    "description" : "Explore different range of Financial Calculators Online and use it for Free on Urban Money - Calculators involves Home Loan, Balance Transfer, Business Loan & lot more",
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/calculator`
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
        "url": "${process.env.BASE_URL}/calculator",
        "name": "Financial Calculators",
        "headline": "Financial Calculators - Loan | Investments | Premium | Eligibility - Urban Money",
        "description": "Explore different range of Financial Calculators Online and use it for Free on Urban Money - Calculators involves Home Loan, Balance Transfer, Business Loan & lot more"
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
        },{
          "@type": "ListItem", 
          "position": 2, 
          "name": "Calculators",
          "item": "${process.env.BASE_URL}/calculator"  
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
      <MainPage calculator={calculator.calculators} cmsData={cmsData}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const calculator = await getMaster("calculators");
  const genericUrl = context.resolvedUrl.substring(1);
   const cmsData = await getGeneralContent(`${genericUrl}`);
   if (cmsData && Object.keys(cmsData).length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { calculator : calculator,cmsData:cmsData } 
  }
}
export default CalculatorMainPage;
