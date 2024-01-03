<template>
  <el-container style="display: flex; flex-direction: column">
    <el-container style="display: flex;flex-direction: column; justify-content: center;align-items: center">
      <h2> {{ building.name }} </h2>
      <el-image :src="building.photoPath" alt=""></el-image>
      <span style="font-size: 30px">
      {{ building.description }}
    </span>
      <el-divider>
      </el-divider>
      <h2> Comments </h2>
      <el-container style="background-color: #fff3cd; border-color: #003f43">
        <comment-area :department="1" :stuff-id="building.id"></comment-area>
      </el-container>
    </el-container>

  </el-container>
</template>

<script>
import CommentArea from '../components/comments/commentArea.vue'
import axiosInstance from "@/main";

export default {
  components: {CommentArea, },
  data() {
    return {
      building: {
        name: '',
        photoPath: '',
        description: '',
        id: 1,
      },
      buildings:[{
        name: '',
        photoPath: '',
        description: '',
        id: 1,
      }]
    }
  },
  mounted() {
    // this.getBuildingInfo()
    if(this.$route.query.building===undefined){
      this.building = this.buildings[0]
    }else {
      this.building = this.$route.query.building
    }
  },
  methods: {
    async getBuildingInfo() {
      const venueName = this.$route.query.venueName
      if (venueName === undefined || venueName === '') {
        this.$message.warning('获取失败')
        // alert("获取失败")
      }
      console.log(venueName)
      const response = await axiosInstance.get(`${this.$httpUrl}searchBuildingName/${venueName === undefined ? '一丹图书馆' : venueName}`)
      if (response.data.code === 400) {
        // alert("获取失败")
        this.$message.warning('获取失败')
      } else {
        this.building = response.data.data
      }
    }
  },
}
</script>


<style scoped>

</style>