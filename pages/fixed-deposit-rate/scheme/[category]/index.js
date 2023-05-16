import {getSchemeType} from "../../../../services/blogs";
import {getFD} from "../../../../services/fixedDeposit";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import {FdTypeCategory} from "../../../../components/fixedDeposit/FdTypeCategory"
import { getMaster } from "../../../../services/master";


const fixedDepositTypeCategory = ({cmsData = [],categorySlug,rightNavBar, data = {}, topBanks, otherSchemes})=>{
    const categoryName = categorySlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `${categoryName} Fixed Deposit - ${categoryName} FD Interest Rates in 2023.`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `${categoryName} Fixed Deposit Interest Rates in 2023:  Know  Features & Benefits, Eligibility Criteria, of <type> FD. Check & Get the Top ${categoryName} Fixed Deposit Rates in India.`,
        "url" : `${process.env.BASE_URL}/fixed-deposit-rate/scheme/${categorySlug}`
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
            "name": "Fixed Deposit",
            "item": "${process.env.BASE_URL}/fixed-deposit-rate"  
        },{
            "@type": "ListItem", 
            "position": 3, 
            "name": "Fixed Deposit Types",
            "item": "${process.env.BASE_URL}/fixed-deposit-rate/scheme"
        },{
            "@type": "ListItem", 
            "position": 4, 
            "name": "Fixed Deposit Category",
            "item": "${process.env.BASE_URL}/fixed-deposit-rate/scheme/${categorySlug}"
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
            <FdTypeCategory data={data} slug={categorySlug} topBanks={topBanks} otherSchemes={otherSchemes} cmsData={cmsData} />
        </>
    );
}
export async function getServerSideProps(context) {
    const categorySlug = context.params.category;
    const cmsData = await getSchemeType(categorySlug);
    const fdData = await getFD();
    const topBanks = await getMaster("top_banks,top_fd_banks,top_fd_banks_scheme");

    let data = [];
    let otherSchemes = [];
    if (fdData && Object.keys(fdData).length > 0) {
        data = fdData.schemes.filter((item) => item.typeSlug === categorySlug);
        otherSchemes = fdData.schemes.filter((item) => item.typeSlug != categorySlug)
    }else{
        return {
            notFound: true,
        }
    }
    if (data && data[0] && data[0].isVisible === false && cmsData && Object.keys(cmsData).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { cmsData : cmsData, categorySlug : categorySlug,otherSchemes : otherSchemes,  data : data, topBanks:topBanks } }
}
export default fixedDepositTypeCategory;