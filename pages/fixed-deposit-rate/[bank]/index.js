import { BankFdRates } from "../../../components/fixedDeposit";
import {getBankFixedDeposit} from "../../../services/blogs";
import {getBankFD} from "../../../services/fixedDeposit";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { getMaster } from "../../../services/master";

const bankFixedDeposit = ({cmsData = [],bankSlug, rightNavBar, bankFdData = {}, topBanks})=>{
    const bankName = bankSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `${bankName} FD Rate - Schemes, Plans, Features, and Benefits`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `${bankName} FD Rates 2023 - Know ${bankName} Fixed Deposit Scheme, Plan, Types, Benefits, Eligibility & Documents required to open ${bankName} FD.`,
        "url" : `${process.env.BASE_URL}/fixed-deposit-rate/${bankSlug}`
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
            "name": "${bankName}",
            "item": "${process.env.BASE_URL}/fixed-deposit-rate/${bankSlug}"  
        }]
    }`
    },
    {
        __html: `{
            "@context": "https://schema.org",
            "@type": "InvestmentOrDeposit",
            "name": "${bankName} FD Rates",
            "description": "${bankName} FD Rates",
            "amount": {
              "@type": "MonetaryAmount",
              "currency": "INR",
              "minValue": "1000",
              "maxValue": "1,000,000"
            },
            "interestRate": "${bankFdData.minInterest || '6.25'}"
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
            <BankFdRates cmsData={cmsData} bankSlug={bankSlug} bankFdData={bankFdData} topBanks={topBanks}/>
        </>
    );
}
export async function getServerSideProps(context) {
    const bankSlug = context.params.bank;
    const cmsData = await getBankFixedDeposit(bankSlug);
    const bankFdData = await getBankFD(bankSlug);
    const topBanks = await getMaster("top_banks,top_fd_banks,top_fd_banks_scheme");
    if (bankFdData && Object.keys(bankFdData).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { cmsData : cmsData, bankSlug : bankSlug, bankFdData : bankFdData, topBanks:topBanks} }
}
export default bankFixedDeposit;