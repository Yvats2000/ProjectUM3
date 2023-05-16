import styles from "./PopUp.module.css";
import{Button} from "../../ui/button/Button";
import { useRouter } from 'next/router';
export const ThanksBody = ({title,thankyou,setThankYouPopUp,failure,text,ShowHeader=true}) => {
    const router = useRouter();
    const handleClick = (e, path) => {
      e.preventDefault();
      router.push(path)
    };
  return (
    <form className={`${ShowHeader?styles.popUpWindow:styles.thanksSideBar} ${styles.popUpThanks}`}>
      {ShowHeader?
        <div className={styles.headingBox}>
          <h2 className={`font20 mb30 textBlack bottomborderf5a623 ${styles.popupHeading} fontBold lineHeight36`}>{title}</h2>
          <span className={`${styles.close} cursorPointer `} onClick={(e) => setThankYouPopUp()}></span>
        </div>:null}
        <div className={styles.thanksMessage}>
          <figure className={styles.checkTik}>
            <img src={failure ? "/assets/images/ic_result-not-found.svg" : "/assets/images/ic_tick.svg"} className="imgResponsive" alt="Urban Money" />
          </figure>
          <h3 className="font20 textBlack fontBold mb15">{thankyou}</h3>
          <p className="font14 text444 mb30 lineHeight26 textCenter" >
          {text}
          </p>
          {/* <Button className="btn btn-primary textCenterSm font14 bnt100 textCenter" onClick={(e) => handleClick(e, "/")}>Back to Site <em className="icon-arrow-right font14"></em></Button> */}
          {ShowHeader?<Button className="btn btn-primary textCenterSm font14 bnt100 textCenter" onClick={(e) => setThankYouPopUp()}>Back to Site <em className="icon-arrow-right font14"></em></Button>:null}
        </div>
      </form>
  )
}
