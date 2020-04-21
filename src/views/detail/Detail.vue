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
    <scroll class="context" ref="scroll">
      <detail-swiper :banners="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info :item-params="itemParams"></detail-params-info>
    </scroll>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "components/common/scroll/Scroll"

  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamsInfo from "./childComps/DetailParamsInfo"

  import {getDetail, Goods, Shop, ItemParams} from "network/detail"

  export default {
    name: "Detail",
    components: {
      NavBar,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamsInfo
    },
    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shopInfo: {},
        detailInfo: {},
        itemParams: {}
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
          // 4. 获取商品详细信息
          this.detailInfo = res.result.detailInfo
          // 5. 获取参数信息
          this.itemParams = new ItemParams(res.result.itemParams)
        })
      },
      imageLoad() {
        // console.log("imageLoad")
        this.$refs.scroll.refresh()
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 3;

    background: white;
    height: 100vh;
  }
  .context {
    height: calc(100% - 44px)
  }
  .detail-nav {
    position: relative;
    z-index: 1;

    background: #fff;
  }
  .back{
    padding-top: 10px;
    line-height: 34px;
  }
</style>