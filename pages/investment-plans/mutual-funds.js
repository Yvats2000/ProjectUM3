import { MutualFund } from "../../components/investmentPlans";
import {getGeneralContent} from "../../services/blogs";
import { MetaHead, SchemaHead } from "../../components/shared";
const MutualFundsPage = ({cmsData,rightNavBar}) => {
  const metaData = {
    "title" : "Mutual Funds: Mutual Fund Investment, Features & Benefits - Urban Money",
    "description" : "Mutual Funds: Apply for mutual funds with Urban Money. Find your mutual funds eligibility, features & benefits, documents required, etc. Apply mutual funds online now!",
    "keywords" : "mutual funds, mutual fund investment, best mutual funds, mutual funds india",
    "url" : `${process.env.BASE_URL}/investment-plans/mutual-funds`
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
        "url": "${process.env.BASE_URL}/investment-plans/mutual-funds",
        "name": "Mutual Funds",
        "headline": "Mutual Funds: Mutual Fund Investment, Features & Benefits - Urban Money",
        "description": "Mutual Funds: Apply for mutual funds with Urban Money. Find your mutual funds eligibility, features & benefits, documents required, etc. Apply mutual funds online now! "
        }
        }
        `
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
          "name": "Investment Plans",
          "item": "${process.env.BASE_URL}/investment-plans"  
      },{
        "@type": "ListItem", 
        "position": 3, 
        "name": "Mutual Funds",
        "item": "${process.env.BASE_URL}/investment-plans/mutual-funds"  
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
      <MutualFund cmsData={cmsData} rightNavBar={rightNavBar}/>
      </>
    );
}
export async function getServerSideProps() {
    const cmsData = await getGeneralContent('investment-plans/mutual-funds');
    return { props: { cmsData : cmsData } }
}
export default MutualFundsPage;
  