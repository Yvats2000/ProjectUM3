import React, { useState } from 'react'
import Image from 'next/image'
import styles from './compareDetails.module.css'
import { useGlobalContext } from '../../../../libs/context'
import commonFunctions from '../../../../utils/CommonFunctions'
import { TooltipWide } from '../../../shared/TooltipWide/TooltipWide'
export const CompareDetails = ({data,headerRef,activeSpecific,setSctiveSpecific }) => {
    const {isMobile} = useGlobalContext()
    const colohan1 = data && data[0] && data[0].quickComparison.riskClass
    const colohan2 = data && data[1] && data[1].quickComparison.riskClass
    const colohan3 = data && data[2] && data[2].quickComparison.riskClass
  return (
    <section className={styles.comparisonOverview}>
        <div className="container">
            <div className={styles.mutualFundtblWrap} ref = {headerRef}>
                <ul>
                    <li id='QuickComparison' className={`${activeSpecific ==='QuickComparison' && styles.active}`} onClick={()=>setSctiveSpecific('QuickComparison',0)}>
                        <div className={`cursorPointer ${styles.title}`}><p className="font18 fontsemiBold text2828">Quick Comparison</p><img src="/assets/images/arrow.svg" alt=""/></div>
                        <div className={styles.tblWrap}>
                            {isMobile?<div className={styles.mbltbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Category</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && commonFunctions.capitalize(data[0].quickComparison.category_type) || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && commonFunctions.capitalize(data[1].quickComparison.category_type) || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && commonFunctions.capitalize(data[2].quickComparison.category_type) || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Sub-Category</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].quickComparison.sub_category || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].quickComparison.sub_category || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].quickComparison.sub_category || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Risk</p></th>
                                        </tr>
                                        <tr>
                                            <td><span className={`${styles[colohan1]} font10 ${styles.data && data[0] && data[0].quickComparison.riskClass}`}>{data && data[0] && data[0].quickComparison.riskText || '-'}</span></td>
                                            <td><span className={`${styles[colohan2]} font10 ${styles.data && data[1] && data[1].quickComparison.riskClass}`}>{data && data[1] && data[1].quickComparison.riskText || '-'}</span></td>
                                            <td><span className={` ${styles[colohan3]} font10 ${styles.data && data[2] && data[2].quickComparison.riskClass}`}>{data && data[2] && data[2].quickComparison.riskText || '-'}</span></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Min. SIP amount</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].quickComparison.mininvt ? '₹ ' + parseInt(data[0].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].quickComparison.mininvt ? '₹ ' + parseInt(data[1].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].quickComparison.mininvt ? '₹ ' + parseInt(data[2].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Expense ratio</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].quickComparison.expratio || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].quickComparison.expratio || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].quickComparison.expratio || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">AUM</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && '₹ '+data[0].quickComparison.schemeAum || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && '₹ '+data[1].quickComparison.schemeAum || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && '₹ '+data[2].quickComparison.schemeAum || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Fund Started</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].quickComparison.fundStartDate || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].quickComparison.fundStartDate || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].quickComparison.fundStartDate || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Fund Size</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && '₹ '+ data[0].quickComparison.amcAum+' Cr' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && '₹ '+ data[1].quickComparison.amcAum+' Cr' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && '₹ '+ data[2].quickComparison.amcAum+' Cr' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Exit Load</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].quickComparison.exitLoad || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].quickComparison.exitLoad || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].quickComparison.exitLoad || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Scheme Index</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].quickComparison.schemeIndex || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].quickComparison.schemeIndex || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].quickComparison.schemeIndex || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Lock in period</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].quickComparison.lockInPeriod || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].quickComparison.lockInPeriod || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].quickComparison.lockInPeriod || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold  text2828 textCenter ">Min. investment</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].quickComparison.mininvt ? '₹ ' + parseInt(data[0].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].quickComparison.mininvt ? '₹ ' + parseInt(data[1].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].quickComparison.mininvt ? '₹ ' + parseInt(data[2].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>:
                            <div className={styles.webtbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Category</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && commonFunctions.capitalize(data[0].quickComparison.category_type) || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && commonFunctions.capitalize(data[1].quickComparison.category_type) || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && commonFunctions.capitalize(data[2].quickComparison.category_type) || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Sub-Category</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].quickComparison.sub_category || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].quickComparison.sub_category || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].quickComparison.sub_category || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Risk</p></td>
                                            <td><span className={`${styles[colohan1]} font14 ${styles.data && data[0] && data[0].quickComparison.riskClass}`}>{data && data[0] && data[0].quickComparison.riskText || '-'}</span></td>
                                            <td><span className={`${styles[colohan2]} font14 ${styles.data && data[1] && data[1].quickComparison.riskClass}`}>{data && data[1] && data[1].quickComparison.riskText || '-'}</span></td>
                                            <td><span className={`${styles[colohan3]} font14 ${styles.data && data[2] && data[2].quickComparison.riskClass}`}>{data && data[2] && data[2].quickComparison.riskText || '-'}</span></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Min. SIP amount</p></td>
                                            <td><p className="font14 text666 textCenter fontsemiBold">{data && data[0] && data[0].quickComparison.mininvt ? '₹ ' + parseInt(data[0].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            <td><p className="font14 text666 textCenter fontsemiBold">{data && data[1] && data[1].quickComparison.mininvt ? '₹ ' + parseInt(data[1].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            <td><p className="font14 text666 textCenter fontsemiBold">{data && data[2] && data[2].quickComparison.mininvt ? '₹ ' + parseInt(data[2].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Expense ratio</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].quickComparison.expratio || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].quickComparison.expratio || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].quickComparison.expratio || '-'}</p></td>
                                        </tr><tr>
                                            <td><p className="font14 fontBold text313541 textLeft">AUM</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && '₹ '+data[0].quickComparison.schemeAum || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && '₹ '+data[1].quickComparison.schemeAum || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && '₹ '+data[2].quickComparison.schemeAum || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Fund Started</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].quickComparison.fundStartDate || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].quickComparison.fundStartDate || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].quickComparison.fundStartDate || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Fund Size</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && '₹ '+ data[0].quickComparison.amcAum +'Cr' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && '₹ '+ data[1].quickComparison.amcAum +'Cr'|| '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && '₹ '+ data[2].quickComparison.amcAum +'Cr'|| '-'}</p></td>
                                            {/* <td><p className="font14 text666 fontsemiBold textCenter"><span className={styles.Rating}>4.5 <Image width={10} height={10} src="/assets/images/star.svg"/></span></p></td>
                                            <td><span className={styles.Rating}>4.5 <Image width={10} height={10} src="/assets/images/star.svg"/></span></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">-</p></td> */}
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Exit Load</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].quickComparison.exitLoad || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].quickComparison.exitLoad || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].quickComparison.exitLoad || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Scheme Index</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].quickComparison.schemeIndex || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].quickComparison.schemeIndex || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].quickComparison.schemeIndex || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Lock in period</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].quickComparison.lockInPeriod || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].quickComparison.lockInPeriod || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].quickComparison.lockInPeriod || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Min. investment</p></td>
                                            <td><p className="font14 text666 textCenter fontsemiBold">{data && data[0] && data[0].quickComparison.mininvt ? '₹ ' + parseInt(data[0].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            <td><p className="font14 text666 textCenter fontsemiBold">{data && data[1] && data[1].quickComparison.mininvt ? '₹ ' + parseInt(data[1].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            <td><p className="font14 text666 textCenter fontsemiBold">{data && data[2] && data[2].quickComparison.mininvt ? '₹ ' + parseInt(data[2].quickComparison.mininvt).toLocaleString('en-IN') : '-'}</p></td>
                                            {/* <td><p className="font14 text666 fontsemiBold textCenter"><span className={styles.Rating}>4.5 <Image width={10} height={10} src="/assets/images/star.svg"/></span></p></td>
                                            <td><span className={styles.Rating}>4.5 <Image width={10} height={10} src="/assets/images/star.svg"/></span></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">-</p></td> */}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            }
                        </div>
                    </li>
                    <li id='Return' className={`${activeSpecific ==='Return' && styles.active}`} onClick={()=>setSctiveSpecific('Return',1)}>
                        <div className={`cursorPointer ${styles.title}`}><p className="font18 fontsemiBold text2828">Return</p><img src="/assets/images/arrow.svg" alt=""/></div>
                        <div className={styles.tblWrap}>
                        {isMobile?
                            <div className={styles.mbltbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">1Y</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].return.oneYear+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].return.oneYear+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].return.oneYear+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">2Y</p></th>
                                        </tr>
                                        <tr>
                                        <td><p className="font12 text444 textCenter">{data && data[0] && data[0].return.twoYear+'%' || '-'}</p></td>
                                        <td><p className="font12 text444 textCenter">{data && data[1] && data[1].return.twoYear+'%' || '-'}</p></td>
                                        <td><p className="font12 text444 textCenter">{data && data[2] && data[2].return.twoYear+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">3Y</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].return.threeYear+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].return.threeYear+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].return.threeYear+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">5Y</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].return.fiveYear+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].return.fiveYear+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].return.fiveYear+'%' || '-'}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className={styles.webtbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">1Y</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].return.oneYear+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].return.oneYear+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].return.oneYear+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">2Y</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].return.twoYear+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].return.twoYear+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].return.twoYear+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">3Y</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].return.threeYear+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].return.threeYear+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].return.threeYear+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">5Y</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].return.fiveYear+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].return.fiveYear+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].return.fiveYear+'%' || '-'}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            }
                        </div>
                    </li>
                    <li id='HoldingAnalysis' className={`${activeSpecific ==='HoldingAnalysis' && styles.active}`} onClick={()=>setSctiveSpecific('HoldingAnalysis',2)}>
                        <div className={`cursorPointer ${styles.title}`}><p className="font18 fontsemiBold text2828">Holding Analysis</p><img src="/assets/images/arrow.svg" alt=""/></div>
                        <div className={styles.tblWrap}>
                        {isMobile?
                            <div className={styles.mbltbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Top 5</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].holdingAnalysis.top5+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].holdingAnalysis.top5+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].holdingAnalysis.top5+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Top 20</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].holdingAnalysis.top20+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].holdingAnalysis.top20+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].holdingAnalysis.top20+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Turnover</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].holdingAnalysis.top20+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].holdingAnalysis.top20+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].holdingAnalysis.top20+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Equity</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].holdingAnalysis.equity+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].holdingAnalysis.equity+'%' || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].holdingAnalysis.equity+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Cash</p></th>
                                        </tr>
                                        <tr>
                                        <td><p className="font12 text444 textCenter">{data && data[0] && data[0].holdingAnalysis.cash+'%' || '-'}</p></td>
                                        <td><p className="font12 text444 textCenter">{data && data[1] && data[1].holdingAnalysis.cash+'%' || '-'}</p></td>
                                        <td><p className="font12 text444 textCenter">{data && data[2] && data[2].holdingAnalysis.cash+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Top 10 Sectors</p></th>
                                        </tr>
                                        <tr>
                                            <td>
                                                <ul className={styles.blueList}>
                                                    {data && data[0] && data[0].holdingAnalysis.top10Sectors.length>0 && data[0].holdingAnalysis.top10Sectors.slice(0,5).map((item,index)=><li className='font14 text666 fontsemiBold textLeft lineHeight20' key={index}>{item.name} - <span>{item.percentage + '%' || '-'}</span></li>) || '-'}
                                                </ul>    
                                            </td>
                                            <td>
                                                <ul className={styles.blueList}>
                                                    {data && data[1] && data[1].holdingAnalysis.top10Sectors.length>0 && data[1].holdingAnalysis.top10Sectors.slice(0,5).map((item,index)=><li className='font14 text666 fontsemiBold textLeft lineHeight20' key={index}>{item.name} - <span>{item.percentage + '%' || '-'}</span></li>) || '-'}
                                                </ul>    
                                            </td>
                                            <td>
                                                <ul className={styles.blueList}>
                                                    {data && data[2] && data[2].holdingAnalysis.top10Sectors.length>0 && data[2].holdingAnalysis.top10Sectors.slice(0,5).map((item,index)=><li className='font14 text666 fontsemiBold textLeft lineHeight20' key={index}>{item.name} - <span>{item.percentage + '%' || '-'}</span></li>) || '-'}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className={styles.webtbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Top 5</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].holdingAnalysis.top5+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].holdingAnalysis.top5+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].holdingAnalysis.top5+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Top 20</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].holdingAnalysis.top20+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].holdingAnalysis.top20+'%'|| '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].holdingAnalysis.top20+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Turnover</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].holdingAnalysis.top20+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].holdingAnalysis.top20+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].holdingAnalysis.top20+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Equity</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].holdingAnalysis.equity+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].holdingAnalysis.equity+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].holdingAnalysis.equity+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Cash</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].holdingAnalysis.cash+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].holdingAnalysis.cash+'%' || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].holdingAnalysis.cash+'%' || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Top 10 Sectors</p></td>
                                            <td>
                                                <ul className={styles.blueList}>
                                                    {data && data[0] && data[0].holdingAnalysis.top10Sectors.length>0 && data[0].holdingAnalysis.top10Sectors.slice(0,5).map((item,index)=><li className='font14 text666 fontsemiBold textLeft lineHeight20' key={index}>{item.name} - <span>{item.percentage + '%' || '-'}</span></li>) || '-'}
                                                </ul>
                                            </td>
                                            <td>
                                                <ul className={styles.blueList}>
                                                    {data && data[1] && data[1].holdingAnalysis.top10Sectors.length>0 && data[1].holdingAnalysis.top10Sectors.slice(0,5).map((item,index)=><li className='font14 text666 fontsemiBold textLeft lineHeight20' key={index}>{item.name} - <span>{item.percentage + '%' || '-'}</span></li>) || '-'}
                                                </ul>
                                            </td>
                                            <td>
                                                <ul className={styles.blueList}>
                                                    {data && data[2] && data[2].holdingAnalysis.top10Sectors.length>0 && data[2].holdingAnalysis.top10Sectors.slice(0,5).map((item,index)=><li className='font14 text666 fontsemiBold textLeft lineHeight20' key={index}>{item.name} - <span>{item.percentage + '%' || '-'}</span></li>) || '-'}
                                                </ul>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            }
                        </div>
                    </li>
                    <li id='Ratios' className={`${activeSpecific ==='Ratios' && styles.active}`} onClick={()=>setSctiveSpecific('Ratios',3)}>
                        <div className={`cursorPointer ${styles.title}`}><p className="font18 fontsemiBold text2828">Ratios</p><img src="/assets/images/arrow.svg" alt=""/></div>
                        <div className={styles.tblWrap}>
                        {isMobile?
                            <div className={styles.mbltbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Alpha</p></th>
                                            
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].ratios.alpha || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].ratios.alpha || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].ratios.alpha || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Beta</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].ratios.beta || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].ratios.beta || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].ratios.beta || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Sharpe</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].ratios.sharpe || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].ratios.sharpe || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].ratios.sharpe || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Sortino</p></th>
                                        </tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].ratios.sortino || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].ratios.sortino || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].ratios.sortino || '-'}</p></td>
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className={styles.webtbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><p className={`font14 fontsemiBold  textLeft ${styles.aligncntr}`}><span className='opt80 text313541'>Alpha</span>
                                            <TooltipWide content='Price-to-earnings ratio is the ratio used for the valuation of a company that determines the current share price with relation to the earning per share.'></TooltipWide>
                                            </p>
                                           </td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].ratios.alpha || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].ratios.alpha || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].ratios.alpha || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className={`font14 fontsemiBold textLeft ${styles.aligncntr}`}><span className='opt80 text313541'>Beta</span>
                                            <TooltipWide content='Is an indicator to the investor of how risky the fund can be as compared to the market.'></TooltipWide></p>
                                            </td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].ratios.beta || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].ratios.beta || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].ratios.beta || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className={`font14 fontsemiBold textLeft ${styles.aligncntr}`}><span className='opt80 text313541'>Sharpe</span>
                                            <TooltipWide content='The Sharpe ratio is an indicator of the potential returns from an investment after considering all the related risks.'></TooltipWide>
                                            </p>
                                            </td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].ratios.sharpe || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].ratios.sharpe || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].ratios.sharpe || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className={`font14 fontsemiBold textLeft ${styles.aligncntr}`}><span className='opt80 text313541'>Sortino</span>
                                            <TooltipWide content='A variation of the Sharpe ratio that aids in the differentiation of potentially harmful volatility from total risk by utilising the asset’s standard deviation.'></TooltipWide>
                                            </p>
                                            </td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].ratios.sortino || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].ratios.sortino || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].ratios.sortino || '-'}</p></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            }
                        </div>
                    </li>
                    <li id='MoreDetails' className={`${activeSpecific ==='MoreDetails' && styles.active}`} onClick={()=>setSctiveSpecific('MoreDetails',4)}>
                        <div className={`cursorPointer ${styles.title}`}><p className="font18 fontsemiBold text2828">More Details</p><img src="/assets/images/arrow.svg" alt=""/></div>
                        <div className={styles.tblWrap}>
                        {isMobile?
                            <div className={styles.mbltbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Launch Date</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].moreDetails.launchData || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].moreDetails.launchData || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].moreDetails.launchData || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Fund Managers</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].moreDetails.amcFundManager.length > 0 && data[0].moreDetails.amcFundManager[0].title+' '+ data[0].moreDetails.amcFundManager[0].name || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].moreDetails.amcFundManager.length > 0 &&  data[1].moreDetails.amcFundManager[0].title+' '+ data[1].moreDetails.amcFundManager[0].name || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].moreDetails.amcFundManager.length > 0 && data[2].moreDetails.amcFundManager[0].title+' '+ data[2].moreDetails.amcFundManager[0].name || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Custodian</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textCenter">{data && data[0] && data[0].moreDetails.custodian.name || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[1] && data[1].moreDetails.custodian.name || '-'}</p></td>
                                            <td><p className="font12 text444 textCenter">{data && data[2] && data[2].moreDetails.custodian.name || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3"><p className="font14 fontsemiBold opt80 text2828 textCenter ">Registrar & transfer Agent</p></th>
                                        </tr>
                                        <tr>
                                            <td><p className="font12 text444 textLeft wb">
                                                  Name:  {data && data[0] && data[0].moreDetails.registrar.name || '-'}<br/>
                                                  Tel:  {data && data[0] && data[0].moreDetails.registrar.tel || '-'}<br/>
                                                  E-mail:  {data && data[0] && data[0].moreDetails.registrar.email || '-'}<br/>
                                                  Fax:  {data && data[0] && data[0].moreDetails.registrar.fax || '-'}<br/>
                                                  Address:  {data && data[0] && data[0].moreDetails.registrar.address || '-'}<br/>
                                                  website:  {data && data[0] && data[0].moreDetails.registrar.website || '-'}<br/>
                                                    
                                                </p></td>
                                            <td>
                                                <p className="font12 text444 textLeft wb">
                                                  Name:  {data && data[1] && data[1].moreDetails.registrar.name || '-'}<br/>
                                                  Tel:  {data && data[1] && data[1].moreDetails.registrar.tel || '-'}<br/>
                                                  E-mail:  {data && data[1] && data[1].moreDetails.registrar.email || '-'}<br/>
                                                  Fax:  {data && data[1] && data[1].moreDetails.registrar.fax || '-'}<br/>
                                                  Address:  {data && data[1] && data[1].moreDetails.registrar.address || '-'}<br/>
                                                  website:  {data && data[1] && data[1].moreDetails.registrar.website || '-'}
                                                    
                                                </p>    
                                            </td>
                                            <td>
                                            <p className="font12 text444 textLeft wb">
                                                  Name:  {data && data[2] && data[2].moreDetails.registrar.name || '-'}<br/>
                                                  Tel:  {data && data[2] && data[2].moreDetails.registrar.tel || '-'}<br/>
                                                  E-mail:  {data && data[2] && data[2].moreDetails.registrar.email || '-'}<br/>
                                                  Fax:  {data && data[2] && data[2].moreDetails.registrar.fax || '-'}<br/>
                                                  Address:  {data && data[2] && data[2].moreDetails.registrar.address || '-'}<br/>
                                                  website:  {data && data[2] && data[2].moreDetails.registrar.website || '-'}
                                                    
                                                </p>      
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            :
                            <div className={styles.webtbl}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Launch Date</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].moreDetails.launchData || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].moreDetails.launchData || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].moreDetails.launchData || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Fund Managers</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].moreDetails.amcFundManager.length > 0 && data[0].moreDetails.amcFundManager[0].title+' '+ data[0].moreDetails.amcFundManager[0].name || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].moreDetails.amcFundManager.length > 0 &&  data[1].moreDetails.amcFundManager[0].title+' '+ data[1].moreDetails.amcFundManager[0].name || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].moreDetails.amcFundManager.length > 0 && data[2].moreDetails.amcFundManager[0].title+' '+ data[2].moreDetails.amcFundManager[0].name || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Custodian</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[0] && data[0].moreDetails.custodian.name || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[1] && data[1].moreDetails.custodian.name || '-'}</p></td>
                                            <td><p className="font14 text666 fontsemiBold textCenter">{data && data[2] && data[2].moreDetails.custodian.name || '-'}</p></td>
                                        </tr>
                                        <tr>
                                            <td><p className="font14 fontBold text313541 textLeft">Registrar & transfer Agent</p></td>
                                            <td>
                                                <p className="font14 lineHeight22 text666 textLeft wb">
                                                  Name:  {data && data[0] && data[0].moreDetails.registrar.name || '-'}<br/>
                                                  Tel:  {data && data[0] && data[0].moreDetails.registrar.tel || '-'}<br/>
                                                  E-mail:  {data && data[0] && data[0].moreDetails.registrar.email || '-'}<br/>
                                                  Fax:  {data && data[0] && data[0].moreDetails.registrar.fax || '-'}<br/>
                                                  Address:  {data && data[0] && data[0].moreDetails.registrar.address || '-'}<br/>
                                                  website:  {data && data[0] && data[0].moreDetails.registrar.website || '-'}
                                                    
                                                </p>    
                                            </td>
                                            <td>
                                            <p className="font14 lineHeight22 text666 textLeft wb">
                                                  Name:  {data && data[1] && data[1].moreDetails.registrar.name || '-'}<br/>
                                                  Tel:  {data && data[1] && data[1].moreDetails.registrar.tel || '-'}<br/>
                                                  E-mail:  {data && data[1] && data[1].moreDetails.registrar.email || '-'}<br/>
                                                  Fax:  {data && data[1] && data[1].moreDetails.registrar.fax || '-'}<br/>
                                                  Address:  {data && data[1] && data[1].moreDetails.registrar.address || '-'}<br/>
                                                  website:  {data && data[1] && data[1].moreDetails.registrar.website || '-'}
                                                    
                                                </p>
                                            </td>
                                            <td>
                                            <p className="font14 lineHeight22 text666 textLeft wb">
                                                  Name:  {data && data[2] && data[2].moreDetails.registrar.name || '-'}<br/>
                                                  Tel:  {data && data[2] && data[2].moreDetails.registrar.tel || '-'}<br/>
                                                  E-mail:  {data && data[2] && data[2].moreDetails.registrar.email || '-'}<br/>
                                                  Fax:  {data && data[2] && data[2].moreDetails.registrar.fax || '-'}<br/>
                                                  Address:  {data && data[2] && data[2].moreDetails.registrar.address || '-'}<br/>
                                                  website:  {data && data[2] && data[2].moreDetails.registrar.website || '-'}
                                                    
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            }
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
    </section>
  )
}
