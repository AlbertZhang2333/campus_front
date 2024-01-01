<template>
  <div id="poster">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" label-position="left"
      class="login-container">
      <h3 class="register_title">
        系统注册
        <el-button @click="toLogin()">去登录</el-button>
      </h3>
      <el-form-item label="" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off" placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <el-form-item label="" prop="userMail">
        <el-input type="text" v-model="ruleForm.userMail" autocomplete="off" placeholder="请输入邮箱"
          prefix-icon="el-icon-user-solid"></el-input>
      </el-form-item>
      <!-- <el-form-item label="" prop="vcode">
        <el-input type="text" v-model="ruleForm.name" autocomplete="off" placeholder="请输入验证码"
          prefix-icon="el-icon-lock"></el-input>
      </el-form-item> -->
      <el-form-item label="" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"
          prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" placeholder="请确认密码"
          prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item label="" prop="code">
        <el-input type="code" v-model="ruleForm.code" autocomplete="off" placeholder="请输入验证码"
          prefix-icon="el-icon-lock"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="background: #505458; border: none;"
          @click="submitForm()">注册</el-button>
        <el-button type="primary" style="background: #505458; border: none;"
          @click="sendVcode()">发送验证码</el-button>
        <el-button type="primary" style="background: #505458; border: none;" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
import axiosInstance from "@/main";
export default {
  name: 'Register',
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        username: '',
        userMail: '',
        password: '',
        checkPass: '',
        code: '',
        UserIcon: 0,
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: 'blur' },
          { min: 2, max: 9, message: "长度2到9个字符", trigger: 'blur' }
        ],
        userMail: [
          { required: true, message: "请输入邮箱", trigger: 'blur' }
        ],
        /* vcode: [
          { required: true, message: "请输入验证码", trigger: 'blur' }
        ], */
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    async submitForm() {

      const response = await axiosInstance.post(`http://localhost:8081/login/register?username=${this.ruleForm.username}&password=${this.ruleForm.password}&userMail=${this.ruleForm.userMail}&code=${this.ruleForm.code}&UserIcon=${this.ruleForm.UserIcon}`);
      if(response.data.code == 400) {alert(response.data.data);}
      else{ 
        this.$message({
          message: '注册成功!',
          type: 'success'
        });
        this.$router.push({ path: '/home' })
      }
    },

    async sendVcode() {
      const response = await axiosInstance.get(`http://localhost:8081/login/registerVerifyCode?userMail=${this.ruleForm.userMail}`);
      if(response.data.code == 400) {alert(response.data.data);}
      else{ 
        this.$message({
          message: '验证码已发送至邮箱',
          type: 'success'
        });
      }
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    toLogin() {
      this.$router.push({ path: '/login' })
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
  margin: 0px;
  padding: 0px;
}

.register-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}

.register_title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}</style>