import styles from "./RightNavbar.module.css";
import { NavLink } from "../../ui";
import { getItemFromCookie } from '../../../helpers/cookie';
import React, { useEffect, useState } from 'react';
import Image from "next/image";

export const RightNavbar = ({ rightMenu, data }) => {
    const [activeIndex, setActiveIndex] = useState(-1);
    const [LoginTab, setLoginTab] = useState(false);
    const [childActive, setChildActive] = useState(-1);
    useEffect(()=>{
        const autoToken = getItemFromCookie('autoToken');
        if (typeof autoToken !== 'undefined' && autoToken) {
            setLoginTab(true);
        } else {
            setLoginTab(false);
        }
      }, []);
    if (!data || data.length == 0) return null;

    const showActive = (e,index, path) => {
        e.stopPropagation();
        path ? rightMenu() : activeIndex === index ? setActiveIndex(-1) : setActiveIndex(index);
    }
    const showChild  =(e,index)=>{
        e.stopPropagation();
        childActive === index?setChildActive(-1):setChildActive(index);
    }
    return (
    <div className={styles.rightBox}>    
        <div id="nav-toggle" className={`${styles.navToggle} ${styles.active} active`} onClick={rightMenu}>
            <span></span>
        </div>
        <div className={styles.sideMenu}>
                {LoginTab ?
                <>
                    <div className={styles.menuItem}>
                        <div className={`${styles.iconName}`} onClick={(e) => showActive(e, 1,'/my-profile')}>
                            <NavLink href={`${process.env.BASE_URL}/my-profile`}>
                                <div className={`${styles.imgWrap} cursorPointer `}>
                                    <figure><Image src={process.env.IMAGE_BASEURL + '/images/my-profile.svg'} alt='My Profile' height={20} width={20} /></figure>
                                    <p>My Profile</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                    <div className={styles.menuItem}>
                        <div className={`${styles.iconName}`} onClick={(e) => showActive(e, 2,'/credit-score/report')}>
                            <NavLink href={`${process.env.BASE_URL}/credit-score/report`}>
                                <div className={`${styles.imgWrap} cursorPointer `}>
                                    <figure><Image src={process.env.IMAGE_BASEURL + '/images/report1.svg'} alt='My Profile' height={20} width={20} /></figure>
                                    <p>Credit Report</p>
                                </div>
                            </NavLink>
                        </div>
                    </div>
                </>    
                : null}  
            {data.map((menu, index) => (
            <div className={styles.menuItem} key={index}>
                <div className={`${styles.iconName} ${activeIndex === index ? styles.active : ''}`} onClick={(e) => showActive(e, index, menu.child && menu.child.length > 0 ? '' : menu.path)}>
                    {menu.child && menu.child.length > 0 ? 
                    <>
                    
                    <div className={`${styles.imgWrap} cursorPointer `}>
                        <figure><Image src={menu.icon ? process.env.IMAGE_BASEURL + '/images/' + menu.icon : process.env.IMAGE_BASEURL + '/images/generalRightNavBar.svg'} alt={menu.text} height={20} width={20} /></figure>
                        <p>{menu.text}</p>
                        <em className="icon-icon-angle-right arrowSm"></em>
                    </div>
                    <div className={styles.expMenu}>
                        {menu.child.map((item, childIndex) => (
                        <div className={`${item.path==''?null:styles.loan} ${styles[item.class]}`} key={childIndex}>
                            {item.class === 'dropdown'?
                                <div className={styles.dropdownMain} key={index}>
                                    {item.path ? <span onClick={() => rightMenu()}><NavLink  href={`${process.env.BASE_URL}${item.path}`}>{item.text}</NavLink></span> 
                                    : 
                                    <p className="cursorPointer" onClick={(e) =>showChild(e,childIndex)}>{item.text} <em className={`icon-icon-angle-right arrowSm ${childActive === childIndex?styles.active:styles.notActive } `}></em></p>
                                    }
                                    {childActive === childIndex &&
                                    <div className={`${styles.dropdownChild} ${childActive === childIndex?styles.active:null }`}>
                                        {item.child && item.child.length>0 &&  item.child.map((subItem, subChildIndex) => (
                                            subItem.path ? <span key={subChildIndex} onClick={() => rightMenu()}><NavLink className={subItem.class} href={`${process.env.BASE_URL}${subItem.path}`}>{subItem.text}</NavLink></span> : null
                                        ))}
                                    </div>}
                                </div>
                                :
                            item.child && item.child.length > 0 ? 
                            <>
                            <p>{item.text}</p> 
                            {item.child.map((subItem, subChildIndex) => (
                                subItem.path ? <span key={subChildIndex} onClick={() => rightMenu()}><NavLink className={subItem.class} href={`${process.env.BASE_URL}${subItem.path}`}>{subItem.text}</NavLink></span> : null
                            ))}
                            </>
                            :
                            item.path ? <span onClick={() => rightMenu()}><NavLink className={item.class} href={`${process.env.BASE_URL}${item.path}`}>{item.text}</NavLink></span> : null
                            }
                        </div>
                        ))}
                    </div>
                    </>
                    :
                    menu.path ? 
                    <NavLink href={`${process.env.BASE_URL}${menu.path}`}> 
                        <div className={`${styles.imgWrap} cursorPointer `}>
                            <figure><Image src={menu.icon ? process.env.IMAGE_BASEURL + '/images/' + menu.icon : process.env.IMAGE_BASEURL + '/images/generalRightNavBar.svg'} alt={menu.text} height={20} width={20} /></figure>
                            <p className={menu.class}>{menu.text}</p>
                        </div>
                    </NavLink>
                    :
                    <div className={`${styles.imgWrap} cursorPointer `}>
                        <figure><Image src={menu.icon ? process.env.IMAGE_BASEURL + '/images/' + menu.icon : process.env.IMAGE_BASEURL + '/images/generalRightNavBar.svg'} alt={menu.text} height={20} width={20} /></figure>
                        <p className={menu.class}>{menu.text}</p>
                    </div>
                    }
                </div>
            </div>
            ))}
        </div>    
    </div>   
    )
};
