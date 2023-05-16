import Head from "next/head";
const addJsonSchema = (text, path) => {
  return {
    __html: `{
      "@context": "https://schema.org",
      "@type":"SiteNavigationElement",
      "URL": "${process.env.BASE_URL}${path}",
      "Name": "${text}"
    }`
  }
}
export const SchemaHead = ({data=[], rightNavBar=[]}) => {
  {rightNavBar && rightNavBar.length > 0 && rightNavBar.map((menu)=>(
    <>
    {data.push(addJsonSchema(menu.text,menu.path))}
    {menu.child && menu.child.length > 0 ? menu.child.map((item) => (item.child && item.child.length > 0 ? item.child.map((subItem) => (
      subItem.path ? data.push(addJsonSchema(subItem.text,subItem.path)) : null)) : data.push(addJsonSchema(item.text,item.path)))) : 
      null}
    </>
  ))}
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
  webengage.init(in~~${process.env.WEBENGAGE_ID}'); //replace the YOUR_WEBENGAGE_LICENSE_CODE with your WebEngage Account License Code
  `};
  return (
    <Head>
      {data && data.length > 0 && data.map((item,index)=> 
      <script type="application/ld+json" key={index} dangerouslySetInnerHTML={item} />
      )}
      <script id='_webengage_script_tag' type='text/javascript' dangerouslySetInnerHTML={webEngageData} />
    </Head>
  )
}
