import Image from "next/image";
import { MenuLink } from "./MenuLink";
import { AboutUs } from "./AboutUs";
import { ContactUs } from "./ContactUs";
import { KeepInTouch } from "./KeepInTouch";
import logo from "../../../public/assets/images/group-29.png";
import footerBg from "../../../public/assets/images/footerBackground.png";
import styles from "./Footer.module.css";
export function Footer({footerLinks, disclaimer}) {
  const chunkSize = 4;
  const dataArray = [];
  for (let i = 0; i < footerLinks.length; i += chunkSize) {
    dataArray.push(footerLinks.slice(i, i + chunkSize))
  }
  return (
    <>
    {disclaimer ? <section className={styles.Disclaimer}>
      <div className="container">
        <div className={styles.disclamer}>
          <p className={styles.heading}>Disclaimer:</p>
          <p>
          The website may provide information about various loan products,
          insurance products, credit scores &amp; links to other websites or
          resources over which urbanmoney.com does not have control as such
          information &amp; links are received from the Banks, NBFCs, Insurance
          companies &amp; credit rating agencies. Users of this website
          acknowledge that urbanmoney.com is providing these information &amp;
          links only as a convenience, and further agree that urbanmoney.com is
          not responsible for the veracity of such information. Please note that
          users are advised to independently verify the information &amp; do other
          requisite due diligence before making any decision and that
          urbanmoney.com nor its employees, partners, and associated staff are not
          accountable for any loss, harm, or damage due to usage of information
          from this website.  And further that user’s use of links to such
          external websites are subject to the terms of use and privacy policies
          located on those sites.
          </p>
        </div>
      </div>
    </section> : null}
    <footer className={styles.footer}>
      <div className={styles.bgBx}>
        <Image src={footerBg} alt="Urban Money" className={ styles.footerImg}/> 
      </div>   
      <div className="container">
        <div className={styles.footerGrid}>
          <div className={styles.descSection}>
            <figure>
              <Image src={logo} alt="Urban Money" />
            </figure>
            <AboutUs />
          </div>
          <MenuLink styles={styles} footerLinks={dataArray[0] || []} />
        </div>
        <div className={styles.footerGridTwo}>
          <div className={styles.descSection}>
            <ContactUs />
            <KeepInTouch />
          </div>
          <MenuLink styles={styles} footerLinks={dataArray[1] || []} />
        </div>
      </div>
    </footer>
    </>
  );
}
