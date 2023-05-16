import styles from './creditCardFeatures.module.css';
import Image from 'next/image';
export function CreditCardFeatures() {
    return(
        <section className={styles.cardFeatures}>
            <div className="container">
                <p className="font28  textBlack fontsemiBold mb15 textCenter mobfont24 respmarg5">Credit Card Features and Benefits</p>
                <p className={`font14  text2828 lineHeight26 opt80 ${styles.centerheading} textCenter`}>Lucrative features and benefits you can&apos;t say no to. </p>
                <div className={styles.offertiles}>
                    <figure className={styles.featurebg}><Image width={35} height={46} className="imgResponsive" src="/assets/images/features-bg.png" alt=""/></figure>
                    <div className={styles.offers}>
                        <figure className={styles.roundTriangle}><Image width={46} height={46} src="/assets/images/Rewards.png" alt="Rewards"/></figure>
                        <p className="font16  text181b30 fontsemiBold mobfont16 mb5">Rewards</p>
                        <p className="font14 text777 lineHeight21 textdesc fontSm12">Enjoy special birthday rewards and cross-payment thresholds on specific categories.</p>
                    </div>
                    <div className={styles.offers}>
                        <figure className={styles.roundTriangle}><Image width={46} height={46} src="/assets/images/CASHBACK.png" alt="Cashback"/></figure>
                        <p className="font16  text181b30 fontsemiBold mobfont16 mb5">Cashback</p>
                        <p className="font14 text777 lineHeight21 textdesc fontSm12">Lucrative cashback offers with an instant amount credit feature.</p>
                    </div>
                    <div className={styles.offers}>
                        <figure className={styles.roundTriangle}><Image width={46} height={46} src="/assets/images/BALANCE TRANSFER.png" alt="Balance Transfer"/></figure>
                        <p className="font16  text181b30 fontsemiBold mobfont16 mb5">Balance Transfer</p>
                        <p className="font14 text777 lineHeight21 textdesc fontSm12">Get top-up and balance transfer facilities on a credit card with attractive rates. </p>
                    </div>
                    <div className={styles.offers}>
                        <figure className={styles.roundTriangle}><Image width={46} height={46} src="/assets/images/TRAVEL.png" alt="Travel"/></figure>
                        <p className="font16  text181b30 fontsemiBold mobfont16 mb5">Travel</p>
                        <p className="font14 text777 lineHeight21 textdesc fontSm12">Make your travel hassle-free with credit cards that offer extensive rewards.</p>
                    </div>
                    <div className={styles.offers}>
                        <figure className={styles.roundTriangle}><Image width={46} height={46} src="/assets/images/ZEROPERCENT.png" alt="Zero Percent"/></figure>
                        <p className="font16  text181b30 fontsemiBold mobfont16 mb5">Zero Percent</p>
                        <p className="font14 text777 lineHeight21 textdesc fontSm12">Explore your options for an accelerated reward credit card with zero per cent interest.</p>
                    </div>
                    <div className={styles.offers}>
                        <figure className={styles.roundTriangle}><Image width={46} height={46} src="/assets/images/LOWINTEREST.png" alt="Low Interest"/></figure>
                        <p className="font16  text181b30 fontsemiBold mobfont16 mb5">Low Interest</p>
                        <p className="font14 text777 lineHeight21 textdesc fontSm12">Enjoy low-interest rates, discounts, and cashback on your credit card payments.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}