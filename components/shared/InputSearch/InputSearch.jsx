import React,{useState,useEffect,useRef} from 'react';
import InputText from '../../../form/inputText'
import styles from './InputSearch.module.css';
import {getMaster} from '../../../services/creditCard';
export const InputSearch = ({masterName, validationError, name, value, handleChange, tile, label, disabled = false, text}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestionsList, setsuggestions] = useState([])

  useEffect(async()=>{
    await getBalance()
  },[value])

  const getBalance = async() => {
    if (value.length > 2) {
      let list = await getMaster(`masterName=${masterName}&searchQuery=${value}`);
      setsuggestions(list)
    }else{
      setsuggestions([])
    }
  };

  const debounced = function (fn, d) {
    let timer;
    return function () {
        let context = this,
        args = arguments;
        clearInterval(timer);
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, d)
    }
  }
  
  const betterFunction = debounced(getBalance, 0.5);
  const dropdown = useRef(null);
    
  useEffect(() => {
    if (!showDropdown) return;
    function handleClick(event) {
      if (dropdown.current && !dropdown.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [showDropdown]);

  return (
    <>
      <div className={`form-item searchBox ${disabled?'labelTop':''}`} onClick={() => setShowDropdown(b => !b)}>
        <InputText type="text"
          id={name}
          name={name}
          autoComplete="off"
          handleChange={(e) => handleChange(e, name, tile)} 
          value={text ? text : value} 
          disabled = {disabled}
          onBlur={betterFunction}
          className={ `formInput`}
          required={true}
        />
        <label htmlFor={name} dangerouslySetInnerHTML={{__html:label}}></label>
        {showDropdown && (<div className={styles.drpDown} ref={dropdown}>
        {suggestionsList && suggestionsList.length > 0 && (
          <ul>
          {suggestionsList.map((item, index) => (  
            <li key={index} className="font14  lineHeight20 text444 fontsemiBold" onClick={()=>handleChange(name === 'CompanyCode' || name === 'Designation' ? item : item.Code, name, tile)}>
              <p>{item.Text}</p>
              {item.city && item.state && <span className={`font12 ${styles.equityList}`}>{item.city} <span className='font10'>({item.state})</span></span>}
            </li>
          ))}
          </ul>
        )}
        </div>)}
        {
          validationError && validationError.ERROR && validationError.errors && Object.keys(validationError.errors).some((item)=> item === name) 
          ? 
          <span className="errorText">{validationError && validationError.errors && validationError.errors[name]}</span>
          : 
          null
        }
      </div>
    </>
  )
}
