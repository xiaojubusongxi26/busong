import http from '@/utils/axios/http'
/**
 *  @parms resquest 请求地址 例如：http://197.82.15.15:8088/request/...
 *  @param '/testIp'代表vue-cil中config，index.js中配置的代理
 */
let resquest = "/open"

// 获取验证码-手机号
export function sendVerificationCodeByPhone(params){
  return http.post(`${resquest}/thirdpart/sms/send`,params)
}
// 获取验证码-邮箱
export function sendVerificationCodeByEmail(params){
  return http.post(`${resquest}/thirdpart/email/send`,params)
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
