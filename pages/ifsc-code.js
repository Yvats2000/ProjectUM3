import { IfscCode } from "../components/ifscCode";
import {getLatestBlog} from "../services/blogs";
import {getIfscMaster} from "../services/banksInIndia";
import { MetaHead, SchemaHead } from "../components/shared";
import FaqData from "../data/ifscCodeFaq.json";
import commonFunctions from './../utils/CommonFunctions';
const ifscCode = ({blogsData,rightNavBar,lenderData}) => {
  const metaData = {
    "title" : "IFSC Code - Find MICR Code | Search Bank by IFSC - Urban Money",
    "description" : "Know What is IFSC Code (Indian Financial System Code).  Explore Top Banks in India with IFSC Code - Check How to find IFSC Code on a Banking Cheque",
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/ifsc-code`
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
        "url": "${process.env.BASE_URL}/ifsc-code",
        "name": "IFSC Code",
        "headline": "IFSC Code - Find MICR Code | Search Bank by IFSC - Urban Money",
        "description": "Know What is IFSC Code (Indian Financial System Code). Explore Top Banks in India with IFSC Code - Check How to find IFSC Code on a Banking Cheque"
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
          "name": "IFSC Code",
          "item": "${process.env.BASE_URL}/ifsc-code"  
        }]
      }`
    }
  ];
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
  const breadCrumbLinks = [
    {
      text: "IFSC Code",
      path: "/ifsc-code",
      className: "",
    },
  ];
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <IfscCode blogsData={blogsData} breadCrumbLinks={breadCrumbLinks} bankListDiv={true} bankAttributesDiv={false} showIfscContent={true} mainTitle={'IFSC Code'} lenderData={lenderData} />      
    </>
  );
}

export async function getServerSideProps() {
  const blogsData = await getLatestBlog();
  const lenderData = await getIfscMaster('branch');
  return { props: { blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], lenderData: lenderData } }
}

export default ifscCode;
