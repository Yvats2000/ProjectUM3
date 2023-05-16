import React,{useState} from 'react'
import styles from './CreditScoreNew.module.css';
import Image from 'next/image';
import commonFunctions from '../../../utils/CommonFunctions';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { SendOtpThree,OtpCheck } from '../../../services/creditScore';
import Validation from '../../../form/Validation';
import { setItemInCookie } from '../../../helpers/cookie';
import moment from 'moment';
import { OtpPopUpCivil } from '../../shared/OtpPopUp'
import { Loader, PopUp,TermsPopupCivil } from "../../shared";
import { Select as SelectBox, Select,NavLink, Error,CitySelect,StateSelect} from "../../ui";
import InputText from '../../../form/inputText'
import { decrypt_object } from "../../../helpers/Base64Encode";
import {QuestionList} from './civilQuestion';
import Router from 'next/router'
export const CreditScoreNew = ({master}) => {
    const creditField = {
        fullName: '',
        mobile: '',
        email: '',
        panCard:'',
        postalCode:'',
        state: '',
        dob:'',
        stateName:'',
        streetAddress:'',
        addressCode:'',
        gender:'',
        city:'',
        consentStatement: 'You hereby consent to Urban Money being appointed as your authorised representative to receive your Credit Information from Cibil for the purpose of Credit Risk Assessment. You hereby agree to Terms and Conditions',
      }
      const otpInput = {
        otp1:'',
        otp2:'',
        otp3:'',
        otp4:'',
        otp5:'',
        otp6:''
      }
    const [formDetails, setFormDetails] = useState(creditField);
    const [OtpValid, setOtpValid] = useState(otpInput);
    const [selectedValueCity, setSelectedValueCity] = useState(null);
    const [selectedValueState, setSelectedValueState] = useState(null);
    const [formErrors, setFormErrors] = useState({});
    const [loader, setLoader] = useState(false);
    const [otp, setOtp] = useState(false);
    const [isOpen, setPopUpOpen] = useState(false);
    const [token, settoken] = useState('');
    const [showError, setshowError] = useState(false);
    const [message, setmessage] = useState('');
    const [ErrorMessage, setErrorMessage] = useState('');
    const [questionKey, setQuestionKey] = useState('');
    const [answerKey, setAnswerKey] = useState('');
    const [resendEligible, setResendEligible] = useState(false);
    const [otpOption, setotpOption] = useState('');
    const [showQuection, setShowQuection] = useState(false);
    const [questionList, setQuestionList] = useState('');
    const [questionAnswer, setQuestionAnswer] = useState({})
    const [unCheck, setUnCheck] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [termsModel, settermsModel] = useState(false);

    const breadCrumbLinks = [
        {
          "text": "Credit Score",
          "path": "/credit-score",
          "class": ""
        }
      ]
      const isAllowed = (value, type) => {
        switch (type){
          case 'fullName':
            return (value === '' || (Validation.validateChar(value) && value.length < 51)); 
          case 'mobile':
            return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
          case 'postalCode':
            return ((value === '' || Validation.validateNumber(value)) && value.length < 7);
          case 'streetAddress':
            return (value === '' || (Validation.validateAddress(value) && value.length < 100));
          case 'dob':
              return (value === '');
          case 'otp1':
          case 'otp2':
          case 'otp3':
          case 'otp4':
          case 'otp5':
          case 'otp6':
            return ((value === '' || Validation.validateNumber(value)) && value.length < 2);
          default:
            return  true;
        }
      }
      const handleChange = async (e) => {
        const { name, value } = e.target;
        let isValid = isAllowed(value, name);
        if (isValid) {
          setFormDetails({ ...formDetails, [name]: name === 'consentStatement' ? formDetails.consentStatement? '' : value : value });
          setFormErrors({ ...formErrors, [name]: '' });
        }
      };
      let result = questionList && questionList.length>0 && questionList.map(item =>{
          return {...item, radioCheck:false}
      })
      const handleQuestion = async (e) => {
        const { name, value } = e.target;
        let data = {...questionAnswer};
        data[name] = value;
        setQuestionAnswer({...data})
      };
      const handleDobChnage = async(date) => {
        setFormDetails({...formDetails, dob:date})
        setFormErrors({...formErrors, dob:''})
      };
      const cityAutoHandle = value=>{
        setFormDetails({...formDetails,city:value.label,cityId:value.value});
        setSelectedValueCity(value)
        setFormErrors({ ...formErrors, city: '' });
      }
      const stateAutoHandle = value=>{
        setFormDetails({...formDetails,state:value.value});
        setSelectedValueState(value)
        setFormErrors({ ...formErrors, state: '' });
      }
      const optHandle = (name, event) => {
        let isValid = isAllowed(event.target.value, name);
        if (isValid) {
          setOtpValid({ ...OtpValid, [name]: event.target.value });
        }
      }
      const optClear = () => {
        setPopUpOpen(false)
        setOtpValid(otpInput);
      }
      const validateLeadForm = (data) => {
        let validateFields;
        validateFields = Validation.validateListingLeadForm(data);
        return validateFields;
      }
      const formSubmit = async (e) => {
        e.preventDefault(); 
        setFormErrors('');
        let formErrorObject = validateLeadForm(formDetails);
        if(commonFunctions.countWords(formDetails.fullName) < 1){
          setFormErrors({...formErrorObject.errors, fullName:'Please enter valid full name'});
          return;
        }
        if(formErrorObject && formErrorObject.ERROR){
            setFormErrors(formErrorObject.errors);
            return;
        }else if(commonFunctions.countWords(formDetails.fullName) < 1){
          setFormErrors({...formErrorObject.errors, fullName:'Please enter valid full name'});
          return;
        } else if(formDetails.email != ''){
            let Checkemail = Validation.validateEmail(formDetails.email);
            if (Checkemail) {
                setLoader(true);
                let payLoad = {
                    "firstName": formDetails.fullName,
                    "mobileNo": formDetails.mobile,
                    "email": formDetails.email,
                    "panCard": formDetails.panCard,
                    "dob":moment(formDetails.dob).format('DD-MM-YYYY'),
                    "postalCode": formDetails.postalCode,
                    "stateId": formDetails.state,
                    "stateName": formDetails.city,
                    "streetAddress": formDetails.streetAddress,
                    "addressCode": formDetails.addressCode,
                    "gender" : formDetails.gender, 
                    "consentStatement": formDetails.consentStatement
                }
                let GetOtp = await SendOtpThree(payLoad);
                if (GetOtp && GetOtp.status === 200) {
                  let encodeData = decrypt_object(GetOtp.data.api_response, 'Object');
                  settoken(encodeData.access_token);
                  setItemInCookie('autoToken', encodeData.access_token, encodeData.expires_in);
                  setshowError(false)
                  if(encodeData.option === 1){
                    setotpOption(encodeData.option)
                    setOtp(true);
                    setPopUpOpen(true);
                    setLoader(false);
                    setQuestionKey(encodeData.resp[0].questionKey);
                    setAnswerKey(encodeData.resp[0].answerKey);
                    setmessage(encodeData.resp[0].text);
                    setResendEligible(encodeData.resp[0].resendEligible);
                  }else if(encodeData.option === 0){
                    setOtp(true);
                    setPopUpOpen(true);
                    setLoader(false);
                    setResendEligible(true);
                    setmessage(encodeData.message);
                   
                  } else if(encodeData.option === 2){
                    setotpOption(encodeData.option)
                    setLoader(false);
                    setOtp(false);
                    setPopUpOpen(false);
                    setQuestionKey(encodeData.resp[0].questionKey);
                    setAnswerKey(encodeData.resp[0].answerKey);
                    setFormErrors({...formErrors, mobile:encodeData.resp[0].text});
                  }
                } else if (typeof GetOtp === 'undefined') {
                  setLoader(false);
                  setshowError(true)
                  setErrorMessage('Please Enter Correct Details')
                }else if(GetOtp.message === 'Maximum OTP sent.Please try again after 100 minutes') {
                  setPopUpOpen(false);
                  setLoader(false);
                  setshowError(true)
                  setErrorMessage(GetOtp.message);
                } else if(GetOtp && GetOtp.status === 500 || GetOtp.message === '1001001-NOHIT'){
                  setShowQuection(true);
                  setNotFound(true);
                  setLoader(false);
                }else {
                  setPopUpOpen(false);
                  setLoader(false);
                  setshowError(true)
                  setErrorMessage('Something went wrong. Please try again later.');
                }
              } else {
                setshowError(true)
                setFormErrors(formErrorObject.errors);
              }
        }
      }
      
      const submitQuestion = async ()=>{
        const data = [];
        for (const key in questionAnswer){
          data.push({
            questionKey:key,
            answerKey:questionAnswer[key]
          })
        }
        result.map((item, key) => {
          let index = Object.keys(questionAnswer).findIndex((data) => data === item.Key);
          index === -1 ? result[key].radioCheck = true : result[key].radioCheck = false;
          setUnCheck(result);
        })
        if(data.length === questionList.length ){
          setLoader(true);
          let payl = {
            "otp":formDetails.mobile,
            data
          }
          const OtpVlid = await OtpCheck(payl, token);
          if(OtpVlid.status === 200){       
            let encodeData = decrypt_object(OtpVlid.data.api_response, 'Object');
            setItemInCookie('autoToken', encodeData.access_token, encodeData.expires_in);     
            Router.push('/credit-score/report');
          }else{
            setNotFound(true);
            setLoader(false);
          }
        }
      }

      const OtpSubmit = async () => {
        const Fullotp = OtpValid.otp1 + OtpValid.otp2 + OtpValid.otp3 + OtpValid.otp4 + OtpValid.otp5 + OtpValid.otp6;
        if (Fullotp || otpOption === 2) {
          let payload = {
            "otp":otpOption === 2?formDetails.mobile: Fullotp,
            "data":[
              {
                questionKey:questionKey,
                answerKey:answerKey
              }
            ]
          }
          setLoader(true); 
          const OtpVlid = await OtpCheck(payload, token);
          if (OtpVlid && OtpVlid.status === 200) {
            webengage.user.login(formDetails.mobile);
            let encodeData = decrypt_object(OtpVlid.data.api_response, 'Object');
            setItemInCookie('autoToken', encodeData.access_token, encodeData.expires_in);
            setotpOption(0);
            if(encodeData.option === 3){
              settoken(encodeData.access_token);
              setotpOption(encodeData.option);
              setShowQuection(true);
              setQuestionList(encodeData.resp);
              setLoader(false);
              setOtp(false);
              setPopUpOpen(false);
              setOtpValid(otpInput);
            }else if(encodeData.option === 2){
              if(encodeData.resp[0].text === 'Enter the alternative mobile number'){
                setFormErrors({...formErrors, mobile:encodeData.resp[0].text});
                setLoader(false);
                setOtpValid(otpInput);
                settoken(encodeData.access_token);
                setOtp(false);
                setPopUpOpen(false);
              }else{
                setResendEligible(true);
                setOtp(true);
                setPopUpOpen(true);
                setmessage(encodeData.resp[0].text);
                settoken(encodeData.access_token);
                setOtpValid(otpInput);
                setLoader(false);
              }
            }else if(encodeData.message === 'Credit Score Report Fetched'){
              Router.push('/credit-score/report');
            }else{
              return
            }
            
          }
          else if (OtpVlid.status && OtpVlid.status === 500 || OtpVlid.message === 'Consumer not found in bureau') {
            setLoader(false);
            setPopUpOpen(false);
            // setOpen(true);
            setOtpValid(otpInput);
          } else if (OtpVlid.message) {
            setLoader(false);
            setmessage(OtpVlid.message);
          }
        } else {
          setshowError(true);
          // setmessage('Please Enter OTP!')
        }
      }
  return (
    <section className={styles.creditScoreform}>
        <div className="container">
            <div className={styles.creditFormWrap}>
                <div className={styles.creditScoreForms}>
                    <h1 className="font21 mb40 text2828 bottomborderf5a623 Innerheading fontsemiBold lineHeight36 ">Check Your CIBIL Score Absolutely, <span className="textef3b51">FREE</span></h1>
                    <div className={styles.formInputFields}>
                        <div className={styles.inputsGrp}>
                            <div className="form-item">
                                <InputText type="text" name="fullName" className={ `${ formErrors && formErrors.fullName && formErrors.fullName.length > 0 ? "formInput  error" : "formInput "}`} autocomplete="off" required maxLength="90"  value={formDetails.fullName}  handleChange={(e) => handleChange(e)} />
                                <label className="font12 fontMedium formLabel">Full Name *</label>
                                <span className="errorText">{formErrors.fullName}</span>
                            </div>
                            <div className="form-item">
                                <SelectBox name="gender" className={ `${ formErrors && formErrors.gender && formErrors.gender.length > 0 ? "formInput  error" : "formInput "}`} required onChange={(e) => handleChange(e)} value={formDetails.gender}>
                                    <>
                                        <option value="" disabled selected>Select Gender*</option>
                                        {master && master.gender &&  master.gender.map((e, key)=>{
                                        return <option value={e} key={key}>{e}</option>
                                        })}
                                    </>
                                </SelectBox>
                                <span className="errorText">{formErrors.gender}</span>
                            </div>
                            <div className="formGroup mb10 zIndex4">
                                    <div className="inputIcon">
                                    <dd className="calendar">
                                    <Image src={process.env.IMAGE_BASEURL + '/images/ic_calendar.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" />                  </dd>
                                    <DatePicker  
                                        dateFormat="dd/MM/yyyy"
                                        name="dob"
                                        autoComplete="off"
                                        className= {`${ formErrors && formErrors.dob && formErrors.dob.length > 0 ? "formInput error" : "formInput  "}`}   
                                        selected={formDetails.dob}
                                        placeholderText = "DOB (DD/MM/YYYY) *"
                                        onChange={(date)=> handleDobChnage(date) } 
                                        showYearDropdown
                                        yearDropdownItemNumber={50}
                                        scrollableYearDropdown
                                        minDate={moment().subtract(59, "years")._d}
                                        maxDate={moment().subtract(18, 'years')._d}
                                    />
                                    <span className="errorText">{formErrors.dob}</span>
                                    </div>
                            </div>
                            <div className="form-item contBox">
                                <span className="text303542 font12 contCode fontMedium">+91</span>
                                <InputText type="text" name="mobile" className={ `${ formErrors && formErrors.mobile && formErrors.mobile.length > 0 ? "formInput  error" : "formInput "}`} autocomplete="off" required maxLength="10" value={formDetails.mobile}  handleChange={(e) => handleChange(e)} />
                                <label  className="font12 fontMedium formLabel">Mobile No. *</label>
                                <span className="errorText">{formErrors.mobile}</span>
                            </div>
                            <div className="form-item ">
                                <InputText type="text" name="email" className={ `${ formErrors && formErrors.email && formErrors.email.length > 0 ? "formInput  error" : "formInput "}`} autocomplete="off" required maxLength="90" value={formDetails.email}  handleChange={(e) => handleChange(e)} />
                                <label  className="font12 fontMedium formLabel">Email Address *</label>
                                <span className="errorText">{formErrors.email}</span>
                            </div>
                            <div className="form-item ">
                                <InputText type="text" name="panCard" className={ `${ formErrors && formErrors.panCard && formErrors.panCard.length > 0 ? "formInput  error textUC" : "formInput textUC"}`} autocomplete="off" required maxLength="10" value={formDetails.panCard}  handleChange={(e) => handleChange(e)} />
                                <label  className="font12 fontMedium formLabel">PAN Card *</label>
                                <span className="errorText">{formErrors.panCard}</span>
                            </div>
                            
                            <div className="form-item">
                                {/* <SelectBox name="state" className={ `${ formErrors && formErrors.state && formErrors.state.length > 0 ? "formInput  error" : "formInput "}`} required onChange={(e) => handleChange(e)} value={formDetails.state}>
                                    <>
                                        <option value="" disabled selected>Select State*</option>
                                        {master && master.state &&  master.state.map((e, key)=>{
                                        return <option value={e.stateId} key={key}>{e.stateName}</option>
                                        })}
                                    </>
                                </SelectBox> */}
                                {master.state && <StateSelect data={master.state} cityAutoHandle={stateAutoHandle} selectedValueCity={selectedValueState} required={true}/>}
                                <span className="errorText">{formErrors.state}</span>
                            </div>
                            <div className="form-item zIndex3">
                                <CitySelect cityAutoHandle={cityAutoHandle} selectedValueCity={selectedValueCity} required={true}/>
                                <span className="errorText">{formErrors.city}</span>
                            </div>
                            
                            <div className="form-item ">
                                <InputText type="text" name="postalCode" className={ `${ formErrors && formErrors.postalCode && formErrors.postalCode.length > 0 ? "formInput  error" : "formInput "}`} autocomplete="off" required maxLength="6" value={formDetails.postalCode}  handleChange={(e) => handleChange(e)} />
                                <label className="font12 fontMedium formLabel">PIN Code *</label>
                                <span className="errorText">{formErrors.postalCode}</span>
                            </div>
                            <div className="form-item grid2Span">
                                <InputText type="text" name="streetAddress" className={ `${ formErrors && formErrors.streetAddress && formErrors.streetAddress.length > 0 ? "formInput  error" : "formInput "}`} autocomplete="off" required  value={formDetails.streetAddress}  handleChange={(e) => handleChange(e)} />
                                <label className="font12 fontMedium formLabel">Street Address *</label>
                                <span className="errorText">{formErrors.streetAddress}</span>
                            </div>
                            <div className="form-item">
                                <SelectBox name="addressCode" className={ `${ formErrors && formErrors.addressCode && formErrors.addressCode.length > 0 ? "formInput  error" : "formInput "}`} required onChange={(e) => handleChange(e)} value={formDetails.addressCode}>
                                    <>
                                        <option value="" disabled selected>Residential Type*</option>
                                        {master && master.addressType &&  master.addressType.map((e, key)=>{
                                        return <option value={e.addressCode} key={key}>{e.addressType}</option>
                                        })}
                                    </>
                                </SelectBox>
                                <span className="errorText">{formErrors.addressCode}</span>
                            </div>
                        </div>
                        <div className="form-check mb30">            
                            <div className="checkInput  text313541">
                            <input
                                className= {`${ formErrors && formErrors.consentStatement ? "form-check-input error" : "form-check-input"}`}   
                                onChange={(e) => handleChange(e)}
                                autoComplete="none"
                                type="checkbox"
                                required={true}
                                defaultChecked={true}
                                id="acc"
                                name="consentStatement"
                                value="You hereby consent to Urban Money being appointed as your authorised representative to receive your Credit Information from Cibil for the purpose of Credit Risk Assessment. You hereby agree to Terms and Conditions." />
                            <p className="text666  font12 lineHeight20 checkBoxText">
                                You hereby consent to Urban Money being appointed as your authorised representative to receive your Credit Information from Cibil for the purpose of Credit Risk Assessment. You hereby agree to  
                                <span  className="textLink cursorPointer"  onClick={() => settermsModel(true)}> terms and conditions</span>.
                            </p>
                            </div>       
                            <p className="errorText">{formErrors.consentStatement}</p>  
                            {/* <label className="checkInput  text313541">
                            <input className="form-check-input" autoComplete="none" type="checkbox" id="nnn" name="" value="" />          
                            <p className="text777 font10 lineHeight16 checkBoxText">Get updates on Whatsapp.</p>          
                            </label>                  */}
                        </div>
                        <button className="btn btn-primary credit_score_cs font12 btn25 textCenterSm mt35" onClick={otpOption == 2?()=>OtpSubmit():(e) => formSubmit(e)}>{process.env.CREDIT_SCORE_VENDOR === '2' ?'Check Credit Score':process.env.CREDIT_SCORE_VENDOR === '3'?'Check CIBIL Score':'Check Credit Score'} <em className="icon-arrow-right font14"></em></button>
                    </div>

                </div>
                <div className={styles.creditScoreRightimg}>
                    {process.env.CREDIT_SCORE_VENDOR === '2' ?<figure><img className="imgResponsive mb35" src="/assets/images/cibil-logo-old.png" alt=""/></figure>:process.env.CREDIT_SCORE_VENDOR === '3'?<figure><img className="imgResponsive mb35" src="/assets/images/cibil-logo.png" alt=""/></figure>:null}
                    
                    <img className="imgResponsive cibillogoresp" src="/assets/images/cibilmainImage.png" alt=""/>
                    <p className="font22 fontsemiBold textBlack lineHeight30 mb15 fontSm20"> Learn. Plan. Protect. All in one place. Here&apos;s how.</p>
                    <ul>
                        <li className="font16 mb10 text181d mobfont16 lineHeight26">- Free and Secure CIBIL Score Check</li>
                        <li className="font16 mb10 text181d mobfont16 lineHeight26">- Credit Score Monitoring with Minimal Information</li>
                        <li className="font16 mb10 text181d mobfont16 lineHeight26">- Get the Lenders Perspective</li>
                    </ul>
                </div>
                
            </div>
        </div>
        <OtpPopUpCivil showError={showError} resendEligible={resendEligible}  mobileNo={formDetails.mobile} OtpValid={OtpValid} otpmsg={message} optHandle={optHandle} sendOtpAgain={formSubmit} OtpSubmit={OtpSubmit} isOpen={isOpen} setPopUpOpen={optClear} />
        {termsModel && <TermsPopupCivil setThankYouPopUp={settermsModel}/>}
        {loader?<Loader/>:''}
        {showQuection &&  
        <QuestionList notFound={notFound} questionList={result} unCheck={unCheck} setShowQuection={setShowQuection} submitQuestion ={submitQuestion } handleQuestion={handleQuestion}/>
        }
        
    </section>
  )
}