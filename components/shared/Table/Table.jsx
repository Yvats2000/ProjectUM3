import styles from "./Table.module.css"
import { useRouter } from 'next/router'
import { LeadPopup } from "../../shared";
import React,{useState} from 'react'
import {NavLink} from '../../ui';
import { PopUp } from "../";
import { isMobile } from "react-device-detect";
export const Table = ({data, title}) => {
    const router = useRouter();
    const [openThankYouPopup,setThankYouPopUp] = useState(false);
    const [openLeadPopup, setLeadPopup] = useState(false);
    const [bankSlug, setBankSlug] = useState('');
    const [productName, setProductName] = useState('');
    let thankYouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
    const handleClick = (e,productSlug) => {
        e.preventDefault();
        switch (productSlug) {
            case 'home-loan':
            return router.push("/loans/home-loan/eligibility-calculator");
            case 'personal-loan':
            return router.push("/loans/personal-loan/eligibility-calculator");
            default:
            return (
              <></>
            )
        }
    };
    const handleRedirect = (e, path) => {
        e.preventDefault();
        router.push(path)
    };
    const enquireNowHandle = (bankSlug, productName) => {
        setProductName(productName);
        setBankSlug(bankSlug);
        setLeadPopup(true);
    }
    if (!data || data.products.length == 0)
        return null;
    return (
        <>
        {openLeadPopup ? <LeadPopup bankSlug={bankSlug} productName={productName} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
        {openThankYouPopup ? <PopUp title={thankYouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
        <div className="container">
            {title ? <h2 className={`font24 mb50 text2828 Innerheading fontMedium lineHeight36 `}>{title}</h2> : null}
            <div className={styles.planDiv}>
                {isMobile?data && data.products.map((item, index) =>
                <div className={styles.tableHeaderMobile} key={index}>
                    <ul>
                    <NavLink href={`${process.env.BASE_URL}/banks-in-india/${data.lenderSlug}/${item.productSlug}`} className="textLink"><li className="bankName">{data.lenderName} {item.productName || ''}</li></NavLink>
                        <li>
                            {/* <button className={`${styles.mobApply} btn btn-primary fontBold font14  `} onClick={(e) => handleClick(e, "/banks-in-india/"+ data.lenderSlug + "/" + item.productSlug)}>Check Eligibility </button> */}
                            {(item.productSlug === 'home-loan' || item.productSlug === 'personal-loan') ?
                            <button className={`${styles.mobApply} btn btn-primary fontBold font14  `} onClick={(e) => handleClick(e, item.productSlug)}>Check Eligibility</button>
                            :<button className={`${styles.mobApply} btn btn-primary fontBold font14  `} onClick={() => enquireNowHandle(data.lenderSlug, item.productName)}>Enquire Now</button>
                            }
                        </li>
                    </ul>
                    <div className={styles.bankData}>
                        <table className={styles.dataTable}>
                            <thead>
                                <tr>
                                    <td width="45%" className="text666 opt80">Loan Amount</td>
                                    <td width="10">:</td>
                                    <td className="text444">{item.loanAmountMetadata.text}</td>
                                </tr>
                                <tr>
                                    <td width="45%" className="text666 opt80">Interest Rate</td>
                                    <td width="10">:</td>
                                    <td className="text444">{item.interestRateMetadata.text}</td>
                                </tr>
                                <tr>
                                    <td width="45%" className="text666 opt80">Processing Fee</td>
                                    <td width="10">:</td>
                                    {/* <td className="text444">{item.processingFeeMetadata.text}</td> */}
                                    <td className="text444">{item.processingFeeMetadata.text === 'Nil'?<div className={styles.nillAplly}>0 Processing Fee</div>:item.processingFeeMetadata.text || '--'}</td>
                                </tr>
                                <tr>
                                    <td width="45%" className="text666 opt80">Tenure</td>
                                    <td width="10">:</td>
                                    <td className="text444">{item.tenureMetadata.max/12} Years</td>
                                </tr>
                            </thead>
                        </table>
                        <span className={`${styles.mobTableDetails} cursorPointer`} onClick={(e) => handleRedirect(e, "/banks-in-india/" + data.lenderSlug + "/" + item.productSlug)}>Know More</span>
                    </div>
                </div>
            ):<table className={styles.planTable} cellPadding="0">
            <thead>
                <tr>
                    <th className="font14">{data.lenderName || ''} Loans</th>
                    <th className="font14">Interest Rate</th>
                    <th className="font14">Processing Fee</th>
                    <th className="font14">Loan Amount/Tenure</th>
                    <th className="font14"></th>
                </tr>
            </thead>
            <tbody>
                {data && data.products.map((item, index) =>
                    <tr key={index}>
                        <td>
                        <NavLink href={`${process.env.BASE_URL}/banks-in-india/${data.lenderSlug}/${item.productSlug}`} className="textLink"><span className={styles.planName}>{data.lenderName} {item.productName || ''}</span></NavLink>
                        </td>
                        <td>
                            <h3 className="applynowTitle mb5">{item.interestRateMetadata.text}</h3>
                            <p className="font14 text666 opt80 lineHeight22">{item.interestRateMetadata.label}</p>
                        </td>
                        <td>
                            {/* <h3 className="applynowTitle mb5">{item.processingFeeMetadata.text}</h3> */}
                            <h3 className="applynowTitle mb5">{item.processingFeeMetadata.text === 'Nil'?<div className={styles.nillAplly}>0 Processing Fee</div>:item.processingFeeMetadata.text || '--'}</h3>
                            <p className="font14 text666 opt80 lineHeight22">{item.processingFeeMetadata.label || ''}</p>
                        </td>
                        <td>
                            <h3 className="applynowTitle mb5">{item.loanAmountMetadata.text}</h3>
                            <p className="font14 text666 opt80 lineHeight22">{item.loanAmountMetadata.label}</p>
                            <p className="font14 text666 opt80 lineHeight22">{item.tenureMetadata.text}</p>
                        </td>                           
                        <td>
                            {/* <button className="btn btn-primary font14 btnSm" onClick={(e) => handleClick(e, "/banks-in-india/" + data.lenderSlug + "/" + item.productSlug)}>Check Eligibility </button> */}
                            {(item.productSlug === 'home-loan' || item.productSlug === 'personal-loan') ?
                            <button className="btn btn-primary font14 btnSm" onClick={(e) => handleClick(e, item.productSlug)}>Check Eligibility</button>
                            :<button className="btn btn-primary font14 btnSm" onClick={() => enquireNowHandle(data.lenderSlug, item.productName)}>Enquire Now</button>
                            }
                            <span className={` textLink fontMedium cursorPointer detailsbtn ${styles.detailsbtn}`} onClick={(e) => handleRedirect(e, "/banks-in-india/" + data.lenderSlug + "/" + item.productSlug)}>Know More</span>
                        </td>
                    </tr>
                )}
            </tbody> 
        </table>}
            
                
            </div>
        </div>
        </>
    )
}