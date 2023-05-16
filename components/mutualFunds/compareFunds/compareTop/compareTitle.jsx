
import styles from "./compareTop.module.css"
export const CompareTitle = ({data}) => {
  return (
    <div className={`${styles.tile} ${styles.headingTile}`}>
        <h1 className="font18 text2828 lineHeight18 fontsemiBold Innerheading mb30">Compare Mutual Funds </h1>
        <p className="font14 lineHeight24 text444">Start comparing returns between {data && data[0] ? '' : 'funds'}</p>
        {data && data[0] && <p className="font13 lineHeight20 text666 opt80 ">{data[0].quickComparison.scheme_name || '-'} vs {data.length - 1 === 0 ? '' : data.length - 1} others</p>}
    </div>
  )
}
