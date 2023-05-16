import React ,{useState,useEffect} from 'react';
import styles from './majorCategoriesTable.module.css';
import { FundTable } from '../../../shared';
export const MajorCategoriesTable = ({data}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(0);
  return (
    <section className={styles.MutualFundsList}>
        <div className={styles.mutualFundBg}>
          <div className="container">
              <h2 className={`font24 mb30 text2828 Innerheading fontMedium lineHeight36 `}>Top Mutual Fund Categories</h2>
              <p className="font14 lineHeight24 text444 mb20">Acquaint yourself with the best mutual fund categories offering lucrative returns.</p>
            </div>
        </div>
        <div className={styles.fundTable}>
          <div className="container">
              <FundTable showIcon = {true} data={data} HeaderBg={false} page={'home'} showTabs={true} currentActiveTab={currentActiveTab} setCurrentActiveTab={setCurrentActiveTab} />
          </div>
        </div>
    </section>
  )
}
