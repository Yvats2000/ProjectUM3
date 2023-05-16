import { httpClient } from "../../helpers/http-client";

export default async function getAmc({query: {queryString=''}}, res) {
    try {
        const response = await httpClient.get(process.env.AMC_BASEURL+`/mutual-funds/${queryString}`);
        res.status(200).json(response.data)
    } catch (error) {
        const {response = ""} = error;
        if(response)  res.status(response.status).json(response.data);
        else res.status(error.status).send(error.message);
    }
  }
