import { httpClient } from "../helpers/http-client";

const getFD=async() => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/fixed-deposit`);
        return response.data;
    } catch (err) {
        console.error('error in getFD APi ', err);
    }
}

const getBankFD=async(bankName) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/fixed-deposit/${bankName}`);
        return response.data;
    } catch (err) {
        console.error('error in getBankFD APi ', err);
    }
}

const getBankFDScheme=async(bankName, schemeName) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/fixed-deposit/${bankName}/${schemeName}`);
        return response.data;
    } catch (err) {
        console.error('error in getFD APi ', err);
    }
}

export {
    getFD,
    getBankFD,
    getBankFDScheme
}