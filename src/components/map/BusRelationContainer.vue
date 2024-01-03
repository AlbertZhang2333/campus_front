
<template>
    <div>
      <el-row>
        <el-col :span="2" class="left">
          出发地：
        </el-col>
        <el-col :span="13" class="center">
          <el-input
            v-model="busRelationInput"
            @input="handleInputChange"
            placeholder="输入路线名"
            id="BusRelationInput"
          >
          </el-input>
        </el-col>
      </el-row>
      <el-row>
        <el-button @click="openAddBusRelationDialog">
          增加路线
        </el-button>
      </el-row>
      <el-table
        :data="BusRelationList"
        style="width: 100%"
        :row-class-name="tableRowClassName"
        stripe>
        <el-table-column
          prop="lineId"
          label="校巴线"
          width="180">
        </el-table-column>
        <el-table-column
          prop="direction"
          label="方向"
          width="180">
        </el-table-column>
        <el-table-column
          prop="startStop"
          label="上车站"
          width="180">
        </el-table-column>
        <el-table-column
          prop="endStop"
          label="下车站">
        </el-table-column>
        <el-table-column
          prop="time"
          label="耗时">
        </el-table-column>
        <el-table-column
          prop="stopNum"
          label="途径站点数">
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button @click="editBusRelation(scope.row)" type="primary" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button @click="deleteBusRelation(scope.row)" type="danger" icon="el-icon-delete">
              移除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <el-dialog :visible.sync="addBusRelation_dialog">
        <h3 class="dialog-title">新增路线</h3>
        <el-form
          ref="BusRelation"
          :model="BusRelation"
          :rules="busRelationAddRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form"
        >
          <el-form-item label="校巴线" prop="lineId">
            <el-input v-model="BusRelation.lineId" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="方向" prop="direction">
            <el-input v-model="BusRelation.direction" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="上车站" prop="startStop">
            <el-input v-model="BusRelation.startStop" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="下车站" prop="endStop">
            <el-input v-model="BusRelation.endStop" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="耗时" prop="time">
            <el-input v-model="BusRelation.time" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="途径站点数" prop="stopNum">
            <el-input v-model="BusRelation.stopNum" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
        </el-form>
        <el-button @click="submitAddBusRelation(true, -1)" class="dialog-button">
          提交添加
        </el-button>
      </el-dialog>
  
      <el-dialog :visible.sync="updateBusRelation_dialog">
        <h3 class="dialog-title">修改路线</h3>
        <el-form
          ref="BusRelation"
          :model="BusRelation"
          :rules="busRelationAddRule"
          label-width="100px"
          label-position="right"
          size="small"
          class="dialog-form"
        >
          <el-form-item label="校巴线" prop="lineId">
            <el-input v-model="BusRelation.lineId" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="方向" prop="direction">
            <el-input v-model="BusRelation.direction" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="上车站" prop="startStop">
            <el-input v-model="BusRelation.startStop" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="下车站" prop="endStop">
            <el-input v-model="BusRelation.endStop" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="耗时" prop="time">
            <el-input v-model="BusRelation.time" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
          <el-form-item label="途径站点数" prop="stopNum">
            <el-input v-model="BusRelation.stopNum" prefix-icon="el-icon-busRelation"/>
          </el-form-item>
        </el-form>
        <el-button @click="updateAddBusRelation()" class="dialog-button">
          提交修改
        </el-button>
      </el-dialog>
      </div>
  </template>
    
  <script>
  import axiosInstance from "@/main";
  export default {
    mounted(){
      this.updateBusRelationList();
    },
    data() {
      return {
          busRelationInput: '',
          BusRelation: {
              id:0,
              lineId: 0,
              direction: '',
              startStop: '',
              endStop: '',
              time: 0,
              stopNum: 0,
          },
          BusRelationList:[],
          busRelationAddRule:{
              lineId:[
              {required:true, message:"校巴线路id不能为空", trigger:'blur'},
              {pattern:/^[1-9]\d*$/, message: "线路id应为一个正整数", trigger:'blur'}
              ],
              direction:[
              {required:true, message:"方向信息不能为空",trigger:'blur'}
              ],
              startStop:[
              {required:true, message:"始发站信息不能为空", trigger:'blur'}
              ],
              endStop:[
                {required:true, message:"终点站下信息不能为空", trigger: 'blur'}
              ],
              time:[
              {required:true, message:"耗时信息不能为空", trigger: 'blur'},
              {pattern:/^[1-9]\d*$/, message: "耗时应为一个正整数", trigger:'blur'}
              ],
              stopNum:[
              {required:true, message:"所经站数不能为空", trigger: 'blur'},
              {pattern:/^[1-9]\d*$/, message: "所经站数应为一个正整数", trigger:'blur'}
              ]
  
          },
  
          addBusRelation_dialog:false,
          updateBusRelation_dialog:false,
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
      openAddBusRelationDialog(){
          this.addBusRelation_dialog=true;
      },
      async submitAddBusRelation(submitOrUpdate,index){
        const response = await axiosInstance.post(`${this.$httpUrl}addRelation?lineId=${this.BusRelation.lineId}&direction=${this.BusRelation.direction}&startStop=${this.BusRelation.startStop}&endStop=${this.BusRelation.endStop}&time=${this.BusRelation.time}&stopNum=${this.BusRelation.stopNum}`);
        if(response.data.code == 400) alert("添加失败");
        else this.$message.success('添加成功');
        this.addBusRelation_dialog=false;
        this.updateBusRelationList();
      },
      async editBusRelation(curBusRelation){
        //将当前路线信息填入弹窗
          this.updateBusRelation_dialog=true;
          this.BusRelation.id = curBusRelation.id;
          this.BusRelation.lineId = curBusRelation.lineId;
          this.BusRelation.direction = curBusRelation.direction;
          this.BusRelation.startStop = curBusRelation.startStop;
          this.BusRelation.endStop = curBusRelation.endStop;
          this.BusRelation.time = curBusRelation.time;
          this.BusRelation.stopNum = curBusRelation.stopNum;
      },
      async updateAddBusRelation(){
        //将弹窗中的信息更新到数据库
          const response = await axiosInstance.put(`${this.$httpUrl}updateRelation?id=${this.BusRelation.id}&lineId=${this.BusRelation.lineId}&direction=${this.BusRelation.direction}&startStop=${this.BusRelation.startStop}&endStop=${this.BusRelation.endStop}&time=${this.BusRelation.time}&stopNum=${this.BusRelation.stopNum}`);
          if(response.data.code == 400) alert("更新失败");
          else this.$message.success('更新成功');
          this.updateBusRelation_dialog=false;
          this.updateBusRelationList();
      },
      async deleteBusRelation(curBusRelation) {
        const response = await axiosInstance.delete(`${this.$httpUrl}deleteRelation/${curBusRelation.id}`);
        if(response.data.code == 400) alert("删除失败");
        else this.$message.success('删除成功');
        this.updateBusRelationList();
      },
      async updateBusRelationList(){
          const response = await axiosInstance.get(`${this.$httpUrl}allRelation`);
          if(response.data.code == 400) alert("查询失败");
          else this.BusRelationList = response.data.data;
      },
      handleInputChange: _.debounce(async function() {
        try {
            if(this.busRelationInput === '') {
              this.updateBusRelationList();
              return;
            }else {
              const response = await this.searchOnServer(this.busRelationInput);
              this.BusRelationList = response;
            }
        } catch (error) {
            console.error('Error during search:', error);
        }
      }, 300),
      async searchOnServer(busRelationInput) {
        //模糊查询相关，需要后端有通过 like 查询的接口
        const response = await axiosInstance.get(`${this.$httpUrl}searchByStartOrEnd/${busRelationInput}`);
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