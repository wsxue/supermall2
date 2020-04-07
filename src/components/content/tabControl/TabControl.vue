<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         :class="{'tab-control-item': true ,'tab-control-item-active': index===currentIndex }"
         @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        // console.log(index);
        this.$emit('item-click', index)
      }
    }
  }
</script>

<style scoped>
 .tab-control {
   display: flex;
   /*z-index: 2;*/

   width: 100%;
   background: white;

   font-size: 14px;

   text-align: center;
 }

 .tab-control-item {
   flex: 1;

   height: 40px;

   line-height: 40px;
 }

 .tab-control-item span{
   padding-bottom: 5px;
 }

 .tab-control-item-active {
   color: var(--color-high-text);
 }

 .tab-control-item-active span {
   border-bottom: 2px solid var(--color-tint);
 }
</style>