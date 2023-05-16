import { MainPage } from "../../components/investmentPlans";
import { MetaHead, SchemaHead } from "../../components/shared";
import { getMaster } from "../../services/master";
import {getGeneralContent} from "../../services/blogs";
const InvestmentDetail = ({rightNavBar, bankCalculators, cmsData}) => {
  const metaData = {
    "title" : "Investment Plans in India: Best Investment Options - Urban Money",
    "description" : "Discover best investment plans in India by a large number of banks available at Urban Money. Choose your investment options wisely from variety of products available by considering the ROI, lockin period, risk involved, tax rebate and T&C. Click now to know more.",
    "keywords" : "investment,investment plans,investment options,investment plans in india,investment choices",
    "url" : `${process.env.BASE_URL}/investment-plans`
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
        "url": "${process.env.BASE_URL}/investment-plans",
        "name": "Investment Plans",
        "headline": " Investment Plans in India: Best Investment Options - Urban Money",
        "description": "Discover best investment plans in India by a large number of banks available at Urban Money. Choose your investment options wisely from variety of products available by considering the ROI, lockin period, risk involved, tax rebate and T&C. Click now to know more."
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
          "name": "Investment Plans",
          "item": "${process.env.BASE_URL}/investment-plans"  
        }]
      }`
    }
  ]
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
      <MainPage cmsData={cmsData} rightNavBar={rightNavBar} bankCalculators={bankCalculators}/>
    </>
  );
}

export async function getServerSideProps(context) {
  const bankCalculators = await getMaster("bank_calculators,top_fd_banks");
  const genericUrl = context.resolvedUrl.substring(1);
   const cmsData = await getGeneralContent(`${genericUrl}`);
   if (cmsData && Object.keys(cmsData).length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { bankCalculators: bankCalculators,cmsData:cmsData } }
}
export default InvestmentDetail;
