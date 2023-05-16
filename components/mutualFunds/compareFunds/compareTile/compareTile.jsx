import styles from './compareTile.module.css'
import {CompareBankTile} from './compareBankTile';
import { useRouter } from 'next/router'
export const CompareTile = ({data,modelCenter,handleChange}) => {  
  const router = useRouter();
  let pathArry =router.query.schemeCode && router.query.schemeCode.split(',');

  /*const compareRemove=(schemeCode)=>{
    pathArry = pathArry.filter(e => e !== schemeCode);
    router.push(`${process.env.BASE_URL}/mutual-funds/compare?schemeCode=${pathArry}`)
  }*/
  
  return (
    <div className={styles.changingTiles}>
       <CompareBankTile data={data && data[0]} compareRemove={handleChange} num={1} modelCenter={modelCenter}/>
       <CompareBankTile data={data && data[1]} compareRemove={handleChange} num={2} modelCenter={modelCenter}/>
       <CompareBankTile data={data && data[2]} compareRemove={handleChange} num={3} modelCenter={modelCenter}/>
    </div>
  )
}
