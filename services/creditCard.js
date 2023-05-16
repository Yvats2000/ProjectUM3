import { httpClient } from "../helpers/http-client";
import {encrypt_object,decrypt_object} from "../helpers/Base64Encode";
const getMaster=async(queryString) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/master/cc?${queryString}`);
        return response.data;
    } catch (err) {
        console.error('error in getMaster APi ', err);
    }
}
const SendOtp = async (data, agentToken, agentCode) => {

    let headers = {    
        source:agentToken ? 'CREDIT_CARD_BEAT_APP' : process.env.CREDIT_CARD_SOURCE,
        beat_token:agentToken,
        agent_code:agentCode
    }
    let api_body = encrypt_object(data, 'Object');
    let headerEncode = encrypt_object(headers, 'Object');
    try {
       
        const response = await httpClient.post(process.env.API_BASEURL + `/creditCard/register`, {api_body},
            {
                headers: {
                    api_header : headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && decrypt_object(err.response.data.message)}
    }
}
const OtpCheck = async (data, token) => {
    let headers = {
        source:process.env.CREDIT_CARD_SOURCE,
        authorization:`Bearer ${token}`,
    }
    let api_body = encrypt_object(data, 'Object');
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/creditCard/validate`,{api_body},
            {
                headers: {
                    api_header : headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message, "status" : err.response.status}
    }
}
const SubmitData = async (data, token) => {
    let headers = {
        source:process.env.CREDIT_CARD_SOURCE,
        authorization:`Bearer ${token}`,
    }
    let api_body = encrypt_object(data, 'Object');
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/creditCard/submit`,{api_body},
            {
                headers: {
                    api_header : headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message, "status" : err.response &&  err.response.data && err.response.data.status}
    }
}
const PrefillData = async (token) => {
    let headers = {
        source:process.env.CREDIT_CARD_SOURCE,
        authorization:`Bearer ${token}`,
    }
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/creditCard/prefill`,
            {
                headers: {
                    api_header : headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message, "status" : err.response.status}
    }
}
const UserFetch = async (token) => {
    let headers = {
        authorization:`Bearer ${token}`,
    }
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/creditCard/user/fetch`,
            {
                headers: {
                    api_header : headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message, "status" : err.response.status}
    }
}
export {
    getMaster,
    SendOtp,
    OtpCheck,
    SubmitData,
    PrefillData,
    UserFetch
}