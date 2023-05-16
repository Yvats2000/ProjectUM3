import { PersonalDetails, PropertyDetails, EmploymentDetails, IncomeDetails, SuccessFailure, Header, Navigation, ApplicationStage } from "./ApplicationForm";
import styles from "./ApplicationForm/ApplicationForm.module.css";
import Image from "next/image";
import { Loader,OtpPopUp } from "../../shared";
import Validation from '../../../form/Validation';
import FormValidation from '../../../form/StandardCharteredCCValidation';
import componentIds from '../../../helpers/componentIds';
import React, { useState } from "react";
import { SendOtp,OtpCheck,SubmitData,PrefillData } from "../../../services/creditCard";
import { decrypt_object,encrypt_object } from "../../../helpers/Base64Encode";
import { setItemInCookie,getItemFromCookie, removeItemInCookie } from '../../../helpers/cookie';
import moment from 'moment';
import {useRouter} from 'next/router';
import { useEffect } from "react";

export const Application = ({master,queryToken, agentToken, agentCode}) => {
  const router = useRouter();
  const otpInput = {otp1:'',otp2:'',otp3:'',otp4:'',otp5:'',otp6:''}
  const [loader,setLoader] = useState(false);
  const [activeTile, setActiveTile] = useState(0);
  const [data, setData] = useState(componentIds);
  const [applicationStatus, setApplicationStatus] = useState('');
  const [applicationMessage, setApplicationMessage] = useState('');

  const [isOpen, setPopUpOpen] = useState(false);
  const [OtpValid, setOtpValid] = useState(otpInput);
  const [message, setmessage] = useState('');
  const [showError, setshowError] = useState(false);
  const [token, settoken] = useState('');
  const [otpVerified, setotpVerified] = useState(false)
  const [ErrorMessage, setErrorMessage] = useState('');
  const TILENAMES = {0:'personalDetails',1:'residentialInfo',2:'employmentDetails',3:'incomeDetail'}
  
  useEffect(()=>{
    let date = new Date();
    const autoToken = queryToken ? queryToken: agentToken ? '' : getItemFromCookie('cardToken');
    queryToken && setItemInCookie('cardToken', queryToken, date.setDate(date.getDate() + 1));
    if(autoToken){
      PreFillData(autoToken);
    }
  },[queryToken, agentToken])
  
  const PreFillData = async(autoToken)=>{
    let dataApi = await PrefillData(autoToken);
    if(dataApi.status === 200){
      setData({...data, ...decrypt_object(dataApi.data.api_response, 'Object')});
      setotpVerified(true);
    }
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

  const Sendotp = async (e,mobile)=>{
    let payLoad = {
      "mobileNo": mobile?mobile:data.personalDetails.MobileNo
    }
    let GetOtp = await SendOtp(payLoad, agentToken, agentCode);
    if (GetOtp && GetOtp.status === 200) {
      let encodeData = decrypt_object(GetOtp.data.api_response, 'Object');
      if(encodeData && encodeData.isAuthValid){
        setotpVerified(true);
        PreFillData(encodeData.access_token);
        setItemInCookie('cardToken', encodeData.access_token, encodeData.expires_in);
      }else{
        setPopUpOpen(true);
        settoken(encodeData.access_token)
        setshowError(false)
        setmessage(encodeData.message)
      }
    } else if (typeof GetOtp === 'undefined') {
      setLoader(false);
      setshowError(true);
      setErrorMessage('Please Enter Correct Details');
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
  }

  const OtpSubmit = async () => {
    const Fullotp = OtpValid.otp1 + OtpValid.otp2 + OtpValid.otp3 + OtpValid.otp4 + OtpValid.otp5 + OtpValid.otp6;
    if (Fullotp) {
      let otp = {
        "otp":Fullotp
      }
      // setLoader(true); 
      const OtpVlid = await OtpCheck(otp, token);
      if (OtpVlid && OtpVlid.status === 200) {
        setotpVerified(true);
        optClear();
        let encodeData = decrypt_object(OtpVlid.data.api_response, 'Object');
        setItemInCookie('cardToken', encodeData.access_token, encodeData.expires_in);
        setPopUpOpen(false);
      }
    } else {
      setshowError(true);
      setmessage('Please Enter OTP!')
    }
  }

  const handleAction = async (type) => {
    setLoader(true);
    document.body.scrollIntoView();
    if(type === 'next'){
      //let formData = Validation.cloneObject(data);
      let formData = {...data};
      let activeData =  formData[TILENAMES[activeTile]];
      let validateFields = validateTile(activeTile,activeData);
      formData['employmentDetails']['Email'] = formData['personalDetails']['Email'];
      formData['employmentDetails']['Mobile'] = formData['personalDetails']['MobileNo'];
      if(validateFields && validateFields.ERROR){
        formData[TILENAMES[activeTile]]['extraParams']['validationError'] = validateFields;
        setData(formData);
        setTimeout(() => setLoader(false) , 500 );
        return;
      }
      let payload= {
        ...formData,
      "screen":activeTile+1}
      const autoToken = getItemFromCookie('cardToken');
      let submitData = await SubmitData(payload, autoToken);
      if(submitData.status === 200){
        setApplicationMessage(submitData.data.message);
        setApplicationStatus(submitData.data.status+ '('+submitData.data.referenceNumber+')');
        setActiveTile(activeTile+1);  
        setTimeout(() => setLoader(false) , 500 );
        if(activeTile+1 > 3){
          removeItemInCookie('cardToken');
          router.push(`${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form/success${agentToken || queryToken ? `?setHeaderFooter=false&status=${applicationStatus}&remarks=${applicationMessage}` : ''}`)
        }
      }else{
        if(activeTile+1 > 3){
          setApplicationMessage(submitData.message);
          setApplicationStatus(submitData.status + '('+submitData.referenceNumber+')');
          removeItemInCookie('cardToken');
          router.push(`${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form/failure${agentToken || queryToken ? `?setHeaderFooter=false&status=${applicationStatus}&remarks=${applicationMessage}` : ''}`)
        }
        //activeTile === 4 && setApplicationStatus(false)
      }
    }else if(type === 'back'){
      setActiveTile(activeTile-1);
      setTimeout(() => setLoader(false) , 500 );
    }
  }

  const isAllowed = (value, type) => {
    switch (type){
      case 'FirstName':
      case 'MiddleName':
      case 'LastName':
        return (value === '' || (Validation.validateCharWithoutSpace(value) && value.length < 100)); 
      case 'ResAddress1':
      case 'ResAddress4':
      case 'PermAddress1':
      case 'PermAddress4':
      case 'OfcAddress1':
      case 'OfcAddress4':
        return (value === '' || (Validation.validateAddress(value) && value.length < 100));
      case 'OtherCompanyName':
      case 'CompanyCode':
      case 'Designation':
        return (value === '' || (Validation.validateText(value) && value.length < 100)); 
      case 'OtherDocNo':
        return (value === '' || (Validation.validateText(value) && value.length < 50)); 
      case 'Email':
      case 'OfcEmail':
        return true; //(value === '' || (Validation.validateEmail(value) && value.length < 95)); 
      case 'PAN':
        return (value === '' || (Validation.validateCharNumber(value) && value.length < 11)); 
      case 'Qualification':
      case 'Title':
      case 'ResType':
      case 'ResidentialStatus':
      case 'ConsentStatement':
      case 'WorkType':
      case 'IndustryIsic':
      case 'CardMailingAddress':
      case 'IncomeProof':
      case 'OtherDocType':
      case 'DOB':
      case 'OtherDocExpDate':
      case 'PermAddrSameAsResAddr':
        return true;
      case 'MobileNo':
      case 'AnnIncome':
      case 'GMI':
      case 'OfcPhone':
      case 'IncomeProofValue':
      case 'MonthlyVarBonus':
      case 'PrevYearTaxableIncome':
      case 'ProfessionalIncome':
      case 'BusinessIncome':
      case 'IncomeDepreciation':
      case 'DirectorRenumeration':
      case 'SalCreditBankStmnt':
      case 'OtherIncome':
      case 'MonthlySalesTurnOver':
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'ResPIN':
      case 'PermPIN':
      case 'OfcPin':
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 7);
      case 'otp1':
      case 'otp2':
      case 'otp3':
      case 'otp4':
      case 'otp5':
      case 'otp6':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 2);
      case 'NumOfDependents':
        return ((value === '' || Validation.validateNumber(value)) && value.length < 3);
      default:
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 10);
    }
  }

  const validateTile = (activeTile, data) => {
    let validateFields;
    switch(activeTile){
      case 0:
        validateFields = FormValidation.validatePersonalDetails(data);
        break;
      case 1:
        validateFields = FormValidation.validateResidentialInfo(data);
        break;
      case 2:
        validateFields = FormValidation.validateEmploymentDetails(data);
        break;
      case 3:
        validateFields = FormValidation.validateIncomeDetail(data);
        break;
    }
    return validateFields;
  }
  
  const handleChange = (e, type='', tile, name='' ) => {
    //let formData = Validation.cloneObject(data);
    let formData = {...data};
    if(e && e.target) {
      let targetValue = e.target.value.replace(/,/g, '');
      let isValid = e.target.type === 'radio' ? true : isAllowed(targetValue, type);
      if(isValid){
        type === 'MobileNo'?setotpVerified(false):null;
        if(type === 'ConsentStatement'){
          formData[tile][type] = formData[tile][type]?'':targetValue;
        }else if(type === 'PermAddrSameAsResAddr'){
          if(e.target.checked){
            formData[tile].PermAddress1 = data.residentialInfo.ResAddress1;
            formData[tile].PermAddress4 = data.residentialInfo.ResAddress4;
            formData[tile].PermCity = data.residentialInfo.ResCity;
            formData[tile].PermPIN = data.residentialInfo.ResPIN;
            formData[tile][type] = 'yes';
          }else{
            formData[tile][type] = 'no';
            formData[tile].PermAddress1 = '';
            formData[tile].PermAddress4 = '';
            formData[tile].PermCity = '';
            formData[tile].PermPIN = '';
          }
        } else{
          if(type === 'CompanyCode'){
            formData[tile]['CompanyName'] = '';
            formData[tile]['OtherCompanyName'] = '';
          }
          if(type === 'Designation') formData[tile]['DesignationName'] = '';
          formData[tile][type] = targetValue;
        }
        if(type === 'MobileNo' && targetValue.length == 10 ){
          Sendotp(e,targetValue);
        }
      } else {return;}
    } else {
      if(name === 'DOB'){
        //formData[tile][type] = moment(e).format('DD-MM-YYYY');
        formData[tile][type] = e;
      }else{
        if(Object.keys(e).length > 0){
          if(e.Code) formData[tile][type] = e.Code;
          if(e.Text){
            if(type === 'CompanyCode'){
              formData[tile]['CompanyName'] = e.Text;
              formData[tile]['OtherCompanyName'] = e.Code != '99999' ? e.Text : '';
            }
            if(type === 'Designation') formData[tile]['DesignationName'] = e.Text;
          }else{
            formData[tile][type] = e;  
          }
        }else{
          formData[tile][type] = e;
        }
      }
      
    }
    if (formData[tile]['extraParams']['validationError'] && formData[tile]['extraParams']['validationError']['errors'] && formData[tile]['extraParams']['validationError']['errors'][type]) delete formData[tile]['extraParams']['validationError']['errors'][type];
    setData(formData);
  }
  
  return (
    <>
    {loader ? <Loader /> : <React.Fragment />}
    <OtpPopUp onlyMobile={true} showError={showError} mobileNo={data && data.personalDetails.MobileNo} OtpValid={OtpValid} otpmsg={message} optHandle={optHandle} sendOtpAgain={Sendotp} OtpSubmit={OtpSubmit} isOpen={isOpen} setPopUpOpen={optClear} />
    {/* Header Start */}
    {/* <Header /> */}
    {/* Header End */}
    <section className={styles.cardForm}>
      <Image className={`imgResponsive ${styles.backgroundWave}`} src="/assets/images/sc-wave-form.png" width={123} height={32} layout="intrinsic" alt="Standard Chartered Journey" />
      <div className="container">
        <div className={styles.formWrap}>
          {/* Application Stage Div Start */}
          {activeTile < 4 && <ApplicationStage activeTile={activeTile} />}
          {/* Application Stage Div End */}
          {activeTile < 4 && 
          <div className={`${styles.cardsForms} ${styles.Details}`}>
            <h1 className={`${styles.webheading} text000c4d font20 fontsemiBold ${styles.centerheading} Innerheading`}>Standard Charted Credit Card Application!</h1>
            {/* Journey Start */}
            {activeTile === 0 && <PersonalDetails tile={TILENAMES[activeTile]} master={master} otpVerified={otpVerified} handleChange={handleChange} formData={data} />}
            {activeTile === 1 && <PropertyDetails  tile={TILENAMES[activeTile]} master={master} handleChange={handleChange} formData={data} />}
            {activeTile === 2 && <EmploymentDetails tile={TILENAMES[activeTile]} master={master} handleChange={handleChange} formData={data} />}
            {activeTile === 3 && <IncomeDetails tile={TILENAMES[activeTile]} master={master} handleChange={handleChange} formData={data} />}
            {/* Journey End */}
            {/* Navigation Div Start */}
            <p className="textError mb15">{ ErrorMessage}</p>
            <Navigation activeTile={activeTile} handleAction={handleAction} />
            {/* Navigation Div End */}
          </div>}
        </div>
      </div>
    </section>
    </>
  );
}
