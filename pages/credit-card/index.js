import {CreditCardHome} from '../../components/creditCard';
import { MetaHead, SchemaHead } from "../../components/shared";
import {getCategoryBlog} from "../../services/blogs";
import commonFunctions from './../../utils/CommonFunctions';
const CreditCards = ({rightNavBar,blogsData}) => {
  const metaData = {
    "title" : "Credit Card - Apply Online for Best Credit Cards in India 2023",
    "description" : "Credit Cards - Compare and apply online for the best credit cards in India with maximum benefits and hassle free process.",
    "url" : `${process.env.BASE_URL}/credit-card`
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
          "item": "${metaData.url}"
        }]
      }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <CreditCardHome blogsData={blogsData}/>
    </>
  );
}
export async function getServerSideProps(context) {
  const blogsData = await getCategoryBlog('cibil-score');
  return { props:{ blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [] }}
}
export default CreditCards;
