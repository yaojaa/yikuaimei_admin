import axios from 'axios'

const request = axios.create({
    baseURL: 'http://dev.countinsight.com/api',
})

// 请求附带登录信息
request.interceptors.request.use((config) => {
    const token = window.$store.state.user.token

    if (config.data && config.data instanceof FormData) {
        config.data.append('token', token)
        return config
    }

    config.data = {
        ...config.data,
        token,
    }
    return config
})

/**
 * 发送异步请求
 */
export const fetch = ({
    uri,
    data,
    params,
    method,
    headers,
    timeout,
    globalError = true,
    loading = false
}) => {
    return new Promise((resolve, reject) => {
        /**
         * 处理请求异常
         */
        const processError = (error) => {
            // 异常信息转意
            const message = '请求失败'

            reject({
                msg: message,
                code: error.errorCode,
            })

            // 返回异常错误提示
            if (globalError) {
                console.log({
                    content: message,
                    duration: 3000,
                    icon: 'warn',
                })
            }
        }

        // 请求结果处理
        const processResult = (responseData) => {
            if (loading) {
                console.log.hide()
            }

            const result = responseData.data

            if (result.errorCode !== 10000) {
                processError(result)
            } else {
                resolve(result.data)
            }
        }

        if (loading) {
            console.log.loading('加载中', 0, true)
        }

        request({
                url: uri,
                data,
                params,
                method,
                headers,
                timeout,
                needEncrypt: true,
            })
            .then(processResult)
            .catch(processError)
    })
}

/**
 * get请求
 */
export const get = (options) => {
    return fetch({
        method: 'get',
        ...options,
    })
}

/**
 * post请求
 */
export const post = (options) => {
    return fetch({
        method: 'post',
        ...options,
    })
}