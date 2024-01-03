
<template>
    <div>
        <el-row>
            <el-button @click="openAddBusLineDialog">
                增加校巴线路
            </el-button>
        </el-row>
        <el-table
        :data="BusLineList"
        style="width: 100%"
        :row-class-lineId="tableRowClassName"
        stripe>
        <el-table-column
            prop="lineId"
            label="线路名"
            width="180">
        </el-table-column>
        <el-table-column
            prop="direction"
            label="方向"
            width="180">
        </el-table-column>
        <el-table-column
            prop="startTime"
            label="运营起始时间"
            width="180">
        </el-table-column>
        <el-table-column
            prop="endTime"
            label="运营结束时间"
            width="180">
        </el-table-column>
        <el-table-column>
            <template #default="scope">
            <el-button @click="editBusLine(scope.row)" type="primary" icon="el-icon-edit">
                编辑
            </el-button>
            <el-button @click="deleteBusLine(scope.row)" type="danger" icon="el-icon-delete">
                移除
            </el-button>
            </template>
        </el-table-column>
        </el-table>
  
      <el-dialog :visible.sync="addBusLine_dialog">
        <h3 class="dialog-title">新增校巴线路信息</h3>
        <el-form
          ref="BusLine"
          :model="BusLine"
          :rules="busLineAddRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form"
        >
          <el-form-item label="线路名" prop="lineId">
            <el-input v-model="BusLine.lineId" prefix-icon="el-icon-busLine"/>
          </el-form-item>
          <el-form-item label="方向" prop="direction">
            <el-input v-model="BusLine.direction" prefix-icon="el-icon-busLine"/>
          </el-form-item>
          <el-form-item label="运营起始时间" prop="startTime">
            <el-input v-model="BusLine.startTime" prefix-icon="el-icon-busLine"/>
          </el-form-item>
          <el-form-item label="运营结束时间" prop="endTime">
            <el-input v-model="BusLine.endTime" prefix-icon="el-icon-busLine"/>
          </el-form-item>
        </el-form>
        <el-button @click="submitAddBusLine(true, -1)" class="dialog-button">
          提交添加
        </el-button>
      </el-dialog>
  
      <el-dialog :visible.sync="updateBusLine_dialog">
        <h3 class="dialog-title">修改校巴线路信息</h3>
        <el-form
          ref="BusLine"
          :model="BusLine"
          :rules="busLineAddRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form"
        >
          <el-form-item label="线路名" prop="lineId">
            <el-input v-model="BusLine.lineId" prefix-icon="el-icon-busLine"/>
          </el-form-item>
          <el-form-item label="方向" prop="direction">
            <el-input v-model="BusLine.direction" prefix-icon="el-icon-busLine"/>
          </el-form-item>
          <el-form-item label="运营起始时间" prop="startTime">
            <el-input v-model="BusLine.startTime" prefix-icon="el-icon-busLine"/>
          </el-form-item>
          <el-form-item label="运营结束时间" prop="endTime">
            <el-input v-model="BusLine.endTime" prefix-icon="el-icon-busLine"/>
          </el-form-item>
        </el-form>
        <el-button @click="updateAddBusLine()" class="dialog-button">
          提交修改
        </el-button>
      </el-dialog>
      </div>
  </template>
    
  <script>
  import axiosInstance from "@/main";
  export default {
    mounted(){
      this.updateBusLineList();
    },
    data() {
      return {
          busLineInput: '',
          activeName: 'Current_sales_items',
          BusLine: {
              id:0,
              lineId: 0,
              direction: "",
              startTime: "",
              endTime: "",
          },
          BusLineList:[],
          busLineAddRule:{
              lineId:[
              {required:true, message:"校巴线路id不能为空", trigger:'blur'},
              {pattern:/^[1-9]\d*$/, message: "校巴线路id应为一个正整数", trigger:'blur'}
              ],
              direction:[
              {required:true, message:"方向信息不能为空",trigger:'blur'}
              ],
              startTime:[
              {required:true, message:"开始运营时间不能为空", trigger:'blur'},
              {pattern:/^([01][0-9]|2[0-3]):[0-5][0-9]$/, message: "时间格式应为hh:mm", trigger:'blur'}
              ],
              endTime:[
              {required:true, message:"结束运营时间不能为空",trigger:'blur'},
              {pattern:/^([01][0-9]|2[0-3]):[0-5][0-9]$/, message: "时间格式应为hh:mm", trigger:'blur'}
              ]
          },
  
          addBusLine_dialog:false,
          updateBusLine_dialog:false,
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
      openAddBusLineDialog(){
          this.addBusLine_dialog=true;
      },
      async submitAddBusLine(submitOrUpdate,index){
        const response = await axiosInstance.post(`${this.$httpUrl}addLine?lineId=${this.BusLine.lineId}&direction=${this.BusLine.direction}&startTime=${this.BusLine.startTime}&endTime=${this.BusLine.endTime}&inService=true&startStopId=-1&endStopId=-1`);
        if(response.data.code == 400) this.$message.error("添加失败");
        else this.$message.success("添加失败");
        this.addBusLine_dialog=false;
        this.updateBusLineList();
      },
      async editBusLine(curBusLine){
        //将当前建筑信息填入弹窗
          this.updateBusLine_dialog=true;
          this.BusLine.id = curBusLine.id;
          this.BusLine.lineId = curBusLine.lineId;
          this.BusLine.direction = curBusLine.direction;
          this.BusLine.startTime = curBusLine.startTime;
          this.BusLine.endTime = curBusLine.endTime;
      },
      async updateAddBusLine(){
        //将弹窗中的信息更新到数据库
          const response = await axiosInstance.put(`${this.$httpUrl}updateLine?id=${this.BusLine.id}&LineId=${this.BusLine.lineId}&startTime=${this.BusLine.startTime}&endTime=${this.BusLine.endTime}&direction=${this.BusLine.direction}&inService=true&startStopId=-1&endStopId=-1`);
          if(response.data.code == 400) this.$message.error("更新失败");
          else this.$message.success("更新成功");
          this.updateBusLine_dialog=false;
          this.updateBusLineList();
      },
      async deleteBusLine(curBusLine) {
        const response = await axiosInstance.delete(`${this.$httpUrl}deleteLine/${curBusLine.id}`);
        if(response.data.code == 400) this.$message.error("删除失败");
        else this.$message.success("删除成功");
        this.updateBusLineList();
      },
      async updateBusLineList(){
        //模糊查询相关，需要后端有通过 like 查询的接口
          const response = await axiosInstance.get(`${this.$httpUrl}allLine`);
          if(response.data.code == 400) this.$message.error("查询失败");
          else this.BusLineList = response.data.data;
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