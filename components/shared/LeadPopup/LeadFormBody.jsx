import React, { useState } from "react";
import styles from "./LeadPopup.module.css";
import InputText from '../../../form/inputText'
import { Button } from "../../ui/button/Button"
import { Select,CitySelect } from '../../ui';
import {sendLeadOtp, verifyLeadOtp, createLead} from "../../../services/lead";
import Validation from '../../../form/Validation';
import { getProduct } from "../../../services/loans";
import { getMaster } from "../../../services/master";
import {TermsPopup} from "./../../shared"
import { Loader } from "../";
import Image from "next/image";
export const LeadFormBody = ({setThankYouPopUp,bankSlug = '',productName,setPopUpClose,loanPage,formRight=false}) => {
    const [showOtpBox, showOtpVerify] = useState(false);
    const [productData, setProductData] = useState([]);
    const [errorMessage,setErrorMessage] = useState('');
    const [cityData, setCityData] = useState([]);
    const [otpData, setOtpData] = useState({"otp": '',"otpId": '', "enquiryId" : 0, "leadId" : 0});
    const [formDetails, setFormDetails] = useState({fullName: "",mobile : "",countryCode : "+91",city: "",cityId:"",productType : "", otpVerified : false, otp : ''})
  const [formErrors, setFormErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [termsModel, settermsModel] = useState(false);
  const [selectedValueCity, setSelectedValueCity] = useState(null);
    React.useEffect(() => {
        (async function () {
          let cityDetails = await getMaster("cities");
          let productDetails = await getProduct();
          setCityData(cityDetails && cityDetails.cities ? cityDetails.cities : []);   
          setProductData(productDetails);
          setFormDetails({ ...formDetails, productType: productDetails.find(l=>l.productName===productName) ? productDetails.find(l=>l.productName===productName).productId : '' });
        })();
      }, []);
    const cityHandle = (e)=>{
      const  {name, value} = e.target;
      setFormDetails({...formDetails,city:e.target.selectedOptions[0].text,cityId:value});
      setFormErrors({ ...formErrors, [name]: '' });
    }
    const handleChange = async(e) => {
        const { name, value} = e.target;
        let isValid = isAllowed(value, name);
        if(isValid){
          setFormDetails({ ...formDetails, [name]: value });
          setFormErrors({...formErrors , [name]: ''});
          if(name === 'mobile'){
            showOtpVerify(false);
            if(value.length === 10){
              if(Validation.validateIndianNumber(value)){
                generateOtp(value);
              }else{
                setFormErrors({...formErrors , 'mobile' : 'Please enter valid mobile number'})
              }
            }
          }
          name === 'otp' && value.length === 6 ? verifyOtp(value) : ''; 
        } else {return;}
    };
    const validateLeadForm = (data) => {
        let validateFields;
        validateFields = Validation.validateListingLeadForm(data);
        return validateFields;
      }
    const isAllowed = (value, type) => {
        switch (type){
          case 'fullName':
            return (value === '' || (Validation.validateChar(value) && value.length < 51)); 
          case 'email':
            return (value === '' || (Validation.validateEmail(value) && value.length < 95));
          case 'mobile':
            return  ((value === '' || Validation.validateNumber(value)) && value.length < 11);
          case 'otp':
            return  ((value === '' || Validation.validateNumber(value)) && value.length < 7);
          default:
            return  true;
        }
    }
    const generateOtp = async(value) => {
        let param = {
          "mobileNumber":value,
          "countryCode":formDetails.countryCode,
          "sources": source,
          "subSources": subSource,
          "enquiryAction": enquiryAction,
          "name":formDetails.fullName,
          "cityName":formDetails.city ,
          "cityId":formDetails.cityId || 0,
          "loanType":formDetails.productType || 0,
          "bankSlug": bankSlug,
        }
        setLoader(true);
        setErrorMessage('');
        let response = await sendLeadOtp(param);
        setLoader(false);
        if(response.status === 1) {
          showOtpVerify(true);
          setOtpData(response.data);
        }else{
          setErrorMessage(response.message);
        }
    }
    const verifyOtp = async(value) => {
        let param = {
          "mobileNumber":formDetails.mobile,
          "countryCode":formDetails.countryCode,
          "otp": value,
          "otpId": otpData.otpId,
          "enquiryId": otpData.enquiryId
        }
        setLoader(true);
        setErrorMessage('');
        let response = await verifyLeadOtp(param);
        setLoader(false);
        if(response.status === 1) {
          showOtpVerify(false);
          webengage.user.login(formDetails.mobile);
          setFormDetails({...formDetails , otpVerified: true});
        }else{
          setErrorMessage(response.message);
        }
    }
    const callBackFromLoanExpert = async(e) => {
        e.preventDefault();
        setErrorMessage('');
        let validateFields = validateLeadForm(formDetails);
        if(validateFields && validateFields.ERROR){
          setFormErrors(validateFields.errors);
          return;
        }
        let param = {
          "name":formDetails.fullName,
          "mobileNumber":formDetails.mobile,
          "countryCode":formDetails.countryCode,
          "cityName":formDetails.city,
          "cityId":formDetails.cityId || 0,
          "loanType":formDetails.productType,
          "sources": source,
          "subSources": subSource,
          "enquiryAction": enquiryAction,
          "enquiryId": otpData.enquiryId,
          "leadId": otpData.leadId,
          "bankSlug": bankSlug,
          //"loanAmount": 100000.00,
          //"remarks": "Hi this is testing",
          //"emailId": "rahul@test.com"
        }
        setLoader(true);
        let response = await createLead(param);
        setLoader(false);
        if(response.status === 1) {
          loanPage ? setFormDetails({fullName: "",mobile : "",city: "", otpVerified : false, otp : ''}) : setPopUpClose();
          setThankYouPopUp();
        }else{
          setErrorMessage(response.message);
        }
    }
  let source = 'WEB';
  let enquiryAction = 'enquiry-lead';
  let subSource = 'ENQUIRY_FORM';
  const cityAutoHandle = value=>{
    setFormDetails({...formDetails,city:value.label,cityId:value.value});
    setSelectedValueCity(value)
    setFormErrors({ ...formErrors, city: '' });
  }
  return (
    <div className={`${loanPage ? styles.towGrid : styles.contentBox} ${formRight?styles.sideBarForm:null}`}>
      {formRight?<p className="font12 text666 fontsemiBold">Connect with {productName ? productName : "Loan"} Advisor Now!</p>:null}
      {loader ? <Loader /> : <React.Fragment />}
        <div className={styles.form}>
        <div className="form-item">
            <InputText
            type="text"
            name="fullName"
            maxLength={90}
            id="htmlFor"
            className="formInput"
            handleChange={(e) => handleChange(e)}
            required="true"
            value={formDetails.fullName}
            />
            <label htmlFor="fullName" className="font12 fontMedium formLabel">Full Name</label>
            <span className="errorText">{formErrors.fullName}</span>
        </div>          
        <div className="form-item contBox">
            <span className="text303542 font12 contCode fontMedium">+91</span>
            <InputText
            type="text"
            name="mobile"
            maxLength={10}
            className="formInput"
            id="mobileNo"
            required="true"
            handleChange={(e) => handleChange(e)}
            value={formDetails.mobile}
            disabled={formDetails.otpVerified}
            />
            {!formDetails.otpVerified ? <label htmlFor="mobileNo" className="font12 fontMedium formLabel">Mobile No.</label> : null}
            <span className="errorText">{formErrors.mobile}</span>
            <span className="errorText">{formErrors.otpVerified}</span>
            {formDetails.otpVerified ? <p className={styles.verifiedOtp}>Verified <Image className={`imgResponsive`} width = {20} height = {20} src="/assets/images/verified-mark.svg" alt="Urban Money" /></p>  : null}
        </div>
        {showOtpBox ? 
        <div className="form-item">  
            <InputText
            type="text"
            name="otp"
            maxLength={6}
            className="formInput"
            required="true"
            handleChange={(e) => handleChange(e)}
            value={formDetails.otp}
            />
            <label className="font12 fontMedium formLabel">OTP</label>     
            <p className={`${styles.reSendOtp} cursorPointer`} onClick={() => generateOtp(formDetails.mobile)}>Resend OTP</p>      
        </div> : null}       
        <div className="form-item">
            {/* <Select name="city" required onChange={(e) => cityHandle(e)}>
            <>
            <option value="">Choose City</option>
            {cityData.map((e,index)=>{
            return <option value={e.id} key={index} selected={e.id === formDetails.city ? 'selected' : ''}>{e.name}</option>
            })}
            </>
            </Select> */}
            <CitySelect cityAutoHandle={cityAutoHandle} selectedValueCity={selectedValueCity}/>
            <span className="errorText">{formErrors.city}</span>
        </div>
        <div className="form-item">
            <Select name="productType" required onChange={(e) => handleChange(e)}>
            <>
            <option value="">Choose Loan Type</option>
            {productData.map((e)=>{
            return <option value={e.productId} key={e.productId} selected={e.productName === productName ? 'selected' : ''}>{e.productName}</option>
            })}
            </>
            </Select>
            <span className="errorText">{formErrors.productType}</span>
        </div>
        {loanPage ?
          <div className={`${styles.span2}`}>
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
                <p className="text777  font10 lineHeight16 checkBoxText">You hereby consent to Urban Money being appointed as your authorised representative to receive your Credit Information from Equifax/Experian for the purpose of Credit Risk Assessment. You hereby agree to  <span  className="textLink cursorPointer"  onClick={() => settermsModel(true)}>terms and conditions</span>.</p>
              </label>       
              <p className="errorText">{formErrors.consentStatement}</p>  
              {/* <label className="checkInput  text313541">
                <input className="form-check-input" autoComplete="none" type="checkbox" id="nnn" name="" value="" />          
                <p className="text777 font10 lineHeight16 checkBoxText">Get updates on Whatsapp.</p>          
              </label>                  */}
            </div>   
          </div>
        : null}
        
        <div className={`${styles.rangecalc} mb0 `}>
          <Button className="btn btn-primary textCenterSm font16" onClick={(e) => callBackFromLoanExpert(e)}>{loanPage?<>Enquire Now<i className="icon-arrow-right font12"></i></> : 'Submit' } </Button>
            <span className="errorText">{errorMessage}</span>
        </div>
      </div>
      {termsModel ? <TermsPopup  setThankYouPopUp={() => settermsModel(false)} /> : <React.Fragment /> }
  </div>
  )
}