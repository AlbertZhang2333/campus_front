<template>

    <el-row class="center aside">
      <el-col :span="4">
        <el-image :src="url_logo" fit="fill" @click="goSustech"/>
      </el-col>
      <el-col :span="12" style="height: 100%">
        <el-menu
            background-color="#9400d3"
            active-text-color="#ffd04b"
            text-color="#fff"
            mode="horizontal"
            default-active="1"
            class="center hundred"
            style="height: 100%"
        >
          <el-menu-item
              index="1"
              @click="$router.push('/home')"
              class="menu-item"
          >
            Home
          </el-menu-item>
          <el-menu-item
              index="2"
              @click="$router.push('/academics')"
              class="menu-item"
          >
            Academics
          </el-menu-item>
          <el-menu-item
              index="3"
              @click="$router.push('/research')"
              class="menu-item"
          >
            Research
          </el-menu-item>
          <el-menu-item
              index="4"
              @click="$router.push('/campus_life')"
              class="menu-item"
          >
            Campus Life
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="4">
        <el-input
            v-model="input"
            placeholder="Search"
            suffix-icon="el-icon-search"
            style="width: 75%;"
        ></el-input>
      </el-col>
      <el-col :span="4" style="height: 100%">
        <el-button
            type="primary"
            v-if="!isLogIn"
            icon="el-icon-arrow-right"
            class="button"
            style="height: 100%;"
            @click="$router.push('/login')"
        >
          Login to Campus
        </el-button>
        <el-container
          v-else
          class="center"
          style="height: 100%; width: auto; max-width: 100%"
        >
          <el-image

          />
          <h2 style="align-self: center">
            login!
          </h2>
        </el-container>
      </el-col>
    </el-row>

</template>

<script>
export default {
  name: 'CampusAside',
  components: {},
  data() {
    return {
      url_logo: require(`@/assets/logo.png`),
      input: '',
      isLogIn: true,
    }
  },
  methods: {
    goSustech() {
      console.log('111')
      window.location.href = 'https://www.sustech.edu.cn/'
    }
  }
};
</script>

<style scoped>
.menu-item {
  width: 100%;
  height: 100% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

.button {
  width: 100%;
  height: 100%;
  align-self: center;
  background-color: #57068c;
  border-color: transparent;
  font-size: 20px;
  border-radius: 0;
}
.button:hover, .button:focus{
  color: #ffd04b;
  background-color: #57068c;
  border-color: transparent;
}
.aside {
  width: 100%;
  height: 70px;
  background-color: darkviolet
}
</style>
