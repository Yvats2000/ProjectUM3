import { MainPage } from "../../components/banksInIndia";
import {getBanks} from "../../services/banksInIndia";
import { MetaHead, SchemaHead } from "../../components/shared";
const banksInIndia = ({banksListing,rightNavBar}) => {
  const metaData = {
    "title" : "Banks in India: Money Lenders - Top Banks in India",
    "description" : "Urban Money has partnered with various Government and Private Banks in India to provide hassle free loans from top Banks. A comprehenssive list of Best Nationalised Banks in India with their products & services.",
    "keywords" : "banks in india,banks,b lenders,lenders,money lenders,p2p lenders,money lenders near me,loan lenders,digital lenders,private money lenders near me",
    "url" : `${process.env.BASE_URL}/banks-in-india`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/banks-in-india",
        "name": "Banks and Financial Institutions in India",
        "headline": "Banks in India: Money Lenders - Top Banks in India",
        "description": "Urban Money has partnered with various Government and Private Banks in India to provide hassle free loans from top Banks. A comprehenssive list of Best Nationalised Banks in India with their products & services."
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
          "name": "Banks and Financial Institutions",
          "item": "${process.env.BASE_URL}/banks-in-india"  
        }]
      }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <MainPage data={banksListing} />
    </>
  );
}
export async function getServerSideProps(context) {
  const bankListData = await getBanks();
  return { props: { banksListing : bankListData } }
}
export default banksInIndia;
