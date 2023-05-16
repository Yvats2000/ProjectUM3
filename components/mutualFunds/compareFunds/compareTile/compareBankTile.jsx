import styles from './compareTile.module.css'
import Image from 'next/image'
import { AddFunds } from './addFunds'
import {NavLink} from '../../../ui';
import commonFunctions from '../../../../utils/CommonFunctions'
export const CompareBankTile = ({data,compareRemove,modelCenter=false}) => {
    const colohan = data && data.quickComparison && data.quickComparison && data.quickComparison.riskClass
  return (
    data && Object.keys(data).length > 0? 
    <div className={`${styles.tile} ${styles.bankFlex}`}>
        <div className={styles.crossicon} onClick={()=>compareRemove(data.quickComparison.schemecode)}><Image width={18} height={18} src="/assets/images/closeFilter.svg" alt=""/></div>
        <NavLink href={`${process.env.BASE_URL}/mutual-funds/${data.quickComparison.amcSlug}/${data.quickComparison.schemeSlug}`} title={data.quickComparison.scheme_name}><figure><Image width={22} height={21} src={process.env.IMAGE_BASEURL+`/amc/icon/${data && data && data.quickComparison.amcLogo}`} className="imgResponsive" alt=""/></figure></NavLink>
        <div className={styles.text}>
        <NavLink href={`${process.env.BASE_URL}/mutual-funds/${data.quickComparison.amcSlug}/${data.quickComparison.schemeSlug}`} title={data.quickComparison.scheme_name}><p className={`font13 lineHeight16 text444 fontsemiBold mb10  ${styles.lineClamp}`}>{data && data.quickComparison.scheme_name || '-'}</p></NavLink>
            <span className={` font10 ${styles[colohan]}`}>{commonFunctions.capitalize(data && data.quickComparison.riskText) || '-'}</span>
            <div className={styles.details}>
                <div className={styles.categoryInfo}>
                    <p className="font12 text444  mb5 ">{commonFunctions.capitalize(data && data.quickComparison.category_type) || '-'}</p>
                </div>
                <div className={styles.retunrInfo}>
                    <p className="font12 text666 opt80 mb5 ">5Y Returns</p>
                    <p className="font12 text444  mb5 ">{data && data.return.fiveYear+'%' || '-'}</p>
                </div>
            </div>
        </div>
    </div>
    :
    <AddFunds modelCenter={modelCenter} handleChange={compareRemove}/>
  )
}
