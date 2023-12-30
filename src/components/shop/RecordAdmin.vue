
<template>
    <div>
      <div>
        <el-radio-group v-model="searchMethod" @change="searchHandler()">
          <el-radio-button label="商品名"></el-radio-button>
          <el-radio-button label="用户邮箱"></el-radio-button>
          <el-radio-button label="订单号"></el-radio-button>
        </el-radio-group>
        <el-input
            ref="input"
            v-model="input"
            placeholder="输入查询信息"
            @keyup.enter.native="searchHandler"
            id="input"
        >
          <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler"></el-button>
        </el-input>
      </div>
      <el-table
        :data="RecordList"
        style="width: 100%"
        :row-class-name="tableRowClassName">
        <el-table-column label="订单号" prop="id"
          width="180">
        </el-table-column>
        <el-table-column label="商品名" prop="itemName"
          width="180">
        </el-table-column>
        <el-table-column label="数量" prop="num"
          width="180">
        </el-table-column>
        <el-table-column label="总消费" prop="amount"
          width="180">
        </el-table-column>
        <el-table-column label="当前状态" prop="status"
          width="180">
        </el-table-column>
        <el-table-column label="日期" prop="date"
          width="180">
        </el-table-column>
        <el-table-column label="时间" prop="createTime"
          width="180">
        </el-table-column>
        <el-table-column label="用户邮箱" prop="userMail"
          width="180">
        </el-table-column>
        <el-table-column label="记录信息">
          <div>{{this.result}}</div>
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button @click="checkRecord(scope.row)" type="info">
                查询记录
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </template>
    
  <script>
  import axiosInstance from "@/main";
  export default {
    mounted(){
      this.updateRecordList();
    },
    data() {
      return {
          activeName: 'Current_sales_Records',
          Record: {
            id: 0,
            itemName: '',
            num: 0,
            amount: 0,
            status: 0,
            createTime: '',
            date: '',
            userMail: ''
          },
          RecordList:[],
          result: "",
          input: "",
          searchMethod: "商品名"
      }
      },
  methods: {
      tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
          return 'warning-row';
      } else if (rowIndex === 3) {
          return 'success-row';
      }
      return '';
      },
      async checkRecord(curRecord){
        const response = await axiosInstance.get(`http://localhost:8081/ManageShoppingRecord/checkAliRecord?itemShoppingRecordId=${curRecord.id}`);
        if(response.data.code == 400) alert("查询失败");
        else this.result = response.data.data;
      },
      async updateRecordList(){
        //模糊查询相关，需要后端有通过 like 查询的接口
          const response = await axiosInstance.get('http://localhost:8081/ManageShoppingRecord/findAll');
          this.RecordList = response.data.data;
      },
      async searchHandler(){
        this.input = this.$refs.input.$el.querySelector('input').value;
        if(this.input == ""){
          this.updateRecordList();
        }else if(this.searchMethod == "商品名"){
          const response = await axiosInstance.get(`http://localhost:8081/ManageShoppingRecord/findShoppingRecordByItemName?itemName=${this.input}`);
          this.RecordList = response.data.data;
        }else if(this.searchMethod == "用户邮箱"){
          const response = await axiosInstance.get(`http://localhost:8081/ManageShoppingRecord/findShoppingRecordByUserMail?userMail=${this.input}`);
          this.RecordList = response.data.data;
        }else if(this.searchMethod == "订单号"){
          const response = await axiosInstance.get(`http://localhost:8081/ManageShoppingRecord/getShoppingRecordById?id=${this.input}`);
          this.RecordList = [response.data.data];
        }
      }
    }
  }
  </script>
    
  <style scoped>
    .page-title {
      text-align: center;
      margin-bottom: 20px;
    }
    .custom-button {
      margin-bottom: 10px; /* Adjust margin as needed */
    }
  </style>