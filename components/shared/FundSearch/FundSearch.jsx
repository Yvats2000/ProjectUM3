import React, { useState, useEffect ,useRef} from 'react';
import { getAmcApi } from '../../../services/mutualFunds';
import Validation from '../../../form/Validation';
import Image from "next/image";
import styles from './FundSearch.module.css';
export const FundSearch = ({onlyAMC = false,innerPage=false}) => {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestionsList, setsuggestions] = useState([])
  
  const onTextChanged = async(e) => {
    let value = e.target.value
    if(Validation.validateChar(value)){
      setSearch(value)
    }
  };
  useEffect(async()=>{
    await getBalance()
  },[search])

  const getBalance = async() => {
    if (search.length > 2) {
      let amcList = await getAmcApi(`amc?name=${search}`, 'search');
      setsuggestions(onlyAMC ? amcList.filter((item) => item.schemeSlug === "") : amcList)
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
    <div className={`${styles.inputSearch} ${innerPage && styles.innerSearch} ${onlyAMC && styles.amc}`} onClick={() => setShowDropdown(b => !b)}>
        <input
          id="input"
          type="text"
          autoComplete="off"
          value={search.text}
          onBlur={betterFunction}
          onChange={onTextChanged}
          placeholder={onlyAMC ? "Search Fund House" : "Search Fund House/ Fund Scheme"}
        />
        {showDropdown && (<div className={styles.drpDown} ref={dropdown}>
          {suggestionsList && suggestionsList.length > 0 && (
            <ul>
              {suggestionsList.map((item, index) => (  
                  <li key={index}>
                    <a className="font14  lineHeight20 text444 fontsemiBold" href={item.schemeSlug.length && item.amcSlug.length>0?`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}/${item.schemeSlug}`:`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}`}>
                    <div className={styles.fundName}>
                    <figure><img src={item.schemeSlug.length && item.amcSlug.length > 0 ? process.env.IMAGE_BASEURL + `/amc/icon/${item.amcLogo}`:process.env.IMAGE_BASEURL + `/amc/icon/${item.amcLogo}`} style={{ width: "21px", height: "21px" }} alt={item.schemeSlug.length && item.amcSlug.length>0?item.scheme_name:item.fund}/></figure>
                    {item.schemeSlug.length && item.amcSlug.length > 0 ?item.scheme_name:item.fund}
                    </div>
                    {!onlyAMC && <p className={`font12 ${item.schemeSlug.length && item.amcSlug.length > 0? styles.equityList:styles.amcList}`} title={item.scheme_name}>{item.schemeSlug.length && item.amcSlug.length > 0?"Scheme":"AMC"} </p>}
                    </a>
                </li>
              ))}
            </ul>
          )}
        </div>)}
        {!onlyAMC && <span className={styles.searchIcon}><Image className="imgResponsive" src='/assets/images/Search.svg' alt="" width={20} height={20} /></span>}
      </div>
  )
}