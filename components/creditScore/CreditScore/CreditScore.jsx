import { InternalBlog,FAQ } from "../../../components/shared";
import { MainPage } from "./../MainPage";
import { CreditScoreNew } from "../CreditScoreNew";
import { RightSideBar } from "../../shared";
import rightSideBarData from "../../../data/internalRightSidebar.json"
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
import styles from "./CreditScore.module.css";
export const CreditScore = ({blogsData,cmsData,master,bankProducts}) => {
  let bankProductData = bankProducts.bank_products
  let interLinkingOtherBankArray = {"text": `Home Loan By Other Banks`,"child": []};
  let interPersonalLoanArray = {"text": `Personal Loan By Other Banks`,"child": []};
  let arraydata1 = bankProductData && bankProductData.length > 0 && bankProductData.map((data) => data.products.map((item) => (item.productPath === 'home-loan' ? interLinkingOtherBankArray.child.push({"text": data.lenderText + " " + item.productText,"path": `/banks-in-india/${data.lenderPath}/${item.productPath}`}) : null)));
  let arraydata2 = bankProductData && bankProductData.length > 0 && bankProductData.map((data) => data.products.map((item) => (item.productPath === 'personal-loan' ? interPersonalLoanArray.child.push({"text": data.lenderText + " " + item.productText,"path": `/banks-in-india/${data.lenderPath}/${item.productPath}`}) : null)));
  const dataPush = (item)=>{
    if (!rightSideBarData.find(({text}) => text === item.text)) {
      rightSideBarData.push(item);
    }
  }
  interLinkingOtherBankArray && interLinkingOtherBankArray.child.length > 0 &&  dataPush( interLinkingOtherBankArray);
  interPersonalLoanArray && interPersonalLoanArray.child.length > 0 &&  dataPush(interPersonalLoanArray);
  return (
    <>
    {process.env.CREDIT_SCORE_VENDOR === '2' ? <MainPage /> : process.env.CREDIT_SCORE_VENDOR === '3' ? 
    <CreditScoreNew master={master}/> :null}
    {cmsData && cmsData[0] &&
        <section className={` ${cmsStyles.crediScoore} mt30 mb50`}>
          <div className={`container ${styles.creditCont}`}>
            <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className={` ${cmsStyles.eligible} ${styles.creditDesc}`} ></div>  
            <RightSideBar menuLinks={rightSideBarData} creditScore={false} />
          </div>
        </section>
      }
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
    <InternalBlog data={blogsData} />
    </>
  );
}
