import { ParentFile } from "../../../../components/calculator";
import { useRouter } from 'next/router'
import { MetaHead, SchemaHead } from "../../../../components/shared";
import {getGeneralContent, getCategoryBlog} from "../../../../services/blogs";
import commonFunctions from './../../../../utils/CommonFunctions';
const BalanceTransferCalculatorType = ({rightNavBar,cmsData, blogsData}) => {
    const router = useRouter();    
    const loanType = router.query.loanType.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    const calculatorType = 'Balance Transfer Calculator';
    const metaData = { 
        "title" : cmsData.length > 0 && cmsData[0].meta_title && cmsData[0].meta_title != '' ? cmsData[0].meta_title : `${loanType} ${calculatorType} | Check EMI`,
        "description" : cmsData.length > 0 && cmsData[0].meta_description && cmsData[0].meta_description != '' ? cmsData[0].meta_description : `Calculate Your ${loanType} ${calculatorType == 'Emi Calculator' ? 'EMI Calculator' : calculatorType} at Urban Money - Loan EMI Calculators with Top Banks in India offering Best ${loanType} ${calculatorType} Interest Rate. Compare ${loanType} ${calculatorType} Loan Rates across Top Banks in India`,
        "keywords" : "",
        "url" : `${process.env.BASE_URL}/loans/`+router.query.loanType+ `/`+`balance-transfer-calculator`
    }
    const FaqArray = [];
    const addFaqJson = (question, answer) => {
      return `{
        "@type":"Question",
        "name":"${question.replace(/<[^>]*>?/gm, '')}",
        "acceptedAnswer":{"@type":"Answer",
        "text":"${answer.replace(/<[^>]*>?/gm, '')}"}
      }`
    }
    cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addFaqJson(faqs.question,faqs.answer))))
    const schemaData = [
        {
          __html: `{
            "@context": "https://schema.org",
            "@type": "Webpage",
            "url": "${process.env.BASE_URL}/loans/${router.query.loanType}/balance-transfer-calculator",
            "name": "${loanType} ${calculatorType}",
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
                "name": "Calculators",
                "item": "${process.env.BASE_URL}/calculator"  
              },{
                "@type": "ListItem", 
                "position": 3, 
                "name": "${loanType} ${calculatorType}",
                "item": "${process.env.BASE_URL}/loans/${router.query.loanType}/balance-transfer-calculator"  
              }]
            }`
        }
      ]
      const addfaqSchema = () => {
        return {
          __html: `{
            "@context":"https://schema.org",
            "@type":"FAQPage",
            "mainEntity":[${FaqArray}]
          }`
        }
      }
      FaqArray.length > 0 && schemaData.push(addfaqSchema());
    return (
        <>
            <MetaHead metaData={metaData} />
            <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
            <ParentFile blogsData={blogsData} cmsData={cmsData} loanType={router.query.loanType} rightNavBar={rightNavBar} calculatorType={'balance-transfer-calculator'} />
        </>
    );
}
export async function getServerSideProps(context) {
  let loanType = context.params.loanType;
  let calculatorType = 'balance-transfer-calculator';
  const blogsData = await getCategoryBlog(loanType);
  const genericUrl = 'loans/'+loanType+'/'+calculatorType;
  const cmsData = await getGeneralContent(`${genericUrl}`);
  if (cmsData && Object.keys(cmsData).length === 0) {
    return {
      notFound: true,
    }
  }
  return { props: { cmsData : cmsData, blogsData: blogsData && blogsData.length > 0 ? commonFunctions.relatedArticles(blogsData) : []} }
}

export default BalanceTransferCalculatorType;
