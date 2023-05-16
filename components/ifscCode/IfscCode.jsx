import React, { useState } from "react";
import { BreadCrumb, CreditScore, RightSideBar } from "../shared";
import styles from "./IfscCode.module.css";
import rightSideBarData from "../../data/internalRightSidebar.json"
import { IfscContent, StateContent, CityContent, BranchContent, BankContent } from "./ifscContent";
import Image from "next/image";
import {InternalBlog} from "../shared/BlogSection/InternalBlog"
import {NavLink, Select} from '../ui';
import { useRouter } from 'next/router'
import { IfscTable } from "./ifscTable/ifscTable";

export function IfscCode({mainTitle,blogsData,lenderData=[], stateData=[],cityData=[],branchData=[], attributeTitle, attributeLink, attributeData, bankListDiv = false, bankAttributesDiv, showIfscContent, showStateContent, showCityContent, showBranchContent, breadCrumbLinks,showBankContent, bankCmsData, bankName, stateName ,cityName, ifscData}) {
  const [bank, setBank] = useState([]);
  const [state, setState] = useState([]);
  const [city, setCity] = useState([]);
  const records = 20
  const [showNumberOfBanks, setShowNumberOfBanks] = useState(records);
  const router = useRouter()
  const bankSelected = router.query.bankName;
  const stateSelected = router.query.state;
  const citySelected = router.query.city;
  const branchSelected = router.query.branch;
  
  React.useEffect(() => {
    (async function () {
      setBank(lenderData.find(l=>l.lenderSlug==bankSelected));
      setState(stateData.find(l=>l.slug==stateSelected));
      setCity(cityData.find(l=>l.slug==citySelected));
    })();
  }, []);
  const onLenderChange = async(value) => {
    router.push(`/banks-in-india/${value}/ifsc-code`);
  };

  const onStateChange = async(value) => {
    router.push(`/banks-in-india/${bank.lenderSlug || ''}/ifsc-code/${value}`);
  };

  const onCityChange = async(value) => {
    router.push(`/banks-in-india/${bank.lenderSlug || ''}/ifsc-code/${state.slug || ''}/${value}`);
  };

  const onBranchChange = async(value) => {
    router.push(`/banks-in-india/${bank.lenderSlug || ''}/ifsc-code/${state.slug || ''}/${city.slug || ''}/${value}`);
  };

  const viewMore = () => {
    setShowNumberOfBanks(showNumberOfBanks+records)
  }
return (
    <>
      <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
      </div>
      <section className={styles.ifscFinder}>
        <div className="container">
          <div className={styles.finder}>
            <h1 className="font24 fontMedium text181d Innerheading mb40 lineHeight36 minHeight72">{mainTitle.toUpperCase()}</h1>
            <p>Locate any details of Bank branch in India.</p>
          </div>
          <div className={styles.selectDetails}>
            <div className={styles.bankWrap}>
              <div className={styles.innerWrap}>
                <div className={styles.selectBank}>
                  <div className={`${styles.rangecalc} mb10`}>
                    <Select label={"Bank"} onChange={(e) => onLenderChange(e.target.value)}>
                      <>
                        {stateData.length === 0 ? <option value="Select Bank">Select Bank </option> : null}
                        {lenderData.map((data, index)=>{
                          return <option value={data.lenderSlug} key={index} selected={bankSelected === data.lenderSlug ? 'selected' : ''}>{data.lenderName}</option>
                        })}
                      </>
                    </Select>
                  </div>
                  <div className={`${styles.rangecalc} mb10`}>
                    <Select label={"State"} onChange={(e) => onStateChange(e.target.value)} disabled={stateData && stateData.length > 0 ? false : true}>
                      <>
                      {cityData.length === 0 ? <option value="Select State" className="textd9d9d9">Select State</option> : null}
                        {stateData.map((data, index)=>{
                          return <option value={data.slug} key={index} selected={stateSelected === data.slug ? 'selected' : ''}>{data.name}</option>
                        })}
                      </>
                    </Select>
                  </div>
                  <div className={`${styles.rangecalc} mb10`}>
                    <Select label={"City"} onChange={(e) => onCityChange(e.target.value)} disabled={cityData && cityData.length > 0 ? false : true}>
                      <>
                      {branchData.length === 0 ? <option value="Select City" className="textd9d9d9">Select City</option> : null}
                        {cityData.map((data,index)=>{
                          return <option value={data.slug} key={index} selected={citySelected === data.slug ? 'selected' : ''}>{data.name}</option>
                        })}
                      </>
                    </Select>
                  </div>
                  <div className={`${styles.rangecalc} mb10`}>
                    <Select label={"Branch"} onChange={(e) => onBranchChange(e.target.value)} disabled={branchData && branchData.length > 0 ? false : true}>
                      <>
                      {!branchSelected ? <option value="Select Branch" className="textd9d9d9">Select Branch</option> : null}
                        {branchData.map((data,index)=>{
                          return <option value={data.slug} key={index} selected={branchSelected === data.slug ? 'selected' : ''}>{data.branch}</option>
                        })}
                      </>
                    </Select>
                  </div>
                </div>
                { ifscData && Object.keys(bank).length > 0 && 
                <>
                  <h2 className="font18 mb15 fontMedium textBlack">{bankName || ''} {ifscData.branch || '--'} IFSC - {ifscData.ifsc || '--'}</h2>
                  <div className={styles.bankInfo}>
                  
                  <div className={styles.logoName}>
                    {bank.isBankProduct ? <NavLink href={`${process.env.BASE_URL}/banks-in-india/${bank.lenderSlug}`}>
                      <figure>
                        <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + bank.lenderLogo} width={123} height={32} layout="intrinsic" alt={bank.lenderName}/>
                      </figure>
                    </NavLink>
                    :
                    <figure>
                      <Image className="imgResponsive" src={process.env.IMAGE_BASEURL + '/banklogo/' + bank.lenderLogo} width={123} height={32} layout="intrinsic" alt={bank.lenderName}/>
                    </figure>}
                  </div>
                  <div className={styles.allInfo}>
                    <table>
                      <tbody>
                        <tr>                        
                          <td colSpan="2" className={styles.heading}>IFSC Code </td>
                          <td>:</td>
                          <td className="res">{ifscData.ifsc || '--'}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.heading}>MICR CODE</td>
                          <td>:</td>
                          <td className="res">{ifscData.mircCode || '--'}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.heading}>Bank </td>
                          <td>:</td>
                          <td className="res">{bank.isBankProduct ? <NavLink href={`${process.env.BASE_URL}/banks-in-india/${bankSelected}`} className="textLink">{bankName}</NavLink> : <span className="textLink">{bankName}</span>}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.heading}>State </td>
                          <td>:</td>
                          <td className="res"><NavLink href={`${process.env.BASE_URL}/banks-in-india/${bankSelected}/ifsc-code/${stateSelected}`} className="textLink">{stateName}</NavLink></td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.heading}>City </td>
                          <td>:</td>
                          <td className="res"><NavLink href={`${process.env.BASE_URL}/banks-in-india/${bankSelected}/ifsc-code/${stateSelected}/${citySelected}`} className="textLink">{cityName}</NavLink></td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.heading}>Branch </td>
                          <td>:</td>
                          <td className="res">{ifscData.branch || '--'}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.heading}>Address</td>
                          <td>:</td>
                          <td className="res">{ifscData.address || '--'}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.heading}>Phone Number</td>
                          <td>:</td>
                          <td className="res">{ifscData.contact || '--'}</td>
                        </tr>
                        <tr>
                          <td colSpan="2" className={styles.heading}>Branch Code</td>
                          <td>:</td>
                          <td className="res">{ifscData.branchCode || '--'}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                </>
                }
                {showBranchContent ? <BranchContent bank={bank} state={state} city={city} ifsc={ifscData} /> : null}
                {bankListDiv && lenderData && lenderData.length > 0 ?
                <>
                  <div className={styles.lstBank}>
                    <h2 className="font16 fontMedium text181d Innerheading ">Browse IFSC codes from Banks Listed Below</h2>
                    <ul>
                      {lenderData.map((bank, bankIndex) =>
                      <li key={bankIndex} className={bankIndex+1 <= showNumberOfBanks ? styles.active : null}>
                        <NavLink href={`${process.env.BASE_URL}/banks-in-india/${bank.lenderSlug}/ifsc-code`}>
                        <figure><img src={process.env.IMAGE_BASEURL + '/banklogo/' + bank.lenderLogo} width={80} height={20} alt={bank.lenderName} className="imgResponsive" /></figure>
                        <span className={styles.border}></span>
                        <p>{bank.lenderName}</p>
                        </NavLink>
                      </li>
                      )}
                    </ul>
                  </div>
                  {showNumberOfBanks <= lenderData.length ?
                  <div className="btnBox">
                    <button className="btn btnOutline font14 btnMd fontMedium btnFull" onClick={() => viewMore()}>View More</button>
                  </div> :null}
                </>
                :null}
                {bankAttributesDiv && attributeData && attributeData.length > 0 ?
                <div className={styles.stateTile}>
                  <div className={styles.stateList}>
                     {attributeTitle != "Branch" ?
                      <>
                      <h2 className="font16 fontMedium text181d Innerheading ">Choose {attributeTitle} from List Below</h2>  
                      <ul>
                        {attributeData.map((attribute, attributeIndex) =>
                          <li key={attributeIndex}><NavLink href={`${attributeLink}/${attribute.slug}`}>{bank.lenderName} IFSC Code {attribute.name || attribute.branch}</NavLink></li>
                        )}
                      </ul>
                      </>
                      :
                      <>
                        <h2 className="font16 fontMedium text181d Innerheading ">IFSC & MICR details of all {bankName} branches in {cityName}, {stateName}</h2>
                        <IfscTable data={attributeData} state={stateName} city={cityName} attributeLink={attributeLink}/>
                      </>
                    }
                  </div>
                </div>
                :null}
                {showBankContent ? <BankContent cmsData={bankCmsData} /> : null}
                {showStateContent ? <StateContent bank={bankName} state={stateName} /> : null}
                {showCityContent ? <CityContent bank={bankName} state={stateName} city={cityName} /> : null}
              </div>
              <RightSideBar menuLinks={rightSideBarData} />
            </div>
          </div>
        </div>
      </section>
      <CreditScore />
      {showIfscContent ? <IfscContent /> : null}
      <InternalBlog data={blogsData} />
    </>
  );
}
