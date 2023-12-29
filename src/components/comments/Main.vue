<template>
  <div>
    <el-card>
      <el-form :model="commentForm" ref="commentForm" size="small">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="commentForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="userMail">
          <el-input v-model="commentForm.userMail"></el-input>
        </el-form-item>
        <el-form-item label="评论内容" prop="content">
          <el-input type="textarea" v-model="commentForm.comment"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitComment">发表评论</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-divider></el-divider>

    <el-timeline>
      <el-timeline-item v-for="(comment, index) in comments" :key="index">
        <el-card class="comment-card">
          <p class="comment-header">{{ comment.userName }}：</p>
          <el-card class="comment-content">
            <p>{{ comment.comment }}</p>
          </el-card>
          <p class="comment-time">评论时间：{{ comment.date + ' ' + comment.time }}</p>
          <el-button @click="() => deleteComment(index)" type="danger" size="mini" class="comment-action">删除</el-button>
          <el-button @click="() => openReplyDialog(index)" type="primary" size="mini" class="comment-action">回复</el-button>
        </el-card>

        <!-- 回复列表 -->
        <!-- 弹窗 -->
        <el-dialog
            :visible="showReplyDialog"
            title="回复信息"
            @close="closeReplyDialog"
        >
          <div>
            <el-timeline-item v-for="(replyComment, indexRep) in replyComments" :key="indexRep">
              <el-card>
                <p>{{ replyComment.userName }}：</p>
                <el-card>
                  <p>{{ replyComment.comment }}</p>
                </el-card>
                <p>评论时间：{{ replyComment.date + ' ' + replyComment.time }}</p> <!-- 使用管道格式化时间 -->
                <el-button @click="() => deleteReplyComment(index)" type="danger" size="mini" style="margin-top: 5px; ">删除</el-button>
              </el-card>
            </el-timeline-item>
          </div>

          <!-- 回复信息展示框 -->
          <el-card>
            <el-form :model="replyCommentForm" ref="replyCommentForm" size="small">
              <el-form-item label="用户名" prop="username">
                <el-input v-model="replyCommentForm.userName"></el-input>
              </el-form-item>
              <el-form-item label="用户邮箱" prop="userMail">
                <el-input v-model="replyCommentForm.userMail"></el-input>
              </el-form-item>
              <el-form-item label="评论内容" prop="content">
                <el-input type="textarea" v-model="replyCommentForm.comment"></el-input>
              </el-form-item>
              <el-pagination
                  @size-change="handleSizeRepChange"
                  @current-change="handleCurrentRepChange"
                  :current-page="currentPageRep"
                  :page-sizes="[5, 10, 20, 30]"
                  :page-size="pageSizeRep"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalRep">
              </el-pagination>
            </el-form>
            <el-container style="display: flex; justify-content: center; margin-top: 5px;">
              <el-button @click="() => closeReplyDialog(replyDialogIndex)" type="primary" size="mini">取消回复</el-button>
              <el-button @click="() => submitReplyComment(replyDialogIndex)" type="primary" size="mini">提交回复</el-button>
            </el-container>
          </el-card>


        </el-dialog>
      </el-timeline-item>
    </el-timeline>
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
import {date, time} from "mockjs/src/mock/random/date";
import {int} from "mockjs/src/mock/random/basic";

export default {
  name: "Main",
  data() {
    return {
      commentForm: {
        id: 0, // 初始为0，具体情况视需求而定
        userName: "",
        userMail: "",
        comment: "",
        state: 1, // 初始为false，具体情况视需求而定
        time: '', // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
        date: '', // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
        belongDepartment: 0,
        replyId: null,
        type: null,
      },
      replyCommentForm: {
        id: 0,
        userName: "",
        userMail: "",
        comment: "",
        state: 1,
        time: '',
        date: '',
        belongDepartment: 0,
        replyId: null,
        type: null,
      },
      comments: [],
      replyComments: [],
      isReplyMode: [], // 用于跟踪是否处于回复模式
      replyContent: [], // 存储回复的内容
      showReplyDialog: false, // 控制显示回复弹窗
      replyDialogIndex: null, // 当前回复的评论索引

      pageSize: 5,
      pageSizeRep: 5,
      currentPage: 1,
      currentPageRep: 1,
      total: 0,
      totalRep: 0,

      belongDepartment: 0,
    };
  },
  methods: {
    openReplyDialog(index) {
      console.log(index)
      console.log(this.comments[index])
      this.isReplyMode[index] = true;

      if (this.isReplyMode[index]) {
        this.showReplyDialog = true;
        this.replyDialogIndex = index;
      }
      this.loadReplyComments(index)
    },
    closeReplyDialog(index) {
      // 关闭回复弹窗时重置相关数据
      this.showReplyDialog = false;
      this.isReplyMode[index] = false;
    },

    loadReplyComments(index) {
      this.$axios.post(this.$httpUrl + 'Comment/allCommentsReplyUser', null, {
        params: {
          belongDepartment: this.belongDepartment,
          type: 1,
          replyId: this.comments[index].id,
          pageSize: this.pageSizeRep,
          currentPage: this.currentPageRep,
        }
      }).then(res => res.data).then(res => {
            console.log(res)
            // console.log([res.data])
            if (res.code === 200) {
              this.replyComments = res.data
              // console.log(this.comments)
              this.totalRep = res.total
            } else {
              this.$message.warning('数据加载失败!');
            }
          }
      )
    },
    loadComment() {
      this.$axios.post(this.$httpUrl + 'Comment/allCommentsUser', null, {
        params: {
          belongDepartment: this.belongDepartment,
          type: 0,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      }).then(res => res.data).then(res => {
            console.log(res)
            // console.log([res.data])
            if (res.code === 200) {
              this.comments = res.data
              // console.log(this.comments)
              this.total = res.total
            } else {
              this.$message.warning('数据加载失败!');
            }
          }
      )
    },
    clearForm() {
      this.commentForm= {
        id: 0, // 初始为0，具体情况视需求而定
            userName: "",
            userMail: "",
            comment: "",
            state: 1, // 初始为false，具体情况视需求而定
            time: '', // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
            date: '', // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
            belongDepartment: 0,
            replyId: null,
            type: null,
      }
    },
    clearReplyForm() {
      this.replyCommentForm = {
        id: 0,
        userName: "",
        userMail: "",
        comment: "",
        state: 1,
        time: '',
        date: '',
        belongDepartment: 0,
        replyId: null,
        type: null,
      }
    },
    submitReplyComment(index) {
      if (this.replyCommentForm.comment !== "") {
        // 处理回复逻辑，例如提交到后端
        const date = new Date();
        this.replyCommentForm.time = date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
        this.replyCommentForm.date = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate();
        this.replyCommentForm.comment = this.replyCommentForm.comment.toString();
        this.replyCommentForm.replyId = this.comments[index].id;
        this.replyCommentForm.belongDepartment = this.belongDepartment;
        this.replyCommentForm.type = 1;
        console.log(index)
        console.log(this.comments[index])
        console.log(this.replyCommentForm)

        this.$axios.post(this.$httpUrl + 'Comment/addComment', this.replyCommentForm).then(res => res.data).then(res => {
          console.log(res)
          this.$message({
            message: '回复成功!',
            type: 'success'
          })
          this.clearReplyForm();
          this.loadReplyComments(index);
        })
      } else {
        this.$message.warning("请输入回复内容");
      }
    },
    submitComment() {
      if (this.commentForm.comment !== "") {
        const date = new Date(); // 获取当前时间戳
        this.commentForm.time = date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
        this.commentForm.date = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate();
        this.commentForm.comment = this.commentForm.comment.toString();
        this.commentForm.type = 0;
        this.commentForm.replyId = null;

        // console.log(this.commentForm.comment)

        this.$axios.post(this.$httpUrl + 'Comment/addComment', this.commentForm).then(res => res.data).then(res => {
          console.log(res)
          this.$message({
            message: '评论发表成功!',
            type: 'success'
          });
          this.isReplyMode.push(false);
          this.clearForm();
          this.loadComment();
        })
            .catch(error => {
              console.error('Error adding comment:', error);
              this.$message.error('评论发表失败，请重试!');
            });


      } else {
        this.$message.warning("请输入回复内容");
      }
    },
    deleteReplyComment(index) {
      this.replyComments[index].state = 0;
      this.$axios.put(`${this.$httpUrl}Comment/updateComment`, this.replyComments[index])
          .then(res => res.data)
          .then(res => {
            console.log(res);
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
            this.loadReplyComments(this.replyDialogIndex);
          })
          .catch(error => {
            console.error('Error deleting comment:', error);
            this.$message.error('删除失败，请重试!');
          });
    },
    deleteComment(index) {
      this.comments[index].state = 0
      this.$axios.put(`${this.$httpUrl}Comment/updateComment`, this.comments[index])
          .then(res => res.data)
          .then(res => {
            console.log(res);
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
            this.loadComment();
          })
          .catch(error => {
            console.error('Error deleting comment:', error);
            this.$message.error('删除失败，请重试!');
          });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.currentPage = 1
      this.loadComment()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val
      this.loadComment()
    },
    handleSizeRepChange(val) {
      console.log(`回复每页 ${val} 条`);
      this.pageSizeRep = val
      this.currentPageRep = 1
      this.loadReplyComments(this.replyDialogIndex)
    },
    handleCurrentRepChange(val) {
      console.log(`恢复当前页: ${val}`);
      this.currentPageRep = val
      this.loadReplyComments(this.replyDialogIndex)
    },
  },
  beforeMount() {
    this.loadComment()
  },
  filters: {
    formatDate(timestamp) {
      // 管道函数，用于格式化时间戳
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  }
};
</script>

<style scoped>
.comment-card {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
}

.comment-header {
  font-weight: bold;
  margin-bottom: 10px;
}

.comment-content {
  margin-bottom: 10px;
}

.comment-time {
  color: #999;
  margin-bottom: 5px;
}

.comment-action {
  margin-top: 5px;
  margin-right: 5px;
}
</style>
