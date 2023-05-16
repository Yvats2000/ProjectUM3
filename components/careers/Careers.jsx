import styles from "./Careers.module.css";
import Image from "next/image";
import { BreadCrumb } from "../shared";


export function Careers() {
  const breadCrumbLinks = [
    {
      "text": "Careers",
      "path": "/careers",
      "class": ""
    }
  ]
  return (
    <div className= {styles.career}>
      <div className= {styles.banner}>
        <picture className="desktop">
          <img className="imgResponsive widhtSmall" src={'/assets/images/career-banner.webp'}alt="Career Banner"/> 
        </picture>
      </div>
      <div className="container">
        <BreadCrumb links={breadCrumbLinks} />
        <div className={styles.topSection}>
          <div className={styles.contentBoxx}>
            <h1>Meet Our Team</h1>
            <p>We have a team of diligent professionals with a strong sense of motivation, who architect our success at every step of our journey.</p>
            <p>Their positive spirit is driven by an intense sense of belongingness and nurtured by a transparent and open environment. Since people are at the heart of our core business, we encourage our people to be emotionally driven with their approach towards creating products and solving problems.</p>
            <p>At Square Yards we strive to go beyond the status quo and find the tipping point for a constant and consistent evolutionary process. </p>
          </div>
          <div className={styles.videoSection}>
            <video width="560" height="315" controls>
              <source src="https://static-site-data.s3-ap-southeast-1.amazonaws.com/videos/Life_at_SquareYards.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
        <div className={`${styles.topSection} ${styles.right}`}>
          <div className= {styles.contentBoxx}>
            <h2>Life at Urban Money</h2>
            <p>At Urban Money, supporting our employees is a core part of how we do business. We believe in a wholesome individual and team balance and thus emphasize absolute autonomy at all levels, along with celebrating the process of achieving individual and group goals.</p>
            <p>We are proud of our supportive and inclusive culture that nurtures the creative side of our employees. We thus encourage indulgence in de-stressing and rejuvenating activities at work. </p>
          </div>
          <div className={styles.contentBoxx}>
            <div className={styles.videoSection}> 
              <iframe width="560" height="315" src="https://www.youtube.com/embed/eihdQThFx_g" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
            </div>
          </div>
        </div>
        <div className={styles.contentBoxx}>
          <h2 className={styles.alignCenter}>Our Ethos</h2>
          <p className={`${styles.pad} ${styles.alignCenter}`}>At Square Yards, our goal is to turn transactions into life changing experiences. We thus strive to constantly better ourselves through self-reflection and keep our ethos as the foundation of our conduct</p>
          <div className={styles.ethos}>
            <div className={styles.ethosGrid}>
              <div className={styles.box}>
              <figure><Image src={process.env.IMAGE_BASEURL + '/images/Group 2808.png'} width={64} height={64} alt="Intrgrity" className="imgResponsive"  /></figure>
                <div className={styles.content}>
                  <strong>INTEGRITY</strong>
                  <p>Integrity is doing the right thing,
                  even when no one is watching.</p>
                </div>
              </div>
              <div className= {styles.box}>
                <figure><Image src={process.env.IMAGE_BASEURL + '/images/Group 2809.png'} width={68} height={65} alt="Team Work"  className="imgResponsive"  /></figure>
                <div className={styles.content}> <strong>TEAM WORK</strong>
                  <p>Team work results in success or disaster. We love success. We abhor disaster.</p>
                </div>
              </div>
              <div className={styles.box}>
                <figure><Image src={process.env.IMAGE_BASEURL + '/images/Group 2810.png'} width={67} height={68} alt="Transparency" className="imgResponsive"   /></figure>
                <div className={styles.content}><strong>TRANSPARENCY</strong>
                  <p>Be transparent. Be clear.<br />
                    Be happy</p>
                </div>
              </div>          
              <div className={styles.box}>
                <figure><Image src={process.env.IMAGE_BASEURL + '/images/Group 2811.png'} width={60} height={60} alt="Innovativeness" className="imgResponsive" /></figure>
                <div className= {styles.content}><strong>INNOVATIVENESS</strong>
                  <p>Dare to think. Believe in it.<br />
                    Execute it</p>
                </div>
              </div>
              <div className={styles.box}>
                <figure><Image src={process.env.IMAGE_BASEURL + '/images/Group 2812.png'} width={67} height={68} alt="User Centric" className="imgResponsive"  /></figure>
                <div className={styles.content}> <strong>USER CENTRIC</strong>
                  <p>As the cliché goes, ‘Customer is 
                    the King’. Well, honestly he is and
                    will remain so forever and ever.</p>
                </div>
              </div>
              <div className={styles.box}>
                <figure><Image src={process.env.IMAGE_BASEURL + '/images/Group 2813.png'} width={67} height={68}  className="imgResponsive" alt="Dynamic" /></figure>
                <div className={styles.content}> <strong>DYNAMIC</strong>
                  <p>Life is dynamic. So be alive.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.benefitsBoxx}>
        <div className="container">
          <div className={styles.heading}>Benefits And Perks</div>
          <p>We are of a strong opinion that our employees are the architects of our success and growth. We thus leave no stone unturned to extend our gratitude and appreciation to them.</p>
          <ul>
            <li> 
              <figure><Image src={process.env.IMAGE_BASEURL + '/images/Trophy-Victory-Champion-Esport-Money.png'} width={46} height={46} alt="Highly Competitive Compensation" /></figure>
              <div className={styles.textBox}>Highly Competitive<br />
                Compensation</div>
            </li>
            <li> 
            <figure><Image src= {process.env.IMAGE_BASEURL + '/images/goal.png'} width={45} height={50} alt="Supersonic Growth"  /></figure>
              <div className={styles.textBox}>Supersonic<br />
                Growth</div>
            </li>
            <li> 
            <figure><Image src= {process.env.IMAGE_BASEURL + '/images/cash(2).png'} width={45} height={45} alt="Best Incentive Structure" /></figure>
              <div className={styles.textBox}>Best Incentive<br />
                Structure</div>
            </li>
            <li> 
            <figure><Image src= {process.env.IMAGE_BASEURL + '/images/money(6).png'} width={42} height={45} alt="Bi-Annual Appraisals  for Sales" /></figure>
              <div className={styles.textBox}>Bi-Annual Appraisals<br />
                for Sales</div>
            </li>
            <li> 
            <figure><Image src= {process.env.IMAGE_BASEURL + '/images/star (1).png'} width={46} height={45} alt="Global Movement Opportunities"  /></figure>
              <div className={styles.textBox}>Global Movement<br />
                Opportunities</div>
            </li>
            <li> 
            <figure><Image src= {process.env.IMAGE_BASEURL + '/images/news-report.png'} width={42} height={42} alt="Employee Stock & options"/> </figure>
              <div className={styles.textBox}>Employee Stock<br />
                Options</div>
            </li>
            <li> 
            <figure><Image src= {process.env.IMAGE_BASEURL + '/images/healthcare-covid19-coronavirus-hand-hearth.png'} width={48} height={48} alt="Healthcare & Insurance" /></figure>
              <div className={styles.textBox}>Healthcare &<br />
                Insurance</div>
            </li>
            <li> 
            <figure><Image src= {process.env.IMAGE_BASEURL + '/images/confetti.png'} width={49} height={48} alt="Fun, Dynamic Environment" />  </figure>
              <div className={styles.textBox}>Fun, Dynamic<br />
                Environment</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
