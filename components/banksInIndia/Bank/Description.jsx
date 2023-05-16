import styles from "./Description.module.css";
import {NavLink} from '../../ui';
import React from 'react';
import Image from "next/image";
export const Description = ({data}) => {
  return (
    <>
    <section className={styles.bankLoanDetail}>
      <div className="container">
        <div className={styles.logoandRatingBox}>
          <h1 className="font24 text2828 bottomborderf5a623 Innerheading fontMedium ">{data.lenderName}</h1>
          <figure>
          {data ? 
          // <NavLink href={`${process.env.BASE_URL}/banks-in-india/${data.lenderSlug}`}>
            <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + data.lenderLogo} width={166} height={40} alt={data.lenderName}/>
          // </NavLink>
          : <React.Fragment />}
          </figure>
          {data ? <span className={styles.ratingBox}>{data.lenderRating} <em className="ratingStar"></em> </span> : <React.Fragment />}
        </div>
        <div className={styles.bankText}>
          <p dangerouslySetInnerHTML={{__html: data && data.description}}></p>
        </div>
      </div>
    </section>
    </>
  );
};