import styles from "./FinancialCalculator.module.css";
import {FinancialCalculatorNew} from "./FinancialCalculatorNew"
import {FinancialCalculatorItem} from "./FinancialCalculatorItem"
import HomePageCalculator from "../../../data/homePageCalculator.json"
import { useState } from "react";
export const FinancialCalculator = ({heading, data, bgWhite= false}) => {
  const [readMore, setReadMore] = useState(false);
  return (
    <section className={`${styles.financialCalculator} ${styles.calculatorsmain}`}>
      <div className="container">
        {heading ? 
        <>
          <h2 className={`font24 fontMedium textBlack textCenter ${styles.mainHeading}`}>Financial Calculators</h2>
          {/* <p className={`font14 text2828 ${styles.subHeading} mb30`}>Useful tools that can make your loan journey easier</p> */}
          <p className={`font14 text2828 ${styles.subHeading} mb30`}><span>At Urban Money, we aim to ease the burden of credit procedures</span>  <span className={`${styles.readText} ${readMore?styles.active:null}`}>through the help of financial calculators. You get access to various financial calculators, from EMI calculators to balance transfer calculators to FD calculators. With easy access to these calculators, you can now compute your monthly payments in advance and unlock better management and timely repayments.</span> <span className={`textLink cursorPointer ${styles.readmore}`} onClick={()=>setReadMore(!readMore)}>Read {readMore?'Less':'More..'}</span></p>
          </> : null} 
        {data ? <FinancialCalculatorItem Calculators={data} bgWhite={bgWhite} /> : <FinancialCalculatorNew calculator={HomePageCalculator[0].child} heading={false}/>}
      </div>
    </section>
  );
};
