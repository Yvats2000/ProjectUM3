import React from 'react'
import { SideBar } from "../../creditScore/SideBar";
import styles from './profileTemplete.module.css';
export const ProfileTemplate = ({children,userCardList}) => {
  return (
    <section className={styles.allcreditEnq}>
        <div className="container">
            <div className={styles.wraper}>
                <SideBar userCardList={userCardList}/>
                {children}
            </div>
        </div>
    </section>
  )
}
