import BackTop from "components/content/backTop/BackTop"

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backtClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    }
  }
}