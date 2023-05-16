import { BannerTop, TrendingProduct, MapSection, HowItWorks, OurPartner, MutualFunds, CheckCreditBanner } from "../homePage";
import {Carousel} from '../carousel'
import { HappyClient, HomeBlog,ExternalLinks } from "../shared";
import { FinancialCalculator } from "../calculator";
import { CreditBanner } from "../bankPartners/Ad/"
import Products from '../../data/trendingProducts.json';

export const HomePage = ({ourPartner, blogsData,externalLinksHomePageData,blogCategory, amcLists}) => {
  return (
    <>
      {/* <BannerTop /> */}
      <Carousel />
      <HappyClient />
      <CheckCreditBanner/>
      <TrendingProduct page="homePage" title="Trending Loans & Offers" products={Products} />
      <FinancialCalculator heading={true} />
      <CreditBanner />
      <HowItWorks />
      <HomeBlog data={blogsData} blogCategory={blogCategory}/>
      <OurPartner data={ourPartner || []} />
      <MapSection />
      <MutualFunds data={amcLists || []} />
      <ExternalLinks links={externalLinksHomePageData}/>
    </>
  );
}

