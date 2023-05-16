import styles from "./bankAmcDetails.module.css";
import moment from 'moment/moment';
export const KeyInformation = ({data}) => {
    return(
        <section className={styles.section}>
            <div className="container">
                <h2 className="font24 fontSm20 fontsemiBold textBlack mb25">Key Information about {data && data.mutualFundName || '-'}</h2>
                <div className={styles.tableResponsive}>
                    <table className={`${styles.table} ${styles.tableBordered} ${styles.tableStriped}`}>
                        <tr>
                            <td>Mutual Fund Name</td>
                            <td>{data && data.mutualFundName || '-'}</td>
                        </tr>
                        <tr>
                            <td>Office</td>
                            <td>{data && data.office || '-'}<br/>
                            </td>
                        </tr>
                        <tr>
                            <td>Email Id</td>
                            <td>{data && data.emailId || '-'}</td>
                        </tr>
                        <tr>
                            <td>Phone No.</td>
                            <td>{data && data.phoneNo || '-'}</td>
                        </tr>
                        <tr>
                            <td>Fax</td>
                            <td>{data && data.fax || '-'}</td>
                        </tr>
                        <tr>
                            <td>Website</td>
                            <td><a className="textLink" href={`https://${data && data.website || '-'}`} target="_blank" rel="noopener noreferrer nofollow external">{data && data.website || '-'}</a></td>
                        </tr>
                        <tr>
                            <td>Set up date</td>
                            <td>{moment(data && data.setUpDate).format('MMM DD, YYYY') || '-'}</td>
                        </tr>
                        <tr>
                            <td>Mutual Fund Type</td>
                            <td>{data && data.mutualFundType || '-'}</td>
                        </tr>
                        <tr>
                            <td>AMC incorporation Date</td>
                            <td>{moment(data && data.amcIncorporationDate).format('MMM DD, YYYY') || '-'}</td>
                        </tr>
                        <tr>
                            <td>City</td>
                            <td>{data && data.city}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </section>
    )
}