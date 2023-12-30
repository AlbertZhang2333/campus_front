<template>
  <div class="bg-img" :style="{ backgroundImage: `url(${imgUrl})` }">



    <el-container style="height: 1000px; border: 1px solid #eee">
      <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1" style="width: 400px;">
            <template slot="title"><i class="el-icon-menu"></i>涵泳讨论间(Learning Nexus Group Study Rooms)</template>
            <el-submenu index="1-1">
              <template slot="title">涵泳一层(Learning Nexus 1st floor)</template>
              <el-menu-item index="1-1-1" @click="hanyong101">涵泳101</el-menu-item>
              <el-menu-item index="1-1-2" @click="hanyong102">涵泳102</el-menu-item>
            </el-submenu>
            <el-submenu index="1-2">
              <template slot="title">涵泳二层(Learning Nexus 2rd floor)</template>
              <el-menu-item index="1-2-1">涵泳201</el-menu-item>
            </el-submenu>
          </el-submenu>

          <el-submenu index="2" style="width: 400px;">
            <template slot="title"><i class="el-icon-menu"></i>一丹讨论间(Yidan Group Study Rooms)</template>
            <el-submenu index="2-1">
              <template slot="title">一丹三层(Yidan 3rd floor)</template>
              <el-menu-item index="2-1-1">一丹301</el-menu-item>
              <el-menu-item index="2-1-2">一丹302</el-menu-item>
            </el-submenu>
          </el-submenu>
        </el-menu>
      </el-aside>



      <el-form class="login-container" label-width="0px">

        <div class="square-container">

          <div class="gray-square"></div>
          <div class="status-text">不可预约</div>
          <div class="interval"></div>
          <div class="red-square"></div>
          <div class="status-text">已有预约</div>
          <div class="interval"></div>

          <div class="status-text">选择时间:</div>
          <!-- <button @click="today">今天:{{ currentDate }}</button>
          <button @click="tomorrow">明天:{{ tomorrowDate }}</button>
          <button @click="TDATTT">后天:{{ TDATD }}</button> -->
          <el-button type="primary" @click="today">今天:{{ currentDate }}</el-button>
          <el-button type="primary" @click="tomorrow">明天:{{ tomorrowDate }}</el-button>
          <el-button type="primary" @click="TDATTT">后天:{{ TDATD }}</el-button>
          <!-- <el-radio-group v-model="radio1">
            <el-radio v-model="radio1" label="1" border @click="today">备选项1</el-radio>
            <el-radio v-model="radio1" label="2" border>备选项2</el-radio>
          </el-radio-group> -->

          <div class="status-text">当前地点:{{ discussionRoom }}</div>

        </div>

        <div class="array-container">
          <div v-for="(item, index) in dataArray" :key="index"
            :class="{ 'occupied': item.state == 'B', 'notAvailable': item.state == 'C' }" class="array-item">
            <div class="item-wrapper">
              {{ item.value }}
            </div>
          </div>
        </div>

        <!-- <button @click="canNotOcc">过时不能选</button>
        <button @click="tryOc">被占用</button> -->

        <el-form-item style="width: 100%;">
          <el-button type="primary" style="width:30% ; background:#505814 ;border:none;"
            v-on:click="showTable">预约</el-button>
        </el-form-item>

      </el-form>

    </el-container>

    <el-dialog :visible.sync="seeTable" class="dialog_style">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="申请信息:">
          message1
        </el-form-item>
        <el-form-item label="申请人:">
          message1
        </el-form-item>
        <el-form-item label="申请日期:">
          message1
        </el-form-item>
        <el-form-item label="活动名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>

        <el-form-item label="活动时间">

          <el-time-select placeholder="起始时间" v-model="startTime" :picker-options="{
            start: '08:00',
            end: '23:00'
          }">
          </el-time-select>
          <el-time-select placeholder="结束时间" v-model="endTime" :picker-options="{
            start: '08:00',
            end: '23:00',
            minTime: startTime//这里改不能使用的时间
          }">
          </el-time-select>

        </el-form-item>

        <el-form-item label="活动形式">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>


export default {
  data() {
    return {

      radio1: '',

      imgUrl: require('../assets/2.png'),

      currentDate: '',
      tomorrowDate: '',
      TDATD: '',

      startTime: '',
      endTime: '',
      discussionRoom: '',
      seeTable: false,

      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      },

      curtime: '14:00',
      currentTime: '',
      // state有三个状态：A：未被占用 未染色，B：已被占用 染成红色，C：已经不能被占用
      dataArray: [
        { value: '08:00', state: 'A' },
        { value: '08:30', state: 'A' },
        { value: '09:00', state: 'A' },
        { value: '09:30', state: 'A' },
        { value: '10:00', state: 'A' },
        { value: '10:30', state: 'A' },
        { value: '11:00', state: 'A' },
        { value: '11:30', state: 'A' },
        { value: '12:00', state: 'A' },
        { value: '12:30', state: 'A' },
        { value: '13:00', state: 'A' },
        { value: '13:30', state: 'A' },
        { value: '14:00', state: 'A' },
        { value: '14:30', state: 'A' },
        { value: '15:00', state: 'A' },
        { value: '15:30', state: 'A' },
        { value: '16:00', state: 'A' },
        { value: '16:30', state: 'A' },
        { value: '17:00', state: 'A' },
        { value: '17:30', state: 'A' },
        { value: '18:00', state: 'A' },
        { value: '18:30', state: 'A' },
        { value: '19:00', state: 'A' },
        { value: '19:30', state: 'A' },
        { value: '20:00', state: 'A' },
        { value: '20:30', state: 'A' },
        { value: '21:00', state: 'A' },
        { value: '21:30', state: 'A' },
        { value: '22:00', state: 'A' },
        { value: '22:30', state: 'A' },
      ]
    }
  },
  mounted() {
    // 在组件挂载后开始更新时间
    this.currentTime = this.updateCurrentTime;
    // 每隔一秒更新一次时间
    setInterval(() => {
      this.currentTime = this.updateCurrentTime;
    }, 1000);
  },

  computed: {
    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const tomorrow = new Date();
      tomorrow.setDate(now.getDate() + 1);
      const TDAT = new Date();
      TDAT.setDate(now.getDate() + 2);

      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

      this.currentDate = now.toLocaleString('zh-CN', options);
      this.tomorrowDate = tomorrow.toLocaleString('zh-CN', options);
      this.TDATD = TDAT.toLocaleString('zh-CN', options);

      // 格式化时间，保证小时、分钟、秒数始终是两位数
      const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

      return formattedTime;
    }
  },

  methods: {
    showTable() {
      this.seeTable = true;
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    canNotOcc() {

      for (var m in this.dataArray) {
        if (this.dataArray[m].value.localeCompare(this.currentTime) <= 0) {
          this.dataArray[m].state = 'C';
        }
      }

    },

    tryOc() {
      this.dataArray[20].state = 'B';
      this.dataArray[29].state = 'B';
    },

    padZero(value) {
      // 补零函数，确保数值始终是两位数
      return value < 10 ? `0${value}` : value;
    },

    hanyong101() {
      this.discussionRoom = '涵泳101';
      for (var m in this.dataArray) {
        this.dataArray[m].state = 'A';
      }
      this.dataArray[20].state = 'B';
      this.dataArray[29].state = 'B';
      for (var m in this.dataArray) {
        if (this.dataArray[m].value.localeCompare(this.currentTime) <= 0) {
          this.dataArray[m].state = 'C';
        }
      }
    },

    hanyong102() {
      this.discussionRoom = '涵泳102';
      for (var m in this.dataArray) {
        this.dataArray[m].state = 'A';
      }
      this.dataArray[20].state = 'B';
      this.dataArray[28].state = 'B';
      for (var m in this.dataArray) {
        if (this.dataArray[m].value.localeCompare(this.currentTime) <= 0) {
          this.dataArray[m].state = 'C';
        }
      }
    },

    today() {
      //记得拿到房间的数据

      //渲染预约房间
      for (var m in this.dataArray) {
        this.dataArray[m].state = 'A';
      }
      this.dataArray[20].state = 'B';
      this.dataArray[28].state = 'B';

      //渲染不能预约的时间
      for (var m in this.dataArray) {
        if (this.dataArray[m].value.localeCompare(this.currentTime) <= 0) {
          this.dataArray[m].state = 'C';
        }
      }
    },

    tomorrow() {
      //记得拿到房间的数据,也就是this.discussionRoom
      // 明天和后天已经不需要渲染不能预约的时间
      for (var m in this.dataArray) {
        this.dataArray[m].state = 'A';
      }
      this.dataArray[20].state = 'B';
      this.dataArray[28].state = 'B';

    },

    TDATTT() {
      //后天
      //记得拿到房间的数据
      // 明天和后天已经不需要渲染不能预约的时间
      for (var m in this.dataArray) {
        this.dataArray[m].state = 'A';
      }
      this.dataArray[20].state = 'B';
      this.dataArray[28].state = 'B';

    },

  },

  padZero(value) {
    // 补零函数，确保数值始终是两位数
    return value < 10 ? `0${value}` : value;
  },

}

</script>

<style>
.login-container {
  border-radius: 15px;
  background-clip: padding-box;
  margin: 90px auto;
  width: 1200px;
  height: 350px;
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

.array-container {
  display: flex;
  flex-wrap: wrap;
}

.array-item {
  border: 1px solid #ddd;
  padding: 5px;
  margin: 5px;
  flex: 0 0 calc(20% - 10px);
  /* 调整宽度为适当的值，这里是 20% 的宽度 */
  box-sizing: border-box;
}

.item-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.occupied {
  background-color: red;
}

.notAvailable {
  background-color: gray;
}

.square-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  /* 调整正方形组之间的间距 */
}

.gray-square,
.red-square {
  width: 30px;
  height: 30px;
  margin-right: 20px;
  /* 调整正方形之间的间距 */
}

.gray-square {
  background-color: gray;
}

.red-square {
  background-color: red;
}

.status-text {
  margin-left: 20px;
  /* 调整文字与正方形之间的间距 */
  color: black;
  /* 选择适当的文字颜色 */
}

.interval {
  margin-left: 40px;
  /* 调整文字与正方形之间的间距 */
}
</style>
