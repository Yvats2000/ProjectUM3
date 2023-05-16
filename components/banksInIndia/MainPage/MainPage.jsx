import styles from "./MainPage.module.css";
import {BreadCrumb} from "../../shared/BreadCrumb/BreadCrumb"
import Image from "next/image";
import {NavLink} from '../../ui';
export function MainPage({data}) {
  if (!data || data.length == 0)
  return null;
    const breadCrumbLinks = [
      {   
        "text": "Banks In India",
        "path": "/banks-in-india", 
        "class": ""
      }
    ]
   return (
   <>
   <div className="container">
      <div className="breadCrumb">
      <BreadCrumb links={breadCrumbLinks} />
      </div>
    </div>
    <section className={styles.bankLoanDetail}>
      <div className="container">
        <h1 className="font24 mb40 text2828 bottomborderf5a623 Innerheading fontMedium lineHeight36 minHeight72">
          Banks and Financial Institutions in India
        </h1>
        <div className={styles.bankText}>
        <p>Urban Money  has partnered with various different banks and financial institutions to provide hassle free loans to its customers all over the country. Loans are one of the most important financial tools available that a person can use to meet all kinds of requirements. We at Urban Money utilise our extensive network and collective experience to bring you the perfect loan product in the shortest possible turnaround time. We offer a wide range of loan products like personal loans, home loans, loans against property, etc from numerous banks across the country. We have a detailed database of banks and their information, which makes it very easy to choose a product that fits your needs.</p>
        </div>
      </div>
    </section>
    <section className={styles.bankInIndia}>
    {Object.entries(data).map((banksArr , index) =>
      <div className="container" key={index}>
        <h2 className="font18 text181d lineHeight26 fontsemiBold mb20">{banksArr[0]}</h2>
        <ul className={`${styles.bankList} mb30`}>
        {banksArr[1].map((bank,index)=>
         
          <li key={index}>
            <NavLink href={`${process.env.BASE_URL}/banks-in-india/${bank.lenderSlug}`}  >
              <figure>
              <Image src={process.env.IMAGE_BASEURL + '/banklogo/' + bank.lenderLogo} width={167} height={75} alt={bank.lenderName} className="imgResponsive" />
              </figure>
              
            </NavLink>
          </li>
          
        )}
        </ul>
        </div> )}
       </section>
       <section className="content">
      <div className="container">
          <div className={styles.eligible }>
            <h2 className="mb15">How Does the Indian Banking Sector Work?</h2>
             <p>The banking sector is the backbone of the Indian economy. The Reserve Bank of India is the central banking authority that regulates and implements banking regulations and government monetary policies in the country. The banking sector in the country works in accordance with the rules and regulations laid down by RBI.</p>

             <p>The banks in the country play a crucial role in the collection of deposits and disbursing credit facilities to the numerous sectors of the economy. A bank’s core function is to mobilise deposits and lend money to  businesses and individuals, invest in securities and equity options for returns, and disburse payments. The banking sector in the country can be classified into two different types as given below:</p>
             <ul className="oList blueList listSpanbold mb20">
               <li><span>Organised Banking Sector:</span> The financial entities in the organised banking sector are regulated by the central banking authority of the country. The organised sector is then further bifurcated into banking and non-banking financial institutions. Given below are some of the organisations that fall in the scope of the organised banking sector:
                 <ul className="oList blueList listSpanbold mb20">
                   <li>National Housing Bank</li>
                   <li>Export-Import Bank of India</li>
                   <li>National Bank for Agriculture and Rural Development</li>
                   <li>Small Industries Development Bank of India</li>
                </ul>
               </li>
               <li><span>Unorganised Banking Sector:</span> The Indian unorganised banking sector is composed of the many indigenious banks that do not fall under the scope of central banking authorities. Such bankers include organisations or individuals that collect deposits or rely on the credit for the normal functioning of their business. They mostly deal with short-term credit products in order to provide financial support to businesses and individuals. Generally, the interest rates linked with these credit products vary according to the amount and tenure. These banks are the primary sources of capital for small borrowers owing to its relatively simple documentation and the availability of funds.</li>
             </ul>
             <h2 className="mb15">Banking System Categories in India</h2>
             <p>The banking system in the country can be broadly divided into the below categories:</p>
             <ul className="oList blueList listSpanbold mb20">
               <li><span>Commercial Banks:</span> Commercial banks are the most important component of the profit generating model of the Indian banking system. They collect deposits from the general public and use the money to lend credit instruments to consumers, traders, farmers, and business organisations.</li>
               <li><span>Development Banks:</span> They are banking organisations that specialise in supplying long-term financial solutions to medium and large sized organisations. Further, they also carry out various promotional activities to increase the rate at which capital is generated in the country. These banking institutions are crucial for the economic and industrial development of the country.</li>
               <li><span>Co-operative Banks:</span> The co-operative banking institutions are responsible for lending credit to the main agricultural credit societies at lower than normal interest rates.</li>
               <li><span>Land Development Banks:</span> These banks are mainly meant for funding the agricultural sector by providing long-term credit instruments for obtaining new land or for the development of the land.</li>
               <li><span>Investment Banks:</span> An investment bank acts as an intermediary for a corporate entity that wants to issue new debt securities or equity options. Most of the time, investment is made in such companies via the purchase of equity options.</li>
               <li><span>Merchant Banks:</span> A merchant bank is an organisation that aids a company to sell its new stock options in the share market in order to raise capital for the company.</li>
               <li><span>Foreign Banks:</span> As the name would suggest, these organisations are non-Indian banks. Such a bank is bound by the rules and regulations of both India and their home country. As it stands, there are 45 such banks functioning in the country.</li>
               <li><span>Central Banks:</span> These are the banks that are controlled by the central regulatory authority of the country, RBI.</li>
             </ul>
             <h2 className="mb15">Main Functions of Banks in India</h2>
             <p>Some of the major functions of banking organisations in India are as follows:</p>
             <ul className="oList blueList listSpanbold mb20">
               <li>Accepting customer deposits.</li>
               <li>Lending advances and loans.</li>
               <li>Funds transfer.</li>
               <li>Issuing drafts/notes.</li>
               <li>Deposit of credits.</li>
               <li>Foreign exchange.</li>
             </ul>
             <p>Let’s take a look at some of the functions in detail:</p>
             <h2 className="mb15">Accepting Customer Deposits</h2>
             <p>The banks in India accept deposits made by customers in their savings, current, or fixed deposits account. Banks also pay out interest to their customers on such deposits made to their savings account. A current account is a type of account that can be operated multiple times during the day. On the other hand, FD accounts hold deposits for longer periods and pay higher interest rates.</p>
             <h2 className="mb15">Lending Advances and Loans</h2>
             <p>The banks in India provide the service of providing loans to people who are in need of funds to meet their financial requirements. Loans are also sanctioned to businessmen, industrialists, and agriculturalists who wish to make investments in their ventures to further their profits and contribute to the economic development of the country.</p>
             <h2 className="mb15">Issuing Drafts and Notes</h2>
             <p>Indian banks are also responsible for issuing affordable forms of funds transfer in the form of demand drafts, credit notes, cheques, etc. Further, the central banking authority of the country is also responsible for issuing banknotes and coins. These instruments help in economising the use of metallic money to make the transfer of funds affordable and hassle free.</p>
             <h2 className="mb15">Credit Deposits</h2>
             <p>The banking organisations in India also create credit deposits by providing loans and advances to its customers. In such situations, the customer receives the withdrawable amount when needed. The customers more often than not deposit the amount in the same bank, in accordance with the banks demands or to take advantage of the benefits of current accounts. These deposits are also known as credit deposits.</p>
             <h2 className="mb15">Loans Offered by Urban Money</h2>
             <p>Urban money offers four different types of loan products:</p>
             <ul className="oList blueList listSpanbold mb20">
               <li><span>Home Loan:</span> Home loans are end use specific monitored loans that are meant for people who want to meet the financial needs to purchase a residential property. These loans are secure in nature, and the concerned property becomes the collateral for the loan.</li>
               <li><span>Business Loan:</span> Business loans can be both secure and unsecured in nature. These loans are usually availed by MSMEs and other business organisations to meet their working capital needs.</li>
               <li><span>Loan Against Property:</span> The banks in India allow their customers to leverage their commercial and residential properties to obtain loans against their value. Such loans can be used for the personal needs of the proprietor or any other business development need. This loan is secure in nature and the property in question is considered to be the guarantee for the loan.</li>
             </ul>
             <h2 className="mb15">Tips for Obtaining Loans in India</h2>
             <p>Given below are some of the important tips that you should keep in kind to obtain the best loan offers in India:</p>
             <ul className="oList blueList listSpanbold mb20">
               <li><span>Maintain a Healthy Credit Score:</span> A healthy credit score is one of the most important factors that gauge the borrower’s ability to repay a loan. Simple acts such as making timely repayments and avoiding defaults help greatly in maintaining a good credit history. Further, not exceeding your credit limit by more than 30% also helps in maintaining a healthy credit report.</li>
               <li><span>Calculate Your EMIs:</span> You should always calculate your EMIs before applying for a loan so that they do not add to the repayment burden and become a drain on your finances. Generally speaking, banks evaluate your EMIs on the basis of 10% of your monthly income. In case EMIs are higher, you run the risk of creating defaults and negatively affecting your credit score.</li>
               <li><span>Choose Loans with Low Interest Rates:</span> Personal loans usually have a high interest rate that can range from 11% to 20%. Therefore, even the smallest decrease in rate of interest can cause a huge change in the final repayment amount. Please note that if you choose loans with lower EMIs and longer tenures, they will generally have higher interest rates.</li>
               <li><span>Assess your Need for the Loan:</span> While availing a loan to meet your expenses is not a negative thing, it is imperative that you assess the motivation behind applying for the loan. If you are obtaining a loan to satisfy your whims and fancies to buy a luxury product, it might not be the best decision. Further, obtaining a loan for investment purposes in order to make profits is also a very high risk move. You should always be cautious of high risk needs, because regardless of profit or loss, you are expected to repay the amount.</li>
               <li><span>Choose a Credible Financial Institution:</span> In addition to the traditional banking organisations, you should also consider loan options from digital lenders that have been approved by the central banking authority. Online lenders are usually quicker in processing and disbursing the loans. It is important to have multiple options to choose from as it allows the consumer to compare interest rates and other features.</li>
             </ul>
        </div>
      </div>
    </section>
   </>
  );
}
