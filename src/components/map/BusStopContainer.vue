
<template>
    <div>
      <el-row>
        <el-col :span="2" class="left">
          出发地：
        </el-col>
        <el-col :span="13" class="center">
          <el-input
            v-model="busStopInput"
            @input="handleInputChange"
            placeholder="输入站点名"
            id="BusStopInput"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="openAddBusStopDialog">
          增加站点
        </el-button>
      </el-row>
      <el-table
        :data="BusStopList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        stripe>
        <el-table-column
          prop="name"
          label="站点名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lat"
          label="站点纬度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="lng"
          label="站点经度"
          width="180">
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button @click="editBusStop(scope.row)" type="primary" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button @click="deleteBusStop(scope.row)" type="danger" icon="el-icon-delete">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog :visible.sync="addBusStop_dialog">
        <h3 class="dialog-title">新增站点</h3>
        <el-form
          ref="BusStop"
          :model="BusStop"
          :rules="busStopAddRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form"
        >
          <el-form-item label="站点名" prop="name">
            <el-input v-model="BusStop.name" prefix-icon="el-icon-busStop"/>
          </el-form-item>
          <el-form-item label="站点纬度" prop="lat">
            <el-input v-model="BusStop.lat" prefix-icon="el-icon-busStop"/>
          </el-form-item>
          <el-form-item label="站点经度" prop="lng">
            <el-input v-model="BusStop.lng" prefix-icon="el-icon-busStop"/>
          </el-form-item>
        </el-form>
        <el-button @click="submitAddBusStop(true, -1)" class="dialog-button">
          提交添加
        </el-button>
      </el-dialog>
  
      <el-dialog :visible.sync="updateBusStop_dialog">
        <h3 class="dialog-title">修改站点</h3>
        <el-form
          ref="BusStop"
          :model="BusStop"
          :rules="busStopAddRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form"
        >
          <el-form-item label="站点名" prop="name">
            <el-input v-model="BusStop.name" prefix-icon="el-icon-busStop"/>
          </el-form-item>
          <el-form-item label="站点纬度" prop="lat">
            <el-input v-model="BusStop.lat" prefix-icon="el-icon-busStop"/>
          </el-form-item>
          <el-form-item label="站点经度" prop="lng">
            <el-input v-model="BusStop.lng" prefix-icon="el-icon-busStop"/>
          </el-form-item>
        </el-form>
        <el-button @click="updateAddBusStop()" class="dialog-button">
          提交修改
        </el-button>
      </el-dialog>
      </div>
  </template>
    
  <script>
  import axiosInstance from "@/main";
  export default {
    mounted(){
      this.updateBusStopList();
    },
    data() {
      return {
          busStopInput: '',
          BusStop: {
              id:0,
              name: "",
              lng: 114.001343,
              lat: 22.596590,
          },
          BusStopList:[],
          busStopAddRule:{
              name:[
              {required:true,message: "校巴站名不能为空", trigger:'blur'}
              ],
              lat:[
              {required:true, message: "纬度不能为空", trigger:'blur'},
              {pattern: /^2[1-3]\.\d{0,7}$/,
                message: "纬度超出学校范围啦",
                trigger: "blur"}
              ],
              lng:[
              {required:true, message:"经度不能为空", trigger:'blur'},
              {pattern: /^11[2-4]\.\d{0,7}$/,
              message: "经度超出学校范围啦",
              trigger: "blur"}
              ],
  
          },
  
          addBusStop_dialog:false,
          updateBusStop_dialog:false,
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
      openAddBusStopDialog(){
          this.addBusStop_dialog=true;
      },
      async submitAddBusStop(submitOrUpdate,index){
        const response = await axiosInstance.post(`${this.$httpUrl}addStop?lat=${this.BusStop.lat}&lng=${this.BusStop.lng}&name=${this.BusStop.name}`);
        if(response.data.code == 400) alert("添加失败");
        else alert('submit!');
        this.addBusStop_dialog=false;
        this.updateBusStopList();
      },
      async editBusStop(curBusStop){
        //将当前站点信息填入弹窗
          this.updateBusStop_dialog=true;
          this.BusStop.id = curBusStop.id;
          this.BusStop.name = curBusStop.name;
          this.BusStop.lng = curBusStop.lng;
          this.BusStop.lat = curBusStop.lat;
      },
      async updateAddBusStop(){
        //将弹窗中的信息更新到数据库
          const response = await axiosInstance.put(`${this.$httpUrl}updateStop?id=${this.BusStop.id}&lat=${this.BusStop.lat}&lng=${this.BusStop.lng}&name=${this.BusStop.name}`);
          if(response.data.code == 400) alert("修改失败");
          else alert('update!');
          this.updateBusStop_dialog=false;
          this.updateBusStopList();
      },
      async deleteBusStop(curBusStop) {
        const response = await axiosInstance.delete(`${this.$httpUrl}deleteStop/${curBusStop.id}`);
        if(response.data.code == 400) alert("删除失败");
        else alert('delete!');
        this.updateBusStopList();
      },
      async updateBusStopList(){
        //模糊查询相关，需要后端有通过 like 查询的接口
          const response = await axiosInstance.get(`${this.$httpUrl}allStop`);
          if(response.data.code == 400){
            alert("查询失败");
          }else{
            this.BusStopList = response.data.data;
          }
      },
      handleInputChange: _.debounce(async function() {
        try {
            if(this.busStopInput === '') {
              this.updateBusStopList();
              return;
            }else {
              const response = await this.searchOnServer(this.busStopInput);
              this.BusStopList = response;
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
      }, 300),
      async searchOnServer(busStopInput) {
        const response = await axiosInstance.get(`${this.$httpUrl}searchingBusStop/${busStopInput}`);
        return response.data.data;
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
  </style>