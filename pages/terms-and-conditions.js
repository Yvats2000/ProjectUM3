import { TAndC } from "../components/tAndC";
import { MetaHead, SchemaHead } from "../components/shared";
const tAndC = ({rightNavBar}) => {
  const metaData = {
    "title" : "Terms and Conditions – Urban Money",
    "description" : "Terms and Conditions – Read terms of use of our services. Get complete details online on Urbanmoney.com",
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/terms-and-conditions`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/terms-and-conditions",
        "name": "Terms and Conditions",
        "headline": "Terms and Conditions – Urban Money",
        "description": "Terms and Conditions – Read terms of use of our services. Get complete details online on Urbanmoney.com"
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
          "name": "Terms and Conditions",
          "item": "${process.env.BASE_URL}/terms-and-conditions"  
        }]
      }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <TAndC />
    </>
  );
}
export default tAndC;
