import styles from "./bankAmcDetails.module.css";
import {FundDirectGrowth} from './closerTable'
export const CloserLook=({data})=>{
    return(
    <section className={styles.section}>
        <div className="container">
            <h2 className="font24 fontSm20 fontsemiBold textBlack mb25">Lets have a closer look</h2>
            <p className="lineHeight26 font14 text444 mb30">A mutual fund is a corporation that raises funds from multiple investors and invests the accumulated amount in stocks, bonds, short-term loans and correlated assets. The portfolio of a mutual fund is made up of all of the funds holdings</p>
            {data && data.data && data.data.map((item,index)=>(
                index < 5 &&
                <div className={`${styles.closerLook} mb30`} key={index}>
                    <h3 className="font18 fontsemiBold mb20">{item.scheme_name || '-'}</h3>
                    {/* <p className="font14 text444 mb10 opt60">Fund Performance:</p>
                    <p className="font14 text444 mb15 lineHeight22">The funds annualized returns for the past 3 years & 5 years has been around 6.98% & 6.99%. The Nippon India Short Term Fund comes under the Debt category of Nippon India Mutual Funds</p> */}
                    <FundDirectGrowth data={item}/>
                </div> 
            ))}
            
        </div>
    </section>
    )
}