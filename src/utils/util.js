// 点击复制在鼠标右键
import * as verificaty from "@/utils/verificaty";

export const ClickCopy = (value) => {
  let copyInput = document.createElement('input');//创建input元素
  document.body.appendChild(copyInput);//向页面底部追加输入框
  copyInput.setAttribute('value', value);//添加属性，将url赋值给input元素的value属性
  copyInput.select();//选择input元素
  document.execCommand("Copy");//执行复制命令
  //复制之后再删除元素，否则无法成功赋值
  copyInput.remove();//删除动态创建的节点
}

// 校验手机号、邮箱
export const checkAccount = (value) => {
  // 邮箱校验
  const emailReg = /^\w+@[a-z0-9]+\.[a-z]{2,4}$/;
    // 手机校验
  const telReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
  if (telReg.test(value)) {
    return 1
  } else if (emailReg.test(value)) {
    return 2
  } else {
    return 0
  }
}
