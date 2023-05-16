import { useEffect, useState } from "react";
import { MyCreditCards } from "../components/auth";
import { getItemFromCookie } from '../helpers/cookie';
import { Page404 } from "../components/errorPage";
import { UserFetch } from "../services/creditCard";
function MyCreditCard() {
  const [cardList, setCardList] = useState();
  const autoToken = getItemFromCookie('autoToken');
  useEffect(async () => {
    const userCardList = await UserFetch(autoToken);
    setCardList(userCardList.data);
  }, []);
  return autoToken && autoToken !== undefined ? <MyCreditCards  userCardList={cardList}/> : '';
}
export default MyCreditCard;
