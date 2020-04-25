<template>
  <div v-if="Object.keys(itemParams).length !== 0" class="params-info">
    <div class="info-key">{{itemParams.info.key}}</div>
    <table>
      <tr v-for="(tr, index) in itemParams.size[0]" :key="index">
        <td v-for="(td, indey) in tr" :key="indey">{{td}}</td>
      </tr>
    </table>

    <table>
      <tr v-for="(item,index) in itemParams.info.set" :key="index">
        <td class="td-key">{{item.key}}</td>
        <td class="td-value">{{item.value}}</td>
      </tr>
    </table>

  </div>
</template>

<script>
  export default {
    name: "DetailParamsInfo",
    props: {
      itemParams: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .params-info {
    padding: 10px 15px;
    font-size: 14px;
    border-bottom: 5px solid #f2f5f8;
  }
  .info-key {
    color: #333;
    font-size: 15px;
    margin-bottom: 15px;
  }
  .params-info table{
    width: 100%;
    border-collapse: collapse;
    padding: 5px 0px 0px 5px;
    border-top: 1px solid rgba(0, 0, 0, .1);

    font-size: 13px;
  }
  .params-info table tr {
    height: 42px;
  }

  .params-info table tr td {
    border-bottom: 1px solid rgba(100, 100, 100,.1);
  }

  .td-key {
    /*保证key不换行，设置white-space或者指定width*/
    white-space: nowrap;
    color: #333;
  }
  .td-value {
    padding-left: 30px;
    color: red;
  }
</style>