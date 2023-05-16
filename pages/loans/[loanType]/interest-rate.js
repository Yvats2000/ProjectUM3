import { InterestRate } from "../../../components/product/Loan";
import {getCategoryBlog, getGeneralContent} from "../../../services/blogs";
import {getLoanTypeByCategory} from "../../../services/loans";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { useRouter } from 'next/router';
import {getIfscMaster, productTopBank} from "../../../services/banksInIndia";
import { getMaster } from "../../../services/master";
import commonFunctions from './../../../utils/CommonFunctions';
const Interest = ({productLoanData, cmsData, blogsData, rightNavBar, attributeData, bankProducts, productTop10Bank}) => {
  const router = useRouter()
  const loanType = router.query.loanType;
  let metaData = {}
  if(loanType === 'home-loan'){
    metaData = {
      "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `Home Loan Interest Rates - Current Housing Loan Rate 2023`,
      "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Get the lowest home loan interest rate starting at 6.5% per annum. Compare home loan interest rates of all banks, get details for private, public sector banks and HFCs.`,
      "keywords" : "",
      "url" : `${process.env.BASE_URL}/loans/${loanType}/interest-rate`
    }
  }
  if(loanType === 'personal-loan'){
    metaData = {
      "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `Personal Loan Interest Rates - Latest Interest Rate of all Banks 2023`,
      "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Check the latest Personal loan interest rates for private, public, and top NBFC Banks. Compare processing fees, and know about fixed vs floating interest rates.`,
      "keywords" : "",
      "url" : `${process.env.BASE_URL}/loans/${loanType}/interest-rate`
    }
  }
  const FaqArray = [];
  const addFaqJson = (question, answer) => {
    return `{
      "@type":"Question",
      "name":"${question.replace(/<[^>]*>?/gm, '')}",
      "acceptedAnswer":{"@type":"Answer",
      "text":"${answer.replace(/<[^>]*>?/gm, '')}"}
    }`
  } 
  cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addFaqJson(faqs.question,faqs.answer))))
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
          "name": "Loan",
          "item": "${process.env.BASE_URL}/loans"  
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "${loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}",
          "item": "${process.env.BASE_URL}/loans/${loanType}"  
        },
        {
          "@type": "ListItem", 
          "position": 4, 
          "name": "Interest Rate",
          "item": "${metaData.url}"  
        }]
      }`
    }
  ];
  const addfaqSchema = () => {
    return {
      __html: `{
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[${FaqArray}]
      }`
    }
  }
  FaqArray.length > 0 && schemaData.push(addfaqSchema());
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <InterestRate data={productLoanData} cmsData={cmsData} blogsData={blogsData} rightNavBar={rightNavBar} attributeData={attributeData} bankProducts={bankProducts} productTop10Bank={productTop10Bank}/>
    </>
  );
}


export async function getServerSideProps(context) {
  const loanType = context.params.loanType;
  if(loanType != 'home-loan' && loanType != 'personal-loan'){
    return {
      notFound: true,
    }
  }
  const productLoanData = await getLoanTypeByCategory(loanType);
  const blogsData = await getCategoryBlog(loanType);
  const cmsData = await getGeneralContent(`loans/${loanType}/interest-rate`);
  const attributeData = await getIfscMaster(`branch`);
  const bankProducts = await getMaster("bank_calculators");
  const productTop10Bank = await productTopBank(loanType);
  if (productLoanData && productLoanData.length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { productLoanData : productLoanData , productTop10Bank:productTop10Bank, cmsData : cmsData, bankProducts:bankProducts, attributeData:{attributeData}, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [] } }
}
export default Interest;
