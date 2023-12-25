
<template>
    <div>
      <h2 class="page-title">地图信息管理界面</h2>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="建筑信息管理" name="BuildingAdmin">
          <Building></Building>
        </el-tab-pane>
        <el-tab-pane label="校巴线路信息管理" name="BusLineAdmin">
          <BusLine></BusLine>
        </el-tab-pane>
        <el-tab-pane label="校巴站点信息管理" name="BusStopAdmin">
          <BusStop></BusStop>
        </el-tab-pane>
        <el-tab-pane label="校巴路线规划管理" name="BusRelationAdmin">
          <BusRelation></BusRelation>
        </el-tab-pane>
      </el-tabs>
      </div>
  </template>
    
  <script>
  import Building from "@/components/BuildingContainer.vue"
  import BusLine from "@/components/BusLineContainer.vue"
  import BusStop from "@/components/BusStopContainer.vue"
  import BusRelation from "@/components/BusRelationContainer.vue"
  export default {
    components: {Building, BusLine, BusStop, BusRelation},
    data() {
      return {
          buildingInput: '',
          activeName: 'BuildingAdmin',
      }
    }
  }
  </script>
    
  <style scoped>
    .el-table .warning-row {
      background: oldlace;
    }
    
    .el-table .success-row {
      background: #f0f9eb;
    }
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