import http from '@/utils/axios/http'

let request = "/open"

// 上传文件
export function uploadFile(params){
  return http.post(`${request}/thirdpart/oss/upload/policy`,params)
}
