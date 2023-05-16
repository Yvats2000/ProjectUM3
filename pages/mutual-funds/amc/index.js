import {getGeneralContent} from "../../../services/blogs";
import {getAmc} from "../../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../../components/shared";
import {AmcList} from "../../../components/mutualFunds";

const AmcFunds = ({cmsData, rightNavBar,amcLists})=>{
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `Mutual Funds Asset Management Companies (AMC) India 2023`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Asset Management Company - AMC gathers assets from various investors, creates a fund pool, and then gathers and invests in a diverse portfolio of equities, debt, and risk-free securities.`,
        "url" : `${process.env.BASE_URL}/mutual-funds/amc`
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
    cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer))))
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
            "name": "AMC",
            "item": "${process.env.BASE_URL}/mutual-funds/amc"  
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
            <AmcList amcLists={amcLists} cmsData={cmsData}/>
        </>
    );
}
export async function getServerSideProps(context) {
    const cmsData = await getGeneralContent(`mutual-funds/amc`);
    const amcLists = await getAmc('amc?onlyAmc=true');
    if (amcLists && Object.keys(amcLists).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { cmsData : cmsData, amcLists:amcLists} }
}
export default AmcFunds;