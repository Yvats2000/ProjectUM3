import dynamic from "next/dynamic";
import style from './fundOverview.module.css'
import { TooltipWide } from "../../../shared/TooltipWide";
import toolTipData from '../../../../data/fundOverview.json'
import React, {useState,useEffect} from "react";
const DynamicLine = dynamic(() => import('../lineGraph'), {
    ssr: false,
})

const ReactSpeedometer = dynamic(
    () => import('react-d3-speedometer'),
    { ssr: false },
);

const FundOverview = ({DetailData,leadershipRef}) => {
    const [clientData, setClientData] = useState()
    const overviewData = DetailData && DetailData.fundOverView
    const riskData = DetailData && DetailData.riskRatios
    const schemeDetail = DetailData && DetailData.schemeDetail
    useEffect(()=>{
        setClientData(toolTipData)
    },[])
    return(
        <section className={style.section} id="Fund-Overview" ref={leadershipRef}>
            <div className={`container containerFlex ${style.gridGap}`}>
                <div className={style.flexBox}>
                    <div className={style.boxDetails}>
                            <div className={style.fundHeading}>
                                <p className="font16 text181d fontsemiBold">Fund Overview</p>
                            </div>
                            <div className={style.boxChild}>
                                <div className={`${style.FundOverview}  gridSm2`}>
                                    <div className={`${style.OverDetails}  ${style.borderBottom}  ${style.borderRight}`}>
                                        <p className="font14 text444 fontsemiBold">{overviewData.expenseRatio}%</p>
                                        <p className={`font14 text666  ${style.aligncntr}`}><span className="opt80">Expense ratio</span> 
                                        <TooltipWide position={true} content={clientData && clientData.fundOverview[0].question}><span>i</span></TooltipWide></p>
                                    </div>
                                    <div className={`${style.OverDetails}  ${style.borderBottom}  ${style.borderRightSmNone} ${style.borderRight}`}>
                                        <p className="font14 text444 fontsemiBold">{overviewData.exitLoad}%</p>
                                        <p className={`font14 text666  ${style.aligncntr}`}><span className="opt80">Exit Load</span> 
                                        <TooltipWide position={false} content={clientData && clientData.fundOverview[1].question}><span>i</span></TooltipWide> </p>
                                    </div>
                                    
                                    <div className={`${style.OverDetails}  ${style.borderRight} ${style.borderBottom}`}>
                                        <p className="font14 text444 fontsemiBold">No Lock-in</p>
                                        <p className={`font14 text666  ${style.aligncntr}`}><span className="opt80">Lock-in</span> 
                                        <TooltipWide position={true}  content={clientData && clientData.fundOverview[2].question}><span>i</span></TooltipWide> </p>
                                    </div>
                                    <div className={`${style.OverDetails} ${style.borderBottom}  ${style.borderRightSmNone} ${style.borderRight}`}>
                                        <p className="font14 text444 fontsemiBold">₹ {overviewData.fundSize} Cr</p>
                                        <p className={`font14 text666  ${style.aligncntr}`}><span className="opt80">AUM (Fund Size)</span> 
                                            <TooltipWide position={false} content={clientData && clientData.fundOverview[3].question}><span>i</span></TooltipWide> </p>
                                    </div>
                                    <div className={`${style.OverDetails} ${style.borderRightSmdisplay} ${style.borderbottomSmNone} ${style.borderBottom}`}>
                                        <p className="font14 text444 fontsemiBold">{overviewData.index}</p>
                                        <p className={`font14 text666  ${style.aligncntr}`}><span className="opt80">Index</span> 
                                        <TooltipWide position={true} content={clientData && clientData.fundOverview[4].question}><span>i</span></TooltipWide> </p>
                                    </div>
                                    <div className={`${style.OverDetails} ${style.borderRight} ${style.borderRightSmNone} `}>
                                        <p className="font14 text444 fontsemiBold">SIP ₹{overviewData.minInvestment} 
                                        </p>
                                        <p className={`font14 text666  ${style.aligncntr}`}><span className="opt80">Min. Investment</span> 
                                        <TooltipWide position={false} content={clientData && clientData.fundOverview[5].question}><span>i</span></TooltipWide>
                                        </p>
                                    </div>
                                    <div className={`${style.OverDetails} ${style.MeterRatio} ${style.gridSpan2}`}>
                                        <p className="font16 text181d fontsemiBold">Scheme Riskometer <span className={style[schemeDetail.riskClass]}>{schemeDetail.riskText}</span></p>
                                        <ReactSpeedometer
                                            needleColor="black"
                                            width={210}
                                             startColor="#33CC33" 
                                             endColor="#FF0000"
                                            needleHeightRatio={0.7}
                                            value={schemeDetail.riskText == 'Very High' ? 930 : schemeDetail.riskText =='High' ?  770:schemeDetail.riskText =='Moderately High' ? 570 : schemeDetail.riskText == 'Moderate' ?390 : schemeDetail.riskText == 'Moderately Low' ? 220 : schemeDetail.riskText == 'Low' ? 50 : 0}
                                            currentValueText= ""
                                            segments={6}
                                            ringWidth={47}
                                            height={134}
                                            needleTransitionDuration={3333}
                                            needleTransition="easeElastic"
                                            maxSegmentLabels={0}
                                        />
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div className={style.fundDetialsRight}>
                    <div className={style.boxDetails}>
                            <div className={style.fundHeading}>
                                <p className="font16 text181d fontsemiBold">Risk Ratios</p>
                            </div>
                            <ul className={style.riskRatio}>
                                <li><p className="text666 font14"><span className="opt80">P/E Ratio </span> 
                                <TooltipWide position={true} content={clientData && clientData.riskRatio[0].question}><span>i</span></TooltipWide></p> <span className="text444 fontsemiBold">{riskData.pe}</span> </li>
                                <li><p className="text666 font14"><span className="opt80">P/B Ratio</span>
                                <TooltipWide position={true} content={clientData && clientData.riskRatio[1].question}><span>i</span></TooltipWide></p> <span className="text444 fontsemiBold">{riskData.pb}</span> </li>
                                <li><p className="text666 font14"><span className="opt80">Alpha</span> 
                                <TooltipWide position={true} content={clientData && clientData.riskRatio[2].question}><span>i</span></TooltipWide></p> <span className="text444 fontsemiBold">{riskData.alpha}</span> </li>
                                <li><p className="text666 font14"><span className="opt80">Beta</span> 
                                <TooltipWide position={true} content={clientData && clientData.riskRatio[3].question}><span>i</span></TooltipWide></p> <span className="text444 fontsemiBold">{riskData.beta}</span> </li>
                                <li><p className="text666 font14"><span className="opt80">Sharpe</span> 
                                <TooltipWide position={true} content={clientData && clientData.riskRatio[4].question}><span>i</span></TooltipWide></p> <span className="text444 fontsemiBold">{riskData.sharpe}</span> </li>
                                <li><p className="text666 font14"><span className="opt80">Sortino</span>
                                <TooltipWide position={true} content={clientData && clientData.riskRatio[5].question}><span>i</span></TooltipWide></p> <span className="text444 fontsemiBold">{riskData.sortino}</span> </li>
                            </ul>
                    </div>
                </div>
            </div>
       </section>
    )
}

export default FundOverview