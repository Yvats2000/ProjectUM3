import { IfscCode } from "../../../../../components/ifscCode";
import {getLatestBlog} from "../../../../../services/blogs";
import {getIfscMaster} from "../../../../../services/banksInIndia";
import { MetaHead, SchemaHead } from "../../../../../components/shared";
import commonFunctions from './../../../../../utils/CommonFunctions';
import { useRouter } from 'next/router';
const BankWithStateIfscCode = ({blogsData, attributeData, attributeLink, rightNavBar, lenderData, stateData}) => {
  const router = useRouter()
  const bankName = router.query.bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const stateName = router.query.state.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : `${bankName} ${stateName} IFSC Code - MICR & SWIFT Code`,
    "description" : `Check ${bankName} ${stateName} IFSC Code - View ${bankName} IFSC Code by Cities in ${stateName}. Check List of ${bankName} IFSC Code by Branches in ${stateName}`,
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}",
        "name": "${bankName} ${stateName} IFSC Code",
        "headline": "${bankName} ${stateName} IFSC Code - MICR & SWIFT Code",
        "description": "Check ${bankName} ${stateName} IFSC Code - View Axis Bank IFSC Code by Cities in ${stateName}. Check List of${bankName} IFSC Code by Branches in ${stateName}"
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
        },{
          "@type": "ListItem", 
          "position": 4, 
          "name": "${stateName}",
          "item": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}"  
        }]
      }`
    }
  ];
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
    },
    {
      text: stateName,
      path: `/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}`,
      className: "",
    }
  ];
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <IfscCode mainTitle={`${bankName} ${stateName} IFSC Code`} showStateContent={true} breadCrumbLinks={breadCrumbLinks} blogsData={blogsData} attributeTitle={'City'} attributeLink={attributeLink} attributeData={attributeData} bankAttributesDiv={true} bankName={bankName} stateName={stateName} lenderData={lenderData} stateData={stateData} cityData={attributeData} />      
    </>
  );
}

export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const stateName = context.params.state;
  const lenderData = await getIfscMaster('branch');
  const stateData = await getIfscMaster(`branch/${bankName}`);
  const attributeData = await getIfscMaster(`branch/${bankName}/${stateName}`);
  const blogsData = await getLatestBlog();
  if (attributeData && attributeData.length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { attributeLink:`/banks-in-india/${bankName}/ifsc-code/${stateName}`,blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], attributeData: attributeData && attributeData.length > 0 ? attributeData : [], lenderData: lenderData,stateData: stateData } }
}

export default BankWithStateIfscCode;
