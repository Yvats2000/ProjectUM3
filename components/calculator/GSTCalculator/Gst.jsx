import React, {useState, useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';
import styles from "../calculator.module.css";
import contentStyles from "../../shared/CmsContent/CmsContent.module.css";
import { FAQ, BreadCrumb, RightSideBar } from "../../shared";
import InputText from '../../../form/inputText';
import { gstCal } from '../../../services/calculators';
import { Tooltip } from "../../shared/";
import {GstBreakup} from './GstBreakup';
export const Gst = ({cmsData,rightNavBar}) => {  
  const breadCrumbLinks = [
    {
      "text": "Calculators",
      "path": "/calculator",
      "class": ""
    },    
    {
      "text": "GST Calculator",
      "path": "/calculator/gst-calculator",
      "class": ""
    }
   ]
   //Financial calculators Box
  let interLinkingFinancialArray = {"text": "Financial Calculators","child": []};
  let financial = rightNavBar.filter((data) =>  data.text === "Calculators").map((item)=> item.child)
  financial[0].filter((data)=> data.text === 'Financial Calculator').map(data => data.child.map((item)=> interLinkingFinancialArray.child.push({"text": item.text,"path": item.path})))
   const internalLinkEmiCalculator = [
    {
      "text": "Check Eligibility",
      "child": [
        {
          "text": `Home Loan Eligibility Calculator`,
          "path": `/loans/home-loan/eligibility-calculator`
        },
        {
          "text": `Personal Loan Eligibility Calculator`,
          "path": `/loans/personal-loan/eligibility-calculator`
        }
      ]
    },
    
    {
      "text": "Top 10 Banks",
      "child": [
        {
          "text": "CITI Bank",
          "path": "/banks-in-india/citi-bank"
        },
        {
          "text": "RBL Bank",
          "path": "/banks-in-india/rbl-bank"
        },
        {
          "text": "Bank of Baroda",
          "path": "/banks-in-india/bank-of-baroda"
        },
        {
          "text": "Canara Bank",
          "path": "/banks-in-india/canara-bank"
        },
        {
          "text": "Bajaj Finserv",
          "path": "/banks-in-india/bajaj-finserv"
        },
        {
          "text": "Yes Bank",
          "path": "/banks-in-india/yes-bank"
        },
        {
          "text": "Deutsche Bank",
          "path": "/banks-in-india/deutsche-bank"
        },
        {
          "text": "IDFC FIRST Bank",
          "path": "/banks-in-india/idfc-first-bank"
        },
        {
          "text": "DCB Bank",
          "path": "/banks-in-india/dcb-bank"
        },
        {
          "text": "Kotak Bank",
          "path": "/banks-in-india/kotak-bank"
        }
      ]
    }
  ]
  interLinkingFinancialArray.child.length > 0 && internalLinkEmiCalculator.unshift(interLinkingFinancialArray);
   const [formDetails, setFormDetails] = useState({
    costOfGoodsAndServices: 500000,
    profitRatio: 10,
    gstRoi: 5,
    isApiCall : false
  });
  
  const [ activeGst, setActiveGst ] = useState(false);
  const [apiAmount, setApiAmount] = useState('');
  const handleChange = (e) => {
    const { name, value,max,min} = e.target;
    formDetails.isApiCall = true
    if(value)value=value.toString().replace(/,/g,"");
    if (parseInt(value) > parseInt(max)){
        value = max;
    }
    setFormDetails({ ...formDetails, [name]: value});
}; 
const checkemiFields =() =>{
    let check=true
    for (let key in formDetails){
      if(formDetails[key]=='' || formDetails[key]==0 || formDetails[key]==undefined){
       check=false
      }
    }
    return check
  }
    useEffect(async()=>{
        await getBalance()
    },[formDetails.gstRoi])
  const getBalance = async() => {
    if(checkemiFields){
      let data =  {
        "costOfGoodsAndServices": formDetails.costOfGoodsAndServices,
        "profitRatio": formDetails.profitRatio,
        "gstRoi": formDetails.gstRoi,
      }
      let balcal = await gstCal(data)
      setApiAmount(balcal.data)
    }
  };
  const debounced = function (fn, d) {
    let timer;
    return function () {
        let context = this,
        args = arguments;
        clearInterval(timer);
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, d)
      }
    }
  const betterFunction = debounced(getBalance, 0.5);
  const setGstRoi = (value)=>{
    setFormDetails({ ...formDetails, gstRoi: value});
  }
  
  return (
    <>
      <div className="container">
      <BreadCrumb links={breadCrumbLinks} />
      <h2 className="font24 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">GST Calculator</h2>
      {cmsData && cmsData[0] && cmsData[0].short_description && cmsData[0].short_description.length > 0 && <div dangerouslySetInnerHTML={{ __html: cmsData[0].short_description }} className="mt35 cmstext font14"></div>}
      <div className={styles.calcwrap}>
        <div className={styles.calculator}>
      
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>
                    Cost of Goods/Services (excluding GST)
                  </label>
                  <div className={styles.inputGrp} >
                  <span className={styles.Sign}>₹</span>
                    <InputText 
                      type="text"
                      name="costOfGoodsAndServices" 
                      className={`${styles.calcValuesInput} `} 
                      value={parseInt(formDetails.costOfGoodsAndServices || 0).toLocaleString('en-IN')}
                      handleChange={handleChange}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      min='100'
                      max= '20000000'
                      />
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl" 
                  name="costOfGoodsAndServices" 
                  onChange={handleChange} 
                  onMouseUp={betterFunction}
                  value={formDetails.costOfGoodsAndServices}
                  onTouchEnd={betterFunction}
                  min='100'
                  max= '20000000'
                  />
                  <ul className={styles['range-labels']}>
                    <li>{'100'}</li>
                    <li>{'2Cr'}</li>
                  </ul>
                </div>
          </div>

          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Profit Ratio <Tooltip TooltipRight={true} tooltip='Profit on cost of goods'><span>i</span></Tooltip></label>
                  <div className={styles.inputGrp} >
                    
                    <InputText 
                      type="text"
                      name="profitRatio" 
                      className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                      value={parseInt(formDetails.profitRatio || 0).toLocaleString('en-IN')}
                      handleChange={handleChange}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
                      min='0'
                      max= '30'
                      />
                      <span className={styles.Sign}>%</span>
                  </div>
                </div>
                <div className={styles.rangeSlider}>
                <input type="range" className="slider maxl" 
                  name="profitRatio" 
                  onChange={handleChange} 
                  onMouseUp={betterFunction}
                  value={formDetails.profitRatio}
                  onTouchEnd={betterFunction}
                  min='0'
                  max= '30'

                  />
                  <ul className={styles['range-labels']}>
                    <li>{'0'}</li>
                    <li>{'30'}</li>
                  </ul>
                </div>
          </div>
          <div className={`${styles.rangecalc} ${styles.emimarg}`}>
                <div className={styles.calcValues}>
                  <label>Select GST Rate</label>
                  {/* <div className={styles.inputGrp} >
                    
                    <InputText 
                      type="text"
                      name="gstRoi" 
                      className={`${styles.calcValuesInput} ${styles.lwidth}`} 
                      value={parseInt(formDetails.gstRoi || 0).toLocaleString('en-IN')}
                      handleChange={handleChange}
                      handleBlur={betterFunction}
                      onMouseOver={betterFunction}
             
                      />
                      <span className={styles.Sign}>%</span>
                  </div> */}
                </div>
                  <ul className={`${styles.selectionTab} mt15`} >
                      <li onClick={()=>setGstRoi(3)} className={formDetails.gstRoi===3? styles.active:null}>3%</li>
                      <li onClick={()=>setGstRoi(5)} className={formDetails.gstRoi===5? styles.active:null}>5%</li>
                      <li onClick={()=>setGstRoi(12)} className={formDetails.gstRoi===12? styles.active:null}>12%</li>
                      <li onClick={()=>setGstRoi(18)} className={formDetails.gstRoi===18? styles.active:null}>18%</li>
                      <li onClick={()=>setGstRoi(28)} className={formDetails.gstRoi===28? styles.active:null}>28%</li>
                  </ul>
          </div>
        </div>
        
            <div className={styles.resultwrap}>
              <p className="font12 font600 textBlack mb30 textCenter">
              GST Calculation Breakdown
              </p>
              <div className={styles['chart-container']}>
                <Doughnut data={{labels: [],datasets: [{data: [!isNaN(apiAmount.costOfGoodsAndServices) ? parseInt(apiAmount.costOfGoodsAndServices):'', !isNaN(apiAmount.totalGstPlusProfit) ? parseInt(apiAmount.totalGstPlusProfit):''],backgroundColor: ['rgba(255, 67, 86, 1)','rgba(59, 65, 158, 1)']}]}} options={{rotation: -90,circumference: 180}} />
              </div>
              {/* <figure className={styles.piechart}>
                <img src="/assets/images/pie chart.svg" className="imgResponsive" alt="" />
              </figure> */}
              <div className={`mb15 ${styles.calculatevalues}`}>
                <div className={styles.amount}>
                  <div className={styles.collect}>
                    <span className={`${styles.pieBox} ${styles.amred}`}></span><p className={styles.info}>  Cost Of Goods & Services</p>
                  </div>
                  <p className={styles.amt}>₹ {apiAmount.costOfGoodsAndServices?apiAmount.costOfGoodsAndServices.toLocaleString('en-IN'):'-'}</p>
                </div>
                <div className={styles.amount}>
                  <div className={styles.collect}>
                    <span className={`${styles.pieBox} ${styles.amblue}`}></span><p className={styles.info}>  Total GST + Profit</p>
                  </div>
                  <p className={styles.amt}>₹ {apiAmount.totalGstPlusProfit?apiAmount.totalGstPlusProfit.toLocaleString('en-IN'):'-'}</p>
                </div>
              </div>
              <button className="btn btn-primary font12 btn100" onClick={()=>setActiveGst(true)}>
                Check Full Breakup <em className="icon-arrow-right font14"></em>
              </button>
        </div>
      </div>
    </div>
    {cmsData.length>0 && 
    <>
    <div className="container containerFlex mb40">
      <section className={contentStyles.eligible}>
          <div className="container">
              <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt35"></div>
          </div>
      </section>
      <RightSideBar menuLinks = {internalLinkEmiCalculator} paddingTop={true}/>
    </div>
    {cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
    <section className="faq">
    <div className="container">
        <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
        <div className="faqBx">
        <FAQ data={cmsData[0].faq_content}  />
        </div>
    </div>
    </section>
    :null}
    </>}
    <GstBreakup apiAmount={apiAmount} formDetails={formDetails} activeGst={activeGst} setActiveGst={setActiveGst}/>
    </>
  )
}