<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center" class="title">购物街</div></nav-bar>
    <tab-control v-show="tabFixd"
                 class="tab-content"
                 :titles="titles"
                 @item-click="itemClick" ref="tabControl1"/>
<!--    <scroll class="content" :backTop="backTop" @back-top="backTopChange()">-->
    <scroll class="content"
            ref="scroll"
            @pos-listener="posListener"
            :probe-type="3"
            :pull-up-load="true"
            @pulling-up="loadMore">
      <home-swiper :banners="banners" @img-load="swiperImgLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="titles"
                   @item-click="itemClick" ref="tabControl2"/>
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
  import {debounce} from "common/utils"

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
        isShowBackTop: false,
        tabOffsetTop: 0,
        tabFixd: false,
        saveY: 0
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
      /**
       *  1.图片加载防抖处理
       */
      //返回值是一个函数refresh,执行该函数时带()
      const refresh = debounce(this.$refs.scroll.refresh, 100)
      //创建itemImgLoad事件的监听
      this.$bus.$on('itemImgLoad', () => {
        // console.log('监听itemImgLoad');
        //执行防抖操作
        refresh()
      })
    },
    updated() {

    },
    activated() {
      console.log('activated    ' + this.saveY)
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y
      console.log('deactivated    ' + this.saveY);
    },
    destroyed() {
      // console.log('home destrory');
    },
    methods: {
      /**
       *  1. created()内方法，与网络请求相关
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
       * 2. 子组件事件监听方法
       */
      itemClick(index) {
        // console.log(index);
        this.goodsType = Object.keys(this.goods)[index];
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
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
        // console.log(y)
        this.isShowBackTop = -y > 1145 ? true : false
        this.tabFixd = -y > this.tabOffsetTop ? true : false
      },
      loadMore() {
        this.getHomeGoods(this.goodsType);
        this.$refs.scroll.finishPullUp();
      },
      swiperImgLoad() {
        // console.log(this.$refs.tabControl2.$el.offsetTop)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
  }

  .home-nav {
    /*在使用原生滚动时，为了不让导航跟随滚动而滚动使用了Fixed*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    z-index: 2;
    background-color: var(--color-tint);
    color: white;
  }
  .tab-content {
    /*position: fixed;*/
    /*top: 44px;*/
    /*left: 0;*/
    /*right: 0;*/
    position: relative;
    z-index: 2;
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

    overflow: hidden;
  }
</style>