<template>
    <div>
      <el-row>
        <el-col :span="12">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo">
            <router-link :to="'/shop'">
              <el-menu-item :index="'/shop'" :width="width">
                <i class="el-icon-s-home"></i>
                <span slot="title" style="text-align: center">商城首页</span>
              </el-menu-item>
            </router-link>
            <router-link :to="'/shop/admin'">
              <el-menu-item :index="'/shop/admin'" :width="width">
                <i class="el-icon-s-flag"></i>
                <span slot="title" style="text-align: center">商城管理</span>
              </el-menu-item>
            </router-link>
            <router-link :to="'/shop/chat/admin'">
              <el-menu-item :index="'/shop/chat/admin'" :width="width">
                <i class="el-icon-s-flag"></i>
                <span slot="title" style="text-align: center">客户服务</span>
              </el-menu-item>
            </router-link>
          </el-menu>
        </el-col>
      </el-row>
    </div>
  </template>

<script>
export default {
  name: "Aside",
  data() {
    return {}
  },
  props: {
    width: '100px'
  }
}
</script>