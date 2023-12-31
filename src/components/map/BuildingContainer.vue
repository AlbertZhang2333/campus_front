
<template>
  <div>
    <el-row>
      <el-col :span="2" class="left">
        出发地：
      </el-col>
      <el-col :span="13" class="center">
        <el-input
          v-model="buildingInput"
          @input="handleInputChange"
          placeholder="输入建筑名"
          id="BuildingInput"
        >
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-button @click="openAddBuildingDialog">
        增加建筑
      </el-button>
    </el-row>
    <el-table
      :data="BuildingList"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      stripe>
      <el-table-column
        prop="name"
        label="建筑名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lat"
        label="建筑纬度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="lng"
        label="建筑经度"
        width="180">
      </el-table-column>
      <el-table-column
        prop="busStop"
        label="公交站点">
      </el-table-column>
      <el-table-column>
        <template #default="scope">
          <el-button @click="editBuilding(scope.row)" type="primary" icon="el-icon-edit">
            编辑
          </el-button>
          <el-button @click="deleteBuilding(scope.row)" type="danger" icon="el-icon-delete">
            移除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addBuilding_dialog">
      <h3 class="dialog-title">新增建筑</h3>
      <el-form
        ref="Building"
        :model="Building"
        :rules="buildingAddRule"
        label-width="100px"
        label-position="right"
        size="small"
        class="dialog-form"
      >
        <el-form-item label="建筑名" prop="name">
          <el-input v-model="Building.name" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="建筑纬度" prop="lat">
          <el-input v-model="Building.lat" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="建筑经度" prop="lng">
          <el-input v-model="Building.lng" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="校巴站点" prop="busStop">
          <el-input v-model="Building.busStop" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="图片路径" prop="photo_path">
          <el-input v-model="Building.photo_path" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="建筑描述" prop="description">
          <el-input v-model="Building.description" prefix-icon="el-icon-building"/>
        </el-form-item>
      </el-form>
      <el-button @click="submitAddBuilding(true, -1)" class="dialog-button">
        提交添加
      </el-button>
    </el-dialog>

    <el-dialog :visible.sync="updateBuilding_dialog">
      <h3 class="dialog-title">修改建筑</h3>
      <el-form
        ref="Building"
        :model="Building"
        :rules="buildingAddRule"
        label-width="100px"
        label-position="right"
        size="small"
        class="dialog-form"
      >
        <el-form-item label="建筑名" prop="name">
          <el-input v-model="Building.name" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="建筑纬度" prop="lat">
          <el-input v-model="Building.lat" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="建筑经度" prop="lng">
          <el-input v-model="Building.lng" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="校巴站点" prop="busStop">
          <el-input v-model="Building.busStop" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="图片路径" prop="photo_path">
          <el-input v-model="Building.photo_path" prefix-icon="el-icon-building"/>
        </el-form-item>
        <el-form-item label="建筑描述" prop="description">
          <el-input v-model="Building.description" prefix-icon="el-icon-building"/>
        </el-form-item>
      </el-form>
      <el-button @click="updateAddBuilding()" class="dialog-button">
        提交修改
      </el-button>
    </el-dialog>
    </div>
</template>
  
<script>
import axiosInstance from "@/main";
export default {
  mounted(){
    this.updateBuildingList();
  },
  data() {
    return {
        buildingInput: '',
        Building: {
            id:0,
            name: "",
            lng: 114.001343,
            lat: 22.596590,
            description: "",
            busStop: "",
            photo_path: ""
        },
        BuildingList:[],
        buildingAddRule:{
            name:[
            {required:true,message: "建筑名不能为空", trigger:'blur'}
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
            description:[
              {required:true, message:"建筑描述不能为空", trigger: 'blur'}
            ]

        },

        addBuilding_dialog:false,
        updateBuilding_dialog:false,
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
    openAddBuildingDialog(){
        this.addBuilding_dialog=true;
    },
    async submitAddBuilding(submitOrUpdate,index){
      const response = await axiosInstance.post(`http://localhost:8081/addBuilding?lat=${this.Building.lat}&lng=${this.Building.lng}&name=${this.Building.name}&description=${this.Building.description}&photoPath=${this.Building.photo_path}&busStop=${this.Building.busStop}`);
      if(response.data.code == 400) alert("添加失败");
      else alert('submit!');
      this.addBuilding_dialog=false;
      this.updateBuildingList();
    },
    async editBuilding(curBuilding){
      //将当前建筑信息填入弹窗
        this.updateBuilding_dialog=true;
        this.Building.id = curBuilding.id;
        this.Building.name = curBuilding.name;
        this.Building.lng = curBuilding.lng;
        this.Building.lat = curBuilding.lat;
        this.Building.description = curBuilding.description;
        this.Building.busStop = curBuilding.busStop;
        this.Building.photo_path = curBuilding.photo_path;
    },
    async updateAddBuilding(){
      //将弹窗中的信息更新到数据库
        const response = await axiosInstance.put(`http://localhost:8081/updateBuilding?id=${this.Building.id}&lat=${this.Building.lat}&lng=${this.Building.lng}&name=${this.Building.name}&description=${this.Building.description}&photoPath=${this.Building.photo_path}&busStop=${this.Building.busStop}`);
        if(response.data.code == 400) alert("更新失败");
        else alert('update!');
        this.updateBuilding_dialog=false;
        this.updateBuildingList();
    },
    async deleteBuilding(curBuilding) {
      const response = await axiosInstance.delete(`http://localhost:8081/deleteBuilding/${curBuilding.id}`);
      if(response.data.code == 400) alert("删除失败");
      else alert('delete!');
      this.updateBuildingList();
    },
    async updateBuildingList(){
      //模糊查询相关，需要后端有通过 like 查询的接口
        const response = await axiosInstance.get('http://localhost:8081/allBuilding');
        if(response.data.code == 400) alert("加载失败");
        else this.BuildingList = response.data.data;
    },
    handleInputChange: _.debounce(async function() {
      try {
          if(this.buildingInput === '') {
            this.updateBuildingList();
            return;
          }else {
            const response = await this.searchOnServer(this.buildingInput);
            this.BuildingList = response;
          }
      } catch (error) {
          console.error('Error during search:', error);
      }
    }, 300),
    async searchOnServer(buildingInput) {
      const response = await axiosInstance.get(`http://localhost:8081/searchingBuilding/${buildingInput}`);
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