<template>
  <el-container class="card-container">
    <video
        src="https://www.sustech.edu.cn/uploads/files/2023/12/13145220_64059.mp4"
        id="campus_video"
        preload="auto"
        poster="../assets/home_pictures/logo.png"
        @click=""
        autoplay
        playsinline
        loop
        muted
        style="width: 80%; align-self: center"
    />
    <el-divider></el-divider>
    <h1 style="font-size: 30px;">南科场馆</h1>
    <el-container class="card-container">
      <Card
          v-for="(building, index) in buildings"
          :key="index"
          :building="building"
          :style="{ marginTop: random[index] +'px'}"
          style="box-shadow: 0 10px 20px rgba(0, 0, 0, .30), 0 0 10px rgba(0, 0, 0, .20)"
      />
    </el-container>
  </el-container>

</template>

<script >
import Card from "@/components/home/Card.vue";
import axiosInstance from "@/main";

export default {
  name: 'Home',
  components: {Card},
  data() {
    return {
      random:[92, 57, 84, 91, 21, 69, 17, 70, 37, 86, 51, 13, 61, 29, 58, 42, 98, 32, 48, 61, 62, 63, 40, 48, 69, 74, 69],
      buildings: []
    }
  },
  mounted() {
    this.getBuildingInfo()
  },
  methods: {
    async getBuildingInfo() {
      const response = await axiosInstance.get(`${this.$httpUrl}allBuilding`);
      if(response.data.code == 400) this.$message.error("获取建筑列表失败");
      else this.buildings = response.data.data;
    }
  },
};
</script>

<style scoped>
.card-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff3cd;
  background-size: 100%
}
</style>