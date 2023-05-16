import { SiteMap } from "../components/shared";
import {getMaster} from "../services/master";
const sitemap = ({data}) => {
  return (
    <SiteMap data={data} />
  );
}
export async function getServerSideProps() {
  const data = await getMaster("header_right_nav_links");
  return { props: { data : data ? data.header_right_nav_links : [] } }
}
export default sitemap;
