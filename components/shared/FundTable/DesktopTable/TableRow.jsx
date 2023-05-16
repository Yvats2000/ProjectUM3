import React, {useState, useEffect} from "react";
import style from "../FundTable.module.css";
import Image from 'next/image';
import { getAmcApi } from '../../../../services/mutualFunds';
import { CompareWidget } from "../../../mutualFunds/compareFunds/compareWidget";
import {NavLink} from '../../../ui';
import {PopupModal} from '../../PopupModal';
import { useRouter } from 'next/router';

export function TableRow({TableData,showNumberOfAmc,showIcon}){
    const router = useRouter();
    const [compareFundsData, setCompareFundsData] = useState({schemeCode : typeof window !== 'undefined' ? localStorage.getItem('compareFunds') ? JSON.parse(localStorage.getItem('compareFunds')) : [] : []});;
    const [data, setData] = useState([]);
    const [showMaxComparePopUp, setShowMaxComparePopUp] = useState(false);
    const [schemeCode, setSchemeCode] = useState(compareFundsData.schemeCode);
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
        {showMaxComparePopUp && <PopupModal text="You have already selected 3 funds. Please remove a selected fund to compare this one." btnText="Ok, got it" setCloseHandle={setShowMaxComparePopUp} />}
        {data && data.length > 0 && <CompareWidget data={data} handleChange={handleChange} schemeCode={schemeCode}/>}
        {TableData && TableData.length > 0?TableData.map((item,index) => (
            <div className={`${style.tableRow} ${style.border} ${showIcon?index < showNumberOfAmc ? style.active : style.displayNone:''}`} key={index}>
                <div className={`${style.tableTd} ${style.SchemeName}`}>
                    <NavLink href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}/${item.schemeSlug}`}><figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/icon/${item.amcLogo}`} alt="" width = {21} height = {21}/></figure></NavLink>
                    <p className="fontsemiBold text444">
                    <NavLink href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}/${item.schemeSlug}`} className="fontsemiBold text444">{item.scheme_name}</NavLink>
                            <div className={style.capTypeBox}>
                                <ul className={style.capType}>
                                    <li className={`${style.impact} text666 font12 opt80 riskType`}>Risk</li>
                                    <li> <span className={`${style.impact} ${style[item.riskClass]}`}>{item.riskText}</span></li>
                                </ul>
                            </div>
                    </p>
                </div>
                <div className={`${style.tableTd} ${style.SubCategory} text666 textUC`}>{item.category_type}</div>
                <div className={`${style.tableTd} ${style.Returns} fontBold text444`}>{ Math.round(item.return) || 0}%</div>
                <div className={`${style.tableTd} ${style.Fundsize} fontBold text444`}>{ item.schemeAum ? !isNaN(item.schemeAum) ? '₹'+ parseInt(item.schemeAum).toLocaleString('en-IN') : "-" : '-'}</div>
                <div className={`${style.tableTd} ${style.Compare}`}>
                <div className="form-check mb30 ">            
                    <label className={`checkInput checkCenter  text313541 ${style.checkBoxCenter}`}>
                        <input
                            className= {`form-check-input`}   
                            autoComplete="none"
                            type="checkbox"
                            required={true}
                            //disabled={schemeCode && schemeCode.length >= 3 && schemeCode.findIndex((data) => data === item.schemecode) === -1 ? 'disbaled' : ''}
                            checked={schemeCode && schemeCode.length != 0 && schemeCode.findIndex((data) => data === item.schemecode) != -1 ? 'checked' : ''}
                            id={index+'comp'}
                            onChange={()=>schemeCode && schemeCode.length >= 3 && schemeCode.findIndex((data) => data === item.schemecode) === -1 ? showPopUp() : handleChange(item.schemecode)}
                            name="consentStatement"
                            value="true" />
                        </label>
                        <p className="mt10">Add to Compare</p>
                    </div>   
                </div>
            </div>
            
        
        ))
   :<div className={`${style.tableRow} ${style.border} `}>
      <div className={`${style.tableTd} ${style.SchemeName}`}>{router.asPath === '/mutual-funds/search' ? `Choose filters to begin your mutual fund's discovery` : `No Records Found`}</div>
    </div>}
        </>
       
    )
}