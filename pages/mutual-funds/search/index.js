import {getAmc} from "../../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { Category } from "../../../components/mutualFunds/category/category";

const searchFunds = ({rightNavBar, totalCounts, data, masterDefault, filterMaster, pageNo})=>{
    const metaData = {
        "title" : `Search Mutual Funds Online - Check Best Performing Funds of 2023${pageNo != 0 ? ' | Page-'+pageNo : ''}`,
        "description" : `Search for top-performing mutual funds in India. Explore Online Best MF Schemes, Performance, Returns, and Portfolio with Urban Money${pageNo != 0 ? ' | Page-'+pageNo : '.'}`,
        "url" : `${process.env.BASE_URL}/mutual-funds/search`
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
            "name": "Mutual Funds",
            "item": "${process.env.BASE_URL}/mutual-funds"  
        },{
            "@type": "ListItem", 
            "position": 3, 
            "name": "Search",
            "item": "${process.env.BASE_URL}/mutual-funds/search"  
        }]
    }`
    }
    ]
    const breadCrumbLinks = [
        {   
            "text": `Mutual Funds`,
            "path": `/mutual-funds`, 
            "class": ""
        },
        {   
            "text": `Search`,
            "path": `/mutual-funds/search`, 
            "class": ""
        }
    ];
    return (
        <>
            <MetaHead metaData={metaData} />
            <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
            <Category titleText={`Search for Mutual Funds`} totalCounts={totalCounts} tableData={data} breadCrumbLinks={breadCrumbLinks} masterDefault={masterDefault} filterMaster={filterMaster} />
        </>
    );
}
export async function getServerSideProps(context) {
    const filterMaster = await getAmc('amc/master');
    let masterDefault = {
        category_code: context.query && Object.keys(context.query).length > 0 ? context.query.categoryCode ? context.query.categoryCode.split(',') : [] : [],
        category_type: [],
        amcSlug: context.query && Object.keys(context.query).length > 0 ? context.query.amcSlug ? context.query.amcSlug.split(',') : [] : [],
        sector: context.query && Object.keys(context.query).length > 0 ? context.query.sectorSlug ? context.query.sectorSlug.split(',') : [] : [],
        category: context.query && Object.keys(context.query).length > 0 ? context.query.category ? context.query.category.split(',') : [] : [],
        rating: context.query && Object.keys(context.query).length > 0 ? context.query.rating || "" : "",
        sipDuration: context.query && Object.keys(context.query).length > 0 ? parseInt(context.query.sipDuration) || 5 : 5,
        risk: context.query && Object.keys(context.query).length > 0 ? context.query.risk ? context.query.risk.split(',') : [] : []
    };
    let str = [];
    let createFilterQueryString = (f) => {
        for (var p in f)
        if (f.hasOwnProperty(p)) {
            str.push(`f[${encodeURIComponent(p)}]` + "=" + encodeURIComponent(f[p]));
        }
        return str.join("&");
    }
    let queryMaster ={}
    Object.assign(queryMaster, masterDefault);
    if(queryMaster.category.length > 0){
        let category_code_array = [];
        let category_array = [];
        for (let i = 0; i < queryMaster.category.length; i++) {
        const el = queryMaster.category[i];
        const lastIndex = el.lastIndexOf("-");
        const category = el.slice(0, lastIndex);
        const category_code = el.slice(lastIndex + 1);
        category_code_array.push(category_code);
        category_array.push(category);
        }
        queryMaster.category_code = category_code_array;
        queryMaster.category = category_array;
    }
    if(queryMaster.category_code.length > 0){
        queryMaster.category_code =Array.from( new Set(queryMaster.category_code.map((el) => {
            const {category_code}=filterMaster.master.fundCategory.filter(f=>f.category_type === el.toLowerCase())[0]
            return category_code
        })))
    }
    const data = await getAmc(context.query && Object.keys(context.query).length > 4 ? `amc?`+createFilterQueryString(queryMaster)+ `&limit=10&page=${context.query.page || '1'}&sortKey=${context.query.sortKey || 'return'}&sortOrder=${context.query.sortOrder || 'desc'}` : `amc?limit=-1&page=${context.query.page || '1'}&sortKey=${context.query.sortKey || 'return'}&sortOrder=${context.query.sortOrder || 'desc'}`, 'table');
    if (data && Object.keys(data).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { data : data && data.data, pageNo: context.query.page || 0,  totalCounts : data && data.headers && data.headers['x-total-count'] ? data.headers['x-total-count'] : 0, masterDefault : masterDefault, filterMaster : filterMaster && filterMaster.master} }
}
export default searchFunds;