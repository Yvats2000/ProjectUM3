import React from 'react'
import styles from './../gold&silver.module.css';
export const GoldPricePerGram  = ({data,type,goldCity}) => {
    const getData = (id)=>{
        return( type === 24?data[id].rate[0].twenty_four_k:data[id].rate[0].twenty_two_k)
    }
  return (
    <>
        <div className={styles.particularDay}>
            <h2 className="font14 font600 text181d mb15">Today {type} Carat Gold Price per gram in {goldCity} (INR)</h2>
            <div className={styles.tblResponsive}>
                <table className={styles.tableGrey}>
                    <thead>
                        <tr>
                            <td className="font12 font600 text181d">Gram</td>
                            <td className="font12 font600 text181d">Gold Rate Yesterday {type}k	</td>
                            <td className="font12 font600 text181d">Gold Rate Today {type}k </td>
                            <td className="font12 font600 text181d">Daily Price Change</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="font12 font600 text181d">1 Gram Gold Rate</td>
                            <td className="font12  text666">₹ {parseInt(getData(1)/10*1).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">₹ {parseInt(getData(0)/10*1).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">{parseInt(getData(0)/10*1 - getData(1)/10*1).toLocaleString('en-IN')}</td>

                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">8 Gram Gold Rate</td>
                            <td className="font12  text666">₹ {parseInt(getData(1)/10*8).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">₹ {parseInt(getData(0)/10*8).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">{parseInt(getData(0)/10*8 - getData(1)/10*8).toLocaleString('en-IN')}</td>

                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">10 Gram Gold Rate</td>
                            <td className="font12  text666">₹ {parseInt(getData(1)/10*10).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">₹ {parseInt(getData(0)/10*10).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">{parseInt(getData(0)/10*10 - getData(1)/10*10).toLocaleString('en-IN')}</td>

                        </tr>
                        <tr>
                            <td className="font12 font600 text181d">100 Gram Gold Rate</td>
                            <td className="font12  text666">₹ {parseInt(getData(1)/10*100).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">₹ {parseInt(getData(0)/10*100).toLocaleString('en-IN')}</td>
                            <td className="font12  text666">{parseInt(getData(0)/10*100 - getData(1)/10*100).toLocaleString('en-IN')}</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}
