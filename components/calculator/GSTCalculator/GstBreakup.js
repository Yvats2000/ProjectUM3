import styles from "../calculator.module.css";
import InputText from '../../../form/inputText';
import Image from 'next/image'
import { useState } from "react";
export const GstBreakup = ({apiAmount,activeGst,setActiveGst,formDetails})=>{
    const [showGSt, setshowGSt] = useState(false);
    const handleChange = (e) => {
        setshowGSt(e.target.checked)

    }; 
    const GSTcalulation = (formDetails)=>{
        return showGSt?formDetails.gstRoi/2:formDetails.gstRoi;
    }
    return(
        <div className={`${styles.menuoverlay} ${activeGst?styles.active:null}`}>          
            <div className={styles.menuOption}>
                <div className={`${styles.img} mb15`}>
                    <h1 className=" font16  fontsemiBold text231f20">GST Calculation Full Breakup</h1>
                        <Image src="/assets/images/crossicon.svg" width={14} height={14} alt="Urban Money" onClick={()=>setActiveGst(false)}/>
                </div>
                <div className={styles.checkinput}>
                    <label className="text231f20 font12">State of Biling is same as the State of Production</label>
                    <InputText className="form-check-input" checked="checked" type="checkbox" id="acc" name="" value=""  handleChange={handleChange}/>
                </div>
                <ul>
                    <li><p className="font12 text231f20">Costs of Goods/Services</p><p className="textBlack ">₹ {apiAmount.costOfGoodsAndServices?apiAmount.costOfGoodsAndServices.toLocaleString('en-IN'):'-'}</p></li>
                    <li><p className="font12 text231f20">Profit at <span className="textLink">{formDetails.profitRatio?formDetails.profitRatio:null}%</span></p><p className="textBlack ">₹ {apiAmount.profitAt10?apiAmount.profitAt10.toLocaleString('en-IN'):'-'}</p></li>
                    <li><p className="font12 text231f20  fontsemiBold">GST <span className="textLink">{formDetails.gstRoi?formDetails.gstRoi:null} %</span></p><p className="textBlack ">₹ {apiAmount.totalGst?apiAmount.totalGst.toLocaleString('en-IN'):'-'}</p></li>
                    {showGSt === true?
                        <>
                            <li className={styles.active}><p className="font12 text231f20 ">CGST <span className="textLink">{formDetails.gstRoi?GSTcalulation(formDetails):null}%</span></p><p className="textBlack  ">₹ {apiAmount.cgst?apiAmount.cgst.toLocaleString('en-IN'):'-'}</p></li>
                            <li className={styles.active}><p className="font12 text231f20 ">SGST <span className="textLink">{formDetails.gstRoi?GSTcalulation(formDetails):null}%</span></p><p className="textBlack ">₹ {apiAmount.sgst?apiAmount.sgst.toLocaleString('en-IN'):'-'}</p></li></>
                        :<li><p className="font12 text231f20  fontsemiBold">IGST <span className="textLink">{formDetails.gstRoi?formDetails.gstRoi:null}%</span></p><p className="textBlack ">₹ {apiAmount.cgst && apiAmount.sgst?(apiAmount.cgst+apiAmount.sgst).toLocaleString('en-IN'):'-'}</p></li>
                    }
                    
                    <li><p className="font12 text231f20 fontsemiBold">Total Seling Price</p><p className="textBlack font600 ">₹ {apiAmount.totalSellingPrice?apiAmount.totalSellingPrice.toLocaleString('en-IN'):'-' }</p></li>
                </ul>
            </div>
        </div>
    )
}