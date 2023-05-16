import { ContactUs } from "../components/contactUs";
import { MetaHead, SchemaHead } from "../components/shared";
const contactUs = () => {
  const metaData = {
    "title" : "Contact Us – Know How to Reach - Urban Money",
    "description" : "Contact Us - Get complete details of our office locations and addresses online.",
    "keywords" : "fintech,finance services,banking and finance,banking & finance,urban money,digital finance,finance solutions,fintech solutions,fintech services",
    "url" : `${process.env.BASE_URL}/contact-us`
  }
  return (
    <>
      <MetaHead metaData={metaData} />
      <ContactUs />
    </>
  );
}
export default contactUs;
