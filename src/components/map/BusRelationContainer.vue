
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
              {required:true,trigger:'blur'}
              ],
              direction:[
              {required:true,trigger:'blur'}
              ],
              startStop:[
              {required:true,trigger:'blur'}
              ],
              endStop:[
                {required:true, trigger: 'blur'}
              ],
              time:[
              {required:true, trigger: 'blur'}
              ],
              stopNum:[
              {required:true, trigger: 'blur'}
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
      submitAddBusRelation(submitOrUpdate,index){
      this.$refs.BusRelation.validate((valid) =>{
          if(valid){
              this.$axios.post(`http://localhost:8081/addRelation?lineId=${this.BusRelation.lineId}&direction=${this.BusRelation.direction}&startStop=${this.BusRelation.startStop}&endStop=${this.BusRelation.endStop}&time=${this.BusRelation.time}&stopNum=${this.BusRelation.stopNum}`);
              alert('submit!');
              this.addBusRelation_dialog=false;
              this.updateBusRelationList();
          }
      })
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
          this.$axios.put(`http://localhost:8081/updateRelation?id=${this.BusRelation.id}&lineId=${this.BusRelation.lineId}&direction=${this.BusRelation.direction}&startStop=${this.BusRelation.startStop}&endStop=${this.BusRelation.endStop}&time=${this.BusRelation.time}&stopNum=${this.BusRelation.stopNum}`);
          alert('update!');
          this.updateBusRelation_dialog=false;
          this.updateBusRelationList();
      },
      deleteBusRelation: _.debounce(async function(curBusRelation) {
        this.$axios.delete(`http://localhost:8081/deleteRelation/${curBusRelation.id}`)
          .then(res => res.data)
          .then(res => {
            console.log(res);
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
            this.loadPost();
            this.updateBusRelationList();
          })
          .catch(error => {
            console.error('Error deleting comment:', error);
            this.$message.error('删除失败，请重试!');
          });
      }, 300),
      async updateBusRelationList(){
          const response = await this.$axios.get('http://localhost:8081/allRelation');
          this.BusRelationList = response.data;
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
        const response = await this.$axios.get(`http://localhost:8081/searchByStartOrEnd/${busRelationInput}`);
        return response.data;
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