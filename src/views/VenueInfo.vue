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
          <el-divider></el-divider>
          <el-carousel height="150px">
            <el-carousel-item v-for="building in buildings">
              <img :src="require(`@/assets/VenuePicture/${building.photoPath}`)" alt="">
            </el-carousel-item>
          </el-carousel>
          <el-divider></el-divider>
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
    this.getBuildingInfo()
    console.log(this.building.name)
  },
  methods: {
    async getBuildingInfo() {
      const response = await axiosInstance.get(`${this.$httpUrl}allBuilding`);
      if (response.data.code === 400) this.$message.error("获取建筑列表失败");
      else if (response.data.data.length !== 0) this.buildings = response.data.data;
      const building = this.$route.query.building
      if (building === undefined) {
        this.building = this.buildings[0]
      } else {
        this.building = building
      }
    }
  },
}
</script>


<style scoped>

</style>