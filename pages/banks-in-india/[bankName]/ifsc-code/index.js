import { IfscCode } from "../../../../components/ifscCode";
import {getLatestBlog, getGeneralContent} from "../../../../services/blogs";
import {getIfscMaster} from "../../../../services/banksInIndia";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import commonFunctions from './../../../../utils/CommonFunctions';
import { useRouter } from 'next/router';
//import FaqData from "../../../../data/ifscCodeFaq.json";
const BankIfscCode = ({blogsData, attributeData, attributeLink, cmsData, rightNavBar, lenderData}) => {
  const router = useRouter()
  const bankName = router.query.bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : `${bankName} IFSC Code - ${bankName} MICR & SWIFT Code`,
    "description" : `Check ${bankName} IFSC Code - View ${bankName} IFSC Code by States in India. Know How to Find ${bankName} IFSC Code on ${bankName} Cheque?`,
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code`
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
        "url": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code",
        "name": "${bankName}",
        "headline": "${bankName} IFSC Code - ${bankName} MICR & SWIFT Code",
        "description": "Check ${bankName} IFSC Code - View ${bankName} IFSC Code by States in India. Know How to Find ${bankName} IFSC Code on ${bankName} Cheque?"
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
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "${bankName}",
          "item": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code"  
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
    {
      text: bankName,
      path: `/banks-in-india/${router.query.bankName}/ifsc-code`,
      className: "",
    }
  ];
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <IfscCode mainTitle={`${bankName} IFSC Code`} showBankContent={true} bankCmsData={cmsData} breadCrumbLinks={breadCrumbLinks} blogsData={blogsData} attributeTitle={'State'} attributeLink={attributeLink} attributeData={attributeData} bankAttributesDiv={true} lenderData={lenderData} stateData={attributeData} />      
    </>
  );
}

export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const lenderData = await getIfscMaster('branch');
  const attributeData = await getIfscMaster(`branch/${bankName}`);
  const cmsData = await getGeneralContent(`banks-in-india/${bankName}/ifsc-code`);
  const blogsData = await getLatestBlog();
  if (attributeData && attributeData.length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { attributeLink:`/banks-in-india/${bankName}/ifsc-code`,cmsData : cmsData, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], attributeData: attributeData && attributeData.length > 0 ? attributeData : [], lenderData: lenderData } }
}

export default BankIfscCode;
