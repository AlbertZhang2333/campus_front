<template>
  <div class="user-profile">
    <el-form label-width="80px" size="small">

      <el-container class="icon-container">
        <el-row>
          <img :src="url" class="user-icon">
        </el-row>
        <el-row>
          <el-select v-model="form.userIcon" placeholder="请选择" @change="loadIcon">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-row>
      </el-container>

      <el-form-item label="用户名" class="form-item">
        <el-input v-model="form.username" autocomplete="off" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" class="form-item">
        <el-input v-model="form.userMail" disabled autocomplete="off" style="width: 400px"></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axiosInstance from '@/main';

export default {
  name: "Person",
  data() {
    return {
      form: {},
      options: [
        { value: 0, label: '圣诞' },
        { value: 1, label: '女仆' },
        { value: 2, label: '甜甜圈' },
        { value: 3, label: '雪人' },
        { value: 4, label: '学霸' },
        { value: 5, label: '邮差' },
        { value: 6, label: '生日' },
        { value: 7, label: '万圣节' },
        { value: 8, label: '厨师' },
      ],
      url: "",
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    async load() {
      const response = await axiosInstance.get(`http://localhost:8081/login/getAccountInfo`);
      if(response.data.code === 400){
        alert(response.data.data);
      }else{
          this.form = response.data.data;
      }
      this.loadIcon();
    },
    loadIcon(){
      this.url = require(`@/assets/user_icon/${this.form.userIcon}.jpg`);
      console.log("url", this.url);
    },
    async save() {
      const response = await axiosInstance.put(`http://localhost:8081/login/changeUserIconAndUsername?UserIcon=${this.form.userIcon}&username=${this.form.username}`)
      if(response.data.code == 400){
        alert(response.data.date);
      }else{
        this.$message({
          message: '修改成功!',
          type: 'success'
        });
        localStorage.setItem('passToken', response.data.data)
        this.load();
      }
    },
  }
};
</script>

<style scoped>
.user-profile {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* 设置最小高度为屏幕高度 */
}

.icon-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-icon {
  width: 160px;
  height: 160px;
  margin-bottom: 10px;
  border-radius: 50%; /* 圆形头像 */
}

.form-item {
  margin-left: 20px;
  margin-top: 20px;
}
</style>
