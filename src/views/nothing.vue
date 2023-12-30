<script setup>

</script>

<template>
  <el-row>
    <el-col :span="4" class="vertical-center">
      Informations For:
    </el-col>
    <el-col :span="12" class="vertical-center">
      <el-button
          v-for="(button, key) in buttons"
          :key="key"
          @click="$router.push(button.url)"
          class="my_button"
      >
        {{button.name}}
      </el-button>
    </el-col>


  </el-row>

  <el-row style="background-color: #57068c">
    <el-col :span="4">
      <img src="@/assets/logo.png" alt="logo" @click="$router.push('TODO')">
    </el-col>

    <el-col :span="12" style="height:200px; display: flex;">
      <el-popover
          v-for="(pop, index) in pops"
          placement="bottom"
          trigger="hover"
          :key="index"
          :title="pop.title"
          :content="pop.content"
          style="width: 100%"
      >
        <el-button
            slot="reference"
            :content="pop.context"
            @click="$router.push(pop.url)"
            style="width: 100%; height: 100%; background-color: transparent; border-color: transparent"
        >
          {{ pop.context }}
        </el-button>
      </el-popover>
    </el-col>
    <el-col :span="8" style="height:200px; display: flex; justify-content: center; align-items: center;">
      <el-input v-model="input" placeholder="Search" suffix-icon="el-icon-search" style="width: 200px; align-self: center"></el-input>
    </el-col>
  </el-row>
</template>

<style scoped>
.vertical-center{
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.my_button{
  width: 100%;
  height: 100%;
  margin: 0;
  border-color: transparent;
}
.my_button:hover{
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #57068c;
}
body{
  font-size: large;
}
</style>