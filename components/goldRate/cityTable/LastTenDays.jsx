import React from 'react'
import styles from './../gold&silver.module.css';
import moment from 'moment';
export const LastTenDays = ({data,heading,pageType}) => {
    const showArrow = (value)=>{
        if(value == 0 ){
            return('-')
        }else if(value >=0){
            return(<span className={styles.up}>
                <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" >
                <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" 
                    fill={ '#159839'} fillRule="nonzero" opacity=".8"></path>
                </svg> 
            </span>)
        }else{
            return (<span>
                <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" >
                <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" 
                fill={'#DD412E'} fillRule="nonzero" opacity=".8"></path>
            </svg>
            </span>)
        }
    }
  return (
    <>
        <div className={styles.particularDay}>
            <h2 className="font16 font600 text181d mb15">{heading}</h2>
            <div className={styles.tblResponsive}>
                <table className={styles.tableGrey}>
                    {pageType === 'gold'?
                    <thead>
                        <tr>
                            <td className="font12 font600 text181d">Date</td>
                            <td className="font12 font600 text181d">Gold Rate 22k</td>
                            <td className="font12 font600 text181d">Gold Rate 24k</td>
                        </tr>
                    </thead>
                    :
                    <thead>
                        <tr>
                            <td className="font12 font600 text181d">Date</td>
                            <td className="font12 font600 text181d">10 gram</td>
                            <td className="font12 font600 text181d">100 gram</td>
                            <td className="font12 font600 text181d">1 Kg</td>
                        </tr>
                    </thead>
                    }
                    {pageType === 'gold'?<tbody>
                        {data && data.length && data.map((item, index)=>(
                            index < 9 &&
                            <tr key={index}>
                                <td className="font12  text666">{moment(item.date).format("MMM D, YYYY")}</td>
                                <td className="font12  text666">₹ {parseInt(item.rate[0].twenty_two_k).toLocaleString('en-IN')} &nbsp;
                                    <span className='font10'>{data[index].rate[0].twenty_two_k - data[index+1].rate[0].twenty_two_k}</span> &nbsp;{showArrow(parseInt(data[index].rate[0].twenty_two_k - data[index+1].rate[0].twenty_two_k))}</td>
                                <td className="font12  text666">₹ {parseInt(item.rate[0].twenty_four_k).toLocaleString('en-IN')}&nbsp;
                                    <span className='font10'>{data[index].rate[0].twenty_four_k - data[index+1].rate[0].twenty_four_k}</span> &nbsp;{showArrow(parseInt(data[index].rate[0].twenty_four_k - data[index+1].rate[0].twenty_four_k))}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    :
                    <tbody>
                        {data && data.length && data.map((item, index)=>(
                            index < 9 &&
                            <tr key={index}>
                                <td className="font12  text666">{moment(item.date).format("MMM D, YYYY")}</td>
                                <td className="font12  text666">₹ {parseInt(item.rate[0].ten_gram/10*10).toLocaleString('en-IN')}</td>
                                <td className="font12  text666">₹ {parseInt(item.rate[0].ten_gram/10*100).toLocaleString('en-IN')}</td>
                                <td className="font12  text666">₹ {parseInt(item.rate[0].one_kilogram).toLocaleString('en-IN')}</td>
                            </tr>
                        ))}
                    </tbody>
                    }
                </table>
            </div>
        </div>
    </>
  )
}
