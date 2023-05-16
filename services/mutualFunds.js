import { httpClient } from "../helpers/http-client";
const getAmc = async(queryString, type = "") => {
    try {
        const response = await httpClient.get(process.env.AMC_BASEURL+`/mutual-funds/${queryString}`);
        return type === "table" ? response : type === "search" ? response.data.data : response.data;
    } catch (err) {
        console.error('error in getAmc APi ', err);
    }
}
const getAmcApi = async(queryString, type = "") => {
    try {
        const response = await httpClient.get(process.env.BASE_URL+`/api/mutualFunds/?queryString=${queryString}`);
        return type === "table" ? response.data : type === "search" ? response.data.data : response.data;          
    } catch (err) {
        console.error('error in getAmc APi ', err);
    }
}
const getFundsSearch = async(queryString) => {
    try {
        const response = await httpClient.get(process.env.AMC_BASEURL+`/mutual-funds/elastic/text?keyword=${queryString}`);
        return response.data;          
    } catch (err) {
        console.error('error in getAmc APi ', err);
    }
}
const filterTable = async(category, duration=1) => {
    try {
        const response = await httpClient.get(process.env.BASE_URL+`/api/filterTable/?category=${category}&duration=${duration}`);
        return response.data.data;          
    } catch (err) {
        console.error('error in filterTable APi ', err);
    }
}
// const filterTable = async (category, duration=1) => {
//     try {
//         let str = []
//         let createFilterQueryString = (f) => {
//         for (var p in f)
//         if (f.hasOwnProperty(p)) {
//             str.push(`f[${encodeURIComponent(p)}]` + "=" + encodeURIComponent(f[p]));
//         }
//         return str.join("&");
//         }
//        let masterDefault = {
//         sub_category: category
//        };
//        const sub_category = createFilterQueryString(masterDefault)
//         const response = await httpClient.get(process.env.AMC_BASEURL +`/mutual-funds/amc?${sub_category}&f[sipDuration]=${duration}&limit=5&page=1`);
//         return response.data.data;
//     } catch (err) {
//         console.error('error in filterTable api ', err);
//     }
// }
const fundDetails = async (fund, detail) => {
    try {
        const response =
        await httpClient.get(process.env.AMC_BASEURL +`/mutual-funds/amc/${fund}/${detail}`);
        return response.data.data;
    } catch (err) {
        console.error('error in fundDetail api ', err);
    }
}

const graphApi = async (schemeCode,duration='1') => {
    try {
        const response = await httpClient.get(process.env.AMC_BASEURL+`/mutual-funds/amc/navHist/${schemeCode}?type=chart,graph&duration=${duration}`);
        return response.data.data;          
    } catch (err) {
        console.error('error in graphApi APi ', err);
    }
}

export {
    getAmc,filterTable,fundDetails,getAmcApi,getFundsSearch, graphApi
}