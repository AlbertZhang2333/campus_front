<template>
  <el-menu
    style="height: 100%"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    default-active="/"
    :collapse="isCollapse"
    :collapse-transition="false"
  >
    <router-link :to="'/'">
      <el-menu-item :index="'/'" :width="width">
        <i class="el-icon-s-home"></i>
        <span slot="title" style="text-align: center">首页</span>
      </el-menu-item>
    </router-link>

    <router-link :to="'/map'">
      <el-menu-item :index="'/map'" :width="width">
        <i class="el-icon-s-home"></i>
        <span slot="title" style="text-align: center">首页</span>
      </el-menu-item>
    </router-link>

    <router-link :to="'/admin'">
      <el-menu-item :index="'/admin'" :width="width">
        <i class="el-icon-s-flag"></i>
        <span slot="title" style="text-align: center">地图信息管理</span>
      </el-menu-item>
    </router-link>
  </el-menu>
</template>

<style>

</style>

<script>
export default {
  name: "Aside",
  data() {
    return {}
  },
  props: {
    isCollapse: Boolean,
    width: '100px'
  }
}
</script>