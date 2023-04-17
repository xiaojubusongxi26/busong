import http from '@/utils/axios/http'
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/auth"

// 用户注册：手机号 + 验证码
export function registerByMobileCode(params){
  return http.post(`${resquest}/register/mobile`,params)
}

// 用户登录：手机号 + 验证码
export function loginByMobileCode(params){
  return http.post(`${resquest}/login/mobile`,params)
}

// 登录：用户名+密码
export function loginByNamePwd(params){
  return http.post(`${resquest}/login/name/1`,params)
}





// get请求
export function getListAPI(params){
  return http.get(`${resquest}/getList.json`,params)
}
// post请求
export function postFormAPI(params){
  return http.post(`${resquest}/postForm.json`,params)
}
// put 请求
export function putSomeAPI(params){
  return http.put(`${resquest}/putSome.json`,params)
}
// delete 请求
export function deleteListAPI(params){
  return http.delete(`${resquest}/deleteList.json`,params)
}
