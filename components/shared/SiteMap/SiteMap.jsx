import styles from './SiteMap.module.css';
export const SiteMap = ({data}) => {
  if (!data || data.length == 0)
  return null;
  return (
    <div className={styles.siteMapMainBx}>
      <div className={styles.siteHeadBx}>
        <div className="container">
          <h1 className="font18 fontBold">SiteMap</h1>
        </div>
      </div>
      <section className="links">
        <div className="container">
        {data.map((menu, index) => (  
          <div className={styles.sitemapBlock} key={index}>
            {menu.path ? <h2 className="font14 fontBold"><a href={menu.path}>{menu.text}</a></h2> : <h2 className="font14 fontBold">{menu.text}</h2>}
            <ul>
              {menu.child && menu.child.length > 0 ? 
                menu.child.map((item, itemIndex) => (item.child && item.child.length > 0 ? item.child.map((subItem, subItemIndex) => (
                subItem.path ? <li className="lineHeight16" key={subItemIndex}><a className="font12" href={subItem.path}>{subItem.text}</a></li> : null)) : <li key={itemIndex} className="lineHeight16"><a className="font12" href={item.path}>{item.text}</a></li>)) : 
              null}
            </ul>
          </div>
          ))}
        </div>
      </section>
    </div>
  )
}
