import styles from "../calculator.module.css";
import {CreditScore, BreadCrumb, FAQ, InterestRate, PopUp, InternalBlog} from "../../shared";
import Image from "next/image";
import React, {useState} from 'react';
import { NavLink } from "../../ui";
import { EligibilityLeadForm } from "./EligibilityLeadForm";
import { eligibilityCalApply } from "../../../services/calculators";
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
export const Eligibility = ({ loanType, title,cmsData, calculatorType, blogsData, rightNavBar }) => {
  const [banks, setBanks] = useState({});
  const [leadIdE, setLeadIdE] = useState('');
  const [offer, setOffer] = useState([]);
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
  const name = loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())
  let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
    //Financial calculators Box
    let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
    let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
    financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))
  const breadCrumbLinks = [
    {
      "text": "Calculators",
      "path": "/calculator",
      "class": ""
    },
    {
      "text": title + " Eligibility Calculator",
      "path": "/loans/"+loanType+"/"+calculatorType,
      "class": ""
    }
  ]

  const scrollTo = () => {
    var element = document.getElementById('bankOffers');
    var headerOffset = 70;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth"
    });   
  }

  const applyNowHandle = async (leadIdE, lenderSlug) => {
    await eligibilityCalApply(leadIdE, lenderSlug);
    setThankYouPopUp(true);
  }
  
  return ( 
  <>
    {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
    <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
    </div>
    <section className="calculator">
      <div className="container">
        <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">{title} Eligibility Calculator</h1>
        <div className={`${styles.calcBox} ${styles.coloumn}`}>
          <div className={`${styles.calc} ${styles.eligibilFull}`}>
            <div className={styles.buttonTab}>
              <NavLink href={`${process.env.BASE_URL}/loans/home-loan/eligibility-calculator`}><button className={loanType === "home-loan" ? `${styles.active}` : ""}><figure><Image src={process.env.IMAGE_BASEURL + '/images/emi.svg'} width={19} height={18}  className="imgResponsive" alt="emi svg" /></figure> Home Loan</button></NavLink>
              <NavLink href={`${process.env.BASE_URL}/loans/personal-loan/eligibility-calculator`}><button className={loanType === "personal-loan" ? `${styles.active}` : ""}> <figure><Image src={process.env.IMAGE_BASEURL + '/images/bt.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" /></figure>Personal Loan</button></NavLink>
              {/* <NavLink href={"/loans/business-loan/eligibility-calculator"}><button className={loanType === "business-loan" ? `${styles.active}` : ""}><figure><Image src={process.env.IMAGE_BASEURL + '/images/pre-pay.svg'} width={19} height={19}  className="imgResponsive" alt="prepay svg" /></figure> Business Loan</button></NavLink> */}
            </div>
              <EligibilityLeadForm loanType={loanType} setOffer={setOffer} scrollTo={scrollTo} setLeadIdE={setLeadIdE} setBanks={setBanks} />
          </div>
          
          </div>
          {banks && banks.eligibleLoanAmount && Object.keys(banks).length > 0 ?
            <div className={styles.resultBar}>
              <ul>
                  <li>
                      <p className="font12 textWhite textleft">Congratulations! <span>{banks.lenderName}
                          &nbsp;loan amount you can avail is:</span></p>
                          <p className={`textWhite ${styles.mainHead}`}>₹ {banks.eligibleLoanAmount && banks.eligibleLoanAmount ? parseInt(banks.eligibleLoanAmount).toLocaleString('en-IN') : '--'}</p>
                  </li>
              
                  <li>
                      <p className="textWhite font16">ROI (pa)</p>
                    <p className="textWhite font16 fontBold">{banks.roi && banks.roi ? banks.roi : '--'}</p>
                  </li>
              
                  <li>
                      <p className="textWhite font16">Tenure</p>
                      <p className="textWhite font16 fontBold">{banks.tenureYears && banks.tenureYears ? parseInt(banks.tenureYears) : '--'} Years</p>
                  </li>
              
                  <li>
                      <p className="textWhite font16">Monthly EMI</p>
                      <p className="textWhite font16 fontBold">₹ {banks.emiAmount && banks.emiAmount ? parseInt(banks.emiAmount).toLocaleString('en-IN') : '--'}</p>
                  </li>
              
                  <li>
                    <button className={`btn btn-primary  font12  ${styles.apply}`} onClick={() => applyNowHandle(leadIdE, banks.lenderSlug)}>APPLY NOW<em className="icon-arrow-right font14"></em></button>
                  </li>
                  <li>
                      <button className={`btn btn-primary ${styles.viewAll}`} onClick={() => scrollTo()}>VIEW ALL OFFERS <em className="icon-arrow-right font14"></em></button>
                  </li>
              </ul>
          </div> : null}
      </div>
    </section>
    <section className="content" id="bankOffers">
      <div className="container">
        {offer && Object.keys(offer).length > 0 && offer.hasOwnProperty('plans') ? <InterestRate interestRates={[...[], offer]} calculatorEmi={true} applyNow={leadIdE} /> : null}
      </div>
    </section>
    <section className={cmsStyles.eligible}>
      <div className="container">
        <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
      </div>
    </section>
    <CreditScore />
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
    <InternalBlog loanType={name} data={blogsData} />
  </>    
  );
};
