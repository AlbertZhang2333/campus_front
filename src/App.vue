<template>
  <div id="app">
    <CampusAside/>
    <router-view></router-view>
  </div>
</template>

<script>
import CampusAside from "@/views/CampusAside.vue";

export default {
  name: 'App',
  components: {CampusAside}
}
</script>

<style  scoped>
  #app {
    height: 100%;
    width: 100%;
    margin: 0;
  }
</style>
