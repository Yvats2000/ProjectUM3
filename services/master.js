import { httpClient } from "../helpers/http-client";

const getMaster=async(data) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/master?attributes=`+data);
        return response.data;
    } catch (err) {
        console.error('error in getMaster APi ', err);
    }
}

const getSitemapMaster=async(data) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/sitemap?attributes=`+data);
        return response.data;
    } catch (err) {
        console.error('error in getSitemapMaster APi ', err);
    }
}

const getCityMaster=async(selectedState) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/master/${selectedState}/cities`);
        return response.data;
    } catch (err) {
        console.error('error in getCityMaster APi ', err);
    }
}
const companyMaster = async (data) => {
    let payLoad ={
        "name":data,
        "count":10
    }
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/master/company`,payLoad);
        return response.data;
    } catch (err) {
        console.error('error in getCityMaster APi ', err.response);
    }
}
const getCivilMaster = async ()=>{
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/creditScore/master/cibil`);
        return response.data;
    } catch (err) {
        console.error('Civil master API Error ', err);
    }
}
export {
    getMaster,
    getSitemapMaster,
    getCityMaster,
    companyMaster,
    getCivilMaster
}