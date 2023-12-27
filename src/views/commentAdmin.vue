<template>
  <el-container style="height: 100vh; overflow: hidden;">
    <el-header style="position: fixed; width: 100%; z-index: 1000;">
      <Header></Header>
    </el-header>
    <el-container style="height: calc(100% - 64px); display: flex;">
      <el-aside width="200px"
                style="background-color: rgb(238, 241, 246); position: fixed; height: 100vh; overflow-y: auto;">
        <Aside @menuSelected="handleMenuSelected"></Aside>
      </el-aside>
      <el-container style="margin-left: 200px; margin-top:100px; height: 100%; overflow-y: auto;">
        <el-main style="height: 100%;">
            <Admin></Admin>
        </el-main>
        <el-footer style="height: 10%;">
          <Foot></Foot>
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>

import Aside from "../components/comments/Aside.vue";
import Header from "../components/comments/Header.vue"
import Foot from "../components/comments/Foot.vue";
import Admin from "../components/comments/Admin.vue";

export default {
  name: "Index",
  components: {Admin, Foot, Aside, Header},
  data() {
    return {
      text: '',
      textarea: '',
    };
  },
  methods: {
    // 处理自定义事件，更新 selectedMenuItem
    handleMenuSelected(index) {
      this.selectedMenuItem = index;
    },
  },
  watch: {
    // 监听 selectedMenuItem 的变化
    selectedMenuItem(newValue) {
      // 在这里你可以根据实际需求进行其他操作
      console.log("Selected Menu Item:", newValue);
    },
  },
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