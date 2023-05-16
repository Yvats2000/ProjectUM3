import React, {useState} from "react";
import style from './fundPortfolio.module.css'
import DonatChart from '../../../shared/DonatChart/DonatChart'


const FundPortfolio = ({allocation,providerRef}) => {
    const [holading, setHoaldings] = useState(true)
    const [sector, setSector] = useState(false)
    const [show, setShow] = useState(false)
    const [colorCode , setColorCode] = useState([
        "#D8EFE0", "#FCE1E1","#DAE8FA","#85EBAA","#ACCCF5","#5ED4D9", "#00C0C8","#ACCCF5"
    ])
    const [schemecode, setSchemeCode] = useState(["#D8EFE0", "#FCE1E1","#DAE8FA","#85EBAA","#ACCCF5","#5ED4D9", "#00C0C8","#ACCCF5"])
    const handleHoaldings = () => {
        setHoaldings(true)
        setSector(false)
    }
    const handleSector = () => {
        setSector(true)
        setHoaldings(false)
    }
    return(
        <section className={style.section} id="Fund-Portfolio" ref={providerRef}>
          
            <div className="container">
                <h2 className="font24 w100 mb40 text2828 grid4Span Innerheading fontMedium lineHeight36 ">Fund Portfolio Allocation</h2>
                    <ul className={style.Holdingtabs}>
                        <li className={`cursorPointer ${holading ? style.active : ''}`} onClick={handleHoaldings}>Holdings</li>
                        <li className={`cursorPointer ${sector ? style.active : ''}`} onClick={handleSector}>Sectors</li>
                    </ul> 
                        <>
                <div className={style.HoldingtabsContent}>
                    <div className={style.progressBox} >
                        <div className={style.SchemeHeading}>
                            <p>Name 
                            </p>
                            <p>Assets 
                                </p>
                        </div>
                        <div className={`${style.scrollwrap} ${style.active} ${style.scrollwrap}`}>
                        {allocation && allocation.holdings.map((item,index) => (
                            <>
                        <ul className={`${ holading ? style.holdingProgress : "displayNone"} mb25`} key={index}>
                            <li>
                                <div className={style.holdingBank}>
                                    {item.name}
                                    <span >{item.percentage}%</span>
                                </div>
                                <div className={style.progressBar}>
                                    <span style={{width: `${item.percentage}%`,background: `${index<=6 ? colorCode[index] : "#ACCCF5"}` }} className={`${style.progressFill} ${style.progressblue}`}></span>
                                </div>
                            </li>
                        </ul>  
                        </>
                        ))} 
                        {allocation && allocation.sectors.map((item,index) => (
                            <ul className={`${sector ? style.holdingProgress : "displayNone"} mb25 `} key={index}>
                                <li>
                                    <div className={style.holdingBank}>
                                        {item.name}
                                        <span>{item.percentage}%</span>
                                    </div>
                                    <div className={style.progressBar}>
                                        <span style={{width: `${item.percentage}%`,background: `${index<=6 ? colorCode[index] : "#ACCCF5"}`}} className={`${style.progressFill} ${style.progressblue}`}></span>
                                    </div>
                                </li>
                            </ul>
                            ))} 
                        </div>
                        <div className={style.showAll}>
                            {/* <button className="btn btnLink font16" onClick={() =>setShow(!show)}>Show All</button> */}
                        </div>
                    </div>
                    <div className={style.holdingCart}>
                        <h3 className="font14 textCenter alignCenter w100 mb40 text181d grid4Span Innerheading InnerheadingCenter fontsemiBold lineHeight36 ">{holading ? 'Holdings' : 'Sectors'} Analysis</h3>
                        <DonatChart allocation={allocation} holading={holading} sector={sector} colorCode={colorCode}/>
                    </div>
                </div>
                </>
                
            </div>
       </section>
    )
}
export default FundPortfolio