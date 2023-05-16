import {getGeneralContent} from "../../../services/blogs";
import {getAmc} from "../../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { Category } from "../../../components/mutualFunds";

const sectorFunds = ({cmsData = [], rightNavBar, totalCounts, data, filterMaster, pageNo, sectorUrl})=>{
    const sectorName = sectorUrl.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? `${cmsData[0].meta_title}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `${sectorName} Funds : Invest in Best Performing Bank Mutual Funds${pageNo != 0 ? ' | Page-'+pageNo : ''}`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? `${cmsData[0].meta_description}${pageNo != 0 ? ' | Page-'+pageNo : ''}` : `Find best ${sectorName} Mutual Funds to invest in India. Learn more about what is ${sectorName} Mutual Funds in India & should i invest in ${sectorName} Mutual Funds.${pageNo != 0 ? ' | Page-'+pageNo : '.'}`,
        "url" : `${process.env.BASE_URL}/mutual-funds/sector/${sectorUrl}`
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
            "name": "Sectoral Mutual Funds",
            "item": "${process.env.BASE_URL}/mutual-funds/sector"  
        },{
            "@type": "ListItem", 
            "position": 4, 
            "name": "${sectorName}",
            "item": "${process.env.BASE_URL}/mutual-funds/sector/${sectorUrl}"  
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
            "text": `Sectoral Mutual Funds`,
            "path": `/mutual-funds/sector`, 
            "class": ""
        },
        {   
            "text": `${sectorName}`,
            "path": `/mutual-funds/${sectorUrl}`, 
            "class": ""
        }
    ];
    return (
        <>
            <MetaHead metaData={metaData} />
            <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
            <Category titleText={`${sectorName} Mutual Fund`} sector={`${sectorUrl}`} recordsText={'Sector'} totalCounts={totalCounts} tableData={data} cmsData={cmsData} breadCrumbLinks={breadCrumbLinks} filterMaster={filterMaster} />
        </>
    );
}
export async function getServerSideProps(context) {
    const sectorUrl = context.params.sector
    const cmsData = await getGeneralContent(`mutual-funds/sector/${sectorUrl}`);
    const data = await getAmc(`${sectorUrl}-sectorPage?limit=10&page=${context.query.page || '1'}&sortKey=${context.query.sortKey || 'return'}&sortOrder=${context.query.sortOrder || 'desc'}` , 'table');
    const filterMaster = await getAmc('amc/master');
    if (data && Object.keys(data).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { data : data && data.data, pageNo: context.query.page || 0, totalCounts : data && data.headers && data.headers['x-total-count'], cmsData:cmsData, filterMaster : filterMaster && filterMaster.master, sectorUrl : sectorUrl } }
     
}
export default sectorFunds;