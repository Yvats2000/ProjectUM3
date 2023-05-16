const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  distDir: "_next",
  poweredByHeader: false,
  generateBuildId: async () => {
    return `${new Date().getTime()}`;
  },
  compress: true,
  reactStrictMode: true,
  images: {
    domains: ['www.urbanmoney.com','cdn.urbanmoney.com','uat-blog.urbanmoney.com'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  experimental: {
    scrollRestoration: true,
  },
  env: {
    ENVIRONMENT: process.env.ENVIRONMENT,
    BASE_URL: process.env.BASE_URL,
    API_BASEURL: process.env.API_BASEURL,
    AMC_BASEURL: process.env.AMC_BASEURL,
    LEAD_BASEURL: process.env.LEAD_BASEURL,
    LEAD_API_TOKEN: process.env.LEAD_API_TOKEN,
    CREDIT_SCORE_BASEURL: process.env.CREDIT_SCORE_BASEURL,
    CREDIT_SCORE_VENDOR_TYPE: process.env.CREDIT_SCORE_VENDOR_TYPE,
    CREDIT_SCORE_VENDOR: process.env.CREDIT_SCORE_VENDOR,
    CREDIT_SCORE_SOURCE: process.env.CREDIT_SCORE_SOURCE,
    CREDIT_CARD_SOURCE: process.env.CREDIT_CARD_SOURCE,
    CREDIT_SCORE_VENDOR_NAME: process.env.CREDIT_SCORE_VENDOR_NAME,
    WEBENGAGE_ID: process.env.WEBENGAGE_ID,
    LOGIN_SOURCE: process.env.LOGIN_SOURCE,
    IMAGE_BASEURL: process.env.IMAGE_BASEURL,
    BLOG_BASEURL: process.env.BLOG_BASEURL,
    APPLICATION_FLOW_BASEURL: process.env.APPLICATION_FLOW_BASEURL,
    API_TIMEOUT: process.env.API_TIMEOUT,
    GTM_CODE: process.env.GTM_CODE,
    GTM_AUTH: process.env.GTM_AUTH,
    GTM_PREVIEW: process.env.GTM_PREVIEW,
  },
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        "autoprefixer": {
          "flexbox": "no-2009"
        },
        "stage": 3,
        "features": {
          "custom-properties": false
        }
      }
    ],
    [
      '@fullhuman/postcss-purgecss',
      {
        content: [
            './pages/**/*.{js,jsx,ts,tsx}',
            './components/**/*.{js,jsx,ts,tsx}'
        ],
        defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: ["html", "body"]
      }
    ],
  ]
};
