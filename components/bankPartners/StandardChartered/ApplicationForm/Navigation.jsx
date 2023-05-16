import styles from "./ApplicationForm.module.css";
export const Navigation = ({activeTile, handleAction}) => {
  return (
    <div className={styles.navBtn}>
      {activeTile >= 1 &&
        <button className={`btn btn-primary text444 font16 btn25 ${styles.back} fontsemiBold textCenterSm`} onClick={()=>handleAction('back')}>
          <em className="icon-arrow-right font16 fontsemiBold"></em>Back
        </button>
      }
      <button className="btn btn-primary font16 btn25 fontsemiBold textCenterSm" onClick={()=>handleAction('next')}>
        {activeTile === 3 ? `Submit` : `Next`}
        <em className="icon-arrow-right font16 fontsemiBold"></em>
      </button>
    </div>
  );
};