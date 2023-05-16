import styles from "../calculator.module.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import Image from "next/image";
import React, {useState} from 'react';
import { Select as SelectBox,Link,Select,CitySelect} from "../../ui";
import {getMaster,companyMaster} from "../../../services/master";
import { eligibilityCal } from "../../../services/calculators";
import { generateLead } from "../../../services/lead";
import InputText from "../../../form/inputText";
import Validation from '../../../form/Validation';
import { Loader } from "../../shared";
import { PopUp, OtpPopUp } from "../../shared";
import AsyncSelect from 'react-select/async';
import { useRouter } from 'next/router'
export const EligibilityLeadForm = ({loanType, title, scrollTo, setOffer,setLeadIdE,setBanks, tabs, setLoanType }) => {
  const [open,setOpen] = useState(false);
  const [occupationData, setOccupationData] = useState([]);
  const [formDetails, setFormDetails] = useState({fullName: "",cityId:'',city:'',mobile : "",dob :'', countryCode : "+91",companyType: "",occupationType : "", loanAmount : '', monthlySalary : '', currentMonthlyEmi : '', tenure: ''})
  const [formErrors, setFormErrors] = useState({})
  const [loader,setLoader] = useState(false);
  const [errorMessage,setErrorMessage] = useState('');
  const [selectedValue, setSelectedValue] = useState(null);
  const [selectedValueCity, setSelectedValueCity] = useState(null);
  //const [cityData, setCityData] = useState([]);
  const router = useRouter();
  const otpInput = {
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',
    otp5:'',
    otp6:''
  }

  const [isOpen, setPopUpOpen] = useState(false);
  const [OtpValid, setOtpValid] = useState(otpInput);
  const [otpmsg, setotpmsg] = useState('');
  const [otpId, setOtpId] = useState('');
  const [enquiryId, setEnquiryId] = useState('');
  const optHandle = (name,event) => {
    let isValid = isAllowed(event.target.value, name);
    if (isValid) {
      setOtpValid({ ...OtpValid,[name]: event.target.value });
    }    
  }

  React.useEffect(() => {
    (async function () {
      let occupationDetails = loanType === "home-loan" ? await getMaster("product_occupations") : [];
      setOccupationData(occupationDetails && occupationDetails.product_occupations ? occupationDetails.product_occupations.filter((value) => value.productSlug === loanType)[0].occupations : []); 
      //let cityDetails = await getMaster("cities");
      //setCityData(cityDetails && cityDetails.cities ? cityDetails.cities : []); 
      })();
      if (router.query && Object.keys(router.query).length>10) {
        const { fullName, mobile, dob, companyType,companyLabel, occupationType, loanAmount, monthlySalary, currentMonthlyEmi, tenure } = router.query;
        setFormDetails({fullName:fullName,mobile : mobile,dob : new Date(dob), countryCode : "+91",companyType:companyType || '',occupationType : occupationType || '', loanAmount :loanAmount, monthlySalary : monthlySalary, currentMonthlyEmi : currentMonthlyEmi, tenure: tenure});
        let srv = {
          companyName: companyLabel,
          companyId: companyType,
        }
        setSelectedValue(srv);
        var but = document.getElementById("autoclick");
        setTimeout(function () {but.click();},500);
        scrollTo();
      }
  }, []);
  /*const cityHandle = (e)=>{
    const  {name, value} = e.target;
    setFormDetails({...formDetails,city:e.target.selectedOptions[0].text,cityId:value});
    setFormErrors({ ...formErrors, [name]: '' });
  }*/

  const cityAutoHandle = value=>{
    setFormDetails({...formDetails,city:value.label,cityId:value.value});
    setSelectedValueCity(value)
    setFormErrors({ ...formErrors, city: '' });
  }

  const handleChange = async(e, inputName) => {
    const name = ''; 
    const value = '';
    name = e.target.name; 
      value = e.target.value;
    if(value)value=value.toString().replace(/,/g,"");
    let isValid = isAllowed(value, name);
    if(isValid){
      setFormDetails({ ...formDetails, [name]: value });
      setFormErrors({...formErrors , [name]: ''});
    } else {return;}
  };

  const handleDobChnage = async(date) => {
    setFormDetails({...formDetails, dob:date})
    setFormErrors({...formErrors, dob:''})
  };

  const isAllowed = (value, type) => {
    switch (type){
      case 'fullName':
        return (value === '' || (Validation.validateChar(value) && value.length < 51)); 
      case 'dob':
        return (value === ''); 
      case 'mobile':
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'loanAmount':
      case 'monthlySalary':
      case 'currentMonthlyEmi':
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'tenure':
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 3);
      case 'otp1':
      case 'otp2':
      case 'otp3':
      case 'otp4':
      case 'otp5':
      case 'otp6':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 2);
      case 'companyType':
        return ((value === '' || Validation.validateCharNumberWidthSpace(value)));
      default:
        return  true;
    }
  }

  let param={}
  param ={
    "customerName": formDetails.fullName,
    "countryCode": "+91",
    "phoneNo": formDetails.mobile,
    "productId": loanType == 'home-loan' ? 1 : loanType == 'personal-loan' ? 2 : 0,
    "requiredLoanAmount": formDetails.loanAmount,
    "sources": "WEB",
    "subSources": "ELIGIBILTY",
    "enquiryAction": loanType + '-eligibility-calculator',
    "monthlyObligations" : formDetails.currentMonthlyEmi != '' ? formDetails.currentMonthlyEmi : 0,
    "monthlyIncome": formDetails.monthlySalary,
    "tenureMonths": formDetails.tenure*12,
    "dob":moment(formDetails.dob).format('YYYY-MM-DD'),
    'cityId':formDetails.cityId,
    'cityName':formDetails.city,
    "companyId":loanType == 'personal-loan' ? parseInt(formDetails.companyType) : 0,
    "occupationId":loanType == 'home-loan' ? parseInt(formDetails.occupationType) : 0,
    "enquiryId": 0,
    "otp": 0,
    "otpId" : 0
  }
  
  const CheckOffer = async () => {
    let param = {}
    setBanks({});
    setOffer([]);
    if(loanType == 'personal-loan') {
      param = {
      "companyId": parseInt(formDetails.companyType),
      "productSlug": loanType,
      "requiredLoanAmount": formDetails.loanAmount,
      "monthlyIncome": formDetails.monthlySalary,
      "monthlyObligations": formDetails.currentMonthlyEmi != '' ? formDetails.currentMonthlyEmi : 0,
      "tenureMonths": formDetails.tenure*12,
      "source": "WEB",
      "dob" :  moment(formDetails.dob).format('YYYY-MM-DD')
      }
    } else if(loanType == 'home-loan') {
      param = {
      "occupationId": parseInt(formDetails.occupationType),
      "productSlug": loanType,
      "requiredLoanAmount": formDetails.loanAmount,
      "monthlyIncome": formDetails.monthlySalary,
      "monthlyObligations": formDetails.currentMonthlyEmi != '' ? formDetails.currentMonthlyEmi : 0,
      "tenureMonths": formDetails.tenure*12,
      "source": "WEB",
      "dob" :  moment(formDetails.dob).format('YYYY-MM-DD')
      }
    }
    let balcal = await eligibilityCal(param);
    if(balcal && balcal.plans.length == 0){
      setOpen(true)
    }
    setBanks(balcal.bestOffer)
    setOffer(balcal)
  }

  const OtpSubmit = async () => {
    const Fullotp = OtpValid.otp1 + OtpValid.otp2 + OtpValid.otp3 + OtpValid.otp4 + OtpValid.otp5 + OtpValid.otp6;
    if (Fullotp) {
      param["enquiryId"] = enquiryId;
      param["otp"] = Fullotp;
      param["otpId"] = otpId;
      setLoader(true); 
      const OtpVlid = await generateLead(param);
      if (OtpVlid && OtpVlid.status) {
        if(!title){
          setLeadIdE(OtpVlid.data.leadIdE || '');
          CheckOffer();
        }else{
          redirectToOffer();
        }
        setPopUpOpen(false);
        setLoader(false);
      } else {
        setLoader(false);
        setotpmsg(OtpVlid.message);
      }
    } else {
      setotpmsg('Please Enter OTP!')
    }
  }

  const redirectToOffer = () => {
    router.push({
      pathname: `/loans/${loanType}/eligibility-calculator`,
      query: {fullName:formDetails.fullName,
        mobile:formDetails.mobile,
        dob:moment(formDetails.dob).format('YYYY-MM-DD'),
        countryCode:'+91',
        companyType:formDetails.companyType,
        companyLabel:selectedValue ? selectedValue.companyName : '',
        occupationType:formDetails.occupationType,
        loanAmount:formDetails.loanAmount,
        monthlySalary:formDetails.monthlySalary,
        currentMonthlyEmi:formDetails.currentMonthlyEmi,
        tenure:formDetails.tenure
      }
    })
  }

  const validateForm = (data) => {
    let validateFields;
    validateFields = Validation.validateEligibilityCalculatorForm(data, loanType);
    return validateFields;
  }

  const calculateEligibility = async (e) => {
    e && e.preventDefault();
    setErrorMessage('');
    let validateFields = validateForm(formDetails);
    if(validateFields && validateFields.ERROR){
      setFormErrors(validateFields.errors);
      return;
    }
    setLoader(true);
    let leadApi = await generateLead(param);
    setLoader(false);
    if (leadApi && leadApi.status === 1) {
      setotpmsg('');
      webengage.user.login(formDetails.mobile);
      setOtpValid(otpInput);
      setOtpId(leadApi.data.otpId || 0);
      setEnquiryId(leadApi.data.enquiryId || 0);
      if(!title){
        setLeadIdE(leadApi.data.leadIdE || '');
      }
      if(leadApi.data.otpId){
        setPopUpOpen(true);
      }else{
        if(title){
          redirectToOffer();
        }else{
          CheckOffer();
        }
      }
    }else{
      console.log(leadApi && leadApi.message);
    }
  }

  let titlePopup = "No record found"
  let thankyou = "Oh no!"
  let text = "We could not match you with any bank. Please try again!"

  const AutohandleChange = value => {
    setFormDetails({...formDetails,companyType:value.companyId})
    setSelectedValue(value);
  }
  const loadOptions = async (inputValue) => {
    if (inputValue.length >= 2) {
      let re =  await companyMaster(inputValue);
      return re;
    }
  }

  return (
    <>
      {open ? <PopUp title={titlePopup} thankyou={thankyou} text={text} failure={true} setThankYouPopUp={() => setOpen(false)} /> : <React.Fragment /> }
      {loader ? <Loader /> : <React.Fragment />}
      <OtpPopUp  mobileNo={formDetails.mobile} OtpValid={OtpValid} otpmsg={otpmsg} optHandle={optHandle} sendOtpAgain={(e) => calculateEligibility(e)} OtpSubmit={OtpSubmit} isOpen={isOpen} setPopUpOpen={setPopUpOpen} />
      {open ? <PopUp title={titlePopup} thankyou={thankyou} text={text} failure={true} setThankYouPopUp={() => setOpen(false)} /> : <React.Fragment />}
      {title && <h2 className="font24 w100 mb40 text2828 grid4Span Innerheading fontMedium lineHeight36 ">Check {title} Eligibility</h2>}
      <div className={`${title ? 'homeLoanForm' : null}`}>
        
      <div className={title ? styles.grid4Leadform : styles.form}>
        {tabs?<div className={`grid4Span ${styles.buttonTab}`}>
          <button className={loanType === "home-loan" ? `${styles.active}` : ""} onClick={() => setLoanType('home-loan')}><figure><Image src={process.env.IMAGE_BASEURL + '/images/emi.svg'} width={19} height={18}  className="imgResponsive" alt="emi svg" /></figure> Home Loan</button>
          <button className={loanType === "personal-loan" ? `${styles.active}` : ""} onClick={() => setLoanType('personal-loan')}> <figure><Image src={process.env.IMAGE_BASEURL + '/images/bt.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" /></figure>Personal Loan</button>
        </div>:null}    
        <div className={`form-item `}>
          <InputText
            type="text"
            name="fullName"
            maxLength={90}
            className={`formInput `}
            handleChange={(e) => handleChange(e)}
            required={true}
            value={formDetails.fullName}
          />
          <label htmlFor="fullName" className="font12 fontMedium formLabel">Full Name</label>
          <span className="errorText">{formErrors.fullName}</span>
        </div>
        <div className={`form-item contBox `}>
          <span className="text303542 font12 contCode fontMedium">+91</span>
          <InputText
            type="text"
            name="mobile"
            maxLength={10}
            className={`formInput `}
            required={true}
            handleChange={(e) => handleChange(e)}
            value={formDetails.mobile}
          />
          <label htmlFor="mobileNo" className="font12 fontMedium formLabel">Mobile No.</label>
          <span className="errorText">{formErrors.mobile}</span>
        </div>
        <div className="form-item">
            {/* <Select name="city" required={true} onChange={(e) => cityHandle(e)} className={`formInput`}>
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
        
        {loanType === "personal-loan"  ?
        <div className={`form-item contBox form-item-lg zIndex3`}>
          <AsyncSelect
            cacheOptions
            defaultOptions
            value={selectedValue}
            noOptionsMessage={() => null}
            getOptionLabel={e => e.companyName}
            getOptionValue={e => e.companyId}
            className={`css-2b097c-container`}
            placeholder='Company Name'  
            loadOptions={loadOptions}
            onChange={AutohandleChange}
              />
            <span className="errorText">{formErrors.companyType}</span>
        </div>
        :
        occupationData && occupationData.length > 0 ?
        <div className={`form-item `}>
          <SelectBox name="occupationType" required onChange={(e) => handleChange(e)}>
          <>
            <option value=""  disabled selected>Occupation Type</option>
            {occupationData.map((e)=>{
            return <option value={e.occupationId} key={e.occupationId} selected={formDetails.occupationType === e.occupationId}>{e.occupationName}</option>
            })}
          </>
          </SelectBox>
          <span className="errorText">{formErrors.occupationType}</span>
        </div>
        :
        <div className={`form-item `}>
          <SelectBox>
          <>
            <option value="" className="textd9d9d9">Select</option>
          </>
          </SelectBox>
        </div>}
        <div className={`form-item rupeeBox `}>
          <span className="text303542 font12 contCode fontMedium">&#x20B9;</span>    
          <InputText
            type="text"
            name="loanAmount"
            maxLength={12}
            className={`formInput `}
            handleChange={(e) => handleChange(e)}
            required={true}
            // value={parseInt(formDetails.loanAmount || 0).toLocaleString('en-IN')}
            value={formDetails.loanAmount?parseInt(formDetails.loanAmount || 0).toLocaleString('en-IN'):formDetails.loanAmount}
          />
          <label htmlFor="loanAmount" className="font12 fontMedium formLabel"> Required Loan Amount </label>
          <span className="errorText">{formErrors.loanAmount}</span>
        </div>
        <div className={`form-item rupeeBox `}>
          <span className="text303542 font12 contCode fontMedium">&#x20B9;</span> 
          <InputText
            type="text"
            name="monthlySalary"
            maxLength={9}
            className={`formInput `}
            handleChange={(e) => handleChange(e)}
            required={true}
            // value={parseInt(formDetails.monthlySalary || 0).toLocaleString('en-IN')}
            value={formDetails.monthlySalary?parseInt(formDetails.monthlySalary || 0).toLocaleString('en-IN'):formDetails.monthlySalary}
          />
          <label htmlFor="monthlySalary" className="font12 fontMedium formLabel">Monthly Net Salary</label>
          <span className="errorText">{formErrors.monthlySalary}</span>
        </div>
        <div className={`form-item rupeeBox `}>
          <span className="text303542 font12 contCode fontMedium">&#x20B9;</span> 
          <InputText
            type="text"
            name="currentMonthlyEmi"
            maxLength={7}
            className={`formInput `}
            handleChange={(e) => handleChange(e)}
            required={true}
            value={formDetails.currentMonthlyEmi?parseInt(formDetails.currentMonthlyEmi).toLocaleString('en-IN'):formDetails.currentMonthlyEmi}
            // value={formDetails.currentMonthlyEmi}
          />
          <label htmlFor="currentMonthlyEmi" className="font12 fontMedium formLabel">Current Monthly EMIs</label>
          <span className="errorText">{formErrors.currentMonthlyEmi}</span>
        </div>
        <div className={`form-item `}>
          <InputText
            type="text"
            name="tenure"
            maxLength={2}
            className={`formInput `}
            handleChange={(e) => handleChange(e)}
            required={true}
            value={formDetails.tenure}
          />
          <label htmlFor="tenure" className="font12 fontMedium formLabel">Tenure(Years)</label>
          <span className="errorText">{formErrors.tenure}</span>
        </div>
        <div className="formGroup mb10 zIndex4">
          {/* <label  className="font12 fontMedium formLabel">Date of Birth</label> */}
          <div className="inputIcon">
            <dd className="calendar">
            <Image src={process.env.IMAGE_BASEURL + '/images/ic_calendar.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" />                  </dd>
            <DatePicker  
              dateFormat="dd/MM/yyyy"
              name="dob"
              autoComplete="off"
              className= {`formInput `}
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
        {title  && 
        <div className="form-check mb20 grid4Span">            
          <label className="checkInput  text313541">
            <input
            className= 'form-check-input'                
            autoComplete="none"
            type="checkbox"
            required={true}
            defaultChecked={true}
            id="acc"
            name="consentStatement"
            value="I hereby appoint UrbanMoney as my authorised representative to receive my credit information from Experian(bureau). I hereby accept terms & conditions." />
            <p className="text777  font10 lineHeight16 checkBoxText">I hereby appoint UrbanMoney as my authorised
            representative to receive my credit information from Experian(bureau). I hereby accept terms & conditions. <Link className="textLink cursorPointer" href='/terms-and-conditions'>Read More</Link>.</p>
          </label>                   
        </div>}
        <div className={`${styles.button} ${title ? 'grid4Span' : 'grid2Span'}`}>
          <button id="autoclick" className={`btn font12  btn-primary textCenterSm  btn25`} onClick={(e) => calculateEligibility(e)}>{title ? 'Check Eligibility' : 'Check Now'} <i className="icon-arrow-right font12"></i></button>
          <span className="errorText">{errorMessage}</span>
        </div>
        </div>
        {title?<figure className="formImg">
          <img src="/assets/images/homeloan-icon.svg" alt="Urban Money" className="imgResponsive" />
        </figure>:null}
      </div>
    </>
  )
}