<template>
  <div id="detail">
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">
        <detail-nav-bar :titles="['商品', '参数', '评论', '推荐']"/>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  import DetailNavBar from "./childComps/DetailNavBar"

  export default {
    name: "Detail",
    components: {
      NavBar,
      DetailNavBar
    },
    data() {
      return {
        iid: null
      }
    },
    created() {
      this.iid = this.$route.params.iid
    },
    methods: {
      backClick() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .back{
    padding-top: 10px;
    line-height: 34px;
  }
</style>