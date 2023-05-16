import styles from "./HomeBlog.module.css";
import moment from 'moment';
import Image from "next/image";
import { NavLink } from "../../../ui";
import { useRouter } from 'next/router'
import { useState } from "react";
  
 
export const HomeBlog = ({data,blogCategory}) => {
	const [currentBlog, setCurrentBlog] = useState(data);
	const [tabActive, setTabActive] = useState(-1);
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
  
  const CurrentSet =(item)=>{
	setTabActive(item !== undefined ? item:-1)
	item || item === 0?setCurrentBlog(blogCategory[item].posts):!item?setCurrentBlog(data) :setCurrentBlog(data);
  }

  return (
	  <>
		<div className={styles.topBlogSection}>
	    	<div className="container">
          		<div className={styles.headingBox}><span>Featured Blogs</span></div>
				<ul className={styles.blogCatBtnBox}>
					<li className={`btn btn-primary-outline ${tabActive === -1 && 'active'}`} onClick={()=>CurrentSet()}>All</li>
					{blogCategory.map((category, index)=>(
						<li key={index} onClick={()=>CurrentSet(index)} className={`btn btn-primary-outline ${tabActive === index && 'active'}`}>{category.catName}</li>
					))}
				</ul>
          		<div className={styles.wrap}>
					
            		<div className={styles.tilea}>
              			{currentBlog && currentBlog[0] && <div className={`${styles.bigTile} ${styles.ipad}`}>
                			<figure onClick={(e) => handleClick(e, currentBlog[0].post_url)} className="cursorPointer"><Image src={currentBlog[0].post_thumbnail} width = {382} height = {200} className="imgResponsive" alt={currentBlog[0].post_title} /></figure>
                			<div className={styles.detailsBox}>
                  				<div className={styles.tag}><NavLink target="_blank" href={currentBlog[0].post_category[0].url}>{currentBlog[0].post_category[0].name}</NavLink></div>
								<h3><NavLink target="_blank" href={currentBlog[0].post_url}>{currentBlog[0].post_title}</NavLink></h3>
								<div  dangerouslySetInnerHTML={{__html: currentBlog[0].post_content.slice(0,220)}}></div>
                			</div>
              			</div>}
					</div>
           			<div className={styles.scnwrap}>
            			<div className={styles.newswrap}>
							{currentBlog && currentBlog[1] && <div className={styles.mediumTile}>
                				<figure onClick={(e) => handleClick(e, currentBlog[1].post_url)} className="cursorPointer"><Image src={currentBlog[1].post_thumbnail} width = {382} height = {204} className="imgResponsive" alt={currentBlog[1].post_title} />
									<div className={styles.detailsBox}>
										<div className={styles.tag}><NavLink target="_blank" href={currentBlog[1].post_category[0].url}>{currentBlog[1].post_category[0].name}</NavLink></div>
										<h3><NavLink target="_blank" href={currentBlog[1].post_url}>{currentBlog[1].post_title}</NavLink></h3>
									</div>
                				</figure>
              				</div>}
							{currentBlog && currentBlog[1]	&& <div className={styles.smallTileSection}>
									<div className={styles.smallTile}>
										<figure onClick={(e) => handleClick(e, currentBlog[2].post_url)} className="cursorPointer"><Image src={currentBlog[2].post_thumbnail} width = {174} height = {174} className="imgResponsive" alt={currentBlog[2].post_title} />
											<div className={styles.detailsBox}>
												<div className={styles.tag}><NavLink target="_blank" href={currentBlog[2].post_category[0].url}>{currentBlog[2].post_category[0].name}</NavLink></div>
												<h3><NavLink target="_blank" href={currentBlog[2].post_url}>{currentBlog[2].post_title}</NavLink></h3>
											</div>
										</figure>
									</div>
									<div className={styles.smallTile}>
										<figure onClick={(e) => handleClick(e, currentBlog[3].post_url)} className="cursorPointer"><Image src={currentBlog[3].post_thumbnail} width = {174} height = {174} className="imgResponsive" alt={currentBlog[2].post_title} />
											<div className={styles.detailsBox}>
												<div className={styles.tag}><NavLink target="_blank" href={currentBlog[3].post_category[0].url}>{currentBlog[3].post_category[0].name}</NavLink></div>
												<h3><NavLink target="_blank" href={currentBlog[3].post_url}>{currentBlog[3].post_title}</NavLink></h3>
											</div>
										</figure>
									</div>
								</div>
							}
            			</div>
            			<div className={styles.detail}>
              				<div className={`${styles.horizontalSmallTileSection} ${styles.mobile}`}>
								{currentBlog && currentBlog.slice(4).map((smblog, index)=>
                				<div className={styles.horizontalSmallTile} key={index}>
                  					<figure onClick={(e) => handleClick(e, smblog.post_url)} className="cursorPointer"><Image src={smblog.post_thumbnail} width = {99} height = {99} className="img-responsive"  alt={smblog.post_title}/></figure>
                  					<div className={styles.detailsBox}>
                    					<div className={styles.tag}><NavLink target="_blank" href={smblog.post_category[0].url}>{smblog.post_category[0].name}</NavLink></div>
                    					<h3><NavLink target="_blank" href={smblog.post_url}>{smblog.post_title}</NavLink></h3>
                    					<div className={styles.date}>{currentDateTime(smblog.post_date)}</div>
                  					</div>
                				</div>)}
              				</div>
            			</div>
           			</div>
          		</div>
			</div>
      </div>
	</>
  );
};