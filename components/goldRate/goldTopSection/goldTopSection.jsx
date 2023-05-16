import React from 'react'
import styles from './../gold&silver.module.css';
import {CitySelect} from './../citySelect';
import commonFunctions from '../../../utils/CommonFunctions';
export const GoldTopSection = ({data,showTabs=false,cityList,shoDate=false,goldCity,pageType, mergeCity=false, topTen={}, cityListOther={}}) => {
    const getCityRate = (city)=>{
       return cityList.filter((item)=>item.cityName == city)[0];
    }
    const showArrow = (value)=>{
        if(value == 0 ){
            return('-')
        }else if(value >=0){
            return(<span className={styles.up}>
                <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" >
                <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" 
                    fill={ '#159839'} fillRule="nonzero" opacity=".8"></path>
                </svg> 
            </span>)
        }else{
            return (<span>
                <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" >
                <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" 
                fill={'#DD412E'} fillRule="nonzero" opacity=".8"></path>
            </svg>
            </span>)
        }
    }
  return (
    <>
        <div className={styles.currentRatetables}>
            <div className={styles.mainRateTable}>
                {showTabs && <CitySelect cityList={cityList} shoDate={shoDate} mergeCity={true} topTen={topTen} cityListOther={cityListOther}/>}
                <div className={styles.results}>
                    <div className={pageType==='silver'?styles.resultSilver:styles.resultShown}>
                        <p className="font22 textBlack fontBold mb10 ">₹ {pageType=='silver'?parseInt(data[0].rate[0].one_kilogram).toLocaleString('en-IN'):parseInt(data[0].rate[0].twenty_two_k).toLocaleString('en-IN') || '-'}</p>
                        {pageType=='silver'?
                            <p className="font12  textBlack lineHeight16">Today MCX silver price in rupees per 1 kg.<br/>
                            Today silver rate in india is {parseInt(data[0].rate[0].one_kilogram).toLocaleString('en-IN')} rupees per Kg
                            </p>
                        :
                        <p className="font12  textBlack lineHeight16">Today MCX gold price in rupees per 10 grams.
                            <br/>(10
                            grams = 1 tola gold)
                        </p>
                        }
                    </div>
                    {pageType=='silver'?<ul className={styles.currentPrice}>
                        <li className="font14 fontsemiBold text181d">10 Gram Silver rate Today</li>
                        <li className="font14 fontsemiBold text181d">₹ {parseInt(data[0].rate[0].ten_gram).toLocaleString('en-IN') || '-'}(10 gram)</li>
                        <li className="font14 fontsemiBold text181d">1 Kg Silver rate Today</li>
                        <li className="font14 fontsemiBold text181d">₹ {parseInt(data[0].rate[0].one_kilogram).toLocaleString('en-IN') || '-'}(1 Kg)</li>
                    </ul>:
                    <ul className={styles.currentPrice}>
                        <li className="font14 fontsemiBold text181d"> 22 Carat Gold</li>
                        <li className="font14 fontsemiBold text181d">₹ {parseInt(data[0].rate[0].twenty_two_k).toLocaleString('en-IN') || '-'}(10 gram)</li>
                        <li className="font14 fontsemiBold text181d">24 Carat Gold</li>
                        <li className="font14 fontsemiBold text181d">₹ {parseInt(data[0].rate[0].twenty_four_k).toLocaleString('en-IN') || '-'}(10 gram)</li>
                    </ul>}
                </div>
            </div>
            <div className={styles.ratesincities}>
            {pageType=='silver'?<h2 className={`font12 fontsemiBold text181d fontSm14 ${styles.citiesHeading}`}>Silver Rate Today in India (in Rs/1 gm)</h2>
                    :
                    <h2 className={`font12 fontsemiBold text181d fontSm14 ${styles.citiesHeading}`}>22 Carat & 24 Carat Compare Gold
                    Rate In {goldCity?commonFunctions.capitalize(goldCity):`India`} (Today & Yesterday)</h2>
                }
                <div className={styles.tblResponsive}>
                {pageType==='silver'?
                    <table className={`${styles.tableGrey} ${styles.tableh200}`}>
                    <thead>
                        <tr>
                            <td className="font12 font600 text181d">Silver Rate</td>
                            <td className="font12 font600 text181d">Silver Rate in Bangalore</td>
                            <td className="font12 font600 text181d">Silver Rate in Chennai</td>
                            <td className="font12 font600 text181d">Silver Rate in Delhi</td>
                            <td className="font12 font600 text181d">Silver Rate in Hyderabad</td>
                            <td className="font12 font600 text181d">Silver Rate in Mumbai</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font12 font600 text181d">1 Gm</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Bangalore").ten_gram/10*1).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Chennai").ten_gram/10*1).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Delhi").ten_gram/10*1).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Hyderabad").ten_gram/10*1).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Mumbai").ten_gram/10*1).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">10 Gm</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Bangalore").ten_gram/10*10).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Chennai").ten_gram/10*10).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Delhi").ten_gram/10*10).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Hyderabad").ten_gram/10*10).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Mumbai").ten_gram/10*10).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">100 Gm</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Bangalore").ten_gram/10*100).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Chennai").ten_gram/10*100).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Delhi").ten_gram/10*100).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Hyderabad").ten_gram/10*100).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Mumbai").ten_gram/10*100).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">1 Kg</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Bangalore").one_kilogram).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Chennai").one_kilogram).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Delhi").one_kilogram).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Hyderabad").one_kilogram).toLocaleString('en-IN')}</td>
                            <td className="font12 text666">₹ {parseInt(getCityRate("Mumbai").one_kilogram).toLocaleString('en-IN')}</td>
                        </tr>
                    </tbody>
                </table>
                    :
                    <table className={`${styles.tableGrey} ${styles.tableh200}`}>
                        <thead>
                            <tr>
                                <td></td>
                                <td className="font12 font600 text181d">Gold Rate 22 Carat</td>
                                <td className="font12 font600 text181d"> Gold Rate 24 Carat</td>
                                {/* <td className="font12 font600 text181d">Change(%)</td> */}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font12 font600 text181d">Yesterday</td>
                                <td className="font12 text666">₹ {parseInt(data[1].rate[0].twenty_two_k).toLocaleString('en-IN') || '-'}</td>
                                <td className="font12 text666">₹ {parseInt(data[1].rate[0].twenty_four_k).toLocaleString('en-IN') || '-'}</td>
                                {/* <td className="font12 text666">{parseInt(data[0].rate[0].twenty_four_k - data[1].rate[0].twenty_four_k).toLocaleString('en-IN')}</td> */}
                            </tr>
                            <tr>
                                <td className="font12 font600 text181d">Today</td>
                                <td className="font12 text666">₹ {parseInt(data[0].rate[0].twenty_two_k).toLocaleString('en-IN') || '-'} &nbsp;{showArrow(parseInt(data[0].rate[0].twenty_two_k - data[1].rate[0].twenty_two_k))}</td>
                                <td className="font12 text666">₹ {parseInt(data[0].rate[0].twenty_four_k).toLocaleString('en-IN') || '-'} &nbsp;{showArrow(parseInt(data[0].rate[0].twenty_four_k - data[1].rate[0].twenty_four_k))}</td>
                                {/* <td className="font12 text666">{parseInt(data[0].rate[0].twenty_four_k - data[1].rate[0].twenty_four_k).toLocaleString('en-IN')}</td> */}
                            </tr>
                        </tbody>
                    </table>}
                </div>
            </div>
        </div>
    </>
  )
}
