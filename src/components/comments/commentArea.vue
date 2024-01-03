<template>
  <el-container style="display:flex; flex-direction: column;">
    <el-container style="display: flex; justify-content: center; align-content: center">
      <h2> Comments </h2>
      <el-button v-if="admin" @click="$router.push('/comment/admin')" style="width: 100px; margin: 20px">管理评论</el-button>
    </el-container>
        <CommentBox
        @submit="addComment"
    />
    <el-divider></el-divider>
    <el-container v-if="replying">
      <comment-card
          :comment="processedReplyComment"
          :replyable="false"
          :deletable="false"
          :closeable="true"
          @close="closeReply"
      ></comment-card>
    </el-container>

    <el-timeline v-if="hasComments">
      <el-timeline-item v-for="(comment, index) in processedComments" :key="index">
        <comment-card
            :comment="comment"
            :replyable="!replying"
            :deletable="comment.userMail === userInfo.userMail"
            @reply-comment="reply(index)"
            @delete-comment="deleteComment(index)"
        />
      </el-timeline-item>
    </el-timeline>
    <el-container v-if="!replying && !hasComments" style="display: flex; justify-content: center; align-items: center">
      <h3>还没有评论哦，快来评论吧</h3>
    </el-container>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </el-container>
</template>

<script>
import axiosInstance from "@/main";
import CommentBox from "@/components/comments/CommentBox.vue";
import CommentCard from "@/components/comments/CommentCard.vue";
import {mapState} from "vuex";
import userInfo from "@/components/login/UserInfo.vue";

export default {
  name: "Main",
  components: {CommentCard, CommentBox},
  props: {
    department: Number,
    stuffId: 0,
  },
  data() {
    return {
      comments: [{
        id: 1, // 初始为0，具体情况视需求而定
        userName: "cao",
        userMail: "1312@qq.com",
        userIcon: 1,
        comment: "666[1][2]",
        state: 1, // 初始为false，具体情况视需求而定
        time: '20:23', // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
        date: '2023', // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
        belongDepartment: 0,
        type: 0,
        replyId: 0
      }],
      replyComment: undefined,
      currentPage: 1,
      pageSize: 5,
      total: 0,
      urlList: {
        requireCommentUrl: 'Comment/allCommentsReplyUser',
        addCommentUrl: 'Comment/addComment',
        deleteCommentUrl: 'Comment/updateComment',
      },
    };
  },
  computed: {
    ...mapState(['userInfo']),
    admin() {
      return this.userInfo.identity === '2'
    },
    processedComments() {
      return this.comments.map(comment => ({
        ...comment,
        comment: this.replacePic(this.replaceEmoji(comment.comment)),
      }));
    },
    processedReplyComment() {
      this.replyComment.comment = this.replacePic(this.replaceEmoji(this.replyComment.comment))
      return this.replyComment
    },
    hasComments() {
      return this.comments.length !== 0;
    },
    replying() {
      return this.replyComment !== undefined;
    },
    requestParams() {
      return {
        belongDepartment: this.department,
        type: this.replyComment === undefined ? 0 : 1,
        replyId: this.replyComment?.id ?? this.stuffId,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
      }
    },
    date() {
      const date = new Date(); // 获取当前时间戳
      // 获取年份
      var year = date.getFullYear();
      // 获取月份，并确保为两位数
      var month = (date.getMonth() + 1).toString().padStart(2, '0');
      // 获取日期，并确保为两位数
      var day = date.getDate().toString().padStart(2, '0');
      // 将年份、月份和日期拼接成字符串
      return year + '-' + month + '-' + day;
    },
    time() {
      const date = new Date(); // 获取当前时间戳
      return date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString()
    }
  },
  methods: {
    closeReply() {
      this.replyComment = undefined
      this.loadComment()
    },
    loadComment() {
      axiosInstance.post(this.$httpUrl + this.urlList.requireCommentUrl, null, {
        params: this.requestParams
      }).then(res => res.data).then(res => {
        if (res.code === 200) {
          // 处理评论内容
          this.total = res.total;
          this.comments = res.data
        } else {
          this.$message.warning('数据加载失败!');
        }
      }).catch(error => {
        console.error('Error adding comment:', error);
        this.$message.warning('数据加载失败!');
      });
    },
    replaceEmoji(text) {
      // 遍历 emojiList，将 [emoji.title] 替换为实际表情
      text = text.replace(/\[(\d+)]/g, (_, num) => {
        const src = require(`@/assets/emoji/512_24x24/${num}.png`);
        return `<img src="${src}" alt="[${num}]" />`;
      });
      return text;
    },
    replacePic(text) {
      // 匹配带引号的文件路径
      const regex = /'([^']+)'/g;
      // 使用 replace 方法替换匹配到的文件路径
      text = text.replace(regex, (match, filePath) => {
        // 这里可以根据你的逻辑生成图片的URL，比如拼接服务器地址等
        const imageUrl = require(`@/assets/comments/${filePath}`);
        return `<img src="${imageUrl}" alt="${filePath}" />`;
      });

      return text;
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.loadComment()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.loadComment()
    },
    reply(index) {
      this.replyComment = this.comments[index];
      this.loadComment()
    },
    deleteComment(index) {
      this.comments[index].state = 0
      axiosInstance.put(this.$httpUrl + this.urlList.deleteCommentUrl, this.comments[index]).then(res => res.data).then(res => {
        if (res.code === 200) {
          // 处理评论内容
          this.$message({
            message: '评论删除成功!',
            type: 'success'
          });
          this.loadComment()
        } else {
          this.$message.warning('评论删除失败!');
        }
      }).catch(error => {
        console.error('Error adding comment:', error);
        this.$message.error('评论删除失败，请重试!');
      });

    },
    addComment(commentForm) {
      if (commentForm.comment === "") {
        this.$message.warning("请输入评论内容");
        return;
      }
      commentForm.time = this.time;
      commentForm.date = this.date;
      commentForm.comment = commentForm.comment.toString();
      commentForm.replyId = this.replyComment?.id ?? this.stuffId;
      commentForm.type = (this.replyComment === undefined) ? 0 : 1
      commentForm.belongDepartment = this.department
      axiosInstance.post(this.$httpUrl + this.urlList.addCommentUrl, commentForm).then(res => res.data).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '评论发表成功!',
            type: 'success'
          });
          commentForm.comment = ''
          this.loadComment()
        } else {
          this.$message.warning('评论发表失败!');
        }
      }).catch(error => {
        console.error('Error adding comment:', error);
        this.$message.error('评论发表失败，请重试!');
      });
    }
  },
  filters: {
    formatDate(timestamp) {
      // 管道函数，用于格式化时间戳
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    }
  },
  beforeMount() {
    this.loadComment();
  }
}
;
</script>

