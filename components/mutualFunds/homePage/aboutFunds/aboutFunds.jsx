import { useState } from 'react'
import styles from './aboutFunds.module.css'
export const AboutFunds = () => {
  const [readMore, setReadMore] = useState(false);
  return (
    <section className={styles.content}>
      <div className="container">
        <div className={styles.contents}>
          {/* <figure className="rightdoodel"><img className="imgResponsive" src="./assets/images/right-ill.svg" alt="" srcSet=""></figure>  */}
          <h2 className="font24 fontsemiBold textBlack mb30">Know More About Mutual Funds</h2>
          <p className="font14 lineHeight24 text444  mb15">A mutual fund is a collective investment instrument that stockpiles and pools funds from an array of investors.</p>
          <p className="font14 lineHeight24 text444  mb15">Furthermore, the accumulated funds are invested in equities, government securities, several money market instruments and bonds.</p>
          <p className="font14 lineHeight24 text444  mb15">Mutual funds are not limited to any specific investment option as the money is invested in many securities. The investment performance is tracked by considering the change in the funds total market cap. This change in fund value is derived from the performance of the correlated investments.</p>
          <p className="font14 lineHeight24 text444  mb45">This investment instrument is not limited to experienced investors, as small and individual investors get an equal chance to manage their portfolios professionally. As a result, each fund shareholder somewhat participates in the overall profit and loss associated with the funds. In simple words, a mutual fund is a collective money pool in which several investors contribute to generating returns. The entire pool of funds is managed by dedicated, experienced, professional fund managers.</p>
          <h2 className="font24 fontsemiBold textBlack mb30">How Do Mutual Funds Work?</h2>
          <p className="font14 lineHeight24 text444  mb15">You need to understand that a mutual fund is both a real company and an investment before we can explain how it operates. Due to its dual nature, it may seem unusual to some people, but it is exactly like a share of Apple Inc.s stock, AAPL.</p>
          <p className="font14 lineHeight24 text444  mb15">Similarly, a mutual fund investor purchases a portion of the assets and the mutual fund business. The distinction between the two is that a mutual fund corporation engages in the business of making investments, whereas Apple produces novel products and tablets.</p>
          <p className="font14 lineHeight24 text444  mb15">Investors in mutual funds typically receive three types of returns:</p>
          <p className="font14 lineHeight24 text444  mb15">1. Income in mutual funds comes from dividends on stocks and interest on bonds kept in the funds portfolio. Most of a funds annual income is distributed to fund shareholders.</p>
          <p className="font14 lineHeight24 text444  mb15">2. Investors in funds frequently have the option of reinvesting their earnings in the form of further shares or receiving a check for distribution.</p>
          <p className="font14 lineHeight24 text444  mb15">3. The fund will experience a capital gain if it sells securities at a higher price. The majority of funds distribute these gains to investors as well.</p>
          <p className="font14 lineHeight24 text444  mb45">4. The price of the funds share will rise if the holdings price rises and the fund manager doesnt sell it. Then, you can profitably sell your mutual fund shares on the open market.</p>
          
          <div className={`${styles.showMore} ${readMore && styles.active}`}>
          <h2 className="font24 fontsemiBold textBlack mb30">Types of Mutual Funds in India</h2>
          <p className="font14 lineHeight24 text444  mb15">Mutual funds are classified based on four major categories, i.e. Asset Class, Investment Goals, Structure and Risk. Based on this classification, you get the following types of mutual funds to invest in.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Based on Asset Class</h3>
          <p className="font14 lineHeight24 text444  mb15">As per the asset class, the mutual funds to invest are further classified into Equity Funds, Debt Funds, Money Market Funds, and Hybrid Funds: </p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Equity Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Essentially invest a major chunk in stocks, and that is the reason why it is well known as stock funds. The funds pooled from several investors are moved towards stocks of various companies. The overall gains and losses incurred from the investment depend upon the performance of the invested funds in the share market. Additionally,  equity funds can generate notable returns over a period. However, the only pointer you must consider is the risk factor. Equity funds fall in the category of comparatively higher risk bracket.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Debt Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Debt funds predominantly invest the accumulated funds into fixed-income securities, including bonds, bills and securities. The amount is not limited to one instrument and is moved towards several fixed income instruments like Fixed Maturity Plans, Liquid Funds, Short-Term Plans, bonds, in addition to other Monthly Income Plans. The income from debt funds is provided with a fixed interest rate at the time of maturity, i.e. once the investment tenure ends. Thus, it is considered the foremost option for investors looking forward to passive income sources. You can get a regular income by investing in Debt funds. Coming to the risk factor, you can secure huge returns at minimal risk.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Money Market Funds</p>
          <p className="font14 lineHeight24 text444  mb15">On the stock market, investors trade stocks. Similarly, investors invest funds across the money market, commonly referred to as the capital or cash market. As a whole, the government is responsible to manage it via issuing money market assets, including bonds, T-bills or Treasury Bills, dated securities, certificates of deposits, and much more, in collaboration with banks, financial institutions, and other businesses. Your money is invested by the fund manager, who pays out dividends regularly. A short-term strategy (no longer than thirteen months) can significantly reduce the danger of investment in such funds.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Hybrid Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Equipping the gap between equity and debt funds, hybrid funds are an ideal combination of bonds as well as stocks. Either a fixed ratio or variable ratio may be used. In essence, it combines the prominent features of multiple mutual funds by.for instance, allocating 60 percent chunk of the assets to stocks and the remaining 40% within bonds, or vice versa. Hybrid funds are highly suitable for investors who are willing to branch out from lower but consistent income schemes and take on greater risks to benefit from debt plus returns.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Based on Investment Goals</h3>
          <p className="font14 lineHeight24 text444  mb15">These are the best mutual funds to invest in if you are looking forward to meeting your short or long-term investment goals. You get numerous options to choose from including, Growth funds, Income funds, Liquid Funds, and much more.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Growth Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Growing funds typically spend a sizable amount on shares and growth industries, making them a good choice for investors (mainly Millennials) who have extra cash to invest in riskier plans (even though they may offer high returns).</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Income Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Income funds are a member of a group of debt mutual funds, which invest in various instruments, including bonds, deposit certificates, and securities. Income funds have gradually given investors higher investment returns compared to the deposits because they are managed by knowledgeable fund managers who maintain the portfolio in step with rate variations without jeopardising the portfolios creditworthiness. They work well for risk-averse traders with two to three years of time.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Liquid Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Liquid funds, which invest in debt instruments and money markets for  91 days of tenure, are classified as debt funds just as income funds. The maximum investment amount is INR 10 lakh. The method used to determine Net Asset Value is a standout feature that sets liquid funds distinct from other debt funds. Unlike other funds, liquid funds NAV is determined for 365 days (counting Sundays), while just business days are taken into account for other funds.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Tax-Saving Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Over the years, ELSS, well known as Equity Linked Savings Schemes, have advanced in terms of popularity among all investors. Along with having a minimum lock-in period of just 3-years, it also provides the advantage of wealth maximisation while enabling you to save taxes. They are significantly known for producing non-taxed investment returns in the region of 14–16% when investment is primarily made towards stock (and associated products). These funds are especially suitable for salaried individuals with a long investment horizon.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Aggressive Growth Funds</p>
          <p className="font14 lineHeight24 text444  mb15">The Aggressive Growth Fund tends to be a little riskier when deciding where to invest and is intended to generate large financial profits. Although subject to market volatility, you get the option of choosing a fund rooted to its beta (a measure of the funds movement relative to the market). For instance, an aggressive growth fund typically displays a higher beta, such as 1.10 or above, if the market displays a beta of 1.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Capital Protection Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Capital Protection Funds accomplish the job despite providing relatively lower investment returns (12% at most) if safeguarding the principle is the top priority. The fund manager splits the money between equity investments and bond or CD investments. Although there is a very minimal chance of suffering a loss, it is advised to remain invested for a minimum time frame of three years to protect your invested funds and the returns are also taxable.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Fixed Maturity Funds</p>
          <p className="font14 lineHeight24 text444  mb15">To benefit from triple indexation and reduce the tax burden, many investors opt to invest closer to the end of the financial/ fiscal year. Fixed Maturity Plans or FMP, invest funds in bonds, securities, money market, etc., give a wonderful possibility if you are uneasy with the debt market trends and associated dangers. FMP operates on a predetermined maturity period that might be anything between one month and five years because it is a close-ended plan inclusive of FDs. To benefit from accrued interest at maturity, the fund manager ensures that the funds are transferred to an investment with a similar term.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Pension Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Most unforeseen events (including medical emergencies or wedding expenses) can be taken care of by setting aside a percentage of incurred income in a pension fund of your choice to accumulate over a lengthy tenure to ensure your financial future especially after retirement. It is not advised to rely only on funds during the golden years because all resources, regardless of size, eventually run out. EPF is one such example, but banks, insurance companies, etc., offer many more attractive programmes.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Based on Structure</h3>
          <p className="font14 lineHeight24 text444  mb15">Additionally, mutual funds are categorised depending on many characteristics (such as risk profile and asset class). The structural division into open-ended, close-ended, and interval funds is rather broad. The distinction is principally made by the ability to buy and sell individual mutual fund units.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Open-Ended Funds</p>
          <p className="font14 lineHeight24 text444  mb15">There are no specific restrictions on open-ended funds, such as a time limit or a cap on the number of units that can be traded. With these funds, investors can exchange funds whenever its convenient and exit when necessary at the current NAV (Net Asset Value). It is the  only explanation for the fluctuation of unit capital with fresh entrants and exits. If an open-ended fund chooses not to continue accepting new investors, it may do so (or fail to manage prominent funds).</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Closed-Ended Funds</p>
          <p className="font14 lineHeight24 text444  mb15">The unit capital for investing in closed-ended funds is predetermined. This means that the fund company is not allowed to sell more units than the pre-agreed number. Some funds also have a New Fund Offer (NFO) period, during which a cutoff date for purchasing units occurs. NFOs have flexible fund managers with any fund size and a predetermined maturity period. To allow investors to leave the schemes, SEBI has recommended that they be given the choice to either repurchase the alternatives or list the funds on trading platforms.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Interval Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Open-ended and closed-ended characteristics can be found in interval funds. These funds are closed the rest of the time and only available for purchase/redemption during predetermined intervals (determined by the fund house). A minimum of two years will pass before any trades are allowed. Investors wishing to save a lump sum for a short-term financial objective, say within the next three to twelve months, should consider these funds.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Based on Risk</h3>
          <p className="font14 lineHeight24 text444  mb15">If you are looking forward to best mutual funds to invest on the basis of risk profile, here’s the list you can count on.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Very Low-Risk Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Because of their low risk, liquid funds, as well as ultra-short-term funds (having an investment time frame ranging between one month to one year), are known to have poor returns (6% at most). Investors select this to achieve the near-term financial objectives and to safeguard their capital through these products.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Low-Risk Funds</p>
          <p className="font14 lineHeight24 text444  mb15">Investors are hesitant with the thought to  put money into riskier assets in the case of rupee depreciation or an unanticipated national crisis. In these circumstances, fund managers advise investing in one or more liquid, ultra-short-term, or arbitrage funds. Returns could range in the bracket of 6 to 8%, although investors are allowed to shift when valuations stabilise.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Medium-risk Funds</p>
          <p className="font14 lineHeight24 text444  mb15">The risk component in this situation is medium since the fund manager splits his investments between stock and debt. The typical returns may range from 9 to 12%, and the NAV is not particularly volatile.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">High-Risk Funds</p>
          <p className="font14 lineHeight24 text444  mb45">These types of mutual funds require active fund management since they are ideal for investors with no risk aversion and who want to earn large earnings in the form of dividends and interest. Since performance reviews are subject to market volatility, they must be conducted regularly. Although most high-risk funds often offer up to 20% returns, you can anticipate 15% returns.</p>
          <h2 className="font24 fontsemiBold textBlack mb30">Mutual Funds - Modes of Investment</h2>
          <p className="font14 lineHeight24 text444  mb15">To enjoy the benefits of the best mutual funds, you must know the availability of investment modes. Earlier mutual fund investment was intimidating, but with the rapid adoption of technology in the finance sector, MF units can be accessed with a few clicks. As per the available resources and your preference, you can choose from several options and start your investment in mutual funds in India.</p>
          <p className="font14 lineHeight24 text444  mb15">Heres the list of modes of mutual funds investment:</p>
          <h2 className="font24 fontsemiBold textBlack mb30">Direct Investment</h2>
          <p className="font14 lineHeight24 text444  mb15">As the same portrays, its a direct investment approach.</p>
          <p className="font14 lineHeight24 text444  mb15">Once you have selected the best mutual fund to invest in, visit the nearest branch of the MF company. Enquiry about the same if you want to get acquainted with thorough knowledge.  Collect the application form for mutual fund investments and submit the duly filled form to the dedicated person. However, you can also download the form from the official website and submit it to the nearby branch to proceed with the procedure. Ensure you go through the fine print before handing the investment cheque to the organisation.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Online Platforms for Mutual Fund Investment</h3>
          <p className="font14 lineHeight24 text444  mb15">When you pin your hopes on an online mode for mutual fund investment, you must ensure that you have a cellphone or laptop with a working internet connection. Numerous platforms can help you determine the right mutual fund for investment hinged on your financial objectives, risk appetite, and several other factors.</p>
          <p className="font14 lineHeight24 text444  mb15">Put forward thorough research and figure out the ideal one for your investment. Such platforms offer a step-by-step procedure inclusive of selection, investment payment, and redemption. You get the opportunity to invest even as a newbie without any assistance.</p>
          <p className="font14 lineHeight24 text444  mb15">All you have to do is prepare the required documents, including a PAN Card, Identity Documents and details of the active bank account that you will link to the mutual fund.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Using a Demat Account</h3>
          <p className="font14 lineHeight24 text444  mb15">Another investment option you can count on is a Demat Account. You can use the existing Demat and bank account to invest in mutual funds. Additionally, you can count on the same to carry out transactions associated with the mutual fund. The key consideration to investing through a Demat account is that your stockbroker must be a registered mutual fund distributor and permit MF investments.</p>
          <p className="font14 lineHeight24 text444  mb15">The process is simple: log in to the Demat account using your credentials and select the mutual fund investment option. Next, you will have to choose the investment plan and complete the process by transferring the investment amount.</p>
          <p className="font14 lineHeight24 text444  mb15">In the next step, choose the fund you want to invest in. Then you need to complete the investment by transferring the amount online.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Mutual Fund Agents</h3>
          <p className="font14 lineHeight24 text444  mb45">When you rely on mutual funds agents to invest, you need to keep patience and at the same time, pay the associated costs. You have to get in touch with an agent and allow them to choose the foremost option for you. Then fill out the requisite form with their guidance and start investing. However, nowadays, you can unlock the agents digital assistance and fill out the form online. It caters to the instant activation of your mutual fund investments. We suggest you be a bit cautious while choosing an agent.</p>
          <h2 className="font24 fontsemiBold textBlack mb30">Why Invest in Mutual Funds?</h2>
          <p className="font14 lineHeight24 text444  mb15">Mutual funds (MF) have a good amount of built-in diversification and are simple to purchase. They rank among the most well-liked investment options for experienced and novice investors.</p>
          <p className="font14 lineHeight24 text444  mb15">Most of the time, MFs are the best choice for investors looking to diversify their portfolios. A mutual fund invests in various securities rather than betting everything on one sector or business to reduce your portfolio risk.</p>
          <p className="font14 lineHeight24 text444  mb15">You dont have to manage everything yourself, unlike stocks. The management of your mutual funds will handle everything. You can benefit from rapid liquidity and tax advantages with mutual funds.</p>
          <p className="font14 lineHeight24 text444  mb45">If you have never invested before, you should start with mutual funds because they carry less risk than stocks.</p>
          <h2 className="font24 fontsemiBold textBlack mb30">Benefits of Investing in Mutual Funds</h2>
          <p className="font14 lineHeight24 text444  mb15">A mutual fund pools funds from several investors and invests in various underlying securities. It is regarded as one of the best wealth-building investing strategies. There is a mutual fund for everyone, regardless of your investing horizon and risk tolerance. Some main advantages of investing in mutual funds in India are listed below.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Begin Investing with a Small Amount</p>
          <p className="font14 lineHeight24 text444  mb15">Mutual funds allow you to start investing with as little as $100 or less. Systematic Investment Plans might help you begin your investment journey even if you dont have a sizable sum of money to invest (SIPs). The investor can invest through a SIP per the economic and market conditions. SIP will provide excellent profits and aid in forming the habit of investing.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">You Dont Need to Manage Everything Yourself</p>
          <p className="font14 lineHeight24 text444  mb15">You dont have to manage mutual funds on your own, unlike stocks. Your portfolio will be managed by mutual fund managers, who will also evaluate the market performance of various securities to determine whether to buy or sell them. You just need to enter the investment amount; nothing else is required.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Instant Liquidity</p>
          <p className="font14 lineHeight24 text444  mb15">The fact that you can easily redeem the units whenever you want is one of the biggest advantages of mutual funds. You can withdraw your investment if something goes wrong, such as an underperforming mutual fund or an unanticipated financial disaster. Depending on the type of mutual fund, you will normally receive the redemption amount in your connected bank account within one to three business days.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">It Helps Diversify Your Investments</p>
          <p className="font14 lineHeight24 text444  mb15">Putting all of your money into one stock, bond, or other assets could be dangerous. You can diversify your investments with mutual funds by investing in various securities and asset types. As a result, your risk would be extremely low, even if there is a decline or disaster in the equities market.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">Help You Review the Past Performance before Investing</p>
          <p className="font14 lineHeight24 text444  mb45">To see how the mutual fund has done in the past, look at its past performance. With the help of the data, you may identify a fund that offers decent returns while having a lower risk profile. But its important to remember that past performance is no guarantee of future success.</p>
          <h2 className="font24 fontsemiBold textBlack mb30">What are the Risks of Mutual Funds?</h2>
          <p className="font14 lineHeight24 text444  mb15">The warning that Mutual Funds investments are subject to market risks is common knowledge. This disclaimer is intended to inform investors associated with mutual funds. To avail of the maximum possible benefits in terms of returns, knowing about the best mutual funds to invest in is not enough. In addition to that you must get acquaintance with the associated risk factors.</p>
          <p className="font14 lineHeight24 text444  mb15">You must comprehend the real risks associated with mutual funds to manage them effectively.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Risks in Equity Mutual Funds</h3>
          <p className="font14 lineHeight24 text444  mb15 fontBold">1. Market Risk:</p>
          <p className="font14 lineHeight24 text444  mb15">Market risk is the most significant risk for equity mutual funds. Market risk is the term for variations in investment value brought on by market ups and downs.</p>
          <p className="font14 lineHeight24 text444  mb15">Stock values fluctuate, and mutual funds invest in stocks. Continually evolving in response to supply and demand. Your mutual funds value fluctuates every day as a result of this ongoing shift, which also affects the NAV of the fund.</p>
          <p className="font14 lineHeight24 text444  mb15">Equity investing involves market risk, which cannot be eliminated but can be diminished by diversification.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">2. Liquidity Risk:</p>
          <p className="font14 lineHeight24 text444  mb15">How soon you can liquidate or sell and turn an asset into cash without losing value is referred to as liquidity. Since it takes time to sell a house, real estate is less liquid than bank FDs and liquid funds.</p>
          <p className="font14 lineHeight24 text444  mb15">Due to their fixed lock-in term of three years, equity mutual funds, especially Equity Linked Savings Scheme (ELSS), are extremely illiquid. Even ETFs, usually traded on the stock market, have a low trading volume and are challenging to liquidate quickly.</p>
          <p className="font14 lineHeight24 text444  mb15">Before investing in equities mutual funds, short-term investors should carefully evaluate the liquidity risk.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">3. Concentration Risk:</p>
          <p className="font14 lineHeight24 text444  mb15">Concentration risk occurs when all the investments are in one stock, industry, or theme. Sectoral and thematic funds have high concentration risk.</p>
          <p className="font14 lineHeight24 text444  mb15">The concentration risk across the diversified stock mutual funds is somewhat minimal because they invest in more than 50–100 shares.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">4. Currency Risk:</p>
          <p className="font14 lineHeight24 text444  mb15">Foreign mutual funds are the main epicentre of currency risk. As soon as the exchange rate fluctuates (downwards), it creates currency risk since local currency returns are lowered.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Risks in Debt Mutual Funds</h3>
          <p className="font14 lineHeight24 text444  mb15 fontBold">1. Credit Risk:</p>
          <p className="font14 lineHeight24 text444  mb15">Credit risk is the most significant risk for debt mutual funds. The quality of debt documents is graded by rating organisations like CRISIL, CARE, ICRA, and others, from AAA rated (very stable) to D. (junk).</p>
          <p className="font14 lineHeight24 text444  mb15">When the borrower, the issuer of the debt paper, misses a principal or interest payment, there is a credit risk.</p>
          <p className="font14 lineHeight24 text444  mb15">A notable illustration of this was the closure of six of Franklin Templeton AMCs debt schemes due to the high credit risk of the debtors.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">2. Interest Rate risks:</p>
          <p className="font14 lineHeight24 text444  mb15">Bond prices and interest rates are negatively correlated, meaning that when interest rates rise, bond prices fall, and vice versa.</p>
          <p className="font14 lineHeight24 text444  mb15">An increase in interest rates significantly impacts long-term debt funds. Investors can protect themselves against interest rate risks using interest rate futures or diversification.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">3. Inflation Risk:</p>
          <p className="font14 lineHeight24 text444  mb15">When moneys purchasing power declines due to rising inflation, there is inflation risk.</p>
          <p className="font14 lineHeight24 text444  mb15">For instance, your real rate of return is only 1.5% of the overall return associated with the debt fund investment clocks at 7.5%, and 6% is the current inflation rate.</p>
          <p className="font14 lineHeight24 text444  mb15 fontBold">4. Reinvestment Risk:</p>
          <p className="font14 lineHeight24 text444  mb15">Reinvestment risk arises when an individual tries to reinvest the money after maturity but receives a lesser rate of return.</p>
          <p className="font14 lineHeight24 text444  mb45">As an illustration, Mr Ram made a 2019 7% interest investment in a bank FD. The interest rate was 5.5% when he tried to renew his Fixed Deposit in 2020. The 1.5% lower interest rate represents reinvestment risk.</p>
          <h2 className="font24 fontsemiBold textBlack mb30">How Are Returns Calculated for Mutual Funds?</h2>
          <p className="font14 lineHeight24 text444  mb15">There are several ways to calculate mutual fund returns applicable for a lump sum and SIP investments. The computation method you count on usually depends on your personal choices.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Annual Return</h3>
          <p className="font14 lineHeight24 text444  mb15">As the name insinuates, the annual return is computed for a period of one year. It is expressed in terms of time-weighted yearly percentage. In other words, the annual return is the overall gain or loss incurred from the invested amount within one year.</p>
          <p className="font14 lineHeight24 text444  mb15">With the annual return, you can analyse the actual performance of the mutual fund for any year in which you held an investment in it. Generally, these returns are considered because they are easy to compute compared to other investment computations.</p>
          <p className="font14 lineHeight24 text444  mb15">Annual return = [(Ending NAV) – (Beginning NAV)] / Beginning NAV. <br />Here is an example for better understanding:</p>
          <p className="font14 lineHeight24 text444  mb15">Lets say the NAV on the mutual fund is 100 on the first day of investment, i.e. June 1, 2020. After completion of one year, i.e. May 31, 2021, the NAV value clocks at  110. <br />Then the Annual return on the invested amount for one year would be:</p>
          <p className="font14 lineHeight24 text444  mb15">[(1100-(100)]/100<br />0.1 or 10%</p>
          <h3 className="font18 fontsemiBold text181d mb15">Point-to-point or Absolute Return</h3>
          <p className="font14 lineHeight24 text444  mb15">Computation is somewhat similar to the Annual Returns. However, you can use a point-to-point calculation method to determine investment returns at any time, not just at the end of one year. The formula is useful for calculating returns when the holding period is less than 12 months. </p>
          <p className="font14 lineHeight24 text444  mb15">Since the computation is not associated with the investment period or the compounding effect, people don’t consider this formula to evaluate the performance of the funds for a longer time. <br />Point-to-Point Return = [(Current NAV – Beginning NAV) / Beginning NAV] x 100.</p>
          <p className="font14 lineHeight24 text444  mb15">Let us understand the formulas working through a quick example: <br />Person A purchased your mutual fund on June 27, 2019, with 100 NAC. On September 26, the NAV of the mutual fund rose by 10, making it 110. <br />For three month tenure, the point-to-point return will be calculated as: <br />(110-100)/100<br />0.1 x 100 = 10%</p>
          <h3 className="font18 fontsemiBold text181d mb15">Annualised Return</h3>
          <p className="font14 lineHeight24 text444  mb15">Investors use annualised return in several ways to evaluate the mutual funds performance over time. Dissimilar to the annual return, annualised returns are determined through the full investment holding period. It can be used to compute returns for a short and long tenure. <br />Annualised Return is calculated through the following formula:</p>
          <p className="font14 lineHeight24 text444  mb15">Annualised Return = [(1 + R1) x (1 + R2) x (1 + R3) x …. x (1 + Rn)]1/n – 1 <br />In this equation, n represents the number of investment years.</p>
          <p className="font14 lineHeight24 text444  mb15">Heres a quick example to understand the formulas working: <br />Lets say you invested in a mutual fund in 2019 and decided to keep it invested for five years. To decode the performance, initially, you will have to compute the annual return for each investment year.</p>
          <p className="font14 lineHeight24 text444  mb15">Once you have these values, add them and divide the overall value by 5, i.e. the number of investment years.</p>
          <p className="font14 lineHeight24 text444  mb15">Annual return for 2019 will be 3% <br />Annual return for 2020 will be 7% <br />Annual return for 2021 will be 5% <br />Annual return for 2023 will be 12%<br />Annual return for 2023 will be 1%</p>
          <p className="font14 lineHeight24 text444  mb15">Annualised Return i.e. Adding the returns of five years and dividing it by investment years <br />[(1 + 0.03) x (1 + 0.07) x (1 + 0.05) x (1 + 0.12) x (1 + 0.01) ]1/5 – 1 <br />Annualised Return will be 5.53%</p>
          <h3 className="font18 fontsemiBold text181d mb15">Compounded Annual Growth Rate (CAGR)</h3>
          <p className="font14 lineHeight24 text444  mb15">When the investment period is more than a year, investors find the CAGR computing method more significant. It incorporates the time value of the invested funds and denotes the mean annual growth rate. Incorporating time value allows to smoothen out the volatility at the end returns over the investment horizon. <br />CAGR = (Ending value / Beginning value)1/n– 1.</p>
          <p className="font14 lineHeight24 text444  mb15">Lets understand this through an example: <br/>Suppose Person B invested INR 1 lakh in a mutual fund three years ago. The initial NAV for the MF was recorded at INR 20. As per the current scenario, the NAV is INR 40. For this case, the: CAGR = 25.99%.</p>
          <p className="font14 lineHeight24 text444  mb15">Compared with the absolute returns, this computation method provides a reliable picture of the mutual fund performance for the given investment time frame. However, if the mutual fund investment stretches for a prolonged period with regular instalments (SIP), the CAGR method seems to be less effective.</p>
          <h3 className="font18 fontsemiBold text181d mb15">Extended Internal Rate of Return for SIPs</h3>
          <p className="font14 lineHeight24 text444  mb15">XIRR or Extended Internal Rate of Returns computes the ‘internal’ return rate (annualised yield) specifically for scheduled cash flows occurring at irregular intervals. XIRR represents the aggregation of diverse CAGRs for a Systematic Investment Plan. In such an investment, you regularly invest a certain amount for a long tenure and get returns at maturity.</p>
          <p className="font14 lineHeight24 text444  mb15">You get several units based on the NAV value of the invested mutual fund. You keep on accumulating these units from the first day of your investment. When you decide to redeem the total units on the final day, you will be getting the maturity amount for the invested funds. This amount will equal the NAV value in multiplication with the total number of units you own. For calculating the mutual fund returns on the invested amount through XIRR in Excel, you need to have the SIP amount, investment dates, redemption date and maturity amount. There is no need to know the NAV value of the investment.</p>
          <p className="font14 lineHeight24 text444  mb15">Here is an example to understand how returns are computed through XIRR. Person Z invested INR 2000/ month from January 1, 2020. The person kept on investing for six months. At the end of the investment period, Person Z will redeem an amount of INR 11,000.</p>
          <table>
            <tbody>
              <tr>
                <td><b>Date of investment towards the  SIP</b></td>
                <td><b>Investment Amount</b></td>
              </tr>
              <tr>
                <td><span>January  2020</span></td>
                <td><span>INR 2000</span></td>
              </tr>
              <tr>
                <td><span>February  2020</span></td>
                <td><span>INR 2000</span></td>
              </tr>
              <tr>
                <td><span>March  2020</span></td>
                <td><span>INR 2000</span></td>
              </tr>
              <tr>
                <td><span>April  2020</span></td>
                <td><span>INR 2000</span></td>
              </tr>
              <tr>
                <td><span>May  2020</span></td>
                <td><span>INR 2000</span></td>
              </tr>
              <tr>
                <td><span>June  2020</span></td>
                <td><span>INR 2000</span></td>
              </tr>
              <tr>
                <td><span>Total Investment Amount</span></td>
                <td><span>INR 10,000</span></td>
              </tr>
            </tbody>
          </table>
          <p className="font14 lineHeight24 text444  mb45">XIRR = 45.27% per annum (use Excel)</p>
          <h2 className="font24 fontsemiBold textBlack mb30">Mutual Fund Investing Eligibility Criteria</h2>
          <p className="font14 lineHeight24 text444  mb15">You need to adhere to the following eligibility criteria to start investing in mutual funds:</p>
          <p className="font14 lineHeight24 text444  mb15">1.	An individual must be an Indian resident for single or joint investment. </p>
          <p className="font14 lineHeight24 text444  mb15">2.	In the case of minors, the investment will be carried out through parents or lawful guardians. </p>
          <p className="font14 lineHeight24 text444  mb15">3.	Non-resident Indians, Persons of Indian Origin, can also invest in mutual funds. However, individuals might need approval from the RBI.</p>
          <p className="font14 lineHeight24 text444  mb15">4.	Religious Trusts, Charitable Trusts, and Private trusts</p>
          <p className="font14 lineHeight24 text444  mb15">5.	Partnership Firms</p>
          <p className="font14 lineHeight24 text444  mb15">6.	Member (Karta) of a Hindu Undivided Family</p>
          <p className="font14 lineHeight24 text444  mb15">7.	Banks: Co-operative, Regional, Financial Institutions</p>
          <p className="font14 lineHeight24 text444  mb15">8.	SEBI registered Foreign Institutional Investors (FIIs)</p>
          <p className="font14 lineHeight24 text444  mb15">9.	Organisations, corporate bodies, Societies, and Public Sector undertakings</p>
          <p className="font14 lineHeight24 text444  mb15">10.	Organisations associated with Science and Research </p>
          <p className="font14 lineHeight24 text444  mb15">11.	Provident, Pension, Gratuity, and other funds if permitted by the organisation</p>
          <p className="font14 lineHeight24 text444  mb15">12.	Multinational companies (approved by the Government and the Reserve Bank of India)</p>
          <p className="font14 lineHeight24 text444  mb15">13.	Trustees, Sponsors, AMCs and their associates:</p>
          <p className="font14 lineHeight24 text444  mb15">If you successfully cope with the mutual fund investment eligibility criteria, start your investment today and secure huge returns. </p>
          <p className="font14 lineHeight24 text444  mb15 fontBold fontStyleItalic">A mutual fund is a potent investment choice that could help individuals build wealth over the long run. Mutual funds offer plans for every aspect of life, from retirement to accumulating wealth. You offer investments for conservative and risk-averse investors. The benefit of diversity, cheap cost, flexibility to invest in lesser quantities, and expert fund management are all advantages of the alternative. Mutual fund investing is made simple and rapid when used with an online investment platform.</p>
          </div>
          <p className='font14 textLink cursorPointer textRight' onClick={()=>setReadMore(!readMore)}>{readMore?'Read Less':'Read More'}</p>
        </div>
      </div>
    </section>
  )
}
