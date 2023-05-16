import { httpClient } from "../../helpers/http-client";

export default async function filterTable({query: {category='',duration=''}}, res) {
    try {
        let str = []
        let createFilterQueryString = (f) => {
        for (var p in f)
        if (f.hasOwnProperty(p)) {
            str.push(`f[${encodeURIComponent(p)}]` + "=" + encodeURIComponent(f[p]));
        }
        return str.join("&");
        }
       let masterDefault = {
        sub_category: category
       };
       const sub_category = createFilterQueryString(masterDefault)
        const response = await httpClient.get(process.env.AMC_BASEURL +`/mutual-funds/amc?${sub_category}&f[sipDuration]=${duration}&limit=10&page=1`);
        res.status(200).json(response.data)
    } catch (error) {
        const {response = ""} = error;
        if(response)  res.status(response.status).json(response.data);
        else res.status(error.status).send(error.message);
    }
  }
