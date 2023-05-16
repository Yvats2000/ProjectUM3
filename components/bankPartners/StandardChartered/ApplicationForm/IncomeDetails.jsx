import styles from "./ApplicationForm.module.css";
import Image from "next/image";
import { Select as SelectBox, Error} from "../../../ui";
import InputText from '../../../../form/inputText'
import DatePicker from "react-datepicker";
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export const IncomeDetails = ({tile, master, handleChange, formData}) => {
  let data = formData[tile];
  let validationError = data['extraParams']['validationError'];
    return (
      <div className={`${styles.Details} ${styles.income}`}>
        <figure className={styles.absImg}>
          <Image className={`imgResponsive`} src="/assets/images/ill-inc.svg" width={130} height={130} alt="Standard Chartered Income Details" />
        </figure>
        <p className="font16 opt80 mb15">Steps 4/4</p>
        <p className="font16 fontsemiBold text2828">Income Details</p>
        <div className={styles.formDetails}>
          <div className={styles.InputsGrid}>
            <div className="form-item">
              <InputText type="text"
                id="PAN"
                name="PAN"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'PAN', tile)} 
                value={data.PAN} 
                className={ `formInput textUC`}
                required={true}
              />
              <label htmlFor="PAN">PAN <span className="colorRed">*</span></label>
              <Error validationError={validationError} name="PAN" />
            </div>
            <div className="form-item">
              <InputText type="text"
                id="MonthlyVarBonus"
                name="MonthlyVarBonus"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'MonthlyVarBonus', tile)} 
                value={data.MonthlyVarBonus} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="MonthlyVarBonus">Monthly Variable Bonus</label>
            </div>
            {master && master.other_document_type && master.other_document_type.length>0 && 
              <div className={`form-item`}>
                <SelectBox name="OtherDocType" required onChange={(e) => handleChange(e, 'OtherDocType', tile)} >
                <>
                  <option value="" disabled selected>Other Document Type*</option>
                  {master && master.other_document_type &&  master.other_document_type.map((e)=>{
                    return <option value={e.Code} key={e.Code} selected={e.Code === data.OtherDocType ? 'selected' : ''}>{e.Description}</option>
                  })}
                </>
                </SelectBox>
                <Error validationError={validationError} name="OtherDocType" />
              </div>
            }
            <div className="form-item">
              <InputText type="text"
                id="OtherDocNo"
                name="OtherDocNo"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'OtherDocNo', tile)} 
                value={data.OtherDocNo} 
                className={ `formInput textUC`}
                required={true}
              />
              <label htmlFor="OtherDocNo">Other Document Type Document Number <span className="colorRed">*</span></label>
              <Error validationError={validationError} name="OtherDocNo" />
            </div>
            {data.OtherDocType === 'passport' || data.OtherDocType === 'drivingLicence' ?
            <div className="formGroup mb10 zIndex4">
              {/* <label  className="font12 fontMedium formLabel">Date of Birth</label> */}
              <div className="inputIcon">
                <dd className="calendar">
                <Image src={process.env.IMAGE_BASEURL + '/images/ic_calendar.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" />                  </dd>
                <DatePicker  
                  dateFormat="dd/MM/yyyy"
                  name="OtherDocExpDate"
                  autoComplete="off"
                  className= {`formInput `}
                  selected={data.OtherDocExpDate && new Date(data.OtherDocExpDate)}
                  placeholderText = "Document Expiry Date (DD/MM/YYYY)*"
                  onChange={(e) => handleChange(e, 'OtherDocExpDate', tile, 'DOB')} 
                  showYearDropdown
                  yearDropdownItemNumber={50}
                  scrollableYearDropdown
                  minDate={moment().subtract(59, "years")._d}
                />
                <Error validationError={validationError} name="OtherDocExpDate" />
              </div>
            </div> : null}
            {formData['employmentDetails'].IncomeProof === 'T0356' && <>
            <div className="form-item">
              <InputText type="text"
                id="PrevYearTaxableIncome"
                name="PrevYearTaxableIncome"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'PrevYearTaxableIncome', tile)} 
                value={data.PrevYearTaxableIncome} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="PrevYearTaxableIncome">Previous Year Taxable Income</label>
              <Error validationError={validationError} name="PrevYearTaxableIncome" />
            </div>
            <div className="form-item">
              <InputText type="text"
                id="ProfessionalIncome"
                name="ProfessionalIncome"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'ProfessionalIncome', tile)} 
                value={data.ProfessionalIncome} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="ProfessionalIncome">Professional Income</label>
              <Error validationError={validationError} name="ProfessionalIncome" />
            </div>
            <div className="form-item">
              <InputText type="text"
                id="BusinessIncome"
                name="BusinessIncome"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'BusinessIncome', tile)} 
                value={data.BusinessIncome} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="BusinessIncome">Business Income</label>
              <Error validationError={validationError} name="BusinessIncome" />
            </div>
            <div className="form-item">
              <InputText type="text"
                id="IncomeDepreciation"
                name="IncomeDepreciation"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'IncomeDepreciation', tile)} 
                value={data.IncomeDepreciation} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="IncomeDepreciation">Income Depreciation</label>
              <Error validationError={validationError} name="IncomeDepreciation" />
            </div>
            <div className="form-item">
              <InputText type="text"
                id="DirectorRenumeration"
                name="DirectorRenumeration"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'DirectorRenumeration', tile)} 
                value={data.DirectorRenumeration} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="DirectorRenumeration">Director Renumeration</label>
              <Error validationError={validationError} name="DirectorRenumeration" />
            </div>
            <div className="form-item">
              <InputText type="text"
                id="OtherIncome"
                name="OtherIncome"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'OtherIncome', tile)} 
                value={data.OtherIncome} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="OtherIncome">Other Income</label>
              <Error validationError={validationError} name="OtherIncome" />
            </div></>}
            {formData['employmentDetails'].IncomeProof === 'T0069' && <>
            <div className="form-item">
              <InputText type="text"
                id="SalCreditBankStmnt"
                name="SalCreditBankStmnt"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'SalCreditBankStmnt', tile)} 
                value={data.SalCreditBankStmnt} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="SalCreditBankStmnt">Salary Credit in Bank Statement</label>
              <Error validationError={validationError} name="SalCreditBankStmnt" />
            </div>
            <div className="form-item">
              <InputText type="text"
                id="MonthlySalesTurnOver"
                name="MonthlySalesTurnOver"
                autoComplete="off"
                handleChange={(e) => handleChange(e, 'MonthlySalesTurnOver', tile)} 
                value={data.MonthlySalesTurnOver} 
                className={ `formInput`}
                required={true}
              />
              <label htmlFor="MonthlySalesTurnOver">Monthly Sales Turnover Amount</label>
              <Error validationError={validationError} name="MonthlySalesTurnOver" />
            </div></>}
          </div>
        </div>
      </div>  
    );
  };