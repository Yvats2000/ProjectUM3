import { httpClient } from "../helpers/http-client";

const getProduct=async() => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/product`);
        return response.data;
    } catch (err) {
        console.error('error in getProduct APi ', err);
    }
}

const getProductPlans=async() => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/product/plans`);
        return response.data;
    } catch (err) {
        console.error('error in getProductPlan APi ', err);
    }
}

const getLoanType=async(loanType) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/product/${loanType}`);
        return response.data;
    } catch (err) {
        console.error('error in getLoanType APi ', err);
    }
}
const getLoanTypeByCategory=async(loanType) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/product/${loanType}?category=true`);
        return response.data;
    } catch (err) {
        console.error('error in getLoanType APi ', err);
    }
}

export {
    getProduct,
    getProductPlans,
    getLoanType,
    getLoanTypeByCategory
}