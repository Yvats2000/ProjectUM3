import styles from './Loader.module.css';
export const Loader = () => {
  return (
    <div className={styles.loader}>
        <img src='/assets/images/loader.gif' alt='Loader' className={styles.loaderSize}/>      
    </div>
  )
}
