import { httpClient } from "../helpers/http-client";

const contactUs=async(data) => {
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/lead`,data);
        return response.data;
    } catch (err) {
        console.error('error in contact us APi ', err);
    }
}

const BecomePatner=async(data) => {
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/lead/sms`,data);
        return response.data;
    } catch (err) {
        console.error('error in become partner APi ', err);
    }
}

export {
    contactUs,
    BecomePatner
}