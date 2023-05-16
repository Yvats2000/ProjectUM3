import { httpClient } from "../helpers/http-client";

const getBanks=async() => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/money-lenders?grp=lenderCategory`);
        return response.data;
    } catch (err) {
        console.error('error in getBanks APi ', err);
    }
}

const getBankDetails=async(bankName) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/money-lenders/${bankName}`);
        return response.data;
    } catch (err) {
        console.error('error in getBankDetails APi ', err);
    }
}

const getBankProductDetails=async(bankName, productName) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/money-lenders/${bankName}/${productName}`);
        return response.data;
    } catch (err) {
        console.error('error in getBankProductDetails APi ', err);
    }
}

const getIfscMaster=async(data) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/ifsc/${data}`);
        return response.data;
    } catch (err) {
        console.error('error in getIfscMaster APi ', err);
    }
}

const productTopBank=async(data) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/money-lenders/top-bank/${data}`);
        return response.data;
    } catch (err) {
        console.error('error in productTopBank APi ', err);
    }
}

export {
    getBanks,
    getBankDetails,
    getBankProductDetails,
    getIfscMaster,
    productTopBank
}