<template>
  <div class="footer">
    <div class="mark-footer">
      <ul>
        <li><a href="javascript:;">关于不颂</a></li>
        <li><a href="javascript:;">联系我们</a></li>
        <li><a href="javascript:;">友情链接</a></li>
        <li><a href="javascript:;">资源导航</a></li>
      </ul>
      <div style="width:300px;margin:0 auto; padding:20px 0;" class="beian">
        <!-- http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=51012202001137 -->
        <a target="_blank" href="http://www.beian.gov.cn" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
<!--          <img src="@/assets/images/备案图标.png" style="float:left;"/>-->
          <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;">
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/config.scss';

.footer{
  width: 100%;
  height: 30vh;
  display: block;
  background: #282828;
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 2;
  a{
    text-decoration: none;
    color: #ffffff;
  }
  .mark-footer{
    width: 100%;
    height: 100%;
    display: flex;
    backdrop-filter: blur(3px);
    flex-direction: column;
    justify-content: center;
    p{
      text-align: center;
    }
    ul{
      list-style: none;
      margin: 0 auto;
      li{
        display: inline-block;
        a {
          padding: 0 20px;
          &:hover{
            color: #f5f5f5;
          }
        }
      }
      li:not(:last-child) {
        a {
          border-right: 2px solid #e2e2e2;
        }
      }
    }
    .beian{
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 14px;
    }
  }
}
</style>
