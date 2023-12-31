<template>
  <div>
    <el-container style="height: 1000px; border: 1px solid #eee">
      <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
        <el-select v-model="curLocation" placeholder="请选择地点">
          <el-option
            v-for="location in locations"
            :key="location"
            :label="location"
            :value="location">
          </el-option>
        </el-select>
        <el-table
          :data="roomList"
          stripe
          style="width: 100%">
          <el-table-column
            prop="roomName"
            label="房间号"
            width="180">
          </el-table-column>
          <el-table-column>
            <template #default="scope">
              <el-button @click="showReservation(scope.row)" type="primary"">
                  预约
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-form class="login-container" label-width="0px">
        <div class="square-container">

          <div class="gray-square"></div>
          <div class="status-text">不可预约</div>
          <div class="interval"></div>
          <div class="red-square"></div>
          <div class="status-text">已有预约</div>
          <div class="interval"></div>

          <div class="demonstration">选择日期:</div>
          <el-date-picker
            v-model="selectedDate"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
          <div class="status-text">当前地点:{{ this.selectedRoomName }}</div>

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
        <el-form-item label="房间号:">
          <div>{{ruleForm.location}}  {{ ruleForm.roomName }}</div>
        </el-form-item>
        <el-form-item label="活动日期">
          <div>{{ ruleForm.date }}</div>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-time-select placeholder="起始时间" v-model="ruleForm.startTime" :picker-options="{
            start: '08:00',
            end: '23:00'
          }">
          </el-time-select>
          <el-time-select placeholder="结束时间" v-model="ruleForm.endTime" :picker-options="{
            start: '08:00',
            end: '23:00',
            minTime: startTime//这里改不能使用的时间
          }">
          </el-time-select>

        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button> -->
          <el-button type="primary" @click="submitForm(ruleForm)">立即创建</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>
</template>

<script>
import axiosInstance from "@/main";
export default {
  data() {
    return {
      roomList:[],
      locations:['一丹讨论间', "琳恩讨论间", "涵泳讨论间"],
      curLocation: '一丹讨论间',
      reservationList: [],
      selectedLocation: '',
      selectedRoomName: '',
      selectedDate: '',
      pickerOptions: {
          disabledDate(time) {
            const date = new Date();
            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
            return time.getTime() < Date.now() - 8.64e7 || time.getTime() > date.getTime();
          },
        },
      mintime:'8:00',
      tempdate1: '1',
      tempdate2: '2',
      tempdate3: '3',
      tempdate4: '4',

      radio1: '',

      // imgUrl: require('../assets/2.png'),


      // startTime: '',
      // endTime: '',
      seeTable: false,

      ruleForm: {
        roomName: '',
        startTime: '',
        endTime: '',
        date: '',
        location: '',
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
    this.loadRoomList();
  },

  computed: {
    updateCurrentTime() {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      const options = { year: 'numeric', month: 'numeric', day: 'numeric' };

      this.selectedDate = now.toLocaleString('zh-CN', options);

      // 格式化时间，保证小时、分钟、秒数始终是两位数
      const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

      return formattedTime;
    }
  },

  methods: {
    async loadRoomList(){
      const response = await axiosInstance.get(`http://localhost:8081/Room/findRoomByLocation?location=${this.curLocation}`);
      if(response.data.code == 400) alert("查询失败");
      else this.roomList = response.data.data;
    },

    async showReservation(curRoom){
      this.selectedRoomName = curRoom.roomName;
      this.selectedLocation
      const response = await axiosInstance.get(`http://localhost:8081/Reservation/reservationRecordByRoomNameAndDate?roomName=${curRoom.roomName}&date=${this.selectedDate}`);
      if(response.data.code == 400) alert("查询失败");
      else this.reservationList = response.data.data;
    },

    trytryneed() {
      this.tempdate1 = 11;
      this.tempdate2 = 22;

    },

    showTable() {
      this.seeTable = true;
    },

    submitForm(formName) {
      //下面是刚才写的 277-306
      this.tempdate1 = formName.date1;
      this.tempdate2 = formName.date2;

      // 将时间字符串转换为 Date 对象
      const time0 = new Date(`2000-01-01 ${this.mintime}`);
      const time1 = new Date(`2000-01-01 ${this.tempdate1}`);
      const time2 = new Date(`2000-01-01 ${this.tempdate2}`);

      // 计算时间差
      const timeDiff1 = time1 - time0;
      const timeDiff2 = time2 - time0;

      // 将时间差转换为 HH:mm 格式
      const hours1 = Math.floor(timeDiff1 / (1000 * 60 * 60));
      const minutes1 = Math.floor((timeDiff1 % (1000 * 60 * 60)) / (1000 * 60));

      const hours2 = Math.floor(timeDiff2 / (1000 * 60 * 60));
      const minutes2 = Math.floor((timeDiff2 % (1000 * 60 * 60)) / (1000 * 60));

      // 计算,转换为分钟并除以 30,tempdate3,tempdate4分别为dataArray的index
      this.tempdate3 = Math.floor((hours1 * 60 + minutes1) / 30);
      this.tempdate4 = Math.floor((hours2 * 60 + minutes2) / 30);

      // this.dataArray[this.tempdate3].state = 'B';
      // this.dataArray[this.tempdate4].state = 'B';

      for (var m = this.tempdate3; m <= this.tempdate4 ; m++) {
        this.dataArray[m].state = 'B';
      }


      //下面是提交表
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     alert('submit!');
      //   } else {
      //     console.log('error submit!!');
      //     return false;
      //   }
      // });
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