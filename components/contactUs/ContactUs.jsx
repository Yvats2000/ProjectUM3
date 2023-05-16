import styles from "./ContactUs.module.css";
import { contactUs } from '../../services/contactUs';
import { Button } from "../ui/button";
import Image from "next/image";
import React, { useState } from "react";
import  contactUsData  from "../../data/contactUs.json";
import InputText from "../../form/inputText";
import { PopUp, Loader } from "../shared";
import { isIndianMobile, isAlphabet } from "../../form/inputValidators";

export function ContactUs() {
	const [open,setOpen] = useState(false);
	const [loader,setLoader] = useState(false);
	const [formDetails, setFormDetails] = useState({
			name: "",
			email: "",
			mobileNo : "",
			countryCode : "+91",
			dropdown: "I Am",
			Msg : ""
	})
	const [formErrors, setFormErrors] = useState({})
	const [isSubmit, setIsSubmit] = useState(false)

	const handleChange = (e) => {
		const { name, value} = e.target;
		setFormDetails({ ...formDetails, [name]: value });
		setFormErrors({...formErrors , [name]: ''});		
	};
	let title = "Query submitted"
	let thankyou = "Thank You!"
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon."

	const handleSubmit = async(e) => {
		e.preventDefault(); 
		setFormErrors(validate(formDetails))
		setIsSubmit(true) 
		if(Object.keys(formErrors).length === 0 && isSubmit){
			setLoader(true);
			let payload = await contactUs({formDetails});
			setFormDetails({
				name: "",
				email: "",
				mobileNo : "",
				countryCode : "+91",
				dropdown: "I Am",
				Msg : ""
			});
			setLoader(false);
			setOpen(true)
		}
	}
	
	const validate = (values) => {
		const errors = {}
		const emailRegex = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'); 
		let pattern = /[a-z]/g;
		// if(  formDetails.name.length >= 4 || formDetails.name.length <= 25){
		// 	errors.name = "Please enter the name!";
		// } 
		if(!values.name){
			errors.name = "Please enter the Name"
		}
		else if(values.name.length <3 || values.name.length >=25){
			errors.name = 'Please Enter the valid name'
		}
		// else if(!pattern.test(formDetails.name)){
		// 	errors.name = "Please enter only alphabets"
		// }
		if(!values.email){
		  errors.email = "Please enter the email";
		}else if(!emailRegex.test(formDetails.email)) {
			errors.email = "Please enter the email in proper format"
		}
		if(!values.mobileNo){
		  errors.mobileNo = "Mobile is required!";
		} else if(formDetails.mobileNo.length !== 10){
			errors.mobileNo = "Please enter the valid mobile"
		}
		return errors
	  }

  return (
	<>
	{loader ? <Loader /> : <React.Fragment />}
	{open ? <PopUp title={title} thankyou={thankyou} text={text} setThankYouPopUp={() => setOpen(false)} /> : <React.Fragment /> }
	<div className={styles.contact}>
		<div className= {styles.banner}>
			<div className="container">
				<div className= {styles.row}>
					<div className= {styles.form}>
						<form className= {styles.formBox} id="contactUsDetail" type="post">
							<input type="hidden" name="formType" value="contact" />
							<h5>Get in Touch</h5>
							<div className='form-item'>  
								<InputText  
									type="text" 
									// placeholder="Name" 
									name="name" 
									className= { `${ formErrors && formErrors.name && formErrors.name.length > 0 ? "formInput name error" : "formInput name"}`}
									value={formDetails.name} 
										  autoComplete="none"
										  required={true}
									handleChange={handleChange}
									validateInput={isAlphabet} 
									onKeyUp={isAlphabet} 
									onKeyDown={isAlphabet} 
									  />
									  <label className="font12 fontMedium formLabel">Name</label>
								<span className="errorText">{formErrors.name}</span>
							</div>
							<div className='form-item'>
									  <input type="text" required={true}  name="email" autoComplete="off" className={`${formErrors && formErrors.email && formErrors.email.length > 0 ? "formInput verifyEmail error" : "formInput verifyEmail "}`} value={formDetails.email} onChange={handleChange} />
									  <label className="font12 fontMedium formLabel">E-mail</label>
								<span className="errorText">{formErrors.email}</span>
							</div>
								  <div className='form-item contBox'>
									<span className="text303542 font12 contCode fontMedium">+91</span>
								{/* <div className={` "inputGroupAdd" ${styles.selectBox}`}>
									<select className={`${ formErrors && formErrors.mobileNo && formErrors.mobileNo.length > 0 ? "formControl countryCode error" : "formControl countryCode "}`}  name="countryCode" value={formDetails.countryCode} onChange={handleChange} >
										<option value="91">+91</option>
									</select>
								</div> */}
								<InputText 
									type="text" 
									// placeholder="Phone Number" 
									className= {`${ formErrors && formErrors.mobileNo && formErrors.mobileNo.length > 0 ? "formInput allownumeric mobileNo error" : "formInput allownumeric mobileNo"}`}  name="mobileNo"  
										  value={formDetails.mobileNo} 
										  required={true}
									handleChange={handleChange}
									validateInput={isIndianMobile} 
									  />
									  <label className="font12 fontMedium formLabel">Mobile</label>
								 <span className="errorText">{formErrors.mobileNo}</span>
							</div>
							<div className='form-item'>
								<div className={styles.selectBox}>
									<select id="ddlIam" name="dropdown" className= "formInput selectFull freeze" value={formDetails.dropdown} onChange={handleChange}>
										<option value="I Am">I Am</option>
	 									<option value="An Existing Client of Square Yards or Square Capital ">An Existing Client of Square Yards or Square Capital </option>
										<option value="Looking to buy/invest in property">Looking to buy/invest in property</option>
										<option value="Looking for a Loan">Looking for a Loan</option>
										<option value="A Real Estate Agent/Financial Advisor looking for Partnership">A Real Estate Agent/Financial Advisor looking for Partnership</option>
										<option value="A Developer/Real Estate builder looking for Partnership">A Developer/Real Estate builder looking for Partnership</option>
										<option value="Looking for Job">Looking for Job</option>
										<option value="Others">Others</option>
									</select>
								</div>
							</div> 
							 <div className='form-item'>
								<textarea className= "formInput" name="Msg" placeholder="Message" cols="30" rows="5" value={formDetails.Msg} onChange={handleChange}></textarea>
							</div>
							<Button className="btn btn-primary textCenterSm" onClick={(e) => handleSubmit(e)}><em className="icon-phone-o"></em>Get a Call Back</Button>
						</form>
					</div>
					<div className={styles.bannerTagline}>
						<h1 className="font28 mb30 textWhite Innerheading fontMedium lineHeight36 ">Contact Us</h1>
						  <p className={styles.subText}>We would love to hear from you! Call us on our India</p>
						  <p className={styles.tollFree}><span>Toll Free Number 1800 208 3344</span> or Fill the form</p>
					</div>
				</div>
			</div>
		</div>
		<div className="container">
			<div className= {styles.addressBox}>
				<picture><Image className="img-responsive" src={process.env.IMAGE_BASEURL + '/images/call.png'} width={1146} height={136} alt="call"/></picture>
				<ul>
					  <li>India Corporate Office</li>
					<li><span>Gurgaon  <br />
					Good Earth Business Bay, 9th Floor, <br/>Sector 58, Gurgaon -122011. Toll Free No. : <strong>1800 208 3344</strong></span>
					</li>
				</ul>
			</div>
			<div className= {styles.officeLocation}>
				{contactUsData.map((data,index) => 
					<div className={styles.particularAddre} key={index}>
					 	<strong>{data.city}</strong>					
						<p><span>{data.address} {/*<br />Mobile No. <strong>{data.mobile}</strong>*/}</span></p>
					</div>
			)}
			</div>
		</div>
	</div>
	</>
);
}
