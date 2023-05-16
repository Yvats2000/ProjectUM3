import styles from "./ApplicationForm.module.css";
import Image from "next/image";
import { Select as SelectBox, Error} from "../../../ui";
import InputText from '../../../../form/inputText'
import { InputSearch } from "../../../shared";

export const PropertyDetails = ({tile, master, handleChange, formData}) => {
  let data = formData[tile];
  let validationError = data['extraParams']['validationError'];
  return (
    <div className={`${styles.Details} ${styles.residential}`}>
      <figure className={styles.absImg}>
        <Image className={`imgResponsive`} src="/assets/images/ill-resid.svg" width={127} height={128} alt="Standard Chartered Property Details" />
      </figure>
      <p className="font16 opt80 mb15">Steps 2/4</p>
      <p className="font16 fontsemiBold text2828">Residential Info</p>
      <div className={styles.formDetails}>
        <div className={styles.InputsGrid}>
          {master && master.credit_cards && master.credit_cards.length>0 &&
            <div className={`form-item `}>
              <SelectBox name="ResType" required onChange={(e) => handleChange(e, 'ResType', tile)} >
                <>
                  <option value="" disabled selected>Residential Type*</option>
                  {master && master.residence_type &&  master.residence_type.map((e)=>{
                    return <option value={e.Code} key={e.Code} selected={e.Code === data.ResType ? 'selected' : ''}>{e.Description}</option>
                  })}
                </>
              </SelectBox>
              <Error validationError={validationError} name="ResType" />
            </div>
          }
          {master && master.credit_cards && master.credit_cards.length>0 &&
            <div className={`form-item `}>
              <SelectBox name="ResidentialStatus" required onChange={(e) => handleChange(e, 'ResidentialStatus', tile)}>
                <>
                  <option value="" disabled selected>Residential Status*</option>
                  {master && master.residential_status &&  master.residential_status.map((e)=>{
                    return <option value={e.Code} key={e.Code} selected={e.Code === data.ResidentialStatus ? 'selected' : ''}>{e.Description}</option>
                  })}
                </>
              </SelectBox>
              <Error validationError={validationError} name="ResidentialStatus" />
            </div>
          }
          <div className="form-item grid2Span">
            <InputText type="text"
              id="ResAddress1"
              name="ResAddress1"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'ResAddress1', tile)} 
              value={data.ResAddress1} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="FullName">Address Line 1 <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="ResAddress1" />
          </div>
          <div className="form-item">
            <InputText type="text"
              id="ResAddress4"
              name="ResAddress4"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'ResAddress4', tile)} 
              value={data.ResAddress4} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="FullName">Address Line 2 <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="ResAddress4" />
          </div>
          {master && master.credit_cards && master.credit_cards.length>0 &&
            <div className={`form-item `}>
              <SelectBox name="ResCity" required onChange={(e) => handleChange(e, 'ResCity', tile)} >
                <>
                  <option value="" disabled selected>Select City*</option>
                  {master && master.city &&  master.city.map((e)=>{
                    return <option value={e.Code} key={e.Code} selected={e.Code == data.ResCity ? 'selected' : ''}>{e.Description}</option>
                  })}
                </>
              </SelectBox>
              <Error validationError={validationError} name="ResCity" />
            </div>
          }
          <InputSearch validationError={validationError} name='ResPIN' masterName="pincode_master" value={data.ResPIN} handleChange={(e) => handleChange(e, 'ResPIN', tile)} tile={tile} label={`PIN Code <span class="colorRed">*</span>`} />  
        </div>
        
        <label className="checkInput text313541">
          <input 
            type="checkbox" 
            name="PermAddrSameAsResAddr" 
            className= {"form-check-input"}
            onChange={(e) => handleChange(e, 'PermAddrSameAsResAddr', tile)}
            defaultChecked={data.PermAddrSameAsResAddr === 'no' ? false : true}
            //value={data.PermAddrSameAsResAddr} 
            />
          <p className="text777 font12 mobfont12 lineHeight18 checkBoxText"> Permanent Address and Residential address</p>
        </label>
        <div className={`${styles.InputsGrid} mt35`}>
          <div className={`form-item grid2Span ${data.PermAddrSameAsResAddr==='yes'?'labelTop':''}`}>
            <InputText type="text"
              id="PermAddress1"
              name="PermAddress1"
              autoComplete="off"
              disabled = {data.PermAddrSameAsResAddr==='yes'?true:false}
              handleChange={(e) => handleChange(e, 'PermAddress1', tile)} 
              value={data.PermAddrSameAsResAddr==='yes'?data.ResAddress1 :data.PermAddress1} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="FullName">Address Line 1 <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="PermAddress1" />
          </div>
          <div className={`form-item ${data.PermAddrSameAsResAddr==='yes'?'labelTop':''}`}>
            <InputText type="text"
              id="PermAddress4"
              name="PermAddress4"
              autoComplete="off"
              disabled = {data.PermAddrSameAsResAddr==='yes'?true:false}
              handleChange={(e) => handleChange(e, 'PermAddress4', tile)} 
              value={data.PermAddrSameAsResAddr==='yes'?data.ResAddress4: data.PermAddress4} 
              className={ `formInput `}
              required={true}
              />
            <label htmlFor="FullName">Address Line 2 <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="PermAddress4" />
          </div>
          {master && master.credit_cards && master.credit_cards.length>0 &&
            <div className={`form-item mb20`}>
              <SelectBox name="PermCity" disabled = {data.PermAddrSameAsResAddr==='yes'?true:false} value={data.PermAddrSameAsResAddr==='yes'?data.ResCity:data.PermCity} required onChange={(e) => handleChange(e, 'PermCity', tile)} >
                <>
                  <option value="" disabled selected>Select City*</option>
                  {master && master.city &&  master.city.map((e)=>{
                    return <option value={e.Code} key={e.Code} selected={e.Code == data.PermCity ? 'selected' : ''}>{e.Description}</option>
                  })}
                </>
              </SelectBox>
              <Error validationError={validationError} name="PermCity" />
            </div>
          }
          <InputSearch validationError={validationError} disabled = {data.PermAddrSameAsResAddr==='yes'?true:false} name='PermPIN' masterName="pincode_master" value={data.PermAddrSameAsResAddr==='yes'?data.ResPIN:data.PermPIN}  handleChange={(e) => handleChange(e, 'PermPIN', tile)} tile={tile} label={`PIN Code <span class="colorRed">*</span>`} />  
        </div>
      </div>
    </div> 
  );
};