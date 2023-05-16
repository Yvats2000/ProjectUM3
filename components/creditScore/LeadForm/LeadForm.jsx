import React, { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import { SendOtp,OtpCheck } from '../../../services/creditScore';
import { OtpPopUp } from '../../shared/OtpPopUp'
import { Loader, PopUp,TermsPopup } from "../../shared";
import Router from 'next/router'
import Validation from '../../../form/Validation';
import InputText from '../../../form/inputText'
import { setItemInCookie } from '../../../helpers/cookie';
import { Tooltip } from "../../shared/";
import { Select, CitySelect } from '../../ui';
import { getMaster } from "../../../services/master";
import { decrypt_object } from "../../../helpers/Base64Encode";
export const LeadForm = () => {
  const creditFild = {
    fullName: '',
    email: '',
    mobile: '',
    cityId:'',
    city:'',
    panCard: '',
    dob:'',
    consentStatement: 'You hereby consent to Urban Money being appointed as your authorised representative to receive your Credit Information from Equifax/Experian for the purpose of Credit Risk Assessment. You hereby agree to Terms and Conditions.',
  }
  const otpInput = {
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',
    otp5:'',
    otp6:''
  }
  const [formDetails, setFormDetails] = useState(creditFild)
  const [formErrors, setFormErrors] = useState({})
  const [cityData, setCityData] = useState([]);
  const [OtpValid, setOtpValid] = useState(otpInput);
  const [otp, setOtp] = useState(false);
  const [message, setmessage] = useState('');
  const [token, settoken] = useState('');
  const [isOpen, setPopUpOpen] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState('');
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);
  const [showError, setshowError] = useState(false);
  const [termsModel, settermsModel] = useState(false);
  const [selectedValueCity, setSelectedValueCity] = useState(null);
  React.useEffect(() => {
    (async function () {
      let cityDetails = await getMaster("cities");
      setCityData(cityDetails && cityDetails.cities ? cityDetails.cities : []);   
    })();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValid = isAllowed(value, name);
    if (isValid) {
      setFormDetails({ ...formDetails, [name]: name === 'consentStatement' ? formDetails.consentStatement? 'Data Science' : value : value });
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };
  const cityHandle = (e)=>{
    const  {name, value} = e.target;
    setFormDetails({...formDetails,city:e.target.selectedOptions[0].text,cityId:value});
    setFormErrors({ ...formErrors, [name]: '' });
  }
  const optClear = () => {
    setPopUpOpen(false)
    setOtpValid(otpInput);
  }
  const optHandle = (name, event) => {
    let isValid = isAllowed(event.target.value, name);
    if (isValid) {
      setOtpValid({ ...OtpValid, [name]: event.target.value });
    }
  }
  
  const isAllowed = (value, type) => {
    switch (type){
      case 'fullName':
        return (value === '' || (Validation.validateChar(value) && value.length < 51)); 
      case 'mobile':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 11);
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
  const validateLeadForm = (data) => {
    let validateFields;
    validateFields = Validation.validateListingLeadForm(data);
    return validateFields;
  }
  const formSubmit = async (e) => {
    e.preventDefault(); 
    setFormErrors('');
    let formErrorObject = validateLeadForm(formDetails);
    if(formErrorObject && formErrorObject.ERROR){
      setFormErrors(formErrorObject.errors);
      return;
    } else if (formDetails.email != '') {
      let Checkemail = Validation.validateEmail(formDetails.email);
      if (Checkemail) {
        setLoader(true);
        let payLoad = {
          'firstName': formDetails.fullName,
          'email': formDetails.email,
          'mobileNo': formDetails.mobile,
          'cityId':formDetails.cityId,
          'cityName':formDetails.city,
          'panCard': formDetails.panCard.toUpperCase(),
          'dob':moment(formDetails.dob).format('DD-MM-YYYY'),
          'consentStatement':formDetails.consentStatement
        }
        let GetOtp = await SendOtp(payLoad);
        if (GetOtp && GetOtp.status === 200) {
          let encodeData = decrypt_object(GetOtp.data.api_response, 'Object');
          setOtp(true);
          setPopUpOpen(true);
          setLoader(false);
          settoken(encodeData.access_token)
          setshowError(false)
          setmessage(encodeData.message)
        } else if (typeof GetOtp === 'undefined') {
          setLoader(false);
          setshowError(true)
          setErrorMessage('Please Enter Correct Details')
        }else if(GetOtp.message === 'Maximum OTP sent.Please try again after 100 minutes') {
          setPopUpOpen(false);
          setLoader(false);
          setshowError(true)
          setErrorMessage(GetOtp.message);
        } else {
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
  
  let title = "No record found";
  let thankyou = "Oh no!";
  let text = "We are not able to get your credit score at the moment. Please try again!";
  const OtpSubmit = async () => {
    const Fullotp = OtpValid.otp1 + OtpValid.otp2 + OtpValid.otp3 + OtpValid.otp4 + OtpValid.otp5 + OtpValid.otp6;
    if (Fullotp) {
      let otp = {
        "otp":Fullotp
      }
      setLoader(true); 
      const OtpVlid = await OtpCheck(otp, token);
      if (OtpVlid && OtpVlid.status === 200) {
        webengage.user.login(formDetails.mobile);
        let encodeData = decrypt_object(OtpVlid.data.api_response, 'Object');
        setItemInCookie('autoToken', encodeData.access_token, encodeData.expires_in);
        Router.push('/credit-score/report');
      }
      else if (OtpVlid.status && OtpVlid.status === 500 || OtpVlid.message === 'Consumer not found in bureau') {
        setLoader(false);
        setPopUpOpen(false);
        setOpen(true);
        setOtpValid(otpInput);
      } else if (OtpVlid.message) {
        setLoader(false);
        setmessage(OtpVlid.message);
      }
    } else {
      setshowError(true);
      setmessage('Please Enter OTP!')
    }
  }
  const handleDobChnage = async(date) => {
    setFormDetails({...formDetails, dob:date})
    setFormErrors({...formErrors, dob:''})
  };
  const cityAutoHandle = value=>{
    setFormDetails({...formDetails,city:value.label,cityId:value.value});
    setSelectedValueCity(value)
    setFormErrors({ ...formErrors, city: '' });
  }
  return (
    <>
      <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 ">Check Your CIBIL Score Absolutely, <span className="textef3b51">FREE</span></h1>
       <div className="form-item">
        <InputText type="text"
          id="fullName"
          name="fullName"
          autoComplete="off"
          handleChange={(e) => handleChange(e)} 
          value={formDetails.fullName} 
          className={ `${ formErrors && formErrors.fullName && formErrors.fullName.length > 0 ? "formInput  error" : "formInput "}`}
          required={true}
        />
        <label htmlFor="FullName">Name</label>
        <Tooltip tooltip='Enter the name registered with your bank'><span>i</span></Tooltip>
        <span className="errorText">{formErrors.fullName}</span>
      </div>
      <div className="form-item">
        <InputText type="text"
          id="email"
          name="email"
          autoComplete="off"
          handleChange={(e) => handleChange(e)} 
          value={formDetails.email} 
          className={`${formErrors && formErrors.email && formErrors.email.length > 0 ? "formInput  error" : "formInput  "}`}
          required={true}
            
        />
        
        <label htmlFor="email">E-mail</label>
        
        
        <span className="errorText">{formErrors.email}</span>
      </div>
      <div className="form-item contBox">
        <span className="text303542 font12 contCode fontMedium">+91</span>
        <InputText
          type="number"
          id="Mobile"
          name="mobile"
          maxLength='10'
          value={formDetails.mobile} 
          required={true}
          handleChange={(e) => handleChange(e)} 
          autoComplete="off"
          className= {`${ formErrors && formErrors.mobile && formErrors.mobile.length > 0 ? "formInput error" : "formInput  "}`}   
        />
        
        <label htmlFor="Mobile">Mobile</label>
        <Tooltip tooltip='Enter the number registered with your bank without country code'><span>i</span></Tooltip>
        <span className="errorText">{formErrors.mobile}</span>
      </div>
      <div className="form-item zIndex3">
          {/* <Select name="city" required={true} onChange={(e) => cityHandle(e)} className={`${ formErrors && formErrors.city && formErrors.city.length > 0 ? "formInput error" : "formInput  "}`}>
          <>
          <option value="">Choose City</option>
          {cityData.map((item, index)=>{
          return <option value={item.id}  key={index} selected={item.id === formDetails.cityId ? 'selected' : ''}>{item.name}</option>
          })}
          </>
          </Select> */}
          <CitySelect cityAutoHandle={cityAutoHandle} selectedValueCity={selectedValueCity}/>
          <span className="errorText">{formErrors.city}</span>
      </div>
      <div className="form-item">
        <InputText
          type="text"
          id="panCard"
          name="panCard"
          maxLength='10'
          value={formDetails.panCard} 
          required={true}
          handleChange={(e) => handleChange(e)} 
          autoComplete="off"
          className= {`${ formErrors && formErrors.panCard && formErrors.panCard.length > 0 ? "formInput error" : "formInput  "} textUC`}   
        />
        
        <label htmlFor="Mobile">PAN</label>
        
        <span className="errorText">{formErrors.panCard}</span>
        
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
                placeholderText = "DOB (DD/MM/YYYY)"
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
      <p className="textError mb15">{ ErrorMessage}</p>
      <div className="form-check mb30">            
        <label className="checkInput  text313541">
          <input
            className= {`${ formErrors && formErrors.consentStatement ? "form-check-input error" : "form-check-input"}`}   
            onChange={(e) => handleChange(e)}
            autoComplete="none"
            type="checkbox"
            required={true}
            defaultChecked={true}
            id="acc"
            name="consentStatement"
            value="You hereby consent to Urban Money being appointed as your authorised representative to receive your Credit Information from Equifax/Experian for the purpose of Credit Risk Assessment. You hereby agree to Terms and Conditions." />
          <p className="text666  font12 lineHeight20 checkBoxText">
            You hereby consent to Urban Money being appointed as your authorised representative to receive your Credit Information from Equifax/Experian for the purpose of Credit Risk Assessment. You hereby agree to  
            <span  className="textLink cursorPointer"  onClick={() => settermsModel(true)}> terms and conditions</span>.
          </p>
        </label>       
        <p className="errorText">{formErrors.consentStatement}</p>  
        {/* <label className="checkInput  text313541">
          <input className="form-check-input" autoComplete="none" type="checkbox" id="nnn" name="" value="" />          
          <p className="text777 font10 lineHeight16 checkBoxText">Get updates on Whatsapp.</p>          
        </label>                  */}
      </div>                            
      <button className="btn btn-primary credit_score_cs font12 btn25 textCenterSm mt35" onClick={(e) => formSubmit(e)}>Check Credit Score <em className="icon-arrow-right font14"></em></button>
      
      <OtpPopUp showError={showError}  mobileNo={formDetails.mobile} OtpValid={OtpValid} otpmsg={message} optHandle={optHandle} sendOtpAgain={formSubmit} OtpSubmit={OtpSubmit} isOpen={isOpen} setPopUpOpen={optClear} />
      {loader?<Loader/>:''}
      {open ? <PopUp title={title} thankyou={thankyou} text={text} setThankYouPopUp={() => setOpen(false)} /> : <React.Fragment /> }
      {termsModel ? <TermsPopup  setThankYouPopUp={() => settermsModel(false)} /> : <React.Fragment /> }
    </>
  );
};
