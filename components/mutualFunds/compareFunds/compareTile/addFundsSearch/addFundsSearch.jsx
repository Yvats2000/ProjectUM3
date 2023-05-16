import React,{useState,useEffect} from 'react';
import Image from 'next/image';
import styles from './addFundsSearch.module.css';
import { getAmcApi } from '../../../../../services/mutualFunds';
import Validation from '../../../../../form/Validation';
import {useRouter} from 'next/router';
import { useGlobalContext } from '../../../../../libs/context'
export const AddFundsSearch = ({setshowSearch,showSearch,modelCenter,handleChange}) => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const {isMobile} = useGlobalContext();
  const [suggestionsList, setsuggestions] = useState([]);
  
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
      setsuggestions(amcList)
      // setsuggestions(onlyAMC ? amcList.filter((item) => item.schemeSlug === "") : amcList)
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
  const betterFunction = debounced(getBalance, 0.5)
  
  const addCompare = schemeCode =>{
    let _url=router.asPath;
    const _pageIdx=_url.indexOf("schemeCode=");
    const _isQuery=_url.split("?").length>1;
    if(_isQuery && _pageIdx > -1)
    {
      let pathArry =router.query.schemeCode && router.query.schemeCode.split(',');
      router.push(`${process.env.BASE_URL}${router.asPath}${pathArry.length > 0 ? ',' : ''}${schemeCode}`)
    }
    else
    {
      router.push(`${process.env.BASE_URL}${_url}?schemeCode=${schemeCode}`);
    }
  }
  return (
      <>
        
          <div className={`${styles.addCardPopup} ${modelCenter && styles.modelCenter}`}>
              <h3>Search Mutual Fund to Compare</h3>
              <div className={styles.crossicon} onClick={()=>setshowSearch(!showSearch)}><Image width={18} height={18} src="/assets/images/closeFilter.svg" alt=""/></div>
              <div className={styles.inputSearch}>
                  <input type="text" 
                    autoComplete="off"
                    value={search.text}
                    onBlur={betterFunction}
                    onChange={onTextChanged} placeholder="Type to Select Mutual Fund"/>
                  {!isMobile && <button className="btn btn-primary font14">Add to Compare</button>}
                  {suggestionsList && suggestionsList.length > 0 && <ul className={styles.drpDown}>
                    {
                    suggestionsList.map((item, index) => (  
                      item.schemeSlug !="" &&
                    // <li key={index} className="font14  text444 cursorPointer" onClick={()=>modelCenter ? handleChange(item.schemecode) : addCompare(item.schemecode)}>
                    <li key={index} className="font14  text444 cursorPointer" onClick={()=>handleChange(item.schemecode)}>
                      {item.scheme_name} 
                    </li>
                    ))}
                  </ul>}
              </div>
              {/* <p>Note: <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas tenetur tempore est cupiditate
                      enim aliquid?</span>
              </p> */}
          </div>
          <div className={styles.popupBg}>
        </div>
      </>
    
  )
}
