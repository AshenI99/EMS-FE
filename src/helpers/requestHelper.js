import axios from "axios";

const baseURL = process.env.REACT_APP_API_ENDPOINT;

const request = async (config) => {
    let defaultHeaders = {}

    const {auth, data, url, method, responseType} = config || {};

    if (auth) {
        const token = localStorage.getItem('token');

        defaultHeaders = {
            ...defaultHeaders,
            'x-auth': `${token}`
        }

    }

    return new Promise((resolve, reject) => {
        axios({
            method: method,
            url: `${baseURL}${url}`,
            headers: defaultHeaders,
            data: data,
            responseType: responseType ? responseType : null
        })
            .then((data) => {
                if(responseType === 'blob'){
                    resolve(data)
                } else {
                    resolve(data.data);
                }
            })
            .catch((error) => {
                if (error.response && error.response.status === 401 && !url.includes('login')) {
                    localStorage.removeItem('token');
                }
                reject(error.response)
            })
    })

}

export default request;