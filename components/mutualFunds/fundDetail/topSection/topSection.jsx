import React, { useEffect, useState } from "react";
import style from './topSection.module.css'
import Image from "next/image";
import {NavLink} from '../../../ui';
import { getAmcApi } from '../../../../services/mutualFunds';
import {PopupModal} from '../../../shared/PopupModal';
import { CompareWidget } from "../../../mutualFunds/compareFunds/compareWidget";
import commonFunctions from '../../../../utils/CommonFunctions';

const TopSection = ({schemeDetail}) => {
    const [compareFundsData, setCompareFundsData] = useState({schemeCode : typeof window !== 'undefined' ? localStorage.getItem('compareFunds') ? JSON.parse(localStorage.getItem('compareFunds')) : [] : []});
    const [schemeCode, setSchemeCode] = useState(compareFundsData.schemeCode);
    const [showMaxComparePopUp, setShowMaxComparePopUp] = useState(false);
    const [data, setData] = useState([]);

    let filteredFunds = [];
    const handleChange = async(scheme = '')=>{
        filteredFunds = compareFundsData.schemeCode;
        if(scheme != ''){
            let index = filteredFunds.findIndex((data) => data === scheme);
            index != -1 ? filteredFunds.splice(index, 1) : filteredFunds && filteredFunds.length <= 2 && filteredFunds.push(scheme);
            setCompareFundsData({...compareFundsData , schemeCode :filteredFunds});
            localStorage.setItem('compareFunds', JSON.stringify(filteredFunds));
        }
        const data = await getAmcApi(`amc/compare?f[schemecode]=${filteredFunds}`);
        if(data){
            setData(data.data);
            setSchemeCode(filteredFunds);
        }
    }
    useEffect(()=>{
        handleChange();
    },[])

    const showPopUp = () =>{
        setShowMaxComparePopUp(true);
    }
    return(
            <>
            {data && data.length > 0 && <CompareWidget data={data} handleChange={handleChange} schemeCode={schemeCode}/>}
            {showMaxComparePopUp && <PopupModal text="You have already selected 3 funds. Please remove a selected fund to compare this one." btnText="Ok, got it" setCloseHandle={setShowMaxComparePopUp} />}
           <section className={style.topHeader}>
                <div className="container">
                    <div className={`${style.smallCap} bgWhite`}>
                        <div className={style.bank}>
                            <figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/icon/${schemeDetail.amcLogo}`} alt="" width = {110} height = {40}/></figure>
                            <div className={style.bankName}>
                                <h1 className={`font20 fontSm16 text2828 fontsemiBold ${style.smallCapName}`}>{schemeDetail.scheme_name}
                                </h1>
                                <div className={style.capTypeBox}>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/${schemeDetail.amcSlug}/${commonFunctions.stringToSlug(schemeDetail.riskText)}`}>
                                    <span className={`${style[schemeDetail.riskClass]} textUC font600`}>
                                        {schemeDetail.riskText}
                                    </span>                                   
                                    </NavLink>
                                    <ul className={style.capType}>
                                        <li className="textUC font500">
                                            <NavLink href={`${process.env.BASE_URL}/mutual-funds/${schemeDetail.amcSlug}/${commonFunctions.stringToSlug(schemeDetail.category_type) === 'elss' ? 'tax-saver' : commonFunctions.stringToSlug(schemeDetail.category_type) === 'other' ? 'others' : schemeDetail.category_type}`}>
                                                <span>{schemeDetail.category_type}</span>
                                            </NavLink>
                                        </li>
                                        <li className="textUC font500">
                                        <NavLink href={`${process.env.BASE_URL}/mutual-funds/${schemeDetail.amcSlug}/${commonFunctions.stringToSlug(schemeDetail.category_type) === 'elss' ? 'tax-saver' : commonFunctions.stringToSlug(schemeDetail.category_type) === 'other' ? 'others' : schemeDetail.category_type}/${schemeDetail.categorySlug}`}>
                                                <span>{schemeDetail.sub_category}</span>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={`${style.avg} font20 fontSm16 text444`}>
                            <span className="fontsemiBold">₹ {schemeDetail.navValue}</span><br/>
                            <span className="font14 fontSm12 opt80 text666">NAV ({schemeDetail.navDate}) </span>
                        </div>
                        <div className="font14 fontSm12 fontsemiBold text666 textLink">
                        <label className={`checkInput checkCenter  text313541 textLink gridGap15 cursorPointer`}>
                                <input
                                className="form-check-input cursorPointer"  
                                autoComplete="none"
                                type="checkbox"
                                required={true}
                                checked={schemeCode && schemeCode.length != 0 && schemeCode.findIndex((data) => data === schemeDetail.schemecode) != -1 ? 'checked' : ''}
                                id="acc"
                                onChange={()=>schemeCode && schemeCode.length >= 3 && schemeCode.findIndex((data) => data === schemeDetail.schemecode) === -1 ? showPopUp() : handleChange(schemeDetail.schemecode)}
                                name="consentStatement"
                                value="false"
                                />
                                Add to<br/>compare 
                            </label>
                        </div>
                    </div>
                </div>
            </section>
            </>
        
    )
}

export default TopSection