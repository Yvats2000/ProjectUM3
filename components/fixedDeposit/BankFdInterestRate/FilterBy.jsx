import styles from "./BankFdInterestRate.module.css";
export function FilterBy (){
    return(
        <div className={styles.bankFilterBx}>
            <div className={styles.bankFilterBy}>
                <label className="font14 text000 fontsemiBold">filter by</label>
            </div>
            <div className={styles.bankFilterType}>
                <ul className={styles.mobileTabFilter}>
                    <li className={styles.active}>Shape</li>
                    <li>colour</li>
                    <li>finish</li>
                    <li>size</li>
                    <li>shape</li>
                </ul>
            </div>
            <div className={styles.mobileFilterBtn}>
                <button type="button" className="resetBtn">reset</button>
                <button type="button" className="btn btn-primary  apply">Apply</button>
            </div>
            <div className={`${styles.filterType} ${styles.active}`}>
                <div className={styles.filterHead}><label className="font14 textBlack fontsemiBold">shape</label><span><img src="/assets/images/arrow.svg" className="img-responsive" alt="arrow"/></span></div>
                <div className={styles.inputSearch}><input type="text" placeholder="Search by Banks/NBFC"/><img src="/assets/images/searchicon.svg" alt="Urban Money"/> </div>
                <ul className={styles.filterBdy}>
                    <li><input type="checkbox" id="L" checked=""/> <label htmlFor="L" className="font14">L shape</label> </li>
                    <li><input type="checkbox" id="U"/> <label htmlFor="U" className="font14">U shape</label> </li>
                    <li><input type="checkbox" id="C"/> <label htmlFor="C" className="font14">C shape</label> </li>
                    <li><input type="checkbox" id="parallel"/> <label htmlFor="parallel" className="font14">parallel shape</label> </li>
                    <li><input type="checkbox" id="straight"/> <label htmlFor="straight" className="font14">straight</label> </li>
                    <li><input type="checkbox" id="island"/> <label htmlFor="island" className="font14">island</label> </li>
                    <li><input type="checkbox" id="curvy"/> <label htmlFor="curvy" className="font14">curvy</label> </li>
                    <li><input type="checkbox" id="open"/> <label htmlFor="open" className="font14">open</label> </li>
                    <li><input type="checkbox" id="L" checked=""/> <label htmlFor="L" className="font14">L shape</label> </li>
                    <li><input type="checkbox" id="U"/> <label htmlFor="U" className="font14">U shape</label> </li>
                    <li><input type="checkbox" id="C"/> <label htmlFor="C" className="font14">C shape</label> </li>
                    <li><input type="checkbox" id="parallel"/> <label htmlFor="parallel" className="font14">parallel shape</label> </li>
                    <li><input type="checkbox" id="straight"/> <label htmlFor="straight" className="font14">straight</label> </li>
                    <li><input type="checkbox" id="island"/> <label htmlFor="island" className="font14">island</label> </li>
                    <li><input type="checkbox" id="curvy"/> <label htmlFor="curvy" className="font14">curvy</label> </li>
                    <li><input type="checkbox" id="open"/> <label htmlFor="open" className="font14">open</label> </li>
                </ul>
            </div>
            <div className={styles.filterType}>
                <div className={styles.filterHead}><label>color</label><span><img src="/assets/images/arrow.svg" className="img-responsive" alt="arrow"/></span></div>
                <ul className={styles.filterBdy}>
                    <li><input type="checkbox" id="red"/> <label htmlFor="red" className="font14">red</label> </li>
                    <li><input type="checkbox" id="green"/> <label htmlFor="green" className="font14">green</label> </li>
                    <li><input type="checkbox" id="blue"/> <label htmlFor="blue" className="font14">blue</label> </li>
                    <li><input type="checkbox" id="orange"/> <label htmlFor="orange" className="font14">orange</label> </li>
                </ul>
            </div>
            <div className={styles.filterType}>
                <div className={styles.filterHead}><label>finish</label><span><img src="/assets/images/arrow.svg" className="img-responsive" alt="arrow"/></span></div>
                <ul className={styles.filterBdy}>
                    <li><input type="checkbox" id="semi"/> <label htmlFor="semi">semi finish</label> </li>
                    <li><input type="checkbox" id="complete"/> <label htmlFor="complete">complete finish</label> </li>
                </ul>
            </div>
            <div className={styles.filterType}>
                <div className={styles.filterHead}><label>theme</label><span><img src="/assets/images/arrow.svg" className="img-responsive" alt="arrow"/></span></div>
                <ul className={styles.filterBdy}>
                    <li><input type="checkbox" id="light"/> <label htmlFor="light">light</label> </li>
                    <li><input type="checkbox" id="Dark"/> <label htmlFor="Dark">Dark</label> </li>
                </ul>
            </div>
            <div className={styles.filterType}>
                <div className={styles.filterHead}><label>size</label><span><img src="/assets/images/arrow.svg" className="img-responsive" alt="arrow"/></span></div>
                <ul className={styles.filterBdy}>
                    <li><input type="checkbox" id="small"/> <label htmlFor="small">small</label> </li>
                    <li><input type="checkbox" id="medium"/> <label htmlFor="medium">medium</label> </li>
                    <li><input type="checkbox" id="large"/> <label htmlFor="large">large</label> </li>
                </ul>
            </div>
        </div>
    )
}