<template>
<!--  <div class="back-top" @click="backtClick">-->
  <div class="back-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop",
    methods: {
      // back-top实现思路1:
      // backtClick() {
      //   // console.log('--------');
      //   this.$emit('backt-click')
      // }
    }
  }
</script>

<style scoped>
  .back-top {
    position: fixed;
    right: 10px;
    bottom: 49px;
  }
  .back-top img {
    width: 43px;
    height: 43px;
  }
</style>