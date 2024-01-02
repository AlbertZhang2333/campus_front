<template>
  <el-container class="card-container">
    <video
        src="https://www.sustech.edu.cn/uploads/files/2023/12/13145220_64059.mp4"
        id="campus_video"
        preload="auto"
        poster="../assets/home_pictures/logo.png"
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
          image: require('@/assets/VenuePicture/一丹图书馆.jpg'),
          text: '一丹图书馆于2019年由陈一丹基金会捐赠，是南科大最年轻的图书馆，也是最受同学欢迎的图书馆，因为这里不仅有崭新的设施，还有柔软的沙发哦~\n一丹图书馆位于南科大中心，出馆便可在中心食堂就餐。\n一丹图书馆一楼是唯一二十四小时开放的楼层，可满足一些喜欢晚上学习的同学的需要。但我们也要注意劳逸结合，熬夜学习的同时也要照顾到身体的健康~',
          url: '/VenueInfo',
        },
        {
          id: 2,
          name: '琳恩图书馆',
          image: require('@/assets/VenuePicture/琳恩图书馆.jpg'),
          text: '琳恩图书馆于2016年由香港匿名慈善家捐赠，是学校建立最早的图书馆。它坐落在校园主轴上，位于一号教学楼对面，南邻行政楼，距离一号门仅有五分钟的距离。图书馆四面为内凹弧形轮廓，是南科大的标志性建筑物。\n琳恩图书馆拥有最丰富的馆藏，包括位于二楼的视听资料区和三楼的特藏室。图书馆开馆时间为早上八点至晚上十点，馆外还有二十四小时还书机和自助预约取书柜，增大了同学们借还书的自由度。',
          url: '/comment',
        },
        {
          id: 3,
          name: '涵泳图书馆',
          image: require('@/assets/VenuePicture/涵泳图书馆.jpg'),
          text: '涵泳图书馆距离新生宿舍最近，且出门便可到达食堂，成为许多寻求便捷的同学们的选择。它的开馆时间与琳恩图书馆相同，为早上八点至晚上十点。\n相较于风格更为现代的琳恩图书馆和一丹图书馆，涵泳图书馆的装修风格较为传统，独具一种古色古香的韵味。\n' +
              '但由于图书馆较为小巧，座位偏少，每逢学习旺季（考试周），去晚了只能空跑一趟，良好的学习资源已经被早起的鸟儿抢走啦~\n' +
              '图书馆内设有茶水间，同学们可在茶水间内饮食。\n' +
              '一楼与二楼交接处的阶梯阅览区旁放置有工具书，同学们可以在此进行查阅，也可在此休息。',
          url: '/reservation',
        },
        {
          id: 4,
          name: '二期学生宿舍',
          image: require('@/assets/VenuePicture/1.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          url: '',
        },
        {
          id: 5,
          name: '荔园',
          image: require('@/assets/VenuePicture/荔园.png'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 6,
          name: '第一教学楼',
          image: require('@/assets/VenuePicture/第一教学楼.jpg'),
          text: '于2013年9月启用的第一教学楼是学校最早建成和投入使用的教学楼。\n' +
              '一教共有地上五层和地下一层，是南科大最大的教学区。教学楼内从百人大教室到几十人的活动小教室应有尽有，且各具特色，满足各类不同课程的上课需求。\n' +
              '当然，在一教上课最幸福的事就是可以偶遇麻酱学姐（学校的一只名猫），足够幸运的话，好学宝宝麻酱会进到教室，坐到你桌旁，与你一起听课~'
        },
        {
          id: 7,
          name: '理学院',
          image: require('@/assets/VenuePicture/1.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 8,
          name: '第三教学楼',
          image: require('@/assets/VenuePicture/第三教学楼.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 9,
          name: '科研楼',
          image: require('@/assets/VenuePicture/1.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 10,
          name: '松禾体育场',
          image: require('@/assets/VenuePicture/松禾体育场.jpg'),
          text: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
        },
        {
          id: 11,
          name: '商学院',
          image: require('@/assets/home_pictures/picture11.jpg'),
          text: 'TODO: 商学院照片，简介'
        },
        {
          id: 12,
          name: '中心餐厅',
          image: require('@/assets/home_pictures/picture11.jpg'),
          text: '这里有朴实亲民的大众菜，粥档，面档和粉档，还有特色小炒，潮汕好味，石锅拌饭，冒菜等等种类繁多的菜品任君挑选。且此处特设素食窗口。'
        },
        {
          id: 13,
          name: '学生餐厅',
          image: require('@/assets/VenuePicture/学生餐厅.png'),
          text: '这里有日料吉正品，提供各种寿司拉面寿喜锅咖喱饭, 还有拌饭、韩式烤肉、大众自选菜、麦香南北面点。'
        },
        {
          id: 14,
          name: '第二学生餐厅',
          image: require('@/assets/VenuePicture/第二学生餐厅.png'),
          text: '提供早餐，早上会卖肠粉，正餐时间有大众菜和酸辣粉。下午及晚上有烧烤！！为保障因工作学习错过饭点的师生就餐，工作日七点半后，餐厅一楼还开设夜宵档口，有炒粉、炒面、鸡排、烧卖，种类繁多。'
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