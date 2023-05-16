import React, {useState,useEffect} from "react";
import style from "../FundTable.module.css";
import Image from 'next/image';
import {useRouter} from 'next/router';
import { getAmcApi } from '../../../../services/mutualFunds';
import { CompareWidget } from "../../../mutualFunds/compareFunds/compareWidget";
import {NavLink} from '../../../ui';
import {PopupModal} from '../../PopupModal';
export function MobileRow({TableData,showIcon,showNumberOfAmc}){
    const router = useRouter();
    const [compareFundsData, setCompareFundsData] = useState({schemeCode : typeof window !== 'undefined' ? localStorage.getItem('compareFunds') ? JSON.parse(localStorage.getItem('compareFunds')) : [] : []});;
    const [data, setData] = useState([]);
    const [schemeCode, setSchemeCode] = useState(compareFundsData.schemeCode);
    const [showMaxComparePopUp, setShowMaxComparePopUp] = useState(false);
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
        {TableData && TableData.length > 0? TableData.map((item,index) => (
            <div className={`${style.fundTableMob} ${showIcon?index < showNumberOfAmc ? style.active : style.displayNone:''}`} key={index}>
                <NavLink href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}/${item.schemeSlug}`}><figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/icon/${item.amcLogo}`} alt="" width = {21} height = {21}/></figure></NavLink>
                <div className={style.fundDetails}>
                    <div className={style.fundName}>
                        <p className="fontsemiBold  text444 font12 ">
                        <NavLink className="fontsemiBold  text444" href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}/${item.schemeSlug}`}> {item.scheme_name}</NavLink>
                            <span className="">
                            <input
                                className= {`form-check-input`}   
                                autoComplete="none"
                                type="checkbox"
                                required={true}
                               // disabled={schemeCode && schemeCode.length >= 3 && schemeCode.findIndex((data) => data === item.schemecode) === -1 ? 'disbaled' : ''}
                                checked={schemeCode && schemeCode.length != 0 && schemeCode.findIndex((data) => data === item.schemecode) != -1 ? 'checked' : ''}
                                id={index+'comp'}
                                onChange={()=>schemeCode && schemeCode.length >= 3 && schemeCode.findIndex((data) => data === item.schemecode) === -1 ? showPopUp() : handleChange(item.schemecode)}
                                name="consentStatement"
                                value="true" />
                            </span>
                        </p>
                        <div className={style.capTypeBox}>
                            <ul className={style.capType}>
                                <li className={`${style.impact} text666 font12 opt80 riskType`}>Risk</li>
                                <li> <span className={`${style.impact} ${style[item.riskClass]}`}>{item.riskText}</span></li>
                            </ul>
                        </div>
                        {/* <div className={style.ratingWrap}><span className={`${style.impact} ${style[item.riskClass]}`}>{item.riskText}</span>
                        <span className={style.Ratings}>4.5 <img src="assets/images/star.svg" /></span>
                        </div> */}
                    </div>
                    <p className="font12 ">
                        <span className="textBlack"> Category</span>
                        <span className="font12 text444 mt5">{item.category_type.toUpperCase()}</span>
                    </p>
                    <p className="font12 text666">
                       <span className="textBlack">{router.query.sipDuration?router.query.sipDuration:5}Y Returns<br/></span>
                        <span className="font12 text444 mt5">{ Math.round(item.return) || 0}%</span>
                    </p>
                    <p className="font12 text666">
                        <span className="textBlack">AUM <span className="font10">(in Cr.)</span></span>
                        <span className="font12 text444 mt5">{ !isNaN(item.schemeAum) ?'₹'+ parseInt(item.schemeAum || 0).toLocaleString('en-IN') : "--"}</span>
                    </p>
                </div>
            </div>
      ))
      :
      <div className={style.fundTableMob} >
        <div className={style.fundDetails}>
            <div className={`${style.fundName} textCenter`}>{router.asPath === '/mutual-funds/search' ? `Choose filters to begin your mutual fund's discovery` : `No Records Found`}</div>
        </div>
      </div>}
      </>
    )
}