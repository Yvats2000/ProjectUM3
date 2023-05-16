import { YesBank } from "../../../components/bankPartners";
import { MetaHead, SchemaHead } from "../../../components/shared";
import {getCategoryBlog} from "../../../services/blogs";
import commonFunctions from './../../../utils/CommonFunctions';
const YesBankCreditCard = ({rightNavBar,blogsData}) => {
  const metaData = {
    "title" : "Yes Bank Credit Cards - Compare Benefits & Apply Online in India",
    "description" : "Yes Bank Credit Cards - Compare benefits and apply online for Yes Bank credit cards in India with rich benefits, features and hassle free process.",
    "url" : `${process.env.BASE_URL}/credit-card/yes-bank`
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
          "name": "Yes Bank Credit Card",
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
        "text": `Yes Bank`,
        "path": `/credit-card/yes-bank`, 
        "class": ""
    }
];
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <YesBank breadCrumbLinks={breadCrumbLinks} blogsData={blogsData}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const blogsData = await getCategoryBlog('cibil-score');
  return { props:{ blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [] }}
}
export default YesBankCreditCard;
