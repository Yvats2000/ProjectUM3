import styles from './Hra.module.css';
import { Tooltip, BreadCrumb,CreditScore, FAQ } from "../../shared";
import InputText from '../../../form/inputText';
import { Select as SelectBox} from "../../ui";
import { hraCal } from '../../../services/calculators';
import Validation from '../../../form/Validation';
import React, {useState} from 'react';
import { RightSideBar } from '../../shared'
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";

export const Hra = ({cmsData,rightNavBar}) => {

  //Financial calculators Box
  let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))

  const internalLinkEmiCalculator = [
    {
      "text": "Check Eligibility",
      "child": [
        {
          "text": `Home Loan Eligibility Calculator`,
          "path": `/loans/home-loan/eligibility-calculator`
        },
        {
          "text": `Personal Loan Eligibility Calculator`,
          "path": `/loans/personal-loan/eligibility-calculator`
        }
      ]
    },
    
    {
      "text": "Top 10 Banks",
      "child": [
        {
          "text": "CITI Bank",
          "path": "/banks-in-india/citi-bank"
        },
        {
          "text": "RBL Bank",
          "path": "/banks-in-india/rbl-bank"
        },
        {
          "text": "Bank of Baroda",
          "path": "/banks-in-india/bank-of-baroda"
        },
        {
          "text": "Canara Bank",
          "path": "/banks-in-india/canara-bank"
        },
        {
          "text": "Bajaj Finserv",
          "path": "/banks-in-india/bajaj-finserv"
        },
        {
          "text": "Yes Bank",
          "path": "/banks-in-india/yes-bank"
        },
        {
          "text": "Deutsche Bank",
          "path": "/banks-in-india/deutsche-bank"
        },
        {
          "text": "IDFC FIRST Bank",
          "path": "/banks-in-india/idfc-first-bank"
        },
        {
          "text": "DCB Bank",
          "path": "/banks-in-india/dcb-bank"
        },
        {
          "text": "Kotak Bank",
          "path": "/banks-in-india/kotak-bank"
        }
      ]
    }
  ]
  interLinkingFinancialArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingFinancialArray);
  let formField = {
    basicSalary: "",
    hraReceived: "",
    metroCity: '',
    // taxSlab: 5,
    // mode:"Monthly",
    totalRentPaid: "",
    da: "",
  }
  const [formDetails, setFormDetails] = useState(formField);
  const [formErrors, setFormErrors] = useState({});
  const [hraData, setHraData] = useState([]);
  
  const breadCrumbLinks = [
    {   
      "text": "Calculators",
      "path": "/calculator", 
      "class": ""
    },
    {   
      "text": "HRA Calculator",
      "path": "/calculator/hra-calculator", 
      "class": ""
    }
  ]
  
  const handleChange = async(e) => {
    const {value, name} = e.target;     
    if(value)value=value.toString().replace(/,/g,"");
    let isValid = isAllowed(value, name);
    if(isValid){
      setFormDetails({ ...formDetails, [name]: value });
      setFormErrors({...formErrors , [name]: ''});
    } else { return; }
  };
  
  const validateLeadForm = (data) => {
    let validateFields;
    validateFields = Validation.HraValidation(data);
    return validateFields;
  }
  
  const submitHra = async () => {
    setFormErrors('');
    let formErrorObject = validateLeadForm(formDetails);
    if(formErrorObject && formErrorObject.ERROR){
      setFormErrors(formErrorObject.errors);
      return;
    } else {
      let payload = {
        basicSalary: formDetails.basicSalary,
        hraReceived: formDetails.hraReceived || 0,
        metroCity: formDetails.metroCity == 1 ?true:false,
        totalRentPaid: formDetails.totalRentPaid || 0,
        da: formDetails.da || 0,
        taxSlab: 0,
      }
      let responve = await hraCal(payload);
      if (responve.status === "SUCCESS") {
        setHraData(responve.data)
      }
    }  
  }
  
  const isAllowed = (value, type) => {
    switch (type){
      case 'basicSalary':
      case 'hraReceived':
      case 'metroCity':
      case 'totalRentPaid':
      case 'da':
      return (value === '' || (Validation.validateNumber(value))); 
      default:
        return  true;
    }
  }
  
  return (
    <>
      <div className="container"> 
        <div className="breadCrumb">
          <BreadCrumb links={breadCrumbLinks} />
        </div>
        <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">HRA Calculator</h1>
        {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
      </div>
      <div className="container">
        <div className={styles.hraContainer}>
          <div className={styles.calcSection}>
            <div className={styles.wrap}>
              <div className={styles.head}>
                  <h3 className="font16  textBlack fontsemiBold">Calculate HRA Tax Exemption</h3>
                  {/* <div className="btns">
                    <button className={formDetails.mode === 'Monthly'?styles.active:null} onClick={()=>setFormDetails({...formDetails, mode:'Monthly'})}>Monthly</button>
                    <button className={formDetails.mode === 'Yearly'?styles.active:null} onClick={()=>setFormDetails({...formDetails, mode:'Yearly'})}>Yearly</button>
                  </div> */}
              </div>
              <div className={styles.inpFields}>
                  <div className={`form-item rupeeBox `}>
                    <span className="text303542 font12 contCode fontMedium">&#x20B9;</span> 
                    <InputText
                      type="text"
                      name="basicSalary"
                      maxLength={10}
                      className={`formInput `}
                      handleChange={(e) => handleChange(e)}
                      required={true}
                      value={formDetails.basicSalary?parseInt(formDetails.basicSalary).toLocaleString('en-IN'):formDetails.basicSalary}
                    />
                    <label htmlFor="basicSalary" className="font12 fontMedium formLabel">Basic Salary</label>
                    <Tooltip tooltip='Monthly basic salary'><span>i</span></Tooltip>
                    <span className="errorText">{formErrors.basicSalary}</span>
                  </div>
                  <div className={`form-item rupeeBox `}>
                      <span className="text303542 font12 contCode fontMedium">&#x20B9;</span> 
                      <InputText
                        type="text"
                        name="hraReceived"
                        maxLength={10}
                        className={`formInput `}
                        handleChange={(e) => handleChange(e)}
                        required={true}
                        value={formDetails.hraReceived?parseInt(formDetails.hraReceived || 0).toLocaleString('en-IN'):formDetails.hraReceived}
                      />
                      <label htmlFor="hraReceived" className="font12 fontMedium formLabel">HRA Received</label>
                      <Tooltip tooltip='Total house rent allowance received as part of salary. You will find this in your payslip.'><span>i</span></Tooltip>
                      <span className="errorText">{formErrors.hraReceived}</span>
                  </div>
                  <div className={`form-item rupeeBox `}>
                      <span className="text303542 font12 contCode fontMedium">&#x20B9;</span> 
                      <InputText
                        type="text"
                        name="totalRentPaid"
                        className={`formInput `}
                        handleChange={(e) => handleChange(e)}
                        required={true}
                        maxLength={10}
                        value={formDetails.totalRentPaid?parseInt(formDetails.totalRentPaid || 0).toLocaleString('en-IN'):formDetails.totalRentPaid}
                      />
                      <label htmlFor="totalRentPaid" className="font12 fontMedium formLabel">Total Rent Paid</label>
                      <Tooltip tooltip='Monthly rent paid'><span>i</span></Tooltip>
                      <span className="errorText">{formErrors.totalRentPaid}</span>
                  </div>
                  <div className={`form-item rupeeBox `}>
                      <span className="text303542 font12 contCode fontMedium">&#x20B9;</span> 
                      <InputText
                        type="text"
                        name="da"
                        maxLength={10}
                        className={`formInput `}
                        handleChange={(e) => handleChange(e)}
                        required={true}
                        value={formDetails.da?parseInt(formDetails.da || 0).toLocaleString('en-IN'):formDetails.da}
                      />
                      <label htmlFor="monthlySalary" className="font12 fontMedium formLabel">Dearness allowance</label>
                      <Tooltip tooltip='DA- This allowance is given to government and public sector employees and pensioners'><span>i</span></Tooltip>
                      <span className="errorText">{formErrors.da}</span>
                    </div>
                    <div className={`form-item `}>
                      <SelectBox name='metroCity' required onChange={(e) => handleChange(e)}>
                        <>
                          <option value="" disabled selected>My house is in a</option>
                          <option value={1}>Metro City</option>
                          <option value={0}>Non-Metro City</option>
                        </>
                      </SelectBox>
                      <Tooltip selectTool={true} tooltip='Delhi, Mumbai, Chennai, and Kolkata are considered to be metro cities for HRA'><span>i</span></Tooltip>
                      <span className="errorText">{formErrors.metroCity}</span>
                    </div>              
                  <button className="btn font12  textCenterSm" onClick={()=>submitHra()}>
                  Calculate<em className="icon-arrow-right font14"></em>
                </button>  
              </div>
            </div>
          </div>
          <div className={styles.calcValues}>
              {/* <div className={styles.chart}>
                  <img src="/assets/images/chart.svg" alt="" />
                <div className={styles.hraType}><p>HRA taxable</p><p>HRA Exempted</p></div>
              </div> */}
              <div className={styles.taxScale}>
                {/* <ul className={styles.taxScaleVal}>
                    <li>Select TAX Slab</li>
                  <li className={`cursorPointer ${formDetails.taxSlab === 5 ? styles.active : null}`} onClick={()=>setFormDetails({...formDetails, taxSlab:5})}><p>5%</p></li>
                  <li className={`cursorPointer ${formDetails.taxSlab === 10 ? styles.active : null}`} onClick={()=>setFormDetails({...formDetails, taxSlab:10})}><p>10%</p></li>
                  <li className={`cursorPointer ${formDetails.taxSlab === 15 ? styles.active : null}`} onClick={()=>setFormDetails({...formDetails, taxSlab:15})}><p>15%</p></li>
                  <li className={`cursorPointer ${formDetails.taxSlab === 20 ? styles.active : null}`} onClick={()=>setFormDetails({...formDetails, taxSlab:20})}><p>20%</p></li>
                  <li className={`cursorPointer ${formDetails.taxSlab === 25 ? styles.active : null}`} onClick={()=>setFormDetails({...formDetails, taxSlab:25})}><p>25%</p></li>
                    <li className={`cursorPointer ${formDetails.taxSlab === 30?styles.active:null}`} onClick={()=>setFormDetails({...formDetails, taxSlab:30})}><p>30%</p></li>
                </ul> */}
                <div className={styles.innertaxSlab}>
                    <ul>
                      <li>
                        <p className={styles.heading}>HRA taxable</p>
                    <p className={styles.value}>₹ {hraData.HRATaxable?Math.round(hraData.HRATaxable).toLocaleString('en-IN'):'0' } /month</p>
                      </li>
                      {/* <li>
                        <p className={styles.heading}>Tax @30%</p>
                        <p className={styles.value}>₹10,800</p>
                      </li> */}
                      <li>
                        <p className={styles.heading}>HRA exempted</p>
                    <p className={`${styles.value} ${styles.textblue}`}>₹ { hraData.HRAExempted?Math.round(hraData.HRAExempted).toLocaleString('en-IN'):'0'} /month</p>
                      </li>
                    </ul>
                  <p className={styles.highLight}>If you don&apos;t receive HRA, you can still claim upto ₹60,000 deduction U/S 80GG</p>
                </div>
              </div>
            </div>

          {/* <div className={styles.hrabanner}>
              <img src="/assets/images/hra.svg" alt=""/>
          </div> */}
        </div>
        {/* <div className={styles.dwnlReport}>
          <div className={styles.Report}>
            <img src="/assets/images/samplehoues.svg" alt="" />
              <p className={styles.heading}>Download Sample House Rent Receipt</p>
              <button className="btn font12 btn25 textCenterSm">
                  DOWNLOAD NOW<em className="icon-arrow-right font14"></em>
                </button>            
          </div>
          <div className={styles.Report}>
              <img src="/assets/images/hrareport.svg" alt="" />
            <p className={styles.heading}>Generate HRA Receipt</p>
            <button className="btn font12 btn25 textCenterSm">
                GENERATE NOW<em className="icon-arrow-right font14"></em>
              </button>            
          </div>
        </div> */}
      </div>
      {cmsData.length > 0 && 
      <>
      <div className='container containerFlex'>
        <section className={cmsStyles.eligible}>
          <div className="container">
            <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
          </div>
        </section>
        <RightSideBar menuLinks={internalLinkEmiCalculator} paddingTop={ true} />
      </div>
      <CreditScore />
      {cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
        <section className="faq">
          <div className="container">
            <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
            <div className="faqBx">
              <FAQ data={cmsData[0].faq_content}  />
            </div>
          </div>
        </section>
        :null}
        </>}
    </>
  )
}















