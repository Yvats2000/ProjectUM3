import { useState } from "react";
import style from "../FundTable.module.css";
import {useRouter} from 'next/router';
import { Loader } from "../../Loader";
export function TableHead({HeaderBg=false, showTabs}){
    const [isLoader, setIsLoader] = useState(false);
    const router = useRouter();
    const sorting = (key, type) => {
        setIsLoader(true)
        let _url=router.asPath;
        const _pageIdx=_url.indexOf("sortKey=");
        const _isQuery=_url.split("?").length>1; 
        if(_isQuery && _pageIdx > -1)
        {
            router.push(`${process.env.BASE_URL}`+_url.substring(0,_pageIdx)+`sortKey=${key}&sortOrder=${type}`);
        }
        else
        {
            router.push(`${process.env.BASE_URL}${_url}${_isQuery?"&":"?"}sortKey=${key}&sortOrder=${type}`);
        }
    }

    return(
        <>
        <div className={`${style.tableRow} ${HeaderBg?style.tableRowBg:null}`}>
            <div className={`${style.tableTd} ${style.SchemeName} ${router.query.sortKey === 'scheme_name' ? `${style.active}` : ''} ${style.SchemeNameHead} fontsemiBold`}>Mutual Fund Schemes
                {!showTabs && <span className={`marg5L cursorPointer ${router.query.sortKey === 'scheme_name' && router.query.sortOrder === 'asc'  ? `${style.up}` : router.query.sortKey === 'scheme_name' && router.query.sortOrder === 'desc' ? '' : ''}`} onClick={() => sorting('scheme_name', router.query.sortOrder === 'desc' ? 'asc' : router.query.sortOrder === 'asc' ? 'desc' : 'asc')}>
                    <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                    </svg>
                </span>}
            </div>
            <div className={`${style.tableTd} ${style.SubCategory} ${router.query.sortKey === 'category_type' ? `${style.active}` : ''} fontsemiBold`}>Category
                {!showTabs && <span className={`marg5L cursorPointer ${router.query.sortKey === 'category_type' && router.query.sortOrder === 'asc'  ? `${style.up}` : router.query.sortKey === 'category_type' && router.query.sortOrder === 'desc' ? '' : ''}`} onClick={() => sorting('category_type', router.query.sortOrder === 'desc' ? 'asc' : router.query.sortOrder === 'asc' ? 'desc' : 'asc')}>
                    <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                    </svg>
                </span>}
            </div>
            {/* <div className={style.tableTd}>Ratings 
                <span className={style.up}><svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                    </svg>
                </span>
            </div> */}
            <div className={`${style.tableTd} ${style.Returns} ${(router.query.sortKey === 'return' || !router.query.sortKey)  && !showTabs ? `${style.active}` : ''} fontsemiBold`}  >{router.query.sipDuration?router.query.sipDuration:5}Y Returns
                {!showTabs && <span className={`marg5L cursorPointer ${router.query.sortKey === 'return' && router.query.sortOrder === 'asc'  ? `${style.up}` : router.query.sortKey === 'return' && router.query.sortOrder === 'desc' ? '' : ''}`} onClick={() => sorting('return', router.query.sortOrder === 'desc' ? 'asc' : router.query.sortOrder === 'asc' ? 'desc' : 'asc')}>
                    <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                    </svg>
                </span>}
            </div>
            <div className={`${style.tableTd} ${style.Returns} ${router.query.sortKey === 'schemeAum' ? `${style.active}` : ''} fontsemiBold`}>AUM
                {!showTabs && <span className={`marg5L cursorPointer ${router.query.sortKey === 'schemeAum' && router.query.sortOrder === 'asc'  ? `${style.up}` : router.query.sortKey === 'schemeAum' && router.query.sortOrder === 'desc' ? '' : ''}`} onClick={() => sorting('schemeAum', router.query.sortOrder === 'desc' ? 'asc' : router.query.sortOrder === 'asc' ? 'desc' : 'asc')}>
                    <svg width="7" height="10" viewBox="0 0 7 10" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3.733 9.837h-.001a.564.564 0 0 1-.04.037l-.02.015-.024.017-.024.015c-.008.005-.015.01-.023.013l-.025.013-.024.01-.025.01-.026.01-.026.006-.027.006-.03.005-.024.003a.561.561 0 0 1-.11 0l-.024-.003-.03-.005-.027-.006-.025-.007-.027-.01-.025-.008-.024-.011-.025-.013-.023-.013-.024-.015-.024-.017-.02-.015a.557.557 0 0 1-.04-.037L.163 7.06a.555.555 0 1 1 .787-.786l1.833 1.83V.555a.556.556 0 0 1 1.113 0v7.547l1.832-1.83a.557.557 0 0 1 .787.787L3.733 9.837z" fill="#313541" fillRule="nonzero" opacity=".8"></path>
                    </svg>
                </span>}
                <br/><span className="font12 ">(in Cr.)</span>
            </div>
            <div className={`${style.tableTd} ${style.Compare} fontsemiBold`}>Compare</div>
        </div>
        {isLoader && <Loader />}
        </>
    )
} 