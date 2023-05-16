import Image from "next/image";
import Link from 'next/link';
import styles from "./amcCard.module.css"

export const AmcCard = ({data,showNumberOfAmc, index}) => {
  return (
    <div className={`${styles.clientBx} textCenter ${index < showNumberOfAmc ? styles.active : null}`}>
      <Link href={`${process.env.BASE_URL}/mutual-funds/${data.amcSlug}`}><a>
      <figure>
        <Image className={`imgResponsive ${styles.amcimage}`} src={process.env.IMAGE_BASEURL+`/amc/logo/${data.amcLogo}`} layout="fill" alt={data.fund} />            
      </figure>
      <span className="font14 text444" title={data.fund}>{data.fund}</span>
      </a></Link>
    </div>
  )
}