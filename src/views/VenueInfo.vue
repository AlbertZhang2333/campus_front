<template>
  <el-container style="display: flex;flex-direction: column; justify-content: center;align-items: center">
    <h2> {{ title }} </h2>
    <el-divider></el-divider>
    <el-image :src="url" alt=""></el-image>
    <span style="font-size: 30px">
      {{ info }}
    </span>
    <el-divider>
    </el-divider>
    <h2> Comments </h2>
    <el-container style="background-color: #fff3cd; border-color: #003f43">

    </el-container>
  </el-container>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      title: '一丹图书馆',
      url: require(`@/assets/picture1.jpg`),
      info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
    }
  }
}
</script>


<style scoped>

</style>