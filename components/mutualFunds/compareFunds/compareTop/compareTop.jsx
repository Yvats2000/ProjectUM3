import styles from "./compareTop.module.css";
import { Tabs } from "../../../shared";
import { CompareTitle } from "./";
import { CompareTile } from "../compareTile";
export const CompareTop = ({data,activeSpecific,showTab,activeTab,setActiveTab,handleChange}) => {
  const tabsList = [
    {
      "name":"Quick Comparison"
    },
    {
      "name":"Return"
    },
    {
      "name":"Holding Analysis"
    },
    {
      "name":"Ratios"
    },
    {
      "name":"More Details"
    }
  ]
  return (
    <section className={styles.comparisonTile}>
            <div className="container">
                <div className={styles.mainTile}>
                    <CompareTitle data={data}/>
                    <CompareTile data={data} handleChange={handleChange}/>
                </div>
            </div>
            <Tabs data={tabsList} activeSpecific={activeSpecific} showTab={showTab} activeTab={activeTab} setActiveTab={setActiveTab}/>
    </section>
  )
}
