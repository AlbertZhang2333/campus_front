<template>
  <MapAdmin></MapAdmin>
</template>
    
<script>
  import MapAdmin from "@/components/map/MapAdmin.vue";
  export default {
    components: {MapAdmin},
    data() {
      return {
        text: '',
        textarea: ''
      }
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