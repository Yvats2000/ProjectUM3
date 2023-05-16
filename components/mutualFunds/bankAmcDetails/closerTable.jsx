import styles from "./bankAmcDetails.module.css";
import Image from "next/image";
import {useGlobalContext} from '../../../libs/context';
import { NavLink } from "../../ui";
export function FundDirectGrowth({data}){
    const { isMobile } = useGlobalContext();
    return(
        <div className={styles.planDiv}>
            {isMobile?
                <div className={styles.tableHeaderMobile}>
                    <ul>
                        <li>
                        <NavLink href={process.env.BASE_URL+`/mutual-funds/${data.amcSlug}/${data.schemeSlug}`}><figure><Image  src={process.env.IMAGE_BASEURL+`/amc/icon/${data.amcLogo}`} className={styles.imageMob} layout="fill" alt={data.amc} /></figure></NavLink>
                            {/* <figure>
                        <Image src={'/assets/images/axislogo.png'} className={styles.imageMob} layout="fill" alt="Square Yards" />
                        
                        </figure> */}
                        </li>
                    </ul>
                    <div className={styles.bankData}> 
                        <table className={styles.dataTable}>
                        <tr>
                            <td width="45%" className="text666 opt80">Min Investment Amt</td>
                            <td width="10">:</td>
                            <td className="text444">₹ {data.minInvestment || '-'}</td>
                        </tr>
                        <tr>
                            <td width="45%" className="text666 opt80">AUM</td>
                            <td width="10">:</td>
                            <td className="text444">₹ {data.schemeAum || '-'}</td>
                        </tr>
                        <tr>
                            <td width="45%" className="text666 opt80">5Y Returns</td>
                            <td width="10">:</td>
                            <td className="text444">{Math.round(data.return) || 0} %</td>
                        </tr>
                        </table>
                    </div>
                </div>
                :
                <table className={styles.planTable} cellPadding="0" cellSpacing="0">
                    <tr>
                        <td>
                            <NavLink href={process.env.BASE_URL+`/mutual-funds/${data.amcSlug}/${data.schemeSlug}`}><figure><Image className="imgResponsive" src={process.env.IMAGE_BASEURL+`/amc/logo/${data.amcLogo}`} layout='fill' alt={data.amc} /></figure></NavLink>
                        </td>
                        <td>
                            <p className="applynowTitle mb5 fontBold">₹ {data.minInvestment || '-'}</p>
                            <p className="font14 text666 opt80 lineHeight22">Min Investment Amt</p>
                        </td>
                        <td>
                            <p className="applynowTitle mb5 fontBold">₹ {data.schemeAum || '-'}</p>
                        <p className="font14 text666 opt80 lineHeight22">AUM</p>
                        </td>
                        <td>
                            <p className="applynowTitle mb5 fontBold">{Math.round(data.return) || 0} %</p>
                            <p className="font14 text666 opt80 lineHeight22">5Y Returns</p>
                        </td>
                    </tr>
                </table>
            }
        </div>
    )
}