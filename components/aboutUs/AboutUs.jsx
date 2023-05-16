import styles from "./AboutUs.module.css";
import { BreadCrumb } from "../shared";
import Image from "next/image";

export function AboutUs() {
     const breadCrumbLinks = [
          {
            "text": "About Us",
            "path": "/about-us",
            "class": ""
          }
     ]
  return (          
     <div className={styles.aboutUs}>
            <div className={styles.banner}>
                 <figure className={styles.bannerImage}>
                      <img src="/assets/images/about-banner.png" alt="bannerTop" className="imgResponsive" width={'100%'} height={ '330'}/>
                 </figure>
                 <div className={`container ${styles.aboutTagline}`}>
                      <h1 className="font28 mb30 textWhite Innerheading fontMedium lineHeight36">About Us</h1>
                      <p className={styles.subText}>We Started With</p>
                    <p className={styles.tollFree}>An Inspiration, And Now<br/>We Inspire.</p>
               </div> 
          </div>
          <div className="container">
               <BreadCrumb links={breadCrumbLinks} />
          </div>
          <div className="container">
               <div className={styles.contentBoxx}>
                    <div className={styles.row}>
                         <div className={styles.aboutUs}>
                              <h2 className="font30 lineHeight36 fontMedium">About Urban Money</h2>
                              <div className={styles.justify}>
                                   <p className="mb15">Urban Money is a leading online lender that has helped millions of people to achieve their dream of being homeowners. We’ve brought about a revolution in the industry ever since our inception in 2015 by offering custom fit loan products from a range of banks and NBFCs. We specialize in providing end-to-end support in the lending lifecycle, including assisting in choosing the product that fits your needs, hassle-free documentation, legal and insurance consulting, and disbursal. </p>
                                   <p className="mb15">The philosophy behind Urban Money is simple: make the complex lending process simpler for the consumer by leveraging innovative technology and through our highly skilled team members. We utilize our state-of-the-art technology to accurately determine the applicant’s loan eligibility which are linked to the credit bureau, provide loan products, and seamlessly integrate with the loan origination system.</p>                              
                                   <p className="mb15">Our platform is the simplest and most convenient way you can meet your financing needs. We believe in ensuring a customer experience that is tailor-made for each client. We provide an integrated customer experience that offers a number of products like home loans, personal loans, business loans, insurance, loan against property, working capital, etc. </p>
                                   <p>Urban Money has established a strong presence in the industry owing to its trust and credibility, transparency, paperless process, and ability to provide quick and easy loans. With vast experience and a track record of excellence, we are a team of extremely talented professionals dedicated to providing a hassle-free lending experience.</p>
                              </div>
                         </div>
                         <div className={styles.aboutUsTile}>
                              <ul className={styles.overView}>
                                   <li>
                                        <div className={styles.box}><strong>Offering Products</strong>
                                             <p>From Over 95 Banks and NBFCs</p>
                                        </div>
                                   </li>
                                   <li>
                                        <div className={styles.box}><strong>1,50,000</strong>
                                             <p>Channel Partners</p>
                                        </div>
                                   </li>
                                   <li>
                                        <div className={styles.box}><strong>USD300M+</strong>
                                             <p>Annual Transaction Value</p>
                                        </div>
                                   </li>
                                   <li>
                                        <div className={styles.box}><strong>#1</strong>
                                             <p>Secured Mortgages Provider</p>
                                        </div>
                                   </li>
                              </ul>
                         </div>
                    </div>
               </div>
               <div className={styles.contentBoxx}>
                    <div className={styles.groupBrands}>
                         <h2 className="font30 lineHeight36 fontMedium">Our Group Brands</h2>
                         <div className={styles.mainBox}>
                              <div className={styles.brandBox}>
                                   <picture>
                                        <Image className={`imgResponsive ${styles.img}`} src={'/assets/images/aboutus-logo/logo-hi-res.png'} width = {110} height = {40} alt="Square Yards" />
                                        
                                   </picture>
                                   <strong>Square Yards</strong>
                                   <p>Square Yards is the fastest growing Proptech aggregator platform for the global real estate market. It offers a diversified global real estate portfolio through innovative technology, research, and data. Square Yards has established a significant presence in the real estate market by offering a truly seamless integrated customer experience that truly covers full scope of the real estate journey from discovery to post sale service.</p>
                              </div>
                              <div className= {styles.brandBox}>
                                   <picture>
                                        
                                        <Image className={`imgResponsive ${styles.img}`} src={process.env.IMAGE_BASEURL + '/images/aboutus-logo/logoConnectplues.png'} width = {110} height = {40} alt="Square Connect" />
                                   </picture>
                                   <strong>Square Connect</strong>
                                   <p>Square Connect is the country’s leading digital platform for real estate brokers, online real estate firms, and financial institutions. Since 2015, Square Connect has established a reputation in the market by providing insights from realtors and enhancing the business awareness. Over 100,000 people have trusted the platform and over 5,000 realtors actively use the network everyday.</p>
                              </div>
                              <div className= {styles.brandBox}>
                                   <picture>
                                        <Image className={`imgResponsive ${styles.img}`} src={process.env.IMAGE_BASEURL + '/images/aboutus-logo/azurologoBlack.png'} width = {110} height = {40} alt="Azuro" />
                                        
                                   </picture>
                                   <strong>Azuro</strong>
                                   <p>Azuro is India’s largest property management firm which provides end-to-end customer solutions. It takes care of all the aspects of property management like matching potential tenants, background checks, rent collection, maintenance, and inspection upon tenant’s exit. Widely preferred by customers owing to its brilliant service and professionalism, Azuro has become the household name in property management in India as well as overseas.</p>
                              </div>
                              <div className= {styles.brandBox}>
                                   <picture>
                                        
                                        <Image className={`imgResponsive ${styles.img}`} src={process.env.IMAGE_BASEURL + '/images/aboutus-logo/propsAMC.png'} width = {150} height = {50} alt="PropsAMC" />
                                   </picture>
                                   <strong>PropsAMC</strong>
                                   <p>PropsAMC is dedicated to revolutionizing the way people manage and deal with real estate transactions. It helps the customer take a more compiled and well-informed decision by providing integrated and organized real estate data. With PropsAMC, you can get access to superior data, save time, or increase your return on investment. It enables you to market, monitor, and manage your real estate portfolio on a single integrated platform.</p>
                              </div>
                              <div className= {styles.brandBox}>
                                   <picture>
                                        <Image className={`imgResponsive ${styles.img}`} src={process.env.IMAGE_BASEURL + '/images/aboutus-logo/Interior.png'} width = {110} height = {40} alt="Interior Company" />
                                        
                                   </picture>
                                   <strong>Interior Company</strong>
                                   <p>Interior Company has established itself in the industry by offering turn-key interior design solutions according to the client’s budget. It functions with the aim of transforming the interior design industry by making luxury home interior designs available to everyone at an affordable price. Stringent quality checks at every step, timely delivery assurance, and an enhanced 10 years limited warranty has made Interior Company the household name in luxury interior design.</p>
                              </div>
                              <div className= {styles.brandBox}>
                                   <picture>
                                        
                                        <Image className={`imgResponsive ${styles.img}`} src={process.env.IMAGE_BASEURL + '/images/aboutus-logo/PropVR.png'}  width = {70} height = {50} alt="PropVR" />
                                   </picture>
                                   <strong>PropVR</strong>
                                   <p>PropVR is continually disrupting industry norms and revolutionizing real estate visualization through innovative 3D technology. They provide an immersive 3D virtual reality experience that works on mobile, computers, and VR headsets. With customers now looking for more ways to explore and experience products digitally, PropVR with its 5 digital patents has emerged as the forerunner in this industry. It continues to redefine the digital real estate experience through 3D visualizations, remote showcasing, and digital transactions.</p>
                              </div>
                         </div>
                    </div>
               </div>
          </div>
     </div>
);
}
