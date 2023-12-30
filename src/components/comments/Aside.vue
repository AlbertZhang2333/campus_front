<template>
  <div>
    <el-menu @select="handleMenuSelect">
      <el-menu-item index="1"></el-menu-item>
      <el-menu-item index="comment">评论</el-menu-item>
      <el-menu-item index="comment/admin">管理员页面</el-menu-item>
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