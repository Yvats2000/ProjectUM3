import styles from "./MyProfile.module.css";
import { SideBar } from "../../creditScore/SideBar";
import {ProfileTemplate} from './../profileTemplete';
import { useEffect } from "react";
export function MyProfile({userCardList}) {
  useEffect(() => {
    const timer = setTimeout(() => {
      webengage.user.setAttribute("Category", "My Profile Page");
      let pageEvnt = {"url" : "My Profile"}
      webengage.track("Page_opened",pageEvnt)
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <>
        <ProfileTemplate userCardList={userCardList}>
          <div className={styles.blankScreen}>
            <figure><img src="./assets/images/Coming soon 1.svg" alt="My Profile" /></figure>
            <p className={styles.mainHead}>We are a WIP</p>
            <p>Will be ready for access very soon.</p>
          </div> 
        </ProfileTemplate>
    </>
  );
}
