import styles from "./ApplicationForm.module.css";
import Image from "next/image";
import DatePicker from "react-datepicker";
import moment from 'moment';
import { Select as SelectBox, Select,NavLink, Error} from "../../../ui";
import 'react-datepicker/dist/react-datepicker.css';
import InputText from '../../../../form/inputText'

export const PersonalDetails = ({tile, master, handleChange, formData, otpVerified}) => { 

  let data = formData[tile];
  let validationError = data['extraParams']['validationError'];
  return (
    <div className={`${styles.Details} ${styles.personal}`}>
      <figure className={styles.absImg}>
        <Image className={`imgResponsive`} src="/assets/images/personaldetails.svg" width={131} height={138} alt="Standard Chartered Personal Details" />
      </figure>
      <p className="font16 opt80 mb15">Steps 1/4</p>
      <p className="font16 fontsemiBold text2828">Personal Details</p>
      <div className={styles.formDetails}>
        <div className={styles.InputsGrid}>  
          {master && master.credit_cards && master.credit_cards.length>0 &&
            <div className={`form-item `}>
              <SelectBox name="CreditCardApplied" required onChange={(e) => handleChange(e, 'CreditCardApplied', tile)}>
              <>
                <option value=""  disabled selected>Select Credit Card*</option>
                {master && master.credit_cards &&  master.credit_cards.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code == data.CreditCardApplied ? 'selected' : ''}>{e.Description.replace(/(^\w|\s\w)/g, m => m.toUpperCase())}</option>
                  })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="CreditCardApplied" />
            </div>
          }
          <div className="item grid3Span grid2SpanMD">
            <p className="font14 text313541">Do you have an existing Standard Chartered Bank Credit Card?<span className="colorRed marg5L">*</span></p>
            <div className={styles.radioWrap}>
              <label className="radioInput text313541">
                <input className="form-check-input" type="radio" name="HasExistingScbCC" value="yes" defaultChecked={data.HasExistingScbCC === 'yes' ? 'checked' : ''} onChange={(e) => handleChange(e, 'HasExistingScbCC', tile)} />
                <span className="radioCheck"></span>
                <span className="radioText text313541 font14">Yes</span>
              </label>
              <label className="radioInput text313541">
                <input className="form-check-input" type="radio" name="HasExistingScbCC" value="no" defaultChecked={data.HasExistingScbCC === 'no' ? 'checked' : ''} onChange={(e) => handleChange(e, 'HasExistingScbCC', tile)} />
                <span className="radioCheck"></span>
                <span className="radioText text313541 font14">No</span>
              </label>
              <Error validationError={validationError} name="HasExistingScbCC" />
            </div>
          </div>
          <div className={`item grid3Span grid2SpanMD`}>
            <p className="font14 text313541">Do you have an existing relationship with Standard Chartered Bank?<span className="colorRed marg5L">*</span></p>
              <div className={styles.radioWrap}>
                <label className="radioInput text313541">
                  <input className="form-check-input" type="radio" name="IsExtngScbCust" value="yes"  defaultChecked={data.IsExtngScbCust === 'yes' ? 'checked' : ''} onChange={(e) => handleChange(e, 'IsExtngScbCust', tile)} />
                  <span className="radioCheck"></span>
                  <span className="radioText text313541 font14">Yes</span>
                </label>
                <label className="radioInput text313541">
                  <input className="form-check-input" type="radio" name="IsExtngScbCust" value="no" defaultChecked={data.IsExtngScbCust === 'no' ? 'checked' : ''} onChange={(e) => handleChange(e, 'IsExtngScbCust', tile)} />
                  <span className="radioCheck"></span>
                  <span className="radioText text313541 font14">No</span>
                </label>
                <Error validationError={validationError} name="IsExtngScbCust" />
              </div>
          </div>
          {master && master.customer_relation_type && master.customer_relation_type.length>0 && data.IsExtngScbCust === 'yes' &&
            <div className={`form-item `}>
              <SelectBox name="CustReltnType" required onChange={(e) => handleChange(e, 'CustReltnType', tile)} >
              <>
                <option value="" disabled selected>Relation Type*</option>
                {master && master.customer_relation_type &&  master.customer_relation_type.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code == data.CustReltnType ? 'selected' : ''}>{e.Description}</option>
                  })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="CustReltnType" />
            </div>
          }
          {data.IsExtngScbCust === 'yes' && <>
          <div className={`form-item `}></div>
          <div className={`form-item `}></div></>}
          <div className={styles.titleName}>
            {master && master.title && master.title.length>0 && 
              <div className={`form-item ${styles.selectBoxCustom}`}>
                <Select className={`formInput ${styles.formInputSelect}`} name="Title" onChange={(e) => handleChange(e, 'Title', tile)} >
                    <>
                    <option value="" disabled selected>Title*</option>
                    {master && master.title &&  master.title.map((e)=>{
                    return <option value={e.Code} key={e.Code} selected={e.Code === data.Title ? 'selected' : ''}>{e.Description}</option>
                    })}
                    </>
                </Select>
                <Error validationError={validationError} name="Title" />
              </div>
            } 
            <div className="form-item">
              <InputText type="text"
                id="FirstName"
                name="FirstName"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'FirstName', tile)} 
                value={data.FirstName} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="FullName">First Name <span className="colorRed">*</span></label>
              <Error validationError={validationError} name="FirstName" />
            </div>
          </div>
          <div className="form-item">
            <InputText type="text"
              id="MiddleName"
              name="MiddleName"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'MiddleName', tile)} 
              value={data.MiddleName} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="FullName">Middle Name</label>
          </div>
          <div className="form-item">
            <InputText type="text"
              id="LastName"
              name="LastName"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'LastName', tile)} 
              value={data.LastName} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="FullName">Last Name <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="LastName" />
          </div>
          {master && master.gender && master.gender.length>0 && 
            <div className={`form-item `}>
              <SelectBox name="Gender" required onChange={(e) => handleChange(e, 'Gender', tile)} >
              <>
                <option value="" disabled selected>Gender *</option>
                {master && master.gender &&  master.gender.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code == data.Gender ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="Gender" />
            </div>
          }
          <div className="formGroup mb10 zIndex4">
            {/* <label  className="font12 fontMedium formLabel">Date of Birth</label> */}
            <div className="inputIcon">
              <dd className="calendar">
              <Image src={process.env.IMAGE_BASEURL + '/images/ic_calendar.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" />                  </dd>
              <DatePicker  
                dateFormat="dd/MM/yyyy"
                name="DOB"
                autoComplete="off"
                className= {`formInput `}
                selected={data.DOB && new Date(data.DOB)}
                placeholderText = "DOB (DD/MM/YYYY)*"
                onChange={(e) => handleChange(e, 'DOB', tile, 'DOB')} 
                showYearDropdown
                yearDropdownItemNumber={50}
                scrollableYearDropdown
                minDate={moment().subtract(59, "years")._d}
                maxDate={moment().subtract(18, 'years')._d}
              />
              <Error validationError={validationError} name="DOB" />
            </div>
          </div>
          <div className={`form-item contBox `}>
            <span className="text303542 font12 contCode fontMedium">+91</span>
            <InputText
              type="text"
              name="MobileNo"
              maxLength={10}
              className={`formInput `}
              required={true}
              handleChange={(e) => handleChange(e, 'MobileNo', tile)}
              value={data.MobileNo}
            />
            <label htmlFor="mobileNo" className="font12 fontMedium formLabel">Mobile No. <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="MobileNo" />
            {otpVerified ? <p className={styles.verifiedOtp}>Verified <Image className={`imgResponsive`} width = {20} height = {20} src="/assets/images/verified-mark.svg" alt="Urban Money" /></p>  : null}
          </div>
          <div className="form-item">
            <InputText type="text"
              id="Email"
              name="Email"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'Email', tile)} 
              value={data.Email} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="FullName">Email Address <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="Email" />
          </div>
          {master && master.qualification && master.qualification.length>0 &&
            <div className={`form-item `}>
              <SelectBox name="Qualification" required onChange={(e) => handleChange(e, 'Qualification', tile)} >
              <>
                <option value="" disabled selected>Qualification*</option>
                {master && master.qualification &&  master.qualification.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code === data.Qualification ? 'selected' : ''}>{e.Description}</option>
                  })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="Qualification" />
            </div>
          }
        </div>
        <label className="checkInput text313541">
          <input 
            type="checkbox" 
            name="ConsentStatement" 
            className= {"form-check-input"}
            onChange={(e) => handleChange(e, 'ConsentStatement', tile)}
            defaultChecked={data.ConsentStatement ? true : false}
            value="I have read, understood and agreed to Terms & Conditions of Standard chartered bank. I expressly provide myconsent to the Bank and its representatives to use my contact information submitted to the Bank for communicating with me through SMS, or any other medium to provide information regarding myapplication/Credit" />
          <p className="text777 font12 mobfont12 lineHeight18 checkBoxText">I have read, understood and agreed to Terms & Conditions of Standard chartered bank. I expressly provide myconsent to the Bank and its representatives to use my contact information submitted to the Bank for communicating with me through SMS, or any other medium to provide information regarding myapplication/Credit 
          <NavLink href={`${process.env.BASE_URL}/terms-and-conditions`} className="textLink cursorPointer"></NavLink>
          </p>
        </label>
      </div>
    </div> 
  );
};