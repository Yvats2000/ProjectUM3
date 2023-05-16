import { Link } from "../../ui";
import copyRightLinks from "../../../data/copyRightLinks";
import styles from "./CopyRight.module.css";

export const CopyRight = () => {
  if (!copyRightLinks || copyRightLinks.length == 0) return null;
  return (
    <div className={styles.copyright}>
      <div className={`${styles.copyrightContainer} container`}>
        <p className={`textWhite font12 ${styles.opac}`}>
          © 2023 www.urbanmoney.com. All rights reserved.
        </p>
        <ul>
          {copyRightLinks.map((menu, index) => (
            <li key={index}>
              <Link href={`${process.env.BASE_URL}${menu.path}`} className={`textWhite font12 ${styles.opac}`}>                {menu.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};