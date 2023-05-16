import { BecomePartner } from "../components/becomePartner";
import { MetaHead, SchemaHead } from "../components/shared";
const becomePartner = ({rightNavBar}) => {
  const metaData = {
    "title" : "Urban Money Partner Business Program - Urban Money",
    "description" : "Enhance your Business Partner experience with Urban Money that lets you view offers, earnings & cases updates in real time, get privileged access for your exclusive loan offers running across various banks",
    "keywords" : "",
    "url" : `${process.env.BASE_URL}/become-a-partner`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/become-a-partner",
        "name": "Become a Partner",
        "headline": "Urban Money Partner Business Program - Urban Money ",
        "description": "Enhance your Business Partner experience with Urban Money that lets you view offers, earnings & cases updates in real time, get privileged access for your exclusive loan offers running across various banks"
        }
        }`
    }
  ]
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <BecomePartner />
    </>
  );
}
export default becomePartner;
