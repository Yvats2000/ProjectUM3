import styles from "./ApplicationForm.module.css";
import Image from "next/image";
import { NavLink } from "../../../ui";
import headerStyles from "../../../shared/Header/Header.module.css";

export const Header = () => {
  return (
    <header className={`${headerStyles.header} ${styles.scHeader}`}>
      <NavLink href="/" exact className={headerStyles.logoBox}>
        <Image src='/assets/images/logoBlack.svg' width={100} height={32} className="imgResponsive" alt="Urban Money" />
      </NavLink>
      <div className="dlfex alingcenter">
        <p className="font16 mobfont16 text2828 fontsemiBold">Secure Application</p>
        <figure className="marg12L"><Image src="/assets/images/secure.png" width={12} height={16} alt="Secure Application" /></figure>
      </div>
    </header>
  );
};