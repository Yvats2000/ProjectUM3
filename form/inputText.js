import React from "react";


const InputText = (props) => {
    
    return ( 
        <>
        <input 
        type = { props.type }
        name = { props.name }
        onKeyUp = { props.onKeyUp }
        onKeyDown = { props.onKeyDown }
        onKeyPress = {props.validateInput?(e) => props.validateInput(e):null }
        onInput = {props.validateInput?(e) => props.validateInput(e):null }
        className = { props.className }
        value = { props.value }
        autoComplete="off"
        disabled={props.disabled}
        onBlur= {props.handleBlur? props.handleBlur :null }
        placeholder = { props.placeholder }
        required={props.required}
        max={props.max}
        min={props.min}
        maxLength={props.maxLength}
        onChange = {(e) => props.handleChange(e) }  />
        </>
    );
};

export default InputText

