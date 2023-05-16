import { Content } from "../components/generalContent/Content";
import {getGeneralContent, getGeneralCatContent} from "../services/blogs";
import { MetaHead, SchemaHead } from "../components/shared";
const GenericPage = ({cmsData, genericUrl,interLinkingData, pageUrl, rightNavBar}) => {
  let arrayGenericUrl = genericUrl.split('/');
  let arrayUrl = [];
  arrayGenericUrl.map((url, index) => arrayUrl.push(
    {
      name : url.split('-').join(' ').replace(/(^\w|\s\w)/g, m => m.toUpperCase()), 
      path: arrayGenericUrl.slice(0,1+index).join('/')
    }
  ))
  let finalUrl = [{name: 'Home', path: process.env.BASE_URL}].concat(arrayUrl);
  const metaData = {
    "title" : cmsData[0].meta_title,
    "description" : cmsData[0].meta_description,
    "keywords" : cmsData[0].meta_keywords,
    "url" : `${process.env.BASE_URL}/${genericUrl}`
  }
  const FaqArray = [];
  const BreadCrumbArray = [];
  const addFaqJson = (question, answer) => {
    return `{
      "@type":"Question",
      "name":"${question.replace(/<[^>]*>?/gm, '')}",
      "acceptedAnswer":{"@type":"Answer",
      "text":"${answer.replace(/<[^>]*>?/gm, '')}"}
    }`
  } 
  const addBreadCrumbJson = (index, data) => {
    return `{
      "@type": "ListItem", 
      "position": "${index}", 
      "name": "${data.name}",
      "item": "${index === 1 ? data.path : process.env.BASE_URL + '/' + data.path}" 
    }`
  }
  finalUrl.map((data,index) => BreadCrumbArray.push(addBreadCrumbJson(index+1, data))); 
  cmsData && cmsData.length > 0 && cmsData.filter((value) => value.isFAQ === true).map((item) => item.faq_content.map((faqs) => FaqArray.push(addFaqJson(faqs.question,faqs.answer))))
  const schemaData = [
    {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Webpage",
        "url": "${process.env.BASE_URL}/${genericUrl}",
        "name": "${cmsData[0].meta_title}",
        "headline": "${cmsData[0].meta_title}",
        "description": "${cmsData[0].meta_description}"
        }
      }`
    }
  ]
  const addBreadCrumbSchema = () => {
    return {
      __html: `{
        "@context": "https://schema.org/", 
        "@type": "BreadcrumbList", 
        "itemListElement":[${BreadCrumbArray}]
      }`
    }
  }
  BreadCrumbArray.length > 0 && schemaData.push(addBreadCrumbSchema());
  const addFaqSchema = () => {
    return {
      __html: `{
        "@context":"https://schema.org",
        "@type":"FAQPage",
        "mainEntity":[${FaqArray}]
      }`
    }
  }
  FaqArray.length > 0 && schemaData.push(addFaqSchema());
  return (
    <>
    <MetaHead metaData={metaData} />
    <SchemaHead data={schemaData} rightNavBar={rightNavBar} />
    <Content cmsData={cmsData} breadCrumbs={arrayUrl} interLinkingData={interLinkingData} pageUrl={pageUrl} rightNavBar={rightNavBar} />
    </>
  );
}
export async function getServerSideProps(context) {
    const genericUrl = context.params.generic.join('/');
    const cmsData = await getGeneralContent(`${genericUrl}`);
    const interLinkingData = await getGeneralCatContent(`${genericUrl.split('/')[0]}`);
    if (cmsData && Object.keys(cmsData).length === 0) {
      return {
        notFound: true,
      }
    }
    return { props: { cmsData : cmsData, genericUrl : genericUrl, interLinkingData: interLinkingData, pageUrl : genericUrl } }
}
export default GenericPage;
  