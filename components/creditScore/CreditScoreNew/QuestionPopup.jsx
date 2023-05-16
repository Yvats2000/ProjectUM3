import React from 'react'
import styles from './CreditScoreNew.module.css';
export const QuestionPopup = () => {
  return (
    <div className={styles.ErrorScreen}>
        <div className={styles.ebox}>
            <div className={styles.errorBox}>
                <div className={`${styles.headingflex} mb50`}>
                    <p className="font20  text2828 bottomborderf5a623 Innerheading fontsemiBold  ">Error</p>
                    <img src="/assets/images/fi-rr-cross-circle.svg" alt=""/>
                </div>
                <div  className={styles.errorboxtext}>
                    <img  className="mb10" src="/assets/images/ic-result-not-found.svg" alt=""/>
                    <p className="font20 fontsemiBold text2828 mb15">Ooohh!!!</p>
                    <p className="font14 text444 opt80 lineHeight26">We are not able to fetch your credit score at the moment.</p>
                    <button className={`btn btn-primary ${styles.createquestionrebtn} fontsemiBold noWrap font16 btn25 textCenterSm mt35`}>Create questionnaire <em className="icon-arrow-right font14"></em></button> 
                </div>
            </div>
            <div className="createquestionre ">
                <div className="headingflex mb25">
                    <p className="font24  text2828 bottomborderf5a623 Innerheading fontsemiBold  fontSm20 ">Create questionnaire</p>
                    <img src="/assets/images/fi-rr-cross-circle.svg" alt=""/>
                </div>
                <div className="questions">
                    <div className="indQuestion">
                        <p className=" font14 lineHeight24 fontsemiBold text313541">1. Lorem ipsum doller sit loorem ipsum dollersi Lorem ipsum doller sit loorem ipsum</p>
                        <div className="radioWrap">
                            <label className="radioInput text313541"><input className="form-check-input" type="radio" name="homeLoan" checked=""/><span className="radioCheck"></span><span className="radioText text313541 font14">Yes</span></label>
                            <label className="radioInput text313541"><input className="form-check-input" type="radio" name="homeLoan" checked=""/><span className="radioCheck"></span><span className="radioText text313541 font14">No</span></label>
                        </div>
                    </div>
                    <div className="indQuestion">
                        <p className=" font14 lineHeight24 fontsemiBold text313541">2. Lorem ipsum doller sit loorem ipsum dollersi Lorem</p>
                        <div className="chckBoxWrap">
                        <label className="checkInput text313541 mb10"><input className="form-check-input"  type="checkbox" required="" id="acc" name=""  checked=""/><p className=" 1 font14 mobfont14 lineHeight18 checkBoxText">Lorem ipsum doller</p></label>
                        <label className="checkInput text313541 mb10"><input className="form-check-input"  type="checkbox" required="" id="acc" name=""  checked=""/><p className="text313541 font14 mobfont14 lineHeight18 checkBoxText">Lorem ipsum doller</p></label>
                        </div>
                    </div>
                    <div className="indQuestion">
                        <p className=" font14 lineHeight24 fontsemiBold text313541">3. Lorem ipsum doller sit loorem ipsum dollersi Lorem ipsum doller sit loorem ipsum</p>
                        <div className="radioWrap">
                            <label className="radioInput text313541"><input className="form-check-input" type="radio" name="homeLoan" checked=""/><span className="radioCheck"></span><span className="radioText text313541 font14">Yes</span></label>
                            <label className="radioInput text313541"><input className="form-check-input" type="radio" name="homeLoan" checked=""/><span className="radioCheck"></span><span className="radioText text313541 font14">No</span></label>
                        </div>
                    </div>
                    <div className="indQuestion">
                        <p className=" font14 lineHeight24 fontsemiBold text313541">4. Lorem ipsum doller sit loorem ipsum dollersi Lorem ipsum doller sit loorem ipsum</p>
                        <div className="radioWrap">
                            <label className="radioInput text313541"><input className="form-check-input" type="radio" name="homeLoan" checked=""/><span className="radioCheck"></span><span className="radioText text313541 font14">Yes</span></label>
                            <label className="radioInput text313541"><input className="form-check-input" type="radio" name="homeLoan" checked=""/><span className="radioCheck"></span><span className="radioText text313541 font14">No</span></label>
                        </div>
                    </div>
                    <div className="indQuestion">
                        <p className=" font14 lineHeight24 fontsemiBold text313541">5. Lorem ipsum doller sit loorem ipsum dollersi Lorem ipsum doller sit loorem ipsum</p>
                        <div className="radioWrap">
                            <label className="radioInput text313541"><input className="form-check-input" type="radio" name="homeLoan" checked=""/><span className="radioCheck"></span><span className="radioText text313541 font14">Yes</span></label>
                            <label className="radioInput text313541"><input className="form-check-input" type="radio" name="homeLoan" checked=""/><span className="radioCheck"></span><span className="radioText text313541 font14">No</span></label>
                        </div>
                    </div>
                    <button className="btn btn-primary credit_score_cs font16 btn25 textCenterSm mt35">Submit <em className="icon-arrow-right font14"></em></button>
                </div>
            </div> 
        </div>
    </div>
  )
}
