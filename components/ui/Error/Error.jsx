import React from "react";

export function Error(props)  {
  return (
    <>
    {
      props.validationError && props.validationError.ERROR && props.validationError.errors && Object.keys(props.validationError.errors).some((item)=> item === props.name) 
      ? 
      <span className="errorText">{props.validationError && props.validationError.errors && props.validationError.errors[props.name]}</span>
      : 
      null
    }
    </>
  );
};
