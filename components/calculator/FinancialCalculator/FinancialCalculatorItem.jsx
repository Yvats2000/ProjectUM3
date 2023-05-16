import Image from "next/image";
import styles from "./FinancialCalculator.module.css";
import {NavLink} from '../../ui';
export function FinancialCalculatorItem ({ headingText, Calculators, bgWhite }){
  return (
      <div className={` grid4 ${headingText?`${styles.gridFlex} ${styles.homLoanBg}`:styles.calculatorGrid}`}>
          {headingText ? <h1 className="font20 text2828 bottomborderf5a623 fontMedium lineHeight36">{headingText}</h1> : null}
          {Calculators.map((calculator,index) =>(
            <NavLink href={`${process.env.BASE_URL}${calculator.path}`} key={index}>
            <div className={`${styles.trendingCard} ${calculator.gaClass} ${styles.calcCard} ${styles[calculator.class]} ${bgWhite && 'bgWhite'}`}>
              {calculator.label ? <span className={`${styles.tagIcon} textWhite`}>{calculator.label}</span> : null}
              <h3 className={`font16 ${styles.loanHeading} fontMedium`} dangerouslySetInnerHTML={{__html: calculator.title}}></h3>
              <figure className={styles.calculatorIcon}>
                <Image src={calculator.imgSrc} height={calculator.height} width={calculator.width} alt={calculator.title} className="imgResponsive" /></figure>
            </div></NavLink>
          ))}
        </div>
  )
}