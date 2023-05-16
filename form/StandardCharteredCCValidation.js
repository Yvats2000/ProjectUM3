/* eslint-disable import/no-anonymous-default-export */
const validateCharNumber = (str) => {
  var pattern = /^[A-Za-z0-9\b]+$/;
  return pattern.test(str);
}
const validateEmail = (email) => {
  var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(email);
}
const validatePanCard = (panCard) => {
  var pattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  return pattern.test(panCard);
}
const validateText = (str) => {
  var pattern = /^[A-Za-z0-9 @%()_\-.,\b]+$/;     
  return pattern.test(str);
}
const validatePersonalDetails = (props) => {

  let ERROR = false
  let errors = {};
  
  if (props.hasOwnProperty('CreditCardApplied') && props.CreditCardApplied === '') {
    ERROR = true
    errors.CreditCardApplied = "Please select credit card to apply!";
  }
  
  if (props.hasOwnProperty('HasExistingScbCC') && props.HasExistingScbCC === '') {
    ERROR = true
    errors.HasExistingScbCC = "Please opt existing Standard Chartered Bank Credit Card!";
  }
  
  if (props.hasOwnProperty('IsExtngScbCust') && props.IsExtngScbCust === '') {
    ERROR = true
    errors.IsExtngScbCust = "Please opt existing relationship with Standard Chartered Bank!";
  }

  if (props.hasOwnProperty('CustReltnType') && props.IsExtngScbCust === 'yes' && props.CustReltnType === '' ) {
    ERROR = true
    errors.CustReltnType = "Please select relation type!";
  }
  
  if (props.hasOwnProperty('Title') && props.Title === '') {
    ERROR = true
    errors.Title = "Select title!";
  }
  if (props.hasOwnProperty('FirstName') && props.FirstName === '') {
    ERROR = true
    errors.FirstName = "Please enter first name!";
  }

  if (props.hasOwnProperty('LastName') && props.LastName === '') {
    ERROR = true
    errors.LastName = "Please enter last name!";
  }

  if (props.hasOwnProperty('Gender') && props.Gender === '') {
    ERROR = true
    errors.Gender = "Please select gender!";
  }

  if (props.hasOwnProperty('MobileNo') && props.MobileNo === '') {
    ERROR = true
    errors.MobileNo = "Please enter Mobile No.!";
  }

  if (props.hasOwnProperty('Email') && (props.Email === '' || !validateEmail(props.Email))) {
    ERROR = true
    errors.Email = "Please enter valid email id!";
  }

  if (props.hasOwnProperty('DOB') && !props.DOB) {
    ERROR = true
    errors.DOB = "Please select DOB!";
  }

  if (props.hasOwnProperty('Qualification') && props.Qualification === '') {
    ERROR = true
    errors.Qualification = "Please select qualification!";
  }

  return {ERROR, errors}; 
}

const validateResidentialInfo = (props) => {

  let ERROR = false
  let errors = {};

  if (props.hasOwnProperty('ResType') && props.ResType === '') {
    ERROR = true
    errors.ResType = "Please select residential type!";
  }
  
  if (props.hasOwnProperty('ResidentialStatus') && props.ResidentialStatus === '') {
    ERROR = true
    errors.ResidentialStatus = "Please select residential status!";
  }

  if (props.hasOwnProperty('ResAddress1') && props.ResAddress1 === '') {
    ERROR = true
    errors.ResAddress1 = "Please enter address!";
  }

  if (props.hasOwnProperty('ResAddress4') && props.ResAddress4 === '') {
    ERROR = true
    errors.ResAddress4 = "Please enter address!";
  }

  if (props.hasOwnProperty('ResCity') && props.ResCity === '') {
    ERROR = true
    errors.ResCity = "Please select city!";
  }

  if (props.hasOwnProperty('ResPIN') && props.ResPIN === '') {
    ERROR = true
    errors.ResPIN = "Please enter pincode!";
  }

  if (props.hasOwnProperty('PermAddress1') && props.PermAddress1 === '') {
    ERROR = true
    errors.PermAddress1 = "Please enter address!";
  }

  if (props.hasOwnProperty('PermAddress4') && props.PermAddress4 === '') {
    ERROR = true
    errors.PermAddress4 = "Please enter address!";
  }

  if (props.hasOwnProperty('PermCity') && props.PermCity === '') {
    ERROR = true
    errors.PermCity = "Please select city!";
  }
  
  if (props.hasOwnProperty('PermPIN') && props.PermPIN === '') {
    ERROR = true
    errors.PermPIN = "Please enter pincode!";
  }
  
  return {ERROR, errors}; 
}

const validateEmploymentDetails = (props) => {

  let ERROR = false
  let errors = {};

  if (props.hasOwnProperty('NumOfDependents') && props.NumOfDependents === '') {
    ERROR = true
    errors.NumOfDependents = "Please enter number of dependents!";
  }else if(props.hasOwnProperty('NumOfDependents') && props.NumOfDependents != '' && props.NumOfDependents > 10){
    ERROR = true
    errors.NumOfDependents = "Please enter valid number of dependents!";
  }

  if (props.hasOwnProperty('EmpType') && props.EmpType === '') {
    ERROR = true
    errors.EmpType = "Please select employement type!";
  }
  
  if (props.hasOwnProperty('SalaryBankAcc') && props.SalaryBankAcc === '' && props.EmpType === '1') {
    ERROR = true
    errors.SalaryBankAcc = "Please select bank!";
  }

  if (props.hasOwnProperty('AnnIncome') && props.AnnIncome === '') {
    ERROR = true
    errors.AnnIncome = "Please enter annual income!";
  }

  if (props.hasOwnProperty('Occupation') && props.Occupation === '') {
    ERROR = true
    errors.Occupation = "Please select occupation!";
  }

  if (props.hasOwnProperty('GMI') && props.GMI === ''  && props.EmpType === '1') {
    ERROR = true
    errors.GMI = "Please enter gross fixed monthly income!";
  }else if(props.hasOwnProperty('GMI') && props.GMI != '' && props.GMI < 25001){
    ERROR = true
    errors.GMI = "Gross fixed monthly income should be greater than 25000!";
  }

  if (props.hasOwnProperty('WorkType') && props.WorkType === '') {
    ERROR = true
    errors.WorkType = "Please select work type! ";
  }

  if (props.hasOwnProperty('OtherCompanyName') && props.OtherCompanyName === '' && props.CompanyCode === '99999') {
    ERROR = true
    errors.OtherCompanyName = "Please enter employer name! ";
  }

  if (props.hasOwnProperty('CompanyCode') && props.CompanyCode === '') {
    ERROR = true
    errors.CompanyCode = "Please enter company name! ";
  }

  if (props.hasOwnProperty('CompanyName') && props.CompanyCode != '' && props.CompanyName === '') {
    ERROR = true
    errors.CompanyCode = "Please select company from options! ";
  }

  if (props.hasOwnProperty('Designation') && props.Designation === '') {
    ERROR = true
    errors.Designation = "Please enter designation! ";
  }

  if (props.hasOwnProperty('DesignationName') && props.Designation != '' && props.DesignationName === '') {
    ERROR = true
    errors.Designation = "Please select designation from options! ";
  }

  if (props.hasOwnProperty('IndustryIsic') && props.IndustryIsic === '') {
    ERROR = true
    errors.IndustryIsic = "Please select industry isic! ";
  }

  if (props.hasOwnProperty('TotalWorkExp') && props.TotalWorkExp === ''  && props.EmpType === '1') {
    ERROR = true
    errors.TotalWorkExp = "Please select work experience!";
  }

  if (props.hasOwnProperty('OfcAddress1') && props.OfcAddress1 === '') {
    ERROR = true
    errors.OfcAddress1 = "Please enter office address!";
  }

  if (props.hasOwnProperty('OfcAddress4') && props.OfcAddress4 === '') {
    ERROR = true
    errors.OfcAddress4 = "Please enter office address!";
  }

  if (props.hasOwnProperty('OfcPin') && props.OfcPin === '') {
    ERROR = true
    errors.OfcPin = "Please enter pincode!";
  }

  if (props.hasOwnProperty('OfcEmail') && props.OfcEmail != '' &&  !validateEmail(props.OfcEmail)) {
    ERROR = true
    errors.OfcEmail = "Please enter valid email id!";
  }

  if (props.hasOwnProperty('OfcCity') && props.OfcCity === '') {
    ERROR = true
    errors.OfcCity = "Please select city!";
  }

  if (props.hasOwnProperty('OfcPhone') && props.OfcPhone === '') {
    ERROR = true
    errors.OfcPhone = "Please enter phone no.!";
  }

  if (props.hasOwnProperty('IncomeProof') && props.IncomeProof === '') {
    ERROR = true
    errors.IncomeProof = "Please select income proof document!";
  }

  if (props.hasOwnProperty('IncomeProofValue') && props.IncomeProof === 'T0235' &&  props.IncomeProofValue === '') {
    ERROR = true
    errors.IncomeProofValue = "Please enter basic monthly salary!";
  }

  if (props.hasOwnProperty('IncomeProofValue') && props.IncomeProof === 'T0069' &&  props.IncomeProofValue === '') {
    ERROR = true
    errors.IncomeProofValue = "Please enter card limit!";
  }

  if (props.hasOwnProperty('CardMailingAddress') && props.CardMailingAddress === '') {
    ERROR = true
    errors.CardMailingAddress = "Please select card mailing address!";
  }
  
  
  return {ERROR, errors}; 
}

const validateIncomeDetail = (props) => {

  let ERROR = false
  let errors = {};

  if (props.hasOwnProperty('PAN') && (props.PAN === '' || !validatePanCard  (props.PAN))) {
    ERROR = true
    errors.PAN = "Please enter valid Pan number!";
  }

  if (props.hasOwnProperty('OtherDocType') && props.OtherDocType === '') {
    ERROR = true
    errors.OtherDocType = "Please select other document type!";
  }

  if (props.hasOwnProperty('OtherDocNo') && props.OtherDocNo === '') {
    ERROR = true
    errors.OtherDocNo = "Please enter other document type document number!";
  }else if(props.OtherDocNo != '' && !validateText(props.OtherDocNo)){
    ERROR = true
    errors.OtherDocNo = "Please enter valid document number!";
  }
  
  
  return {ERROR, errors}; 
}
export default { 
  validatePersonalDetails,
  validateResidentialInfo,
  validateEmploymentDetails,
  validateIncomeDetail,
  validateCharNumber,
  validatePanCard,
  validateEmail,
  validateText
}