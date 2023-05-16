import styles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ } from "../../shared";
export function BankContent({cmsData}) {
  
  if (!cmsData || cmsData.length == 0 || Object.keys(cmsData).length === 0)
  return null;
  
  return (
    <>
      <section className={styles.eligible}>
        <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }}></div>
      </section>
      {cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
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
  );
}
