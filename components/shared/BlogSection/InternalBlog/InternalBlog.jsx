import styles from "./InternalBlog.module.css";
import moment from 'moment';
import Image from "next/image";
import { useRouter } from 'next/router'
import { Button } from "../../../ui/button";
import { NavLink } from "../../../ui";

export const InternalBlog = ({loanType = '' , data}) => {
  const router = useRouter();
  const currentDateTime = (date) => {
    return moment(date).format('MMM DD, YYYY')
  }
  const handleClick = (e, path) => {
    e.preventDefault();
    // router.push(path);
    window.open( path, "_blank");
  };
  if(!data || data.length==0)
        return null;
  return (
    <>
    <section className={styles.blogs}>
      <div className="container">
        <h2 className="font30 textBlack fontMedium   mb10">{loanType} Guide</h2>
        <p className="font14 lineHeight22 mb30 text2828">Get in-depth knowledge about all things related to loans and your finances</p>
        <div className={styles.tiles}>
        {data.slice(0,3).map((option, index) => 
          <div className={styles.indTile} key={index} >
            <figure><Image src={option.post_thumbnail} width = {152} height = {150} className="imgResponsive" alt={option.post_title} /></figure>
            <div className={styles.blogItem}>
              <div className={styles.blogInfo}   >
                <span className={styles.name}>{option.post_author}</span>
                {option.post_date ? <span className={styles.date}>{currentDateTime(option.post_date)}</span> : null}
              </div>
              <NavLink target="_blank" href={option.post_url}><h3 className={styles.mainTitle}>{option.post_title}</h3></NavLink>
              <div className={`font14 text777 clearBoth`} dangerouslySetInnerHTML={{__html: option.post_content.slice(0,220)}}></div>
              {/* <NavLink target="_blank" href={option.post_url} className="font12 textLink"> */}
                <label onClick={(e) => handleClick(e, option.post_url)} className="font12 textLink">Read More <em className="icon-angle-right arrowSm"></em></label>
              {/* </NavLink> */}
            </div>
          </div>)}
        </div>
        <div className={styles.cntr}> 
          <Button className="btn btn-primary font14 textCenterSm btn25" onClick={(e) => handleClick(e, "/blog/")}>View all Blogs<em className="icon-arrow-right arw font14 mrg"></em></Button>
        </div>
      </div>
    </section>
    </>
  );
};