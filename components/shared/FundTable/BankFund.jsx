import styles from "./FundTable.module.css";
import {TableHead,TableRow} from "./DesktopTable"
import { MobileRow,MobileShort } from "./MobileTable";
import {TableTabs} from "./index";
import {useGlobalContext} from '../../../libs/context';
import { useRouter } from 'next/router';
import commonFunctions from '../../../utils/CommonFunctions';
import {Pagination} from "./../Pagination";
import Image from 'next/image';
import { useEffect, useState } from "react";
import { NavLink } from "../../ui";


export function FundTable({amcUrl,showIcon = false,openFilter, totalCounts = 0, showTabs = true , HeaderBg = true, showFilter = false, data = [], page = '', currentActiveTab = 0, setCurrentActiveTab, recordsText}){
    const { isMobile } = useGlobalContext();
    const router = useRouter()
    const records = 10;
    const amcBank = amcUrl && amcUrl.split('-')[0].replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const [showNumberOfAmc, setShowNumberOfAmc] = useState(records);
    useEffect(async() =>{
        setShowNumberOfAmc(records)
      },[showTabs && data.data[currentActiveTab].data, showTabs && data.data])
    const viewMore = () => {
        setShowNumberOfAmc(showNumberOfAmc+records)
    }
    totalCounts = showTabs ? data.data[currentActiveTab].totalRecords : totalCounts;
    const showFunds = (e, path) => {
        e.preventDefault();
        router.push(`${path}`)
    }
    const renderContent = () => {
        
        if (isMobile) {
          return (
            <div className={styles.MobileTable}>
                <MobileShort showFilter={showFilter} showTabs={showTabs}  openFilter={openFilter}/>
                {showTabs?data.data.map((item, index)=>(
                    <div className={`${currentActiveTab === index?styles.tableShow:styles.tbaleDNone}`} key={index}> <MobileRow showIcon={showIcon} showNumberOfAmc={showNumberOfAmc} TableData={showTabs ? item.data : data.data} key={index} currentActiveTab={currentActiveTab}/></div>
                )):<MobileRow showIcon={showIcon} showNumberOfAmc={showNumberOfAmc} TableData={showTabs ? data.data[currentActiveTab].data : data.data}  />}     
                
            </div>
          )
        }
        return(
            <div className={styles.tableDesktop}>
                <TableHead  HeaderBg={HeaderBg} showTabs={showTabs} />
                <div className={styles.tableRowBox}>
                    {showTabs?data.data.map((item, index)=>(
                                <div className={`${currentActiveTab === index?styles.tableShow:styles.tbaleDNone}`} key={index}> <TableRow showIcon={showIcon} showNumberOfAmc={showNumberOfAmc} TableData={showTabs ? item.data : data.data} key={index} currentActiveTab={currentActiveTab}/></div>
                            )):<TableRow showIcon={showIcon} showNumberOfAmc={showNumberOfAmc} TableData={showTabs ? data.data[currentActiveTab].data : data.data} />}     
                    
                </div>
            </div>
        )
    }
    return(
        <>
            <div className={`${styles.fundTable} ${HeaderBg?'p12':null}`}>
                {showTabs ? <TableTabs showIcon={showIcon} page={page} data={data.data} currentActiveTab={currentActiveTab} setCurrentActiveTab={setCurrentActiveTab} /> : null }            
                {renderContent()}
                {totalCounts > 0 && <p className="font14 mt15 textRight">Result Showing {router.query.page ? parseInt(router.query.page-1) + `1-${parseInt(router.query.page*10)}` : `1-${showNumberOfAmc}`} {' of '}<span className="fontBold">{parseInt(totalCounts).toLocaleString('en-IN')} {recordsText} Mutual Funds</span></p>}
                {totalCounts > 10 && !showTabs && <Pagination totalCounts={totalCounts} /> }
                {totalCounts > 10 && showTabs && 
                showTabs?data.data.map((item, index)=>(
                <div className={`${styles.showAllFund} ${currentActiveTab === index?styles.BtnTabShow:styles.tbaleDNone}`} key={index}>
                    {page === 'home' && showNumberOfAmc !==20 ? <button className="btn btn-primary" onClick={() => viewMore()}>View More</button>:
                    <NavLink href={`${process.env.BASE_URL+router.asPath}/${page === 'home' ? 
                    commonFunctions.stringToSlug(item.sub_category_type?item.sub_category_type:item.category_type) === 'tax-saving' ? 'tax-saver' : 
                    commonFunctions.stringToSlug(item.sub_category_type?item.sub_category_type:item.category_type) === 'other' ? 'others' : 
                    commonFunctions.stringToSlug(item.sub_category_type?item.sub_category_type:item.category_type) === 'elss' ? 'tax-saver' : 
                    commonFunctions.stringToSlug(item.sub_category_type?item.sub_category_type:item.category_type) : 
                    commonFunctions.stringToSlug(item.asset_type) === 'elss' ? 'tax-saver' : commonFunctions.stringToSlug(item.asset_type) === 'other' ? 'others' : 
                    commonFunctions.stringToSlug(item.asset_type)}`} title={`${page === 'home' ? item.sub_category_type?item.sub_category_type:commonFunctions.capitalize(item.category_type) : 
                    amcBank +" " + commonFunctions.capitalize(item.asset_type)} Funds`}>
                    <button className="btn btn-primary">
                        Show All {page === 'home' ? item.sub_category_type?item.sub_category_type:commonFunctions.capitalize(item.category_type) : 
                        amcBank +" " + commonFunctions.capitalize(item.asset_type)} Funds
                    </button></NavLink>}
                    
                </div>)): null}
            </div>
        </>
    )
}