<template>
  <el-container class="card-container">
<!--    <video-->
<!--        src="@/assets/sustech.mp4"-->
<!--        id="campus_video"-->
<!--        preload="auto"-->
<!--        poster="@/assets/sustech_map1.jpg"-->
<!--        @click="play"-->
<!--        autoplay-->
<!--        playsinline-->
<!--        loop-->
<!--        muted-->
<!--        style="width: 80%; align-self: center"-->
<!--    />-->
    <el-container class="card-container">
      <StuffCard
          v-for="(stuff, index) in stuff_cards"
          :key="index"
          :title="stuff.stuff_name"
          :image="stuff.image"
          :text="stuff.text"
          :style="{ marginTop: random[index] +'px'}"
          @click="$router.push(`/purchase/${stuff.stuff_id}`)"
          style="box-shadow: 0 10px 20px rgba(0, 0, 0, .30), 0 0 10px rgba(0, 0, 0, .20)"
      />
    </el-container>
  </el-container>

</template>

<script >
import StuffCard from "@/components/home/Card.vue";

export default {
  name: 'Home',
  components: {StuffCard},
  data() {
    return {
      random:[92, 57, 84, 91, 52, 69, 17, 70, 37, 86, 51, 13, 61, 29, 58, 42, 98, 32, 48, 61, 62, 63, 40, 48, 69, 74, 69],
      stuff_cards: [
        {
          stuff_id: 1,
          stuff_name: 'Card 1',
          image: require('@/assets/picture1.jpg'),
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
        },
        {
          stuff_id: 2,
          stuff_name: 'Card 2',
          image: require('@/assets/picture2.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 3,
          stuff_name: 'Card 3',
          image: require('@/assets/picture3.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 4,
          stuff_name: 'Card 4',
          image: require('@/assets/picture4.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 5,
          stuff_name: 'Card 5',
          image: require('@/assets/picture5.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 6,
          stuff_name: 'Card 6',
          image: require('@/assets/picture6.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 7,
          stuff_name: 'Card 7',
          image: require('@/assets/picture7.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 8,
          stuff_name: 'Card 8',
          image: require('@/assets/picture8.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 9,
          stuff_name: 'Card 9',
          image: require('@/assets/picture9.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 10,
          stuff_name: 'Card 10',
          image: require('@/assets/picture10.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          stuff_id: 11,
          stuff_name: 'Card 11',
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