import { Careers } from "../components/careers";
import { MetaHead, SchemaHead } from "../components/shared";
const careers = () => {
  const metaData = {
    "title" : "Career – Build Your Career with Urban Money",
    "description" : "Career with Us – Looking to build your career? Than Urban Money is the best place to build your career in Fintech Industry. ",
    "keywords" : "fintech,finance services,banking and finance,banking & finance,urban money,digital finance,finance solutions,fintech solutions,fintech services",
    "url" : `${process.env.BASE_URL}/careers`
  }
  return (
    <>
      <MetaHead metaData={metaData} />
      <Careers />
    </>
  );
}
export default careers;
