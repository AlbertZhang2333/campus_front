
<template>
    <div>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="商品信息管理" name="ItemAdmin">
          <Item></Item>
        </el-tab-pane>
        <el-tab-pane label="消费记录查询" name="RecordAdmin">
          <Record></Record>
        </el-tab-pane>
        <el-tab-pane label="支付宝账单查询" name="BillAdmin">
          <Bill></Bill>
        </el-tab-pane>
      </el-tabs>
      </div>
  </template>
    
  <script>
  import Item from "@/components/shop/ItemAdmin.vue"
  import Record from "@/components/shop/RecordAdmin.vue"
  import Bill from "@/components/shop/Bill.vue"
  export default {
    components: {Item, Record, Bill},
    data() {
      return {
          itemInput: '',
          activeName: 'ItemAdmin',
      }
    }
  }
  </script>
    
  <style scoped>
    .el-table .warning-row {
      background: oldlace;
    }
    
    .el-table .success-row {
      background: #f0f9eb;
    }
    .page-title {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .dialog-title {
      text-align: center;
      margin-bottom: 10px;
    }
  
    .dialog-form {
      margin-top: 10px;
    }
  
    .dialog-button {
      margin-left: 45%;
      margin-top: 20px;
    }
  </style>