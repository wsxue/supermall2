<template>
  <swiper class="detail-swiper">
    <swiper-item v-for="(item, index) in banners">
      <a href="">
        <img :src="item" alt="详情轮播图">
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import {Swiper, SwiperItem} from "components/common/swiper/index.js"

  export default {
    name: "DetailSwiper",
    components: {
      Swiper,
      SwiperItem
    },
    data() {
      return {
      }
    },
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
  }
</style>