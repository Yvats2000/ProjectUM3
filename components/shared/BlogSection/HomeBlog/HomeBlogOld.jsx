import styles from "./HomeBlog.module.css";
import moment from 'moment';
import Image from "next/image";
import { Button } from "../../../ui/button/Button";
import { useRouter } from 'next/router'
import { NavLink } from "../../../ui";

export const HomeBlog = ({data}) => {
  const router = useRouter();
  const currentDateTime = (date) => {
    return moment(date).format('MMM DD, YYYY')
  }
  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path)
  };
  if(!data || data.length==0)
        return null;
  return (
     <>
     <section className={styles.blogSction}>
	    <div className="container">
      <h2 className={`font24 textBlack fontMedium  ${styles.ourBlog}`}>Our Blogs</h2>
		    <div className={styles.wrap}>
			    <div className={styles.insigts}>
				    <figure><Image src={process.env.IMAGE_BASEURL + '/images/news-insights.png'} width = {423} height = {232} alt=" News-Insight-Image" /></figure>
				    <p>Get in-depth knowledge about all things related to loans and your finances</p>
				    <Button className="btn btn-primary font14 textCenterSm btn25" onClick={(e) => handleClick(e, "/blogs")}>View all Blogs<em className="icon-arrow-right arw font14 mrg"></em></Button>
			    </div>
			    <div className={styles.tiles}>
          {data.slice(0,2).map((option, index) => 
				    <div className={styles.indTile} key={index}>
					    <figure><Image src={option.post_thumbnail} width = {152} height = {150} className="imgResponsive" alt={option.post_title} /></figure>
					    <div className={styles.blogItem}>
						    <div className={styles.blogInfo}>
							    <span className={styles.name}>{option.post_author}</span>
							    <span className={styles.date}>{currentDateTime(option.post_date)}</span>
						    </div>
						    <h3 className={styles.mainTitle}>{option.post_title}</h3>
						    <div className={`font14 text777`}  dangerouslySetInnerHTML={{__html: option.post_content.slice(0,220)}}></div>
						    <NavLink href={option.post_url} className="font12 textLink">Read More <em className="icon-angle-right arrowSm"></em></NavLink>
					    </div>
				    </div>)}
				    <Button className="btn btn-primary font14 textCenterSm btn25" onClick={(e) => handleClick(e, "/blogs")}>View all Blogs<em className="icon-arrow-right arw font14 mrg"></em></Button>
          </div>
		    </div>
    	</div>
    </section>
    </>
  );
};