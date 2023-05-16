
import { getGeneralContent, getGeneralCalculatorLenders} from "../../services/blogs";
import {  MetaHead, SchemaHead } from "../../components/shared";
import {BankCalculatorHome, BankCalculatorList} from "../../components/calculator/BankCalculator";
import { getIfscMaster } from "../../services/banksInIndia";
import { getMaster } from "../../services/master";
const HomeBankCalculator = ({cmsData , rightNavBar , bankCalculators}) => {
  const metaData = {
    "title" : `Bank Calculators - Calculate EMIs Online on Types of Loans`, 
    "description" : `Calculate your EMIs on Home, personal, business loan etc through our AI based bank calculators and get an estimate amount.`,
    "url" : `${process.env.BASE_URL}/bank-calculator`
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
      __html: `
      {
        "@context": "https://schema.org/", 
        "@type": "BreadcrumbList", 
        "itemListElement": [{
          "@type": "ListItem", 
          "position": 1, 
          "name": "Home",
          "item": "${process.env.BASE_URL}"  
        },
        {
          "@type": "ListItem", 
          "position": 2, 
          "name": "Bank Calculator",
          "item": "${process.env.BASE_URL}/bank-calculator"  
        }
      ]
      }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} /> 
      <BankCalculatorHome cmsData={cmsData}  rightNavBar={rightNavBar} bankCalculators={bankCalculators}/>
     
    </>
  );
}
export async function getServerSideProps(context) {
  const cmsData=await getGeneralContent("bank-calculator")
  const bankCalculators=await getGeneralCalculatorLenders()
 
  if(bankCalculators && Object.keys(bankCalculators).length === 0){
    return {
      notFound:true,
    }
  }
  return{props:{ cmsData : cmsData , bankCalculators : bankCalculators}

}
}
export default HomeBankCalculator;
