import {SubLink} from './SubLink';
import { useRouter } from 'next/router';
import { Link } from "../../ui";

export const MenuLink=({menu, styles})=>{
    const router = useRouter();
    const handleClick = (e, path) => {
      e.preventDefault();
      router.push(path)
    };
    if(!menu)return null;
    if(menu.child && menu.child.length>0)
        return (<li className={`${styles.navMainLi} dropdownBox`}> <Link href={menu.path}><span className={`${styles.dropdownToggle} font14 text2828`}>{menu.text}<em className="icon-icon-angle-right arrowSm topmarg"></em></span></Link><SubLink menuLinks={menu.child} styles={styles}/></li>)
    else if(menu.path && menu.label)  
        return  <li className={styles.navMainLi}> <Link href={menu.path}><span className="font14 text2828">{menu.text}<i className={styles.label}>{menu.label}</i></span> </Link></li>
    else if(menu.path && menu.class)
        return  <li className={styles.navMainLi}> <span onClick={(e) => handleClick(e, menu.path)} className={`font14 text2828 ${styles[menu.class]}`}>{menu.text}</span></li>      
    else
        return null;    
}
