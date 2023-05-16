import React, {useState} from "react";
import style from './fundTableScheme.module.css'
import Image from "next/image";
import {NavLink} from '../../../ui';
import { filterTable } from "../../../../services/mutualFunds";
import {useGlobalContext} from '../../../../libs/context';
import Link from "next/link";

const FundTableScheme = ({data, schemeDetail, newtableData,operationsRef}) =>{
    const [value, setValue] = useState(1)
    const [tableData, setTableData] = useState(newtableData);
    const { isMobile } = useGlobalContext();
    const changeHandler = async(tabId) => {
        let data = await filterTable(schemeDetail.sub_category,tabId);
        setValue(tabId);
        setTableData(data);
    }
    return(
        <section className={style.section} id="Peer-Comparison" ref={operationsRef}>
            <div className="container">
                    <h2 className="font24 w100 mb40 text2828 grid4Span Innerheading fontMedium lineHeight36 ">Peer Comparison</h2>
                    <div className={style.comparsionTable}>
                        <div className={`${style.titleHead}`}>
                                <p className="font14 fontsemiBold text313541">Pick your choice with our quick comparitive analysis</p>
                                <div className={`mb20 ${style.graphDetails}`}>
                                <ul className={style.shorInMonth}>
                                    <li className={value ==1 ? style.active : ''} onClick={() =>changeHandler(1)}>1Y</li>
                                    <li className={value ==3 ? style.active : ''} onClick={() =>changeHandler(3)}>3Y</li>
                                    <li className={value ==5 ? style.active : ''} onClick={() =>changeHandler(5)}>5Y</li>
                                </ul>
                            </div>
                        </div>
                        <div className={`${style.comparisonTable} mb35`}>
                            {
                                isMobile?<div className={style.fundsMob}> 
                                {tableData &&  tableData.map((item,index) => (
                                <div className={style.fundTableMob} key={index}>
                                    <figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/icon/${item.amcLogo}`} alt="" width = {21} height = {21}/></figure>
                                    <div className={style.fundDetails}>
                                    <NavLink href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}/${item.schemeSlug}`}>
                                        <div className={style.fundName}>
                                            <p className="fontsemiBold  text444 font12 ">{item.fund}
                                            </p>
                                            <div className={style.ratingWrap}><span className={`${style.impact} ${style[item.riskClass]}`}>{item.riskText}</span>
                                                {/* <span className={style.Ratings}>{item.rating}<Image className="imgResponsive" src={`/assets/images/star.svg`} alt="" width = {10} height = {10}/></span> */}
                                            </div>
                                            
                                        </div>
                                    </NavLink>
                                        <p className="font12 text666">
                                            Sub Category<br/>
                                            <span className="font12 text444 mt5">{item.category_type}</span>
                                        </p>
                                        <p className="font12 text666">
                                            Absolute Return<br/>
                                            <span className="font12 text444 mt5">{item.return}%</span>
                                        </p>
                                        
                                    </div>
                                </div>
                                ))}
                            </div>:
                                <table>
                                    <thead>
                                        <tr>
                                            <td className=" font14 fontsemiBold text313541 opt40">Mutual Fund Schemes</td>
                                            <td className=" font14 fontsemiBold text313541 opt40">Category</td>
                                            <td className=" font14 fontsemiBold text313541 opt40">Risk</td>
                                            <td className=" font14 fontsemiBold text313541 opt40">Absolute Return ({value}Y)</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {tableData && tableData.map((item,index) => (
                                        <tr className={index == 0 ? style.active : ''} key={index}>
                                            <td><NavLink href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}/${item.schemeSlug}`}><p className={`font14 fontsemiBold text444 ${style.aligncntr}`}><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/icon/${item.amcLogo}`} alt={item.scheme_name} width = {60} height = {60}/>{item.scheme_name}</p></NavLink></td>
                                            <td><p className="font14  text666">{item.category_type.toUpperCase()}</p></td>
                                            <td><span className={`${style[item.riskClass]} textUC font600`}>{item.riskText}
                                            </span></td>
                                            <td><p className="font14 fontsemiBold text444">{item.return}%</p> </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            }
                            
                            
                        </div>
                        <Link href={`${process.env.BASE_URL}/mutual-funds/search?sipDuration=5&rating=&risk=&amcSlug=&category=${schemeDetail.category}-${schemeDetail.category_type}`}>
                        <div className={`${style.allfunds} font14 textLink fontBold cursorPointer`}>Show all Funds</div>
                        </Link>
                    </div>
            </div>

        </section>
    )
}

export default FundTableScheme