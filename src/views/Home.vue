<template>
  <el-container class="card-container">
    <video
        src="https://www.sustech.edu.cn/uploads/files/2023/12/13145220_64059.mp4"
        id="campus_video"
        preload="auto"
        poster="../assets/home_pictures/sustech_map1.jpg"
        @click="play"
        autoplay
        playsinline
        loop
        muted
        style="width: 80%; align-self: center"
    />
    <el-container class="card-container">
      <Card
          v-for="(stuff, index) in cards"
          :key="index"
          :title="stuff.name"
          :image="stuff.image"
          :text="stuff.text"
          :url="stuff.url"
          :style="{ marginTop: random[index] +'px'}"
          @click="$router.push('/home')"
          style="box-shadow: 0 10px 20px rgba(0, 0, 0, .30), 0 0 10px rgba(0, 0, 0, .20)"
      />
    </el-container>
  </el-container>

</template>

<script >
import Card from "@/components/home/Card.vue";

export default {
  name: 'Home',
  components: {Card},
  data() {
    return {
      random:[92, 57, 84, 91, 52, 69, 17, 70, 37, 86, 51, 13, 61, 29, 58, 42, 98, 32, 48, 61, 62, 63, 40, 48, 69, 74, 69],
      cards: [
        {
          id: 1,
          name: '一丹图书馆',
          image: require('@/assets/home_pictures/picture1.jpg'),
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          url: '/VenueInfo',
        },
        {
          id: 2,
          name: '琳恩图书馆',
          image: require('@/assets/home_pictures/picture2.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          url: '/comment',
        },
        {
          id: 3,
          name: '涵泳图书馆',
          image: require('@/assets/home_pictures/picture3.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          url: '/reservation',
        },
        {
          id: 4,
          name: '二期学生宿舍',
          image: require('@/assets/home_pictures/picture4.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          url: '',
        },
        {
          id: 5,
          name: '荔园',
          image: require('@/assets/home_pictures/picture5.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 6,
          name: '第一教学楼',
          image: require('@/assets/home_pictures/picture6.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 7,
          name: '理学院',
          image: require('@/assets/home_pictures/picture7.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 8,
          name: '第三教学楼',
          image: require('@/assets/home_pictures/picture8.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 9,
          name: '科研楼',
          image: require('@/assets/home_pictures/picture9.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 10,
          name: '松禾体育场',
          image: require('@/assets/home_pictures/picture10.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 11,
          name: '商学院',
          image: require('@/assets/home_pictures/picture11.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 12,
          name: '工学院',
          image: require('@/assets/home_pictures/picture11.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 13,
          name: '中心食堂',
          image: require('@/assets/home_pictures/picture11.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 14,
          name: '湖畔食堂',
          image: require('@/assets/home_pictures/picture11.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
      ]
    }
  },
  methods: {
    play() {
    }
  },
  mounted() {
    // window.addEventListener('scroll', () => {
    //   const video = document.getElementById('campus_video');
    //   video.play();
    // })
  }
};
</script>

<style scoped>
.card-container {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #fff3cd;
  background-size: 100%
}
</style>