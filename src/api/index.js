import axios from 'axios'
import http from '../utils/request'

//  请求首页数据
export const getData = () => {
    //  返回一个promise对象
    return http.get('/home/getData')
}


export const getUser = (params) => {
    //返回用户列表
    return axios.request({
        url: '/user/getUser',
        method: 'get',
        params
    })
}

export const addUser = (data) => {
    //添加用户
    return axios.post('/user/add', data)
}

export const editUser = (data) => {
    //编辑用户
    return axios.post('/user/edit', data)
}

export const deleteUser = (data) => {
    //删除用户
    return axios.post('/user/deleteUser', data)
}

export const getProduct = (params) => {
    //返回商品列表
    return axios.request({
        url: '/mall/getProduct',
        method: 'get',
        params
    })
}

export const addProduct = (data) => {
    //添加商品
    return axios.post('/mall/add', data)
}

export const editProduct = (data) => {
    //编辑商品
    return axios.post('/mall/edit', data)
}

export const deleteProduct = (data) => {
    //删除商品
    return axios.post('/mall/deleteProduct', data)
}

export const getMenu = (params) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'post',
        data: params
    })
}