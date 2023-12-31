<template>
  <el-container class="card-container">
    <video
        src="https://www.sustech.edu.cn/uploads/files/2023/12/13145220_64059.mp4"
        id="campus_video"
        preload="auto"
        poster="@/assets/sustech_map1.jpg"
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
          name: 'Card 1',
          image: require('@/assets/picture1.jpg'),
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          id: 2,
          name: 'Card 2',
          image: require('@/assets/picture2.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 3,
          name: 'Card 3',
          image: require('@/assets/picture3.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 4,
          name: 'Card 4',
          image: require('@/assets/picture4.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 5,
          name: 'Card 5',
          image: require('@/assets/picture5.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 6,
          name: 'Card 6',
          image: require('@/assets/picture6.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 7,
          name: 'Card 7',
          image: require('@/assets/picture7.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 8,
          name: 'Card 8',
          image: require('@/assets/picture8.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 9,
          name: 'Card 9',
          image: require('@/assets/picture9.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 10,
          name: 'Card 10',
          image: require('@/assets/picture10.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 11,
          name: 'Card 11',
          image: require('@/assets/picture11.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        }
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