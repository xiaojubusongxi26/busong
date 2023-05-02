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

// 用户注册：邮箱 + 验证码
export function registerByEmailCode(params){
  return http.post(`${resquest}/register/email`,params)
}

// 用户登录：手机号 + 验证码
export function loginByMobileCode(params){
  return http.post(`${resquest}/login/mobile`,params)
}

// 用户登录：邮箱 + 验证码
export function loginByEmailCode(params){
  return http.post(`${resquest}/login/name/email`,params)
}

// 登录：用户名+密码
export function loginByNamePwd(params){
  return http.post(`${resquest}/login/name/1`,params)
}

// 修改密码： 手机号 + 验证码
export function resetByMobile(params){
  return http.post(`${resquest}/reset/password/mobile`,params)
}

// 修改密码： 邮箱 + 验证码
export function resetByEmail(params){
  return http.post(`${resquest}/reset/password/email`,params)
}


