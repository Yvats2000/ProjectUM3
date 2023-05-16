import { MyProfile } from "../components/auth";
import { getItemFromCookie } from '../helpers/cookie';
import { Page404 } from "../components/errorPage";
import { UserFetch } from "../services/creditCard";
import cookie from "cookie";
function MyProfilePage({userCardList}) {
    return <MyProfile userCardList={userCardList}/>
}
export async function getServerSideProps(context) {
  const mycookie = cookie.parse(
    (context.req && context.req.headers.cookie) || ""
  );
  let token = mycookie.autoToken;
  const userCardList = await UserFetch(token);
  if (token == null || token === undefined ) {
    return {
      notFound: true,
    }
  }
  return { props: { userCardList:userCardList.data} }
}
export default MyProfilePage;
