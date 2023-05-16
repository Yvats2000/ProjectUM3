import { httpClient } from "../helpers/http-client";

const getLatestBlog=async(count=3) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/latestPosts/?count=`+count);
        return response.data;
    } catch (err) {
        console.error('error in getLatestBlog APi ', err);
    }
}
const getCategoryBlogHome=async(name) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/categories`);
        return response.data;
    } catch (err) {
        console.error('error in getLatestBlog APi ', err);
    }
}

const getCategoryBlog=async(name) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/category/?slug=${name}`);
        return response.data;
    } catch (err) {
        console.error('error in getCategoryBlog APi ', err);
    }
}

const getProductContent=async(loanType) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/allproduct/?product_slug=${loanType}`);
        return response.data;
    } catch (err) {
        console.error('error in getProductContent APi ', err);
    }
}

const getBankContent=async(bankName) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/newbankpage/?slug=${bankName}`);
        return response.data;
    } catch (err) {
        console.error('error in getBankContent APi ', err);
    }
}

const getBankProductContent=async(bankName, productName) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/newbankpage/?slug=${bankName}&product_slug=${productName}`);
        return response.data;
    } catch (err) {
        console.error('error in getBankProductContent APi ', err);
    }
}

const ProductInterestRateContent=async(bankName, productName) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/interest-rate/?bank=${bankName}&product=${productName}`);
        return response.data;
    } catch (err) {
        console.error('error in ProductInterestRateContent APi ', err);
    }
}

const getGeneralContent=async(url) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/generalcontent/?slug=/${url}`);
        return response.data;
    } catch (err) {
        console.error('error in getGeneralContent APi ', err);
    }
}
const getAmcContent=async(url) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/mutual-funds/?amc=${url}`);
        return response.data;
    } catch (err) {
        console.error('error in getAmcContent APi ', err);
    }
}
const getMutualFundsCategory=async(url) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/mutual-funds/?category=${url}`);
        return response.data;
    } catch (err) {
        console.error('error in getMutualFundsCategory APi ', err);
    }
}

const getAmcCategory=async(amc,category) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/mutual-funds/?amc=${amc}&category=${category}`);
        return response.data;
    } catch (err) {
        console.error('error in getAmcCategory APi ', err);
    }
}
const getGeneralCatContent=async(url) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/generalcontent/?catslug=${url}`);
        return response.data;
    } catch (err) {
        console.error('error in getGeneralContent APi ', err);
    }
}
const getGeneralCalculator=async(url) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/generalcalculator/?slug=${url}`);
        return response.data;
    } catch (err) {
        console.error('error in getGeneralCalculator APi ', err);
    }
}

const getGeneralCalculatorLenders=async() => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/generalcalculatorlenders`);
        return response.data;
    } catch (err) {
        console.error('error in getGeneralCalculatorLenders APi ', err);
    }
}

const getBankCalculatorContent=async(url) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/bankcalculator?slug=${url}`);
        return response.data;
    } catch (err) {
        console.error('error in getBankCalculatorContent APi ', err);
    }
}

const getBankFixedDeposit=async(lender) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/fixed-deposit/?lenders=${lender}`);
        return response.data;
    } catch (err) {
        console.error('error in getBankFixedDeposit APi ', err);
    }
}

const getBankSchemeFixedDeposit=async(lender, scheme) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/fixed-deposit/?lenders=${lender}&scheme=${scheme}`);
        return response.data;
    } catch (err) {
        console.error('error in getBankSchemeFixedDeposit APi ', err);
    }
}

const getSchemeType=async(scheme) => {
    try {
        const response = await httpClient.get(process.env.BLOG_BASEURL+`/schemes/?slug=${scheme}`);
        return response.data;
    } catch (err) {
        console.error('error in getSchemeType APi ', err);
    }
}

export {
    getLatestBlog,
    getProductContent,
    getBankContent,
    getBankProductContent,
    ProductInterestRateContent,
    getGeneralContent,
    getCategoryBlog,
    getGeneralCalculator,
    getGeneralCatContent,
    getBankFixedDeposit,
    getBankSchemeFixedDeposit,
    getSchemeType,
    getAmcContent,
    getMutualFundsCategory,
    getAmcCategory,
    getCategoryBlogHome,
    getBankCalculatorContent,
    getGeneralCalculatorLenders
}