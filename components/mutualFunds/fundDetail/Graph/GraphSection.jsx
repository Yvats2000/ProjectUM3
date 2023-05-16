import React, {useState} from "react";
import style from './GraphSection.module.css'
import LineGraph from "../lineGraph";
import moment from "moment";
import { Button } from "../../../ui/button";

const GraphSection = ({NavHistory,schemeGraph, setMonthGraph,monthGraph,schemeName}) =>{
    const records = 5;
    const [showNumberOfAmc, setShowNumberOfAmc] = useState(records);
  const viewMore = () => {
    setShowNumberOfAmc(showNumberOfAmc+records)
  }
    return(
        <>
         <section className="graphSection" ref={NavHistory} id='Nav-History'>
      <div className="container">
              <div className={style.graphflex}>
                <div className="mutualfundgraph mb40">
                <div className={style.headingTabs}>
                  <h2 className="font16 text181d fontsemiBold">{schemeName} Latest Trend</h2>
                    <ul className={`${style.timeselectionTabs} cursorPointer`}>
                        <li className={monthGraph == 1 ? style.active : null} onClick={(e) => setMonthGraph('1')}>1M</li>
                        <li className={monthGraph == 2 ? style.active : null} onClick={(e) => setMonthGraph('2')}>2M</li>
                        <li className={monthGraph == 3 ? style.active : null} onClick={(e) => setMonthGraph('3')}>3M</li>
                    </ul>
                </div>
                <LineGraph schemeGraph={schemeGraph}/>
                </div>
     
              </div>
              <div className={style.navHistory}>
              <h2 className="font16 fontBold mb10 text181d">{schemeName} NAV Summary</h2>
       
        <div className={style.tableResponsive}>
            <table className={`${style.table} ${style.tableBordered} ${style.tableStriped} ${style.lowest}`}>
              <thead>
               <tr>
                    <th className="textLeft fontBold" colSpan="5">Period  </th>
                    <th className="Poor fontBold textLeft">Lowest Value</th>
                    <th className="Excellent fontBold textLeft">Highest Value</th>
                    <th className="fontBold textLeft">Difference</th>
                </tr>
                </thead>
                <tbody>
                {schemeGraph && schemeGraph.chartHistory.map((item,index) =>(
                <tr key={index}>
                    <td colSpan="5">
                        <p className="font14 text181d fontBold mb5">{item.text}</p>
                        <p className="font12 text666 ">{moment(item.dateL).format('DD-MM-YYYY')} - {moment(item.dateH).format('DD-MM-YYYY')}</p>
                    </td>
                    <td className="text666">₹ {item.valueL}</td>
                    <td className="text666">₹ {item.valueH}</td>
                    <td className={`text666 ${(item.valueL-item.valueH).toFixed(2) > 0 ? "Excellent" : "Poor"}`}>
                      {(item.valueL-item.valueH).toFixed(2)}%
                    <span className={`marg5L ${(item.valueL-item.valueH).toFixed(2) > 0 ? `${style.up}` : ''}`}>
                     <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" 
                          fill={(item.valueL - item.valueH).toFixed(2) > 0 ? '#159839' : '#DD412E'} fillRule="nonzero" opacity=".8"></path>
                    </svg>
                      </span>
                      </td>  
                </tr>
                ))}
            </tbody>
            </table>
    </div>
    <h2 className="font16 fontBold mb10 text181d">{schemeName} NAV History</h2>
    <div className={`${style.tableResponsive}`}>
            <table className={`${style.table} ${style.tableBordered} ${style.tableStriped} ${style.navTable}`}>
              <thead>
                  <tr>
                    <th className="textLeft">Date</th>
                    <th className="text181d fontBold textLeft">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {schemeGraph && schemeGraph.fullNavHistory.map((item,index) =>(
                  <tr key={index} className={`${index < showNumberOfAmc ? style.active : null}`}>
                      <td className="fontBold">{moment(item.navDate).format('DD MMM YYYY')}</td>
                      <td className="text666">₹ {item.navValue}</td>
                  </tr>
                  ))}
              </tbody>
          </table>
        </div>
        {
        showNumberOfAmc < schemeGraph.fullNavHistory.length ?<div className={style.btncenter}>
        <Button className="btn btn-primary font14  textCenterSm btnFull" onClick={()=>viewMore()}>Show More<em className="icon-arrow-right font14"></em></Button>
    </div>:null
      }
</div>
      </div>
      </section>
        </>
    )
}
export default GraphSection