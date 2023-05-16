import { AboutUs } from "../components/aboutUs";
import { MetaHead, SchemaHead } from "../components/shared";
const aboutUs = ({rightNavBar}) => {
  const metaData = {
    "title" : "Fintech Comapany | Financial Company | Fintech Startups - Urban Money",
    "description" : "Urban Money fintech company is one of the top fintech companies in India. Host of many financial company and financial broker, our fintech startup can help you with all your financial needs.",
    "keywords" : "fintech company,financial company,fintech startups,financial broker,financial startups,top fintech companies",
    "url" : `${process.env.BASE_URL}/about-us`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/about-us",
        "name": "About us",
        "headline": "Fintech Comapany | Financial Company | Fintech Startups - Urban Money",
        "description": "Urban Money fintech company is one of the top fintech companies in India. Host of many financial company and financial broker, our fintech startup can help you with all your financial needs."
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
          "name": "About us",
          "item": "${process.env.BASE_URL}/about-us"  
        }]
      }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <AboutUs />
    </>
  );
}
export default aboutUs;
