import { httpClient } from "../helpers/http-client";
const goldCityPrice = async(queryString) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/master/`+queryString);
        return response.data;
    } catch (err) {
        console.error('error in getMaster APi ', err);
    }
}
const cityMaster = async(queryString) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/master/metalCity`);
        return response.data;
    } catch (err) {
        console.error('error in getMaster APi ', err);
    }
}
export{goldCityPrice,cityMaster}