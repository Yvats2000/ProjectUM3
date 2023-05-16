import styles from "./OurPartner.module.css";
import Image from "next/image";
import {NavLink} from '../../ui';
import { useState } from "react";

export const OurPartner = ({data}) => {
  const [ activeTab, setActiveTab ] = useState(0);
  const handleClick = (e, index) => {
    e.preventDefault();
    setActiveTab(index)
  };
  if(!data || data.length==0)
    return null;
  return (
    <section className={styles.outPartner}>
      <div className="container">
        <h2 className="font24 fontMedium textBlack textCenter ourBlog">Our Partners</h2>
        <p className="font14 text282 textCenter">Get in-depth knowledge about all things related to loans and your finances</p>
        <ul className={styles.partnerFilter}>
          {data && data.bank_partner.map((option, index) => 
            <li className={`${activeTab === index ? styles.active : ''} font14`} key={index} onClick={(e) => handleClick(e, index)}>{option.productName}</li>
          )} 
        </ul>
        {data && data.bank_partner.map((option, index) =>
        <div className={`${styles.parterLogo} ${activeTab === index ? '' : 'displayNone'}`} key={index}>
        {option.lenders.map((option, subIndex) => 
          <figure className={styles.partLogo} key={subIndex}>
            <NavLink href={`${process.env.BASE_URL}/banks-in-india/${option.lenderSlug}/${data.bank_partner[index].productSlug}`}><Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + option.lenderLogo} width={167} height={75} alt={option.lenderName + ' ' + data.bank_partner[index].productName}/></NavLink>
            <span className="circle"></span>
          </figure>
        )} 
        </div>
        )}
      </div>
    </section>
  );
};
