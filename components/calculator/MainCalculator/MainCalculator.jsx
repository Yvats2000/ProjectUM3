import styles from "./MainCalculator.module.css";
import { useRouter } from "next/router";
import Image from "next/image";

export const MainCalculator = ({calculator, heading = true}) => {
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  if (calculator && calculator.length == 0)
    return false;
  return (
      <>
        <section className={styles.calculatorstabs}>
            <div className={heading ? "container" : ""}>
                <div className={`${heading?'':styles.pt0} ${styles.allcalculator} `}>
                          {calculator.map((calculatorType, index) => (
                            <div className={`${styles.loan} ${calculatorType.child && calculatorType.child.length > 3 ? styles.span2:null} `} key={index}>
                            <div className={styles.tileHead}>
                              {heading && <h2 className={styles.mainHeading}>{calculatorType.title}</h2> }
                            {calculatorType.lable ? <i className={styles.topB}>{calculatorType.lable }</i>:null}
                            </div>
                              <div className={`${calculatorType.child && calculatorType.child.length > 3 ? styles.calccontainerFull : styles.calccontainer}`}>  
                              {calculatorType.child && calculatorType.child.length > 0 && calculatorType.child.map((calculator, subIndex) => (
                                <div className={`${heading?'':styles.shadow} ${styles.calc}`} key={subIndex} onClick={(e) => handleClick(e, calculator.path)}>
                                  <figure>
                                  <Image className={`imgResponsive`} width = {33} height = {33} src={calculator.imgSrc ? process.env.IMAGE_BASEURL + '/images/calculator/'+`${calculator.imgSrc}` : process.env.IMAGE_BASEURL + '/images/calculator/general-calculator.svg'} alt={calculator.title} />
                                  </figure>
                                  <p className={styles.heading}>{calculator.title}</p>
                                  <p className={styles.text}>{calculator.text}  <span>Know more...</span></p>
                                  <div className={styles.arrowBtn}>
                                   
                                        {calculator.btnText } <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                      <path d="m7 1 6 6-6 6M1 7h11.143H1z" stroke="#222" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </div>
                                  </div>
                                  )) }
                                </div>
                            </div>
                          ))}
                </div>
            </div>
        </section>
      </>
  )
}