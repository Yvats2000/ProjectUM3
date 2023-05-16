import styles from "./CmsContent.module.css";
import React,{ useState } from "react";
import { FAQ } from "../index";
import { RightSideBar,LeadPopup, PopUp } from '../../shared'
export const CmsContent = ({ data, rightSideJson, path,productName}) => {
  const [ activeTab, setActiveTab ] = useState(0);
  const [openLeadPopup, setLeadPopup] = useState(false);
  const [openThankYouPopup,setThankYouPopUp] = useState(false);
  let thankyouTitle = "Interest submitted";
	let thankyou = "Thank You!";
	let text = "Thank you for showing your interest. Our agent will get in touch with you soon.";
  const enquireNowHandle = () => {
    setLeadPopup(true);
  }
  if (!data || data.length == 0 || Object.keys(data).length === 0)
    return null;
  const handleClick = (e, index,id) => {
    setActiveTab(index);
    const violation = document.getElementById(id); 
      window.scrollTo({
        top:violation.offsetTop - 80,
        behavior:"smooth"
    });
    window.history.replaceState(null,"",path+"#"+id)
  };
  

  const updateKey = (value) => {
    return value.split(" ").join("-")
  }
  return (
    <>
    {openLeadPopup ? <LeadPopup productName={productName?productName:''} setPopUpClose={() => setLeadPopup(false)} setThankYouPopUp={() => setThankYouPopUp(true)} /> : null}
    {openThankYouPopup ? <PopUp title={thankyouTitle} thankyou={thankyou} text={text} setThankYouPopUp={() => setThankYouPopUp(false)} /> : <React.Fragment /> }
      <section className={`${styles.tabSection}`}>
        <div className={`${styles.tabElement} container`}>
          <ul>
            {data.filter((value) => !value.meta_title && !value.short_description).map((item, index) =>
              // <li key={index} className={`${activeTab === index ? styles.active : ''}`} onClick={(e) => handleClick(e, index)}><a href={`#${updateKey(data[index].name)}`}>{item.name}</a></li>
              <li key={index} className={`${activeTab === index ? styles.active : ''}`} onClick={(e) => handleClick(e, index,updateKey(data[index].name))}><a >{item.name}</a></li>
            )}
            <li onClick={() => enquireNowHandle()} className={styles.applyBtn}>Apply Now</li>
          </ul>
        </div>
      </section>
      <div className="container containerFlex">
        <div className={styles.textClass}>
          {data.filter((value) => value.isFAQ === false && !value.meta_title && !value.short_description).map((item, index) =>
            <div id={updateKey(data[index].name)} className={styles.BlankDiv} key={index}>
              <section  className={styles.eligible} >
                <div className="container">
                  <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
                </div>
              </section>
            </div>
          )}
       </div>
        <RightSideBar menuLinks={rightSideJson} paddingTop={true} productName={productName}/>
      </div>
      {data.filter((value) => value.isFAQ === true).map((item, index) =>
        <div className={styles.BlankDiv} id={item.name} key={index}>
            <section  className="faq" >
              <div className="container">
                <h2 className="faqHeading font24">{item.name}</h2>
                <p className="font14 lineHeight24 text444 mb45 faqP">From refinancing to reducing your interest, we have the answers right here.</p>
                <div className="faqBx">
                <FAQ data={item.content} />
                </div>
              </div>
            </section>
        </div>
      )}
    </>
  );
};