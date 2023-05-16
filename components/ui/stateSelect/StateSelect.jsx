import React from 'react'
import {getMaster} from "../../../services/master";
import AsyncSelect from 'react-select/async';
export const StateSelect = ({cityAutoHandle,selectedValueCity, required=false,data}) => {
    const getData = async (inputValue) => {
        return data;
      };
      const loadOptionsCity = (inputValue) => {
        return getData(inputValue).then((res) => {
          return res
            .filter((r) => r.stateName.toLowerCase().startsWith(inputValue))
            .map((t) => ({ value: t.stateId, label: t.stateName }));
        });
      };
  return (
    <AsyncSelect 
        value={selectedValueCity} 
        placeholder={'Select State *'} 
        cacheOptions defaultOptions 
        loadOptions={loadOptionsCity} 
        onChange={cityAutoHandle} />
  )
}
