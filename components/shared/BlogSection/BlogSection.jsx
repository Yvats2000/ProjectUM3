import styles from "./BlogSection.module.css";
import moment from 'moment';
import Image from "next/image";
import { useRouter } from 'next/router'

export const BlogSection = ({data}) => {
  const router = useRouter();
  const currentDateTime = () => {
    return moment().format('MMM DD, YYYY')
  }
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  if(!data || data.length==0)
        return null;
  return (
    <section className={styles.blogSction}>
      <div className="container">
        <h2 className={`font24 textBlack fontMedium textCenter ${styles.ourBlog}`}>Our Blogs</h2>
        <p className="font14 text282 textCenter">Get in-depth knowledge about all things related to loans and your finances</p>
        <div className={styles.blogGrid}>
          {data.map((option, index) => 
          <div className={styles.blogItem} key={index}>
            <figure>
              <Image className="imgResponsive" src={option.post_thumbnail} width={614} height={452} alt={option.post_title}/> 
            </figure>
            <div className={styles.blogInfo}>
              <span className="font14 text777">{option.post_author}</span>
              <span className="font14 text777">{currentDateTime(option.post_date.format)}</span>
            </div>
            <h3 className={`font16 text181d ${styles.blogHeading} fontMedium`}>{option.post_title}</h3>
            <span className={`font14 text777`} dangerouslySetInnerHTML={{__html: option.post_content.slice(0,220)}}></span>
            <a href={`${process.env.BASE_URL}/option.post_url`} className="font12 textLink" target="_blank" rel="noreferrer">Read More <em className="icon-angle-right arrowSm"></em></a>
          </div>
          )} 
        </div>
        <div className={styles.btnBox}>
          <button className="btn btn-primary textCenterSm btn25 font14" onClick={(e) => handleClick(e, "/blogs")}>View All Blogs <em className="icon-arrow-right arw font14 mrg"></em></button>
        </div>
      </div>
    </section>
  );
};