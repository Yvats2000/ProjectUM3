import styles from "./LoginScreen.module.css";
import { Button } from "../../ui/button/Button";
import { NavLink } from "../../ui";
import { loginSendOtp,loginOtpVerify } from "../../../services/login"
import React, { useState, useEffect } from "react";
import { getItemFromCookie,setItemInCookie } from '../../../helpers/cookie';
import { Loader } from "../../shared";
import Validation from '../../../form/Validation'
import InputText from '../../../form/inputText'
import Router from 'next/router'
import { decrypt_object } from "../../../helpers/Base64Encode";
export function LoginScreen() {
  const mobileData = {
    countryCode: '91',
    mobileNo:''
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      webengage.user.setAttribute("Category", "Login Page");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const otpInput = {
    otp1:'',
    otp2:'',
    otp3:'',
    otp4:'',
    otp5:'',
    otp6:''
  }
  const [mobile, setMobileNo] = useState(mobileData);
  const [errorMsg, setErrorMsg] = useState('');
  const [loginShow, setLoginshow] = useState(true);
  const [OtpValid, setOtpValid] = useState(otpInput);
  const [loader, setLoader] = useState(false);
  const [errorText, setErrorText] = useState(false);

  const sendLoginOtp = async () => {
    const autoToken = getItemFromCookie('autoToken');
    if (mobile.mobileNo !== '' && mobile.mobileNo.length === 10) {
      if (!autoToken) {
        const login = await loginSendOtp(mobile);
        if (login.status === 200) {
          let encodeData = decrypt_object(login.data.api_response, 'Object');
          setLoginshow(false);
          setErrorText(false);
          setErrorMsg(encodeData.message);
        }else if (login.status === 500) {
          setErrorText(true);
          setErrorMsg(login.message);
        } else if (login.status === 422) {
          setErrorText(true);
          setErrorMsg(login.message);
       }
      } 
      
      else {
        Router.push('/my-profile');
      }
    }
    else {
      setErrorText(true);
      setErrorMsg('Please Enter 10 Digit of your Mobile No.')
    }
  }
  const otpVerify = async () => {
    const Fullotp = OtpValid.otp1 + OtpValid.otp2 + OtpValid.otp3 + OtpValid.otp4 + OtpValid.otp5 + OtpValid.otp6;
    if(Fullotp){
      setLoader(true);
      let otp = {
        "otp": Fullotp,
        "mobileNo":mobile.mobileNo
      } 
      const OtpVlid = await loginOtpVerify(otp);
      
      if (OtpVlid && OtpVlid.status === 200) {
        let encodeData = decrypt_object(OtpVlid.data.api_response, 'Object');
        setLoader(true);
        if (encodeData.access_token !== '' && encodeData.access_token !== undefined) {
          webengage.user.login(mobile.mobileNo);
          setItemInCookie('autoToken', encodeData.access_token,encodeData.expires_in);
          Router.push('/my-profile');
        } else {
          setLoader(false);
          setErrorText(true);
          setErrorMsg('Something go wrong Please try Again');
        }
        
      } else if (OtpVlid.message) {
        setLoader(false);
        setErrorMsg(OtpVlid.message);
      }
    } else {
      setErrorText(true);
      setErrorMsg('Please Enter OTP!')
    }
  }
  
  const changeNumber = () => {
    setErrorMsg('');
    setMobileNo(mobileData);
    setLoginshow(true);
  }
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    let isValid = isAllowed(value, name);
    if (isValid) {
      setMobileNo({ ...mobile, [name]: value });
    }
  };
  const optHandle = (name,event) => {
    let isValid = isAllowed(event.target.value, name);
    if (isValid) {
      setOtpValid({ ...OtpValid,[name]: event.target.value });
    }
    
  } 
  const isAllowed = (value, type) => {
    switch (type){
      case 'mobileNo':
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 11);
      case 'otp1':
      case 'otp2':
      case 'otp3':
      case 'otp4':
      case 'otp5':
      case 'otp6':
        return  ((value === '' || Validation.validateNumber(value)) && value.length < 2);
      default:
        return  true;
    }
  }
   return (
    <section className={`${styles.login} ${!loginShow?styles.active:''}`}>
    <div className="container">
      <div className={styles.loginBox}>
        <div className={styles.loginContent}>
             <div className={styles.logoBox}>
                <NavLink href="/" exact>
                  <img src={'/assets/images/logoBlack.svg'} width={100} height={32} className="imgResponsive" alt="Urban Money" />
                </NavLink>
             </div>
          <p className="font20 mb10 fontMedium">Take control of the service</p>
           <h3 className="font24 mb30 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 ">Experience during your home loan journey</h3>
           <ul className={styles.bulletList}>
             <li>Provide more information about your loan requirements</li>
             <li>Rate your Experience with us and give feedback</li>
             <li>View assigned angent&apos;s profile & request for change if required</li>
           </ul>
           <figure className={styles.loginTextimg}><img src={'/assets/images/login-left-side-banner.svg'} alt="Urban Money Login" width={516} height={252} className="imgResponsive" /></figure>
        </div>
        <div className={styles.loginForm}>
          <figure className={styles.loginIcon}><img src={'/assets/images/ill_mobile-ac.svg'} alt="Urban Money Login" width={147} height={150}  className="imgResponsive" /></figure>
          <h1>Log in</h1>
             <p className={`${styles.loginSub} mb50`}>to access your Account</p>
             {loginShow?<div className="form-item contBox ">
                  <span className="text303542 font12 contCode fontMedium">+91</span>  
               <InputText
              type="text"
              name="mobileNo"
              maxLength={10}
              className="formInput"
              id="mobileNo"
              required={true}
              handleChange={(e) => handleChange(e)}
              value={mobile.mobileNo}
            />
               <label className="font14 fontMedium textWhite formLabel">Mobile No.</label>
             </div>:<div className="formGroup">
              <label className="font14 mb10 fontMedium textWhite formLabel">Enter OTP</label>
              <form>
               <div className={styles.otpBox}>
                   
                     <input
                       type="number"
                       name="otp1"
                       value={OtpValid.otp1}
                       onChange={e =>optHandle("otp1", e)}
                       className="formControl"
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
               
                onChange={e => optHandle("otp3", e)}
                     
                tabIndex="3" maxLength="1" onKeyUp={e => inputfocus("otp3",e)}

                />
                <input
                name="otp4"
                type="number"
                autoComplete="off"
                className="formControl"
                value={OtpValid.otp4}
               
                onChange={e => optHandle("otp4", e)}
                       
                tabIndex="4" maxLength="1" onKeyUp={e => inputfocus("otp4",e)}

                  />
                  <input
                name="otp5"
                type="number"
                autoComplete="off"
                className="formControl"
                value={OtpValid.otp5}
               
                onChange={e => optHandle("otp5", e)}
                      
                tabIndex="5" maxLength="1" onKeyUp={e => inputfocus("otp5",e)}

                  />
                  <input
                name="otp6"
                type="number"
                autoComplete="off"
                className="formControl"
                value={OtpValid.otp6}
                onChange={e => optHandle("otp6", e)}
                tabIndex="6" maxLength="1" onKeyUp={e => inputfocus("otp6",e)}
              />
                  
                   </div></form>
              <div className={styles.resendOtp}>
                <span className="font14 mb10 fontMedium textWhite formLabel cursorPointer" onClick={()=>changeNumber()}>Change Mobile No.</span>     
                <span className="font14 mb10 fontMedium textWhite formLabel cursorPointer" onClick={()=>sendLoginOtp()}>Resend OTP</span>     
              </div>
            </div>}
             <p className={`mb10 ${errorText?'loginError':'textWhite'} font12`}>{errorMsg}</p>
          <div className={styles.loginBtn}>
            <Button className="btn loginBtn font14 btn100" onClick={loginShow?()=>sendLoginOtp():()=>otpVerify()}>{loginShow?'Proceed to Login':'Enter OTP'} <em className="icon-arrow-right"></em></Button>
          </div>
        </div>
      </div>
    </div>
    {loader?<Loader/>:''}
  </section>
  );
}
