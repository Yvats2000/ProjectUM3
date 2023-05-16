import Image from "next/image"
import { useState } from "react";
import { BreadCrumb, CreditScore, FAQ, SectorCard } from "../../shared"
import { Button } from "../../ui/button";
import styles from "./sectorList.module.css"
import cmsStyles from "../../shared/CmsContent/CmsContent.module.css";
export const SectorList = ({ sectorList, cmsData }) => {
    const breadCrumbLinks = [
        {
            "text": `Mutual Funds`,
            "path": `/mutual-funds`,
            "className": ""
        },
        {
            "text": `Sectoral Mutual Funds`,
            "path": `/mutual-funds/sector`,
            "className": ""
        }
    ];

    const records = 20;
    const [showNumberOfSectors, setShowNumberOfSectors] = useState(records);
    const viewMore = () => {
        setShowNumberOfSectors(showNumberOfSectors + records)
    }
    return (
        <>
            <section className={styles.topSection}>
                <div className="container">
                    <BreadCrumb links={breadCrumbLinks} />
                </div>
                <div className="container">

                    <div className={styles.topHeading}>
                        <div className="heading">
                            <h1 className="font24 mb40 text2828 lineHeight36 fontsemiBold bottomborderf5a623 Innerheading">{cmsData && cmsData[0] && cmsData[0].post_title ? cmsData[0].post_title : 'Sectoral Mutual Funds'}</h1>
                        </div>
                        <p className="font14 text444 lineHeight24 mb45">
                            {cmsData && cmsData[0] && cmsData[0].short_description ? cmsData[0].short_description : 'A Sectoral fund is a mutual fund that specifically invests in equities of companies from a similiar sector or industry. These funds allow investors to park their assets in a particular sector to stimulate their returns. And compliments goals of the investors who want to make industry-specific investments.'}</p>
                    </div>
                </div>
                <div className={styles.imageTop}>
                    <Image src="/assets/images/imag-sectors-list.png" width={452} height={277} className="imgResponsive" />
                </div>
            </section>
            <section className={`${styles.bestFundList} section `}>
                <div className={`container `}>
                    <h2 className="font24 mb40 text2828 lineHeight36 fontsemiBold bottomborderf5a623 Innerheading">Explore Funds by Category</h2>
                    <div className={styles.fundGrid}>
                        {sectorList && sectorList.length > 0 && sectorList.map((data, index) =>
                            <SectorCard data={data} key={index} index={index} showNumberOfSectors={showNumberOfSectors} />)}
                    </div>
                    {showNumberOfSectors < sectorList.length ?
                    <div className={`${styles.btncenter} mt30`}>
                        <Button className="btn btn-primary font14 btn25 textCenterSm btnFull" onClick={() => viewMore()}>Show More <em className="icon-arrow-right font14"></em></Button>
                    </div>
                    : null}
                </div>
            </section>
            {cmsData && cmsData[0] &&
                <section className={`${cmsStyles.eligible} mb50`}>
                    <div className="container">
                        <div dangerouslySetInnerHTML={{ __html: cmsData[0].post_content }} className="mt15"></div>
                    </div>
                </section>
            }
            <CreditScore />
            {cmsData && cmsData[0] && cmsData[0].isFAQ && cmsData[0].faq_content && cmsData[0].faq_content.length > 0 ?
                <section className="faq">
                    <div className="container">
                        <h2 className="faqHeading font24">{cmsData[0].faq_name}</h2>
                        <div className="faqBx">
                            <FAQ data={cmsData[0].faq_content} />
                        </div>
                    </div>
                </section>
                : null}
        </>
    )
}