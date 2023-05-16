import styles from "./ApplicationForm.module.css";
import Image from "next/image";
import { Select as SelectBox, Error} from "../../../ui";
import InputText from '../../../../form/inputText';
import { InputSearch } from "../../../shared";

export const EmploymentDetails = ({tile, master, handleChange, formData}) => {
  let data = formData[tile];
  let validationError = data['extraParams']['validationError'];
  return (
    <div className={`${styles.Details} ${styles.employment}`}>
      <figure className={styles.absImg}>
        <Image className={`imgResponsive`} src="/assets/images/ill-empy.svg" width={130} height={130} alt="Standard Chartered Employment Details" />
      </figure>
      <p className="font16 opt80 mb15">Steps 3/4</p>
      <p className="font16 fontsemiBold text2828">Employment Details</p>
      <div className={styles.formDetails}>
        <div className={styles.InputsGrid}>
          <div className="form-item">
            <InputText type="text"
              id="NumOfDependents"
              name="NumOfDependents"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'NumOfDependents', tile)} 
              value={data.NumOfDependents} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="NumOfDependents">Number of Dependents <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="NumOfDependents" />
          </div>
          {master && master.employment_type && master.employment_type.length>0 && 
            <div className={`form-item`}>
              <SelectBox name="EmpType" required onChange={(e) => handleChange(e, 'EmpType', tile)}>
              <>
                <option value="" disabled selected>Employment Type*</option>
                {master && master.employment_type &&  master.employment_type.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code == data.EmpType ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="EmpType" />
            </div>
          }
          {master && master.banks && master.banks.length>0 && data.EmpType === '1' ?
            <div className={`form-item`}>
              <SelectBox name="SalaryBankAcc" required onChange={(e) => handleChange(e, 'SalaryBankAcc', tile)} >
              <>
                <option value="" disabled selected>Salaried Bank Account With*</option>
                {master && master.banks &&  master.banks.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code == data.SalaryBankAcc ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="SalaryBankAcc" />
            </div>
            :<div className={`form-item`}></div>
          }
          <div className="form-item">
            <InputText type="text"
              id="AnnIncome"
              name="AnnIncome"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'AnnIncome', tile)} 
              value={data.AnnIncome} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="AnnIncome">Annual Declared Income <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="AnnIncome" />
          </div>
          {master && master.occupation && master.occupation.length>0 && 
            <div className={`form-item `}>
              <SelectBox name="Occupation" required onChange={(e) => handleChange(e, 'Occupation', tile)} >
              <>
                <option value="" disabled selected>Occupation*</option>
                {master && master.occupation &&  master.occupation.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code == data.Occupation ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="Occupation" />
            </div>
          }
          {data.EmpType === '1' ?
          <div className="form-item">
            <InputText type="text"
              id="GMI"
              name="GMI"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'GMI', tile)} 
              value={data.GMI} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="GMI">Gross Fixed Monthly Income <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="GMI" />
          </div>:<div className="form-item"></div>}
          {master && master.work_type && master.work_type.length>0 && 
            <div className={`form-item `}>
              <SelectBox name="WorkType" required onChange={(e) => handleChange(e, 'WorkType', tile)} >
              <>
                <option value="" disabled selected>Work type*</option>
                {master && master.work_type &&  master.work_type.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code === data.WorkType ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="WorkType" />
            </div>
          }
          <InputSearch validationError={validationError} name='CompanyCode' masterName="company" value={data.CompanyCode} text={data.CompanyName} handleChange={(e) => handleChange(e, 'CompanyCode', tile)} tile={tile} label={`Company <span class="colorRed">*</span>`} />  
          {data.CompanyCode === '99999' ?
          <div className="form-item">
            <InputText type="text"
              id="OtherCompanyName"
              name="OtherCompanyName"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'OtherCompanyName', tile)} 
              value={data.OtherCompanyName} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="OtherCompanyName">Employer Name <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="OtherCompanyName" />
          </div>
          :<div className="form-item"></div>
          }
          <InputSearch validationError={validationError} name='Designation' masterName="designation" value={data.Designation} text={data.DesignationName} handleChange={(e) => handleChange(e, 'Designation', tile)} tile={tile} label={`Designation <span class="colorRed">*</span>`}/>  
          {master && master.industry_isic && master.industry_isic.length>0 && 
            <div className={`form-item `}>
              <SelectBox name="IndustryIsic" required onChange={(e) => handleChange(e, 'IndustryIsic', tile)} >
              <>
                <option value="" disabled selected>Industry*</option>
                {master && master.industry_isic &&  master.industry_isic.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code === data.IndustryIsic ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="IndustryIsic" />
            </div>
          }
          {master && master.total_work_exp && master.total_work_exp.length>0 && data.EmpType === '1' ?
            <div className={`form-item `}>
              <SelectBox name="TotalWorkExp" required onChange={(e) => handleChange(e, 'TotalWorkExp', tile)} >
              <>
                <option value="" disabled selected>Total Work Experience*</option>
                {master && master.total_work_exp &&  master.total_work_exp.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code == data.TotalWorkExp ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="TotalWorkExp" />
            </div>:<div className={`form-item `}></div>
          }
          <div className="form-item">
            <InputText type="text"
              id="OfcAddress1"
              name="OfcAddress1"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'OfcAddress1', tile)} 
              value={data.OfcAddress1} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="OfcAddress1">Address Line 1<span className="colorRed">*</span></label>
            <Error validationError={validationError} name="OfcAddress1" />
          </div>
          <div className="form-item">
            <InputText type="text"
              id="OfcAddress4"
              name="OfcAddress4"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'OfcAddress4', tile)} 
              value={data.OfcAddress4} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="OfcAddress4">Address Line 2 <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="OfcAddress4" />
          </div>
          <InputSearch validationError={validationError} name='OfcPin' masterName="pincode_master" value={data.OfcPin} handleChange={(e) => handleChange(e, 'OfcPin', tile)} tile={tile} label={`Office Address PIN <span class="colorRed">*</span>`}  />  
          {master && master.city && master.city.length>0 && 
            <div className={`form-item `}>
              <SelectBox name="OfcCity" required onChange={(e) => handleChange(e, 'OfcCity', tile)} >
              <>
                <option value="" disabled selected>Office Address City *</option>
                {master && master.city &&  master.city.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code == data.OfcCity ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="OfcCity" />
            </div>
          }
          <div className="form-item">
            <InputText type="text"
              id="OfcPhone"
              name="OfcPhone"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'OfcPhone', tile)} 
              value={data.OfcPhone} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="OfcPhone">Office Phone Number <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="OfcPhone" />
          </div>
          <div className="form-item">
            <InputText type="text"
              id="OfcEmail"
              name="OfcEmail"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'OfcEmail', tile)} 
              value={data.OfcEmail} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="OfcEmail">Office Email Id</label>
            <Error validationError={validationError} name="OfcEmail" />
          </div>
          {master && master.income_proof && master.income_proof.length>0 && 
            <div className={`form-item `}>
              <SelectBox name="IncomeProof" required onChange={(e) => handleChange(e, 'IncomeProof', tile)} >
              <>
                <option value="" disabled selected>Proof of Income*</option>
                {master && master.income_proof && data.EmpType &&  master.income_proof[data.EmpType-1][data.EmpType].map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code === data.IncomeProof ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="IncomeProof" />
            </div>
          }
          {(data.IncomeProof === 'T0235' || data.IncomeProof === 'T0069') &&
          <div className="form-item">
            <InputText type="text"
              id="IncomeProofValue"
              name="IncomeProofValue"
              autoComplete="off"
              handleChange={(e) => handleChange(e, 'IncomeProofValue', tile)} 
              value={data.IncomeProofValue} 
              className={ `formInput`}
              required={true}
            />
            <label htmlFor="IncomeProofValue">{data.IncomeProof === 'T0235' ? `Basic Monthly Salary` : data.IncomeProof === 'T0069' ? `Card Limit` : `Income Proof Value`} <span className="colorRed">*</span></label>
            <Error validationError={validationError} name="IncomeProofValue" />
          </div>}
          {master && master.mailing_address && master.mailing_address.length>0 && 
            <div className={`form-item `}>
              <SelectBox name="CardMailingAddress" required onChange={(e) => handleChange(e, 'CardMailingAddress', tile)} >
              <>
                <option value="" disabled selected>Card Mailing Address*</option>
                {master && master.mailing_address &&  master.mailing_address.map((e)=>{
                  return <option value={e.Code} key={e.Code} selected={e.Code === data.CardMailingAddress ? 'selected' : ''}>{e.Description}</option>
                })}
              </>
              </SelectBox>
              <Error validationError={validationError} name="CardMailingAddress" />
            </div>
          }
        </div>
      </div>
    </div>
  );
};