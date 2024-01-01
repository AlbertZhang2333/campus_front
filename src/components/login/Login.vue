<template>
  <body id="poster">
  <el-form class="login-container" label-position="left" label-width="0px">
    <h3 class="login_title">
      系统登录
      <el-button @click="toRegister">点我注册</el-button>
    </h3>
    <el-form-item label="">
      <el-input type="text" v-model="loginForm.userMail" autocomplete="off" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%;">
      <el-button type="primary" style="width:100% ; background:#505814 ;border:none;" v-on:click="Login">登录
      </el-button>
    </el-form-item>
    <el-form-item style="width: 100%;">
      <el-button type="primary" style="width:100% ; background:#505814 ;border:none;"
                 v-on:click="toForgotPassword">忘记密码
      </el-button>
    </el-form-item>
  </el-form>
  </body>
</template>
<script>

import axiosInstance from "@/main";
import {mapState} from "vuex";

export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userMail: '',
        password: '',
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    async Login() {
      console.log("usermail:" + this.loginForm.userMail + "password:" + this.loginForm.password);
      const response = await axiosInstance.post(`${this.$httpUrl}login/loginCheck?userMail=${this.loginForm.userMail}&password=${this.loginForm.password}`);
      if (response.data.code === 400) {
        this.$message.error('登录失败!')
      } else {
        localStorage.setItem('passToken', response.data.data)
        this.$message.success('登录成功!')
        axiosInstance.get(this.$httpUrl + 'login/getAccountInfo', {params: {}}).then(res => res.data).then(res => {
          console.log(res)
          if (res.code !== 200) {
            this.$message.warning('数据加载失败!');
          } else {
            console.log('res:')
            console.log(res.data)
            const packInfo = {
              identity: res.data.identity,
              userIcon: res.data.userIcon,
              userMail: res.data.userMail,
              username: res.data.username,
            }
            localStorage.setItem('username', res.data.username);
            localStorage.setItem('userMail', res.data.userMail);
            localStorage.setItem('userIcon', res.data.userIcon);
            localStorage.setItem('identity', res.data.identity);

            console.log(packInfo)
            this.$store.commit('updateUserInfo', packInfo)
            console.log(this.userInfo)
          }
        }).catch(error => {
          console.error('Error adding comment:', error);
          this.$message.warning('数据加载失败!');
        });

        await this.$router.push(`/home`)
      }
    },
    toForgotPassword() {
      this.$router.push({path: '/Forgot'})
    },
    toRegister() {
      this.$router.push({path: '/Register'})
    }
  }
}
</script>

<style>
#poster {
  background-position: center;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: fixed;
}

body {
  margin: 0px;
  padding: 0px;
}

.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 1000px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.login_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
</style>