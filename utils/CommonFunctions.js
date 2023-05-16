const commonFunctions = { 
    numformat (value) {
        var val = Math.abs(Number(value));
        let currencyName = "INR";
        const currencyOption = {
            maximumSignigicantDigits: 3,
            currency: currencyName || 'INR'
        }

        let amount = String(value);
        if (val >= 10000000) {
            amount = commonFunctions.setDecimal((val / 10000000), 1) + ' Cr';
        } else if (val >= 100000) {
            amount = commonFunctions.setDecimal((val / 100000), 1) + ' L';
        } else {
            amount = new Intl.NumberFormat('en-IN', currencyOption).format(val);
        }
        return amount;
    },
    capitalize(s){
        return s[0].toUpperCase() + s.slice(1);
    },
    countWords(str){
      let numWords = 0;
      for (let i = 0; i < str.length; i++) {
          let currentCharacter = str[i];
          if (currentCharacter === " ") {
            numWords += 1;
          }
      }
      return numWords;
    },
    stringToSlug(str){
      return str.replace(/\s+/g, '-').toLowerCase();
    },
    breakCamelCase (str = ''){
      const isUpper = (char = '') => char.toLowerCase() !== char.toUpperCase() && char === char.toUpperCase();
      let res = '';
      const { length: len } = str;
      for(let i = 0; i < len; i++){
      const el = str[i];
      if(isUpper(el) && i !== 0){
          res += ` ${el}`;
          continue;
      };
      res += el;
      };
      return commonFunctions.capitalize(res);
    },
    getFormatedStringFromDays (value){
      if(parseInt(value) > 0){
        /*let years = Math.floor(numberOfDays / 365) > 0 ? Math.floor(numberOfDays / 365) + ' Yr ' : '';
        let days = Math.floor(numberOfDays % 365 / 30 * 30);
        return days > 0 ? years + days + ' Days' : years;*/

        var year, years, month, months, week, weeks, day, days;
      
        year = value >= 365 ? Math.floor(value / 365) : '';
        years = year > 0 ? year + ' Year ' : '';
        value = year ? value - (year*365) : value;
        
        month = value >= 30 ? Math.floor((value % 365) / 30) : '';
        months = month > 0 ? month + ' Months ' : '';
        value = month ? value - (month*30) : value;
     
        /*week = value >= 7 ? Math.floor((value % 365) / 7) : '';
        weeks = week > 0 ? week + ' Week ' : '';
        value = week ? value - (week*7) : value;*/
        
        //day = value < 7 ? Math.floor((value % 365) % 7) : '';
        day = value > 0 ? Math.floor(value % 365 / 30 * 30) : '';
        days = day > 0 ? day + ' Days ' : '';
        
        return years + months + days;
      } else {
        return ''
      }
    },
    setDecimal (amount, decimalPlaces) {
        amount = amount.toString();
        let arr = amount.split(".")
        return arr[0] + "." + (arr[1] ? arr[1].substr(0, decimalPlaces) : '0');
    },
    relatedArticles (data){
      data.map((item, index)=>{data[index].post_content = item.post_content.slice(0, 200)+'</p>'
     })
     return data;
    },
    convertNumberToWords (input, start = '', end = '') {
        const rupees = Number(parseInt(input.replace(/,/g, ''), 10));
        const output = [];
      
        if (rupees === 0) {
          output.push("zero");
        } else if (rupees === 1) {
          output.push("one");
        } else {
          const mil = Math.floor(rupees / 1000000000) % 100;
          if (mil > 0) {
            output.push(`${getHundreds(mil)} Hundred crore`);
          }
          const crores = Math.floor(rupees / 10000000) % 100;
          if (crores > 0) {
            output.push(`${getHundreds(crores)} crore`);
          }
      
          const lakhs = Math.floor(rupees / 100000) % 100;
          if (lakhs > 0) {
            output.push(`${getHundreds(lakhs)} lakh`);
          }
      
          const thousands = Math.floor(rupees / 1000) % 100;
          if (thousands > 0) {
            output.push(`${getHundreds(thousands)} thousand`);
          }
      
          const hundreds = Math.floor((rupees % 1000) / 100);
          if (hundreds > 0 && hundreds < 10) {
            output.push(`${getOnes(hundreds)} hundred`);
          }
      
          const tens = rupees % 100;
          if (tens > 0) {
            if (rupees > 100) output.push("and");
            output.push(`${getHundreds(tens)}`);
          }
        }
      
        return [start, ...output, end]
          .join(" ")
          .split(/\s/)
          .filter((e) => e)
          .map((e) => e.substr(0, 1).toUpperCase() + e.substr(1))
          .join(" ");
    },
    ordinal_suffix_of (i) {
        i = Number(i);
        var j = i % 10,
            k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    },
    IndianNumberFormat (data) {
      if(data !== undefined && data !== '') {
          return new Intl.NumberFormat('en-IN', { currency: 'INR' }).format(Number(data));
      } else {
          return '';
      }
    },
    NumbertoWords (data) {
      return commonFunctions.convertNumberToWords(String(commonFunctions.IndianNumberFormat(data)));
    }
}

const getOnes = (number) => {
    const ones = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    return ones[number] || "";
  }
  
  const getTeens = (number) => {
    const teens = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
    return teens[number] || "";
  }
  
  const getTens = (number) => {
    const tens = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];
    return tens[number] || "";
  }
  
  const getHundreds = (num) => {
    if (num > 0 && num < 10) {
      return getOnes(num);
    }
    if (num >= 10 && num < 20) {
      return getTeens(num % 10);
    }
    if (num >= 20 && num < 100) {
      return `${getTens(Math.floor(num / 10))} ${getOnes(num % 10)}`;
    }
    return "";
  }
export default commonFunctions;