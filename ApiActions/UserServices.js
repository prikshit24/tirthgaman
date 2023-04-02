import Api from "./DdConfig/ApiActions";
import { apiPostMethod } from "./DdConfig/ApiPostMethod";

// API of Login
export const login = (data) => {
    return new Promise((resolve, reject) => {
        let url = Api.LOGIN;
        apiPostMethod(url, data)
            .then((res) => {
                resolve(res);
                // console.log('Response from UserService ====>', res)
            })
            .catch((err) => {
                console.log('err',err)
                reject(err);
            });
    });
};