import { Loan } from "../../../components/product/Loan";
import {getCategoryBlog,  getProductContent, getGeneralCatContent} from "../../../services/blogs";
import {getLoanType} from "../../../services/loans";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { useRouter } from 'next/router';
import {getIfscMaster, productTopBank} from "../../../services/banksInIndia";
import { getMaster } from "../../../services/master";
import commonFunctions from './../../../utils/CommonFunctions';


const dateWithMonthsDelay = (months) => {  
  const date = new Date()
  date.setMonth(date.getMonth() + months)
  return date
}
const LoanType = ({productLoanData, cmsData, blogsData, rightNavBar, attributeData, bankProducts, productTop10Bank, interLinkingData}) => {
  const router = useRouter()
  const loanType = router.query.loanType;
  const FaqArray = [];
  const addJsonSchema = (question, answer) => {
    return `{
      "@type":"Question",
      "name":"${question.replace(/<[^>]*>?/gm, '')}",
      "acceptedAnswer":{"@type":"Answer",
      "text":"${answer.replace(/<[^>]*>?/gm, '')}"}
    }`
  }
  cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.content.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer))))
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/loans/${loanType}",
        "name": "${loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}",
        "headline": "${renderMeta(loanType).title}",
        "description": "${renderMeta(loanType).description}"
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
          "name": "Personal Loan",
          "item": "${process.env.BASE_URL}/loans/${loanType}"  
        }]
      }`
    },
    {
      __html: `{
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": "${loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())}",
        "url":  "${renderMeta(loanType).url}",
        "image": "${process.env.IMAGE_BASEURL + '/images/logoBlack.svg'}",
        "description": "${renderMeta(loanType).description}",
        "sku": "UM",
        "mpn": "${Math.floor(Math.random()*90000) + 1000000}",         
        "aggregateRating": {
          "@type":"AggregateRating",
          "ratingValue":4.5,
          "bestRating":"5",
          "ratingCount":"2500"
         },
         "author": {
            "@type":"Organization",
            "name":"Urban Money"
          }
      }`
    },
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
      <MetaHead metaData={renderMeta(loanType)} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <Loan data={productLoanData} cmsData={cmsData} blogsData={blogsData} rightNavBar={rightNavBar} attributeData={attributeData} bankProducts={bankProducts} productTop10Bank={productTop10Bank} interLinkingData={interLinkingData} />
    </>
  );
}

const renderMeta = (loanType) => {
  switch (loanType) {
    case 'home-loan':
    return (
      {
        "title" : "Home Loan: Mortgage Loan Interest Rate & Eligibility - Urban Money",
        "description" : "Get quick sanctions in 5 min at the lowest home loan interest rate. Compare and choose the best mortgage loans as per your needs. Housing loan worth 70B+ crores disbursed annually**. Apply online now!",
        "keywords" : "home loan interest rate,home loan,mortgage loan,home loan eligibility,housing loan,housing loan interest rate,lowest home loan interest rate,home credit loans,home loan interest rate all bank,home loan interest",
        "url" : `${process.env.BASE_URL}/loans/${loanType}`
      }
    )
    case 'personal-loan':
      return (
        {
          "title" : "Personal Loan: Online Personal Loan Interest Rate & Eligibility - Urban Money",
          "description" : "Personal Loan: Apply for a persoanl loan with the lowest personal loan interest rate. Find your personal loan eligibility, interest rates by various provider, document required etc.Apply personal loan online now!",
          "keywords" : "personal loan,personal loan interest rate,instant personal loan,personal loan apply,personal loan eligibility,personal loan online apply,lowest personal loan interest rate,personal loan online,personal loan interest,low interest personal loans",
          "url" :  `${process.env.BASE_URL}/loans/${loanType}`
        }
      )
    case 'business-loan':
      return (
        {
          "title" : "Business Loan: Business Loan Interest Rate & Eligibility - Urban Money",
          "description" : "Apply for a business loan with the lowest business loan interest rate. To know more about new business loan, online business loan eligibility, and commercial loan interest rate, click now!",
          "keywords" : "business loan,business loan interest rate,apply for business loan,business loan eligibility,commercial loan interest rates,new business loans,online business loan,unsecured business loans,bank business loan,apply for business loan online",
          "url" :  `${process.env.BASE_URL}/loans/${loanType}`
        }
      )
    case 'loan-against-property':
      return (
        {
          "title" : "Loan Against Property: Interest Rate, Eligibility & Documents Required - Urban Money",
          "description" : "Loan Against Property: Learn more about LAP interest rate & eligibility criteria. Click now to know more about documents required for loan against property and application procedure online.",
          "keywords" : "loan against property,loan against property interest rate,loan against property eligibility,loan against property without income proof,documents required for loan against property,emi calculator for lap,lap interest rate,loan against property interest rate calculator,lap loan interest rate,loan against property mortgage",
          "url" :  `${process.env.BASE_URL}/loans/${loanType}`
        }
      )
    default:
    return ({
      "title" : "Urban Money",
      "description" : "Urban Money",
      "keywords" : "Urban Money",
      "url" : `${process.env.BASE_URL}`
    });
  }
}

export async function getServerSideProps(context) {
  const loanType = context.params.loanType;
  const productLoanData = await getLoanType(loanType);
  const blogsData = await getCategoryBlog(loanType);
  const cmsData = await getProductContent(loanType);
  const attributeData = await getIfscMaster(`branch`);
  const bankProducts = await getMaster("bank_calculators");
  const productTop10Bank = await productTopBank(loanType);
  const interLinkingData = await getGeneralCatContent(loanType);
  if (productLoanData && productLoanData.length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { productLoanData : productLoanData , productTop10Bank:productTop10Bank, cmsData : cmsData, bankProducts:bankProducts, attributeData:{attributeData}, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [], interLinkingData: interLinkingData } }
}
export default LoanType;
