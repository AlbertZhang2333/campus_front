<template>
  <el-card class="card" @click.native="handleClick">
    <h3>{{ building.name }}</h3>
    <p v-html="code"></p>
<!--    <img :src="code" :alt="name" class="card-image"/>-->
    <p>{{ building.description }}</p>
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
    code() {
      const imageUrl = require(`@/assets/VenuePicture/${this.building.name}.jpg`)
      return `<img src="${imageUrl}" alt="" width="80%"/>`
    }
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