import { CreditCardBanner } from "./creditCardBanner";
import { TopBanks } from "./topBanks";
import { CreditCardFeatures } from "./creditCardFeatures";
import { CreditCardsOffers } from "./creditCardsOffers";
import { FAQ,InternalBlog,CreditScore } from "../shared";
import faqData from "../../data/creditCardFaq.json"
export const CreditCardHome = ({blogsData}) => {
    return (
      <>
        <CreditCardBanner/>
        <TopBanks/>
        <CreditCardFeatures/>
        <CreditCardsOffers/>
        <CreditScore />
        <section className="faq">
            <div className="container">
                <h2 className="faqHeading textCenter font24">Frequently Asked Questions</h2>
                <p className="font14 lineHeight24 textCenter text444 mb45 faqP">From refinancing to reducing your interest, we have the answers right here.</p>
                <div className="faqBx">
                    <FAQ data={faqData}/>
                </div>
            </div>
        </section>
        <InternalBlog loanType={'Credit Card'} data={blogsData} />
        
      </>
    );
  }
  