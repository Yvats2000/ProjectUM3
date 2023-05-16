import { httpClient } from "../helpers/http-client";

const createLead = async(data) => {
    try {
        const response = await httpClient.post(process.env.LEAD_BASEURL+`/Lead/AddEnquiry`,data,
        {
            headers: {
                api_key:`${process.env.LEAD_API_TOKEN}`,
            },
        }
        );
        return response.data;
    } catch (err) {
        console.error('error in createLead APi ', err);
    }
}

const generateLead = async(data) => {
    try {
        const response = await httpClient.post(process.env.LEAD_BASEURL+`/Lead/CreateLeadFromEligibilityCalculator`,data,
        {
            headers: {
                api_key:`${process.env.LEAD_API_TOKEN}`,
            },
        }
        );
        return response.data;
    } catch (err) {
        console.error('error in generateLead APi ', err);
    }
}

const sendLeadOtp = async(data) => {
    try {
        const response = await httpClient.post(process.env.LEAD_BASEURL+`/Lead/GenerateOtp`,data,
        {
            headers: {
                api_key:`${process.env.LEAD_API_TOKEN}`,
            },
        }
        );
        return response.data;
    } catch (err) {
        console.error('error in sendLeadOtp APi ', err);
    }
}

const verifyLeadOtp = async(data) => {
    try {
        const response = await httpClient.post(process.env.LEAD_BASEURL+`/Lead/VerifyOtp`,data,
        {
            headers: {
                api_key:`${process.env.LEAD_API_TOKEN}`,
            },
        }
        );
        return response.data;
    } catch (err) {
        console.error('error in verifyLeadOtp APi ', err);
    }
}

export {
    generateLead,
    createLead,
    sendLeadOtp,
    verifyLeadOtp
}