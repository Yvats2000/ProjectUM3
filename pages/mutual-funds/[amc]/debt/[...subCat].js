import {getAmc} from "../../../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import {getGeneralContent} from "../../../../services/blogs";
import { Category } from "../../../../components/mutualFunds/category/category";

const subCategory = ({cmsData = [], rightNavBar, fundsAmc, totalCounts, data,masterDefault, filterMaster,categoryName, pageNo})=>{
    const amcName = fundsAmc.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const amcCategrory = categoryName.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? `${cmsData[0].meta_title}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `${amcName} Debt-${amcCategrory} MF to Invest in 2023${pageNo != 0 ? ' | Page-'+pageNo : ''}`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? `${cmsData[0].meta_description}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `List of ${amcName} - Debt-${amcCategrory} MF for Investment in 2023. Check ${amcName} Debt-${amcCategrory} MF latest NAV, historical returns, performance, ratings by CRISIL, morningstar etcInvesting${pageNo != 0 ? ' | Page-'+pageNo : '.'}`,
        "url" : `${process.env.BASE_URL}/mutual-funds/${fundsAmc}/debt/${categoryName}`
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
            "name": "Debt",
            "item": "${process.env.BASE_URL}/mutual-funds/${fundsAmc}/debt"  
        },{
            "@type": "ListItem", 
            "position": 5, 
            "name": "${amcCategrory}",
            "item": "${process.env.BASE_URL}/mutual-funds/${fundsAmc}/debt/${categoryName}"  
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
            "text": `Debt`,
            "path": `/mutual-funds/${fundsAmc}/debt`, 
            "class": ""
        },
        {   
            "text": `${amcCategrory}`,
            "path": `/mutual-funds/${fundsAmc}/debt/${categoryName}`, 
            "class": ""
        }
    ];
    return (
        <>
            <MetaHead metaData={metaData} />
            <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
            <Category  titleText={`${amcName} Debt - ${amcCategrory}`} totalCounts={totalCounts} tableData={data} cmsData={cmsData} breadCrumbLinks={breadCrumbLinks} masterDefault={masterDefault} filterMaster={filterMaster} />
        </>
    );
}
export async function getServerSideProps(context) {
    const category = context.params.subCat;
    const fundsAmc = context.params.amc;
    const cmsData = await getGeneralContent(`/mutual-funds/${fundsAmc}/debt/${category}`);
    const data = await getAmc(`amc/${fundsAmc}/debt?category=${category}&limit=10&page=${context.query.page || '1'}&sortKey=${context.query.sortKey || 'return'}&sortOrder=${context.query.sortOrder || 'desc'}`, 'table');
    const filterMaster = await getAmc('amc/master');
    let queryMaster = {
        category_code: "3",
        category_type: [],
        amcSlug: [fundsAmc],
        category:[category[0].split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())+'-Debt'],
        rating:  "",
        sipDuration:  5,
        risk: []
    };
    if (data && data.data.data.length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { data : data && data.data, pageNo: context.query.page || 0,categoryName:category[0], totalCounts : data && data.headers && data.headers['x-total-count'], cmsData:cmsData, fundsAmc:fundsAmc, masterDefault : queryMaster, filterMaster : filterMaster && filterMaster.master } }
}
export default subCategory;