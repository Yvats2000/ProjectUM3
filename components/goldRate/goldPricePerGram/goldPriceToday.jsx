import React from 'react'
import styles from './../gold&silver.module.css';
export const GoldPriceToday  = ({data,goldCity}) => {
    const getData = (id,type)=>{
        return( type === 24?data[id].rate[0].twenty_four_k:data[id].rate[0].twenty_two_k)
    }
  return (
    <>
        <div className={styles.particularDay}>
            <h2 className="font14 font600 text181d mb15">Today Gold Price in {goldCity} (in Grams)</h2>
            <div className={styles.tblResponsive}>
                <table className={styles.tableGrey}>
                    <thead>
                        <tr>
                            <td className="font12 font600 text181d">Gram</td>
                            <td className="font12 font600 text181d">Gold Rate Today {22}k (in INR)	</td>
                            <td className="font12 font600 text181d">Gold Rate Today {24}k ( in INR)</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font12 font600 text181d">1 Gram Gold Rate Today</td>
                            <td className="font12  text666">₹ {parseInt(getData(0,22)/10*1).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">₹ {parseInt(getData(0,24)/10*1).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">8 Gram Gold Rate Today</td>
                            <td className="font12  text666">₹ {parseInt(getData(0,22)/10*8).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">₹ {parseInt(getData(0,24)/10*8).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">10 Gram Gold Rate Today</td>
                            <td className="font12  text666">₹ {parseInt(getData(0,22)).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">₹ {parseInt(getData(0,24)).toLocaleString('en-IN')}</td>
                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">100 Gram Gold Rate Today</td>
                            <td className="font12  text666">₹ {parseInt(getData(0,22)/10*100).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">₹ {parseInt(getData(0,24)/10*100).toLocaleString('en-IN')}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}
