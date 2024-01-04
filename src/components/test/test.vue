<template>
  <el-form>
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
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submit">上传到服务器
      </el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <p v-html="test" style="margin-left: 30px"></p>
  </el-form>
</template>

<script>
import axiosInstance from "@/main";

export default {
  data() {
    return {
      fileList: [],
      test: '',
    }
  },
  methods: {
    submit() {
      if (this.fileList.length > 0) {
        // 如果有选取到文件
        const formData = new FormData();
        formData.append('file', this.fileList[0].raw); // Assuming you want to upload only the first selected file
        formData.append('path', 'src/assets/comments')

        axiosInstance.post(this.$httpUrl + 'uploadImage/image', formData)
            .then(res => res.data)
            .then(res => {
              if (res.code === 200) {
                this.test = res.data
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