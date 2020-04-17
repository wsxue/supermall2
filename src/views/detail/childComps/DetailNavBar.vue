<template>
  <div class="detail-nav-bar">
    <tab-control :titles=titles />
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
    }
  }
</script>

<style scoped>

</style>