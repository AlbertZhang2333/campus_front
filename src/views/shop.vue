<template>
  <div>
    <!--    <Administrators_Market></Administrators_Market>-->
    <el-container style="display: flex; flex-direction: column; align-items: center">
      <el-switch v-if="admin" v-model="managing" active-text="管理员模式" inactive-text="普通模式"
                 style="margin: 30px; align-self: end"></el-switch>
      <el-container v-if="!managing" style="width: 100%; height: auto; display: flex; flex-direction: column; align-items: center;">
        <el-container style="width: 100%">
          <el-aside>
            <Aside></Aside>
          </el-aside>
          <el-main>
            <Main></Main>
          </el-main>
        </el-container>
        <el-container>
          <Chat style="z-index: 9999"></Chat>
        </el-container>
        <el-container>
          <comment-area :department="0" :stuff-id="-1"></comment-area>
        </el-container>
      </el-container>
      <shop-admin v-else style="width: 100%; height:auto"></shop-admin>
    </el-container>
  </div>
</template>

<script>
import Main from "@/components/shop/Market.vue";
import Aside from "@/components/shop/Aside.vue";
import Chat from "@/views/Chat.vue";
import CommentArea from '@/components/comments/commentArea.vue';
import MapAdmin from "@/components/map/MapAdmin.vue";
import ShopAdmin from "@/views/shopAdmin.vue";
import {mapState} from "vuex";

export default {
  components: {
    ShopAdmin,
    MapAdmin,
    Chat,
    Aside,
    Main,
    Comment,
    CommentArea,
  },
  computed: {
    ...mapState(['userInfo']),
    admin() {
      return this.userInfo.identity === '2'
    }
  },
  data() {
    return {
      managing: false
    }
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

.background_Picture {
  background: url("https://img1.baidu.com/it/u=1555536650,780667891&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500") no-repeat;
  position: absolute;


}

</style>