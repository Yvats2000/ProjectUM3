import { NavLink } from "../../ui";
import React, {useState } from "react";
import { useEffect } from "react";
export const SIPRadio = ({setFormDetails,formDetails})=>{
    const[path,setPath]=useState('')
    const handleRadio = (e) => {
        const { name, value} = e.target;
        setFormDetails({ ...formDetails, [name]: value });
    };
    useEffect(()=>{
        let location=window.location.pathname
        if(location.startsWith("/mutual-funds")){
            setPath(true)
        }
        else{
            setPath(false)
        }
    },[path])
    return(
        <div className="form-container w100 ptl15Sm" >
            <div className="raidoInputBox mb20"  >

                <NavLink href={path?"javascript:void(0);":`${process.env.BASE_URL}/calculator/sip-calculator`}>
                    <label className="radioInput text313541">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="types"
                        id="sip"
                        value="Monthly_Investment"
                        onChange={handleRadio}
                        checked={formDetails.types == "Monthly_Investment"}
                        // defaultChecked={calculatorType == "sip-calculator" ? "checked" : ""}
                    />
                    <span className="radioCheck"></span>
                    <span className="radioText font12">Monthly Investment</span>
                    </label>
                    </NavLink>
                    <NavLink href={path?"javascript:void(0);":`${process.env.BASE_URL}/calculator/lumpsum-calculator`}>
                    <label className="radioInput text313541">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="types"
                        id="lumpsum"
                        value="Lump_Sum_Amount"
                        onChange={handleRadio}
                        checked={formDetails.types == "Lump_Sum_Amount"}
                        // defaultChecked={calculatorType == "lumpsum-calculator" ? "checked" : ""}
                    />
                    <span className="radioCheck"></span>
                    <span className="radioText font12">Lumpsum</span>
                    </label>
                </NavLink>
            </div>
        </div>
    )
}