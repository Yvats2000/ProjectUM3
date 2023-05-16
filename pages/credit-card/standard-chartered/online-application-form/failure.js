import { SuccessFailure } from "../../../../components/bankPartners/StandardChartered/ApplicationForm";
import { MetaHead, SchemaHead } from "../../../../components/shared";
import Image from "next/image";
import styles from "../../../../components/bankPartners/StandardChartered/ApplicationForm/ApplicationForm.module.css";
const SCBankApplicationFailure = ({rightNavBar, master,authToken,agentToken}) => {
  const metaData = {
    "title" : "Check Again - Your Application wasn't Successful - Urban Money",
    "description" : "Your Credit card Application wasn't Successful. Please recheck the detail.",
    "url" : `${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form/failure`
  }
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${metaData.url}",
        "name": "${metaData.title}",
        "headline": "${metaData.title}",
        "description": "${metaData.description}"
        }
        }`
    },
    {
      __html: `{
        "@context": "https://schema.org/", 
        "@type": "BreadcrumbList", 
        "itemListElement": [{
          "@type": "ListItem", 
          "position": 1, 
          "name": "Home",
          "item": "${process.env.BASE_URL}"  
        },{
          "@type": "ListItem", 
          "position": 2, 
          "name": "Credit Card",
          "item": "${process.env.BASE_URL}/credit-card"
        },{
          "@type": "ListItem", 
          "position": 3, 
          "name": "Standard Chartered",
          "item": "${process.env.BASE_URL}/credit-card/standard-chartered"
        },{
          "@type": "ListItem", 
          "position": 4, 
          "name": "Standard Chartered Application",
          "item": "${process.env.BASE_URL}/credit-card/standard-chartered/online-application-form"
        },{
          "@type": "ListItem", 
          "position": 5, 
          "name": "Standard Chartered Application Failure",
          "item": "${metaData.url}"
        }]
      }`
    }
  ]
  
  return (
    <>
      <MetaHead metaData={metaData} />
      <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
      <section className={styles.cardForm}>
        <Image className={`imgResponsive ${styles.backgroundWave}`} src="/assets/images/sc-wave-form.png" width={123} height={32} layout="intrinsic" alt="Standard Chartered Journey" />
        <div className="container">
          <SuccessFailure status={false} />
        </div>
      </section>
    </>
  );
}
export default SCBankApplicationFailure;