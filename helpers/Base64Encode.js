import { Base64  } from 'js-base64';
const encrypt_object = (req,type) => {
    if (type === 'Object') {
        const encoded = Base64.encode(JSON.stringify(req));
        return encoded;
    } else {
        const encoded = Base64.encode(req);
        return encoded;
    }
};
const decrypt_object = (req, type) => {
    if (type === 'Object') {
        const decoded = JSON.parse(Base64.decode(req));
        return decoded;
    } else {
        const decoded = Base64.decode(req);
        return decoded;
    }
};
  
export{encrypt_object,decrypt_object}