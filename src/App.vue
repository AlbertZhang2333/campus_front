<template>
  <div id="app" style="background-color: #fff3cd">
    <CampusAside/>
    <router-view></router-view>
  </div>
</template>

<script>

import CampusAside from "@/views/CampusAside.vue";

export default {
  name: 'App',
  components: {CampusAside},
  // components: {CampusAside}
}
</script>

<style>
#app {
  height: 100%;
  width: 100%;
  margin: 0;
}
</style>