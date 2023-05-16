import styles from "./BankFdInterestRate.module.css";
export function FilterTable(){
    return(
        <div className={styles.banksListings}>
            <div className={styles.searchResults}>
                <p className="font14 fontsemiBold textBlack">Search Result: <span>24</span> Banks</p>
                <div className={styles.selct}>
                    <p className={`font12 textBlack fontsemiBold ${styles.opttion}`}>Sort By: <span className="textLink fontMedium"> High to Low</span>  <img src="/assets/images/arrow.svg" alt="Urban Money"/></p>
                    <div className={styles.drpDown}>
                        <ul>
                            <li>High to Low</li>
                            <li>High to Low</li>
                            <li>High to Low</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={`${styles.filterClose} mb10`}>
                <ul>
                    <li>
                        <p className="textLink font10">Axis Bank</p>
                        <img src="/assets/images/bluecross.svg" alt="Urban Money"/>
                    </li>
                    <li>
                        <p className="textLink font10">Axis Bank</p>
                        <img src="/assets/images/bluecross.svg" alt="Urban Money"/>
                    </li>
                    <li>
                        <p className="textLink font10">Axis Bank</p>
                        <img src="/assets/images/bluecross.svg" alt="Urban Money"/>
                    </li>
                </ul>
            </div>
            <div className={styles.planetable}>
                <div className={styles.tblWrap}>
                    <table className="planTable mb50" cellPadding="0" cellSpacing="0">
                        <thead>
                            <tr>
                                <th>
                                    <p className="font12 textBlack fontsemiBold"> Banks</p>
                                </th>
                                <th>
                                    <p className="font12 textBlack fontsemiBold"> General Public</p>
                                </th>
                                <th>
                                    <p className="font12 textBlack fontsemiBold"> Senior Citizen</p>
                                </th>
                                <th>
                                    <p className="font12 textBlack fontsemiBold"> Tenure</p>
                                </th>
                                <th>
                                    <p className="font12 textBlack fontsemiBold"> Category</p>
                                </th>
                                <th>

                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold"> State Bank of India</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">1-5 years</p>
                                </td>
                                <td>
                                    <button className="btn btn-primary font12">Know More</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold"> State Bank of India</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">1-5 years</p>
                                </td>
                                <td>
                                    <button className="btn btn-primary font12">Know More</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold"> State Bank of India</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">1-5 years</p>
                                </td>
                                <td>
                                    <button className="btn btn-primary font12">Know More</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold"> State Bank of India</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">1-5 years</p>
                                </td>
                                <td>
                                    <button className="btn btn-primary font12">Know More</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold"> State Bank of India</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">7.1% - 10.8%</p>
                                </td>
                                <td>
                        
                                    <p className="font14 textBlack fontsemiBold ">1-5 years</p>
                                </td>
                                <td>
                                    <button className="btn btn-primary font12">Know More</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className={styles.pagination}>
                <button type="button" className={styles.previous}>
                  <img src="/assets/images/leftpaginationarw.svg" alt="arrow" className="img-responsive"/>
                </button>
                <ul>
                  <li className={styles.active}>1</li>
                  <li>2</li>
                  <li>3</li>
                  <li>4</li>
                  <li>5</li>
                  <li>...</li>
                  <li>50</li>
                </ul>
                <button type="button" className={styles.next}>
                  <img src="/assets/images/rightpaginationarw.svg" alt="arrow" className="img-responsive"/>
                </button>
              </div>
        </div>
    )
}