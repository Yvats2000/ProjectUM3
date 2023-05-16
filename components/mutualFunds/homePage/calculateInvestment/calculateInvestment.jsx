import styles from './calculateInvestment.module.css'
import {SIPcalculator} from './../../../calculator/SipCalculator/SIPcalculator';
export const CalculateInvestment = ({calculations,calculatorRef}) => {
  return (
        <section className={styles.section} id="Calculator" ref={calculatorRef}>
            <div className="container">
                <h2 className={`font24 w100 mb40 text2828 grid4Span Innerheading fontMedium lineHeight36 `}> Calculate Your Mutual Fund Returns</h2>
            </div>
            <div className='container'>
                <SIPcalculator calculations={calculations} calculatorType={'sip-calculator'}/>
            </div>
        </section>
  )
}
