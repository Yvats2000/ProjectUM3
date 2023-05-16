import { Application } from "../../../../components/bankPartners/StandardChartered";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import {getMaster} from "../../../../services/creditCard";
const SCBankApplication = ({rightNavBar, master,authToken,agentToken, agentCode}) => {
  const metaData = {
    "title" : "Standard Chartered Credit Card Online Application Form",
    "description" : "Apply for Standard Chartered Credit Card online and get maximum benefits and reward points with more security and convenience.",
    "url" : `${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${metaData.url}",
        "name": "${metaData.title}",
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
          "name": "Credit Card",
          "item": "${process.env.BASE_URL}/credit-card"
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "Standard Chartered",
          "item": "${process.env.BASE_URL}/credit-card/standard-chartered"
        },{
          "@type": "ListItem", 
          "position": 4, 
          "name": "Standard Chartered Application",
          "item": "${metaData.url}"
        }]
      }`
    }
  ]
  
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <Application master={master} queryToken={authToken} agentToken={agentToken} agentCode={agentCode} />
    </>
  );
}
export async function getServerSideProps(context) {
  const authToken = context.query.token;  
  const agentToken = context.query.agentToken;  
  const agentCode = context.query.agentCode;  
  const master = await getMaster();
  return { props:{ master: master, authToken : authToken || '', agentToken : agentToken || '', agentCode : agentCode || '' }}
}
export default SCBankApplication;