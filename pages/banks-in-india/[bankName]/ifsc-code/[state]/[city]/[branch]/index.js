import { IfscCode } from "../../../../../../../components/ifscCode";
import {getLatestBlog} from "../../../../../../../services/blogs";
import { MetaHead, SchemaHead } from "../../../../../../../components/shared";
import {getIfscMaster} from "../../../../../../../services/banksInIndia";
import commonFunctions from './../../../../../../../utils/CommonFunctions';
import { useRouter } from 'next/router';
const BankWithStateCityAndBranchIfscCode = ({blogsData, rightNavBar, ifscData, lenderData, stateData, cityData, attributeData}) => {
  const router = useRouter()
  const bankName = router.query.bankName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const stateName = router.query.state.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const cityName = router.query.city.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const branchName = router.query.branch.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const metaData = {
    "title" : `${branchName} ${cityName} ${bankName} IFSC Code - MICR & SWIFT Code`,
    "description" : `Check ${branchName} ${cityName} ${stateName} ${bankName} IFSC Code - Find Branch Code Name, MICR Code, ${branchName} ${cityName} ${bankName} Address & Contact Details`,
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/banks-in-india/`+router.query.bankName+`/ifsc-code/`+router.query.state+`/`+router.query.city+`/`+router.query.branch
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}/${router.query.city}/${router.query.branch}",
        "name": "${branchName} ${cityName} ${bankName} IFSC Code",
        "headline": "${branchName} ${cityName} ${bankName} IFSC Code - MICR & SWIFT Code",
        "description": "Check ${branchName} ${cityName} ${stateName} ${bankName} IFSC Code - Find Branch Code Name, MICR Code, ${branchName} ${cityName} ${bankName} Address & Contact Details"
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
        },{
          "@type": "ListItem", 
          "position": 6, 
          "name": "${branchName}",
          "item": "${process.env.BASE_URL}/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}/${router.query.city}/${router.query.branch}"  
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
    },
    {
      text: branchName,
      path: `/banks-in-india/${router.query.bankName}/ifsc-code/${router.query.state}/${router.query.city}/${router.query.branch}`,
      className: "",
    }
  ];
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <IfscCode mainTitle={`${branchName} ${cityName} ${bankName} IFSC Code`} ifscData={ifscData} showBranchContent={true} breadCrumbLinks={breadCrumbLinks} blogsData={blogsData} bankAttributesDiv={false} bankName={bankName} stateName={stateName} cityName={cityName} lenderData={lenderData} stateData={stateData} cityData={cityData} branchData={attributeData} />      
    </>
  ); 
}

export async function getServerSideProps(context) {
  const bankName = context.params.bankName;
  const stateName = context.params.state;
  const cityName = context.params.city;
  const branchName = context.params.branch;
  const lenderData = await getIfscMaster('branch');
  const stateData = await getIfscMaster(`branch/${bankName}`);
  const cityData = await getIfscMaster(`branch/${bankName}/${stateName}`);
  const attributeData = await getIfscMaster(`branch/${bankName}/${stateName}/${cityName}`);
  const ifscData = attributeData.find(l=>l.slug==branchName);
  if (!ifscData) {
    context.res.statusCode = 410;
    return {
      props: {
        pageGone : true,
      },
    };
  }
  const blogsData = await getLatestBlog();
  return { props: { blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], ifscData:ifscData, lenderData: lenderData,stateData: stateData,cityData: cityData, attributeData: attributeData } }
}

export default BankWithStateCityAndBranchIfscCode;
