import React, { useState } from "react";
import styles from "./Description.module.css";
import {Loader, PopUp }  from "../../shared";
import Image from "next/image";
import { TileComparison } from "./TileComparison";
import {NavLink} from '../../ui';
// import { PrePaymentCalculator } from "../../../components/calculator";
import emiHomeLoan from '../../../data/homeLoanEmiCalculation.json'
import emiPersonalLoan from '../../../data/personalLoanEmiCalculation.json'
import { EmiCalculator } from "../../calculator";

export const Description = ({data, productName, title, bankName,cmsData, comparsion,bankSlugUrl, loanType}) => {
  const [loader,setLoader] = useState(false);
  const [activetab, setactiveTab] = useState(0)
  const [activeCalc, setActiveCalc] = useState('EMI Calculator')
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
  let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
  const renderSwitch = (activeCalc) => {
    switch (activeCalc){
      case 'EMI Calculator':
        return (
          
                <EmiCalculator calculatorType='emi-calculator' bankName={bankName} loanType={loanType} title={title.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase())} isInterest={true} calculation={title == 'home-loan' ?  emiHomeLoan : emiPersonalLoan} />
          
        )
        default : null
    }
  }
  const onTabClick = (tab,calc) => {
    setactiveTab(tab)
    setActiveCalc(calc)
  }

    return (
      <>
      {loader ? <Loader /> : <React.Fragment />}
      {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
      <section className={`${styles.bankLoanDetail} container mt15`}>
        <div className={styles.logoandRatingBox}>
          <h1 className="font24 text2828 bottomborderf5a623 Innerheading fontMedium mb25">{cmsData && cmsData.length > 0 ? cmsData[0].post_title : data[0].plans[0].lenderName + " " + productName}</h1>
          <figure className={styles.displayNoneOnMobile}>
            {data ? <NavLink href={`${process.env.BASE_URL}/banks-in-india/${data[0].plans[0].lenderSlug}`}><Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + data[0].plans[0].lenderLogo} width={166} height={40} alt={data[0].plans[0].lenderName}/></NavLink> : <React.Fragment />}
          </figure>
          {data ? <span className={styles.ratingBox}>{data[0].plans[0].lenderRating} <em className={styles.ratingStar}></em> </span> : <React.Fragment />}
        </div>
        {cmsData && cmsData.length > 0 && cmsData[0].short_description && 
        <div className={`${styles.bankText} mb30`}>
          <span dangerouslySetInnerHTML={{__html: cmsData[0].short_description}}></span>
        </div>}
        {cmsData && cmsData.length > 0 && cmsData[0].bank_specific_title && 
        <div className={styles.logoandRatingBox}>
          <h2 className="font24 text2828 bottomborderf5a623 fontMedium ">{cmsData[0].bank_specific_title}</h2>
        </div>}
        {cmsData && cmsData.length > 0 && cmsData[0].bank_specific_description && 
        <div className={`${styles.bankText} `}>
        <div dangerouslySetInnerHTML={{__html: cmsData[0].bank_specific_description}}></div>
        </div>}
        </section>
        <TileComparison cmsData={cmsData} data={data} loanType={loanType} bankSlugUrl={bankSlugUrl} bankName={bankName} comparsion={comparsion}/>
        <section className={`${styles.bankLoanDetail} container mt15`}>
        <div className={styles.buttonTab}>
            <button className={ activetab == 0 ?`${styles.active}` : null} onClick={() =>onTabClick(0,"EMI Calculator")}><figure><Image src={process.env.IMAGE_BASEURL + '/images/emi.svg'} width={19} height={18}  className="imgResponsive" alt="emi svg" /></figure>EMI Calculator</button>
            <NavLink href={`${process.env.BASE_URL}/loans/${title}/balance-transfer-calculator`}>
              <button> <figure><Image src={process.env.IMAGE_BASEURL + '/images/bt.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" /></figure>Balance Transfer</button>
            </NavLink> 
        </div>
        {renderSwitch("EMI Calculator")}
        </section>
      </>
    );
};