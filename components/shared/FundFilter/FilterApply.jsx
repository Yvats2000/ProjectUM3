import React from 'react'
import styles from "./FundFilter.module.css"
export const FilterApply = ({filters,master,handleFilter }) => {
    const showFilterCross = (key) => {
        switch(key){
        /*case 'sipDuration':
            return(
                <li className="font12">{filters[key]}Y Returns</li>
            )*/
        case 'rating':
            return(
                <>
                {filters[key] &&
                <li className="font12">{filters[key]}
                <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.834 4.381a.725.725 0 0 0-.4-1.235L7 2.792a.318.318 0 0 1-.235-.175L5.673.403a.72.72 0 0 0-1.293 0L3.292 2.617a.318.318 0 0 1-.24.175l-2.434.355a.725.725 0 0 0-.4 1.235l1.76 1.721c.076.074.11.18.093.283l-.415 2.436c-.038.21.02.425.157.587.219.26.588.332.889.176l2.176-1.149a.325.325 0 0 1 .3 0l2.173 1.15a.722.722 0 0 0 1.045-.763L7.98 6.387a.321.321 0 0 1 .092-.285l1.76-1.722z" fill="#D1D1D1"></path>
                </svg>
                <span className={styles.crossIcon} onClick={() => handleFilter(filters[key], 'rating')}></span></li>}
                </>
            )
        case 'risk':
            return(
                filters[key].map((item,index) =>
                <li className="font12" key={index}>{item} <span className={styles.crossIcon} onClick={() => handleFilter(item, 'risk')}></span></li>
            )  
            )
        case 'amcSlug':
            return(
                filters[key].map((item,index) =>
                    <li className="font12" key={index}>{master && master.amcList && master.amcList.find((data) => data.amcSlug === item).fund} <span className={styles.crossIcon} onClick={() => handleFilter(item, 'amcList')}></span></li>
                )           
            )
        case 'sector':
            return(
                filters[key].map((item,index) =>
                    <li className="font12" key={index}>{item} <span className={styles.crossIcon} onClick={() => handleFilter(item, 'sectorList')}></span></li>
                )           
            )
        case 'category':
            return(
                filters[key].map((item,index) =>
                    <li className="font12" key={index}>{item} <span className={styles.crossIcon} onClick={() => handleFilter(item, 'fundCategory')}></span></li>
                ) 
            )
        default:
            return (
                <></>
            )
        }
    }
   
  return (
    <ul className={styles.filterBy}>
        {filters && Object.keys(filters).length > 0 && Object.keys(filters).map((item,index)=>
            <React.Fragment key={index}>{showFilterCross(item)}</React.Fragment>
        )}
    </ul>
  )
}
