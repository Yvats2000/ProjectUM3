import { MainPage } from "../../components/product/Loan";
import {getProductPlans} from "../../services/loans";
import { MetaHead, SchemaHead } from "../../components/shared";
const LoanDetail = ({loanTypes, rightNavBar}) => {
  const metaData = {
    "title" : "Online Loans: Bank Loan Types, EMI & Tenure - Urban Money",
    "description" : "Online Loans: Learn about bank loan types, loan EMI, cash loans, small loans, short-term loans, long-term loans, and loan tenure for various needs. Apply for a loan near you now!",
    "keywords" : "loans,loan,online loans,bank loan,loan types,loan emi,cash loans,small loans,short term loans,long term loans,loans near me",
    "url" : `${process.env.BASE_URL}/loans`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url":"${process.env.BASE_URL}/loans",
        "name": "Loan",
        "headline": "Online Loans: Bank Loan Types, EMI & Tenure - Urban Money",
        "description": "Online Loans: Learn about bank loan types, loan EMI, cash loans, small loans, short-term loans, long-term loans, and loan tenure for various needs. Apply for a loan near you now!."
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
          "name": "Loan",
          "item": "${process.env.BASE_URL}/loans"  
        }]
      }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <MainPage data={loanTypes} />
    </>
  );
}
export async function getServerSideProps(context) {
  const loanTypesData = await getProductPlans();
  return { props: { loanTypes : loanTypesData } }
}
export default LoanDetail;
