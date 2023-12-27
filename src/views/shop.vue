<template>
  <div>
<!--    <Administrators_Market></Administrators_Market>-->
    <el-header>
      <Market_headline/>
    </el-header>
    <el-container>
      <el-aside>
        <Aside
        :MarketShoppingCartInfo="this.MarketShoppingCartInfo"/>
      </el-aside>
      <el-main>
        <Main @Market_sendShoppingCartInfo="getMarketShoppingCart"/>
      </el-main>
    </el-container>

  </div>
</template>
  
  <script>
  import Aside from "@/components/shop/Aside.vue";
  import Market_headline from "@/components/Header"
  import Foot from "@/components/Foot";
  import Main from "@/components/shop/Market.vue";
  
  
  export default {
      data() {
          return {
              MarketShoppingCartInfo: [],
            deleteCartItem_index:-1
          }
      },
    components: {
        Aside,
        Market_headline,
        Foot,
        Main,
    },
      methods:{
        // 拿取Sustech_Market中的新加入购物车的购物信息
          getMarketShoppingCart(infos){
              this.MarketShoppingCartInfo=infos;
              console.log("intoCart", infos);
          },
  
      }
  }
  </script>
  
<style>
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