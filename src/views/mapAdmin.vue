<template>
  <Main></Main>
</template>

<script>

import Main from "@/components/map/MapAdmin.vue"

export default {
  components: {Main},
  data() {
    return {
      text: '',
      textarea: ''
    }
  }
}
</script>

<style scoped>
.el-aside {
  color: #333;
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

</style>