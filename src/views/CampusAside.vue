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
          class="center hundred"
          style="height: 100%"
          :default-active="activeIndex"
      >
        <el-menu-item
            v-for="item in menuList"
            :index="item.index"
            :key="item.index"
            @click="$router.push(item.index)"
            class="menu-item"
        >
          {{ item.title }}
        </el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="4" style="display: flex; justify-content: center; align-items: center">
      <el-input
          v-model="input"
          placeholder="Search"
          suffix-icon="el-icon-search"
          style="width: 75%;"
      />
    </el-col>
    <el-col :span="4" style="height: 100%">
      <el-button
          type="primary"
          v-if="(this.userInfo.identity === 0)"
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
          style="height: 100%; width: auto; max-width: 100%;"
      >
        <el-image fit="fill" :src="require(`@/assets/user_icon/${userInfo.userIcon}.jpg`)" alt=""
                  @click="$router.push('/userInfo')"
                  style="height: 80%; width: auto; border: 3px solid orange;border-radius: 5px; margin-right: 20px"/>
        <h2 style="color:#27004c;">
          {{ userInfo.username }}
        </h2>

        <el-button type="info" icon="el-icon-switch-button" circle @click="logOut"></el-button>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'CampusAside',
  components: {},
  data() {
    return {
      url_logo: require(`@/assets/home_pictures/logo.png`),
      input: '',
      activeIndex: '',
      menuList: [
        {
          title: 'Home',
          index: '/home',
        },
        {
          title: 'Navigation',
          index: '/map',
        },
        {
          title: 'Venue Appointment',
          index: '/reservation'
        },
        {
          title: 'Shopping',
          index: '/shop'
        }
      ],
    }
  },
  computed: {
    ...mapState(['userInfo']),
  },
  methods: {
    goSustech() {
      console.log('111')
      window.location.href = 'https://www.sustech.edu.cn/'
    },
    logOut() {
      this.$confirm('确认登出').then(() => {
        localStorage.clear()
        this.$store.commit('updateUserInfo', {
          username: 'name',
          userMail: 'mail',
          userIcon: 0,
          identity: 0,
        })
        this.$message.success('退出成功!')
          }
      ).catch()
    }
  },
  created() {
    this.activeIndex = this.$route.path;
    if (localStorage.getItem('passToken') !== null) {
      const packInfo = {
        username: localStorage.getItem('username'),
        userMail: localStorage.getItem('userMail'),
        userIcon: localStorage.getItem('userIcon'),
        identity: localStorage.getItem('identity'),
      }
      this.$store.commit('updateUserInfo', packInfo)
    }
  },
  watch: {
    $route(to) {
      this.activeIndex = to.path;
    },
  },
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

.button:hover, .button:focus {
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