import {getAmcCategory} from "../../../services/blogs";
import {getAmc} from "../../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { Category } from "../../../components/mutualFunds/category/category";

const veryHigh = ({cmsData = [], rightNavBar, fundsAmc, totalCounts,  data, filterMaster, pageNo})=>{
    const amcName = fundsAmc.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? `${cmsData[0].meta_title}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `${amcName} Moderately High MF to Invest in 2023${pageNo != 0 ? ' | Page-'+pageNo : ''}`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? `${cmsData[0].meta_description}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `List of ${amcName} - Moderately High MF for investment in 2023. Check ${amcName} Moderately High MF latest NAV, historical returns, performance, ratings by CRISIL, morningstar etcInvesting${pageNo != 0 ? ' | Page-'+pageNo : '.'}`,
        "url" : `${process.env.BASE_URL}/mutual-funds/${fundsAmc}/moderately-high`
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
            "name": "${amcName}",
            "item": "${process.env.BASE_URL}/mutual-funds/${fundsAmc}"  
        },{
            "@type": "ListItem", 
            "position": 4, 
            "name": "Moderately High",
            "item": "${process.env.BASE_URL}/mutual-funds/${fundsAmc}/moderately-high"  
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
    const breadCrumbLinks = [
        {   
            "text": `Mutual Funds`,
            "path": `/mutual-funds`, 
            "class": ""
        },
        {   
            "text": `AMC`,
            "path": `/mutual-funds/amc`, 
            "class": ""
        },
        {   
            "text": `${amcName}`,
            "path": `/mutual-funds/${fundsAmc}`, 
            "class": ""
        },
        {   
            "text": `Moderately High`,
            "path": `/mutual-funds/${fundsAmc}/moderately-high`, 
            "class": ""
        }
    ];
    return (
        <>
            <MetaHead metaData={metaData} />
            <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
            <Category fundsAmc={fundsAmc} titleText={`${amcName} Moderately High`} risk={'Moderately High'} totalCounts={totalCounts} tableData={data} cmsData={cmsData} breadCrumbLinks={breadCrumbLinks} filterMaster={filterMaster} />
        </>
    );
}
export async function getServerSideProps(context) {
    const fundsAmc = context.params.amc;
    const cmsData = await getAmcCategory(fundsAmc,'moderately-high');
    const data = await getAmc(`amc/${fundsAmc}/moderately-high`, 'table');
    const filterMaster = await getAmc('amc/master');
    if (data && data.data.data.length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { data : data && data.data, pageNo: context.query.page || 0, totalCounts : data && data.headers && data.headers['x-total-count'], cmsData:cmsData, fundsAmc:fundsAmc, filterMaster : filterMaster && filterMaster.master} }
}
export default veryHigh;