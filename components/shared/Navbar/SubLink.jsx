import { useRouter } from 'next/router'

export const SubLink = ({menuLinks=[], styles})=>{
    const router = useRouter();
    const handleClick = (e, path) => {
      e.preventDefault();
      router.push(path)
    };
    if(menuLinks && menuLinks.length>0){
        return(
            <div className={`${menuLinks[0].child ? 'dropdownMenu dropdownExpend ' : 'dropdownMenu infiniteScroll'}`}>
                <ul className={`${styles.dropdownUl} ${menuLinks[0].child?styles.allcalc:null}`}>
                    {menuLinks.map((menu, index) => (
                        menu.child && menu.child.length > 0 ? 
                        <div className={`${styles.calc} ${styles[menu.class]}`} key={index}>
                            <p>{menu.text}</p>
                            <ul className={`${styles.childMenu} ${styles[menu.class]}`}>
                                {menu.child.map((subMenu, subIndex) => (
                                <li key={subIndex} className='mb10' onClick={(e) => handleClick(e, subMenu.path)}>{subMenu.text}</li>
                                ))} 
                            </ul>
                        </div>
                        : <li key={index} className={styles.dropdownLi}><span onClick={(e) => handleClick(e, menu.path)} className={styles.navLink}>{menu.text}</span></li>
                    ))}
                </ul>
          </div>
        )
    }
    return null;
}
