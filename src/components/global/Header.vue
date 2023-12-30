<template>
    <div style="display: flex; line-height: 60px">
      <div>
        <i :class="icon" style="font-size: 20px; cursor: pointer;" @click="collapse"></i>
      </div>
      <div style="flex: 1; text-align: center; font-size: 34px">
        <span>Campus</span>
      </div>
    </div>
  </template>
  
  <style scoped>
  
  </style>
  
  
  <script>
  export default {
    name: "Header",
    methods: {
      toUser() {
        console.log('to_user')
      },
      logOut() {
        console.log('log_out');
      },
      collapse() {
        this.$emit('doCollapse')
      }
    },
    props: {
      icon: String
    }
  }
  </script>