import { FixedDeposit } from "../../components/investmentPlans";
import {getGeneralContent} from "../../services/blogs";
import { MetaHead, SchemaHead } from "../../components/shared";


const FixedDepositPage = ({cmsData,rightNavBar}) => {
  const metaData = {
    "title" : "Fixed Deposit : Get Best FD Interest Rates - Urban Money",
    "description" : "Fixed Deposit: Apply for a fixed deposit with the lowest interest rate. Find your fixed deposit eligibility, interest rates by various provider, document required, etc.",
    "keywords" : "fd interest rates, fixed deposit, fixed deposit interest rate, fixed deposit rates, fd rates, fixed deposit interest, best fd interest rates",
    "url" : `${process.env.BASE_URL}/investment-plans/fixed-deposit`
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
        "url": "${process.env.BASE_URL}/investment-plans/fixed-deposit",
        "name": "Fixed Deposit",
        "headline": " Fixed Deposit : Get Best FD Interest Rates - Urban Money",
        "description": "Fixed Deposit: Apply for a fixed deposit with the lowest interest rate. Find your fixed deposit eligibility, interest rates by various provider, document required, etc."
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
          "name": "Investment Plans",
          "item": "${process.env.BASE_URL}/investment-plans"  
      },{
        "@type": "ListItem", 
        "position": 3, 
        "name": "Fixed Deposit",
        "item": "${process.env.BASE_URL}/investment-plans/fixed-deposit"  
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
      <FixedDeposit cmsData={cmsData} rightNavBar={rightNavBar} />
      </>
    );
  }
export async function getServerSideProps() {
    const cmsData = await getGeneralContent('investment-plans/fixed-deposit');

    return { props: { cmsData : cmsData } }
}
export default FixedDepositPage;
  