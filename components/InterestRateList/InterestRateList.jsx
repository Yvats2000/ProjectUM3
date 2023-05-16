import React,{useState} from "react";
import { BankInterestRate,RightSideBar, Link } from "../shared";
import styles from './InterestRateList.module.css';
export const InterestRateList =({data,path, loanType,loanLink,rightSideJson})=>{
    const [ activeTab, setActiveTab ] = useState(0);
    const handleClick = (e, index,id) => {
        setActiveTab(index);
        const violation = document.getElementById(id); 
        window.scrollTo({
            top:violation.offsetTop - 80,
            behavior:"smooth"
        });
        window.history.replaceState(null,"",path+"#"+id)
    };
    const updateKey = (value) => {
        return value.split(" ").join("")
    }
    return(
        <>
        
        <div className={styles.allLists}>
        <section className={`${styles.listTabs}`}>
            <div className={`${styles.Lists} container`}>
                <ul>
                    {data.map((item, index) =>
                    <li key={index}  className={`${activeTab === index  ? styles.active : 'links'}`} onClick={(e) => {handleClick(e, index,updateKey(data[index].categorName));}}><a >{item.categorName}</a></li>
                    )}
                </ul>
            </div>
        </section>
            <div className="container">
                <div className={styles.allWrap}>
                    <div className={styles.allListings}>
                        {data.map((item,index)=>
                            <div className={styles.listOne} key={index} id={updateKey(data[index].categorName)}>
                                <h2 className="font24 mobfont18 textBlack fontMedium  mb15">{`${loanType} Interest Rates of Top ${item.categorName}`}</h2>
                                <div className={styles.indTilesWrap}>
                                    {
                                        item.plans.map((itemChild, index)=>(
                                            <BankInterestRate data={itemChild} path={path} loanLink={loanLink} productName={loanType} key={index}/>
                                        ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <RightSideBar menuLinks={rightSideJson} paddingTop={false} productName={loanType}/>
                </div>
            </div>
        </div>
        </>
    )
}