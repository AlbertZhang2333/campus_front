<template>
  <el-container style="max-width: 600px; margin: 0 auto;">
    <el-form :model="commentForm" ref="commentForm" size="large">
      <el-form-item label="评论内容" prop="content">
        <el-input type="textarea" v-model="commentForm.comment"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitComment">发表评论</el-button>
        <el-button type="primary" @click="showEmoji=!showEmoji"><i class="el-icon-smile"></i> Emoji</el-button>
        <el-popover
            placement="bottom"
            width="300"
            v-model="showEmoji"
        >
          <el-container style="text-align: center; display: flex; flex-wrap: wrap; justify-content: center;">
            <el-image
                v-for="emoji in emojiList"
                :key="emoji.id"
                :src="require(`@/assets/emoji/512_24x24/${emoji.id}.png`)"
                :alt="emoji.id"
                @click="selectEmoji(emoji.id)"
                style="cursor: pointer; margin: 5px; width: 24px; height: 24px;"
            />
          </el-container>
        </el-popover>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import axiosInstance from "@/main";

export default {
  name: 'CommentBox',
  components: {},
  props: {
    replyId: Number,
    emojiList: Array
  },
  data() {
    return {
      showEmoji: false,
      commentForm: {
        id: 0, // 初始为0，具体情况视需求而定
        userName: "",
        userMail: "",
        comment: "",
        state: 1, // 初始为false，具体情况视需求而定
        time: '', // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
        date: '', // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
        belongDepartment: 0,
        type: 0,
        replyId: -1
      },
    
    }
  },
  methods: {
    selectEmoji(id) {
      this.commentForm.comment += '[' + id + ']';
      this.showEmoji = false
    },
    submitComment() {
      if (this.commentForm.comment !== "") {
        const date = new Date(); // 获取当前时间戳
        this.commentForm.time = date.getHours().toString() + ':' + date.getMinutes().toString() + ':' + date.getSeconds().toString();
        this.commentForm.date = date.getFullYear().toString() + '-' + (date.getMonth() + 1).toString() + '-' + date.getDate();
        this.commentForm.comment = this.commentForm.comment.toString();
        // this.commentForm.type = 0;
        this.commentForm.replyId = this.replyId;

        console.log(this.commentForm)
    

        axiosInstance.post(this.$httpUrl + 'Comment/addComment', this.commentForm).then(res => res.data).then(res => {
          console.log(res)
          this.$message({
            message: '评论发表成功!',
            type: 'success'
          });
          this.commentForm.comment = "";
          this.$emit('commit');
        }).catch(error => {
          console.error('Error adding comment:', error);
          this.$message.error('评论发表失败，请重试!');
        });
      } else {
        this.$message.warning("请输入评论内容");
      }
    },
  }
}
</script>