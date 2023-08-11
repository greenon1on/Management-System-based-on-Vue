import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import mallApi from './mockServeData/mall'
import permissionApi from './mockServeData/permission'

//  定义mock请求拦截
Mock.mock('/api/home/getData', homeApi.getStatisticalData)

// User mock
Mock.mock(/user\/add/,'post', userApi.createUser)
Mock.mock(/user\/edit/,'post', userApi.updateUser)
Mock.mock(/user\/getUser/, userApi.getUserList)
Mock.mock(/user\/deleteUser/,'post', userApi.deleteUser)
Mock.mock(/permission\/getMenu/,'post', permissionApi.getMenu)
// Mall mock
Mock.mock(/mall\/add/,'post', mallApi.createProduct)
Mock.mock(/mall\/edit/,'post', mallApi.updateProduct)
Mock.mock(/mall\/getProduct/, mallApi.getProductList)
Mock.mock(/mall\/deleteProduct/,'post', mallApi.deleteProduct)
