import {} from "../../services/blogs";
import {getAmc} from "../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../components/shared";
import { HomePage } from "../../components/mutualFunds";
import sipMonthly from '../../data/sipMonthlyCalculations.json';
import FaqData from '../../data/MutualFunds.json'
import {getCategoryBlog} from "../../services/blogs";
import commonFunctions from './../../utils/CommonFunctions';
const mutualFunds = ({rightNavBar,amcList, data,bestCategories,blogsData})=>{
    const metaData = {
        "title" : `Mutual Funds: MF Investment Options, Features & Benefits`,
        "description" :  `Mutual Funds for investment Apply for mutual funds with Urban Money. Find your mutual funds eligibility, features & benefits, documents required, etc. Apply mutual funds online now!`,
        "url" : `${process.env.BASE_URL}/mutual-funds`
    }
    const FaqArray = [];
    const addJsonSchema = (question, answer) => {
    return `{
        "@type":"Question",
        "name":"${question.replace(/<[^>]*>?/gm, '')}",
        "acceptedAnswer":{"@type":"Answer",
        "text":"${answer.replace(/<[^>]*>?/gm, '')}"}
    }`
    } 
    FaqData && FaqData.length > 0 && FaqData.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer)))
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
        }]
    }`
    },
    {
        __html: `{
            "@context":"https://schema.org/",
            "@type":"Product",
            "name":"Urban Money - Mutual Fund Investment Platform",
            "image":"${process.env.BASE_URL}/assets/images/newmutualfundbanner.webp",
            "description":"Invest in mutual funds online with Urban Money. Check your mutual funds eligibility, features & benefits, documents required, etc. Apply mutual funds online now!",
            "url":"${process.env.BASE_URL}/mutual-funds",
            "sku":"UM",
            "mpn":"UM-102876", 
            "aggregateRating": {
                "@type":"AggregateRating",
                "ratingValue":4.5,
                "bestRating":"5",
                "ratingCount":"3037"
            },
            "author": {
                "@type":"Organization",
                "name":"Urban Money"
            }
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
            <HomePage amcList={amcList} calculations={sipMonthly} data={data} FaqData={FaqData} bestCategories={bestCategories} blogsData={blogsData}/>
        </>
    );
}
export async function getServerSideProps(context) {
    
    const amcList = await getAmc('amc?onlyAmc=true');
    const data = await getAmc('amc?isHomePage=true&limit=20&page=1');
    const blogsData = await getCategoryBlog(`mutual-funds`);
    const bestCategories = await getAmc('amc?categoryWise=true&limit=20&page=1');
    return { props: {amcList:amcList,blogsData:commonFunctions.relatedArticles(blogsData), data : data, bestCategories:bestCategories } }
}
export default mutualFunds;