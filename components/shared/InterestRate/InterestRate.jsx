import styles from "./InterestRate.module.css";
import React,{useState} from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";
import { LeadPopup } from "../../shared";
import {NavLink} from '../../ui';
import { PopUp } from "../";
import { eligibilityCalApply } from "../../../services/calculators";
import { isMobile } from "react-device-detect";
export const InterestRate = ({interestRates, emi, allLoans, calculatorEmi = false, applyNow = '', detailShow = true}) => {
    let data = interestRates && interestRates.length > 0 ? interestRates[0].plans : [];
    const loanName =  interestRates[0].productName || '';
    let title = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
    const router = useRouter();
    const [openDetails, setOpen] = useState(-1);
    const [openThankYouPopup,setThankYouPopUp] = useState(false);
    const [openLeadPopup, setLeadPopup] = useState(false);
    const [bankSlug, setBankSlug] = useState('');
    const [productName, setProductName] = useState('');
    const records = 15;
    const [showNumberOfBanks, setShowNumberOfBanks] = useState(records);
    const toggleDetails = (index) => {
        if(openDetails === index){
            setOpen(-1)
        }else{
            setOpen(index)
        }
    }
    const viewMore = (index) => {
        setShowNumberOfBanks(showNumberOfBanks+records)
    }
    const enquireNowHandle = (bankSlug, productName) => {
        // if(bankSlug === 'icici-bank' && productName === 'Home Loan'){
        //     router.push('https://loan.urbanmoney.com/home-loan-journey?instantLoan=ICICI_HOME_LOAN')
        // }else if(bankSlug === 'godrej-housing-finance' && productName === 'Home Loan'){
        //     router.push('https://loan.urbanmoney.com/home-loan-journey?instantLoan=GHF_LOAN')
        // }else{
            setProductName(productName);
            setBankSlug(bankSlug);
            setLeadPopup(true);
        //}
    }
    const applyNowHandle = async (leadIdE, lenderSlug) => {
        await eligibilityCalApply(leadIdE, lenderSlug);
        setThankYouPopUp(true);
    }
    const redirectLink = (e,url) =>{
        e.preventDefault();
        router.push(url)
    }
    if (!data || data.length == 0)
        return null;
    return (
        <React.Fragment>
        {openLeadPopup ? <LeadPopup bankSlug={bankSlug} productName={productName} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
        {openThankYouPopup ? <PopUp title={title} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
        <div className={styles.planDiv}>
            {isMobile? data.map((item, index) =>
                <div key={index} className={`${styles.tableHeaderMobile} ${index+1 <= showNumberOfBanks ? styles.active : null}`}>
                    <ul className={styles.mobileHeader}>
                        <li>
                            {/* <NavLink href={`/banks-in-india/${item.lenderSlug}/${interestRates[0].productSlug}`}> */}
                            {item.isBankProduct || !calculatorEmi ? <NavLink href={`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}`}>
                                <figure>
                                    <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + item.lenderLogo} width={166} height={40} alt={`${item.lenderName} ${item.planName} Interest Rate`}/>
                                </figure>
                            </NavLink> 
                            :
                            <figure>
                                <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + item.lenderLogo} width={166} height={40} alt={`${item.lenderName} ${item.planName} Interest Rate`}/>
                            </figure>}
                            <NavLink href={`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}/${interestRates[0].productSlug}`} >
                                <h3 title={item.lenderName + " " + (loanName == 'Loan Against Property' ? ' LAP' : loanName)} className="font10 text666 textTruncate mt5">{item.lenderName + " " + (loanName == 'Loan Against Property' ? ' LAP' : loanName)}</h3>
                            </NavLink>
                            
                        </li>
                        {/* <li className={`fontBold ${styles.bankName}`}>{item.planName || ''}</li> */}
                        <li>
                            {applyNow != '' ? 
                            <button className={`${styles.mobApply} btn btn-primary fontMedium btnSm font12 `} onClick={() => applyNowHandle(applyNow, item.lenderSlug)}>Apply Now</button>
                            :
                            <button className={`${styles.mobApply} btn btn-primary fontMedium btnSm font12 `} onClick={() => enquireNowHandle(item.lenderSlug, item.planName)}>
                                {/* {(item.lenderSlug === 'icici-bank' && item.planName === 'Home Loan') || (item.lenderSlug === 'godrej-housing-finance' && item.planName === 'Home Loan') 
                                ? 'Get Offer' : 'Enquire Now'} */}
                                Enquire Now
                            </button>
                            }
                        </li>
                    </ul>
                    <div className={styles.bankData}>
                        <table className={styles.dataTable}>
                        <thead>
                            {emi ?
                            <tr>
                                <td width="115"  className="text666 opt80">EMI Amount</td>
                                <td width="10">:</td>
                                <td className="text444">{item.emiMetadata.emi ? '₹ ' + Math.round(item.emiMetadata.emi).toLocaleString('en-IN') : '--'}</td>
                            </tr>
                            :
                            <tr>
                                <td width="115"  className="text666 opt80">Loan Amount</td>
                                <td width="10">:</td>
                                <td className="text444">{item.loanAmountMetadata.text || '--'}</td>
                            </tr>}
                            <tr>
                                <td  className="text666 opt80">Interest Rate</td>
                                <td width="10">:</td>
                                <td className="text444">{item.interestRateMetadata.text || '--'}</td>
                            </tr>
                            <tr>
                                <td  className="text666 opt80">Processing Fee</td>
                                <td width="10">:</td>
                                <td className="text444"> {item.processingFeeMetadata.text === 'Nil'?<div className={styles.nillAplly}>0 Processing Fee</div>:item.processingFeeMetadata.text || '--'}</td>
                            </tr>
                            <tr>
                                <td  className="text666 opt80">Rating</td>
                                <td width="10">:</td>
                                <td className="text444">{item ? <span className={styles.ratingBox}>{item.lenderRating || '--'}<em className={styles.ratingStar}></em> </span> : <React.Fragment />}</td>
                            </tr>
                            {emi ? null :
                            <tr>
                                <td  className="text666 opt80">Tenure</td>
                                <td width="10">:</td>
                                <td className="text444">{item.tenureMetadata.max ? item.tenureMetadata.max/12 : item.tenureMetadata.min/12} Years</td>
                            </tr>
                            }
                            {calculatorEmi ? 
                            <tr>
                                <td  className="text666 opt80">Monthly EMI</td>
                                <td width="10">:</td>
                                <td className="text444">{item.emiAmount ? '₹ ' + Math.round(item.emiAmount).toLocaleString('en-IN') : '--'}</td>
                            </tr>:null}
                            </thead>
                        </table>
                        { item.details && item.details.length > 0 ? 
                        <>
                        {detailShow ? 
                        <span className={`${styles.mobTableDetails} ${openDetails === index?styles.active:''} cursorPointer`} onClick={() => toggleDetails(index)}>Details</span>
                        :
                        // <NavLink href={`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}/${interestRates[0].productSlug}`} className={`${styles.mobTableDetails} ${openDetails === index?styles.active:''} cursorPointer`}>
                           <span className={`${styles.mobTableDetails} ${openDetails === index?styles.active:''} cursorPointer`} onClick={(e) => redirectLink(e,`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}/${interestRates[0].productSlug}`)}>Details</span>
                            // </NavLink>
                        }
                        {openDetails === index ?
                        <div className={`${styles.detailBoxDesc} blueMarker`}>
                            {item.details.map((heading,index) =>
                            <div className={styles.loanDetails} key={index}>
                                <h2>{heading.title}</h2>
                                <ul>
                                {heading.points.map((desc,index) => 
                                    <li key={index}>{desc}</li>
                                )}
                                </ul>
                            </div>
                            )}
                        </div>
                        : <React.Fragment /> }
                        </>
                        : <React.Fragment /> }
                    </div>
                </div>
            ):<table className={`${styles.planTable} ${allLoans?styles.allLoans:<React.Fragment />} `} cellPadding="0">
            <thead>
                <tr>
                    <th><h2 className="font14 fontsemiBold">{loanName} Banks</h2></th>
                    <th><h2 className="font14 fontsemiBold">Interest Rate</h2></th>
                    <th><h2 className="font14 fontsemiBold">Processing Fee</h2></th>
                    <th><h2 className="font14 fontsemiBold">Rating</h2></th>
                    <th><h2 className="font14 fontsemiBold">{emi ? 'EMI Amount' : 'Loan Amount/Tenure'}</h2></th>
                    {calculatorEmi ? <th><h2 className="font14 fontsemiBold">Monthly EMI</h2></th> : null}
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) =>
                    <tr key={index} className={`${openDetails === index ? styles.trActive : null} ${index+1 <= showNumberOfBanks ? styles.active : null}`}>
                        <td>
                            {/* <NavLink href={`/banks-in-india/${item.lenderSlug}/${interestRates[0].productSlug}`}> */}
                            {item.tag ? <div className={`${styles.ribbon} ${styles[item.tagClass]}`}><span className={styles.ribbonArrow}></span>{item.tag}</div> : null}
                            {item.isBankProduct || !calculatorEmi ? <NavLink href={`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}`}>
                                <figure>
                                    <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + item.lenderLogo} width={150} height={30} layout="intrinsic" alt={`${item.lenderName} ${item.planName} Interest Rate`}/>
                                </figure>
                            </NavLink>
                            :
                            <figure>
                                <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + item.lenderLogo} width={150} height={30} layout="intrinsic" alt={`${item.lenderName} ${item.planName} Interest Rate`}/>
                            </figure>}
                            <NavLink href={`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}/${interestRates[0].productSlug}`} >
                            <h3 title={item.lenderName + " " + (loanName == 'Loan Against Property' ? ' LAP' : loanName)} className="font12 cursorPointer text666 textTruncate mt5">{item.lenderName + " " + (loanName == 'Loan Against Property' ? ' LAP' : loanName)}</h3>
                            </NavLink>
                            {/* <span className={styles.planName}>{item.planName || ''}</span> */}
                        </td>
                        <td>
                            <p className="applynowTitle mb5 font14 fontBold">{item.interestRateMetadata.text || '--'}</p>
                            <p className="font14 text666 opt80 lineHeight22">{item.interestRateMetadata.label || ''}</p>
                        </td>
                        <td>
                            <p className="applynowTitle mb5 font14 fontBold">{item.processingFeeMetadata.text === 'Nil'?<div className={styles.nillAplly}>0 Processing Fee</div>: item.processingFeeMetadata.text || '--'}</p>
                            <p className="font14 text666 opt80 lineHeight22">{item.processingFeeMetadata.label || ''}</p>
                        </td>
                        <td>
                            <p className="applynowTitle mb5 font14 fontBold">{item ? <span className={styles.ratingBox}>{item.lenderRating || '--'}<em className={styles.ratingStar}></em> </span> : <React.Fragment />}</p>
                            
                        </td>
                        {emi ?
                        <td>
                            <p className="applynowTitle font14 mb5 fontBold">{item.emiMetadata.emi ? '₹ ' + Math.round(item.emiMetadata.emi).toLocaleString('en-IN') : '--'}</p>
                        </td>
                        :                           
                        <td>
                            <p className="applynowTitle font14 mb5 fontBold">{item.loanAmountMetadata.text}</p>
                            <p className="font14 text666 opt80 lineHeight22">{item.loanAmountMetadata.label}</p>
                            <p className="font14 text666 opt80 lineHeight22">{item.tenureMetadata.text}</p>
                        </td>}
                        {calculatorEmi ? 
                        <td>
                            <h3 className="applynowTitle mb5">{item.emiAmount ? '₹ ' + Math.round(item.emiAmount).toLocaleString('en-IN') : '--'}</h3>
                        </td>
                        :null}
                        <td>
                            {applyNow != '' ? 
                            <button className="btn btn-primary fontMedium font12 btnSm" onClick={() => applyNowHandle(applyNow, item.lenderSlug)}>Apply Now</button>
                            :
                            <button className="btn btn-primary fontMedium font12 btnSm" onClick={() => enquireNowHandle(item.lenderSlug, item.planName)}>
                                {/* {(item.lenderSlug === 'icici-bank' && item.planName === 'Home Loan') || (item.lenderSlug === 'godrej-housing-finance' && item.planName === 'Home Loan') 
                                ? 'Get Offer' : 'Enquire Now'}  */}
                            Enquire Now
                            </button>
                            }
                            {item.details && item.details.length > 0 ?
                                detailShow ?
                                <span className={` textLink fontMedium cursorPointer detailsbtn ${styles.detailsbtn} ${openDetails === index ? styles.active : ''}`} onClick={() => toggleDetails(index)}>Details</span>    
                                :
                                // <NavLink href={`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}/${interestRates[0].productSlug}`} className={` textLink fontMedium cursorPointer detailsbtn ${styles.detailsbtn} ${openDetails === index ? styles.active : ''}`}>
                                    <span className={` textLink fontMedium cursorPointer detailsbtn ${styles.detailsbtn} ${openDetails === index ? styles.active : ''}`} onClick={(e) => redirectLink(e,`${process.env.BASE_URL}/banks-in-india/${item.lenderSlug}/${interestRates[0].productSlug}`)}>Details</span>
                                // </NavLink>
                            : <React.Fragment />}
                            {openDetails === index ? 
                            <div className={`${styles.detailBoxDesc} blueMarker`}>
                                <div className={styles.loanDetails}>
                                    {item.details[0] ?
                                    <>
                                        <h2>{item.details[0].title}</h2>
                                        <ul>
                                        {item.details[0].points.map((title,index) =>
                                            <li key={index}>{title}</li>
                                        )}
                                        </ul>
                                    </>
                                    :null}
                                    {item.details[1] ?
                                    <>
                                        <h2>{item.details[1].title}</h2>
                                        <ul>
                                        {item.details[1].points.map((title,index) =>
                                            <li key={index}>{title}</li>
                                        )}
                                        </ul>
                                    </>
                                    :null}
                                </div>
                                <div className={styles.loanDetails}>
                                    {item.details[2] ?
                                    <>
                                        <h2>{item.details[2].title}</h2>
                                        <ul>
                                        {item.details[2].points.map((title,index) =>
                                            <li key={index}>{title}</li>
                                        )}
                                        </ul>
                                    </>
                                    :null}
                                </div>
                                <div className={`${styles.loanDetails} ${styles.loanDetailsPerks}`}>
                                    {item.details[3] ?
                                    <>
                                        <h2>{item.details[3].title}</h2>
                                        <ul>
                                        {item.details[3].points.map((title,index) =>
                                            <li key={index}>{title}</li>
                                        )}
                                        </ul>
                                    </>
                                    :null}
                                    {item.details[4] ?
                                    <>
                                        <h2>{item.details[4].title}</h2>
                                        <ul>
                                        {item.details[4].points.map((title,index) =>
                                            <li key={index}>{title}</li>
                                        )}
                                        </ul>
                                    </>
                                    :null}
                                </div>
                            </div>
                            : <React.Fragment />}  
                        </td>
                    </tr>
                )}
            </tbody>
        </table>}
            
            
        </div>
        {showNumberOfBanks <= data.length ?
        <div className="btnBox">
            <button className="btn btnOutline font14 btnMd fontMedium btnFull" onClick={() => viewMore()}>View More</button>
        </div> :null}
        </React.Fragment>
    )
}