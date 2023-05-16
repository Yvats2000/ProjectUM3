import styles from "./PopUp.module.css";
import { ThanksBody } from "./ThanksBody";

export const PopUp = ({title, text, thankyou, setThankYouPopUp, failure}) => {
 

  return (
    <div className={`${styles.popUpBox} ${styles.active}`}>
        <ThanksBody title={title} text={text} thankyou={thankyou} setThankYouPopUp={setThankYouPopUp} failure={failure}/>
    </div>
  );
};
