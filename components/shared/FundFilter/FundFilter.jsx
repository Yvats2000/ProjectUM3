import Image from 'next/image';
import styles from "./FundFilter.module.css"
import {useGlobalContext} from '../../../libs/context';
import React, { useState } from 'react';
import {useRouter} from 'next/router';
import commonFunctions from '../../../utils/CommonFunctions';
export function FundFilter({ category,master,applyFilter, filters,handleFilter,sipActive,setSipActive,filterMobile,setFilterMobile }){
    const router = useRouter();
    const { isMobile } = useGlobalContext();
    const [amcActive, setAmcActive] = useState(false);
    const [sectorActive, setSectorActive] = useState(false);
    const [categoryActive,setcategoryActive] = useState(-1);
    const [mobileFilter, setmobileFilter] = useState(0);
    const [showShort, setshowShort] = useState(false);
    const shortFunction = ()=>{
        setmobileFilter(-1);
        setshowShort(true)
    }
    const mobileFilterSet = (index)=>{
        setshowShort(false);
        setmobileFilter(index)
    }
    const showFilter = (data, key) => {
        switch(key){
        case 'sipDuration':
            return(
                <>
                    <p className={`font14 text444 fontsemiBold lineHeight24 mb15`}>
                        {/* {!isMobile && commonFunctions.breakCamelCase(key)} */}
                        {!isMobile && 'SIP Duration'}
                        {filters.sipDuration && !isMobile && <span className={styles.activeTip}></span>}
                        {!isMobile && category === '' && filters.sipDuration !== 5 &&  <span className='cursorPointer textLink font12' onClick={() => handleFilter('', key, 'clear')}>Clear all</span>}
                    </p>
                    <div className={`${styles.selectYear} ${styles.sipduration}`}>
                        <div className={`${styles.SelectBox} ${sipActive ? styles.active : null} cursorPointer`} onClick={()=>setSipActive(sipActive = !sipActive)}>
                            <p className="font14  text313541">{filters.sipDuration}Y Returns</p>
                            <Image src="/assets/images/arrow.svg" width={12} height={7} alt=""/>
                        </div>
                        <div className={`${styles.drpDown} ${sipActive?styles.active:null}`}>
                            <ul className={`scrollBar ${styles.expMenu}`}>
                                {data && data.length > 0 && data.map((item,index)=>
                                    <li key={index} className={'cursorPointer'} onClick={() => handleFilter(item, key)}><p className="lineHeight20 font12 ">{item}Y Returns</p></li>
                                ) }
                            </ul>
                        </div>
                    </div>
                </>
            )
        case 'range':
            return(
                <>
                    <p className={`font14 text444 fontsemiBold lineHeight24 mb15`}>
                        {!isMobile && commonFunctions.breakCamelCase(key)}
                        <span className={styles.activeTip}></span>
                        {!isMobile && <span className='cursorPointer textLink font12'>Clear all</span>}
                    </p>
                    <div className={`${styles.dualrangeslider} ${styles.minInvestment}`}>
                        <div className={styles.sliders_control}>
                            <input id="fromSlider" name='minInvestment' type="range" value="10" min="0" max={data.minValue}/>
                            <input id="toSlider" name='maxInvestment' type="range" value="30" min="0" max={data.maxValue}/>
                        </div>
                        <div className={styles.rangeValues}>
                            <p>Min ₹ <span>{data.minText}</span></p>
                            <p>Max ₹ <span>{data.maxText}</span></p>
                        </div>
                    </div>
                </>
            )
        case 'rating':
            return(
                <>
                    <p className={`font14 text444 fontsemiBold lineHeight24 mb15`}>
                        {!isMobile && commonFunctions.breakCamelCase(key)}
                        {filters.rating && !isMobile && <span className={styles.activeTip}></span>}
                        {!isMobile && category === '' && filters.rating > 0 && <span className='cursorPointer textLink font12' onClick={() => handleFilter('', key, 'clear')}>Clear all</span>}
                    </p>
                    <div className={styles.rating}>
                        <ul className={styles.ratingBox}>
                            {data && data.length > 0 && data.map((item,index)=>
                                <li key={index} className={filters.rating == item ? styles.active : ''} onClick={() => handleFilter(item, key)}><p className="font12 text747478">{item}</p>
                                    <svg width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9.834 4.381a.725.725 0 0 0-.4-1.235L7 2.792a.318.318 0 0 1-.235-.175L5.673.403a.72.72 0 0 0-1.293 0L3.292 2.617a.318.318 0 0 1-.24.175l-2.434.355a.725.725 0 0 0-.4 1.235l1.76 1.721c.076.074.11.18.093.283l-.415 2.436c-.038.21.02.425.157.587.219.26.588.332.889.176l2.176-1.149a.325.325 0 0 1 .3 0l2.173 1.15a.722.722 0 0 0 1.045-.763L7.98 6.387a.321.321 0 0 1 .092-.285l1.76-1.722z" fill="#D1D1D1"></path>
                                    </svg>
                                </li>
                            )}
                        </ul>
                    </div>
                </>
            )
        case 'risk':
            return(
                <>
                    <p className={`font14 text444 fontsemiBold lineHeight24 mb15`}>
                        {!isMobile && commonFunctions.breakCamelCase(key)}
                        {filters.risk.length > 0 && !isMobile && <span className={styles.activeTip}></span>}
                        {!isMobile && category === '' && filters.risk.length > 0 && <span className='cursorPointer textLink font12' onClick={() => handleFilter('', key, 'clear')}>Clear all</span>}
                    </p>
                    <div className={styles.risk}>
                        <ul className={styles.ratingBox}>
                            {data && data.length>0 && data.map((item,index)=>
                                <li key={index} className={filters.risk.filter((risk) => risk ===  item).length > 0 ? styles.active : ''}><p className="font12 text747478" onClick={() => handleFilter(item, key)}>{item}</p></li>
                            )}
                        </ul>
                    </div>
                </>
            )
        case 'amcList':
            let amcSlugData = []; 
            data && data.length > 0 && data.map((item) => amcSlugData.push(item.amcSlug));
            return(
                <>  
                    <div className={`font14 text444 fontsemiBold lineHeight24 checkInput  ${styles.allCheck} ${isMobile && styles.amcTitle} ${amcActive?styles.amcActive:null}`} >
                        <input
                        className="form-check-input cursorPointer" 
                        checked={filters.amcSlug.length > 0 && !amcSlugData.some(val => filters.amcSlug.indexOf(val) === -1) ? 'checked': ''} 
                        type="checkbox" id="acc" 
                        onClick={() => handleFilter(amcSlugData, key, filters.amcSlug.length > 0 && !amcSlugData.some(val => filters.amcSlug.indexOf(val) === -1) ? 'unCheckAll': 'checkAll')} 
                        />
                        <div className={`${styles.fundClick} cursorPointer`} onClick={()=>setAmcActive(amcActive = !amcActive)}>
                            {/* {commonFunctions.breakCamelCase(key)} */}
                            {'AMC List'}
                            {filters.amcSlug.length > 0 && !isMobile && <span className={styles.activeTip}></span>}
                            <Image src="/assets/images/arrow.svg" alt="" width={12} height={7} srcSet=""/>
                        </div>
                            
                    </div>
                    
                    <div className={`${styles.category} ${styles.amcList} ${amcActive ? styles.active : null}`}>
                        <ul className={`scrollBar ${styles.expandMenu}`}>
                            {data && data.length > 0 && data.map((item,index)=>
                                <li key={index} className='cursorPointer' onClick={() => handleFilter(item.amcSlug, key)}>
                                    <div className={`checkInput checkCenter  text313541 ${styles.checkBoxLabel}`}>
                                        <input
                                            className= {`form-check-input cursorPointer`}   
                                            required={true}
                                            type="checkbox" id="acc" name={item.amcSlug} value={item.amcSlug}
                                            checked={filters.amcSlug.findIndex((data) => data === item.amcSlug) != -1 ? 'checked' : ''}
                                             />
                                             {item.fund} 
                                        </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </>                
            )
        case 'sectorList':
            let sectorSlugData = []; 
            data && data.length > 0 && data.map((item) => sectorSlugData.push(item.sect_name));
            return(
                <>  
                    <div className={`font14 text444 fontsemiBold lineHeight24 checkInput  ${styles.allCheck} ${isMobile && styles.amcTitle} ${sectorActive?styles.amcActive:null}`} >
                        <input
                        className="form-check-input cursorPointer" 
                        checked={filters.sector && filters.sector.length > 0 && !sectorSlugData.some(val => filters.sector.indexOf(val) === -1) ? 'checked': ''} 
                        type="checkbox" id="acc" 
                        onClick={() => handleFilter(sectorSlugData, key, filters.sector.length > 0 && !sectorSlugData.some(val => filters.sector.indexOf(val) === -1) ? 'unCheckAll': 'checkAll')} 
                        />
                        <div className={`${styles.fundClick} cursorPointer`} onClick={()=>setSectorActive(sectorActive = !sectorActive)}>
                            {/* {commonFunctions.breakCamelCase(key)} */}
                            {'Sector List'}
                            {filters.sector && filters.sector.length > 0 && !isMobile && <span className={styles.activeTip}></span>}
                            <Image src="/assets/images/arrow.svg" alt="" width={12} height={7} srcSet=""/>
                        </div>
                            
                    </div>
                    
                    <div className={`${styles.category} ${styles.amcList} ${sectorActive ? styles.active : null}`}>
                        <ul className={`scrollBar ${styles.expandMenu}`}>
                            {data && data.length > 0 && data.map((item,index)=>
                                <li key={index} className='cursorPointer' onClick={() => handleFilter(item.sect_name, key)}>
                                    <div className={`checkInput checkCenter  text313541 ${styles.checkBoxLabel}`}>
                                        <input
                                            className= {`form-check-input cursorPointer`}   
                                            required={true}
                                            type="checkbox" id="acc" name={item.sect_name} value={item.sect_name}
                                            checked={filters.sector && filters.sector.findIndex((data) => data === item.sect_name) != -1 ? 'checked' : ''}
                                                />
                                                {item.sect_name} 
                                        </div>
                                </li>
                            )}
                        </ul>
                    </div>
                </>                
            )
        case 'fundCategory':
            let categoryData = category != '' ? data && data.length > 0 && data.filter((item) => item.category_type === category) : data;
            return(
                <>
                <p className={`font14 text444 fontsemiBold lineHeight24 mb15 ${styles.fundTitle}`}>
                    {!isMobile && commonFunctions.breakCamelCase(key)}
                    {filters.category.length > 0 && !isMobile && <span className={styles.activeTip}></span>}
                    {!isMobile && category === '' && filters.category.length > 0 && <span className='cursorPointer textLink font12' onClick={() => handleFilter('', key, 'clear')}>Clear all</span>}
                </p>
                {categoryData && categoryData.length > 0 && categoryData.map((item,index)=>
                    <div className={`${styles.category} ${categoryActive === index || item.category_type === category ? styles.active:null} cursorPointer`} key={index}>
                        <div className={styles.catTitle} >
                            <label className={`font14 text444 fontsemiBold lineHeight24 checkInput  ${styles.allCheck}`}>
                                <input
                                className="form-check-input  cursorPointer" 
                                checked={filters.category.length > 0 && !item.category.map((el) => {return el + '-' + commonFunctions.capitalize(item.category_type)}).some(val => filters.category.indexOf(val) === -1) ? 'checked': ''}
                                onClick={() => handleFilter(item, key, filters.category.length > 0 && !item.category.map((el) => {return el + '-' + commonFunctions.capitalize(item.category_type)}).some(val => filters.category.indexOf(val) === -1) ? 'unCheckAll': 'checkAll')} 
                                type="checkbox" id={index} />
                            </label>
                            <div className={styles.fundClick} onClick={()=>setcategoryActive(categoryActive === index ? -1 : index)}>
                                <p>{item.category_type === 'elss' ? item.category_type.toUpperCase() : commonFunctions.capitalize(item.category_type)}</p>
                                <Image src="/assets/images/arrow.svg" alt="" width={12} height={7} srcSet=""/> 
                            </div>
                        </div>
                        <ul className={`scrollBar ${styles.expandMenu}`}>
                            {item && item.category && item.category.length > 0 && item.category.map((subItem,index)=>
                                <li key={index} className='cursorPointer' onClick={() => handleFilter(subItem + '-' + commonFunctions.capitalize(item.category_type), key)}>
                                    <div className={`checkInput checkCenter  text313541 ${styles.checkBoxLabel}`}>
                                        <input
                                            className="form-check-input cursorPointer" 
                                            checked={filters.category.findIndex((data) => data.toLowerCase() === (subItem + '-' + commonFunctions.capitalize(item.category_type)).toLowerCase()) != -1 ? 'checked' : ''} 
                                            type="checkbox" id={index} name={subItem} value={subItem}
                                             />
                                             {subItem} 
                                        </div>
                                </li>
                            )}
                        </ul>
                    </div>)}
                </> 
            )
        default:
            return (
                <></>
            )
        }
    }
    
    const filterIcon =(iconType)=>{
        switch(iconType){
            case 'short':
                return (
                    <>
                        <svg width="9" height="13" viewBox="0 0 9 13" xmlns="http://www.w3.org/2000/svg">
                            <g opacity=".6">
                                <g opacity=".7" fill="#000" fillRule="nonzero">
                                    <path d="M7.034 7.616 5.49 9.162a.2.2 0 0 1-.342-.141V1.205a.913.913 0 1 0-1.827 0v7.816a.2.2 0 0 1-.341.141L1.433 7.616a.2.2 0 0 0-.283 0L.141 8.625a.2.2 0 0 0 0 .283l3.951 3.95a.2.2 0 0 0 .283 0l3.951-3.95a.2.2 0 0 0 0-.283L7.317 7.616a.2.2 0 0 0-.283 0z" opacity=".9"/>
                                </g>
                            </g>
                        </svg>
                        <svg width="9" height="13" viewBox="0 0 9 13" xmlns="http://www.w3.org/2000/svg">
                        <g opacity=".6">
                            <g opacity=".7" fill="#000" fillRule="nonzero">
                                <path d="M8.437 4.092 4.487.142a.2.2 0 0 0-.283 0L.253 4.091a.2.2 0 0 0 0 .283L1.26 5.384a.2.2 0 0 0 .283 0L3.09 3.838a.2.2 0 0 1 .342.141v7.816a.913.913 0 0 0 1.826 0V3.979a.2.2 0 0 1 .342-.141l1.546 1.546a.2.2 0 0 0 .282 0l1.01-1.009a.2.2 0 0 0 0-.283z" opacity=".9"/>
                            </g>
                        </g>
                    </svg>
                    </>
                )
            case 'fundCategory':
                return(
                    <>
                         {filters.category.length > 0 && <span className={styles.activeTip}></span>}
                        <svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
                            <g fill="#000" opacity=".6">
                                <path d="M10.813 10.288c-.384 0-.696-.27-.696-.602 0-.332.312-.602.696-.602.383 0 .695.27.695.602a.316.316 0 0 0 .633 0c0-.58-.432-1.067-1.012-1.199v-.164a.316.316 0 0 0-.632 0v.164c-.58.132-1.012.62-1.012 1.199 0 .68.595 1.234 1.328 1.234.383 0 .695.27.695.603 0 .332-.312.602-.695.602-.384 0-.696-.27-.696-.602a.316.316 0 0 0-.632 0c0 .579.431 1.066 1.012 1.198v.137a.316.316 0 0 0 .632 0v-.137c.58-.132 1.012-.619 1.012-1.198 0-.681-.596-1.235-1.328-1.235zM14.276 8.407a4.12 4.12 0 0 0-1.683-1.49.316.316 0 1 0-.274.57 3.5 3.5 0 0 1 1.973 3.138c0 .568-.14 1.132-.405 1.63a.316.316 0 1 0 .558.298 4.119 4.119 0 0 0-.169-4.146zM11.31 6.514h-.021a.316.316 0 0 0 0 .632h.019a.316.316 0 0 0 .002-.632zM9.31 13.761a3.5 3.5 0 0 1-1.974-3.136c0-.57.14-1.133.405-1.632a.316.316 0 1 0-.558-.297 4.119 4.119 0 0 0 .17 4.146 4.12 4.12 0 0 0 1.682 1.49.315.315 0 0 0 .422-.149.316.316 0 0 0-.148-.422zM10.34 14.103h-.018a.316.316 0 1 0-.003.632h.021a.316.316 0 0 0 0-.632z"></path>
                                <path d="M12.25 5.444a1.451 1.451 0 0 0-.14-.258h.823c.802 0 1.454-.653 1.454-1.455s-.652-1.454-1.454-1.454H10.4A1.456 1.456 0 0 0 9.202 0H1.455C.653 0 0 .653 0 1.455s.653 1.454 1.455 1.454h2.532a1.446 1.446 0 0 0 0 1.644h-.825c-.802 0-1.454.653-1.454 1.455 0 .46.215.872.55 1.138a1.452 1.452 0 0 0 0 2.277 1.452 1.452 0 0 0 0 2.277 1.452 1.452 0 0 0 .904 2.592h3.727A5.361 5.361 0 0 0 10.814 16a5.382 5.382 0 0 0 5.376-5.375c0-2.467-1.67-4.551-3.94-5.181zm.683-2.535a.823.823 0 0 1 0 1.644H5.186a.823.823 0 0 1 0-1.644h7.747zM1.455 2.277a.823.823 0 0 1 0-1.645h7.747a.823.823 0 0 1 0 1.645H1.455zm1.707 2.909h7.747c.127 0 .25.03.359.082A5.359 5.359 0 0 0 7.01 6.83H3.161a.823.823 0 0 1 0-1.644zm0 2.276H6.47a5.36 5.36 0 0 0-.813 1.645H3.162a.823.823 0 0 1 0-1.645zm0 2.277h2.35a5.388 5.388 0 0 0-.02 1.644h-2.33a.823.823 0 0 1 0-1.644zm0 3.921a.823.823 0 0 1 0-1.644h2.46c.16.595.418 1.15.758 1.644H3.162zm7.652 1.708a4.748 4.748 0 0 1-4.743-4.743 4.748 4.748 0 0 1 4.743-4.744 4.748 4.748 0 0 1 4.743 4.744 4.748 4.748 0 0 1-4.743 4.743z"></path>
                            </g>
                        </svg>
                    </>
                )
            case 'sipDuration':
                return(
                    <>
                    {filters.sipDuration && <span className={styles.activeTip}></span>}
                    <svg width="15" height="16" viewBox="0 0 15 16" xmlns="http://www.w3.org/2000/svg">
                        <g opacity=".6">
                            <g opacity=".9" fill="#000">
                                <path d="M9.488 1.116H6.512a.558.558 0 0 1 0-1.116h2.976a.558.558 0 0 1 0 1.116z"></path>
                                <path d="M8 3.349a.558.558 0 0 1-.558-.558V.558a.558.558 0 0 1 1.116 0v2.233c0 .308-.25.558-.558.558z"></path>
                                <path d="M8 16a6.595 6.595 0 0 1-3.252-.847.558.558 0 0 1 .55-.967A5.48 5.48 0 0 0 8 14.884a5.581 5.581 0 1 0-5.264-7.442.558.558 0 1 1-1.052-.372A6.698 6.698 0 1 1 8 16z"></path>
                                <path d="M9.488 10.046a.551.551 0 0 1-.248-.058L7.75 9.244a.557.557 0 0 1-.31-.5V6.512a.558.558 0 0 1 1.117 0V8.4l1.18.589a.558.558 0 0 1-.25 1.057zM5.023 9.302H.558a.558.558 0 1 1 0-1.116h4.465a.558.558 0 0 1 0 1.116zM5.023 11.535h-3.72a.558.558 0 0 1 0-1.116h3.72a.558.558 0 0 1 0 1.116zM5.023 13.767H2.791a.558.558 0 1 1 0-1.116h2.232a.558.558 0 1 1 0 1.116z"></path>
                            </g>
                        </g>
                    </svg>
                    </>
                )   
            case 'Min Investment':
                return(
                    <svg width="14" height="16" viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg">
                        <g opacity=".6">
                            <g opacity=".5" fill="#000">
                                <path d="M5.604 8.706h1.834a.898.898 0 0 1-.846.605h-.605a.473.473 0 0 0-.43.27.473.473 0 0 0 .057.502l1.78 2.242a.291.291 0 1 0 .457-.363L6.209 9.895h.383c.715 0 1.312-.511 1.45-1.188h.511a.292.292 0 1 0 0-.584H8.05a1.428 1.428 0 0 0-.261-.605h.765a.292.292 0 1 0 0-.583H5.605a.292.292 0 1 0 0 .583H6.628a.855.855 0 0 1 .822.605H5.604a.292.292 0 1 0 0 .583z"></path>
                                <path d="M12.953 9.138c-.42-.965-.998-1.9-1.73-2.775a12.887 12.887 0 0 0-2.215-2.105l1.696-3.147a.394.394 0 0 0-.073-.472C10.192.209 9.726 0 9.207 0c-.475 0-.911.18-1.29.34-.3.122-.582.242-.812.242-.07 0-.13-.01-.19-.033-.791-.29-1.4-.47-1.989-.47-.745 0-1.38.3-2.002.939a.402.402 0 0 0-.047.499l1.83 2.764A13.102 13.102 0 0 0 2.52 6.363c-.728.875-1.31 1.81-1.73 2.775A9.433 9.433 0 0 0 0 12.903 3.102 3.102 0 0 0 3.097 16h7.55a3.102 3.102 0 0 0 3.098-3.097 9.433 9.433 0 0 0-.792-3.765zM3.729 1.35c.386-.333.755-.48 1.197-.48.473 0 1.005.16 1.714.423.146.053.302.08.462.08.39 0 .762-.153 1.118-.303.342-.143.668-.28.984-.28.153 0 .37.027.642.22L8.25 3.978H5.47l-1.74-2.627zm6.919 13.85H3.097a2.301 2.301 0 0 1-2.299-2.298c0-2.132.782-4.155 2.319-6.01a12.21 12.21 0 0 1 2.258-2.116h2.988c.302.21 1.287.941 2.258 2.115 1.54 1.856 2.319 3.876 2.319 6.011a2.291 2.291 0 0 1-2.292 2.299z"></path>
                            </g>
                        </g>
                    </svg>
                )
            case 'rating':
                return (
                    <>
                        {filters.rating && <span className={styles.activeTip}></span>}
                        <svg width="17" height="17" viewBox="0 0 17 17" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.675 7.797c.293-.3.399-.745.272-1.15a1.095 1.095 0 0 0-.869-.766l-3.63-.55a.477.477 0 0 1-.351-.271L9.466 1.625A1.071 1.071 0 0 0 8.5 1c-.41 0-.785.243-.965.625L5.912 5.06a.476.476 0 0 1-.358.271l-3.632.551c-.406.063-.743.36-.87.766-.126.406-.02.851.273 1.15l2.628 2.67a.51.51 0 0 1 .137.439l-.62 3.779c-.056.325.03.659.235.91.327.403.878.516 1.327.274l3.247-1.783a.469.469 0 0 1 .448 0l3.243 1.783c.153.085.325.13.5.13.319 0 .62-.149.825-.403.205-.252.291-.586.234-.911l-.62-3.776a.51.51 0 0 1 .138-.442l2.628-2.671z" stroke="#4A4A4A" fill="none" opacity=".6"></path>
                        </svg>
                    </>
                )
            case 'risk':
                return(
                    <>
                        {filters.risk.length > 0 && <span className={styles.activeTip}></span>}
                        <svg width="16px" height="16px" viewBox="0 0 16 16" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.600000024">
                                <g id="05C_Filters_Mob_MF_UM-V-2.0" transform="translate(-20.000000, -761.000000)" fill="#000000" fillRule="nonzero">
                                    <g id="Group-20" transform="translate(0.000000, 354.000000)">
                                        <g transform="translate(0.000000, 48.000000)" id="Group">
                                            <g transform="translate(0.000000, 1.000000)">
                                                <g id="Group-8" transform="translate(16.000000, 357.000000)" opacity="0.800000012">
                                                    <g id="ic_risk" transform="translate(4.000000, 1.000000)">
                                                        <path d="M12.1288762,7.87360514 C11.9235132,7.53734031 11.585807,7.3033277 11.1988393,7.2291386 L11.1988393,2.66801134 C11.1979578,1.93207344 10.601582,1.33569772 9.86564414,1.33481618 L7.65840624,1.33481618 C7.56390602,1.17036622 7.38892132,1.06874909 7.19925383,1.06817715 L6.84169089,1.06817715 C6.61617401,0.428131547 6.01139409,0 5.33278062,0 C4.65416715,0 4.04938723,0.428131547 3.82387034,1.06817715 L3.4663074,1.06817715 C3.27663992,1.06874909 3.10165522,1.17036622 3.00715499,1.33481618 L1.33319515,1.33481618 C0.597257257,1.33569772 0.000881539655,1.93207344 0,2.66801134 L0,13.8668506 C0.000881539655,14.6027885 0.597257257,15.1991642 1.33319515,15.2000458 L6.0151099,15.2000458 C6.02737529,15.2251099 6.03724094,15.2509738 6.05110617,15.2755046 C6.29618109,15.7243985 6.76781577,16.0026077 7.27924554,15.9999816 L14.5878214,15.9999816 C15.0987195,16.0019071 15.5695861,15.7236864 15.8143609,15.275238 C16.0729171,14.8200819 16.0611447,14.2598161 15.7836974,13.8159226 L12.1288762,7.87360514 Z M10.6655612,2.66801134 L10.6655612,7.2291386 C10.4739281,7.2655809 10.292183,7.34218647 10.1322832,7.4539153 L10.1322832,2.93465037 C10.1322832,2.64012903 9.89352645,2.40137231 9.59900511,2.40137231 L7.73253189,2.40137231 L7.73253189,1.86809425 L9.86564414,1.86809425 C10.3074262,1.86809425 10.6655612,2.22622933 10.6655612,2.66801134 Z M3.4663074,1.60145521 L4.02624937,1.60145521 C4.15307468,1.60160791 4.26245727,1.51240702 4.28782226,1.38814399 C4.38928152,0.891678228 4.82605363,0.535138765 5.33278062,0.535138765 C5.8395076,0.535138765 6.27627971,0.891678228 6.37773898,1.38814399 C6.40310397,1.51240702 6.51248655,1.60160791 6.63931187,1.60145521 L7.19925383,1.60145521 L7.19925383,2.66801134 L3.4663074,2.66801134 L3.4663074,1.60145521 Z M7.19925383,3.2012894 C7.38892132,3.20071746 7.56390602,3.09910033 7.65840624,2.93465037 L9.59900511,2.93465037 L9.59900511,8.09598209 L6.21268942,13.6002116 L1.59983419,13.6002116 L1.59983419,2.93465037 L3.00715499,2.93465037 C3.10165522,3.09910033 3.27663992,3.20071746 3.4663074,3.2012894 L7.19925383,3.2012894 Z M1.33319515,14.6667677 C0.891413143,14.6667677 0.533278062,14.3086326 0.533278062,13.8668506 L0.533278062,2.66801134 C0.533278062,2.22622933 0.891413143,1.86809425 1.33319515,1.86809425 L2.93302934,1.86809425 L2.93302934,2.40137231 L1.59983419,2.40137231 C1.30531284,2.40137231 1.06655612,2.64012903 1.06655612,2.93465037 L1.06655612,13.6002116 C1.06655612,13.8947329 1.30531284,14.1334897 1.59983419,14.1334897 L5.93618474,14.1334897 C5.88050847,14.3054362 5.85833225,14.4864665 5.87085818,14.6667677 L1.33319515,14.6667677 Z M15.3480093,15.0152649 C15.1962789,15.2941184 14.9039482,15.4674083 14.5864882,15.4666875 L7.27924554,15.4666875 C6.96190611,15.4674801 6.66965945,15.2942818 6.51799111,15.0155316 C6.35466513,14.7284608 6.36193413,14.3749415 6.53692248,14.094827 L10.1898772,8.15330948 C10.3469989,7.8932981 10.6286691,7.73440388 10.9324669,7.73440388 C11.2362648,7.73440388 11.5179349,7.8932981 11.6750566,8.15330948 L15.3280113,14.0953603 C15.5031322,14.3750471 15.5108101,14.728232 15.3480093,15.0152649 L15.3480093,15.0152649 Z" id="Shape"></path>
                                                        <path d="M10.9322003,8.80070905 C10.4904183,8.80070905 10.1322832,9.15884413 10.1322832,9.60062614 L10.1322832,12.0003774 C10.1322832,12.4421594 10.4904183,12.8002945 10.9322003,12.8002945 C11.3739823,12.8002945 11.7321174,12.4421594 11.7321174,12.0003774 L11.7321174,9.60062614 C11.7321174,9.15884413 11.3739823,8.80070905 10.9322003,8.80070905 Z M11.1988393,12.0003774 C11.1988393,12.1476381 11.0794609,12.2670164 10.9322003,12.2670164 C10.7849396,12.2670164 10.6655612,12.1476381 10.6655612,12.0003774 L10.6655612,9.60062614 C10.6655612,9.45336547 10.7849396,9.33398711 10.9322003,9.33398711 C11.0794609,9.33398711 11.1988393,9.45336547 11.1988393,9.60062614 L11.1988393,12.0003774 Z" id="Shape"></path>
                                                        <path d="M10.9322003,13.3335726 C10.4904183,13.3335726 10.1322832,13.6917077 10.1322832,14.1334897 C10.1322832,14.5752717 10.4904183,14.9334068 10.9322003,14.9334068 C11.3739823,14.9334068 11.7321174,14.5752717 11.7321174,14.1334897 C11.7321174,13.6917077 11.3739823,13.3335726 10.9322003,13.3335726 L10.9322003,13.3335726 Z M10.9322003,14.4001287 C10.7849396,14.4001287 10.6655612,14.2807503 10.6655612,14.1334897 C10.6655612,13.986229 10.7849396,13.8668506 10.9322003,13.8668506 C11.0794609,13.8668506 11.1988393,13.986229 11.1988393,14.1334897 C11.1988393,14.2807503 11.0794609,14.4001287 10.9322003,14.4001287 Z" id="Shape"></path>
                                                        <path d="M5.33278062,5.06776262 L8.79908802,5.06776262 C8.94634869,5.06776262 9.06572705,4.94838426 9.06572705,4.80112358 C9.06572705,4.65386291 8.94634869,4.53448455 8.79908802,4.53448455 L5.33278062,4.53448455 C5.18551995,4.53448455 5.06614159,4.65386291 5.06614159,4.80112358 C5.06614159,4.94838426 5.18551995,5.06776262 5.33278062,5.06776262 Z" id="Path"></path>
                                                        <path d="M5.33278062,6.13431874 L6.9326148,6.13431874 C7.07987547,6.13431874 7.19925383,6.01494038 7.19925383,5.86767971 C7.19925383,5.72041904 7.07987547,5.60104068 6.9326148,5.60104068 L5.33278062,5.60104068 C5.18551995,5.60104068 5.06614159,5.72041904 5.06614159,5.86767971 C5.06614159,6.01494038 5.18551995,6.13431874 5.33278062,6.13431874 Z" id="Path"></path>
                                                        <path d="M5.33278062,8.00079195 L8.79908802,8.00079195 C8.94634869,8.00079195 9.06572705,7.88141359 9.06572705,7.73415292 C9.06572705,7.58689225 8.94634869,7.46751389 8.79908802,7.46751389 L5.33278062,7.46751389 C5.18551995,7.46751389 5.06614159,7.58689225 5.06614159,7.73415292 C5.06614159,7.88141359 5.18551995,8.00079195 5.33278062,8.00079195 Z" id="Path"></path>
                                                        <path d="M5.33278062,9.06734808 L6.9326148,9.06734808 C7.07987547,9.06734808 7.19925383,8.94796972 7.19925383,8.80070905 C7.19925383,8.65344838 7.07987547,8.53407002 6.9326148,8.53407002 L5.33278062,8.53407002 C5.18551995,8.53407002 5.06614159,8.65344838 5.06614159,8.80070905 C5.06614159,8.94796972 5.18551995,9.06734808 5.33278062,9.06734808 Z" id="Path"></path>
                                                        <path d="M5.33278062,10.9338213 L7.19925383,10.9338213 C7.3465145,10.9338213 7.46589286,10.8144429 7.46589286,10.6671823 C7.46589286,10.5199216 7.3465145,10.4005432 7.19925383,10.4005432 L5.33278062,10.4005432 C5.18551995,10.4005432 5.06614159,10.5199216 5.06614159,10.6671823 C5.06614159,10.8144429 5.18551995,10.9338213 5.33278062,10.9338213 Z" id="Path"></path>
                                                        <path d="M5.33278062,12.0003774 L6.39933674,12.0003774 C6.54659741,12.0003774 6.66597577,11.8809991 6.66597577,11.7337384 C6.66597577,11.5864777 6.54659741,11.4670994 6.39933674,11.4670994 L5.33278062,11.4670994 C5.18551995,11.4670994 5.06614159,11.5864777 5.06614159,11.7337384 C5.06614159,11.8809991 5.18551995,12.0003774 5.33278062,12.0003774 Z" id="Path"></path>
                                                        <path d="M2.47787651,5.67916591 C2.37378545,5.78328842 2.37378545,5.952071 2.47787651,6.0561935 L3.01115458,6.58947156 C3.06114746,6.63947955 3.12895708,6.66759775 3.19966837,6.66759775 C3.213961,6.66763569 3.22823173,6.6664762 3.24233062,6.66413049 C3.32701497,6.6504544 3.39994799,6.59687095 3.4383103,6.52014542 L4.50486643,4.38703317 C4.54744808,4.30177462 4.54131024,4.20027543 4.488765,4.12076936 C4.43621975,4.0412633 4.34524995,3.99582922 4.25012306,4.00158172 C4.15499616,4.00733421 4.0701642,4.06339932 4.02758256,4.14865788 L3.12660928,5.95087109 L2.8549041,5.67916591 C2.7507816,5.57507485 2.58199902,5.57507485 2.47787651,5.67916591 L2.47787651,5.67916591 Z" id="Path"></path>
                                                        <path d="M4.38541214,6.96223293 C4.32212546,6.93059196 4.24885761,6.92540254 4.18174297,6.94780743 C4.11462832,6.97021232 4.05917073,7.01837417 4.02758256,7.08168722 L3.12660928,8.88390043 L2.8549041,8.61219525 C2.75028058,8.51114647 2.58397624,8.51259161 2.48112456,8.6154433 C2.37827287,8.71829498 2.37682773,8.88459932 2.47787651,8.98922284 L3.01115458,9.5225009 C3.06114746,9.57250889 3.12895708,9.60062709 3.19966837,9.60062709 C3.213961,9.60066503 3.22823173,9.59950554 3.24233062,9.59715983 C3.32701497,9.58348374 3.39994799,9.52990029 3.4383103,9.45317476 L4.50486643,7.32006251 C4.53650739,7.25677583 4.54169681,7.18350798 4.51929192,7.11639334 C4.49688703,7.04927869 4.44872519,6.9938211 4.38541214,6.96223293 L4.38541214,6.96223293 Z" id="Path"></path>
                                                        <path d="M4.38541214,9.89392907 C4.32212546,9.86228811 4.24885761,9.85709869 4.18174297,9.87950358 C4.11462832,9.90190847 4.05917073,9.95007031 4.02758256,10.0133834 L3.12660928,11.8155966 L2.8549041,11.5438914 C2.75028058,11.4428426 2.58397624,11.4442878 2.48112456,11.5471394 C2.37827287,11.6499911 2.37682773,11.8162955 2.47787651,11.920919 L3.01115458,12.454197 C3.06092836,12.5046943 3.12876514,12.5332875 3.19966837,12.5336564 C3.213961,12.5336944 3.22823173,12.5325349 3.24233062,12.5301892 C3.32701497,12.5165131 3.39994799,12.4629296 3.4383103,12.3862041 L4.50486643,10.2530918 C4.53693054,10.1896702 4.54235016,10.1160727 4.5199221,10.0486384 C4.49749405,9.98120402 4.44907425,9.92551302 4.38541214,9.89392907 Z" id="Path"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </>
                )
            case 'amcList':
            case 'sectorList':
                return(
                    <>
                        <Image src='/assets/images/amcIcon.svg' width={15} height={15}/>
                            
                    </>
                )
            case 'sort':
                return(
                    <svg width="16" height="14" viewBox="0 0 16 14" xmlns="http://www.w3.org/2000/svg">
                        <g opacity=".7">
                            <g opacity=".9" fill="#000">
                                <path d="M7.034 8.616 5.49 10.162a.2.2 0 0 1-.342-.141V2.205a.913.913 0 1 0-1.827 0v7.816a.2.2 0 0 1-.341.141L1.433 8.616a.2.2 0 0 0-.283 0L.141 9.625a.2.2 0 0 0 0 .283l3.951 3.95a.2.2 0 0 0 .283 0l3.951-3.95a.2.2 0 0 0 0-.283L7.317 8.616a.2.2 0 0 0-.283 0zM15.437 4.092l-3.95-3.95a.2.2 0 0 0-.283 0l-3.951 3.95a.2.2 0 0 0 0 .283L8.26 5.384a.2.2 0 0 0 .283 0l1.546-1.546a.2.2 0 0 1 .342.141v7.816a.913.913 0 0 0 1.826 0V3.979a.2.2 0 0 1 .342-.141l1.546 1.546a.2.2 0 0 0 .282 0l1.01-1.009a.2.2 0 0 0 0-.283z"/>
                            </g>
                        </g>
                    </svg>
                )
            default:
                return (
                    <></>
                )
        }
        
    }
    const sorting = (key, type) => {
        let _url=router.asPath;
        const _pageIdx=_url.indexOf("sortKey=");
        const _isQuery=_url.split("?").length>1; 
        if(_isQuery && _pageIdx > -1)
        {
            router.push(`${process.env.BASE_URL}`+_url.substring(0,_pageIdx)+`sortKey=${key}&sortOrder=${type}`);
        }
        else
        {
            router.push(`${process.env.BASE_URL}${_url}${_isQuery?"&":"?"}sortKey=${key}&sortOrder=${type}`);
        }
    }
    return(
        <>
            {isMobile?
                <div className={`${styles.mobileFilter} ${filterMobile?styles.active:null}`}>
                    <div className={styles.mobileFilterBox}>
                        <div className={`${styles.tileHeading} cursorPointer`}>
                            <p className="font16 text444 fontBold">Filter/Sort</p>
                            <Image src="/assets/images/closeFilter.svg" width={18} height={18} alt="" onClick={()=>setFilterMobile(!filterMobile)}/>
                        </div>
                        <div className={styles.categoryBox}>
                            <div className={styles.categoryMain}>
                                <div className={styles.labelBox}>
                                        <div className={`${styles.catLabel} ${showShort?styles.active:null }`} onClick={()=>shortFunction()}>
                                            <label>
                                                {filterIcon('short')}
                                                <p className="text444 font12 fontsemiBold mt5">Short</p>
                                            </label>
                                        </div>
                                    {master && Object.keys(master).length > 0 && Object.keys(master).map((item,index)=>
                                        <div className={`${styles.catLabel} ${mobileFilter ===index?styles.active:null }`} onClick={()=>mobileFilterSet(index)} key={index}>
                                            <label>
                                                {filterIcon(item)}
                                                <p className="text444 font12 fontsemiBold mt5">{item === 'sipDuration' ? 'SIP Duration':item==='amcList'?'AMC List': commonFunctions.breakCamelCase(item)}</p>
                                            </label>
                                            
                                        </div>
                                    )}
                                    
                                </div>
                                <div className={`${styles.categoryItem} ${showShort?styles.active:null }`} >
                                    <div className={`${styles.catTitle}`}>
                                        <p className="font14 text666 opt80 lineHeight24 mb15">Sort By</p>
                                    </div>
                                    <ul className={styles.sort}>
                                        <li className={`cursorPointer ${router.query.sortKey === 'scheme_name' && router.query.sortOrder === 'asc'  ? `${styles.active}` : router.query.sortKey === 'scheme_name' && router.query.sortOrder === 'desc' ? styles.active : ''}`} onClick={() => sorting('scheme_name', router.query.sortOrder === 'desc' ? 'asc' : router.query.sortOrder === 'asc' ? 'desc' : 'asc')}>
                                            <p className="font12 text444">Mutual Fund Schemes </p>
                                            <p className={`font12 text908f8f ${styles.mobileTag}`}>(A-Z) 
                                                <span className={` ${styles.shorArrow} ${router.query.sortKey === 'scheme_name' && router.query.sortOrder === 'asc'  ? `${styles.up}` : router.query.sortKey === 'scheme_name' && router.query.sortOrder === 'desc' ? '' : ''}`}>
                                                   <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.733.163h-.001a.564.564 0 0 0-.04-.037L3.672.11 3.648.094 3.624.079C3.616.074 3.609.069 3.6.066L3.576.053l-.024-.01-.025-.01-.026-.01-.026-.006-.027-.006-.03-.005-.024-.003a.561.561 0 0 0-.11 0L3.26.006l-.03.005-.027.006-.025.007-.027.01-.025.008-.024.011-.025.013-.023.013-.024.015-.024.017-.02.015a.557.557 0 0 0-.04.037L.163 2.94a.555.555 0 1 0 .787.786l1.833-1.83v7.548a.556.556 0 0 0 1.113 0V1.897l1.832 1.83a.557.557 0 0 0 .787-.787L3.733.163z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                                                    </svg> 
                                                </span>
                                                
                                            </p>
                                        </li>
                                        <li className={`cursorPointer ${router.query.sortKey === 'category_type' && router.query.sortOrder === 'asc'  ? `${styles.active}` : router.query.sortKey === 'category_type' && router.query.sortOrder === 'desc' ? styles.active : ''}`} onClick={() => sorting('category_type', router.query.sortOrder === 'desc' ? 'asc' : router.query.sortOrder === 'asc' ? 'desc' : 'asc')}>
                                            <p className="font12 text444">Category </p>
                                            <p className={`font12 text908f8f ${styles.mobileTag}`}>(A-Z) 
                                                <span className={` ${styles.shorArrow} ${router.query.sortKey === 'category_type' && router.query.sortOrder === 'asc'  ? `${styles.up}` : router.query.sortKey === 'category_type' && router.query.sortOrder === 'desc' ? '' : ''}`}>
                                                    <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.733.163h-.001a.564.564 0 0 0-.04-.037L3.672.11 3.648.094 3.624.079C3.616.074 3.609.069 3.6.066L3.576.053l-.024-.01-.025-.01-.026-.01-.026-.006-.027-.006-.03-.005-.024-.003a.561.561 0 0 0-.11 0L3.26.006l-.03.005-.027.006-.025.007-.027.01-.025.008-.024.011-.025.013-.023.013-.024.015-.024.017-.02.015a.557.557 0 0 0-.04.037L.163 2.94a.555.555 0 1 0 .787.786l1.833-1.83v7.548a.556.556 0 0 0 1.113 0V1.897l1.832 1.83a.557.557 0 0 0 .787-.787L3.733.163z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                                                    </svg> 
                                                </span>
                                                
                                            </p>
                                        </li>
                                        {/* <li>
                                            <p className="font12 text444">Ratings  </p>
                                            <p className="font12 text908f8f">Low - High  <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3.733.163h-.001a.564.564 0 0 0-.04-.037L3.672.11 3.648.094 3.624.079C3.616.074 3.609.069 3.6.066L3.576.053l-.024-.01-.025-.01-.026-.01-.026-.006-.027-.006-.03-.005-.024-.003a.561.561 0 0 0-.11 0L3.26.006l-.03.005-.027.006-.025.007-.027.01-.025.008-.024.011-.025.013-.023.013-.024.015-.024.017-.02.015a.557.557 0 0 0-.04.037L.163 2.94a.555.555 0 1 0 .787.786l1.833-1.83v7.548a.556.556 0 0 0 1.113 0V1.897l1.832 1.83a.557.557 0 0 0 .787-.787L3.733.163z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                                            </svg> </p>
                                        </li> */}
                                        <li className={`cursorPointer ${router.query.sortKey === 'return' && router.query.sortOrder === 'asc'  ? `${styles.active}` : router.query.sortKey === 'return' && router.query.sortOrder === 'desc' ? styles.active : ''}`} onClick={() => sorting('return', router.query.sortOrder === 'desc' ? 'asc' : router.query.sortOrder === 'asc' ? 'desc' : 'asc')}>
                                            <p className="font12 text444">Returns </p>
                                            <p className={`font12 text908f8f ${styles.mobileTag}`}>High - Low
                                            <span className={` ${styles.shorArrow} ${router.query.sortKey === 'return' && router.query.sortOrder === 'asc'  ? `${styles.up}` : router.query.sortKey === 'return' && router.query.sortOrder === 'desc' ? '' : ''}`}>
                                                    <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.733.163h-.001a.564.564 0 0 0-.04-.037L3.672.11 3.648.094 3.624.079C3.616.074 3.609.069 3.6.066L3.576.053l-.024-.01-.025-.01-.026-.01-.026-.006-.027-.006-.03-.005-.024-.003a.561.561 0 0 0-.11 0L3.26.006l-.03.005-.027.006-.025.007-.027.01-.025.008-.024.011-.025.013-.023.013-.024.015-.024.017-.02.015a.557.557 0 0 0-.04.037L.163 2.94a.555.555 0 1 0 .787.786l1.833-1.83v7.548a.556.556 0 0 0 1.113 0V1.897l1.832 1.83a.557.557 0 0 0 .787-.787L3.733.163z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                                                    </svg> 
                                            </span>
                                            </p>
                                        </li>
                                        <li className={`cursorPointer ${router.query.sortKey === 'schemeAum' && router.query.sortOrder === 'asc'  ? `${styles.active}` : router.query.sortKey === 'schemeAum' && router.query.sortOrder === 'desc' ? styles.active : ''}`} onClick={() => sorting('schemeAum', router.query.sortOrder === 'desc' ? 'asc' : router.query.sortOrder === 'asc' ? 'desc' : 'asc')}>
                                            <p className="font12 text444">AUM</p>
                                            <p className={`font12 text908f8f ${styles.mobileTag}`}>Low - High  
                                               <span className={` ${styles.shorArrow}  ${router.query.sortKey === 'schemeAum' && router.query.sortOrder === 'asc'  ? `${styles.up}` : router.query.sortKey === 'schemeAum' && router.query.sortOrder === 'desc' ? '' : ''}`} >
                                                    <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M3.733.163h-.001a.564.564 0 0 0-.04-.037L3.672.11 3.648.094 3.624.079C3.616.074 3.609.069 3.6.066L3.576.053l-.024-.01-.025-.01-.026-.01-.026-.006-.027-.006-.03-.005-.024-.003a.561.561 0 0 0-.11 0L3.26.006l-.03.005-.027.006-.025.007-.027.01-.025.008-.024.011-.025.013-.023.013-.024.015-.024.017-.02.015a.557.557 0 0 0-.04.037L.163 2.94a.555.555 0 1 0 .787.786l1.833-1.83v7.548a.556.556 0 0 0 1.113 0V1.897l1.832 1.83a.557.557 0 0 0 .787-.787L3.733.163z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                                                    </svg> 
                                               </span>
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                {master && Object.keys(master).length > 0 && Object.keys(master).map((item,index)=>
                                <div className={`${styles.categoryItem} ${mobileFilter ===index?styles.active:null }`} key={index}>
                                    <div className={`${styles.catTitle}`}>
                                        <p className="font14 text666 opt80 lineHeight24 mb15">Select {commonFunctions.breakCamelCase(item)}</p>
                                    </div>
                                    {showFilter(master[item], item)}
                                </div>
                                )}
                            </div>
                            {!showShort && <div className={styles.btntabs}>
                                {category === '' && Object.keys(router.query).length > 0 &&<p className="font14 textLink cursorPointer" onClick={() => router.push(`${process.env.BASE_URL}/${router.pathname}`)}>Reset All</p>}
                                <button className="btn  btn-primary" onClick={()=>applyFilter()}>Apply</button>
                            </div>}
                        </div>
                    </div>
                </div>
            :
            <div className={styles.filterBox}>
                <div className={`${styles.resetFilterBx} mb15`}>
                    <div className={styles.resetBtn}>
                        <p className="font16 lineHeight26 fontBold text181d">Filters</p>
                        {category === '' && Object.keys(router.query).length > 0 && <button className="textLink font16 lineHeight26" onClick={() => router.push(`${process.env.BASE_URL}/${router.pathname}`)}>Reset All</button>}
                    </div>
                </div>
                <div className={styles.webfilter }>
                    {master && Object.keys(master).length > 0 && Object.keys(master).map((item,index)=>
                        <div className={`${styles.filterType} ${item === 'fundCategory' ? styles.fundCategory : item === 'amcList' ? styles.filterAmc : null}`} key={index}>
                            {showFilter(master[item], item)}
                        </div>
                    )}
                </div>
            </div>
            }
        </>
       
    )
}