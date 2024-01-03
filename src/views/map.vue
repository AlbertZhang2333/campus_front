<template>
  <Main :destination="destination"></Main>
</template>
    
<script>
  import Main from "@/components/map/MapContainer.vue";
  export default {
    components: {Main},
    data() {
      return {
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