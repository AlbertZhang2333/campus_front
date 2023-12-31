<template>
  <el-container style="display:flex; flex-direction: column;">
    <CommentBox :reply-id="replyComment?.replyId" :emojiList="emojiList" @commit="loadComment"/>

    <el-divider></el-divider>

    <el-container v-if="replying">
      <comment-card :comment="replyComment"></comment-card>
    </el-container>

    <el-timeline v-if="hasComments">
      <el-timeline-item v-for="(comment, index) in comments" :key="index">
        <comment-card :comment="comment" :replyable="!replying" @reply="setReply(comment)"/>
      </el-timeline-item>
    </el-timeline>
    <el-container v-else style="display: flex; justify-content: center; align-items: center">
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

export default {
  name: "Main",
  components: {CommentCard, CommentBox},
  data() {
    return {
      belongDepartment:0,
      comments: [{
        id: 1, // 初始为0，具体情况视需求而定
        userName: "cao",
        userMail: "1312@qq.com",
        userIcon: 1,
        comment: "666",
        state: 1, // 初始为false，具体情况视需求而定
        time: '20:23', // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
        date: '2023', // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
        belongDepartment: 0,
        type: 0,
        replyId: -1
      },
        {
          id: 2, // 初始为0，具体情况视需求而定
          userName: "yang",
          userMail: "1123134@qq.com",
          comment: "hahahaha",
          state: 1, // 初始为false，具体情况视需求而定
          time: '2032', // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
          date: '195748', // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
          belongDepartment: 0,
          type: 0,
          replyId: 1
        }],
      replyComment: null,
      currentPage: 1,
      pageSize: 5,
      total: 40,
      urlList: {
        commentUrl: 'Comment/allCommentsUser',
        submitCommentUrl: null,
        deleteCommentUrl: null,
      },
      emojiList: Array.from({length: 48}, (_, index) => ({
        id: (index + 1).toString(),
        url: (index + 1).toString() + ".png"
      })),
      
    };
  },
  computed: {
    hasComments() {
      return this.comments.length !== 0;
    },
    replying() {
      return this.replyComment !== null;
    },
  },
  methods: {
    loadComment() {
      let requestParams={
        belongDepartment: this.belongDepartment,
        type: 0,
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        replyId: this.replyComment?.replyId ?? -1
      }
      axiosInstance.post(this.$httpUrl + this.urlList.commentUrl, null, {
        params: requestParams
      }).then(res => res.data).then(res => {
        console.log('res: ' + res.data);
        for(let i=0;i<res.data.length;i++){
          console.log(res.data[i].comment)
        }
        if (res.code === 200) {
          // 处理评论内容
          this.comments = res.data
          this.processedComments = res.data.map(comment => ({
            ...comment,
            comment: this.replaceEmoji(comment.comment),
          }));
          this.total = res.total;
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
      this.emojiList.forEach((emoji) => {
        const regex = new RegExp(`\\[${emoji.title}\\]`, 'g');
        text = text.replace(regex, `<img src="${require(`@/assets/emoji/512_24x24/${emoji.url}`)}" alt="${emoji.title}" />`);
      });
      return text;
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
    setReply(comment) {
      if (this.replying) {
        console.error('reply bug')
        return
      }
      this.replyComment = comment
      this.loadComment()
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
};
</script>

