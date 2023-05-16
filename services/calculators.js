import { httpClient } from "../helpers/http-client";

const balanceCal=async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/balancetransfer`,data,{});
        return response.data;
    } catch (err) {
        console.error('error in balance transfer calculator APi ', err);
    }
}

const emiCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/emi`,data,{});
        return response.data;
    } catch (err) {
        console.error('error in emi calculator APi ', err);
    }
}

const preCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/prepayment`,data,{});
        return response.data;
    } catch (err) {
        console.error('error in prepayment calculator APi ', err);
    }
}

const eligibilityCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.API_BASEURL+`/calculator`,data);
        return response.data;
    } catch (err) {
        console.error('error in eligibility calculator APi ', err);
    }
}

const eligibilityCalApply =async(leadIdE, lenderSlug) => {
    try {
        const response = await httpClient.get(process.env.API_BASEURL+`/calculator/apply/`+lenderSlug+`?code=`+leadIdE);
        return response.data;
    } catch (err) {
        console.error('error in eligibility calculator apply APi ', err);
    }
}
const sipCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/sip`,data);
        return response.data;
    } catch (err) {
        console.error('error in eligibility calculator APi ', err);
    }
}

const fdCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/fd`,data);
        return response.data;
    } catch (err) {
        console.error('error in eligibility calculator APi ', err);
    }
}
const hraCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/hra`,data);
        return response.data;
    } catch (err) {
        console.error('error in HRA calculator APi ', err);
        return {"message" :  err.response &&  err.response.data && err.response.data.message}
        
    }
}

const gratuityCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/gratuity`,data);
        return response.data;
    } catch (err) {
        console.error('error in Gratuity calculator APi ', err);
    }
}

const epfCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/epf`,data);
        return response.data;
    } catch (err) {
        console.error('error in EPF calculator APi ', err);
    }
}

const gstCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/gst`,data);
        return response.data;
    } catch (err) {
        console.error('error in GST calculator APi ', err);
    }
}

const npsCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/nps`,data);
        return response.data;
    } catch (err) {
        console.error('error in NPS calculator APi ', err);
    }
}

const poRdCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/rd`,data);
        return response.data;
    } catch (err) {
        console.error('error in Post Office RD calculator APi ', err);
    }
}

const ppfCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/ppf`,data);
        return response.data;
    } catch (err) {
        console.error('error in PPF calculator APi ', err);
    }
}

const rdCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/rd`,data);
        return response.data;
    } catch (err) {
        console.error('error in RD calculator APi ', err);
    }
}

const swpCal =async(data) => {
    try {
        const response = await httpClient.post(process.env.APPLICATION_FLOW_BASEURL+`/calculator/swp`,data);
        return response.data;
    } catch (err) {
        console.error('error in SWP calculator APi ', err);
    }
}

export {
    balanceCal,
    emiCal,
    preCal,
    eligibilityCal,
    eligibilityCalApply,
    sipCal,
    fdCal,
    hraCal,
    gratuityCal,
    epfCal,
    gstCal,
    npsCal,
    poRdCal,
    ppfCal,
    rdCal,
    swpCal
}