import React,{ useState } from 'react'
import {Select as SelectBox} from '../../ui';
import styles from './../gold&silver.module.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import Image from 'next/image';
import { useRouter } from 'next/router'
export const CitySelect = ({cityList,shoDate, mergeCity=false, topTen={}, cityListOther={}}) => {
    const router = useRouter();
    const silverPath = router.route.replace('/','').split("/")[0];
    const cityPath = router.query.city;
    if(mergeCity){
        var initialData = topTen
        var newData = cityListOther
        var ids = new Set(initialData.map(d => d.id));
        cityList = [...initialData, ...newData.filter(d => !ids.has(d.id))];
      }
    const onCityChange = async(value,type) => {
        type==='city'?router.push(`/${silverPath}/${value}`):router.push(`/${value}`)
      };
  return (
    <div className={`${shoDate?styles.selectGrid:styles.grid2}`}>
            <SelectBox name="EmpType" required onChange={(e) => onCityChange(e.target.value,'metal')}>
                <>
                    <option value={'gold-rate'} selected={silverPath ==='gold-rate'?'selected' : ''}>Gold</option>
                    <option value={'silver-rate'} selected={silverPath ==='silver-rate'?'selected' : ''}>Silver</option>
                </>
                </SelectBox>    
            <SelectBox name="EmpType" required onChange={(e) => onCityChange(e.target.value, 'city')}>
                <>
                    <option value="" disabled selected>Select City</option>
                    {cityList && cityList.map((e)=>{
                    return <option value={e.slug} key={e.slug} selected={cityPath === e.slug?'selected':''}>{e.cityName}</option>
                    })}
                </>
                </SelectBox>
                {/* {shoDate&&<div className="formGroup mb10 zIndex4">
                <div className="inputIcon">
                    <dd className="calendar">
                    <Image src={process.env.IMAGE_BASEURL + '/images/ic_calendar.svg'} width={19} height={20}  className="imgResponsive" alt="bt svg" />                  </dd>
                    <DatePicker  
                    dateFormat="dd/MM/yyyy"
                    name="OtherDocExpDate"
                    autoComplete="off"
                    className= {`formInput `}
                    selected={new Date()}
                    placeholderText = "Document Expiry Date*"
                    onChange={(e) => handleChange(e, 'OtherDocExpDate', tile, 'DOB')} 
                    showYearDropdown
                    yearDropdownItemNumber={50}
                    scrollableYearDropdown
                    //   minDate={moment().subtract(59, "years")._d}
                    //   maxDate={moment().subtract(18, 'years')._d}
                    />
                    
                </div>
            </div>} */}
    </div>
  )
}
