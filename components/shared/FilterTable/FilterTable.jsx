import React, {useState, useEffect} from 'react'
import styles from './FilterTable.module.css';
import { FundFilter,FilterApply } from '../FundFilter';
import { FundTable } from '../FundTable';
import {useRouter} from 'next/router';
import commonFunctions from '../../../utils/CommonFunctions';
import {useGlobalContext} from '../../../libs/context';
import { Loader } from '../Loader';
export const FilterTable = ({filterMaster,totalCounts = 0, masterDefault,category,tableData,risk='', recordsText='', fundsAmc,sector}) => {
    const router = useRouter();
    const { isMobile } = useGlobalContext();
    let masterStatic = {category_code: [],category_type: [],amcSlug: [],sector: [],category: [],rating: "",sipDuration: 5,risk: []};
    masterDefault = Object.keys(masterDefault).length > 0 ? masterDefault : masterStatic;
    const [filters, setFilters] = useState(masterDefault);
    const [sipActive, setSipActive] = useState(false);
    const [filterMobile, setFilterMobile] = useState(false);
    const [short, setShort] = useState(false);
    const [isLoader, setIsLoader] = useState(false);

    const arrayUnique = (array) => {
        var a = array.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i] === a[j])
                    a.splice(j--, 1);
            }
        }
    
        return a;
    }
    useEffect(()=>{
        let filteredAmc = filters.amcSlug;
        fundsAmc && filteredAmc.push(fundsAmc);
        if(category){
            let categoryData = category != '' ? filterMaster.fundCategory.filter((item) => item.category_type === category)[0] : [];
            let filteredCategory = filters.category;
            categoryData && categoryData.category && categoryData.category.length > 0 && categoryData.category.map((item) => filteredCategory.push(item+'-'+commonFunctions.capitalize(categoryData.category_type)))
            filteredCategory.length > 0 && setFilters({...filters , category : filteredCategory})
        }else if(risk){
            let riskData = risk != '' ? filterMaster.risk.filter((item) => item === risk)[0] : [];
            let filteredRisk = filters.risk;
            riskData && filteredRisk.push(riskData)
            filteredRisk && setFilters({...filters , risk : filteredRisk})
        }else if(sector){
            let sectorData = sector != '' ? filterMaster.sectorList.filter((item) => item.sector_slug === sector)[0] : [];
            let filteredSector = filters.sector;
            sectorData && filteredSector.push(sectorData.sect_name);
            filteredSector && setFilters({...filters , sector : filteredSector})
        }
        setFilters({...filters , amcSlug : filteredAmc})
    },[]);
    const handleFilter = (item, key, type = "") => {
        !isMobile && setIsLoader(true);
        switch(key){
            case 'sipDuration':
                item = type === "clear" ? 5 : item;
                setFilters({...filters , sipDuration : item});
                setSipActive(false);
                !isMobile && router.push(`${process.env.BASE_URL}/mutual-funds/search?sipDuration=${item}&rating=${filters.rating}&risk=${filters.risk}&amcSlug=${filters.amcSlug}&amcSlug=${filters.amcSlug}&sectorSlug=${filters.sector}&category=${filters.category}`);
                return
            case 'range':
                return
            case 'rating':
                item = type === "clear" ? "" : item;
                category == '' || isMobile ? setFilters({...filters , rating : filters.rating === item ? "" : item}) : '';
                !isMobile && router.push(`${process.env.BASE_URL}/mutual-funds/search?sipDuration=${filters.sipDuration}&rating=${filters.rating === item ? "" : item}&risk=${filters.risk}&amcSlug=${filters.amcSlug}&sectorSlug=${filters.sector}&category=${filters.category}`);
                return
            case 'risk':
                let filteredRisk = type === 'clear' ? [] : filters.risk;
                if(type === ''){
                    let indexRisk = filteredRisk.findIndex((data) => data === item);
                    indexRisk != -1 ? filteredRisk.splice(indexRisk, 1) : filteredRisk.push(item);
                }
                category == '' || isMobile ? setFilters({...filters , risk : filteredRisk}) : '';
                !isMobile && router.push(`${process.env.BASE_URL}/mutual-funds/search?sipDuration=${filters.sipDuration}&rating=${filters.rating}&risk=${type === '' ? filters.risk : []}&amcSlug=${filters.amcSlug}&sectorSlug=${filters.sector}&category=${filters.category}`);
                return
            case 'amcList':
                let filteredAmc = type === 'clear' ? [] : filters.amcSlug;
                if(type === ''){
                    let indexAmc = filteredAmc.findIndex((data) => data === item);
                    indexAmc != -1 ? filteredAmc.splice(indexAmc, 1) : filteredAmc.push(item);
                }
                if(type === 'checkAll'){
                    filteredAmc = arrayUnique(filteredAmc.concat(item));
                }
                if(type === 'unCheckAll'){
                    filteredAmc = filteredAmc.filter(val => !item.includes(val));
                }
                category == '' || isMobile ? setFilters({...filters , amcSlug : filteredAmc}) : '';
                !isMobile && router.push(`${process.env.BASE_URL}/mutual-funds/search?sipDuration=${filters.sipDuration}&rating=${filters.rating}&risk=${filters.risk}&amcSlug=${type === '' || type === 'checkAll' ? filteredAmc : []}&sectorSlug=${filters.sector}&category=${filters.category}`);
                return
            case 'sectorList':
                    let filteredSector = type === 'clear' ? [] : filters.sector;
                    if(type === ''){
                        let indexSector = filteredSector.findIndex((data) => data === item);
                        indexSector != -1 ? filteredSector.splice(indexSector, 1) : filteredSector.push(item);
                    }
                    if(type === 'checkAll'){
                        filteredSector = arrayUnique(filteredSector.concat(item));
                    }
                    if(type === 'unCheckAll'){
                        filteredSector = filteredSector.filter(val => !item.includes(val));
                    }
                    category == '' || isMobile ? setFilters({...filters , sector : filteredSector}) : '';
                    !isMobile && router.push(`${process.env.BASE_URL}/mutual-funds/search?sipDuration=${filters.sipDuration}&rating=${filters.rating}&risk=${filters.risk}&amcSlug=${filters.amcSlug}&sectorSlug=${type === '' || type === 'checkAll' ? filteredSector : []}&category=${filters.category}`);
                    return    
            case 'fundCategory':
                let filteredCategory = type === 'clear' ? [] : filters.category;
                if(type === ''){
                    let indexCategory = filteredCategory.findIndex((data) => data === item);
                    indexCategory != -1 ? filteredCategory.splice(indexCategory, 1) : filteredCategory.push(item);
                }
                if(type === 'checkAll'){
                    filteredCategory = arrayUnique(filteredCategory.concat(item.category.map((el) => {return el + '-' + commonFunctions.capitalize(item.category_type)})));
                }
                if(type === 'unCheckAll'){
                    filteredCategory = filteredCategory.filter(val => !item.category.map((el) => {return el + '-' + commonFunctions.capitalize(item.category_type)}).includes(val));
                }
                category == '' || isMobile ? setFilters({...filters , category : filteredCategory}) : '';
                !isMobile && router.push(`${process.env.BASE_URL}/mutual-funds/search?sipDuration=${filters.sipDuration}&rating=${filters.rating}&risk=${filters.risk}&amcSlug=${filters.amcSlug}&sectorSlug=${filters.sector}&category=${(type === '' || type === 'checkAll' || type === 'unCheckAll') ? filteredCategory : []}`);
                return
            default:
                break
        }
    }
    const applyFilter = ()=>{
        isMobile && setIsLoader(true);
        router.push(`${process.env.BASE_URL}/mutual-funds/search?sipDuration=${filters.sipDuration}&rating=${filters.rating}&risk=${filters.risk}&amcSlug=${filters.amcSlug}&sectorSlug=${filters.sector}&category=${filters.category}`);
    }
    const openFilter = (type)=>{
        type === 'short'? setShort(true):setShort(false);
        setFilterMobile(!filterMobile)
    }
  return (
    <section className={`${styles.section} ${styles.bgFund}`}>
        <div className="container containerFlex gridGap30">
            <FundFilter data={[]} applyFilter={applyFilter} short={short} category={category} setFilterMobile={setFilterMobile} filterMobile={filterMobile}  sipActive={sipActive} setSipActive={setSipActive} setFilters={setFilters} handleFilter={handleFilter} filters={filters} master={filterMaster} />
            <div className={styles.mutualFund}>
                {totalCounts > 0 && <p className="font14 mb15">Result Showing {router.query.page ? parseInt(router.query.page-1) + `1-${parseInt(router.query.page*10)}` : `1-10`} {' of '}<span className="fontBold">{parseInt(totalCounts).toLocaleString('en-IN')} {recordsText} Mutual Funds</span></p>}
                {!isMobile && <FilterApply filters={filters} master={filterMaster} handleFilter={handleFilter}/>}
                <FundTable showTabs = {false} totalCounts={totalCounts} data={tableData} openFilter={openFilter} recordsText={recordsText} />
            </div>
        </div>
        {isLoader && <Loader /> }
    </section>
  )
}
