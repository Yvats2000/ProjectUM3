import React from "react";
import { FAQ, BreadCrumb, CreditScore, RightSideBar } from "../../shared";
import styles from "./category.module.css";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FilterTable } from "../../shared";
import { MutualFundsTopSearch } from "../mutualFundsTopSearch/mutualFundsTopSearch";
export const Category = ({ tableData, totalCounts = 0, cmsData, breadCrumbLinks = [], category = '', masterDefault = {}, filterMaster, titleText = '', recordsText = '', fundsAmc = '', risk = '', sector = '' }) => {

  let bankWiseAmcDataArray = { "text": "Top Mutual Fund Houses", "child": [] };
  filterMaster.amcList.map((item) => bankWiseAmcDataArray.child.push({ "text": item.fund, "path": "/mutual-funds/" + item.amcSlug }))

  return (
    <>
      {breadCrumbLinks && breadCrumbLinks.length > 0 && <div className="container">
        <BreadCrumb links={breadCrumbLinks} />
      </div>}
      <MutualFundsTopSearch breadCrumbLinks={breadCrumbLinks} titleText={cmsData && cmsData[0] && cmsData[0].post_title ? cmsData[0].post_title : titleText} short_description={cmsData && cmsData[0] && cmsData[0].short_description ? cmsData[0].short_description : ''} />
      <FilterTable fundsAmc={fundsAmc} tableData={tableData} totalCounts={totalCounts} filterMaster={filterMaster} category={category} masterDefault={masterDefault} recordsText={recordsText} risk={risk} sector={sector} />
      {cmsData && cmsData.length > 0 && category != '' &&
        <>
          <div className="container containerFlex">
            <section className={cmsStyles.eligible}>
              <div className="container">
                <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
              </div>
            </section>
            <RightSideBar menuLinks={[bankWiseAmcDataArray]} paddingTop={true} />
          </div>
          <CreditScore />
          {cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
            <section className="faq">
              <div className="container">
                <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
                <div className="faqBx">
                  <FAQ data={cmsData[0].faq_content} />
                </div>
              </div>
            </section>
            : null}
        </>}
    </>
  )
}
