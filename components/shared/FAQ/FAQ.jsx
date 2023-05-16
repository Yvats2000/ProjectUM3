import React, {useState} from 'react';
import styles from "./FAQ.module.css";
export const FAQ = ({data}) => {
  const [ activeFaq, setActiveFaq ] = useState(-1);
  const handleFaq = (e, index) => {
    activeFaq === index ? setActiveFaq(-1) : setActiveFaq(index);
  };
  if (!data || data.length == 0)
    return null;
  return (
    <>
    {data.map((faqs, index) =>
      <div className={`${styles.question} ${activeFaq === index ? styles.active : ''}`} key={index} onClick={(e) => handleFaq(e, index)}>
        <div className={styles.faqQuestn}>
          <h3 className="txt font14 fontMedium">{faqs.question}</h3>
          <span className={`${styles.pluseIcon} ${activeFaq === index ? styles.expendIcon : ''}`}></span>
        </div>
        <div className={`${styles.content}`} dangerouslySetInnerHTML={{ __html: faqs.answer }}></div>
      </div>)}
    </>
  );
};
