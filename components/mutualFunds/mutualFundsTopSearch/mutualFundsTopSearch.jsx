import React from 'react'
import styles from "./mutualFundsTopSearch.module.css";
import { BreadCrumb  } from "../../shared";
import { FundSearch,FundSearchElastic } from '../../shared';
export const MutualFundsTopSearch = ({titleText,short_description}) => {
  return (
    <section className="topSection">
        <div className="container">
          <div className={styles.heading}>
            <div className={`${styles.mb15} ${styles.topSearch}`}>
                <h1 className="Innerheading mb35 font24 lineHeight36 text2828">{titleText}</h1>
                {/* <FundSearch innerPage={true} /> */}
                <FundSearchElastic innerPage={true} />
            </div>
            <p className="font14 lineHeight24 text444">{short_description}</p>        
          </div>
        </div>
      </section>
  )
}
