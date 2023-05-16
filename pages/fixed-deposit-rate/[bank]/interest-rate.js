import {getGeneralContent} from "../../../services/blogs";
import { BankFdInterestRate } from "../../../components/fixedDeposit";
import { MetaHead, SchemaHead } from "../../../components/shared";

const bankFixedDepositInterestRate = ({cmsData = [],bankSlug, rightNavBar})=>{
    const bankName = bankSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());

    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title,
        "description" : cmsData.length > 0 && cmsData[0].meta_description,
        "keywords" : cmsData.length > 0 && cmsData[0].meta_keywords,
        "url" : `${process.env.BASE_URL}/fixed-deposit-rate/${bankSlug}/interest-rate`
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
        },{
            "@type": "ListItem", 
            "position": 4, 
            "name": "${bankName} Interest Rate",
            "item": "${process.env.BASE_URL}/fixed-deposit-rate/${bankSlug}/interest-rate"  
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
            "interestRate": "1.25"
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
            <BankFdInterestRate />
        </>
    );
}
export async function getServerSideProps(context) {
    const bankSlug = context.params.bank;
    const cmsData = await getGeneralContent();
    /*if (cmsData && Object.keys(cmsData).length === 0) {
        return {
          notFound: true,
        }
    }*/
    return { props: { cmsData : cmsData, bankSlug : bankSlug } }
}
export default bankFixedDepositInterestRate;