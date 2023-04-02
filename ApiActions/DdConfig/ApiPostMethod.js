import axios from 'axios';

export const apiPostMethod = (url, data) => {
    return new Promise((resolve, reject) => {
        // let headers = {};
        // if (token) {
        //   headers = {
        //     Authorization: `${token}`
        //   };
        // }
        axios
            .post(url, data)
            .then((res) => {
                resolve(res);
                // console.log('Login api response ==>', res)
                // console.log(res?.headers?.authorization)
                // if (!Boolean(token)) {
                //   const token = res?.headers?.authorization;
                //   localStorage.setItem('bearer', token)
                // }
            })
            .catch((err) => {
                reject(err.response)
                console.log("catch error", err);
            });
    });
};