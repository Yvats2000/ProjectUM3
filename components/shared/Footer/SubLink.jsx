import { Link } from "../../ui";
export const SubLink = ({ menuLinks = [] }) => {
  if (menuLinks && menuLinks.length > 0) {
    return (
      <ul>
        
        {menuLinks.map((menu, index) => (
          <li key={index}>
            {menu.text === 'Square Yards' || menu.text === 'Blog'|| menu.text === 'Square Yards Canada'|| menu.text === 'Square Yards Australia' || menu.text === 'Square Yards UAE'||  menu.text === 'Interior Company' ? 
            <a href={menu.path} className="textWhite opt70 font12">{menu.text}</a> : 
            <Link href={`${process.env.BASE_URL}${menu.path}`}  className="textWhite opt70 font12">{menu.text}</Link>}
          </li>
        ))}
      </ul>
    );
  }
  return null;
};
