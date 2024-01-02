<template>
  <el-container style="max-width: 600px; margin: 20px auto;">
    <el-form :model="commentForm" ref="commentForm" size="large">
      <el-form-item label="评论内容" prop="content" style="width: 500px; height: 150px">
        <el-input type="textarea" v-model="commentForm.comment" :autosize="{minRows:5}" maxlength="200" show-word-limit></el-input>
      </el-form-item>
      <el-form-item style="display: flex; align-items: center; justify-items: center">
        <el-button type="primary" @click="$emit('submit', commentForm)">发表评论</el-button>
        <el-button type="primary" @click="showEmoji=!showEmoji"><i class="el-icon-smile"></i> Emoji</el-button>
        <el-popover
            placement="bottom"
            width="300"
            v-model="showEmoji"
        >
          <el-container style="text-align: center; display: flex; flex-wrap: wrap; justify-content: center;">
            <el-image
                v-for="emoji in 48"
                :key="emoji"
                :src="require(`@/assets/emoji/512_24x24/${emoji}.png`)"
                :alt="`[${emoji}]`"
                @click="selectEmoji(emoji)"
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
        type: 0,
      },
    }
  },
  methods: {
    selectEmoji(id) {
      this.commentForm.comment += '[' + id + ']';
      this.showEmoji = false
    },
  }
}
</script>