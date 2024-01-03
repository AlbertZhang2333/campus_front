<template>
  <div>
    <el-main>
      <el-row>
        <el-button type="primary" icon="el-icon-search" @click="openSearch">搜索</el-button>
        <el-button type="primary" @click="goBack" v-if="showFilter !== null">返回</el-button>
      </el-row>

      <el-row style="margin-top: 10px; padding: 10px; border: 1px solid #e0e0e0; border-radius: 5px;" v-if="showFilter !== null">
        <span style="font-weight: bold; margin-right: 10px;">搜索条件:</span>
        <el-tag type="success" v-for="(value, key) in showFilterOptions" :key="key" v-if="value !== null" style="margin-bottom: 5px; margin-left: 5px">
          {{ value }}
        </el-tag>
      </el-row>


      <el-dialog
          :visible="showSearchDialog"
          title="搜索"
          @close="closeSearchDialog"
      >
        <template> 请选择搜索方式:
          <el-radio v-model="filter" label="location" @change="changeFilter('location')">地址</el-radio>
          <el-radio v-model="filter" label="userMail" @change="changeFilter('userMail')">邮箱</el-radio>
          <el-radio v-model="filter" label="date" @change="changeFilter('date')">日期</el-radio>
          <el-radio v-model="filter" label="roomNameAndDate" @change="changeFilter('roomNameAndDate')">房间名和日期
          </el-radio>
        </template>
        <template>
          <el-form :model="filterOptions">
            <el-form-item label="用户邮箱" v-if="Options.userMail">
              <el-input v-model="filterOptions.userMail"></el-input>
            </el-form-item>
            <el-form-item label="地址" v-if="Options.location">
              <el-input v-model="filterOptions.location"></el-input>
            </el-form-item>
            <el-form-item label="房间名称" v-if="Options.roomName">
              <el-input v-model="filterOptions.roomName"></el-input>
            </el-form-item>
            <el-form-item label="日期" v-if="Options.date">
              <el-date-picker v-model="filterOptions.date" type="date" @change="handleDateChange"></el-date-picker>
            </el-form-item>
          </el-form>
        </template>

        <span slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
  <el-button @click="closeSearchDialog">取消</el-button>
  <el-button type="primary" @click="searchReservation">确认</el-button>
</span>
      </el-dialog>

      <el-divider></el-divider>

      <el-table :data="reservation" border :header-cell-style="{ background: '#f5f7fa' }">
        <el-table-column prop="userName" label="用户名" width="80" align="center"></el-table-column>
        <el-table-column prop="userMail" label="邮箱" width="150" align="center"></el-table-column>
        <el-table-column prop="roomName" label="房间名" width="200" align="center"></el-table-column>
        <el-table-column prop="startTime" label="开始时间" width="150" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" width="150" align="center"></el-table-column>
        <el-table-column prop="date" label="日期" width="150" align="center"></el-table-column>
        <el-table-column prop="location" label="位置" width="200" align="center"></el-table-column>
        <el-table-column prop="state" label="状态" width="100" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="danger" icon="el-icon-delete"
                       @click="deleteReservation(scope.row)">删除
            </el-button>
            <el-button type="danger" icon="el-icon-delete"
                       :disabled="isButtonDisabled('cancel', scope.row)"
                       @click="cancelReservation(scope.row)">取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[50, 80, 100, 150]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </el-main>
  </div>
</template>

<script>

import axiosInstance from "@/main";

export default {
  data() {
    return {
      reservation: [],

      showSearchDialog: false,
      filterOptions: {
        userMail: null,
        location: null,
        roomName: null,
        date: null,
      },
      Options: {
        userMail: false,
        location: true,
        roomName: false,
        date: false,
      },
      filter: 'location',

      showFilter: null,
      showFilterOptions: {
        userMail: null,
        location: null,
        roomName: null,
        date: null,
      },

      pageSize: 50,
      currentPage: 1,
      total: 0,
    }
  },
  methods: {
    clearFilter() {
      this.filter = 'location';
      this.filterOptions = {
        userMail: null,
        location: null,
        roomName: null,
        date: null,
      };
      this.Options = {
        userMail: false,
        location: true,
        roomName: false,
        date: false,
      };
    },
    clearShowFilter() {
      this.showFilter = null
      this.showFilterOptions = {
        userMail: null,
        location: null,
        roomName: null,
        date: null,
      }
    },
    handleDateChange(date) {
      // 将日期格式化为年月日字符串
      // 将格式化后的日期保存到 filterOptions.date
      this.filterOptions.date = this.formatDateToYYYYMMDD(date);
      // 在这里，您可以将格式化后的日期发送到服务器，或者执行其他操作
    },
    formatDateToYYYYMMDD(date) {
      // 将 JavaScript Date 对象格式化为 'YYYY-MM-DD' 字符串
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    },
    goBack() {
      this.clearShowFilter()
      this.loadReservation()
    },
    openSearch() {
      this.showSearchDialog = true;
      this.clearFilter()
    },
    closeSearchDialog() {
      this.showSearchDialog = false;
      this.clearFilter()
    },
    changeFilter(type) {
      // this.clearFilter()
      this.Options.userMail = this.Options.roomName = this.Options.location = this.Options.date = false;
      switch (type) {
        case 'userMail':
          this.Options.userMail = true;
          break;
        case 'location':
          this.Options.location = true;
          break;
        case 'date':
          this.Options.date = true;
          break;
        case 'roomNameAndDate':
          this.Options.roomName = true;
          this.Options.date = true;
          break;
      }
    },
    isButtonDisabled(buttonType, rowData) {
      if (buttonType === 'cancel') {
        return rowData.state !== 'NotChecked';
      }
    },
    initialShow() {
      this.showFilter = this.filter
      this.showFilterOptions.userMail = this.filterOptions.userMail;
      this.showFilterOptions.date = this.filterOptions.date;
      this.showFilterOptions.location = this.filterOptions.location;
      this.showFilterOptions.roomName = this.filterOptions.roomName;
    },
    checkFilter() {
      switch (this.filter) {
        case 'userMail':
          return !(this.filterOptions.userMail === null || this.filterOptions.userMail === '');
        case 'location':
          return !(this.filterOptions.location === null || this.filterOptions.location === '');
        case 'date':
          return !(this.filterOptions.date === null || this.filterOptions.date === '');
        case 'roomNameAndDate':
          return !(this.filterOptions.date === null || this.filterOptions.date === '' ||
                  this.filterOptions.roomName === null || this.filterOptions.roomName === '');
      }
    },
    searchReservation() {
      if (this.checkFilter()) {
        this.currentPage = 1
        this.pageSize = 50
        this.clearShowFilter()
        this.initialShow();
        this.loadSearch()
        this.showSearchDialog = false;
      }
      else {
        this.$message.error('请不要输入空信息!');
      }
    },
    deleteReservation(rowData) {
      axiosInstance.delete(this.$httpUrl + 'ManageReservationRecord/deleteById', {
        params: {
          id: rowData.id
        }
      })
          .then(res => res.data)
          .then(res => {
            if (res.code === 200) {
              this.$message.success('删除成功!');
              this.loadReservation()
            } else {
              this.$message.error('删除失败!');
            }
          })
          .catch(error => {
            this.$message.error('删除失败!');
          })
    },
    cancelReservation(rowData) {
      axiosInstance.put(this.$httpUrl + 'ManageReservationRecord/reservationCancel', null, {
        params: {
          id: rowData.id,
        }
      })
          .then(res => res.data)
          .then(res => {
            if (res.code === 200) {
              this.$message.success('取消成功!');
              this.loadReservation()
            } else {
              this.$message.error('取消失败!');
            }
          })
          .catch(error => {
            this.$message.error('取消失败!');
          })
    },
    loadSearch() {
      var route, param;
      switch (this.showFilter) {
        case 'userMail':
          route = 'reservationRecordsByUserMail';
          param = {
            userMail: this.showFilterOptions.userMail,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
          break;
        case 'location':
          route = 'reservationRecordsByLocation';
          param = {
            location: this.showFilterOptions.location,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
          break;
        case 'date':
          route = 'reservationRecordByDate';
          param = {
            date: this.showFilterOptions.date,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
          break;
        case 'roomNameAndDate':
          route = 'reservationRecordsByRoomNameAndDate';
          param = {
            roomName: this.showFilterOptions.roomName,
            date: this.showFilterOptions.date,
            pageSize: this.pageSize,
            currentPage: this.currentPage
          }
          break;
      }
      const url = this.$httpUrl + 'ManageReservationRecord/' + route;

      axiosInstance.get(url, {
        params: param
      }).then(res => res.data).then(res => {
        if (res.code === 200) {
          this.reservation = res.data
          this.total = res.total
        } else {
          this.$message.warning('数据加载失败!');
        }
      })
    },
    loadChoose() {
      if (this.showFilter !== null)
        this.loadSearch()
      else
        this.loadReservation()
    },
    loadReservation() {
      axiosInstance.get(this.$httpUrl + 'ManageReservationRecord/findAll', {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        }
      }).then(res => res.data).then(res => {
        if (res.code === 200) {
          this.reservation = res.data
          this.total = res.total
        } else {
          this.$message.warning('数据加载失败!');
        }
      })
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
  },
  beforeMount() {
    this.loadReservation()
  }
}
</script>

<style scoped>

</style>