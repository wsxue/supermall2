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
    <detail-swiper :banners="topImages"/>
    <detail-base-info :goods="goods"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"

  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"

  import {getDetail, Goods, Shop} from "network/detail"

  export default {
    name: "Detail",
    components: {
      NavBar,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo
    },
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shopInfo: {}
      }
    },
    created() {
      // 1. 得到商品iid
      this.iid = this.$route.params.iid
      // console.log(this.iid)
      //2. 根据iid请求商品详情数据
      this.getDetail()
    },
    methods: {
      backClick() {
        this.$router.back()
      },
      getDetail() {
        getDetail(this.iid).then( res => {
          console.log(res);
          // 1. 获取topImages数据
          this.topImages = res.result.itemInfo.topImages
          // 2. 获取goods detail数据
          this.goods = new Goods(res.result.itemInfo, res.result.columns, res.result.shopInfo.services)
          // 3. 获取商铺信息
          this.shopInfo = new Shop(res.result.shopInfo)
        })
      }
    }
  }
</script>

<style scoped>
  .detail-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;

    background: #fff;
  }
  .back{
    padding-top: 10px;
    line-height: 34px;
  }
</style>