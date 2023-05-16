import Image from 'next/image';
import { useState } from 'react';
import styles from "../FundTable.module.css";
import {NavLink} from '../../../ui';
export function MobileShort({openFilter, showTabs}){
    const [shortActive, setShortActive] = useState(false)
    return(
        <>
        <div className={styles.filterMob}>
            {!showTabs && <p className={styles.filterBtn} onClick={()=>openFilter('short')}>Sort / Filter
                <span >
                    <Image src="/assets/images/shortIcon.png" height={13} width={12}/>
                </span>
            </p>}
            <NavLink className={styles.filterBtn} href={`${process.env.BASE_URL}/mutual-funds/compare`}>Compare</NavLink>
        </div>
            <div className={`${styles.filterModal} ${shortActive?styles.active:null}`}>
                <div className={styles.filterBody}>
                    <div className={styles.filterHeader}>
                        <h3>Sort by</h3>
                        <Image width={18} height={18} onClick={()=>setShortActive(shortActive => !shortActive)} className="cursorPointer" src="/assets/images/closeFilter.svg"/>
                    </div>
                    {/* <div className={styles.fitler}>
                        <div className={styles.filterList}>
                            <div className={styles.filterName}>
                                <figure className={styles.filterIcon}><Image width={12} height={14} src="/assets/images/SchemeName.svg"/></figure>
                                <p>Scheme Name </p>
                            </div>
                            <div className={styles.filterShort}>
                                (A-Z)
                                <span className={styles.up}><svg transform="rotate(-180)" width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" opacity=".8"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className={styles.filterList}>
                            <div className={styles.filterName}>
                                <figure className={styles.filterIcon}><Image width={16} height={16} src="/assets/images/ratining.svg"/></figure>
                                <p>Ratings</p>
                            </div>
                            <div className={styles.filterShort}>
                                Low - High
                                <span className={styles.up}><svg transform="rotate(-180)" width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" opacity=".8"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className={styles.filterList}>
                            <div className={styles.filterName}>
                                <figure className={styles.filterIcon}><Image width={14} height={14} src="/assets/images/return.svg"/></figure>
                                <p>Returns</p>
                            </div>
                            <div className={styles.filterShort}>
                                Low - High
                                <span className={styles.up}><svg transform="rotate(-180)" width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" opacity=".8"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className={styles.filterList}>
                            <div className={styles.filterName}>
                                <figure className={styles.filterIcon}><Image width={11} height={14} src="/assets/images/fundSize.svg"/></figure>
                                <p>Fund size (in Cr.)</p>
                            </div>
                            <div className={styles.filterShort}>
                                Low - High
                                <span className={styles.up}><svg transform="rotate(-180)" width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" opacity=".8"></path>
                                    </svg>
                                </span>
                            </div>
                        </div>
                    </div> */}
                    <div className={styles.filterFooter}>
                        <button className="btn btn-primary btn100 text-center">Apply</button>
                    </div>
                </div>
            </div>
        
        </>
    )
}