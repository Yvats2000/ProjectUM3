import styles from "./FundTable.module.css";
import { useRouter } from 'next/router';
import { useGlobalContext } from '../../../libs/context';
import { useState } from 'react';
import Image from 'next/image';
import { NavLink } from "../../ui";
import { useEffect } from "react";
import { FundSearch } from "../FundSearch";
import { Loader } from "../Loader";

export function BankFundList({ amcBank }) {
    const [shortActive, setShortActive] = useState(false);
    const [isLoader, setIsLoader] = useState(false);
    const { isMobile } = useGlobalContext();
    const router = useRouter()
    const amcType = router.query.amc;
    function capitalizeFirstLetter(value) {
        return value.split('-').join(' ').replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
    }
    const setLoader = () => {
        setIsLoader(true)
    }
    return (
        <>
            
                
                {isMobile ?
                <>      
                        <p className="font14 mb0">Choose AMC</p>
                        <div className={`selectBox ${styles.fundNameMob}`} onClick={() => setShortActive(shortActive => !shortActive)}>
                            {capitalizeFirstLetter(amcType)} 
                        </div>
                        <div className={`${styles.filterModal} ${shortActive ? styles.active : null}`}>
                            <div className={styles.filterBody}>
                                <div className={styles.filterHeader}>
                                    <h3>Bank Name</h3>
                                    <Image width={18} height={18} onClick={() => setShortActive(shortActive => !shortActive)} className="cursorPointer" src="/assets/images/closeFilter.svg" />
                                </div>
                                <div className={styles.fundBankName}>
                                    <ul>
                                        {amcBank && amcBank.map((item, index) => (
                                            <li key={index} className={`${amcType === item.amcSlug ? styles.active : ""}`}><NavLink onClick={setLoader} href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}`}>{item.fund}</NavLink></li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </>
                    :
                    <div className={`bgWhite ${styles.fundListSearch}`}>
                        <FundSearch onlyAMC={true}/>
                        <div className={`${styles.fundFilter} bgWhite`}>
                         
                            <ul>
                                {amcBank && amcBank.map((item, index) => (
                                    <li key={index} className={`${amcType === item.amcSlug ? styles.active : ""}`}><NavLink onClick={setLoader} href={`${process.env.BASE_URL}/mutual-funds/${item.amcSlug}`}>{item.fund}</NavLink></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    
                }
                {isLoader && <Loader />}
        </>
    )
}