<template>
  <div style="margin-top: 10px">
    <el-main v-if="currentView === 'viewComment'">
      <!-- 显示查看评论页面的内容 -->
      <el-row>
        <el-button type="primary" icon="el-icon-search" @click="openSearch">搜索</el-button>
      </el-row>

      <el-row style="margin-top: 10px; padding: 10px; border: 1px solid #e0e0e0; border-radius: 5px;"
              v-if="checkFilter()">
        <span style="font-weight: bold; margin-right: 10px;">搜索条件:</span>
        <el-tag
            type="success"
            style="margin-bottom: 5px; margin-left: 5px"
            :key="key"
            v-for="(value, key) in showFilterOptions"
            closable
            @close="hideCondition(key)"
            v-show="showCondition(key)"
        >
          {{ key }}: {{ value }}
        </el-tag>
      </el-row>

      <el-divider></el-divider>


      <el-table :data="comments" border :header-cell-style="{ background: '#f5f7fa' }">
        <el-table-column prop="date" label="日期" width="150" align="center">
        </el-table-column>
        <el-table-column prop="time" label="时间" width="150" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="100" align="center">
        </el-table-column>
        <el-table-column prop="userMail" label="邮箱" width="120" align="center">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120" align="center">
        </el-table-column>
        <el-table-column prop="comment" label="内容" width="320" align="center">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 0">已删除</span>
            <span v-else-if="scope.row.state === 1">在显示</span>
            <span v-else-if="scope.row.state === 2">已拉黑</span>
          </template>
        </el-table-column>
        <el-table-column prop="belongDepartment" label="部门" width="150" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="button-container">
              <el-button type="info" plain @click="loadReply(scope.row.id, scope.row.belongDepartment)"
                         v-if="scope.row.type === 'Comment'">查看回复
              </el-button>
              <el-button type="success" icon="el-icon-check" circle
                         :disabled="isButtonDisabled('success', scope.row)"
                         @click="updateComment(scope.row, 1)"></el-button>
              <el-button type="danger" icon="el-icon-close" circle
                         :disabled="isButtonDisabled('danger', scope.row)"
                         @click="updateComment(scope.row, 2)"></el-button>
            </div>
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

    <el-main v-else-if="currentView === 'viewReply'">
      <el-row>
        <el-button type="primary" @click="goBack">返回</el-button>
      </el-row>

      <el-table :data="replyComments" border :header-cell-style="{ background: '#f5f7fa' }">
        <el-table-column prop="date" label="日期" width="150" align="center">
        </el-table-column>
        <el-table-column prop="time" label="时间" width="150" align="center">
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="100" align="center">
        </el-table-column>
        <el-table-column prop="userMail" label="邮箱" width="120" align="center">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="120" align="center">
        </el-table-column>
        <el-table-column prop="comment" label="内容" width="400" align="center">
        </el-table-column>
        <el-table-column prop="state" label="状态" width="80" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.state === 0">已删除</span>
            <span v-else-if="scope.row.state === 1">在显示</span>
            <span v-else-if="scope.row.state === 2">已拉黑</span>
          </template>
        </el-table-column>
        <el-table-column prop="belongDepartment" label="部门" width="150" align="center">
          <span>{{ currentDepartment }}</span>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div class="button-container">
              <el-button type="success" icon="el-icon-check" circle
                         :disabled="isButtonDisabled('success', scope.row)"
                         @click="updateReplyComment(scope.row, 1)"></el-button>
              <el-button type="danger" icon="el-icon-close" circle
                         :disabled="isButtonDisabled('danger', scope.row)"
                         @click="updateReplyComment(scope.row, 2)"></el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
          @size-change="handleSizeRepChange"
          @current-change="handleCurrentRepChange"
          :current-page="currentPageRep"
          :page-sizes="[50, 80, 100, 150]"
          :page-size="pageSizeRep"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalRep">
      </el-pagination>
    </el-main>

    <el-dialog
        :visible="showSearchDialog"
        title="搜索"
        @close="closeSearchDialog"
    >
      <el-form :model="filterOptions">
        <el-form-item label="用户邮箱">
          <el-input v-model="filterOptions.userMail"></el-input>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="filterOptions.date" type="date" @change="handleDateChange"></el-date-picker>
        </el-form-item>
        <el-form-item label="归属部门">
          <el-radio v-model="filterOptions.department" label="All Department">All Department</el-radio>
          <el-radio v-model="filterOptions.department" label="Store">Store</el-radio>
          <el-radio v-model="filterOptions.department" label="Building">Building</el-radio>
        </el-form-item>
        <el-form-item label="类型">
          <el-radio v-model="filterOptions.type" label="All Type">All Type</el-radio>
          <el-radio v-model="filterOptions.type" label="Comment">Comment</el-radio>
          <el-radio v-model="filterOptions.type" label="Reply">Reply</el-radio>
          <el-radio v-model="filterOptions.type" label="Product Review">Product Review</el-radio>
          <el-radio v-model="filterOptions.type" label="Building Review">Building Review</el-radio>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer" style="display: flex; justify-content: center;">
  <el-button @click="closeSearchDialog">取消</el-button>
  <el-button type="primary" @click="searchComment">确认</el-button>
</span>
    </el-dialog>

  </div>
</template>

<script>
import axiosInstance from "@/main";

export default {
  data() {
    return {
      comments: [],
      replyComments: [],
      currentView: 'viewComment',
      currentDepartment: '',
      pageSize: 50,
      pageSizeRep: 50,
      currentPage: 1,
      currentPageRep: 1,
      total: 0,
      totalRep: 0,
      showReplyButton: true,
      searching: false,
      showOptions: {
        userMail: false,
        date: false,
        department: false,
        type: false,
      },
      showSearchDialog: false, // 控制显示回复弹窗
      filterOptions: {
        // userName: null,        // 用户名
        userMail: null,        // 用户邮箱
        date: null,       // 开始日期
        department: 'All Department',
        type: 'All Type',
      },
      showFilterOptions: {
        userMail: null,        // 用户邮箱
        date: null,       // 开始日期
        department: null,
        type: null,
      },
    }
  },
  methods: {
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
    toCode(type, name) {
      if (type === 'department') {
        switch (name) {
          case 'All Department':
            return null;
          case 'Store':
            return 0;
          case 'Building':
            return 1;
          default:
            return null;
        }
      } else if (type === 'type') {
        switch (name) {
          case 'All Type':
            return null;
          case 'Comment':
            return 0;
          case 'Reply':
            return 1;
          case 'Product Review':
            return 2;
          case 'Building Review':
            return 3;
          default:
            return null;
        }
      }
    },
    clearFilter() {
      this.filterOptions = {
        // userName: null,        // 用户名
        userMail: null,        // 用户邮箱
        date: null,       // 开始日期
        department: 'All Department',
        type: 'All Type',
      }
    },
    clearShowFilter() {
      this.showFilterOptions = {
        // userName: null,        // 用户名
        userMail: null,        // 用户邮箱
        date: null,       // 开始日期
        department: null,
        type: null,
      }
      this.showOptions = {
        userMail: false,
        date: false,
        department: false,
        type: false,
      }
    },
    checkFilter() {
      return (this.showOptions.userMail || this.showOptions.date || this.showOptions.department || this.showOptions.type);
    },
    hideCondition(key) {
      this.$set(this.showFilterOptions, key, null);
      this.$set(this.showOptions, key, false);
      this.loadSearch();
    },
    showCondition(key) {
      return this.showOptions[key];
    },
    goBack() {
      this.currentView = 'viewComment';
      this.replyComments = [];
    },
    openSearch() {
      this.showSearchDialog = true;
      this.clearFilter()
    },
    closeSearchDialog() {
      this.showSearchDialog = false;
      this.clearFilter()
    },
    initialShow() {
      this.showFilterOptions.userMail = this.filterOptions.userMail;
      this.showFilterOptions.date = this.filterOptions.date;
      this.showFilterOptions.department = this.filterOptions.department;
      this.showFilterOptions.type = this.filterOptions.type;
      this.showOptions.userMail = (this.showFilterOptions.userMail !== null);
      this.showOptions.date = (this.showFilterOptions.date !== null);
      this.showOptions.department = (this.showFilterOptions.department !== null);
      this.showOptions.type = (this.showFilterOptions.type !== null);
    },
    searchComment() {
      this.currentPage = 1
      this.pageSize = 50
      this.clearShowFilter()
      this.initialShow();
      this.loadSearch()
      this.showSearchDialog = false;
    },
    isButtonDisabled(buttonType, rowData) {
      if (buttonType === 'success') {
        return rowData.state !== 2;
      } else if (buttonType === 'danger') {
        return rowData.state === 0 || rowData.state === 2;
      }
    },
    updateReplyComment(comment, state) {
      comment.state = state
      axiosInstance.put(`${this.$httpUrl}Comment/updateComment`, comment)
          .then(res => res.data)
          .then(res => {
            this.$message({
              message: state === 1 ? '审核通过!' : '拉黑成功',
              type: 'success'
            });
            this.loadReply(this.nowReplyId, this.currentDepartment)
          })
          .catch(error => {
            this.$message.error('信息管理失败，请重试!');
          });
    },
    loadChoose() {
      if (this.showOptions.date || this.showOptions.userMail || this.showOptions.type || this.showOptions.department)
        this.loadSearch();
      else
        this.loadAll();
    },
    updateComment(comment, state) {
      comment.state = state
      axiosInstance.put(`${this.$httpUrl}Comment/updateComment`, comment)
          .then(res => res.data)
          .then(res => {
            this.$message({
              message: state === 1 ? '审核通过!' : '拉黑成功',
              type: 'success'
            });
            this.loadChoose();
          })
          .catch(error => {
            this.$message.error('信息管理失败，请重试!');
          });
    },
    loadSearch() {
      axiosInstance.get(this.$httpUrl + 'Comment/commentSearchAdmin', {
        params: {
          userMail: this.showFilterOptions.userMail,
          date: this.showFilterOptions.date,
          belongDepartment: this.toCode('department', this.showFilterOptions.department),
          type: this.toCode('type', this.showFilterOptions.type),
          pageSize: this.pageSize,
          currentPage: this.currentPage,
        }
      }).then(res => res.data).then(res => {
        if (res.code === 200) {
          this.comments = res.data
          this.total = res.total
        } else {
          this.$message.warning('数据加载失败!');
        }
      })
    },
    loadReply(replyId, belongDepartment) {
      this.currentView = 'viewReply';
      this.currentDepartment = belongDepartment
      this.nowReplyId = replyId;
      axiosInstance.post(this.$httpUrl + 'Comment/allReplyCommentsAdmin', null, {
        params: {
          type: 1,
          replyId: this.nowReplyId,
          belongDepartment: this.toCode('department', belongDepartment),
          pageSize: this.pageSizeRep,
          currentPage: this.currentPageRep,
        }
      }).then(res => res.data).then(res => {
            if (res.code === 200) {
              this.replyComments = res.data
              this.totalRep = res.total
            } else {
              this.$message.warning('数据加载失败!');
            }
          }
      )
    },
    loadAll() {
      axiosInstance.post(this.$httpUrl + 'Comment/allCommentsAdmin', null, {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      }).then(res => res.data).then(res => {
            if (res.code === 200) {
              this.comments = res.data
              this.total = res.total
            } else {
              this.$message.warning('数据加载失败!');
            }
          }
      )
    },
    handleSizeRepChange(val) {
      this.pageSizeRep = val
      this.currentPageRep = 1
      this.loadReply(this.nowReplyId, this.currentDepartment)
    },
    handleCurrentRepChange(val) {
      this.currentPageRep = val
      this.loadReply(this.nowReplyId, this.currentDepartment)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.loadChoose();
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadChoose();
    },
  },
  beforeMount() {
    this.loadAll()
  },
}
</script>
<style scoped>
.button-container {
  text-align: right;
}
</style>