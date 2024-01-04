<template>
  <el-card class="card" @click.native="handleClick">
    <h3>{{ building.name }}</h3>
    <el-image class="card-image" :src="require(`@/assets/VenuePicture/${building.photoPath}`)" alt="" style="width: 100%; height: 180px" fit="fill"/>
  </el-card>
</template>

<script>

export default {
  props: {
    building:{
      id: String,
      name: String,
      photoPath: String,
      description: String,
    }
  },
  computed: {
  },
  methods: {
    handleClick() {
      this.$router.push({path: `/venue_info`, query: {building: this.building}})
    }
  }
}
</script>

<style scoped>
.card {
  height: 300px;
  width: 350px;
  padding: 20px;
  margin: 10px;
  text-align: center;
  background-color: #EBF9FF;
  border: 3px solid #88AABB;
}

.card-image {
  max-width: 100%;
  height: auto;
}
</style>