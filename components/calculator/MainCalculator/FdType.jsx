import styles from "./MainCalculator.module.css";
import { useRouter } from "next/router";

export const FdType = ({calculator, heading = true}) => {
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(`${process.env.BASE_URL}/fixed-deposit-rate/scheme/` + path)
  };
  if (calculator && calculator.length == 0)
    return false;
  return (
      <>
        <section className={styles.calculatorstabs}>
                <div className={`${styles.pt0} ${styles.allcalculator} `}>
                          {calculator.map((calculatorType, index) => (
                            <div className={`${styles.loan} ${calculatorType.child && calculatorType.child.length > 3 ? styles.span2:null} `} key={index}>
                            <div className={styles.tileHead}>
                              {heading && <h2 className={styles.mainHeading}>{calculatorType.title}</h2> }
                              {calculatorType.lable ? <i className={styles.topB}>{calculatorType.lable }</i>:null}
                            </div>
                              <div className={`${calculatorType.child && calculatorType.child.length > 3 ? styles.calccontainerFull : styles.calccontainer}`}>  
                                {calculatorType.child && calculatorType.child.length > 0 && calculatorType.child.map((calculator, subIndex) => (
                                  <div className={`${heading?'':styles.shadow} ${styles.calc}`} key={subIndex} onClick={(e) => handleClick(e, calculator.path)}>
                                    <p className={styles.heading}>{calculator.title}</p>
                                    <p className={`${styles.content}`}><span className={styles.line2}>{calculator.text}</span>   <span className="textLink">Know more...</span></p>
                                    </div>
                                    )) }
                                </div>
                            </div>
                          ))}
                </div>
        </section>
      </>
  )
}
