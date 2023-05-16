import { FdRates } from "../../components/fixedDeposit";
import {getGeneralContent} from "../../services/blogs";
import {getFD} from "../../services/fixedDeposit";
import { MetaHead, SchemaHead } from "../../components/shared";
import { getMaster } from "../../services/master";
import  externalLinksHomePage from "../../data/externalLinkHomePage.json";
import FdRatesFaq from "../../data/FdRatesFaq.json";

const fixedDeposit = ({cmsData = [], rightNavBar, fdData = {}, topBanks, externalLinksHomePageData, FdRatesFaq})=>{
    const metaData = {
        "title" : "Fixed Deposit Interest Rate : Get Best FD Rates - Urban Money",
        "description" : "Fixed Deposit Rate: Apply for a fixed deposit with the lowest interest rate.  Compare Fixed Deposit Interest Rates of top banks and small finance banks in 2023.",
        "keywords" : "fd interest rates, fixed deposit, fixed deposit interest rate, fixed deposit rates, fd rates, fixed deposit interest, best fd interest rates",
        "url" : `${process.env.BASE_URL}/fixed-deposit-rate`
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
    cmsData && cmsData.length > 0 ? cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer)))) : FdRatesFaq && FdRatesFaq.length > 0 && FdRatesFaq.map((faqs) => FaqArray.push(addJsonSchema(faqs.question,faqs.answer)));
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
            <FdRates cmsData={cmsData} FdRatesFaq={FdRatesFaq} rightNavBar={rightNavBar} fdData={fdData} topBanks={topBanks} externalLinksHomePageData={externalLinksHomePageData} />
        </>
    );
}
export async function getServerSideProps(context) {
    //const cmsData = await getGeneralContent('fixed-deposit'); 
    const cmsData = [];
    const fdData = await getFD();
    const topBanks = await getMaster("top_banks,top_fd_banks,top_fd_banks_scheme");
    /*if (cmsData && Object.keys(cmsData).length === 0) {
        return {
          notFound: true,
        }
    }*/
    return { props: { cmsData : cmsData, fdData : fdData, topBanks: topBanks, externalLinksHomePageData:{externalLinksHomePage} , FdRatesFaq:FdRatesFaq} }
}
export default fixedDeposit;