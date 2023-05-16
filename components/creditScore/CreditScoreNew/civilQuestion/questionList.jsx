import React from 'react'
import styles from './questionList.module.css';
import Image from 'next/image';
export const QuestionList = ({questionList,handleQuestion,submitQuestion, unCheck,notFound,setShowQuection}) => {
  return (
    <div className={styles.ErrorScreen}>
        <div className={styles.ebox}>
          {!notFound?
          <div  className={styles.createquestionre}>
            <div className={`${styles.headingflex} mb25`}>
                <p className="font24  text2828 bottomborderf5a623 Innerheading fontsemiBold  fontSm20 ">Security Questions</p>
                <Image width={24} height={24} src="/assets/images/fi-rr-cross-circle.svg" alt="" className='cursorPointer' onClick={()=>setShowQuection(false)}/>
            </div>
            <div className={styles.questions}>
                
                  {questionList && questionList.length > 0 && questionList.map((item,index)=>(
                    <div className={styles.indQuestion} key={index}>
                      <p className=" font14 lineHeight24 fontsemiBold text313541">{index+1 +'.' +item.FullQuestionText}</p>
                        
                          <div className={styles.radioWrap} >
                          {item.AnswerChoice.map((childItem,indx)=>(
                            <label className="radioInput text313541" key={indx}>
                              <input className="form-check-input" type="radio" name={item.Key} value={childItem.AnswerChoiceId} onChange={(e) => handleQuestion(e)}/>
                              <span className="radioCheck"></span>
                              <span className="radioText text313541 font14">{childItem.AnswerChoiceText}</span>
                            </label>
                            ))
                          
                          }
                        </div>
                        {unCheck && unCheck.length > 0 && unCheck[index].radioCheck && <span className='errorText'>Please Select</span>}
                    </div>
                  ))}
                <div className={styles.submitBtn}>
                    <button className="btn btn-primary font16 btn25 textCenterSm mt35" onClick={()=>submitQuestion()}>Submit <em className="icon-arrow-right font14"></em></button>
                    {process.env.CREDIT_SCORE_VENDOR === '3'?<figure className="dlfex justifyEnd mb30"><Image className="imgResponsive" width={65} height={44} src="/assets/images/cibil-logo.png" alt=""/></figure>:null}
                </div>
                
            </div>
          </div>:
          <div className={styles.createquestionre}>
            <div className={`${styles.headingflex} mb25`}>
                  {/* <p className="font24  text2828 bottomborderf5a623 Innerheading fontsemiBold  fontSm20 ">Error</p> */}
                  <Image width={24} height={24} src="/assets/images/fi-rr-cross-circle.svg" alt="" onClick={()=>setShowQuection(false)}/>
              </div>
              <div className={styles.errorboxtext}>
                <div className='mb30'>
                <Image width={79} height={81} src="/assets/images/ic-result-not-found.svg" alt=""/>
                </div>
                <p className="font14 text444 opt80 lineHeight26">We are not able to fetch your credit score at the moment.</p>
              </div>
          </div>
          } 
        </div>
    </div>
  )
}
