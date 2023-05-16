import {getGeneralContent} from "../../../services/blogs";
import {getFD} from "../../../services/fixedDeposit";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { FdTypes } from "../../../components/fixedDeposit";
import { getMaster } from "../../../services/master";


const fixedDepositType = ({cmsData = [], rightNavBar, data = {}, topBanks})=>{
    const metaData = {
        "title" : cmsData.length > 0 ? cmsData[0].meta_title : 'Types of Fixed Deposits - Latest Fixed Deposit Types in India 2023',
        "description" : cmsData.length > 0 ? cmsData[0].meta_description : 'Banks and NBFCs in India offer a number of different types of fixed deposits (Tax Saving, NRE, NRO, NRI) according to the customer’s specific investment needs.',
        "url" : `${process.env.BASE_URL}/fixed-deposit-rate/scheme`
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
            <FdTypes data={data} topBanks={topBanks}/>
        </>
    );
}
export async function getServerSideProps(context) {
    //const cmsData = await getGeneralContent();
    const cmsData = [];
    const fdData = await getFD();
    const topBanks = await getMaster("top_banks,top_fd_banks,top_fd_banks_scheme");

    /*if (cmsData && Object.keys(cmsData).length === 0) {
        return {
          notFound: true,
        }
    }*/
    return { props: { cmsData : cmsData, data : fdData, topBanks: topBanks, } }
}
export default fixedDepositType;