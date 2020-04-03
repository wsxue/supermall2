<template>
  <div id="tab-bar">
   <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar",
    comments: {
    }
  }
</script>

<style scoped>
  #tab-bar {
    display: flex;
    position: fixed;
    left: 0;
    right:0;
    bottom: 0;
    z-index: 2;

    height: 49px;
    background: #f6f6f6;

    text-align: center;

    box-shadow: 0px -3px 3px rgba(100,100,100,.1);
  }
</style>