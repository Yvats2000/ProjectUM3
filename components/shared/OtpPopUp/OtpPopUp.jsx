import styles from "./OtpPopUp.module.css";
import React from 'react';
import { Button } from "../../ui/button/Button";
export const OtpPopUp = ({ mobileNo, showError,optHandle, OtpValid,otpmsg,sendOtpAgain, OtpSubmit, isOpen, setPopUpOpen,onlyMobile=false,resendEligible=true }) => {
  const inputfocus = (name,event) => {
    if (event.key === "Delete" || event.key === "Backspace") {
      const next = event.target.tabIndex - 2;
      if (next > -1) {
        event.target.form.elements[next].focus()
      }
    }
    else if (event.target.value) {
          const next = event.target.tabIndex;
        if (next < 6) {
            event.target.form.elements[next].focus()
          }
      }
  }
  return (
    <div className={`${styles.popUpBox} ${isOpen ? styles.active : ''}`}>
      <div className={`${styles.popUpWindow} ${styles.popUpThanks}`}>
        <div className={styles.headingBox}>
          <p className={`font20 mb30 textBlack bottomborderf5a623 ${styles.popupHeading} fontBold lineHeight36`}>OTP Send</p>
          <span className={`${styles.close} cursorPointer`} onClick={(e) => setPopUpOpen(false)}></span>
        </div>
        <div className={styles.thanksMessage}>
          <p className="font20 textBlack fontBold mb15">Enter 6 Digit OTP</p>
          <p className="w100 font14 lineHeight22">We have just sent a verificaton code to<br />
            Mobile {mobileNo?mobileNo.slice(0,-5):null}XXXXX</p>
          <div className={styles.otpBox}>
            <form>
            <div className="formGroup mb30">
               <label className="font14 mb10 fontMedium textWhite formLabel">Enter OTP</label>
              <div className={styles.otpBox}>
              <input
                name="otp1"
                type="number"
                autoComplete="off"
                className="formControl"
                value={OtpValid.otp1}
                onChange={e =>optHandle("otp1", e)}
                tabIndex="1" maxLength="1" onKeyUp={e => inputfocus("otp1",e)}

                />
                <input
                  name="otp2"
                  type="number"
                  autoComplete="off"
                  className="formControl"
                  value={OtpValid.otp2}
                    onChange={e => optHandle("otp2", e)}
                  tabIndex="2" maxLength="1" onKeyUp={e => inputfocus("otp2",e)}

                />
                <input
                name="otp3"
                type="number"
                autoComplete="off"
                className="formControl"
                value={OtpValid.otp3}
                onChange={e =>optHandle("otp3", e)}
                tabIndex="3" maxLength="1" onKeyUp={e => inputfocus("otp3",e)}

                />
                <input
                name="otp4"
                type="number"
                autoComplete="off"
                className="formControl"
                value={OtpValid.otp4}
                onChange={e =>optHandle("otp4", e)}
                tabIndex="4" maxLength="1" onKeyUp={e => inputfocus("otp4",e)}

                  />
                  <input
                name="otp5"
                type="number"
                autoComplete="off"
                className="formControl"
                value={OtpValid.otp5}
                onChange={e =>optHandle("otp5", e)}
                tabIndex="5" maxLength="1" onKeyUp={e => inputfocus("otp5",e)}

                  />
                  <input
                name="otp6"
                type="number"
                autoComplete="off"
                className="formControl"
                value={OtpValid.otp6}
                onChange={e =>optHandle("otp6", e)}
                tabIndex="6" maxLength="1" onKeyUp={e => inputfocus("otp6",e)}

              />
                
               </div>
            </div>
            </form>
          </div>
          <p className={`${showError?'textef3b51':'text32356b'} fontBold mb10 font12 mra`}>{ otpmsg}</p>
          {resendEligible&& <p className="mra font12 lineHeight22 textLink cursorPointer" onClick={(e)=>sendOtpAgain(e)}>Send the code again</p>}
          <p className="mra font12 lineHeight22 mb15 textLink cursorPointer" onClick={(e) => setPopUpOpen()}>Change mobile number{!onlyMobile && '/email address'}</p>
          <Button className="btn btn-primary textCenterSm font14 bnt100 textCenter justifycenter" onClick={OtpSubmit}>Submit <em className="icon-arrow-right font14"></em></Button>
        </div>
      </div>
    </div>
  );
};
