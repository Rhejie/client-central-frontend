import axios from 'axios'
import { accessToken } from './local_storage'


export function http() {
    return axios.create({
        baseURL: '/api/client',
        headers: {
            Authorization: 'Bearer ' + accessToken()
        }
    })
}

export function httpServer() {
    return axios.create({
        baseURL: '/api/client',
        headers: {
            Authorization: 'Bearer '+ accessToken(),
            'Content-Type': 'multipart/form-data'
        },
    })
}

export const domainHttp = () => {
    let currentUrl = window.location.href;
    let arr = currentUrl.split('/')
    return arr[0] + '//'

}