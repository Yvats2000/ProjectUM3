import { NavLink } from "../../ui"
import styles from "./sectorCard.module.css"
export const SectorCard=({data,showNumberOfSectors,index})=>{
    const colors=["color1","color2","color3","color4","color5","color6","color7","color8","color9","color10","color11","color12","color13","color14","color15"]
    const randomIndex = Math.floor(Math.random() * colors.length);
    return(
        <>
        <NavLink className={ `${styles.fundShow} ${index < showNumberOfSectors ? styles.active : null}`} href={`${process.env.BASE_URL}/mutual-funds/sector/${data.sector_slug}`}>
            <div className={`${styles.fundItem} `}>
            <figure className={`${styles.fundImg} ${styles[colors[randomIndex]]}`}>{data.sect_name.split(/[\s,;.!?&\-/]+/).map(word => word.charAt(0)).join("")}</figure>
            <div className={styles.fundName}>
                <h3 className="font14 fontsemiBold text313541">{data.sect_name}</h3>
                {/* <p>Lorem Ipsum is simply dummy</p> */}
            </div>
        </div>
    </NavLink>
    </>
    )
}