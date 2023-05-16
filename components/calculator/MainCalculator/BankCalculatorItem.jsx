import styles from "./MainCalculator.module.css";
import Link from 'next/link'
import Image from "next/image";
export const BankCalculatorItem = ({calculator,bank}) => {
  const bankName =  bank.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  const calculatorImg = ["homeemi.svg","homebalacnce.svg","homepre.svg","perosnalemi.svg","personalbalance.svg","personalemi.svg","businessemi.svg","busiensebalance.svg","lumpsumcalc.svg"]
  return (
      <>
        <section className={styles.calculatorstabs}>
            <div className="container">
                <div className={styles.allcalculator}>
                  <div className={`${styles.loan} ${styles.span2}`}>
                    <div className={styles.tileHead}>
                      <h2 className={styles.mainHeading}>{bankName} Calculator </h2>
                    </div>
                    <div className={ styles.calccontainerFull}>  
                      {calculator && calculator.length > 0 && calculator.map((calculator, subIndex) => (
                        <div className={styles.calc} key={subIndex}>
                            <Link href={`${process.env.BASE_URL}/bank-calculator/`+bank+`/`+calculator.path}>
                              <a>
                              <figure>
                                <Image className={`imgResponsive`} width = {33} height = {33} src={process.env.IMAGE_BASEURL + '/images/calculator/'+`${calculatorImg[subIndex]}`} alt={calculator.title} />
                              </figure>
                              <div className={styles.arrowBtn}>
                                <p className={styles.heading}>{calculator.post_title}</p>
                                    {/* {calculator.btnText } <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14" fill="none">
                                  <path d="m7 1 6 6-6 6M1 7h11.143H1z" stroke="#222" strokeLinecap="round" strokeLinejoin="round"/></svg> */}
                                </div>
                                </a>
                            </Link>
                          </div>
                          )) }
                        </div>
                  </div>
                </div>
            </div>
        </section>
      </>
  )
}
