import styles from "./BecomePartner.module.css";
import Image from "next/image";
import InputText from '../../form/inputText'
import React, { useState } from "react";
import { isIndianMobile} from '../../form/inputValidators'
import { BecomePatner } from "../../services/contactUs";
import { PopUp, Loader } from "../shared";
import{Button} from "../ui/button/Button";

export const BecomePartner = () => {
  const [open,setOpen] = useState(false);
  const [loader,setLoader] = useState(false);
  const [MobileNo, setMobileNo] = useState({
    countryCode : "+91",
    mobileNo : "",
    error : ""
	})
  const [error,setError] = useState()

  const handleChange = (e) => {
		const { name, value} = e.target;
		setMobileNo({ ...MobileNo, [name]: value });
    setError("")		
  };
  let title = "App link sent"
  let thankyou = "SMS sent"
  let text = "Thank you for choosing us. The SMS containing the link of the Urban Money Partner App has been sent to the entered mobile no."

  const sendMsg = async() => {
    if(MobileNo.mobileNo.length == 10){
      let data = {
      "countryCode": 91,
      "mobileNo": MobileNo.mobileNo
    }
    setLoader(true);
    let msg = await BecomePatner(data)
    setMobileNo({ ...MobileNo, mobileNo: '' });
    setLoader(false)
    setOpen(true)
  }else{
    setError("Please enter valid 10 Digit Mobile Number")
  }
}

   return (
   <>
   {loader ? <Loader /> : <React.Fragment />}
   {open ? <PopUp title={title} thankyou={thankyou} text={text} setThankYouPopUp={() => setOpen(false)} /> : <React.Fragment /> }
    <section className={styles.partnerBanner}>
      <div className="container ">
        <div className={styles.partnerBox}>
          <div className={`${styles.playImg}`}>
            <img src="/assets/images/become-a-partner-bn.png" alt="become-a-partner-banner" className="imgResponsive" />
          </div>
          <div className={styles.googlePlayBox}>
            <div className={styles.googlePlay}>
            <a href="https://play.google.com/store/apps/details?id=com.app.umpartner" rel="noreferrer" target="_blank" >
            <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/images/google-play-badge.svg'} width={112} height={40} alt="Google Play App"/> 
            </a>
            <a href="https://apps.apple.com/us/app/urban-money-partner/id1600202687" target="_blank" rel="noreferrer" >
            <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/images/app-store-badge.svg'} width={117} height={40} alt="App Store App"/>
              </a>
            </div>
            <h1 className={`font24 textBlack fontMedium ${styles.heading}`}>Urban Money Partner Business Program</h1>
            <p className={` ${styles.bannerPlayText} text444 font14 `}>Designed exclusively to help Urban Money (Square Capital) authorized partners, the Urban Money Partner app lets you view offers, earnings and cases updates in real time, and get privileged access for your exclusive loan offers running across various banks. You can also track your submitted cases in real time, use the fabulous loyalty programs to improve your revenues, and stay ahead of your competitors.</p>
            <div className={styles.PlayStoreFrom}>
              <label className={` ${styles.labelTetxt}text444 font14 fontBold `}>Enter Your Mobile Number</label>
                 <div className={`form-item contBox ${styles.appForm}`}>
                  <span className="text303542 font12 contCode fontMedium">+91</span>
                   <InputText type="number" value={MobileNo.mobileNo} minlength="10" maxlength="10" name="mobileNo" required={true} className={`${styles.formcontrol} formInput`} validateInput={isIndianMobile} handleChange={handleChange} />
                   <label className="font12 fontMedium formLabel">Mobile No.</label>
                  <Button className={`btn btn-primary  ${styles.btnPlaySubmit}`} onClick={sendMsg}>Get App Link</Button>
                  <span className="errorText">{error}</span>
              </div>
                  
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className={styles.partnerList}>
      <div className="container">
        <p className="font14 textBlack fontMedium mb20">Stay ahead of your competitors by using Urban Money Partner App designed exclusively to help you in all ways possible</p>
        <ul className={styles.partnerListItme}>
          <li>
            <figure><Image src={process.env.IMAGE_BASEURL + '/images/picon1.svg'} width = {66} height = {60} className="ImageResponsive" alt="dashboard icon"/></figure>
            <h2 className="font14 lineHeight20 fontMedium">
              One view dashboard for all your activities
            </h2>
          </li>
          <li>
            <figure><Image src={process.env.IMAGE_BASEURL + '/images/picon2.svg'} width = {65} height = {60} className="ImageResponsive" alt="latest update icon"/></figure>
            <h2 className="font14 lineHeight20 fontMedium">
              Get the latest updates on bank offers
            </h2>
          </li>
          <li>
            <figure><Image src={process.env.IMAGE_BASEURL + '/images/picon3.svg'} width = {60} height = {60} className="ImageResponsive" alt="realtime tracking icon"/></figure>
            <h2 className="font14 lineHeight20 fontMedium">
              Realtime tracking of submitted cases progress
            </h2>
          </li>
          <li>
            <figure><Image src={process.env.IMAGE_BASEURL + '/images/picon4.svg'} width = {60} height = {60} className="ImageResponsive" alt="dedicated dashboard icon"/></figure>
            <h2 className="font14 lineHeight20 fontMedium">
              Dedicated dashboard for lead status updates for easy lead management
            </h2>
          </li>
          <li>
            <figure> <Image src={process.env.IMAGE_BASEURL + '/images/picon5.svg'} width = {60} height = {60} className="ImageResponsive" alt="realtime update icon"/></figure>
            <h2 className="font14 lineHeight20 fontMedium">
              Realtime updates on commission earnings
            </h2>
          </li>
        </ul>          
      </div>
    </section>
   </>
  );
}
