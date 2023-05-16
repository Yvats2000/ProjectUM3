import React, {useState} from "react";
import styles from "./amcList.module.css";
import { Button } from "../../../components/ui/button"
import { BreadCrumb,FAQ,AmcCard, CreditScore } from "../../../components/shared";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
export const AmcList =({amcLists,cmsData}) =>{
  
  const records = 24;
  const [showNumberOfAmc, setShowNumberOfAmc] = useState(records);
  const viewMore = () => {
    setShowNumberOfAmc(showNumberOfAmc+records)
  }

  
  
  
  const breadCrumbLinks = [
    {   
      "text": `Mutual Funds`,
      "path": `/mutual-funds`, 
      "class": ""
    },
    {   
      "text": `AMC`,
      "path": `/mutual-funds/amc`, 
      "class": ""
    }
  ];

  return (
    <>
      <div className="container">
        <BreadCrumb links={breadCrumbLinks}/>
      </div>
      <div className={styles.fundHouseBox}>
        <div className="container">
          <h1 className="Innerheading mb35 font24 lineHeight36 text2828">{cmsData && cmsData[0] && cmsData[0].post_title ? cmsData[0].post_title : 'Fund Houses'}</h1>
          <p className="font14 lineHeight24 text444">{cmsData && cmsData[0] && cmsData[0].short_description ? cmsData[0].short_description : ''}</p>
        </div>
      </div>
      <div className={`${styles.fundClientmainBx} mb40`}>
        <div className="container">
          <div className={styles.fundClientsTiles}>
            {
              amcLists && amcLists.data.map((data, index) =>
                <AmcCard data={data} key={index} index={index} showNumberOfAmc={showNumberOfAmc} />
              )
            }
          </div>
        </div>
        {showNumberOfAmc < amcLists.data.length ?
          <div className={styles.btncenter}>
            <Button className="btn btn-primary font14 btn25 textCenterSm btnFull" onClick={() => viewMore()}>Show More <em className="icon-arrow-right font14"></em></Button>
          </div>
        :null}
      </div>
      {cmsData && cmsData[0] &&
        <section className={`${cmsStyles.eligible} mb50`}>
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt15"></div>  
          </div>
        </section>
        }
        <CreditScore />
        {cmsData && cmsData[0] && cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
        <section className="faq">
          <div className="container">
            <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
            <div className="faqBx">
              <FAQ data={cmsData[0].faq_content}  />
            </div>
          </div>
        </section>
        :null}
    </>
  )
}