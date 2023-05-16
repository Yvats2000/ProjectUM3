import React from "react";
import style from './CompareFund.module.css'
import Image from "next/image";

const CompareFund = ({DetailData, schemeSlug}) =>{
    const schemeDetail = DetailData && DetailData.schemeDetail
    let comparison = DetailData && DetailData.peerComparison
    return(
        <>
        <section className={`compare ${style.section}`}>
       <div className="container">
        <h2 className="font24 w100 mb40 text2828 grid4Span Innerheading fontMedium lineHeight36 ">Compare with similar Funds</h2>
           <div className={style.comareBox}>
            {comparison && comparison.map((item,index)=>(
                <div className={style.compareTile} key={index}>
                        <div className={`${style.compareBank} mb25`}>
                            <div className={style.compareName}>
                                <figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/logo/${schemeDetail.amcLogo}`} alt="" width = {110} height = {40}/></figure>
                                <p className="font14 fontsemiBold lineHeight26 text444">{schemeDetail.scheme_name}</p>
                            </div>
                            <div className={style.compareVs}>vs</div>
                            <div className={style.compareName}>
                            <figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/logo/${item.amcLogo}`} alt="" width = {110} height = {40}/></figure>
                                <p className="font14 fontsemiBold lineHeight26 text444">{item.scheme_name}</p>
                            </div>
                        </div>
                    <button className={`btn ${style.btnCompare} w100 textCenter`}>Compare</button>
                </div>
            ))}
           </div>
       </div>
   </section>
        </>
    )
}

export default CompareFund