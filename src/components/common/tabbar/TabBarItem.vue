<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot  name="item-icon" />
    </div>
    <div v-else>
      <slot name="item-icon-active"/>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"/>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link: String,
      activeColor: {
        type: String,
        default: 'blue'
      }
    },
    data(){
      return {
        //isActive: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.link) !== -1;
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {};
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.link);
        // console.log("itemClick");
      }
    }

  }
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;

    font-size: 14px;
  }
  .tab-bar-item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;

    vertical-align: middle;
  }
  .active{
    color: red;
  }
</style>