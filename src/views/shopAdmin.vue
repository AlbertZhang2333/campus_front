<template>
<div>
<!--    <Administrators_Market></Administrators_Market>-->
    <el-header>
      <Header></Header>
    </el-header>
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
          
        import Main from "@/components/shop/ShopAdmin.vue"
        import Aside from "@/components/shop/AdminAside.vue";
        import Header from "@/components/global/Header.vue"
        import Foot from "@/components/global/Foot.vue";
    
        export default {
            components: {Foot, Aside, Main, Header},
            data() {
            return {
                text: '',
                textarea: ''
            }
            }
        }
    </script>
          
    <style>
        .el-aside {
          color: #333;
        }
        
        .el-header {
          background-color: #B3C0D1;
          color: #333;
          line-height: 60px;
        }
        
    </style>