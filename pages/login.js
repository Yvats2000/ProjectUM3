import { LoginScreen } from "../components/auth";
import { MetaHead, SchemaHead } from "../components/shared";
const login = () => {
  const metaData = {
    "title" : "Login - Urban Money",
    "description" : "Urban Money Login - Take control of the service. Experience during your home loan journey",
    "keywords" : "fintech,finance services,banking and finance,banking & finance,urban money,digital finance,finance solutions,fintech solutions,fintech services",
    "url" : `${process.env.BASE_URL}/login`
  }
  return (
    <>
      <MetaHead metaData={metaData} />
      <LoginScreen />
    </>
  );
}
export default login;
