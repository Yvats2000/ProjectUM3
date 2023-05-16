import { PrivacyPolicy } from "../components/privacyPolicy";
import { MetaHead, SchemaHead } from "../components/shared";
const privacyPolicy = ({rightNavBar}) => {
  const metaData = {
    "title" : "Privacy Policy - Urban Money",
    "description" : "Privacy Policy - Read privacy policy of Urban Money online",
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/privacy-policy`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/privacy-policy",
        "name": "Privacy Policy",
        "headline": "Privacy Policy - Urban Money",
        "description": "Privacy Policy - Read privacy policy of Urban Money online"
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
          "name": "Privacy Policy",
          "item": "${process.env.BASE_URL}/privacy-policy"  
        }]
      }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <PrivacyPolicy />
    </>
  );
}
export default privacyPolicy;
