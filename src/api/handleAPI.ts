import axiosClient from "./axiosClient"

const handleAPI = async (url: string, data?:object, method?: 'get' | 'put' | 'post' | 'delete') => {
    return await axiosClient( url, {method: method ?? 'get', data})
}

export default handleAPI