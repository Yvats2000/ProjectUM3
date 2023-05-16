import { httpClient } from "../helpers/http-client";
import {encrypt_object,decrypt_object} from "../helpers/Base64Encode"
const SendOtp = async (data) => {
    
    let headers = {    
        vendor_type:process.env.CREDIT_SCORE_VENDOR_TYPE,
        source:process.env.CREDIT_SCORE_SOURCE,
        vendor:process.env.CREDIT_SCORE_VENDOR
    }
    let api_body = encrypt_object(data, 'Object');
    let headerEncode = encrypt_object(headers, 'Object');
    try {
       
        const response = await httpClient.post(process.env.API_BASEURL + `/creditScore/register`, {api_body},
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
const SendOtpThree = async (data) => {
    
    let headers = {    
        vendor_type:process.env.CREDIT_SCORE_VENDOR_TYPE,
        source:process.env.CREDIT_SCORE_SOURCE,
        vendor:process.env.CREDIT_SCORE_VENDOR
    }    
    let api_body = encrypt_object(data, 'Object');
    let headerEncode = encrypt_object(headers, 'Object');
    try {
       
        const response = await httpClient.post(process.env.API_BASEURL + `/creditScore/register`, {api_body},
            {
                headers: {
                    api_header : headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && err.response.data.error=="1001001-NOHIT"?err.response.data.error:decrypt_object(err.response.data.message), "status" : err.response.status}
    }
}
const OtpCheck = async (data, token) => {
    let headers = {
        source:process.env.CREDIT_SCORE_SOURCE,
        authorization:`Bearer ${token}`,
    }
    let api_body = encrypt_object(data, 'Object');
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/creditScore/validate`,{api_body},
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
const getCreditReport = async (token) => {
    let headers = {
        authorization: `Bearer ${token}`,
        vendorName: process.env.CREDIT_SCORE_VENDOR_NAME
    }
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/creditScore/report`,
            {
                headers: {
                    api_header: headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && decrypt_object(err.response.data.message),"status":err.response.status}
    }
}
const downloadCreditReport = async (token) => {
    let headers = {
        authorization: `Bearer ${token}`,
        vendor:process.env.CREDIT_SCORE_VENDOR
    }
    let headerEncode = encrypt_object(headers, 'Object');
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/creditScore/download/user/report`,
            {
                headers: {
                    api_header: headerEncode
                },
            }
        );
        return response;
    } catch (err) {
        return {"message" :  err.response &&  err.response.data && decrypt_object(err.response.data.message),"status":err.response.status}
    }
}
export{SendOtp,OtpCheck,getCreditReport,SendOtpThree,downloadCreditReport}