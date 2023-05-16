import React,{useState} from 'react'
import styles from './../gold&silver.module.css';
import { useRouter } from "next/router";
export const CityTable = ({data, pageType,heading}) => {
    const router = useRouter();
    const records = 15;
    const [showNumberOfBanks, setShowNumberOfBanks] = useState(records);
    const onclickPush=(e,url)=>{
        e.preventDefault();
        router.push(process.env.BASE_URL+`/${pageType === 'silver'?'silver-rate':'gold-rate'}/${url}`)
    }
    const viewMore = (index) => {
        setShowNumberOfBanks(showNumberOfBanks+records)
    }
  return (
    <>
        <div className={styles.particularDay}>
            <h2 className="font14 font600 text181d mb15">{heading}</h2>
            <div className={styles.tblResponsive}>
                <table className={styles.tableGrey}>
                    <thead>
                        <tr>
                            <td className="font12 font600 text181d">City</td>
                            <td className="font12 font600 text181d">Gold Rate Today 22k</td>
                            <td className="font12 font600 text181d">Gold Rate Today 24k</td>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((item,index)=>(
                            <tr key={index} className={`${styles.tableTr} ${index+1 <= showNumberOfBanks ? styles.active : null}`}>
                                <td className="font12  textLink font600 cursorPointer" onClick={(e)=>onclickPush(e,item.slug)}>{item.cityName}</td>
                                <td className="font12  text666">₹ {parseInt(item.twenty_two_k).toLocaleString('en-IN')}</td>
                                <td className="font12  text666">₹ {parseInt(item.twenty_four_k).toLocaleString('en-IN')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showNumberOfBanks <= data.length ?
                <div className="btnBox">
                    <button className="btn btnOutline font14 btnMd fontMedium btnFull" onClick={() => viewMore()}>View More</button>
                </div> :null}
        </div>
    </>
  )
}
