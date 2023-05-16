import styles from './compareWidget.module.css';
import { CompareTile } from '../compareTile';
import {useGlobalContext} from '../../../../libs/context';
import { NavLink } from '../../../ui';
import React, {useState} from "react";
export const CompareWidget = ({data = '',handleChange, schemeCode = []}) => {
  const { isMobile } = useGlobalContext();
  const [showFunds, setShowFunds] = useState(false);
  return (
    // isMobile?<NavLink className={`btn ${styles.btnCompareMob}`} href={`${process.env.BASE_URL}/mutual-funds/compare?schemeCode=${schemeCode}`}>Compare ({schemeCode && schemeCode.length})</NavLink>:
    isMobile?<NavLink className={`btn ${styles.btnCompareMob}`} href={`${process.env.BASE_URL}/mutual-funds/compare`}>Compare ({schemeCode && schemeCode.length})</NavLink>:
    <section className={styles.compareWidget}>
        <div className='container'>
            <div className={`${styles.compareFunds} ${showFunds?styles.active:null}`}>
                <button className={`btn ${styles.btnCompare}`} onClick={()=>setShowFunds(!showFunds)}>Compare Funds ({schemeCode && schemeCode.length}) <em className={`icon-icon-angle-right `}></em></button>
                <CompareTile modelCenter={true} data={data?data:fundData} handleChange={handleChange}/>
                <div className={`${styles.compareBtnBox}`}>
                  {/* {schemeCode && schemeCode.length >= 2 && <NavLink href={`${process.env.BASE_URL}/mutual-funds/compare?schemeCode=${schemeCode}`} className={`btn btn-primary font14  ${styles.compareBtn}`}> Compare Funds <em className='icon-arrow-right font14'></em></NavLink>} */}
                  {schemeCode && schemeCode.length >= 2 && <NavLink href={`${process.env.BASE_URL}/mutual-funds/compare`} className={`btn btn-primary font14  ${styles.compareBtn}`}> Compare Funds <em className='icon-arrow-right font14'></em></NavLink>}
                </div>
            </div>
        </div>
    </section>
  )
}
