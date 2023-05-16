import React from 'react'
import styles from './compareTile.module.css';
import Image from 'next/image';
import {AddFundsSearch} from './addFundsSearch';
import { useState } from 'react';
export const AddFunds = ({modelCenter=false, handleChange}) => {
  const [showSearch, setshowSearch] = useState(false);
  return (
    <div className={`${styles.tile} ${styles.addfunftile} `}>           
        <div className={styles.bankModel} onClick={()=>setshowSearch(!showSearch)}>
            <figure className="mb12 "><Image width={12} height={12} className="imgResponsive" src="/assets/images/addfundplusicon.svg" alt="" srcSet=""/></figure>
        </div>
        <p className="font13 lineHeight16 text444 fontsemiBold textCenter">Add Fund</p>
        {showSearch && <AddFundsSearch handleChange={handleChange} showSearch={showSearch} modelCenter={modelCenter} setshowSearch={setshowSearch}/>}
    </div>
  )
}
