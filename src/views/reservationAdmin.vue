<template>
  <el-container style="height: 100vh; overflow: hidden;">
    <el-aside width="200px"
              style="background-color: rgb(238, 241, 246); height: 100vh; overflow-y: auto;">
      <Aside @menuSelected="handleMenuSelected"></Aside>
    </el-aside>
    <el-container style="margin-left: 200px; margin-top:0px; height: 100%; overflow-y: auto;">
      <el-main style="height: 100%;">
        <!-- 根据 selectedMenuItem 切换 el-main 中的内容 -->
        <Admin></Admin>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import Admin from "../components/reservation/Admin.vue"
import Aside from "../components/reservation/Aside.vue";
import Header from "../components/reservation/Header.vue"
import Foot from "../components/reservation/Foot.vue";

export default {
  components: {Foot, Aside, Admin, Header},
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