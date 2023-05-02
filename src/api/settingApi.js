import http from '@/utils/axios/http'

let request = "/open"

// 修改用户信息
export function modifyUserInfo(params){
  return http.post(`${request}/user/modify/info`,params)
}

// 解绑邮箱
export function unBindingEmail(params){
  return http.post(`${request}/user/unbind/email`,params)
}


// 解绑手机号
export function unBindingMobile(params){
  return http.post(`${request}/user/unbind/mobile`,params)
}

//
