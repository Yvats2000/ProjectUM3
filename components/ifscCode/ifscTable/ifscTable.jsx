import styles from "./ifscTable.module.css";
import {NavLink} from '../../ui';
import { isMobile } from "react-device-detect";
export const IfscTable =({data, state, city, attributeLink})=>{
  if(data && data.length == 0)
  return false;
    return(
      <>    
        <div className={styles.planDiv}>
          {isMobile?data.map((table,index)=>
          <div className={styles.bankData} key={index}>
              <table className={styles.  dataTable}>
                <tbody>
                <tr>
                  <td className="text666 opt80" width="30%">Branch Name</td>
                  <td width="20">:</td>
                  <td className="text444 fontsemiBold"><NavLink href={`${attributeLink}/${table.slug}`} className="textLink">{table.branch}</NavLink></td>
                </tr>
                <tr>
                  <td className="text666 opt80" width="30%">IFSC</td>
                  <td width="20">:</td>
                  <td className="text444 fontsemiBold">{table.ifsc || '--'}</td>
                </tr>
                <tr>
                  <td className="text666 opt80" width="30%">MICR</td>
                  <td width="20">:</td>
                  <td className="text444 fontsemiBold">{table.mircCode || '--'}</td>
                </tr>
                <tr>
                  <td className="text666 opt80" width="30%">Address</td>
                  <td width="20">:</td>
                  <td className="text444 fontsemiBold">{table.address || '--'}</td>
                </tr>
                <tr>
                  <td className="text666 opt80" width="30%">City State</td>
                  <td width="20">:</td>
                  <td className="text444 fontsemiBold"><p><span className="textLink">{city}</span>, {state}</p></td>
                </tr>
              </tbody>
              </table>
          </div>
          ):<table className={styles.planTable} cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th className="font14">Branch Name</th>
              <th className="font14">IFSC</th>
              <th className="font14">MICR</th>
              <th className="font14">Address</th>
              <th className="font14">City & State</th>
            </tr>
          </thead>
          {data.map((table,index)=>
            <tr key={index}>
              <td><NavLink href={`${attributeLink}/${table.slug}`} className="font14 textLink">{table.branch}</NavLink></td>
              <td><p className="font14 text666 ">{table.ifsc || '--'}</p></td>
              <td><p className="font14 text666 ">{table.mircCode || '--'}</p></td>
              <td><p className="font14 text666 ">{table.address || '--'}</p></td>
              <td><p> <span className={styles.city}> {city}</span>, {state}</p></td>
            </tr>
          )}
        </table>}
        </div>
      </>
    )
}