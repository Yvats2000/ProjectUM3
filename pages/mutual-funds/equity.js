import {getMutualFundsCategory} from "../../services/blogs";
import {getAmc} from "../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../components/shared";
import { Category } from "../../components/mutualFunds";

const equityFunds = ({cmsData = [], rightNavBar, totalCounts, data, filterMaster, pageNo})=>{
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? `${cmsData[0].meta_title}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `Equity Funds 2023: Invest in Best Equity Mutual Funds in India${pageNo != 0 ? ' | Page-'+pageNo : ''}`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? `${cmsData[0].meta_description}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `Best Equity Mutual funds 2023 in India - Explore Top-performing Equity funds and invest in large-cap, small-cap, mid-cap, and many more equity funds online with Urban money${pageNo != 0 ? ' | Page-'+pageNo : '.'}`,
        "url" : `${process.env.BASE_URL}/mutual-funds/equity`
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
            "name": "Equity",
            "item": "${process.env.BASE_URL}/mutual-funds/equity"  
        }]
    }`
    },
    {
        __html : `{
            "@context":"https://schema.org/",
            "@type":"Product",
            "name":"${metaData.title}",
            "description":"${metaData.description}",
            "url":"${metaData.url}",
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
            }

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
            "text": `Equity`,
            "path": `/mutual-funds/equity`, 
            "class": ""
        }
    ];
    return (
        <>
            <MetaHead metaData={metaData} />
            <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
            <Category titleText={`Equity Mutual Funds - 2023`} category={'equity'} recordsText={'Equity'} totalCounts={totalCounts} tableData={data} cmsData={cmsData} breadCrumbLinks={breadCrumbLinks} filterMaster={filterMaster} />
        </>
    );
}
export async function getServerSideProps(context) {
    const cmsData = await getMutualFundsCategory('equity');
    const data = await getAmc(`equity?limit=10&page=${context.query.page || '1'}&sortKey=${context.query.sortKey || 'return'}&sortOrder=${context.query.sortOrder || 'desc'}` , 'table');
    const filterMaster = await getAmc('amc/master');
    if (data && Object.keys(data).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { data : data && data.data, pageNo: context.query.page || 0, totalCounts : data && data.headers && data.headers['x-total-count'], cmsData:cmsData, filterMaster : filterMaster && filterMaster.master } }
     
}
export default equityFunds;