import React,{useState,useEffect} from 'react'
import { BreadCrumb, CreditScore } from "../../shared";
import { CompareTop } from './compareTop';
import { CompareDetails } from './compareDetails';
import { getAmcApi } from '../../../services/mutualFunds';
export const CompareFunds = ({data}) => {
  const [activeSpecific, setSctiveSpecific] = useState('QuickComparison');
  const [ activeTab, setActiveTab ] = useState(0);
    const breadCrumbLinks = [
      {
        "text": "Mutual Funds",
        "path": "/mutual-funds",
        "class": ""
      },{
          "text": "Compare",
          "path": "/mutual-funds/compare",
          "class": ""
        }
      ]
      const checkTab =(id)=>{
        var violation = ''; 
        switch (id) {
          case 'QuickComparison':
           return violation = 20;
          case 'Return':
            return violation = 0;
          case 'HoldingAnalysis':
            return violation =210;
          case 'Ratios':
            return violation =280;
          case 'MoreDetails':
            return violation =350;
          default:
            return violation= 0;
        }
      }
      const showTab =(id,index)=>{
        setSctiveSpecific(id);
        setActiveTab(index);
        window.scrollTo({
          top: checkTab(id),
          behavior:"smooth"
        })
      }
  const [compareFundsData, setCompareFundsData] = useState({schemeCode : typeof window !== 'undefined' ? localStorage.getItem('compareFunds') ? JSON.parse(localStorage.getItem('compareFunds')) : [] : []});;
  const [fundData, setFundData] = useState([]);
  let filteredFunds = [];
  const handleChange = async(scheme = '')=>{
      filteredFunds = compareFundsData.schemeCode;
      if(scheme != ''){
          let index = filteredFunds.findIndex((data) => data === scheme);
          index != -1 ? filteredFunds.splice(index, 1) : filteredFunds.push(scheme);
          setCompareFundsData({...compareFundsData , schemeCode :filteredFunds});
          localStorage.setItem('compareFunds', JSON.stringify(filteredFunds));
      }
      const data = await getAmcApi(`amc/compare?f[schemecode]=${filteredFunds}`);
      if(data){
          setFundData(data.data);
          
      }
  }
  useEffect(()=>{
    handleChange();
},[])
  return (
    <>
      <div className="container">
         <BreadCrumb links={breadCrumbLinks} /> 
      </div>
      <CompareTop data={data && data.length > 0?data:fundData} activeSpecific={activeSpecific} showTab={showTab} setActiveTab={setActiveTab} activeTab={activeTab} handleChange={handleChange}/>
      <CompareDetails data={data && data.length?data:fundData} activeSpecific={activeSpecific} setSctiveSpecific={showTab}/>
      <div className='container'>
          <p className="text181d mb15 font18 fontsemiBold">Short Term Fund Direct Growth</p>
          <p className="font14 lineHeight24 text444 mb20">The funds annualized returns for the past 3 years &amp; 5 years has been around 6.98% &amp; 6.99%. The Nippon India Short Term Fund comes under the Debt category of Nippon India Mutual Funds</p>
      </div>
      <CreditScore />
    </>
  )
}
