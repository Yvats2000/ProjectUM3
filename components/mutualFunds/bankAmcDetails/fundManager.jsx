import styles from "./bankAmcDetails.module.css";
export const FundManager = ({managersData , amcName}) => {
    const nameToInitials=(fullName)=> {
        const namesArray = fullName.trim().split(' ');
        if (namesArray.length === 1) return `${namesArray[0].charAt(0)}`;
        else return `${namesArray[0].charAt(0)}${namesArray[namesArray.length - 1].charAt(0)}`;
      }
    return(
        <section className={`${styles.section} ${styles.bgGray}`}>
            <div className="container">
                <h2 className="font24 fontSm20 mb40 textBlack bottomborderf5a623 Innerheading fontMedium lineHeight36">Fund Managers</h2>
                {managersData && managersData.map((item,index) => (
                <div className={styles.fundManagers} key={index}>
                    <figure>{nameToInitials(item.name)}</figure>
                    <div className={styles.managerDetails}>
                        <p className={`${styles.managerName} font14 fontBold mb20`}>{item.title || ''} {item.name}
                            <span className="text666 font12 fontMedium">{item.designation}</span>
                        </p>
                        <p className="font14 text444 lineHeight26">{item.basicdetails}</p>
                    </div>
                </div>
                    ))}
            </div>
        </section>
    )
}