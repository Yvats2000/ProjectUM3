import React from "react";
import styles from "./Select.module.css";

export function Select(props)  {
  return (
    <>
    <div className={`${styles.rangecalc}`}>  
      {props.label?<label className="font12 fontMedium formLabel">{props.label}</label>:null}
      <div className="selectBox">
        <select
          name={props.name}
          id={props.id}
          disabled={props.disabled}
          className={`formInput ${props.className}`}
          value={props.selectValue}
          onChange={props.onChange}
          {...props}
        >
        {props.children}
        </select>
      </div>
    </div>
    </>
  );
};
