<template>
  <el-container style="display: flex; flex-direction: column; align-items: center;">
    <el-switch v-if="admin" v-model="managing" active-text="管理员模式" inactive-text="普通模式"
               style="margin: 30px; align-self: end"></el-switch>
    <el-container style="width: 100%; height: auto">
      <Main :destination="destination" v-if="!managing" style="width: 100%; height:auto"></Main>
      <MapAdmin v-else style="width: 100%; height:auto"></MapAdmin>
    </el-container>
  </el-container>
</template>
    
<script>
  import Main from "@/components/map/MapContainer.vue";
  import {mapState} from "vuex";
  import MapAdmin from "@/components/map/MapAdmin.vue";
  export default {
    components: {MapAdmin, Main},
    computed: {
      ...mapState(['userInfo']),
      admin() {
        return this.userInfo.identity === '2'
      }
    },
    data() {
      return {
        managing: false,
        text: '',
        textarea: '',
        destination:''
      }
    },
    created() {
      this.destination = this.$route.query.destination;
    }
  }
</script>
    
<style scoped>
  .el-aside {
    color: #333;
  }
  
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
</style>