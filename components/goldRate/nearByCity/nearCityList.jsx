import React from 'react'
import styles from './../gold&silver.module.css';
import {NavLink} from '../../ui';
import { useRouter } from 'next/router';
export const NearcityList = ({cityList,pageType,heading}) => {
  const router = useRouter();
  return (
    <>
        <div className={styles.ratesinTopCities}>
            <p className={styles.topCitesHeading}>{heading}</p>
            <ul>
              {cityList && cityList.filter((item) => item.slug != router.query.city).map((item, index) =>(
                <NavLink href={process.env.BASE_URL+`/${pageType ==='silver'?'silver-rate':'gold-rate'}/${item.slug}`} key={index}><li className="text2885db font12">{pageType ==='silver'? `Silver` : `Gold`}  Rate In {item.cityName}</li></NavLink>
              )) }
                
            </ul>
        </div>
    </>
  )
}
