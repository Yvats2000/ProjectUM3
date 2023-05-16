import { httpClient } from "../helpers/http-client";
import { Base64 } from 'js-base64';
import {encrypt_object,decrypt_object} from "../helpers/Base64Encode"
const loginSendOtp = async (data) => {
    let headers = {
        source:process.env.LOGIN_SOURCE,
    }
    let api_body = encrypt_object(data, 'Object');
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/user/send`,{api_body},
            {
                headers: {
                    api_header : headerEncode
                },
            }
        );
        return  response;
    } catch (err) {
        return {"message" :  err.response && err.response.data && err.response.data.message,"status" : err.response.status}
    }
}
const loginOtpVerify = async (data) => {
    let headers = {
        source:process.env.LOGIN_SOURCE,
    }
    let api_body = encrypt_object(data, 'Object');
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.post(process.env.API_BASEURL + `/user/verify`, { api_body },
            {
                headers: {
                    api_header : headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message}
    }
}
const logOut = async (token) => {
    let headers = {
        Authorization:`Bearer ${token}`,
    }
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/user/logout`,
            {
                headers: {
                    api_header : Base64.encode(headers)
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.message}
    }
}
export{loginSendOtp,loginOtpVerify,logOut}