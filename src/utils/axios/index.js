import axios from 'axios';
import QueryString from 'qs';
function axiosCustom() {
    const instance = axios.create({
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-type': 'application/x-www-form-urlencoded',
            'Authorization': localStorage.getItem('token') ? localStorage.getItem('token') : '',
        },
        timeout: 1000,
    });

    const handleSuccess = (respone) => {
        return respone;
    };
    const handleError = (error) => {
        return Promise.reject(error);
    };
    axios.interceptors.request.use(handleSuccess, handleError);
    return {
        callApi: async (method, url, payload, params) => {
            try {
                const result = await instance({
                    method,
                    url,
                    data: QueryString.stringify(payload) || null,
                    params: QueryString.stringify(params) || null,
                });
                return result;
            } catch (error) {
                throw new Error(error + '');
            }
        },
    };
}
export default axiosCustom;
