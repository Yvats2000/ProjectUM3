import { HomePage } from "../components/homePage";
import { MetaHead, SchemaHead } from "../components/shared";
import {getMaster} from "../services/master";
import {getLatestBlog,getCategoryBlogHome} from "../services/blogs";
import  externalLinksHomePage from "../data/externalLinkHomePage.json";
import { getAmc } from "../services/mutualFunds";
import commonFunctions from './../utils/CommonFunctions';
const index = ({ourPartner, blogsData, rightNavBar,externalLinksHomePageData,blogCategory, amcLists}) => {
  const metaData = {
    "title" : "Urban Money - One Fintech for all Banking and Finance Services",
    "description" : "One fintech company for all your banking and finance services. Urban Money provides state-of-the-art digital finance solutions. Visit now to know more about fintech solutions & services offered by our allied partners.",
    "keywords" : "fintech,finance services,banking and finance,banking & finance,urban money,digital finance,finance solutions,fintech solutions,fintech services",
    "url" : `${process.env.BASE_URL}`
  }
  const schemaData = [
    {
      __html: `{        
        "@context": "https://schema.org",
        "@type": "Organization",
        "url": "${process.env.BASE_URL}",
        "logo": "${process.env.IMAGE_BASEURL}/images/logoBlack.svg",
        "contactPoint":[{
          "@type":"ContactPoint",
          "telephone":"1800 208 3344",
          "contactType":"customer service",
          "areaServed":"IN"
        }]
    }`
    },
    {
      __html: `{
        "@context": "http://schema.org/",
        "@type": "LocalBusiness",
        "@id": "",
        "name": "Urban Money",
        "image": "${process.env.IMAGE_BASEURL}/images/logoBlack.svg",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "9th Floor, Good Earth Business Bay",
          "addressLocality": "Sector 58",
          "addressRegion": "Gurgaon",
          "addressCountry": "India"
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
                       "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday"
                    ],
            "opens": "09:00",
            "closes": "21:00"
          }
        ],
        "sameAs": []
      }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <HomePage ourPartner={ourPartner} blogCategory={blogCategory} blogsData={blogsData} externalLinksHomePageData={externalLinksHomePageData} amcLists={amcLists} />
    </>
  );
}
export async function getServerSideProps() {
  const bankPartnerData = await getMaster("bank_partner");
  const blogsData = await getLatestBlog(9);
  const blogCategory = await getCategoryBlogHome();  
  const amcLists = await getAmc('amc?onlyAmc=true');
    if (amcLists && Object.keys(amcLists).length === 0) {
        return {
          notFound: true,
        }
    }
  return { props: { ourPartner : bankPartnerData,blogCategory:blogCategory, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : [] , externalLinksHomePageData : externalLinksHomePage, amcLists : amcLists } }
}
export default index;
