<template>
  <el-card class="card" @click.native="handleClick">
    <h3>{{ name }}</h3>
    <p v-html="code"></p>
<!--    <img :src="code" :alt="name" class="card-image"/>-->
    <p>{{ description }}</p>
  </el-card>
</template>

<script>

export default {
  props: {
    id: String,
    name: String,
    photoPath: String,
    description: String,
  },
  computed: {
    code() {
      const imageUrl = require(`@/assets/VenuePicture/${this.photoPath}.jpg`)
      return `<img src="${imageUrl}" alt="" width="80%"/>`
    }
  },
  methods: {
    handleClick() {
      this.$router.push({path: `/venue_info`, query: {name: this.name}})
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