import { NavLink, Link } from "../../ui";
import { Navbar, RightNavbar } from "../";
import { getItemFromCookie, removeItemInCookie } from '../../../helpers/cookie';
import { logOut } from '../../../services/login';
import styles from "./Header.module.css";
import React,{ useState } from 'react';
import { useRouter } from 'next/router';
import Image from "next/image";


export function Header({ navLinks, rightNavBar }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [righMenu, setrighMenu] = useState(false);
  const menuTest = () => {
    setMenuOpen(!menuOpen);
  }
  const rightMenu = () => {
    setrighMenu(!righMenu);
    if (!righMenu) {
      document.body.classList.add('overFlowHidden');
    } else {
      document.body.classList.remove('overFlowHidden');
    }
  }
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  const userlogOut = async () => {
  const autoToken = getItemFromCookie('autoToken');
    const tokenSend = await logOut(autoToken);
    if (tokenSend.status === 200) {
      const removetoken = removeItemInCookie('autoToken');
      if (removetoken) {
        router.push('/');
        webengage.user.logout();
      }
    } else {
      const removetoken = removeItemInCookie('autoToken');
      if (removetoken) {
        router.push('/');
        webengage.user.logout();
      }
    }
    
    
  }
  
  const LoginShow = () => {
    const autoToken = getItemFromCookie('autoToken');
    if (autoToken !=='' && autoToken !==undefined) {
      return <><button className={`${styles.btnLogin} user_logout_hd font14`} onClick={()=>userlogOut()}>Logout</button></>;
    } else {
      return <><button className={`${styles.btnLogin}  user_login_hd font14`} onClick={(e) => handleClick(e, "/login")}>Login</button></>;
    }
  }
  return (
    <header className={`${styles.header} ${menuOpen?styles.active:null}`}>
      {/* <div id="nav-toggle" className={`${styles.navToggle} ${menuOpen?styles.active:null}`} onClick={menuTest}>
        <span></span>
      </div> */}
      <NavLink href="/" exact className={styles.logoBox}>
        <Image src='/assets/images/logoBlack.svg' width={100} height={32} className="imgResponsive" alt="Urban Money" />
      </NavLink>
      <Navbar styles={styles} navLinks={navLinks} menuOpen={ menuOpen}/>
        <div className={styles.loginNav}>
          <ul className={styles.navMainUl}>
          {/* <li className={`${styles.navMainLi} ${styles.trackDesk}`}>
              <Link href="#" className={'font14 text2828'}>
                Track your Application
              </Link>
            </li> */}
            <li className={styles.navMainLi}>
              {LoginShow()}
            </li>
            <li>
              <div id="nav-toggle" className={`${styles.navToggle} ${styles.rightToggle} ${righMenu?styles.active:null}`} onClick={rightMenu}>
                <span></span>
              </div>
            </li>
          </ul>
        </div>
        <div className={`displayNone`}><RightNavbar data={rightNavBar} /></div>
      {righMenu ? <RightNavbar rightMenu={rightMenu} data={rightNavBar} /> : <React.Fragment />}
        <div className={`${styles.overLay} ${menuOpen || righMenu ? styles.active : ''}`}></div>
    </header>
    
    
  );
}
