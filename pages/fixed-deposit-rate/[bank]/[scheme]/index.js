import { BankFdSchemes } from "../../../../components/fixedDeposit";
import {getBankSchemeFixedDeposit} from "../../../../services/blogs";
import {getBankFDScheme} from "../../../../services/fixedDeposit";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import { getMaster } from "../../../../services/master";
import  externalLinksHomePage from "../../../../data/externalLinkHomePage.json";
import {getFD, getBankFD} from "../../../../services/fixedDeposit";



const bankFixedDepositScheme = ({cmsData = [],bankSlug, schemeSlug, bankSchemeFdData= [], rightNavBar, topBanks, externalLinksHomePageData, fdData, bankFdData})=>{
    const bankName = bankSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const schemeName = schemeSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());

    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `${schemeName} 2023`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Check detail about ${schemeName} - ✓Eligibility, ✓Interest Rates, ✓Features, ✓Benefits. Know more details about ${schemeName}.`,
        "url" : `${process.env.BASE_URL}/fixed-deposit-rate/${bankSlug}/${schemeSlug}`
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
            "name": "${schemeName}",
            "item": "${process.env.BASE_URL}/fixed-deposit-rate/${bankSlug}/${schemeSlug}"  
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
            <BankFdSchemes cmsData={cmsData} bankSlug={bankSlug} schemeSlug={schemeSlug} bankSchemeFdData={bankSchemeFdData} topBanks={topBanks} rightNavBar={rightNavBar} externalLinksHomePageData={externalLinksHomePageData} fdData={fdData} bankFdData={bankFdData}/>
        </>
    );
}
export async function getServerSideProps(context) {
    const bankSlug = context.params.bank;
    const schemeSlug = context.params.scheme;
    const cmsData = await getBankSchemeFixedDeposit(bankSlug, schemeSlug);
    const bankSchemeFdData = await getBankFDScheme(bankSlug, schemeSlug);
    const topBanks = await getMaster("top_banks,top_fd_banks,top_fd_banks_scheme");
    const fdData = await getFD();
    const bankFdData = await getBankFD(bankSlug);


    if (bankSchemeFdData && Object.keys(bankSchemeFdData).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { cmsData : cmsData, bankSlug : bankSlug, bankFdData:bankFdData, fdData: fdData, schemeSlug : schemeSlug, bankSchemeFdData: bankSchemeFdData, topBanks:topBanks, externalLinksHomePageData : externalLinksHomePage } }
}
export default bankFixedDepositScheme;