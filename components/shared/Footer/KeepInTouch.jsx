import { Link } from "../../ui";
import socialLinks from "../../../data/socialLinks";
import styles from "./KeepInTouch.module.css";

export const KeepInTouch = () => {
  if (!socialLinks || socialLinks.length == 0) return null;
  return (
    <>
      <h3 className="font14 fontMedium textWhite mb20">Keep in Touch</h3>
      <div className={styles.socialIcon}>
        {socialLinks.map((menu, index) => (
          <Link href={menu.path} className={`textc7c7c7 ${index}`} key={index} rel="nofollow external noopener noreferrer">
            <em className={`${menu.icon} ${styles.gap} font24`}></em>
          </Link>
        ))}
      </div>
    </>
  );
};