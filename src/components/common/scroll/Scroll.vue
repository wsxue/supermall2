<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null,
      }
    },
    props: {
      // back-top实现思路1:
      // backTop: {
      //   type: Boolean,
      //   default() {
      //     return false
      //   }
      // }
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },
      pullUpLoad: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      });

      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('上拉加载');
          // 发送网络请求，处理数据
          this.$emit('pulling-up')
        })
      }

      this.scroll.on('scroll', (position) => {
        // console.log(position);
        this.$emit('pos-listener', position.y)
      })
    },
    // back-top实现思路1:
    // updated() {
    //   if(this.backTop) {
    //     this.scroll.scrollTo(0, 0, 2000);
    //     this.$emit('back-top')
    //   }
    // }
    methods: {
      scrollTo(x, y, time=2000) {
        // console.log('scrollTo');
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
        // console.log('refresh')
      }
    }

  }
</script>

<style scoped>

</style>