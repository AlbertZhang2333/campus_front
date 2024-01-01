<template>
  <el-container style="display: flex;flex-direction: column; justify-content: center;align-items: center">
    <h2> {{ building.name }} </h2>
    <el-divider></el-divider>
    <el-image :src="building.photoPath" alt=""></el-image>
    <span style="font-size: 30px">
      {{ building.description }}
    </span>
    <el-divider>
    </el-divider>
    <h2> Comments </h2>
    <el-container style="background-color: #fff3cd; border-color: #003f43">
      <comment-area :department="1"></comment-area>
    </el-container>
  </el-container>
</template>

<script>
import CommentArea from '../components/comments/commentArea.vue'
import axiosInstance from "@/main";
export default {
  components: {CommentArea},
  data() {
    return {
      building: {
        name: '',
        photoPath: '',
        description: '',
      }
    }
  },
  mounted() {
    this.getBuildingInfo()
  },
  methods:{
    async getBuildingInfo() {
      const response = await axiosInstance.get(`${this.$httpUrl}searchBuildingName/一丹图书馆`)
      if(response.data.code == 400){
        alert("获取失败")
      }
      else{
        this.building = response.data.data
      }
    }
  },
}
</script>


<style scoped>

</style>