import React from 'react'
import {getMaster} from "../../../services/master";
import AsyncSelect from 'react-select/async';
export const CitySelect = ({cityAutoHandle,selectedValueCity, required=false}) => {
    const getData = async (inputValue) => {
        let res = await getMaster("cities");
        return res.cities;
      };
      const loadOptionsCity = (inputValue) => {
        return getData(inputValue).then((res) => {
          return res
            .filter((r) => r.name.toLowerCase().startsWith(inputValue))
            .map((t) => ({ value: t.id, label: t.name }));
        });
      };
  return (
    <AsyncSelect 
        value={selectedValueCity} 
        placeholder={required ? 'Select City *' : 'Choose City'} 
        cacheOptions defaultOptions 
        loadOptions={loadOptionsCity} 
        onChange={cityAutoHandle} />
  )
}
