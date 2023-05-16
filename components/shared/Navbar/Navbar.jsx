import {MenuLink} from "./MenuLink"
//import navLinks from "../../../data/navLinks"

export const Navbar = ({styles, navLinks,menuOpen}) => {
    if(!navLinks || navLinks.length==0)
        return null;
    return(
        <nav className={`${styles.nav} ${menuOpen ? styles.active : null}`}> 
            
            <ul className={styles.navMainUl}>            
                {
                    navLinks.map((menu, index) => <MenuLink key={index} menu={menu} styles={styles} />)
                }          
            </ul>
        </nav>
    )
};

