import styles from "./BreadCrumb.module.css";
import {NavLink} from '../../ui';
export const BreadCrumb = ({links=[]}) => {
  return (
    <div className={styles.breadCrumb}>
      <ul>
        <li><NavLink href={'/'} className={`text777 font12`}>Home</NavLink></li>
        {links.map((menu, index) => (
          (links.length - 1 === index) ?
          <li key={index}><label className={menu.class}>{menu.text}</label></li>
          :
          <li key={index}><NavLink href={process.env.BASE_URL + menu.path} className={menu.class}>{menu.text}</NavLink></li>
        ))}
      </ul>
    </div>
  );
};
