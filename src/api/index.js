/**
 * Created by kai.fantasy on 2017/4/11 0011.
 * 两种封装调用的方式
 * 1. api.request(), 在调用的地方在输入uri
 * 2. 把请求的uri列表放在此js中，方便管理
 */
import axios from 'axios'
import config from '../config'

export default {
    request (method, uri, data = null) {
        if (!method) {
            console.error('API function call requires method argument')
            return
        }

        if (!uri) {
            console.error('API function call requires uri argument')
            return
        }

        var url = config.serverURI + uri
        axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        return axios({method, url, data})
    }
}

// // 登录
// export const requestLogin = params => {
//     return axios.post(`${base}/login`, params).then(res => res.data);
// };
/**
 * aggregate 统计通用接口
 * @param params
 * @returns {Promise.<TResult>|Promise<R>|Promise<R2|R1>}
 */
export const aggregate = params => {
    return axios.post(`${config.serverURI}/charts/aggregate`, params).then(res => res.data);
};

//
// export const getUserList = params => {
//     return axios.get(`${base}/user/list`, {params: params});
// };
