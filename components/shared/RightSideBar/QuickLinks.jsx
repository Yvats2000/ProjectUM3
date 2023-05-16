import React, { useState } from 'react';
import {NavLink} from '../../ui';
import styles from "./QuickLinks.module.css";
import { useGlobalContext } from '../../../libs/context';
export const QuickLinks = ({color = 'Blue', menuLinks = {},keyNumber}) => {
  const { isMobile } = useGlobalContext();
  let divClass = 'div'+color;
  let gradientClass = 'gradient'+color;
  let categoryClass = 'category'+color;
  if (!menuLinks || Object.keys(menuLinks).length === 0)
  return null;
  const [_carouselData, setCarouselData] = useState(menuLinks.child);
    const scrolltile = (direction,categoryNameId) => {
        const productBxId =  document.getElementById(categoryNameId);
        const _width = 140
            if(productBxId != null){
            if(direction === "prev"){
                productBxId.scrollLeft -= _width;
            }else{
                productBxId.scrollLeft += _width;
            }
        }
    }
  return (
    <div className={`${styles.category} ${styles[divClass]}`}>
      <div className="container">
        <div className={`${styles.maincategoryWrap}`}>
          <div className={`${styles.categoryTittle}`}>
            <p className={`font22 fontsemiBold ${styles.tittlehead} ${styles[gradientClass]}`}>{menuLinks.text}</p>
            <p className="font14 fontsemiBold text545454">Category</p>
          </div>
          <div className={`${styles.allcategory}`}>
            {((menuLinks.child.length > 5) || (isMobile && menuLinks.child.length > 2)) &&
            <>
              <span className={`${styles.tabs} ${styles.lefttab} cursorPointer`} onClick={()=>scrolltile("prev",'scrollDiv'+keyNumber)}><img src="./assets/images/arrow.svg" alt="Left Arrow" /></span>
              <span className={`${styles.tabs} ${styles.righttab} cursorPointer`} onClick={()=>scrolltile("Next",'scrollDiv'+keyNumber)}><img src="./assets/images/arrow.svg" alt="Right Arrow" /></span>
            </>
            }
            <ul className={`${styles.allcattabs}  ${styles[categoryClass]}`} id={'scrollDiv'+keyNumber}>
              {menuLinks.child.map((subMenu, index) => (
                <li key={index}><NavLink href={`${process.env.BASE_URL}${subMenu.path}`} className={`font14 fontSm12 fontsemiBold text545454`}>{subMenu.text}</NavLink></li>
              ))}
            </ul>
          </div>         
        </div>
      </div>
    </div>
  );
};
