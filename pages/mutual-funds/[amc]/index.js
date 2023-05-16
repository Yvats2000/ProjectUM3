import {getAmcContent} from "../../../services/blogs";
import {getAmc} from "../../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../../components/shared";
import {BankAmcDetails} from "../../../components/mutualFunds";

const amc = ({cmsData = [], rightNavBar, amcUrl, data, amcData})=>{
    const amcName = amcUrl.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `${amcName} - Explore MF Schemes, NAV, Performance & Returns 2023`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Complete List of ${amcName} 2023 - Check out VRO rating, NAV, SIP plan and Returns Calculation and Invest online in best ${amcName} scheme in few clicks. `,
        "url" : `${process.env.BASE_URL}/mutual-funds/${amcUrl}`
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
            "item": "${process.env.BASE_URL}/mutual-funds/${amcUrl}"  
        }]
    }`
    },
    {
        __html: `{
            "@context":"https://schema.org/",
            "@type":"Product",
            "name":"${amcName}", 
            "image":"${process.env.IMAGE_BASEURL+`/amc/icon/${amcData.data[0].data[0].amcLogo}`}",
            "description":"${cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Complete List of ${amcName} 2023 - Check out VRO rating, NAV, SIP plan and Returns Calculation and Invest online in best ${amcName} scheme in few clicks. `}",
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
            <BankAmcDetails amcName={amcName} amcUrl={amcUrl} amcList={data} amcData={amcData} cmsData={cmsData}/>
        </>
    );
}
export async function getServerSideProps(context) {
    const amcUrl = context.params.amc
    const cmsData = await getAmcContent(amcUrl);
    const data = await getAmc('amc?onlyAmc=true');
    const amcData = await getAmc(`amc/${amcUrl}`);

    if (amcData && amcData.data.length === 0) {
        return {
          notFound: true,
        }
    }
    data && data.data.map((item, index) => ( amcUrl === item.amcSlug ? [data.data[0],data.data[index]] = [data.data[index], data.data[0]] : ""))
    return { props: { cmsData : cmsData, amcUrl : amcUrl, data : data, amcData : amcData } }
}
export default amc;