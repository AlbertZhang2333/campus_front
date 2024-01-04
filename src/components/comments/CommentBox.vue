<template>
  <el-container style="max-width: 600px; margin: 20px auto;">
    <el-form :model="commentForm" ref="commentForm" size="large" @submit.native.prevent>
      <el-form-item label="评论内容" prop="content" style="width: 500px; height: 150px">
        <el-input type="textarea" v-model="commentForm.comment" :autosize="{minRows:5}" maxlength="200"
                  show-word-limit></el-input>
      </el-form-item>
      <el-form-item style="display: flex; align-items: center; justify-items: center">
        <el-button type="primary" @click="$emit('submit', commentForm)">发表评论</el-button>
        <el-button type="primary" @click="showEmoji=!showEmoji"><i class="el-icon-smile"></i> Emoji</el-button>
        <el-form-item>
          <el-upload
              accept=".jpg, .png"
              action="#"
              :before-upload="() => false"
              :auto-upload="false"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-change="handleChange"
              :file-list="fileList"
              :limit="1"
          >
            <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin-left: 10px;" size="small" type="success" @click="upload">上传到服务器
            </el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
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

      fileList: [],
    }
  },
  methods: {
    selectEmoji(id) {
      this.commentForm.comment += '[' + id + ']';
      this.showEmoji = false
    },
    upload() {
      if (this.fileList.length > 0) {
        // 如果有选取到文件
        const formData = new FormData();
        formData.append('file', this.fileList[0].raw); // Assuming you want to upload only the first selected file
        formData.append('path', 'src/assets/comments')

        axiosInstance.post(this.$httpUrl + 'uploadImage/image', formData)
            .then(res => res.data)
            .then(res => {
              if (res.code === 200) {
                this.commentForm.comment += "'" + res.data + "'";
                this.$message.success('上传成功!')
              }
            })
            .catch(error => {
              // 处理错误
              console.error(error);
            });
      } else {
        this.$message.warning('请先选取图片！');
      }
      console.log(this.fileList)
    },
    handleRemove(file, fileList) {
      this.fileList = fileList
    },
    handlePreview(file) {
      console.log(file);
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
  }
}
</script>