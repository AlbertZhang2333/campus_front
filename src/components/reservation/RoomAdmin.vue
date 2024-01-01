
<template>
    <div>
        <el-radio-group v-model="selectedLocation" @change="handleInputChange()" style="align-items: center;">
            <el-radio-button label="一丹讨论间"></el-radio-button>
            <el-radio-button label="琳恩讨论间"></el-radio-button>
        </el-radio-group>
      <el-row>
        <el-col :span="2" class="left">
          房间名：
        </el-col>
        <el-col :span="13" class="center">
          <el-input
            v-model="roomInput"
            @input="handleInputChange"
            placeholder="输入房间名"
            id="RoomInput"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="openAddRoomDialog" style="align-items: center;">
          增加房间
        </el-button>
      </el-row>
      <el-table
        :data="RoomList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        stripe>
        <el-table-column
          prop="roomName"
          label="房间名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="location"
          label="房间位置"
          width="180">
        </el-table-column>
        <el-table-column
          prop="capacity"
          label="房间容量"
          width="180">
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button @click="editRoom(scope.row)" type="primary" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button @click="deleteRoom(scope.row)" type="danger" icon="el-icon-delete">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog :visible.sync="addRoom_dialog">
        <h3 class="dialog-title">新增房间</h3>
        <el-form
          ref="Room"
          :model="Room"
          :rules="roomAddRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form"
        >
          <el-form-item label="房间名" prop="roomName">
            <el-input v-model="Room.roomName" prefix-icon="el-icon-room"/>
          </el-form-item>
          <el-radio-group v-model="Room.location" style="align-items: center;">
            <el-radio-button label="一丹讨论间"></el-radio-button>
            <el-radio-button label="琳恩讨论间"></el-radio-button>
          </el-radio-group>
          <el-form-item label="房间容量" prop="capacity">
            <el-input v-model="Room.capacity" prefix-icon="el-icon-room"/>
          </el-form-item>
        </el-form>
        <el-button @click="submitAddRoom(true, -1)" class="dialog-button">
          提交添加
        </el-button>
      </el-dialog>
  
      <el-dialog :visible.sync="updateRoom_dialog">
        <h3 class="dialog-title">修改房间</h3>
        <el-form
          ref="Room"
          :model="Room"
          :rules="roomAddRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form"
        >
          <el-form-item label="房间名" prop="roomName">
            <el-input v-model="Room.roomName" prefix-icon="el-icon-room"/>
          </el-form-item>
          <el-radio-group v-model="Room.location" style="align-items: center;">
            <el-radio-button label="一丹讨论间"></el-radio-button>
            <el-radio-button label="琳恩讨论间"></el-radio-button>
          </el-radio-group>
          <el-form-item label="房间容量" prop="capacity">
            <el-input v-model="Room.capacity" prefix-icon="el-icon-room"/>
          </el-form-item>
        </el-form>
        <el-button @click="updateAddRoom()" class="dialog-button">
          提交修改
        </el-button>
      </el-dialog>
      </div>
  </template>
    
  <script>
  import axiosInstance from "@/main";

  export default {
    mounted(){
      this.handleInputChange();
    },
    data() {
      return {
          roomInput: '',
          Room: {
              roomName: "",
              location: "一丹讨论间",
              capacity: 0,
          },
          RoomList:[],
          roomAddRule:{
              roomName:[
              {required:true,message: "房间名不能为空", trigger:'blur'}
              ],
              location:[
              {required:true, message: "所在地点不能为空", trigger:'blur'},
              ],
              capacity:[
              {required:true, message:"容量不能为空", trigger:'blur'},
              ]
          },
          selectedLocation: "一丹讨论间",
          addRoom_dialog:false,
          updateRoom_dialog:false,
      }
      },
  methods: {
      tableRowClassName({row, rowIndex}) {
      if (rowIndex === 1) {
          return 'warning-row';
      } else if (rowIndex === 3) {
          return 'success-row';
      }
      return '';
      },
      handleClick(tab, event) {
      console.log(tab, event);
      },
      openAddRoomDialog(){
          this.addRoom_dialog=true;
      },
      async submitAddRoom(submitOrUpdate,index){
        const response = await axiosInstance.post(`${this.$httpUrl}ManageRoom/createRoom?roomName=${this.Room.roomName}&location=${this.Room.location}&capacity=${this.Room.capacity}`);
        if(response.data.code === 400) alert(response.data.data);
        else alert('submit!');
        this.addRoom_dialog=false;
        this.handleInputChange();
      },
      async editRoom(curRoom){
        //将当前房间信息填入弹窗
          this.updateRoom_dialog=true;
          this.Room.roomName=curRoom.roomName;
          this.Room.location=curRoom.location;
          this.Room.capacity=curRoom.capacity;
      },
      async updateAddRoom(){
        //将弹窗中的信息更新到数据库
          const response = await axiosInstance.put(`${this.$httpUrl}ManageRoom/updateRoom?roomName=${this.Room.roomName}&location=${this.Room.location}&capacity=${this.Room.capacity}`);
          if(response.data.code === 400) alert(response.data.data);
          else alert('update!');
          this.updateRoom_dialog=false;
          this.handleInputChange();
      },
      async deleteRoom(curRoom) {
        const response = await axiosInstance.delete(`${this.$httpUrl}ManageRoom/deleteRoomByRoomName?roomName=${curRoom.roomName}`);
        if(response.data.code === 400) alert(response.data.data);
        else alert('delete!');
        this.handleInputChange();
      },
      handleInputChange: _.debounce(async function() {
        try {
            const response = await this.searchOnServer(this.roomInput, this.selectedLocation);
            this.RoomList = response;
        } catch (error) {
            console.error('Error during search:', error);
        }
      }, 300),
      async searchOnServer(roomInput, location) {
        if(roomInput === ""){
            const response = await axiosInstance.get(`${this.$httpUrl}ManageRoom/findRoomByLocation?location=${location}`);
            return response.data.data;
        }else {
            const response = await axiosInstance.get(`${this.$httpUrl}ManageRoom/searchByRoomAndLocation?roomName=${roomInput}&location=${location}`);
            console.log("response", response);
            return response.data.data;
        }
      },
  }
  }
  </script>
    
  <style scoped>
    .page-title {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .dialog-title {
      text-align: center;
      margin-bottom: 10px;
    }
  
    .dialog-form {
      margin-top: 10px;
    }
  
    .dialog-button {
      margin-left: 45%;
      margin-top: 20px;
    }

    .el-radio-group {
        margin-bottom: 10px;
        align-items: center;
        justify-content: center;
    }

    .el-button {
        margin-bottom: 10px;
        margin-top: 10px;
    }

    /* Add margin and padding to the input row */
    .input-row {
        margin-bottom: 20px;
    }

    /* Add margin to the button row */
    .button-row {
        margin-bottom: 20px;
    }

    .container {
        display: flex;
        flex-direction: column;
        align-items: center; /* Center horizontally */
        justify-content: center; /* Center vertically */
    }
  </style>