import Image from 'next/image';
import styles from "./TrendingProduct.module.css";
import {NavLink} from '../../ui';
import react,{useState} from 'react';
import { useRouter } from 'next/router'

export const TrendingProduct = ({title, page, subHeading, products}) => {
  const [readMore, setReadMore] = useState(false)
  const router = useRouter();
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  return (
    <section className={styles.priceTrending}>
      <div className="container">
        <h2 className={`font24 fontMedium textBlack textCenter ${styles.mainHeading}`}>{title}</h2>
        {/* <p className={`font14 text2828 ${styles.subHeading} fontMedium`}>{subHeading || `Our picks for the hottest offers and coolest deals all in one place`}</p> */}
        <p className={`font14 text2828 ${styles.subHeading} fontMedium`}>We are a one-stop-shop for all your loan credit requirements. We aim to revolutionise <span className={`${styles.readText} ${readMore?styles.active:null}`}>  how loans are distributed by infusing technology and digital platforms into the financial sector. With a network of over 50 lenders, Urban Money offers you the best financial products and services. We match your credit profile with the finance provider&apos;s criteria to process your loan application.</span> <span className={`textLink cursorPointer ${styles.readmore}`} onClick={()=>setReadMore(!readMore)}>Read {readMore?'Less':'More..'}</span></p>
        <div className={page === 'homePage' ? styles.priceTrendingGrid : styles.serviceOffred}>
          {products.map((loan,index) =>(
           <div className={`${styles.trendingCard} ${styles[loan.class]}`} key={index}>
              <NavLink href={`${process.env.BASE_URL}/${loan.slug}`}><h3 className={`font16 ${styles.loanHeading} fontMedium`} dangerouslySetInnerHTML={{__html: loan.name}}></h3></NavLink>
              <p className={`font14 text777 ${styles.loanApproval} ${styles.content}`}>{loan.description}</p>
              <p className={`${page === 'homePage' ? styles.interestRate : styles.interestTop} font20  textWhite`}>{loan.roi}</p>
              <span className={`${styles.checkEl} font14 fontMedium ${[loan.gaClass]} cursorPointer`} onClick={(e) => handleClick(e, loan.eligibilitySlug ? loan.eligibilitySlug : loan.slug)}>Check Eligibility<em className={`icon-angle-right ${styles.arrowSm} fontMedium`}></em></span>
              {page === 'homePage' ? <figure className={styles.loanIcon}>
                
              <Image src={process.env.IMAGE_BASEURL + '/images/' + loan.imageSrc} height={loan.height} width={loan.width} alt={loan.name} className="imgResponsive" />       
              </figure> : <react.Fragment /> }
            </div>
          ) )}
        </div>
      </div>
    </section>
  );
};
