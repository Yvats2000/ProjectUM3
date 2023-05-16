import React, { useState } from 'react';
import styles from "./RightSideBar.module.css";
import Image from "next/image";
import {NavLink} from '../../ui';
import {LeadFormBody} from '../../shared/LeadPopup';
import { ThanksBody } from '../PopUp/ThanksBody';
export const RightSideBar = ({menuLinks=[],paddingTop, creditScore = true, productName, mgTop = true}) => {
  const [openLeadPopup, setLeadPopup] = useState(true);
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
  if (!menuLinks || menuLinks.length == 0)
  return null;
  let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
  return (
    <div className={`${paddingTop?styles.creditDescTile:null}  `} id="enquireNow">
      <h3 className={`font16 font600 text181d mb15 ${mgTop ? 'mt30' : ''}`}>Need Loan Assistance?</h3>
      {openLeadPopup?<LeadFormBody productName={productName} formRight={true} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)}/>:null}
      {openThankYouPopup ? <ThanksBody ShowHeader={false} title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
      {menuLinks.map((menu, index) => (
      <>
      {index === 1 && creditScore && <div className={`${styles.creditTile} ${styles.creditImg} mb16 ${styles.removePadding}`}>
      <NavLink href={`${process.env.BASE_URL}/credit-score`}>
        <Image className={`imgResponsive`} src={process.env.IMAGE_BASEURL + '/images/creditscore.png'} layout='responsive' width = {250} height = {250} alt="Credit Score" />
      </NavLink>
    </div>}
    {menu &&<> 
      <h3 className="font16 font600 text181d mb15 mt30">{menu.text}</h3>
      <div className={`${styles.creditTile} mb16`} key={index}>
       <ul className={styles.btmoverflow}>
       {menu.child && menu.child.length > 0 && menu.child.map((subMenu, subIndex) => (
          <li key={subIndex}><NavLink href={`${process.env.BASE_URL}${subMenu.path}`} className={`font14 lineHeight22`}>{subMenu.text}</NavLink></li>
        ))}
       </ul>
      </div></>}</>
      ))}
    </div>
  );
};


