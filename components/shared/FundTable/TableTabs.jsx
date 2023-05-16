import styles from "./FundTable.module.css";
import Image from "next/image";
import commonFunctions from '../../../utils/CommonFunctions';

export function TableTabs({showIcon=false, data, page, currentActiveTab, setCurrentActiveTab}){
    return(
        <>
        <ul className={styles.tableTab}>
        {data && data.length > 0 ? data.map((item,index) => (
            <li className={`${currentActiveTab === index ? `${styles.active} cursorPointer }` : 'cursorPointer'} `}  onClick={() => setCurrentActiveTab(index)} key={index}>
                {showIcon ? <span className={styles.tabIcon}>
                    <Image className={`imgResponsive`} src={`/assets/images/amc/${currentActiveTab === index ? item.logo+'_active' : item.logo}.svg`} width = {17} height = {18} alt={page === 'home' ? `UM_`+ commonFunctions.capitalize(item.sub_category_type?item.sub_category_type:item.category_type) : `UM_`+ commonFunctions.capitalize(item.asset_type)} /></span>:null }
                {page === 'home' ? commonFunctions.capitalize(item.sub_category_type?item.sub_category_type:item.category_type) : commonFunctions.capitalize(item.asset_type)}
            </li>
            )) : null }
        </ul>
        </>
    )
}