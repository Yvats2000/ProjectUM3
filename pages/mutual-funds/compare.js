import {CompareFunds} from "./../../components/mutualFunds";
import {getAmc} from "../../services/mutualFunds";
import { MetaHead, SchemaHead } from "./../../components/shared";
const compareFund = ({data, rightNavBar}) => {
  const metaData = {
    "title" : "Compare Mutual Funds Online - Return, Risk, and Performance Comparison",
    "description" : "Compare various mutual funds with including NAV, risk statistics, portfolio, expanse ratio, fund started, exit load, fees and pros & cons.",
    "url" : `${process.env.BASE_URL}/mutual-funds/compare`
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
            "name": "Mutual Funds",
            "item": "${process.env.BASE_URL}/mutual-funds"  
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "Compare",
          "item": "${process.env.BASE_URL}/mutual-funds/compare"  
      }]
    }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <CompareFunds data={data}/>
    </>
  )
}
export async function getServerSideProps(context) {
  const data = await getAmc(`amc/compare?f[schemecode]=${context.query.schemeCode}`);
  return { props: { data : data && data.data?data.data: '' } }
   
}
export default compareFund