<template>
  <el-container style="max-width: 600px; margin: 0 auto;">
    <el-form :model="commentForm" ref="commentForm" size="large">
      <el-form-item label="评论内容" prop="content">
        <el-input type="textarea" v-model="commentForm.comment"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitComment">发表评论</el-button>
        <emoji-popover @emojiSelected="handleEmojiSelected"/>
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import EmojiPopover from "@/components/comments/EmojiPopover.vue";

export default {
  name: 'CommentBox',
  components: {EmojiPopover},
  data(){
    return{
      selectedEmojiId: 0,
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
    }
  },
  methods:{
    handleEmojiSelected(id){
      // TODO:将id加入到评论中
      this.selectedEmojiId = id
    },
    submitComment(){

    }
  }
}
</script>