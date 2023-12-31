<template>
  <el-timeline>
    <el-timeline-item v-for="(comment, index) in processedComments" :key="index">
      <el-card class="comment-card">
        <p class="comment-header"> {{ comment.userName }}：</p>
        <el-card class="comment-content">
          <p v-html="comment.comment"></p>
        </el-card>
        <p class="comment-time">评论时间：{{ comment.date + ' ' + comment.time }}</p>
        <el-button @click="() => deleteComment" type="danger" size="mini" class="comment-action">删除
        </el-button>
        <el-button @click="() => openReplyDialog" type="primary" size="mini" class="comment-action">回复
        </el-button>
      </el-card>

      <!-- 回复列表 -->
      <!-- 弹窗 -->
      <el-dialog
          :visible="showReplyDialog"
          title="回复信息"
          @close="closeReplyDialog"
      >
        <div>
          <el-timeline-item v-for="(replyComment, indexRep) in processedReplyComments" :key="indexRep">
            <el-card>
              <p>{{ replyComment.userName }}：</p>
              <el-card class="comment-content">
                <p v-html="replyComment.comment"></p>
              </el-card>
              <p>评论时间：{{ replyComment.date + ' ' + replyComment.time }}</p> <!-- 使用管道格式化时间 -->
              <el-button @click="() => deleteReplyComment" type="danger" size="mini" style="margin-top: 5px; ">
                删除
              </el-button>
            </el-card>
          </el-timeline-item>
        </div>

        <el-pagination
            @size-change="handleSizeRepChange"
            @current-change="handleCurrentRepChange"
            :current-page="currentPageRep"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="pageSizeRep"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRep">
        </el-pagination>

        <!-- 回复信息展示框 -->
        <el-card>
          <el-form :model="replyCommentForm" ref="replyCommentForm" size="small">
            <el-form-item label="评论内容" prop="content">
              <el-input type="textarea" v-model="replyCommentForm.comment"></el-input>
            </el-form-item>
          </el-form>

          <el-container style="display: flex; justify-content: center; margin-top: 5px;">
            <el-button @click="() => closeReplyDialog(replyDialogIndex)" type="primary" size="mini">取消回复
            </el-button>
            <el-button @click="() => submitReplyComment" type="primary" size="mini">提交回复
            </el-button>
            <el-button type="primary" @click="toggleEmojiPopover">
              <i class="el-icon-smile"></i> Emoji
            </el-button>

            <el-popover
                placement="bottom"
                width="300"
                trigger="click"
                v-model="emojiPopoverRepVisible"
            >
              <div style="text-align: center; display: flex; flex-wrap: wrap; justify-content: center;">
                <img
                    v-for="emoji in emojiList"
                    :key="emoji.title"
                    :src="require(`@/assets/emoji/512_24x24/${emoji.url}`)"
                    :alt="emoji.title"
                    @click="selectEmoji"
                    style="cursor: pointer; margin: 5px; width: 24px; height: 24px;"
                />
              </div>
            </el-popover>
          </el-container>
        </el-card>
      </el-dialog>
    </el-timeline-item>
  </el-timeline>
</template>
<script>
export default {
  name: 'comments-area',
  props: {
    closeReplyDialog: {type: Function},
    currentPageRep: {},
    deleteComment: {},
    deleteReplyComment: {},
    emojiList: {},
    emojiPopoverRepVisible: {},
    handleCurrentRepChange: {},
    handleSizeRepChange: {},
    openReplyDialog: {},
    pageSizeRep: {},
    processedComments: {},
    processedReplyComments: {},
    replyCommentForm: {},
    replyDialogIndex: {},
    selectEmoji: {},
    showReplyDialog: {},
    submitReplyComment: {},
    toggleEmojiPopover: {},
    totalRep: {}
  }
}
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
  font-size: 20px;
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