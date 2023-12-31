<template>
    <div>
  <!--    <Administrators_Market></Administrators_Market>-->
      <el-container>
        <el-aside>
          <Aside></Aside>
        </el-aside>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
  
    </div>
  </template>
    
    <script>
    import Aside from "@/components/shop/Aside.vue";
    import Main from "@/components/shop/UserRecord.vue";
    
    
    export default {
      components: {
          Aside,
          Main,
      }
    }
    </script>
    
  <style scoped>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 5%;
  }
  .background_Picture{
    background: url("https://img1.baidu.com/it/u=1555536650,780667891&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500")
    no-repeat;
    position: absolute;
  
  
  }
    
  </style>