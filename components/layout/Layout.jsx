import { Header, Footer, CopyRight } from "../shared";
export function Layout({ children, data, disclaimer, setHeaderFooter }) {
  return (
    <>
      {setHeaderFooter === true && <Header navLinks={data ? data.header_nav_links : []} rightNavBar={data ? data.header_right_nav_links : []} />}
      <main>{children}</main>
      {setHeaderFooter === true && <Footer footerLinks={data ? data.footer_nav_links : []} disclaimer={disclaimer} />}
      {setHeaderFooter === true && <CopyRight />}
    </>
  );
}
