const validateEmail = (email) => {
  var pattern = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return pattern.test(email);
}
const validateNumber = (number) => {
  var pattern = /^[0-9\b]+$/;     
  return pattern.test(number)
}
const validateRate = (number) => {
  var pattern = /^[0-9]+([.][0-9]+)?$/;     
  return pattern.test(number)
}
const validateIndianNumber = (number) => {
  var pattern = /^[6-9]\d{9}$/;     
  return pattern.test(number)
}
const cloneObject = (obj)=> {
  let clone = {};
  for(var i in obj) {
    if(typeof(obj[i])=="object" && obj[i] != null)
      clone[i] = cloneObject(obj[i]);
    else
      clone[i] = obj[i];
  }
  return clone;
}
const validatePanCard = (panCard) => {
  var pattern = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}?$/;
  return pattern.test(panCard);
}
const validateCharNumber = (str) => {
  var pattern = /^[A-Za-z0-9\b]+$/;     
  return pattern.test(str);
}
const validateCharNumberWidthSpace = (str) => {
  var pattern = /^[A-Za-z0-9 \b]+$/;     
  return pattern.test(str);
}
const validateChar = (str) => {
  var pattern = /^[A-Za-z \b]+$/;     
  return pattern.test(str);
}
const validateCharWithoutSpace = (str) => {
  var pattern = /^[A-Za-z\b]+$/;     
  return pattern.test(str);
}
const ValidateDecimal = (str) => {
  var pattern = /(?=[^\0])(?=^([0-9]+){0,1}(\.[0-9]{1,2}){0,1}$)/;
  return pattern.test(str)
}
const validateText = (str) => {
  var pattern = /^[A-Za-z0-9 @%()_\-.,\b]+$/;     
  return pattern.test(str);
}
const validateAddress = (str)=>{
  var pattern = /^[^<>"'@%!$^*&+]+$/
  return pattern.test(str);
}
const ValidateOTP = (otp) => {
  let ERROR = false
  let errors = {}
  if (!validateNumber(otp) || otp.toString().length !== 6) {
    ERROR = true
    errors.otp = "Please enter valid OTP"
  }
  return { ERROR, errors }
}
const ValidateLoginDetails = (props, loginErrorMsg = 'Please enter a valid Phone Number') => {
  let ERROR = false
  let errors = {}
  if (props.loginId === '') {
    ERROR = true
    errors.loginId = loginErrorMsg;
  }
  if (props.loginPassword === '') {
    ERROR = true
    errors.loginPassword = "Please enter a valid Login Password"
  }
  return { ERROR, errors }
}

const validateListingLeadForm = (props) => {
    let ERROR = false
    let errors = {};
    if (props.hasOwnProperty('fullName') && props.fullName === '') {
      ERROR = true
      errors.fullName = "Please enter full name";
    }
    if (props.hasOwnProperty('mobile') && (props.postalCode === '' || (props.postalCode && props.postalCode.length < 6 && props.postalCode !== '') || !validateNumber(props.mobile))) {
      ERROR = true
      errors.postalCode = "Please enter your pincode";
    }
    if (props.hasOwnProperty('mobile') && (props.mobile === '' || (props.mobile && props.mobile.length < 10 && props.mobile !== '') || !validateIndianNumber(props.mobile))) {
      ERROR = true
      errors.mobile = "Please enter valid mobile number";
    }else{
        if (props.hasOwnProperty('otpVerified') && !props.otpVerified) {
            ERROR = true
            errors.otpVerified = "Please verify your mobile";
        }
    }
    if (props.hasOwnProperty('dob') && props.dob === '') {
      ERROR = true
      errors.dob = "Please enter dob";
    }
    if (props.hasOwnProperty('gender') && props.gender === '') {
      ERROR = true
      errors.gender = "Please select gender";
    }
    if (props.hasOwnProperty('addressCode') && props.addressCode === '') {
      ERROR = true
      errors.addressCode = "Please select residential type";
    }
    if (props.hasOwnProperty('email') && (props.email === '' || !validateEmail(props.email))) {
      ERROR = true
      errors.email = "Please enter valid email";
    }
    if (props.hasOwnProperty('panCard') && (props.panCard === '' || !validatePanCard  (props.panCard))) {
      ERROR = true
      errors.panCard = "Please enter valid pan card number";
    }
    if (props.hasOwnProperty('consentStatement') && props.consentStatement === '' ) {
      ERROR = true
      errors.consentStatement = "Please check consent statement";
    }
    if (props.hasOwnProperty('productType') && (Object.keys(props.productType).length === 0 || props.productType.value === '')) {
      ERROR = true
      errors.productType = "Please select loan type";
    }
    if (props.hasOwnProperty('city') && (Object.keys(props.city).length === 0 || props.city.value === '')) {
      ERROR = true
      errors.city = "Please select city";
    } 
    if (props.hasOwnProperty('state') && (Object.keys(props.state).length === 0 || props.state.value === '')) {
      ERROR = true
      errors.state = "Please select state";
    } 
    if (props.hasOwnProperty('streetAddress') && (Object.keys(props.streetAddress).length === 0 || props.state.streetAddress === '')) {
      ERROR = true
      errors.streetAddress = "Please enter your address";
    } 
    return {ERROR, errors}; 
}

const pre = (value) => {
  let p1 = (value)*80;
  let p2 = p1/100;
  return p2
}
const subtractYears = (numYear) => {
  let d1 = new Date()
  let year = d1.getFullYear() - numYear
  return year
}


const validateEligibilityCalculatorForm = (props, loanType) => {
    let ERROR = false
    let errors = {};
    if (props.hasOwnProperty('fullName') && props.fullName === '') {
      ERROR = true
      errors.fullName = "Please enter full name";
    }
    if (props.hasOwnProperty('dob') && !props.dob) {
      ERROR = true
      errors.dob = "Please enter dob";
    }
    if (props.dob && props.dob.getFullYear() > subtractYears(18)){
      ERROR = true
      errors.dob = "Please enter dob older 18 years";
    }
    if (props.hasOwnProperty('mobile') && (props.mobile === '' || (props.mobile && props.mobile.length < 10 && props.mobile !== '') || !validateIndianNumber(props.mobile))) {
      ERROR = true
      errors.mobile = "Please enter valid mobile number";
    }
    if (props.hasOwnProperty('city') && (Object.keys(props.city).length === 0 || props.city.value === '')) {
      ERROR = true
      errors.city = "Please select city";
    } 
    if(loanType == 'home-loan'){
      if (props.loanAmount && props.loanAmount < 50000 || props.loanAmount == ''){
        ERROR = true
        errors.loanAmount = "Please enter value more then 50K";
      }
      else if (props.loanAmount && props.loanAmount > 20000000){
        ERROR = true
        errors.loanAmount = "Please enter value upto 2Cr";
      }
    }
    if(loanType == 'personal-loan'){
      if (props.loanAmount && props.loanAmount < 50000 || props.loanAmount == ''){
        ERROR = true
        errors.loanAmount = "Please enter value more then 50K";
      }
      else if (props.loanAmount && props.loanAmount > 1500000){
        ERROR = true
        errors.loanAmount = "Please enter value upto 15lac";
      }
    }
    
    if (props.hasOwnProperty('monthlySalary') && (props.monthlySalary === '' || (props.monthlySalary && props.monthlySalary.length > 7 && props.monthlySalary !== '') || !validateNumber(props.monthlySalary))) {
      ERROR = true
      errors.monthlySalary = "Please enter valid monthly salary";
    }
    if(props.currentMonthlyEmi > pre(props.monthlySalary)){
      ERROR = true
      //errors.currentMonthlyEmi = "Please enter the 80% of your monthly salary";
      errors.currentMonthlyEmi = "Please enter your correct monthly EMI";
    }
  
    if(loanType == 'home-loan'){
      if (props.tenure && props.tenure > 30 ){
        ERROR = true
        errors.tenure = "Please enter value less then 30";
      }else if(props.tenure == '') {
        ERROR = true
        errors.tenure = "Please enter tenure";
      }
    }
    if(loanType == 'personal-loan'){
      if (props.tenure && props.tenure > 5 ){
        ERROR = true
        errors.tenure = "Please enter value less then 5";
      }else if(props.tenure == '') {
        ERROR = true
        errors.tenure = "Please enter tenure";
      }
    }
    

    if(loanType === 'personal-loan'){
      if (props.hasOwnProperty('companyType') && (Object.keys(props.companyType).length === 0 || props.companyType.value === '')) {
        ERROR = true
        errors.companyType = "Please select company";
      }
    }
    if(loanType === 'home-loan'){
      if (props.hasOwnProperty('occupationType') && (Object.keys(props.occupationType).length === 0 || props.occupationType.value === '')) {
        ERROR = true
        errors.occupationType = "Please select occupation";
      }
    }
    return {ERROR, errors}; 
}
const HraValidation = (props) => {
  let ERROR = false
  let errors = {};
  if (props.hasOwnProperty('basicSalary')) {
    if (props.basicSalary && props.basicSalary < 20000 || props.basicSalary == ''){
      ERROR = true
      errors.basicSalary = "Please enter value more then 20K";
    }
    else if (props.basicSalary && props.basicSalary > 10000000){
      ERROR = true
      errors.basicSalary = "Please enter value upto 1 Cr.";
    }
  }
  if (props.hasOwnProperty('hraReceived')) {
    if (props.hraReceived && props.hraReceived < 0){
      ERROR = true
      errors.hraReceived = "Please enter value";
    }
    else if (props.hraReceived && props.hraReceived > 10000000){
      ERROR = true
      errors.hraReceived = "Please enter value upto 1 Cr.";
    }
  }
  if (props.hasOwnProperty('totalRentPaid')) {
    if (props.totalRentPaid && props.totalRentPaid < 0 ){
      ERROR = true
      errors.totalRentPaid = "Please enter value";
    }
    else if (props.totalRentPaid && props.totalRentPaid > 10000000){
      ERROR = true
      errors.totalRentPaid = "Please enter value upto 1 Cr.";
    }
  }
  if (props.hasOwnProperty('totalRentPaid')) {
    if (props.da && props.da < 0 ){
      ERROR = true
      errors.da = "Please enter value";
    }
    else if (props.da && props.da > 10000000){
      ERROR = true
      errors.da = "Please enter value upto 1 Cr.";
    }
  }
  if (props.hasOwnProperty('metroCity') && (Object.keys(props.metroCity).length === 0 || props.metroCity.value === '')) {
    ERROR = true
    errors.metroCity = "Please select city type";
  }
  return {ERROR, errors};
}

export default { 
  validateNumber,
  validateRate,
  validateEmail,
  validatePanCard,
  validateCharNumber,
  validateChar,
  ValidateDecimal,
  validateText,
  validateAddress,
  ValidateOTP,
  ValidateLoginDetails,
  validateListingLeadForm,
  cloneObject,
  validateCharWithoutSpace,
  validateEligibilityCalculatorForm,validateCharNumberWidthSpace,HraValidation,validateIndianNumber
}