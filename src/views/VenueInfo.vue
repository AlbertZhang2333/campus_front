<template>
  <el-container style="display: flex; flex-direction: column; align-items: center;">
    <el-switch v-if="admin" v-model="managing" active-text="管理员模式" inactive-text="普通模式"
               style="margin: 30px; align-self: end"></el-switch>
    <el-container style="width: 100%; height: auto">
      <el-container v-if="!managing" style="display: flex; flex-direction: column">
        <el-container style="display: flex;flex-direction: column; justify-content: center;align-items: center">
          <h2> {{ building.name }} </h2>
          <el-image :src="require(`@/assets/VenuePicture/${building.name}.jpg`)" alt=""></el-image>
          <span style="font-size: 30px">
      {{ building.description }}
      </span>
          <el-button @click="$router.push({path:'map', query:{destination:building.name}})">到这去</el-button>
          <el-divider>
          </el-divider>
          <el-container style="background-color: #fff3cd; border-color: #003f43">
            <comment-area :department="1" :stuff-id="building.id"></comment-area>
          </el-container>
        </el-container>

      </el-container>
      <MapAdmin v-else style="width: 100%; height:auto"></MapAdmin>
    </el-container>
  </el-container>
</template>

<script>
import CommentArea from '../components/comments/commentArea.vue'
import axiosInstance from "@/main";
import Main from "@/components/map/MapContainer.vue";
import MapAdmin from "@/components/map/MapAdmin.vue";
import {mapState} from "vuex";

export default {
  components: {MapAdmin, Main, CommentArea,},
  computed: {
    ...mapState(['userInfo']),
    admin() {
      return this.userInfo.identity === '2'
    }
  },
  data() {
    return {
      managing: false,
      building: {
        name: '一丹图书馆',
        photoPath: '一丹图书馆',
        description: '一丹图书馆是好图书馆',
        id: 1,
      },
      buildings: [{
        name: '一丹图书馆',
        photoPath: '一丹图书馆',
        description: '一丹图书馆是好图书馆',
        id: 1,
      }]
    }
  },
  mounted() {
    // this.getBuildingInfo()
    if (this.$route.query.building === undefined) {
      this.building = this.buildings[0]
    } else {
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