import { CreditScore } from "../../components/creditScore";
import {getLatestBlog,getGeneralContent} from "../../services/blogs";
import { MetaHead, SchemaHead } from "../../components/shared";
import {getCivilMaster} from '../../services/master';
import FaqData from "../../data/creditScoreFaq.json";
import commonFunctions from './../../utils/CommonFunctions';
import { getMaster } from "../../services/master";
const CreditScorePage = ({blogsData, rightNavBar,cmsData,master,bankProducts}) => {
  const metaData = {
    "title" : "Check Free CIBIL Score  - Instant Credit Score Report Download",
    "description" : "Get your CIBIL score check for free. Check credit score/consumer CIBIL online before applying for a loan. Free and Secure Credit Checks.",
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/credit-score`
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
  FaqData && FaqData.length > 0 && FaqData.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer)))
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/credit-score",
        "name": "Credit Score",
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
          "name": "Credit Score",
          "item": "${process.env.BASE_URL}/credit-score"  
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
      <CreditScore blogsData={blogsData} cmsData={cmsData} master={master} bankProducts={bankProducts}  />
    </>
  );
}
export async function getServerSideProps(context) {
  const cmsData = await getGeneralContent(`credit-score`);
  const bankProducts = await getMaster("bank_products");
  const blogsData = await getLatestBlog();
  const master = await getCivilMaster();
  if (cmsData && Object.keys(cmsData).length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: {cmsData : cmsData,master:master,bankProducts:bankProducts, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [] } }
}
export default CreditScorePage;
