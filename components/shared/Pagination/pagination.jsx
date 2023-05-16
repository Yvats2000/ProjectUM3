import { useMemo, useEffect, useState } from "react";
import styles from './pagination.module.css'
import Image from 'next/image';
import { useRouter } from 'next/router';
import {NavLink} from '../../ui'
import { Loader } from "../Loader";
const DOTS = '...';
export function Pagination({totalCounts, PageSize = 10 }){
  const router = useRouter();
  const [isLoader, setIsLoader] = useState(false);
    const [currentPage, setCurrentPage]=useState(parseInt((router.query && router.query.page || "1").toString()));
    const [dotPages]=useState([]);
	
    useEffect(()=>{
        const page=parseInt((router.query && router.query.page || "1").toString());
        if(page==1 && router.query && router.query.page)
        {
          delete router.query.page;
          router.push(router,undefined, { shallow: true });
        }
        setCurrentPage(page);
    },[router.query && router.query.page||1])

    const siblingCount =1;
    const range = (start, end) => {
        let length = end - start + 1;
        return Array.from({ length }, (_, idx) => idx + start);
      };

    const paginationRange = useMemo(() => {
        const totalPageCount =Math.ceil(totalCounts/PageSize);
        const totalPageNumbers = siblingCount + 5;

        dotPages.length=0;
        for(let dp=1; dp<= totalPageCount; dp++)
            dotPages.push(dp);

        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }

        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(
            currentPage + siblingCount,
            totalPageCount
        );

        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        if (!shouldShowLeftDots && shouldShowRightDots) {
            let leftItemCount = 3 + 2 * siblingCount;
            let leftRange = range(1, leftItemCount);
      
            return [...leftRange, DOTS, totalPageCount];
          }
      
          if (shouldShowLeftDots && !shouldShowRightDots) {
            let rightItemCount = 3 + 2 * siblingCount;
            let rightRange = range(
              totalPageCount - rightItemCount + 1,
              totalPageCount
            );
            return [firstPageIndex, DOTS, ...rightRange];
          }
      
          if (shouldShowLeftDots && shouldShowRightDots) {
            let middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
          }
         
     }, [totalCounts, siblingCount, currentPage]);
     
    if (currentPage === 0 || paginationRange && paginationRange.length < 2)
      return null;

    const onNext = () => {    
      setIsLoader(true)  
      router.query.page=`${currentPage + 1}`;
      router.push(router);       
    };
    
    const onPrevious = () => {
      setIsLoader(true)
      if((currentPage - 1) !== 1)
          router.query.page=`${currentPage - 1}`;
      else
          delete router.query.page;
      router.push(router);  
    };
    
    const setLoader = () => {
      setIsLoader(true)
    }

    const getURL=(pageNo)=>{
        let _url=process.env.BASE_URL+router.asPath;
        const _pageIdx=_url.indexOf("page=");
        const _isQuery=_url.split("?").length>1; 
              
        if(_isQuery && _pageIdx > -1)
        {
          if(pageNo==1)
            return _url.substring(0,_pageIdx-1);
          else
            return _url.substring(0,_pageIdx)+`page=${pageNo}`;
        }
        else
        {
          if(pageNo==1)
            return _url;
          else
            return `${_url}${_isQuery?"&":"?"}page=${pageNo}`;
        }
    }
    
    let lastPage = paginationRange && paginationRange[paginationRange.length - 1];

  return(
    <>
      <div className={styles.pagination}>
        <ul>
          {
            currentPage === 1 ? null : <li onClick={onPrevious}><Image src="/assets/images/leftpaginationarw.svg" height={10} width={12} alt="Left Arrow" className="img-responsive" /></li>
          }
          {paginationRange?.map((pageNumber, idx) => {
            if (pageNumber === DOTS)
            return <li key={idx}>&#8230;</li>;

            const _index = dotPages.indexOf(parseInt(pageNumber.toString()));
            if(_index>-1)
              dotPages.splice(_index,1);
            if(pageNumber==1)                                
              return (<li key={idx} className={pageNumber === currentPage ? `${styles.active}` : ""}><NavLink onClick={setLoader} className="font14 text444" href={getURL(pageNumber)}>{pageNumber}</NavLink> </li>)
            else
              return (<li key={idx} className={pageNumber === currentPage ? `${styles.active}` : ""}><NavLink onClick={setLoader} className="font14 text444" href={getURL(parseInt(pageNumber.toString()))}>{pageNumber}</NavLink> </li>)
          })}
          {
            dotPages && dotPages.map((pageNumber)=><li key={pageNumber} style={{display:'none'}}><NavLink onClick={setLoader} className="font14 text444" href={getURL(pageNumber)}>{pageNumber}</NavLink> </li>)
          }
          {                    
            currentPage === lastPage ? null : <li onClick={onNext}><Image src="/assets/images/rightpaginationarw.svg" height={10} width={12} alt="Right Arrow" className="img-responsive" /></li>
          }
        </ul>
      </div>
      {isLoader && <Loader />}
    </>
  )
}
