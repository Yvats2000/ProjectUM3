import React ,{useState,useEffect} from 'react';
import styles from './bestOfAll.module.css';
import { FundTable } from '../../../shared';
export const BestOfAll = ({data}) => {
  const [currentActiveTab, setCurrentActiveTab] = useState(0);
  return (
    <section className={styles.MutualFundsList}>
        <div className={styles.mutualFundBg}>
          <div className="container">
              <h2 className={`font24 mb30 text2828 Innerheading fontMedium lineHeight36 `}>List of Best Mutual Funds in India </h2>
              <p className="font14 lineHeight24 text444 mb20">One stop shop for investors looking for the best mutual fund schemes available in a single place. Now, get acquainted with the key features offered by the best mutual funds options and make informed choices. 
              </p>
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
