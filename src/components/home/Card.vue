<template>
  <el-card class="card" @click="$router.push(url)">
    <h3>{{ title }}</h3>
    <el-image :src="image" :alt="title" class="card-image"/>
    <p>{{ text }}</p>
  </el-card>
</template>

<script>
export default {
  props: {
    id: String,
    title: String,
    image: String,
    text: String,
    url: String
  }
}
</script>

<style scoped>
.card {
  height: 400px;
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