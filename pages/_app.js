import {getMaster} from "../services/master"
import { Layout } from "../components/layout";
import "../public/assets/css/global.css";
import "../public/assets/lib/moonicon.css";
import { useRouter } from 'next/router';
import TagManager from 'react-gtm-module';
import { GlobalContext } from '../libs/context';
import { useEffect, useState } from 'react';
import {FloatIcon} from '../components/shared/FloatIcon'

function MyApp({ Component, pageProps, data, isMobile }) {
  const router = useRouter();
  const setHeaderFooter = router.query.setHeaderFooter ? router.query.setHeaderFooter : true;
  const [isDisplayed, setIsDisplayed] = useState(false);
  
  useEffect(() => {
    TagManager.initialize({ 
      gtmId: process.env.GTM_CODE
    });
    setInterval(() => {
      setIsDisplayed(true);
    }, 4200);
    setTimeout(() => {
      webengage.onReady(function () {
        webengage.webpush.prompt();
    });
    webengage.options('webpush.disablePrompt', false);
    webengage.options('webpush.registerServiceWorker', true);
      let url = router.asPath
      let value = url.split('/')
      let pageEvnt = {"category" : value[1] || "Home Page", "subCategory" : value[2] || ""}
      webengage.track("Page_opened",pageEvnt)
    }, 2000);
  }, [router.asPath]);
  const webEngageData={
    __html : `
  var webengage;
  ! function(w, e, b, n, g) {
      function o(e, t) {
          e[t[t.length - 1]] = function() {
              r.__queue.push([t.join("."), arguments])
          }
      }
      var i, s, r = w[b],
          z = " ",
          l = "init options track screen onReady".split(z),
          a = "feedback survey notification".split(z),
          c = "options render clear abort".split(z),
          p = "Open Close Submit Complete View Click".split(z),
          u = "identify login logout setAttribute".split(z);
      if (!r || !r.__v) {
          for (w[b] = r = {
                  __queue: [],
                  is_spa: 1, //Change this to 0 if you do not wish to use default SPA behaviour of WebEngage SDK
                  __v: "6.0",
                  user: {}
              }, i = 0; i < l.length; i++) o(r, [l[i]]);
          for (i = 0; i < a.length; i++) {
              for (r[a[i]] = {}, s = 0; s < c.length; s++) o(r[a[i]], [a[i], c[s]]);
              for (s = 0; s < p.length; s++) o(r[a[i]], [a[i], "on" + p[s]])
          }
          for (i = 0; i < u.length; i++) o(r.user, ["user", u[i]]);
          setTimeout(function() {
              var f = e.createElement("script"),
                  d = e.getElementById("_webengage_script_tag");
              f.type = "text/javascript", f.async = !0, f.src = ("https:" == e.location.protocol ? "https://widgets.in.webengage.com" : "http://widgets.in.webengage.com") + "/js/webengage-min-v-6.0.js", d.parentNode.insertBefore(f, d)
          })
      }
  }(window, document, "webengage");
  webengage.init('in~~${process.env.WEBENGAGE_ID}'); //replace the YOUR_WEBENGAGE_LICENSE_CODE with your WebEngage Account License Code
  `
  };
  const showDisclaimer = (pathname) => {
    switch (pathname) {
      case '/404':
      case '/500':
      case '/':
      return false
      default: <script id='_webengage_script_tag' type='text/javascript' dangerouslySetInnerHTML={webEngageData} />
      return true
    }
  }
  switch (router.pathname) {
    case '/login':
    case '/sitemap':
      return (
        <>
        <script id='_webengage_script_tag' type='text/javascript' dangerouslySetInnerHTML={webEngageData} />
          <Component {...pageProps} />
        </>
      )
    default:
      return (
        pageProps && pageProps.pageGone ? 'Page is gone.' :
        <>
        <GlobalContext.Provider value={{isMobile}}>
          <Layout data={data} disclaimer={showDisclaimer(router.pathname)} setHeaderFooter={setHeaderFooter}>
          <script id='_webengage_script_tag' type='text/javascript' dangerouslySetInnerHTML={webEngageData} />
            {isDisplayed && <FloatIcon/>}
            <Component rightNavBar={data ? data.header_right_nav_links : []} {...pageProps} key={router.asPath}  />
          </Layout>
        </GlobalContext.Provider>
        </>
      );
  }
}
MyApp.getInitialProps = async (pageContext) => {
  const ctx=pageContext.ctx;
  const isMobile=(ctx.req?.headers['user-agent']||navigator.userAgent).match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i) != null;
  const data = await getMaster("header_nav_links,footer_nav_links,header_right_nav_links");
  return { data,isMobile };
};
export default MyApp;
