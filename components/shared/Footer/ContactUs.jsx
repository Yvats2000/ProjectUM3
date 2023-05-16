import {NavLink} from '../../ui';
export const ContactUs = () => {
  return (
    <>
      	<h3 className="font14 fontMedium textWhite mb20">Contact Us</h3>
      	<p className="textc7c7c7 font14 pd14">
		  Good Earth Business Bay, 
		</p>
      	<p className="textc7c7c7 font14 pd14">
		  9th Floor, Sector 58, 
		</p>
      	<p className="textc7c7c7 font14 pd14">
		  Gurgaon -122011
		</p>
		<p className="textWhite opt70 font14 pd14">
		Toll free number : <NavLink href="tel:1800 208 3344" className="textWhite">1800 208 3344</NavLink>
		</p>
		<p className="textWhite opt70 font14 mb30">
			Write to us at : <NavLink href="mailto:connect@urbanmoney.com" className="textWhite">connect@urbanmoney.com</NavLink>
		</p>
    </>
  );
};
