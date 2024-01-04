<template>
  <div>
    <el-menu @select="handleMenuSelect">
      <el-menu-item index="reservation">预约</el-menu-item>
      <el-menu-item index="reservation/admin">预约管理</el-menu-item>
      <el-menu-item index="reservation/admin/room">房间管理</el-menu-item>
      <el-menu-item index="reservation/admin/analysis">数据分析</el-menu-item>
    </el-menu>
  </div>
</template>

<style>

</style>

<script>
export default {
  name: "Aside",
  data() {
    return {
      selectedMenuItem: null,
    };
  },
  methods: {
    handleMenuSelect(index) {
      this.$emit('menuSelected', index);
      const targetPath = `/${index}`;
      // 检查目标路径是否与当前路径相同
      if (this.$route.path !== targetPath) {
        this.$router.push({ path: targetPath });
      }
    },
  },
}
</script>