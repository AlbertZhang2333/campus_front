<template>
  <el-card class="comment-card">
    <el-row style="display: flex; flex-direction: row; justify-content: space-around">
      <el-col :span="6">
        <el-image :src="require('@/assets/user_icon/1.jpg')" :alt="comment.userIcon"
                  style="height: 40px; width: 40px; margin: 10px"/>
      </el-col>
      <el-col :span="6">
        <p style="font-weight: bold;font-size: 20px;margin: 10px;"> {{ comment.userName }}：</p>
      </el-col>
      <el-button icon="el-icon-close" v-if="closeable" @click="$emit('close')" style="width: 10px; height: 10px; background-color: transparent; border-color: transparent"></el-button>
    </el-row>
    <p v-html="comment.comment" style="margin-left: 30px"></p>


    <p class="comment-time"> 评论时间：{{ comment.date + ' ' + comment.time }} </p>

    <el-button v-if="deletable" @click="$emit('delete-comment', comment)" type="danger" size="mini"
               class="comment-action">删除
    </el-button>
    <el-button v-if="replyable" @click="$emit('reply-comment', comment.id)" type="primary" size="mini"
               class="comment-action">
      回复
    </el-button>
  </el-card>
</template>

<script>

import {date, time} from "mockjs/src/mock/random/date";

export default {
  name: 'CommentCard',
  props: {
    replyable: Boolean,
    deletable: Boolean,
    closeable: Boolean,
    comment: {
      id: Number, // 初始为0，具体情况视需求而定
      userName: String,
      userMail: String,
      userIcon: Number,
      comment: String,
      state: Number, // 初始为false，具体情况视需求而定
      time: time, // 如果你需要设置时间，可以在提交时在后端进行处理，或者在前端使用合适的格式
      date: date, // 同样，如果你需要设置日期，可以在提交时在后端进行处理，或者在前端使用合适的格式
      belongDepartment: Number,
    },
  },
  methods: {},
}
</script>
<style scoped>
.comment-card {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.comment-user-name {
  font-weight: bold;
  font-size: 20px;
  margin: 10px;
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