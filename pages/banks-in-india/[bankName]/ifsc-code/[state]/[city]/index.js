import { IfscCode } from "../../../../../../components/ifscCode";
import {getLatestBlog} from "../../../../../../services/blogs";
import {getIfscMaster} from "../../../../../../services/banksInIndia";
import { MetaHead, SchemaHead } from "../../../../../../components/shared";
import commonFunctions from './../../../../../../utils/CommonFunctions';
import { useRouter } from 'next/router';
const BankWithStateAndCityIfscCode = ({blogsData, attributeData, attributeLink, rightNavBar, lenderData, stateData, cityData}) => {
  const router = useRouter()
  const bankName = router.query.bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const stateName = router.query.state.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const cityName = router.query.city.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : `${bankName} ${cityName}, ${stateName} IFSC Code - MICR & SWIFT Code`,
    "description" : `Check ${bankName} ${cityName}, ${stateName} IFSC Code - View ${bankName} IFSC Code by Branches in ${cityName}. IFSC / MICR / SWIFT Code in ${cityName}`,
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/banks-in-india/`+router.query.bankName+`/ifsc-code/`+router.query.state+`/`+router.query.city
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}/${router.query.city}",
        "name": "${bankName} ${cityName} IFSC Code",
        "headline": "${bankName} ${cityName} , ${stateName} IFSC Code - MICR & SWIFT Code",
        "description": "Check ${bankName} ${cityName}, ${stateName} IFSC Code - View ${bankName} IFSC Code by Branches in ${cityName}. IFSC / MICR / SWIFT Code in ${cityName}"
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
        },{
          "@type": "ListItem", 
          "position": 5, 
          "name": "${cityName}",
          "item": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}/${router.query.city}"  
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
    },
    {
      text: cityName,
      path: `/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}/${router.query.city}`,
      className: "",
    }
  ];
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <IfscCode mainTitle={`${bankName} ${cityName} IFSC Code`} showCityContent={true} branchData={attributeData} breadCrumbLinks={breadCrumbLinks} blogsData={blogsData} attributeTitle={'Branch'} attributeLink={attributeLink} attributeData={attributeData} bankAttributesDiv={true}  bankName={bankName} stateName={stateName} cityName={cityName} lenderData={lenderData} stateData={stateData} cityData={cityData} />      
    </>
  );
}

export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const stateName = context.params.state;
  const cityName = context.params.city;
  const lenderData = await getIfscMaster('branch');
  const stateData = await getIfscMaster(`branch/${bankName}`);
  const cityData = await getIfscMaster(`branch/${bankName}/${stateName}`);
  const attributeData = await getIfscMaster(`branch/${bankName}/${stateName}/${cityName}`);
  const blogsData = await getLatestBlog();
  if (attributeData && attributeData.length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { attributeLink:`/banks-in-india/${bankName}/ifsc-code/${stateName}/${cityName}`,blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], attributeData: attributeData && attributeData.length > 0 ? attributeData : [], lenderData: lenderData,stateData: stateData,cityData: cityData } }
}

export default BankWithStateAndCityIfscCode;
