import {getMutualFundsCategory} from "../../services/blogs";
import {getAmc} from "../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../components/shared";
import { Category } from "../../components/mutualFunds";

const debtFunds = ({cmsData = [], rightNavBar, totalCounts, data, filterMaster, pageNo})=>{
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? `${cmsData[0].meta_title}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `Debt Funds 2023: Invest in Best Debt Mutual Funds in India${pageNo != 0 ? ' | Page-'+pageNo : ''}`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? `${cmsData[0].meta_description}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `Invest in the best Debt Mutual Fund investment schemes in India. Explore Top-performing Debt funds Schemes along with their performance, returns and ratings with Urban Money${pageNo != 0 ? ' | Page-'+pageNo : '.'}`,
        "url" : `${process.env.BASE_URL}/mutual-funds/debt`
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
            "name": "Debt",
            "item": "${process.env.BASE_URL}/mutual-funds/debt"  
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
            "text": `Debt`,
            "path": `/mutual-funds/debt`, 
            "class": ""
        }
    ];
    return (
        <>
            <MetaHead metaData={metaData} />
            <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
            <Category titleText={`Debt Mutual Funds - 2023`} recordsText={'Debt'} category={'debt'} totalCounts={totalCounts} tableData={data} cmsData={cmsData} breadCrumbLinks={breadCrumbLinks} filterMaster={filterMaster} />
        </>
    );
}
export async function getServerSideProps(context) {
    const cmsData = await getMutualFundsCategory('debt');
    const data = await getAmc(`debt?limit=10&page=${context.query.page || '1'}&sortKey=${context.query.sortKey || 'return'}&sortOrder=${context.query.sortOrder || 'desc'}` , 'table');
    const filterMaster = await getAmc('amc/master');
    if (data && Object.keys(data).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { data : data && data.data, pageNo: context.query.page || 0, totalCounts : data && data.headers && data.headers['x-total-count'], cmsData:cmsData, filterMaster : filterMaster && filterMaster.master } }
     
}
export default debtFunds;