<template>
  <div>
    <CommentBox/>

    <el-divider></el-divider>

    <comments-area :close-reply-dialog="closeReplyDialog" :current-page-rep="currentPageRep"
                   :delete-comment="deleteComment(index)" :delete-reply-comment="deleteReplyComment(index)"
                   :emoji-list="emojiList" :emoji-popover-rep-visible="emojiPopoverRepVisible"
                   :handle-current-rep-change="handleCurrentRepChange" :handle-size-rep-change="handleSizeRepChange"
                   :open-reply-dialog="openReplyDialog(index)" :page-size-rep="pageSizeRep"
                   :processed-comments="processedComments" :processed-reply-comments="processedReplyComments"
                   :reply-comment-form="replyCommentForm" :reply-dialog-index="replyDialogIndex"
                   :select-emoji="selectEmoji('reply', emoji.title)" :show-reply-dialog="showReplyDialog"
                   :submit-reply-comment="submitReplyComment(replyDialogIndex)"
                   :toggle-emoji-popover="toggleEmojiPopover('reply')" :total-rep="totalRep"/>
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
import axiosInstance from "@/main";
import CommentBox from "@/components/comments/CommentBox.vue";
import CommentsArea from "@/components/comments/CommentsArea.vue";

export default {
  name: "Main",
  components: {CommentsArea, CommentBox},
  data() {
    return {
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
      comments: [
        {
          id: 0, // 初始为0，具体情况视需求而定
          userName: "",
          userMail: "",
          comment: "hello world!",
          state: 1, // 初始为false，具体情况视需求而定
          time: '', // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
          date: '', // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
          belongDepartment: 0,
          replyId: null,
          type: null,
        },
      ],
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

      processedComments: [
        {
          id: 0, // 初始为0，具体情况视需求而定
          userName: "111",
          userMail: "23245@qq.com",
          comment: "hello world!",
          state: 1, // 初始为false，具体情况视需求而定
          time: '12:20', // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
          date: '2023-12-30', // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
          belongDepartment: 0,
          replyId: null,
          type: null,
        },
      ], // 保存处理后的评论内容
      processedReplyComments: [],

      params: {
        urlList: {
          commentUrl: null,
          replyCommentUrl: null,
          submitCommentUrl: null,
          submitReplyCommentUrl: null,
          deleteCommentUrl: null,
          deleteReplyCommentUrl: null,
        },
        type: int,
        belongDepartment: 0,
      },
    };
  },
  methods: {
    replaceEmoji(text) {
      // 遍历 emojiList，将 [emoji.title] 替换为实际表情
      this.emojiList.forEach((emoji) => {
        const regex = new RegExp(`\\[${emoji.title}\\]`, 'g');
        text = text.replace(regex, `<img src="${require(`@/assets/emoji/512_24x24/${emoji.url}`)}" alt="${emoji.title}" />`);
      });
      return text;
    },
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
      axiosInstance.post(this.$httpUrl + this.params.urlList.replyCommentUrl, null, {
        params: {
          belongDepartment: this.params.belongDepartment,
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
              this.processedReplyComments = res.data.map(comment => ({
                ...comment,
                comment: this.replaceEmoji(comment.comment),
              }));
              console.log(this.processedReplyComments)
              // console.log(this.comments)
              this.totalRep = res.total
            } else {
              this.$message.warning('数据加载失败!');
            }
          }
      )
    },
    loadComment() {
//       const requestParams = {
//         belongDepartment: this.params.belongDepartment,
//         type: this.params.type,
//         pageSize: this.pageSize,
//         currentPage: this.currentPage
//       };
//
// // 添加 replyid 参数（如果不为 null）
//       if (this.replyid !== null) {
//         requestParams.replyid = this.params.replyId;
//       }
//
//       axiosInstance.post(this.$httpUrl + this.params.urlList.commentUrl, null, {
//         params: requestParams
//       }).then(res => res.data).then(res => {
//         console.log(res);
//         if (res.code === 200) {
//           // 处理评论内容
//           this.comments = res.data
//           this.processedComments = res.data.map(comment => ({
//             ...comment,
//             comment: this.replaceEmoji(comment.comment),
//           }));
//           this.total = res.total;
//         } else {
//           this.$message.warning('数据加载失败!');
//         }
//       }).catch(error => {
//         console.error('Error adding comment:', error);
//         this.$message.warning('数据加载失败!');
//       });
    },
    clearForm() {
      this.commentForm = {
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
        this.replyCommentForm.belongDepartment = this.params.belongDepartment;
        this.replyCommentForm.type = 1;
        console.log(index)
        console.log(this.comments[index])
        console.log(this.replyCommentForm)

        axiosInstance.post(this.$httpUrl + this.params.urlList.submitReplyCommentUrl, this.replyCommentForm).then(res => res.data).then(res => {
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

        axiosInstance.post(this.$httpUrl + this.params.urlList.submitCommentUrl, this.commentForm).then(res => res.data).then(res => {
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
      axiosInstance.put(this.$httpUrl + this.params.urlList.deleteReplyCommentUrl, this.replyComments[index])
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
      axiosInstance.put(this.$httpUrl + this.params.urlList.deleteCommentUrl, this.comments[index])
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
    // this.loadComment()
    this.initialEmoji()
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

