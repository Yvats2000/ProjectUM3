//import footerLinks from "../../../data/footerLinks";
import { SubLink } from "./SubLink";

export const MenuLink = ({styles, footerLinks}) => {
  if (!footerLinks || footerLinks.length == 0) return null;
  return (
    <>
      {footerLinks.map((menu, index) => (
        <div className={`${styles.loanSec} ${styles[menu.class]}`} key={index}>
          <h3 className="mb20 fontMedium textWhite font14">{menu.text}</h3>
          <SubLink menuLinks={menu.child} />
        </div>
      ))}
    </>
  );
};
