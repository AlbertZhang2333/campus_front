<template>

  <div>
    <div>
      <el-carousel class="carousel_style" indicator-position="outside">
        <el-carousel-item class="carousel_Item_style" v-for="item in carouselImageList" :key="item.src">
          <img :src="item.src" alt="carousel_image" class="scaled-image"/>
        </el-carousel-item>
      </el-carousel>
    </div>
    <el-container style="height: 1000px; border: 1px solid #eee">
      <el-aside width="400px" style="background-color: rgb(238, 241, 246)">
        <el-button type="primary" style="width:30% ; background:#505814 ;border:none;"
                   v-on:click="$router.push(`/reservation/record`)">预约记录
        </el-button>
        <el-select v-model="curLocation" @change="loadRoomList" placeholder="请选择地点">
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
              <el-button @click="showReservation(scope.row)" type="primary">
                预约
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-aside>
      <el-container style="display: flex; flex-direction: column">
        <el-switch v-if="admin" active-text="管理员模式" inactive-text="普通模式"
                   @change="$router.push('reservation/admin')"
                   style="margin: 20px; align-self: end; justify-self: center"></el-switch>
        <el-form class="login-container" label-width="0px" style="margin: 0">
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
                value-format="yyyy-MM-dd"
                placeholder="选择日期"
                @change="showReservation"
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

          <el-form-item style="width: 100%;">
            <el-button type="primary" style="width:30% ; background:#505814 ;border:none;"
                       v-on:click="showTable">预约
            </el-button>
          </el-form-item>

        </el-form>
      </el-container>

    </el-container>
    <el-dialog :visible.sync="dialog_visible" class="dialog_style">
      <el-form
          ref="reservation"
          :model="reservation"
          :rules="reservationRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form">
        <el-form-item label="房间号:">
          <div>{{ this.selectedRoomName }}</div>
        </el-form-item>
        <el-form-item label="活动日期">
          <div>{{ this.selectedDate }}</div>
        </el-form-item>
        <el-form-item label="活动时间">
          <el-time-select placeholder="起始时间" v-model="reservation.startTime" :picker-options="{
              start: '08:00',
              end: '23:00'
            }">
          </el-time-select>
          <el-time-select placeholder="结束时间" v-model="reservation.endTime" :picker-options="{
              start: '08:00',
              end: '23:00',
              minTime: reservation.startTime,
            }">
          </el-time-select>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import axiosInstance from "@/main";
import Main from "@/components/map/MapContainer.vue";
import MapAdmin from "@/components/map/MapAdmin.vue";
import ReservationAdmin from "@/views/reservationAdmin.vue";
import {mapState} from "vuex";

export default {
  components: {ReservationAdmin, MapAdmin, Main},
  data() {
    return {
      carouselImageList: [
        {src: "https://booking.lib.sustech.edu.cn/ic-web/upload/roomPhotos/82762638791c46dfbdb9ad41ea11bc74-banner3.99435347.jpg"},
        {src: "https://booking.lib.sustech.edu.cn/ic-web/upload/roomPhotos/0f0a0ac89915495ba25d916d43d0e4b1-banner2.0e62e187.jpg"},
        {src: "https://booking.lib.sustech.edu.cn/ic-web/upload/roomPhotos/86204a2ec4e94d7caabeb63be4c8c989-banner1.18666e27(1).jpg"},
      ],

      roomList: [],
      locations: [],
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
      currentTime: '',
      currentDate: '',
      dialog_visible: false,
      reservation: {
        startTime: '',
        endTime: '',
      },
      reservationRule: {
        startTime: {required: true, message: "开始时间不能为空", trigger: 'blur'},
        endTime: {required: true, message: "结束时间不能为空", trigger: 'blur'},
      },
      // state有三个状态：A：未被占用 未染色，B：已被占用 染成红色，C：已经不能被占用
      dataArray: [
        {value: '08:00', state: 'C'},
        {value: '08:30', state: 'C'},
        {value: '09:00', state: 'C'},
        {value: '09:30', state: 'C'},
        {value: '10:00', state: 'C'},
        {value: '10:30', state: 'C'},
        {value: '11:00', state: 'C'},
        {value: '11:30', state: 'C'},
        {value: '12:00', state: 'C'},
        {value: '12:30', state: 'C'},
        {value: '13:00', state: 'C'},
        {value: '13:30', state: 'C'},
        {value: '14:00', state: 'C'},
        {value: '14:30', state: 'C'},
        {value: '15:00', state: 'C'},
        {value: '15:30', state: 'C'},
        {value: '16:00', state: 'C'},
        {value: '16:30', state: 'C'},
        {value: '17:00', state: 'C'},
        {value: '17:30', state: 'C'},
        {value: '18:00', state: 'C'},
        {value: '18:30', state: 'C'},
        {value: '19:00', state: 'C'},
        {value: '19:30', state: 'C'},
        {value: '20:00', state: 'C'},
        {value: '20:30', state: 'C'},
        {value: '21:00', state: 'C'},
        {value: '21:30', state: 'C'},
        {value: '22:00', state: 'C'},
        {value: '22:30', state: 'C'},
      ]
    }
  },
  mounted() {
    this.updateCurrentTime();
    this.loadRoomList();
    this.loadLocation();
    this.selectedDate = this.currentDate;
  },
  methods: {
    async loadLocation() {
      const response = await axiosInstance.get(`${this.$httpUrl}Room/getAllLocation`);
      if (response.data.code == 400) alert(response.data.data);
      else this.locations = response.data.data;
    },
    updateCurrentTime() {
      var date = new Date();
      var nowMonth = date.getMonth() + 1;
      var strDate = date.getDate();
      var seperator = "-";
      if (nowMonth >= 1 && nowMonth <= 9) {
        nowMonth = "0" + nowMonth;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      this.currentDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
      this.currentTime = date.getHours() + ":" + date.getMinutes();
    },
    async loadRoomList() {
      const response = await axiosInstance.get(`${this.$httpUrl}Room/findRoomByLocation?location=${this.curLocation}`);
      if (response.data.code == 400) alert(response.data.data);
      else this.roomList = response.data.data;
    },

    async showReservation(curRoom) {
      this.resetArray();
      if (curRoom != undefined && curRoom.roomName != undefined) this.selectedRoomName = curRoom.roomName;
      const response = await axiosInstance.get(`${this.$httpUrl}Reservation/reservationRecordByRoomNameAndDate?roomName=${this.selectedRoomName}&date=${this.selectedDate}`);
      if (response.data.code == 400) alert("查询失败");
      else this.reservationList = response.data.data;
      if (this.selectedDate == this.currentDate) {
        for (var m in this.dataArray) {
          if (this.dataArray[m].value.localeCompare(this.currentTime) <= 0) {
            this.dataArray[m].state = 'C';
          }
        }
      }
      for (var i = 0, len = this.reservationList.length; i < len; i++) {
        if (this.reservationList[i].date != this.selectedDate) continue;
        var startTime = this.reservationList[i].startTime;
        var endTime = this.reservationList[i].endTime;
        var start = startTime.split(":");
        var end = endTime.split(":");
        var startHour = parseInt(start[0]);
        var startMinute = parseInt(start[1]);
        var endHour = parseInt(end[0]);
        var endMinute = parseInt(end[1]);
        var startIndex = (startHour - 8) * 2 + startMinute / 30;
        var endIndex = (endHour - 8) * 2 + endMinute / 30;
        for (var j = startIndex; j < endIndex; j++) {
          this.dataArray[j].state = 'B';
        }
      }
    },

    showTable() {
      if(this.selectedRoomName != "") this.dialog_visible = true;
      else alert("请先选择房间");
    },

    resetArray() {
      for (var m in this.dataArray) {
        this.dataArray[m].state = 'A';
      }
    },

    async submitForm() {
      this.dialog_visible = false;
      const response = await axiosInstance.post(`${this.$httpUrl}Reservation/reservationAdd?roomName=${this.selectedRoomName}&date=${this.selectedDate}&startTime=${this.reservation.startTime}:00&endTime=${this.reservation.endTime}:00&location=${this.curLocation}`);
      if (response.data.code == 400) alert(response.data.data);
      else {
        alert("预约成功");
        this.showReservation();
      }
    },
  },
  computed: {
    ...mapState(['userInfo']),
    admin() {
      return this.userInfo.identity === '2'
    }
  }
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


.carousel_style {
  color: #eeab64;
  margin: auto;
  line-height: 0px;
  flex: auto;
  width: 100%;
  height: 330px;
  border-radius: 0px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.carousel_Item_style {
  margin: auto;
  flex: auto;
  width: 100%;
  height: 280px;
}

.scaled-image {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio and cover entire container */
}

</style>