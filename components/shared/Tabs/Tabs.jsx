import React, {useState,useEffect,useRef } from 'react';
import style from './Tabs.module.css';
export const Tabs = ({data,activeSpecific,showTab,setActiveTab,activeTab}) => {
  
  const checkTab =(id)=>{
    var violation = ''; 
    switch (id) {
      case 'QuickComparison':
       return violation = 20;
      case 'Return':
        return violation = 0;
      case 'HoldingAnalysis':
        return violation =210;
      case 'Ratios':
        return violation =280;
      case 'MoreDetails':
        return violation =350;
      default:
        return violation= 0;
    }
  }
  const handleClick = (e, index,id) => {
    setActiveTab(index);
    window.scrollTo({
      top: checkTab(id),
      behavior:"smooth"
    })
      ;
    // window.history.replaceState(null,"","#"+id)
  };
  const updateKey = (value) => {
    return value.split(" ").join("")
  }
  return (
    <section className={`${style.tabSection}`}>
        <div className={`${style.tabElement} container`}>
        <ul>
            {data.map((item, index) =>
            <li key={index}  className={`${activeTab === index  ? style.active : 'links'}`} onClick={(e) => {handleClick(e, index,updateKey(data[index].name)); showTab(updateKey(data[index].name),index);}}><a >{item.name}</a></li>
            // <li key={index} className='links' onClick={(e) => handleClick(e, index,updateKey(data[index].name))}><a >{item.name}</a></li>
            )}
        </ul>
        </div>
    </section>
  )
}
