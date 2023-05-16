  import { Link } from "../../ui";
  import styles from "./ExternalLinks.module.css";
  import { useState } from "react";

  export const ExternalLinks = ({links}) => {
    const [ activeTab, setActiveTab ] = useState(-1);
    const [ activeContainer, setActiveContainer ] = useState(-1);
    const handleClick = (e, index, mainIndex) => {
      e.preventDefault();
      setActiveTab(activeTab != index ? index : -1)
      setActiveContainer(mainIndex)
    };
    const chunkSize = 5;
    const dataArray = [];
    for (let i = 0; i < links.length; i += chunkSize) {
      dataArray.push(links.slice(i, i + chunkSize))
    }
    return (
      <div className={styles.ExternalLinks}>
        <h2 className="font24 fontMedium textWhite textCenter ourBlog mb40 opt70">Trending Searches </h2>
        {dataArray && dataArray.length > 0 &&  dataArray.map((externalLinks, mainIndex) => (
        <div className={`container`} key={mainIndex}>
          <div className={styles.SeoLink}>
            {externalLinks && externalLinks.map((menu, index) => (
              menu.child && menu.child.length > 0 ? 
                <><p key={index} className={`${styles.dropDown} ${activeTab === index && activeContainer === mainIndex ? styles.active : ''} cursorPointer`} onClick={(e) => handleClick(e, index, mainIndex)}>{menu.text} 
                <em className="icon-icon-angle-right "></em>
                </p>
                  <div className={`${styles.dropDownMenu} ${styles.forMob} ${activeTab >= 0 && activeTab === index && activeContainer === mainIndex ? styles.active : ''}`}>
                    {menu.child.map((subMenu, subIndex) =>
                      <Link title={subMenu.title} href={process.env.BASE_URL + subMenu.path} key={subIndex}>{subMenu.text}</Link>
                    )}
                  </div></> :
              <Link href={process.env.BASE_URL + menu.path} title={menu.text} className={`${styles.dropDown} cursorPointer`} key={index}>{menu.text}</Link>
            ))}
          </div>
          {activeTab >= 0 && activeContainer === mainIndex && <div className={`${styles.dropDownMenu} ${styles.forWeb} ${styles.active}`}>
            {dataArray && dataArray[activeContainer][activeTab].child.map((subMenu, subIndex) =>
              <Link title={subMenu.title} href={process.env.BASE_URL + subMenu.path} key={subIndex}>{subMenu.text}</Link>
            )}
          </div>}
        </div>
        ))}
      </div>
    );
  };