<template>
  <div class="detail-nav-bar">
    <tab-control :titles=titles @item-click="itemClick" ref="detailTabControl"/>
  </div>
</template>

<script>
  import TabControl from "components/content/tabControl/TabControl"

  export default {
    name: "DetailNavBar",
    components: {
      TabControl
    },
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      itemClick(index) {
        // console.log(index)
        this.$emit('navItemClick', index)
      }
    }
  }
</script>

<style scoped>

</style>