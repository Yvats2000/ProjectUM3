import {getGeneralContent} from "../../../services/blogs";
import { MetaHead, SchemaHead } from "../../../components/shared";
import { SectorList } from "../../../components/mutualFunds/sectorList/sectorList";
import { getAmc } from "../../../services/mutualFunds";

const Sectors = ({cmsData, rightNavBar,sectorList})=>{
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `Best Sectoral / Thematic Mutual Funds - Urban Money`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Find best Sectoral Mutual Funds to invest in India. Learn more about what is Thematic Mutual Funds in India & should i invest in Sectoral Mutual Funds.`,
        "url" : `${process.env.BASE_URL}/mutual-funds/sector`
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
            <SectorList sectorList={sectorList} cmsData={cmsData}/>
        </>
    );
}
export async function getServerSideProps(context) {
    const cmsData = await getGeneralContent(`mutual-funds/sector`);
    const sectorList = await getAmc('amc/master')
    if (sectorList && Object.keys(sectorList).length === 0) {
        return {
          notFound: true,
        }
    }
    return { props: { cmsData : cmsData, sectorList:sectorList && sectorList.master.sectorList} }
}
export default Sectors;