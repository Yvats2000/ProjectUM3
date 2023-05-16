import styles from "./MutualFunds.module.css";
import Image from "next/image";
import {NavLink} from '../../ui';

export const MutualFunds = ({data}) => {
  if(!data || data.length==0)
    return null;
  return (
    <section className={styles.outPartner}>
      <div className="container">
        <h2 className="font24 fontMedium textBlack textCenter ourBlog">Top Mutual Fund AMCs</h2>
        <p className="font14 text282 textCenter mb30">Gain an in-depth understanding of these top-performing AMCs in the country.</p>
        <div className={`${styles.parterLogo}`}>
        {data && data.data.map((option, index) =>
          <figure className={styles.partLogo} key={index}>
            <NavLink href={`${process.env.BASE_URL}/mutual-funds/${option.amcSlug}`}><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/logo/${option.amcLogo}`} width={167} height={75} alt={option.amcLogo}/></NavLink>
            <span className="circle"></span>
          </figure>
        )}
        </div>
      </div>
    </section>
  );
};
