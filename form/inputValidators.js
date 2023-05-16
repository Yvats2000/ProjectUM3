const isEmail = (event)=>{
    // let char = String.fromCharCode(event.keyCode?event.keyCode:event.which); // Get the character
    if(/([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{4,5}/.test(event.target.value)){
      event.preventDefault();return false;
    } 
    else {return true}
    // else {return false}
}
const isAlphabet = (event)=>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which); // Get the character
    if(/^[A-Za-z \b]+$/.test(char)){ return true;} // Match with regex 
    else {event.preventDefault();return false}
}
const isAlphaNumeric = (event) =>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which); // Get the character
    if(/^[A-Za-z0-9 ]+$/.test(char)){ return true;} // Match with regex 
    else {event.preventDefault();return false}
  }
const  isNumeric = (event) =>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which); // Get the character
    if(/^[0-9]+$/.test(char)){return true;} // Match with regex 
    else {event.preventDefault(); return false}
  }


const  isOpenText = (event) =>{
    return true
  }


const isInrAmount = (event) => {
  let num = event.target.value
  if (num !== "" && num !== null) {
    num = num.replace(/,/g, '');
    var x = parseInt(num);
    x = x.toString();
    var lastThree = x.substring(x.length - 3);

    var otherNumbers = x.substring(0, x.length - 3);
    if (otherNumbers !== '')
      lastThree = ',' + lastThree;
    event.target.value = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
    return
  }
}



const isIndianMobile=(event)=>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which)
    if(/^[0-9]+$/.test(char)){
      if(event.target.value.length<10){
        return true;
      }else{
        event.preventDefault(); return false
      }
      
      } // Match with regex 
    else {event.preventDefault(); return false}
  }

  const isPincode = (event)=>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which)
    if (/^[0-9]+$/.test(char)) {
      if (event.target.value.length < 12) {
        return true;
      } else {
        event.preventDefault();
        return false
      }
    } 
    else {event.preventDefault(); return false}
  }

  const isyear=(event)=>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which)
    if(/^[0-9]+$/.test(char)){
      if(event.target.value.length<2){
        return true;
      }else{
        event.preventDefault(); return false
      }
      
      } // Match with regex 
    else {event.preventDefault(); return false}
  }

  const isNoEmi=(event)=>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which)
    if(/^[0-9]+$/.test(char)){
      if(event.target.value.length<3){
        return true;
      }else{
        event.preventDefault(); return false
      }
      
      } // Match with regex 
    else {event.preventDefault(); return false}
  }
  const isRate=(event)=>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which)
    if(/^[0-9]*\.?[0-9]*$/.test(char)){
      if(event.target.value.length<5){
        return true;
      }else{
        event.preventDefault(); return false
      }
      } 
    else {event.preventDefault(); return false}
  }

 const  isAadhar = (event)=>{
    let char = String.fromCharCode(event.keyCode?event.keyCode:event.which); 
    if(/^[0-9]+$/.test(char)){
      if(event.target.value.length<12){
        return true;
      }else{
        event.preventDefault(); return false
      }  
      } 
    else {event.preventDefault(); return false}
  }
  const isPan = (event) =>{
    if(event.target.value.length<9){
       return true;
     }else{
       event.preventDefault(); return false
     }
 }
 

 export{isPan,isPincode, isNoEmi,isIndianMobile,isEmail,isAadhar,isNumeric,isAlphaNumeric,isAlphabet,isOpenText,isInrAmount, isyear, isRate}
