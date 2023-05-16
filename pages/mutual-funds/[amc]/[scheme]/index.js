import { getGeneralContent } from "../../../../services/blogs";
import {filterTable,fundDetails, getAmc, graphApi} from "../../../../services/mutualFunds";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import {FundDetail} from "../../../../components/mutualFunds";
import mutualFundsTabs from '../../../../data/schemeDetailsTabs.json'
import sipMonthly from '../../../../data/sipMonthlyCalculations.json';

const mutualFundsScheme = ({cmsData,DetailData,tableData, rightNavBar,fundsAmc,schemeSlug,mutualFundsTabs,amcData,category,graphData})=>{
    const amcName = fundsAmc.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const schemeName = schemeSlug.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const metaData = {
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `${schemeName}: Check Latest NAV, Fund Performance & Returns  `,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `${schemeName} - Get the Latest SIP Returns & Rankings, Ratings, NAV, Fund Performance, Expense Ratio, Holding Analysis Portfolio, etc.`,
        "url" : `${process.env.BASE_URL}/mutual-funds/${fundsAmc}/${schemeSlug}`
    }
    const price = DetailData && DetailData.schemeDetail && DetailData.schemeDetail.navValue
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
          "item": "${process.env.BASE_URL}/mutual-funds/${fundsAmc}"  
        },{
            "@type": "ListItem", 
            "position": 4, 
            "name": "${schemeName}",
            "item": "${process.env.BASE_URL}/mutual-funds/${fundsAmc}/${schemeSlug}"  
        }]
    }`
    },
    {
        __html: `{
          "@context":"https://schema.org/",
          "@type":"Product",
          "image":"${process.env.IMAGE_BASEURL+`/amc/icon/${DetailData.schemeDetail.amcLogo}`}",
          "name":"${metaData.title}",
          "description":"${metaData.description}",
          "url":"${metaData.url}",
          "categoires":"${category}",
          "Price": "₹${price}",             
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
            <FundDetail DetailData={DetailData} graphData={graphData} calculations={sipMonthly} fundsAmc={fundsAmc} schemeSlug={schemeSlug} tableData={tableData} mutualFundsTabs={mutualFundsTabs} amcData={amcData} category={category} cmsData={cmsData}/>
        </>
    );
}
export async function getServerSideProps(context) {
    const fundsAmc = context.params.amc;
    const schemeSlug = context.params.scheme;
    const DetailData = await fundDetails(fundsAmc,schemeSlug)
    const schemeCode = DetailData && DetailData.schemeDetail && DetailData.schemeDetail.schemecode
    const category=DetailData && DetailData.schemeDetail.category_type 
    const sub_category = DetailData && DetailData.schemeDetail && DetailData.schemeDetail.sub_category
    const tableData = await filterTable(sub_category,1)
    const amcData = await getAmc(`amc/${fundsAmc}?limit=21`);
    const cmsData = await getGeneralContent(`mutual-funds/${fundsAmc}/${schemeSlug}`);
    const graphData = await graphApi(schemeCode)
    if (typeof(DetailData) === 'undefined') {
        return {
          notFound: true,
        }
    }
    return { props: { cmsData : cmsData,fundsAmc:fundsAmc,schemeSlug:schemeSlug, DetailData:DetailData && DetailData, tableData: tableData,mutualFundsTabs:mutualFundsTabs , amcData:amcData , category:category, graphData:graphData} }
}
export default mutualFundsScheme;