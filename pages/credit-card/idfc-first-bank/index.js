import { IDFCFirstBank } from "../../../components/bankPartners";
import { MetaHead, SchemaHead } from "../../../components/shared";
import {getCategoryBlog} from "../../../services/blogs";
import commonFunctions from './../../../utils/CommonFunctions';
const idfcFirstBankCreditCard = ({rightNavBar,blogsData}) => {
  const metaData = {
    "title" : "IDFC FIRST Bank Credit Card - Check Features, Benefits, Fees and Charges",
    "description" : "Apply for IDFC FIRST Bank Credit Card Online. Visit Urban Money to know more about IDFC FIRST Bank Credit Card types, rewards, benefits, eligibility & more",
    "url" : `${process.env.BASE_URL}/credit-card/idfc-first-bank`
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
          "name": "Credit Card",
          "item": "${process.env.BASE_URL}/credit-card"
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "IDFC FIRST Bank Credit Card",
          "item": "${metaData.url}"
        }]
      }`
    }
  ]
  const breadCrumbLinks = [
    {   
        "text": `Credit Card`,
        "path": `/credit-card`, 
        "class": ""
    },
    {   
        "text": `IDFC FIRST Bank`,
        "path": `/credit-card/idfc-first-bank`, 
        "class": ""
    }
];
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <IDFCFirstBank breadCrumbLinks={breadCrumbLinks} blogsData={blogsData}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const blogsData = await getCategoryBlog('cibil-score');
  return { props:{ blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [] }}
}
export default idfcFirstBankCreditCard;
