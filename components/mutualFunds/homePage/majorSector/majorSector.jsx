import Image from "next/image"
import { NavLink } from "../../../ui"
import styles from "./majorSector.module.css"

export const MajorSector = () => {
    return (
        <>
            <section className={styles.mutualFundSection}>
                <div className="container">
                    <div className={styles.sectorTilesFlex}>
                        <div className={styles.bestSectors}>
                            <figure className={styles.fundHousebg}><Image src="/assets/images/bestSector.svg" width={221} height={313}  alt="" srcset=""/></figure>
                            <h2 className="font30 mb40 textBlack fontsemiBold  lineHeight42 Innerheading fontSm26">Best Performing Sectoral Mutual Funds</h2>
                            <p className="font14 text2828 opt80 lineHeight30 mb30  fontSm12 moblineheight24">Find all the relevant information on the best sectoral mutual funds in the market. Which are sure to stimulate your investments and accentuate your corpus significantly. We’ve covered a wide range of industries, from auto components to hospitality, so you can find the fund that complements your investment goals.</p>
                            <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector`} className={`btn btn-primary ${styles.webcta} font16 btn25 fontsemiBold  textCenterSm btnFull`} >View All Sectors <em className="icon-arrow-right font14"></em></NavLink>
                        </div>
                        <div className={styles.popularSectors}>
                            <div className={styles.main}>
                                <div className={styles.mainc}></div>
                                <div className={styles.innerCircle}>
                                    <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/broadcasting`}>
                                    <div className={`${styles.inner} ${styles.broadcasting}`}>
                                        <figure className={styles.sectorlogo}>
                                            <Image src="/assets/images/broadcasting.png" width={30} height={28} alt="" srcset=""/>
                                        </figure>
                                        <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Broadcasting</p>
                                    </div>
                                    </NavLink>
                                    <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/auto-parts-equip`}>
                                    <div className={`${styles.inner} ${styles.autoparts}`}>
                                        <figure className={styles.sectorlogo}>
                                            <Image src="/assets/images/auto-parts-equip.png" width={30} height={28} alt="" srcset=""/>
                                        </figure>
                                        <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Auto Parts & Equip</p>
                                    </div>
                                    </NavLink>
                                    <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/conglomerate`}>
                                    <div className={`${styles.inner} ${styles.conglo}`}>
                                        <figure className={styles.sectorlogo}>
                                            <Image src="/assets/images/conglomerate.png"  width={30} height={29} alt="" srcset=""/>
                                        </figure>
                                        <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Conglomerate</p>
                                    </div>
                                    </NavLink>                      
                                </div>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/bonds`}>
                                <div className={`${styles.inner} ${styles.bonds}`}>
                                    <figure className={styles.sectorlogo}>
                                        <Image src="/assets/images/bonds.png" width={27} height={25} alt="" srcset=""/>
                                    </figure>
                                    <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Bonds</p>
                                </div>
                                </NavLink>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/hospitality`}>
                                <div className={`${styles.inner} ${styles.hospitality}`}>
                                    <figure className={styles.sectorlogo}>
                                        <Image src="/assets/images/hospitality.png"  width={30} height={31} alt="" srcset=""/>
                                    </figure>
                                    <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Hospitality</p>
                                </div>
                                </NavLink>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/distributors`}>
                                <div className={`${styles.inner} ${styles.distributors}`}>
                                    <figure className={styles.sectorlogo}>
                                        <Image src="/assets/images/distributors.png" width={30} height={32} alt="" srcset=""/>
                                    </figure>
                                    <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Distributors</p>
                                </div>
                                </NavLink>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/energy`}>
                                <div className={`${styles.inner} ${styles.carmanufacture}`}>
                                    <figure className={styles.sectorlogo}>
                                        <Image src="/assets/images/energy.png" width={28} height={37} alt="" srcset=""/>
                                    </figure>
                                    <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Energy</p>
                                </div>
                                </NavLink>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/diversified-chemicals`}>
                                <div className={`${styles.inner} ${styles.chemicals}`}>
                                    <figure className={styles.sectorlogo}>
                                        <Image src="/assets/images/diversified-chemicals.png" width={30} height={33} alt="" srcset=""/>
                                    </figure>
                                    <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Diversified Chemicals</p>
                                </div>
                                </NavLink>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/diversified-metals`}>
                                <div className={`${styles.inner} ${styles.metals}`}>
                                    <figure className={styles.sectorlogo}>
                                        <Image src="/assets/images/diversified-metals.png"  width={30} height={22} alt="" srcset=""/>
                                    </figure>
                                    <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Diversified Metals</p>
                                </div>
                                </NavLink>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/auto-components`}>
                                <div className={`${styles.inner} ${styles.autocomponent}`}>
                                    <figure className={styles.sectorlogo}>
                                        <Image src="/assets/images/auto-components.png"  width={27} height={33} alt="" srcset=""/>
                                    </figure>
                                    <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Auto Components</p>
                                </div>
                                </NavLink>
                                <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector/car-manufacturers`}>
                                <div className={`${styles.inner} ${styles.energy}`}>
                                    <figure className={styles.sectorlogo}>
                                        <Image src="/assets/images/car-manufacturers.png"  width={30} height={18} alt="" srcset=""/>
                                    </figure>
                                    <p className={`font14 text444 fontSm12 ${styles.mobilewidth}`}>Car Manufacturers</p>
                                </div>
                                </NavLink>
                            </div>
                            <NavLink href={`${process.env.BASE_URL}/mutual-funds/sector`} className={`btn btn-primary ${styles.mobcta} font16 btn25 fontsemiBold  textCenterSm btnFull`} >View All Sectors <em className="icon-arrow-right font14"></em></NavLink>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}