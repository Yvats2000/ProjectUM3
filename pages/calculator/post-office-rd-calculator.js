import { RdPostOffice } from '../../components/calculator';
import { getGeneralContent } from "../../services/blogs";
import { MetaHead, SchemaHead } from "../../components/shared";

const PoRdCalculator = ({ cmsData, genericUrl, rightNavBar }) => {

  const metaData = {
    "title": cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : '',
    "description": cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : '',
    "keywords": '',
    "url": `${process.env.BASE_URL}/${genericUrl}`
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
  cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addFaqJson(faqs.question, faqs.answer))))
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${metaData.url}",
        "name": "Post Office RD Calculator",
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
          "name": "Post Office RD Calculator",
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
      <RdPostOffice cmsData={cmsData} rightNavBar={rightNavBar} />
    </>
  );
}
export async function getServerSideProps() {
  let genericUrl = 'calculator/post-office-rd-calculator';
  const cmsData = await getGeneralContent(genericUrl);
  return { props: { cmsData: cmsData, genericUrl: genericUrl } }
}
export default PoRdCalculator;
