<template>
  <div class="footer">
    <div class="mark-footer">
      <p>@2021-2022 By 小橘不颂兮</p>
      <p>直上青天揽日月，欲倾东海洗乾坤</p>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

.footer{
  width: 100%;
  height: 30vh;
  display: block;
  background-color: rgba($color: #eefaff, $alpha: 0);
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 0;
  .mark-footer{
    width: 100%;
    height: 100%;
    display: flex;
    backdrop-filter: blur(3px);
    flex-direction: column;
    justify-content: center;
    p{
      text-align: center;
      color: #fff;
      font-size: 20px;
      font-weight: bold;
      z-index: 2;
    }
  }
  .mark-footer::before{
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background: #22222288;
    opacity: 0.3;
    z-index: 1;
  }
}
</style>
