import { NavLink } from "../../ui"
import styles from "./SideBar.module.css";
import { useRouter } from 'next/router'
export const SideBar = ({userCardList}) => {
  const router = useRouter();
  return (
      <>
        <div className={styles.creditReportTabsection}>
        {/* <div className={`${styles.creditTab} mb15`}>
          <NavLink href='/credit-score/report'>
            <button className="text454ec2 font14 btn bnt100">
              <img src="/assets/images/credit-reportmeter.svg" alt="" />
              Credit Report <em className="icon-angle-right fontMedium emauto"></em>
            </button>
          </NavLink>
          
          <ul>
            <li>- Factors</li>
            <li>- Account Details</li>
            <li>- Personal Details</li>
          </ul>
        </div> */}
        <ul className={styles.mainTab}>
          <NavLink href={`${process.env.BASE_URL}/credit-score/report`}><li className={router.asPath === '/credit-score/report' ? styles.active : ''}><em className="icon-report1"></em> {process.env.CREDIT_SCORE_VENDOR === '2' ?'Credit':process.env.CREDIT_SCORE_VENDOR === '3'?'CIBIL':null} Report</li></NavLink>
          <NavLink href={`${process.env.BASE_URL}/my-profile`}><li className={router.asPath === '/my-profile' ? styles.active : ''}><em className="icon-my-profile"></em> My Profile</li></NavLink>
          {userCardList && userCardList.length> 0 &&  <NavLink href={`${process.env.BASE_URL}/my-credit-cards`}><li className={router.asPath === '/my-credit-cards' ? styles.active : ''}><em><svg width="17" height="16" viewBox="0 0 17 16" xmlns="http://www.w3.org/2000/svg">
            <g fillRule="nonzero">
                <path d="M15.725 14.835H8.278l7.277-7.276a1.57 1.57 0 0 0 0-2.221L10.663.446a1.607 1.607 0 0 0-2.222 0L.753 8.133a1.57 1.57 0 0 0 0 2.221L1.8 11.402l.001.001.002.001 3.43 3.431H.583a.582.582 0 0 0 0 1.165h15.142a.582.582 0 0 0 0-1.165zM14.85 6.45c0 .107-.043.21-.119.286l-7.688 7.688a.415.415 0 0 1-.574 0l-3.432-3.432 8.262-8.262 3.432 3.432c.077.076.12.18.119.288zM1.458 9.244c0-.108.042-.211.119-.287l7.688-7.688a.406.406 0 0 1 .574 0l.636.636-8.262 8.263-.636-.637a.403.403 0 0 1-.12-.287z"/>
                <path d="M8.616 9.473 6.577 11.51a.582.582 0 1 0 .824.824l2.038-2.039a.582.582 0 0 0-.823-.823z"/>
            </g>
            </svg></em> My Credit Cards</li></NavLink>}
          {/* <li><img src="/assets/images/offers.svg" alt="" /> Offers</li> */}
          {/* <li><img src="/assets/images/fa-qs.svg" alt="" />FAQs</li> */}
          {/* <li><img src="/assets/images/contact-us.svg" alt="" />Contact Us</li> */}
          {/* <li>
            <img src="/assets/images/credit-health.svg" alt="" />Credit Health
          </li> */}
        </ul>
      </div>
      </>
  )
}
