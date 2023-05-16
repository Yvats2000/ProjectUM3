import Image from "next/image";
import { NavLink } from "../../../ui";
import styles from './majorCategories.module.css'
import { useRouter } from "next/router";
export const MajorCategories = () => {
    const router = useRouter()
    const redirectToCategorie = (e,Categorie) => {
        e.preventDefault();
        router.push(`${process.env.BASE_URL}/mutual-funds/`+Categorie)
    }
  return (
    <section className={styles.majorCateg}>
        <div className="container">
            <div className={styles.categoryWrap}>                
                <NavLink href={`${process.env.BASE_URL}/mutual-funds/search`} className={`font14 textLink fontBold textCenter ${styles.wbehide}`}>Explore all Mutual Funds <Image className="imgResponsive" src="/assets/images/arrow-submit-copy.svg" alt="" srcSet="" width = {14} height = {10}/></NavLink>
                <div className={styles.tiles}>
                    <div className={styles.tile}>
                        <figure className={`${styles.cattype} ${styles.debt} mb20`}><Image className="imgResponsive" src="/assets/images/debt.svg" alt="" srcSet=""width = {100} height = {50}/></figure>
                        <NavLink href={`${process.env.BASE_URL}/mutual-funds/debt`} className="font13  textLink"><p className="font14 lineHeight26 fontsemiBold mb5 text181b30">Debt Mutual Fund</p></NavLink>
                        <p className="text777 font14 lineHeight22 mb20">Invest in fixed income assets such as bonds, securities, and treasury bills.</p>
                        <p className="font13 cursorPointer textLink" onClick={(e)=>redirectToCategorie(e,'debt')}>Know more <Image className="imgResponsive" src="/assets/images/arrow-submit-copy.svg" alt="" srcSet=""width = {20} height = {10}/></p>
                    </div>
                    <div className={`${styles.tile} mt35 mb22`}>
                        <figure className={styles.dotimg}><Image  className="imgResponsive" src="/assets/images/majorcategoryback.svg" alt="" srcSet="" width = {130} height = {130}/></figure>
                        <figure className={`${styles.cattype} ${styles.equity} mb20`}><Image className="imgResponsive" src="/assets/images/Equity.svg" alt="" srcSet="" width = {100} height = {50}/></figure>
                        <NavLink href={`${process.env.BASE_URL}/mutual-funds/equity`} className="font13  textLink"><p className="font14 lineHeight26 fontsemiBold mb5 text181b30">Equity Mutual Fund</p></NavLink>
                        <p className="text777 font14 lineHeight22 mb20">Generate significant returns by investing funds in shares and stocks. 
                        </p>
                        <p className="font13 cursorPointer textLink" onClick={(e)=>redirectToCategorie(e,'equity')}>Know more <Image className="imgResponsive" src="/assets/images/arrow-submit-copy.svg" alt="" srcSet="" width = {20} height = {10}/></p>
                    </div>
                    <div className={`${styles.tile} mtn33`}>
                        <figure className={`${styles.cattype} ${styles.Hybrid} `}><Image className="imgResponsive" src="/assets/images/hybrid.svg" alt="" srcSet=""width = {100} height = {50}/></figure>
                        <NavLink href={`${process.env.BASE_URL}/mutual-funds/hybrid`} className="font13  textLink"><p className="font14 lineHeight26 fontsemiBold mb5 text181b30">Hybrid Mutual Fund</p></NavLink>
                        <p className="text777 font14 lineHeight22 mb20">Invest in mixed asset classs at the same time like stocks and bonds. 
                        </p>
                        <p  className="font13 cursorPointer textLink" onClick={(e)=>redirectToCategorie(e,'hybrid')}>Know more <Image className="imgResponsive" src="/assets/images/arrow-submit-copy.svg" alt="" srcSet=""width = {20} height = {10}/></p>
                    </div>
                    <div className={`${styles.tile} mt22`}>
                        <figure className={`${styles.cattype} ${styles.Tax}`}><Image className="imgResponsive" src="/assets/images/taxsaver.svg" alt="" srcSet="" width = {100} height = {50}/></figure>
                        <NavLink href={`${process.env.BASE_URL}/mutual-funds/tax-saver`} className="font13  textLink"><p className="font14 lineHeight26 fontsemiBold mb5 text181b30">Tax Saver Mutual Fund</p></NavLink>
                        <p className="text777 font14 lineHeight22 mb20">Invest your money in equity shares and quality for tax deductions.
                        </p>
                        <p  className="font13 cursorPointer textLink" onClick={(e)=>redirectToCategorie(e,'tax-saver')}>Know more <Image className="imgResponsive" src="/assets/images/arrow-submit-copy.svg" alt="" srcSet=""width = {20} height = {10}/></p>
                    </div>
                    
                </div>
                
                <div className={styles.text}>
                    <figure className={styles.backdoodel}><Image className="imgResponsive" src="/assets/images/majorcattextback.svg" alt="" srcSet="" width = {110} height = {40}/></figure>
                    <h2 className="font24 textBlack lineHeight40  fontsemiBold bottomborderf5a623 Innerheading   mb45">Major Mutual Fund Categories</h2>
                    <p className="font14  text2828 lineHeight26 opt80 mb60">Choose the mutual funds scheme that best-fits your financial requirement from the extensive range including equity schemes, debt schemes, hybrid schemes, and much more.</p>
                    <NavLink href={`${process.env.BASE_URL}/mutual-funds/search`} className={`font14 textLink fontBold `}>Explore all Mutual Funds <Image className="imgResponsive" src="/assets/images/arrow-submit-copy.svg" alt="" srcSet="" width = {14} height = {10}/></NavLink>
                    
                </div>
            
            </div>
            
        </div>
    </section>
  )
}
