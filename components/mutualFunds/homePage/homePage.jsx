import React from "react";
import { TopBanner } from "./topBanner";
import { MajorCategories } from "./majorCategories";
import { BestOfAll } from "./bestOfAll/bestOfAll";
import {MajorCategoriesTable} from "./majorCategoriesTable";
import {MajorSector} from "./majorSector";
import {FundHouse} from "./fundHouse";
import { CalculateInvestment } from "./calculateInvestment";
import {FAQ, CreditScore,InternalBlog} from '../../shared';
import {AboutFunds} from './aboutFunds'
export const HomePage = ({amcList,calculations, data,bestCategories,blogsData, FaqData = []}) => {
  return (
    <>
        <TopBanner/>
        <MajorCategories/>
        <BestOfAll data={data} />
        <FundHouse amcList={amcList}/>
        <MajorCategoriesTable data={bestCategories}/>
        <MajorSector/>
        <CalculateInvestment calculations={calculations}/>
        <AboutFunds />
        <CreditScore />
        {FaqData && FaqData.length > 0 ?
          <section className="faq">
            <div className="container">
              <h2 className="faqHeading font24">FAQs</h2>
              <p className="font14 lineHeight24 text444 mb45 faqP">From refinancing to reducing your interest, we have the answers right here.</p>
              <div className="faqBx">
                <FAQ data={FaqData} />
              </div>
            </div>
          </section>
        :null}
      <InternalBlog data={blogsData} />
    </>
  )
}
