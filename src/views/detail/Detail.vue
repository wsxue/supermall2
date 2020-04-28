<template>
  <div id="detail">
    <nav-bar class="detail-nav">
      <div slot="left" class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center">
        <detail-nav-bar :titles="['商品', '参数', '评论', '推荐']" ref="detailNabBar" @navItemClick="navItemClick"/>
      </div>
    </nav-bar>
    <scroll class="context"
            ref="scroll"
            :probe-type="3"
            @pos-listener="posListener">
      <detail-swiper :banners="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shopInfo"/>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"/>
      <detail-params-info ref="params" :item-params="itemParams"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommend"/>
    </scroll>
    <back-top v-show=isShowBackTop @click.native="backtClick()"/>
    <detail-bottom-bar @add-cart="addToCart"/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar"
  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList"

  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamsInfo from "./childComps/DetailParamsInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import {getDetail, Goods, Shop, ItemParams, getRecommend} from "network/detail"

  import {backTopMixin} from "common/mixin"

  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    mixins: [backTopMixin],
    components: {
      NavBar,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      GoodsList
    },

    data() {
      return {
        iid: null,
        topImages: null,
        goods: {},
        shopInfo: {},
        detailInfo: {},
        itemParams: {},
        commentInfo: {},
        recommend: [],
        saveOffsetTops: []
      }
    },
    created() {
      // 1. 得到商品iid
      this.iid = this.$route.params.iid
      // console.log(this.iid)
      // 2. 根据iid请求商品详情数据
      this.getDetail()
      // 3.获取商品推荐信息
      this.getRecommend()
    },
    methods: {
      ...mapActions({
        addCart: 'addToCart'
      }),
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
          // 6. 获取评论信息
          this.commentInfo = res.result.rate.list[0]

        })
      },
      imageLoad() {
        // console.log("imageLoad")
        // 在detail-goods-info组件中已经进行了防抖操作，所以只会调用一次
        this.$refs.scroll.refresh()
        this.saveOffsetTops.push(0)
        this.saveOffsetTops.push(this.$refs.params.$el.offsetTop)
        this.saveOffsetTops.push(this.$refs.comment.$el.offsetTop)
        this.saveOffsetTops.push(this.$refs.recommend.$el.offsetTop)
        // console.log(this.saveOffsetTops)
      },
      getRecommend() {
        getRecommend().then( res => {
          // console.log(res)
          // 7. 获取推荐信息
          this.recommend = res.data.list
        })
      },
      navItemClick(index) {
        // console.log('navItemClick')
        this.$refs.scroll.scrollTo(0, -this.saveOffsetTops[index] + 44, 0)
      },
      posListener(y) {
        const navHeight = 44
        const _y = -y + navHeight
        //1.非自动化判断
        // let _y = -y + navHeight
        // // console.log(this.saveOffsetTops)
        // if( _y < this.saveOffsetTops[1]) {
        //   this.$refs.detailNabBar.$refs.detailTabControl.currentIndex = 0
        // }
        // else if ( _y >= this.saveOffsetTops[1] && _y < this.saveOffsetTops[2]) {
        //   this.$refs.detailNabBar.$refs.detailTabControl.currentIndex = 1
        // }
        // else if (  _y >= this.saveOffsetTops[2] && _y < this.saveOffsetTops[3]) {
        //   this.$refs.detailNabBar.$refs.detailTabControl.currentIndex = 2
        // }
        // else {
        //   this.$refs.detailNabBar.$refs.detailTabControl.currentIndex = 3
        // }
        //2.自动化判断
        const length = this.saveOffsetTops.length
        for(let i=0;i<length;i++){
          if((i<length-1 && _y >= this.saveOffsetTops[i] && _y < this.saveOffsetTops[i+1])
              ||(i==length-1 && _y >= this.saveOffsetTops[i])){
            this.$refs.detailNabBar.$refs.detailTabControl.currentIndex = i
          }
        }
        //3. back-top按钮
        this.isShowBackTop = -y > 800 ? true : false

      },
      addToCart() {
        // 1. 获取商品基本信息
        const product = {}
        product.iid = this.iid
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.lowNowPrice
        product.checked = true
        // 2. 把数据传入Vuex
        // this.$store.dispatch('addToCart', product).then(res => {
        //   console.log(res);
        // })
        // 通过mapActions调用actions方法
        this.addCart(product).then(res => {
          this.$toast.show(res)
        })
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
    height: calc(100% - 44px - 52px);
    overflow: hidden;
  }
  .detail-nav {
    position: relative;

    background: #fff;
  }
  .back{
    padding-top: 10px;
    line-height: 34px;
  }
</style>