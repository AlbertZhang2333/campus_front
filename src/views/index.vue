<template>
    <div id="app">
      <el-container>
        <el-header style="background-color: #ff8c00; color: #fff; padding: 0 20px;">
          <el-row type="flex" justify="space-between" align="middle">
            <el-col :span="6">
              <div class="logo">
                <img src="@/assets/logo.png" alt="Logo" />
              </div>
            </el-col>
            <el-col :span="18">
              <el-menu
                mode="horizontal"
                background-color="#ff8c00"
                text-color="#fff"
                active-text-color="#fff"
              >
                <el-menu-item index="1">Home</el-menu-item>
                <el-menu-item index="2">About</el-menu-item>
                <el-menu-item index="3">Admissions</el-menu-item>
                <el-menu-item index="4">Academics</el-menu-item>
                <el-menu-item index="5">Research</el-menu-item>
                <el-menu-item index="6">Campus Life</el-menu-item>
                <el-menu-item index="7">Alumni</el-menu-item>
                <el-menu-item index="8">News</el-menu-item>
                <el-menu-item index="9">Events</el-menu-item>
              </el-menu>
            </el-col>
          </el-row>
        </el-header>
  
        <el-main>
          <!-- 主要内容区域 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
  }
  
  .logo img {
    max-height: 40px;
  }
  </style>
  