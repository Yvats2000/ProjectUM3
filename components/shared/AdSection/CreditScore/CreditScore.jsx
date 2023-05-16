import styles from "./CreditScore.module.css";
import { Button } from "../../../ui/button";
import { useRouter } from 'next/router'
export const CreditScore = () => {
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  return (
    <section className={styles.addSection}>
      <div className="container">
        <div className={styles.latestCreditBlue}>
          <div  className={styles.creditHead}>
            <em className={styles.miloMeter}></em>
            <p className="font22 textWhite fontMedium lineHeight24 ">Get your latest Credit Score, <span className="textf7b500">FREE</span></p>
          </div>
          <Button className={`btn btn-blue fontBold ${styles.apply}`} onClick={(e) => handleClick(e, "/credit-score")}>Check Now <em className="icon-arrow-right font14"></em></Button>
        </div>
      </div>
    </section>
  );
};
