import TopBanksList  from './../../../data/creditCardTopBanks.json'
import styles from './topBanks.module.css';
import Image from 'next/image';
import { Link } from '../../ui';
export function TopBanks() {
    return(
        <section className={styles.creditcardbyTopBank}>
            <figure className={styles.wavesBack}>
                <Image className={`imgResponsive`} width={1358} height={508} src="/assets/images/wave-lines.png" alt="" />
            </figure>
            <figure className={styles.topbankBack}>
                <Image className={` imgResponsive`} width={1358} height={668} src="/assets/images/top-bankbackground.png" alt="" />
            </figure>
            
            <div className="container">
                <div className={styles.heading}>
                    <p className="font28  textBlack fontsemiBold mb15 textCenter mobfont24 respmarg5">Credit Card by Top Banks</p>
                    <p className={`font14  text2828 lineHeight26 opt80 ${styles.centerheading} textCenter`}>Spend smartly with credit cards offered by top banks. </p>
                </div>
                <div className={styles.allbankListing}>
                    {TopBanksList && TopBanksList.length>5 && <><span className={`${styles.pointers} ${styles.leftpointarw}`} > <Image width={8} height={14} src="/assets/images/leftnavarw.svg" alt="" /></span>
                    <span className={`${styles.pointers} ${styles.rightpointarw}`}> <Image width={8} height={14} src="/assets/images/rigthnavarw.svg" alt="" /></span></>}
                    <ul className={`${TopBanksList && TopBanksList.length<5&& styles.alignCenter }`}>
                        {TopBanksList && TopBanksList.length>0 && TopBanksList.map((item,index)=>(
                            <li key={index}>
                                <figure className={styles.bankLogo}><Image width={142} height={50} className="imgResponsive banklogo" src={item.bankLogo} alt={item.bankName}/></figure>
                                <p className="font14 fontsemiBold mb10 text777 bankHeadingname">{item.bankName}</p>
                                <Link className="textLink justifycenter dlfex alingcenter  fontsemiBold font14" href={item.ctaLink}>{item.ctaName} <em className="marg5L icon-arrow-right font14"></em></Link>
                            </li>
                        ))
                        }
                    </ul>
                </div>
            </div>
        </section>
    )
}