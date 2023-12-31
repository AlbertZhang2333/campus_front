<template>
  <div>
    <div>
      <el-radio-group v-model="searchMethod" @change="searchHandler()">
        <el-radio-button label="商品名"></el-radio-button>
        <el-radio-button label="订单号"></el-radio-button>
      </el-radio-group>
      <el-input
          ref="input"
          v-model="input"
          placeholder="输入商品名称或订单号"
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
                       width="80" align="center">
      </el-table-column>
      <el-table-column label="商品名" prop="itemName"
                       width="180" align="center">
      </el-table-column>
      <el-table-column label="数量" prop="num"
                       width="180" align="center">
      </el-table-column>
      <el-table-column label="总消费" prop="amount"
                       width="180" align="center">
      </el-table-column>
      <el-table-column label="当前状态" prop="status"
                       width="180" align="center">
      </el-table-column>
      <el-table-column label="日期" prop="date"
                       width="180" align="center">
      </el-table-column>
      <el-table-column label="时间" prop="createTime"
                       width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="danger"
                     @click="refund(scope.row)">申请退款
          </el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import axiosInstance from "@/main";

export default {
  mounted() {
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
      RecordList: [],
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
    async updateRecordList() {
      //模糊查询相关，需要后端有通过 like 查询的接口
      const response = await axiosInstance.get('http://localhost:8081/UserCheckShoppingRecord/UserCheckSelfShoppingRecord');
      this.RecordList = response.data.data;
    },
    async searchHandler() {
      this.input = this.$refs.input.$el.querySelector('input').value;
      if (this.input == "") {
        this.updateRecordList();
      } else if (this.searchMethod == "商品名") {
        const response = await axiosInstance.get(`http://localhost:8081/UserCheckShoppingRecord/UserCheckShoppingRecordByItemName?itemName=${this.input}`);
        this.RecordList = response.data.data;
      } else if (this.searchMethod == "订单号") {
        const response = await axiosInstance.get(`http://localhost:8081/UserCheckShoppingRecord/UserCheckShoppingRecordById?id=${this.input}`);
        this.RecordList = [response.data.data];
      }
    },
    async refund(rowData) {
      const response = await axiosInstance.put(this.$httpUrl + 'UserShopping/refund', null, {
        params: {
          id: rowData.id
        }
      });
      if (response.data.code === 200) {
        this.$message.success('退款成功')
      } else {
        this.$message.error('退款失败')
      }
    },
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