<template>
    <div>
    <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
    <el-button type="primary" style="width:30% ; background:#505814 ;border:none;"
        v-on:click="$router.push(`/reservation`)">继续预约</el-button>
    </el-aside>
    <el-date-picker
    v-model="selectedDate"
    align="right"
    type="date"
    value-format="yyyy-MM-dd"
    placeholder="选择日期"
    @change="showReservation">
    </el-date-picker>
    <el-table
    :data="reservationRecordList"
    style="width: 100%">
<!--            :row-class-name="tableRowClassName">-->
    <el-table-column
        prop="roomName"
        label="房间名"
        width="180">
    </el-table-column>
    <el-table-column
        prop="date"
        label="日期"
        width="180">
    </el-table-column>
    <el-table-column
        prop="startTime"
        label="开始时间"
        width="180">
    </el-table-column>
    <el-table-column
        prop="endTime"
        label="结束时间">
    </el-table-column>
    <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
            <span v-if="scope.row.state == 0">未签到</span>
            <span v-else-if="scope.row.state == 1">已取消</span>
            <span v-else-if="scope.row.state == 2">迟到</span>
            <span v-else>已签到</span>
        </template>
    </el-table-column>
    <el-table-column>
        <template #default="scope">
        <el-button type="danger" plain class="FormButtonSize" @click="cancelReservation(scope.row)">
            取消预约
        </el-button>
        </template>
    </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>

<script>
import axiosInstance from "@/main";
export default {
  mounted() {
    this.loadReservation()
  },
  data() {
    return {
      reservationRecord:{
        id:0,
        roomName:"",
        date:"",
        startTime:"",
        endTime:"",
        status:0,
      },
      reservationRecordList:[],
      pageSize: 5,
      currentPage: 1,
      total: 0,
      selectedDate: "",
    }
  },
  methods: {
    async showReservation(){
      const response = await axiosInstance.get(`${this.$httpUrl}Reservation/UserCheckDateSelfReservation?date=${this.selectedDate}`);
      if(response.data.code == 400) alert(response.data.data);
      else{
        this.reservationRecordList = response.data.data;
        this.total = response.data.total;
      }
    },
    async cancelReservation(curReservation){
      const response = await axiosInstance.put(`${this.$httpUrl}Reservation/reservationCancel?id=${curReservation.id}`);
      if(response.data.code == 400) alert(response.data.data);
      else alert("删除成功");
      this.loadReservation();
    },
    
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.loadReservation()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadReservation()
    },
    async loadReservation() {
      axiosInstance.get(`${this.$httpUrl}Reservation/UserCheckSelfHistoryReservation?pageSize=${this.pageSize}&currentPage=${this.currentPage}`)
      .then(res => res.data).then(res => {
            if (res.code === 200) {
              this.reservationRecordList = res.data
              this.total = res.total
            } else {
              this.$message.warning('数据加载失败!');
            }
          }
      )
    },

  }
}
</script>

<style>
.FormButtonSize {
  width: 100px; /* 设置按钮宽度 */
  height: 36px; /* 设置按钮高度 */
  margin-right: 10px; /* 设置右侧间距 */
}

.RowButtonSize {
  width: 100px; /* 设置按钮宽度 */
  height: 36px; /* 设置按钮高度 */
  margin-right: 10px; /* 设置右侧间距 */
}

.headRowStyle {
  display: flex;
  align-items: center; /* 垂直居中按钮和开关 */
  justify-content: space-between;
  padding: 10px; /* 添加内边距 */
  background-color: #f2f2f2; /* 添加背景颜色 */
  border-radius: 5px; /* 添加圆角边框 */
  margin-bottom: 20px; /* 添加下方间距 */
}

.el-table {
  background-color: #fff; /* 添加表格背景颜色 */
  border-radius: 5px; /* 添加表格圆角边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 添加表格阴影效果 */
}

.el-table .warning-row {
  background: #fff3cd; /* 调整警告行的背景颜色 */
}

.el-table .success-row {
  background: #d4edda; /* 调整成功行的背景颜色 */
}
.el-table-column {
  margin-right: 10px; /* 设置列之间的右侧间距 */
}
</style>