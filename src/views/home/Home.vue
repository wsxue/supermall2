<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
<!--    <scroll class="content" :backTop="backTop" @back-top="backTopChange()">-->
    <scroll class="content"
            ref="scroll"
            @pos-listener="posListener"
            :probe-type="3"
            :pull-up-load="true" @pulling-up="loadMore">
      <home-swiper :banners="banners"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control class="tab-control" :titles="titles" @item-click="itemClick"/>
      <goods-list :goods="showGoods" />
    </scroll>
<!--    <back-top @backt-click="backtClick"/>-->
    <back-top v-show=isShowBackTop @click.native="backtClick()"/>
  </div>
</template>

<script>
  import HomeSwiper from "./childComps/HomeSwiper"
  import RecommendView from "./childComps/RecommendView"
  import FeatureView from "./childComps/FeatureView"

  import NavBar from "components/common/navbar/NavBar"
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goods/GoodsList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"

  import {getHomeMultidata, getHomeGoods} from "network/home"

  export default {
    name: "home",
    data() {
      return {
        banners: [],
        recommends: [],
        titles: ['流行', '新款', '精选'],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        goodsType: 'pop',
        // backTop: false
        isShowBackTop: false
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.goodsType].list
      }
    },
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    created() {
      //1. 请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    mounted() {
      //创建itemImgLoad事件的监听
      this.$bus.$on('itemImgLoad', () => {
        // console.log('监听itemImgLoad');
        this.$refs.scroll.refresh()
      })
    },
    methods: {
      /**
       *   created()内方法，与网络请求相关
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page = page
        })
      },
      /**
       * 子组件事件监听方法
       */
      itemClick(index) {
        // console.log(index);
        this.goodsType = Object.keys(this.goods)[index];
      },
      // back-top实现思路1:
      // backtClick() {
      //   // console.log('backtClick');
      //   this.backTop = true
      // },
      // backTopChange() {
      //   this.backTop = false
      // }
      // back-top实现思路2
      backtClick() {
        // console.log('backtClick');
        this.$refs.scroll.scrollTo(0, 0)
      },
      posListener(y) {
        this.isShowBackTop = -y > 1145 ? true : false
      },
      loadMore() {
        this.getHomeGoods(this.goodsType);
        this.$refs.scroll.finishPullUp();
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 44px;
    height: 100vh;
  }

  .home-nav {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 2;
    background-color: var(--color-tint);
    color: white;
  }

  .tab-control {
    position: sticky;
    top: 44px;
  }

  /*.content {*/
  /*  height: calc(100% - 44px);*/
  /*  overflow: hidden;*/
  /*}*/

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }
</style>