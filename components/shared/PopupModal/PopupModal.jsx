import React from 'react'; 
import styles from './PopupModal.module.css';
import{Button} from "../../ui/button/Button";
export const PopupModal = ({text='', btnText='',setCloseHandle}) => {
  return (
    <div className={`${styles.popUpBox} ${styles.active}`}>
        <div className={`${styles.popUpWindow}  `}>
            <div className={styles.headingBox}>
                <span className={`${styles.close} cursorPointer `} onClick={(e) => setCloseHandle(false)}></span>
            </div>
            <div className={styles.thanksMessage}>
                <p className=" text444 mb30   textCenter" >{text}</p>
                <Button className={`btn btn-primary-outline textCenterSm  borderrounded btn100 textCenter ${styles.modelBtn}`} onClick={(e) => setCloseHandle(false)}>{btnText} <em className="icon-arrow-right font14"></em></Button>
            </div>
        </div>
    </div>
  )
}
