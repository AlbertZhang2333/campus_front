<template>
  <div>
    <h2>
      用户账号管理界面
    </h2>
    <el-tabs v-model="activateName" type="card">
      <el-tab-pane label="用户信息记录" name="Current_accounts">用户管理
        <el-row  class="headRowStyle">
<!--          调整button和switch的位置-->
          <el-button @click="createAccountDialog" class="RowButtonSize">
            新增用户
          </el-button>
          <el-button @click="fileUploadDialog" class="150px">
            批量新增用户
          </el-button>
          <el-switch
              v-model="toDeleteAccount"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="删除功能已启用"
              inactive-text="删除功能已禁用">
          </el-switch>

          <el-switch
              v-model="toSetBlackList"
              active-color="#ff4949"
              inactive-color="#13ce66"
              active-text="拉入黑名单已启用"
              inactive-text="拉入黑名单已禁用">
          </el-switch>
        </el-row>
        <div class="g-table-content">
          <el-table
            :data="accountInfoItemList"
            style="width: 100%">
<!--            :row-class-name="tableRowClassName">-->
            <el-table-column
                prop="username"
                label="用户名"
                width="180">
            </el-table-column>
            <el-table-column
                prop="userMail"
                label="用户邮箱"
                width="180">
            </el-table-column>
            <el-table-column
                prop="identity"
                label="用户身份">
            </el-table-column>
            <el-table-column
                prop="enabled"
                label="是否在黑名单内">
              <template slot-scope="scope">
                <span v-if="scope.row.enabled">否</span>
                <span v-else>是</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
  <!--              <el-button @click="editItem(scope.$index)">-->
  <!--                编辑-->
  <!--              </el-button>-->
                <el-button v-if="toDeleteAccount" class="FormButtonSize" @click="deleteItem(scope.$index)">
                  移除
                </el-button>
              </template>
            </el-table-column>
            <el-table-column>
              <template #default="scope">
                <el-button v-if="toSetBlackList" class="FormButtonSize" @click="deleteItem(scope.$index)">
                  拉入/释放
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        
      ``<div class="g-table-page clearfix">
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
      </el-tab-pane>
    </el-tabs>


    <el-dialog :visible.sync = "accountDialogVisible">
      <el-row style="margin: auto">新增用户</el-row>
      <el-form
          ref="accountInfoItem"
          :model="accountInfoItem"
          label-width="auto"
          label-position="right"
          size="default"
          style="margin-top: 3%"
      >
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="accountInfoItem.username"/>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userMail">
          <el-input v-model="accountInfoItem.userMail"/>
        </el-form-item>
        <el-form-item label="用户身份" prop="identity">
          <el-input v-model="accountInfoItem.identity"/>
        </el-form-item>
        <el-form-item label="是否在黑名单内" prop="enabled">
          <el-radio-group v-model="accountInfoItem.enabled">
            <el-radio :label="true">否</el-radio>
            <el-radio :label="false">是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-button @click="createAccount()">
          创建新用户
      </el-button>
    </el-dialog>
    <el-dialog title="上传" :visible.sync="fileUploadDialogVisible" width="35%" style="text-align: center;">
      <el-upload class="upload-demo" action="#" drag multiple :headers="headers" :auto-upload="false"
        :file-list="fileList" :on-change="handleChange">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传Excel格式文件</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogOfUpload = false">取 消</el-button>
        <el-button type="primary" @click="confirmUpload()">上 传</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mounted() {
    this.loadUser()
  },
  data() {
    return {
      accountInfoItem:{
        username:"",
        userMail:"",
        identity:1,
        password:"",
        enabled:true,
      },
      //-----------------------------
      accountInfoItemList:[],
      accountDialogVisible:false,
      fileUploadDialogVisible:false,
      activateName:"Current_accounts",
      toDeleteAccount:false,
      toSetBlackList:false,
      fileList: [],
      headers: {
        'Content-Type': 'multipart/form-data'
      },

      pageSize: 5,
      currentPage: 1,
      total: 0,
    }
  },
  methods: {
    async createAccount(){
      const response = await this.$axios.post(`http://localhost:8081/manageAccount/createANewAccount?userName=${this.accountInfoItem.username}&userMail=${this.accountInfoItem.userMail}&password=${this.accountInfoItem.password}&identity=${this.accountInfoItem.identity}`);
      if(response.data.code == 400) alert(response.data.data);
      else alert("已添加");
      this.accountDialogVisible=false;
      this.loadUser();
    },
    createAccountDialog(){
      this.accountDialogVisible=true;
    },
    fileUploadDialog(){
      this.fileUploadDialogVisible=true;
    },
    handleChange(file, fileList) { //文件数量改变
      this.fileList = fileList;
    },

    async confirmUpload() { //确认上传
      var param = new FormData();
      this.fileList.forEach(
        (val, index) => {
          param.append("file", val.raw);
        }
      );
      const response = await this.$axios.post("http://localhost:8081/manageAccount/batchAddAccount", param);
      if(response.data.code == 400) alert(response.data.data);
      else alert("批量添加用户成功");
      this.loadUser();
    },
    deleteItem(index){
      const response = this.$axios.delete(`http://localhost:8081/manageAccount/deleteUserByUserMail?userMail=${this.accountInfoItemList[index].userMail}`);
      if(response.data.code == 400) alert(response.data.data);
      else alert("删除成功");
      this.loadUser();
    },

    
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.loadUser()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadUser()
    },
    loadUser() {
      this.$axios.get(`http://localhost:8081/manageAccount/checkAllAccount?pageSize=${this.pageSize}&currentPage=${this.currentPage}`)
      .then(res => res.data).then(res => {
            if (res.code === 200) {
              this.accountInfoItemList = res.data
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
