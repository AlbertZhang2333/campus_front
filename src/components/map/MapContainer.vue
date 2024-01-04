<template>
  <div style="width: 100%; display: flex; place-items: center; flex-direction: column;">
    <div style="width: 70%;">
      <el-row>
        <el-col :span="4" class="left">
          出发地：
        </el-col>
        <el-col :span="18" class="center">
          <el-input
            ref="startPointInput"
            v-model="startPoint"
            @focus="focus"
            @blur="blur"
            @keyup.enter.native="searchHandler"
            @input="handleInputChange"
            placeholder="输入出发地"
            id="startPoint"
          >
          </el-input>
          <!---设置z-index优先级,防止被走马灯效果遮挡-->
          <el-card
            @mouseenter="enterSearchBoxHanlder"
            v-if="isSearch"
            class="box-card"
            id="search-box"
            style="position:relative;z-index:15"
          >
            <dl v-if="isHistorySearch">
              <dt class="search-title" v-show="history">历史搜索</dt>
              <dt class="remove-history" v-show="history" @click="removeAllHistory">
                <i class="el-icon-delete"></i>清空历史记录
              </dt>
              <el-tag
                v-for="search in historySearchList"
                :key="search.id"
                closable
                :type="search.type"
                @close="closeHandler(search)"
                style="margin-right:5px; margin-bottom:5px;"
                @click="handleTagClick(search.name)"
              >{{search.name}}</el-tag>
              <dt class="search-title">热门搜索</dt>
              <dd v-for="search in hotSearchList" :key="search.id" @click="selectHotResult(search)">{{search}}</dd>
            </dl>
            <dl>
              <dt class="search-title">搜索结果</dt>
              <dd v-for="result in searchList" :key="result.id" @click="selectSearchResult(result)">
                {{ result.name }}
              </dd>
            </dl>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="left">
          目的地：
        </el-col>
        <el-col :span="18" class="center">
          <el-input
            ref="endPointInput"
            v-model="endPoint"
            @focus="focus2"
            @blur="blur2"
            @keyup.enter.native="searchHandler2"
            @input="handleInputChange2"
            placeholder="输入目的地"
            id="endPoint"
          >
          </el-input>
          <!---设置z-index优先级,防止被走马灯效果遮挡-->
          <el-card
            @mouseenter="enterSearchBoxHanlder2"
            v-if="isSearch2"
            class="box-card"
            id="search-box"
            style="position:relative;z-index:15"
          >
            <dl v-if="isHistorySearch">
              <dt class="search-title" v-show="history">历史搜索</dt>
              <dt class="remove-history" v-show="history" @click="removeAllHistory">
                <i class="el-icon-delete"></i>清空历史记录
              </dt>
              <el-tag
                v-for="search in historySearchList"
                :key="search.id"
                closable
                :type="search.type"
                @close="closeHandler(search)"
                style="margin-right:5px; margin-bottom:5px;"
                @click="handleTagClick2(search.name)"
              >{{search.name}}</el-tag>
              <dt class="search-title">热门搜索</dt>
              <dd v-for="search in hotSearchList" :key="search.id" @click="selectHotResult2(search)">{{search}}</dd>
            </dl>
            <dl>
              <dt class="search-title">搜索结果</dt>
              <dd v-for="result in searchList" :key="result.id" @click="selectSearchResult2(result)">
                {{ result.name }}
              </dd>
            </dl>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="left">
          出行方式：
        </el-col>
        <el-col :span="18" class="center">
          <el-radio-group v-model="selectedTransport" size="medium" style="align-self: start;">
            <el-radio-button label="步行"></el-radio-button>
            <el-radio-button label="校巴"></el-radio-button>
            <el-radio-button label="驾车"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="left">
          自选地点：
        </el-col>
        <el-col :span="18" class="right">
          <el-radio-group v-model="selectedLocation" size="medium" @change="createMap">
            <el-radio-button label="目的地"></el-radio-button>
            <el-radio-button label="出发地"></el-radio-button>
          </el-radio-group>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4" class="left">
          搜索：
        </el-col>
        <el-col :span="18" class="center">
          <el-button type="primary" @click="searchRoute"
                style="margin-top: 10px; horiz-align: center;margin-bottom: 10px; align-self: start;">
            Search
          </el-button>
        </el-col>
      </el-row>
    </div>
    <el-collapse-transition>
      <div v-if="isBus" class="struct-container">
        <el-card v-for="struct in busNavigation" :key="struct.id" class="struct-card">
          <div slot="header" class="struct-header">{{ struct.lineId }}号线{{ struct.direction }}方向</div>
          <p>在{{ struct.startStop }}上车</p>
          <p>在{{ struct.endStop }}下车</p>
          <p>用时: {{ struct.time }}</p>
          <p>途径{{ struct.stopNum }}站</p>
        </el-card>
        <el-card v-for= "struct in lineList" :key="struct.id" class="struct-card">
          <p>{{ struct.lineId }}号线{{struct.direction}}方向运营时间: {{ struct.startTime }} -- {{ struct.endTime }}</p>
        </el-card>
      </div>
    </el-collapse-transition>
    <div id="container" style="width: 75vw;"></div>
    <div class="input-card" style="display: flex; flex-direction: row;">
      <h4>左击获取经纬度：</h4>
      <div class="input-item" style="place-self: center; margin: 20px;">
        <input type="text" readonly="true" id="lnglat">
      </div>
    </div>
  </div>
</template>
<script>
import RandomUtil from "@/utils/randomUtil";
import Store from "@/utils/store";
import mapLoader from '@/utils/amap';
import highAccuracyGeolocation from '@/utils/highAccuracyGeolocation';
import _ from "lodash";
import axiosInstance from "@/main";
export default {
  mounted() {
    this.createMap();
    this.loadDestination();
  },
  props: {
    destination: String,
  },
  data() {
    return {
      startPoint: "",
      endPoint: "",
      startPlace: {
        lat: 22.602181,
        lng: 113.999219
      },
      endPlace: {
        lat: 22.602181,
        lng: 113.999219
      },
      search: "", //当前输入框的值
      isFocus: false, //是否聚焦
      isFocus2: false, //是否聚焦
      hotSearchList: ["第一教学楼", "一丹图书馆", "湖畔食堂"], //热门搜索数据
      historySearchList: [], //历史搜索数据
      searchList: [], //搜索返回数据,
      history: false,
      types: ["", "success", "info", "warning", "danger"], //搜索历史tag式样
      selectedTransport: '步行',
      selectedLocation: '目的地',
      busNavigation: [],
      lineList: [],
      isBus: false,
      AMap: null,
      map: null,
      width: 1000, // 地图宽度
      height: 600, // 地图高度
      plugins: [
        'AMap.Scale' /*比例尺*/,
        'AMap.ToolBar' /*工具栏*/,
        'AMap.Marker' /*标记*/,
        'AMap.Geolocation' /*定位*/,
        'AMap.MapType' /*图层切换*/
      ], // 地图插件
      config: {
        resizeEnable: true, // 地图初始化时定位到当前城市(会被center覆盖)
        center: [114.001343, 22.596590], // 初始化地图中心点位置
        zoom: 16, //地图显示的缩放级别
        mapStyle: 'amap://styles/normal', //设置地图的显示样式
      }, // 地图配置项
      startIcon : "",
      endIcon: "",
    };
  },
  methods: {
    // 初始化地图
    async createMap() {
      try {
        this.AMap = await mapLoader(this.plugins);
        this.map = new this.AMap.Map('container', this.config);
        //异步加载插件
        this.asnycLoaderPlugins(this.AMap, this.map, this.plugins, this.selectedLocation);
        //getMessageByDrawCircle(this.AMap, this.map);
      } catch (e) {
        console.log(e);
      }
    },
    async loadDestination(){
        if(this.destination !== undefined){
          const response = await axiosInstance.get(`${this.$httpUrl}searchBuildingName/${this.destination}`);
          if(response.data.code == 400){
            alert("目的地不存在");
          }else{
            const desBuilding = response.data.data;
            this.$refs.endPointInput.model = desBuilding.name;
            this.endPoint = desBuilding.name;
          }
        }
    },
    async loadStartMarker(lat, lng) {
      this.startIcon = this.AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-9, -3)
      });
      const startMarker = new AMap.Marker({
        position: new AMap.LngLat(lat, lng),
        icon: startIcon,
        offset: new AMap.Pixel(-13, -30)
      })
      this.map.add([startMarker]);
    },
    async loadEndMarker(lat, lng){
      this.endIcon = new this.AMap.Icon({
        // 图标尺寸
        size: new AMap.Size(25, 34),
        // 图标的取图地址
        image: '//a.amap.com/jsapi_demos/static/demo-center/icons/dir-marker.png',
        // 图标所用图片大小
        imageSize: new AMap.Size(135, 40),
        // 图标取图偏移量
        imageOffset: new AMap.Pixel(-95, -3)
      });
      const endMarker = new this.AMap.Marker({
        position: new AMap.LngLat(lat, lng),
        icon: endIcon,
        offset: new AMap.Pixel(-13, -30)
      })
      this.map.add([endMarker])
    },
    //异步同时加载多个插件
    asnycLoaderPlugins(AMap, map, plugins, selectedLocation) {
      const startPlace = this.startPlace;
      const endPlace = this.endPlace;
      const startPointInput = this.$refs.startPointInput;
      const endPointInput = this.$refs.endPointInput;
      AMap.plugin(plugins, function () {
        map.addControl(new AMap.Scale()); // 添加比例尺
        map.addControl(new AMap.ToolBar()); // 添加工具栏
        map.addControl(new AMap.MapType()); // 添加图层切换
        //为地图注册click事件获取鼠标点击出的经纬度坐标
        map.on('click', function(e) {
          if(selectedLocation == '目的地'){
            document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
            document.getElementById("endPoint").value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
            endPointInput.model = e.lnglat.getLng() + ',' + e.lnglat.getLat();
            endPlace.lng = e.lnglat.getLng();
            endPlace.lat = e.lnglat.getLat();
          }else{
            document.getElementById("lnglat").value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
            document.getElementById("startPoint").value = e.lnglat.getLng() + ',' + e.lnglat.getLat();
            startPointInput.model = e.lnglat.getLng() + ',' + e.lnglat.getLat();
            startPlace.lng = e.lnglat.getLng();
            startPlace.lat = e.lnglat.getLat();
          }
        });
        //highAccuracyGeolocation(AMap, map);
      });
    },
    async searchRoute() {
      this.createMap();
      this.isBus = false;
      this.busNavigation = [];
      var self = this;
      var selectedTransport = this.selectedTransport;
      var tmpStart;
      this.startPoint = document.getElementById("startPoint").value;
      this.endPoint = document.getElementById("endPoint").value;
      if(this.startPoint.includes(",")) {
        const response = await this.searchAll("一丹图书馆");
        tmpStart = response;
        let coordinatesArray = this.startPoint.split(',');
        tmpStart.lng = parseFloat(coordinatesArray[0]);
        tmpStart.lat = parseFloat(coordinatesArray[1]);
      }else {
        const response = await this.searchAll(this.startPoint);
        tmpStart = response;
      }
      var tmpEnd;
      if(this.endPoint.includes(",")) {
        const response2 = await this.searchAll("一丹图书馆");
        tmpEnd = response2;
        let coordinatesArray = this.endPoint.split(',');
        tmpEnd.lng = parseFloat(coordinatesArray[0]);
        tmpEnd.lat = parseFloat(coordinatesArray[1]);
      }else{
        const response2 = await this.searchAll(this.endPoint);
        tmpEnd = response2;
      }
      if(selectedTransport == '驾车'){
        var map = this.map;
        this.AMap.plugin('AMap.Driving', function () {
          var driving = new self.AMap.Driving({
            map: map
          });
          driving.search([tmpStart.lng, tmpStart.lat], [tmpEnd.lng, tmpEnd.lat], function (status, result) {
            if (status === 'complete') {
              this.$message.success('绘制驾车路线完成')
            } else {
              this.$message.error('获取驾车数据失败：' + result)
            }
          });
        });
      }else if(selectedTransport == '步行'){
        this.plotWalkingRoute(this.AMap, this.map, tmpStart.lng, tmpStart.lat, tmpEnd.lng, tmpEnd.lat);
      }else{
        this.isBus = true;
        const response3 = await this.searchLineInfo();
        this.lineList = response3;
        if(this.startPoint.includes(",")) {
          const response4 = await this.searchNearStop(tmpStart.lng, tmpStart.lat);
          var tmpStartPoint = tmpStart;
          tmpStart = response4;
          this.plotWalkingRoute(this.AMap, this.map, tmpStartPoint.lng, tmpStartPoint.lat, tmpStart.lng, tmpStart.lat);
        }else if(!tmpStart.name.includes("校巴站")){
          const response4 = await this.searchAll(tmpStart.busStop);
          const tmpStartPoint = tmpStart;
          tmpStart = response4;
          this.plotWalkingRoute(this.AMap, this.map, tmpStartPoint.lng, tmpStartPoint.lat, tmpStart.lng, tmpStart.lat);
        }
        if(this.endPoint.includes(",")) {
          const response4 = await this.searchNearStop(tmpEnd.lng, tmpEnd.lat);
          var tmpEndPoint = tmpEnd;
          tmpEnd = response4;
          this.plotWalkingRoute(this.AMap, this.map, tmpEnd.lng, tmpEnd.lat, tmpEndPoint.lng, tmpEndPoint.lat);
        }else if(!tmpEnd.name.includes("校巴站")){
          const response4 = await this.searchAll(tmpEnd.busStop);
          const tmpEndPoint = tmpEnd;
          tmpEnd = response4;
          this.plotWalkingRoute(this.AMap, this.map, tmpEnd.lng, tmpEnd.lat, tmpEndPoint.lng, tmpEndPoint.lat);
        }
        const response4 = await this.searchBusLine(tmpStart.name, tmpEnd.name);
        this.busNavigation = response4;
      }
    },
    async searchAll(search) {
      const response = await axiosInstance.get(`${this.$httpUrl}searchBuildingName/${search}`);
      const response2 = await axiosInstance.get(`${this.$httpUrl}searchStopName/${search}`);
      let result = response;
      if(response.data.data == null){
        result = response2;
      }
      return result.data.data;
    },
    async searchBusLine(startStop, endStop){
      const response = await axiosInstance.get(`${this.$httpUrl}startEndRelation/${startStop}/${endStop}`);
      return response.data.data;
    },
    async searchLineInfo(){
      const response = await axiosInstance.get(`${this.$httpUrl}allLine`);
      return response.data.data;
    },
    async searchNearStop(lng, lat){
      const response = await axiosInstance({
        method: 'get',
        url: `${this.$httpUrl}nearbyStop`,
        params: {
          lng: lng,
          lat: lat
        }
      });
      return response.data.data;
    },
    plotWalkingRoute(AMap, map, startLng, startLat, endLng, endLat) {
      this.AMap.plugin('AMap.Walking', function () {
        var walking = new AMap.Walking({
          map: map
        });
        walking.search([startLng, startLat], [endLng, endLat], function (status, result) {
          if (status === 'complete') {
            this.$message.success('绘制步行路线完成')
          } else {
            this.$message.error('获取步行数据失败：' + result)
          }
        });
      });
    },
    focus() {
      this.isFocus = true;
      this.historySearchList =
        Store.loadHistory() == null ? [] : Store.loadHistory();
      this.history = this.historySearchList.length == 0 ? false : true;
    },
    focus2() {
      this.isFocus2 = true;
      this.historySearchList =
        Store.loadHistory() == null ? [] : Store.loadHistory();
      this.history = this.historySearchList.length == 0 ? false : true;
    },
    blur() {
      var self = this;
      this.searchBoxTimeout = setTimeout(function() {
        self.isFocus = false;
      }, 300);
    },
    blur2() {
      var self = this;
      this.searchBoxTimeout = setTimeout(function() {
        self.isFocus2 = false;
      }, 300);
    },
    enterSearchBoxHanlder() {
      clearTimeout(this.searchBoxTimeout);
    },
    enterSearchBoxHanlder2() {
      clearTimeout(this.searchBoxTimeout);
    },
    searchHandler() {
      //随机生成搜索历史tag式样
      let n = RandomUtil.getRandomNumber(0, 5);

      let exist =
        this.historySearchList.filter(value => {
          return value.name == this.search;
        }).length == 0
          ? false
          : true;
      if (!exist) {
        this.historySearchList.push({ name: this.startPoint, type: this.types[n] });
        Store.saveHistory(this.historySearchList);
      }
      this.history = this.historySearchList.length == 0 ? false : true;
    },
    searchHandler2() {
      //随机生成搜索历史tag式样
      let n = RandomUtil.getRandomNumber(0, 5);

      let exist =
        this.historySearchList.filter(value => {
          return value.name == this.search;
        }).length == 0
          ? false
          : true;
      if (!exist) {
        this.historySearchList.push({ name: this.endPoint, type: this.types[n] });
        Store.saveHistory(this.historySearchList);
      }
      this.history = this.historySearchList.length == 0 ? false : true;
    },
    closeHandler(search) {
      this.historySearchList.splice(this.historySearchList.indexOf(search), 1);
      Store.saveHistory(this.historySearchList);
      clearTimeout(this.searchBoxTimeout);
      if (this.historySearchList.length == 0) {
        this.history = false;
      }
    },
    removeAllHistory() {
      Store.removeAllHistory();
    },
    handleTagClick(result) {
      this.startPoint = result;
    },
    handleTagClick2(result) {
      this.endPoint = result;
    },
    handleInputChange: _.debounce(async function() {
      try {
          const response = await this.searchOnServer(this.startPoint);
          this.searchList = response;
      } catch (error) {
          console.error('Error during search:', error);
      }
    }, 300),
    async searchOnServer(startPoint) {
      const response = await axiosInstance.get(`${this.$httpUrl}searchingBuilding/${startPoint}`);
      const response2 = await axiosInstance.get(`${this.$httpUrl}searchingBusStop/${startPoint}`);
      const result = response.data.data.concat(response2.data.data);
      return result;
    },
    handleInputChange2: _.debounce(async function() {
      try {
          const response = await this.searchOnServer(this.endPoint);
          this.searchList = response;
      } catch (error) {
          console.error('Error during search:', error);
      }
    }, 300),
    async searchOnServer2(endPoint) {
      const response = await axiosInstance.get(`${this.$httpUrl}searchingBuilding/${endPoint}`);
      const response2 = await axiosInstance.get(`${this.$httpUrl}searchingBusStop/${endPoint}`);
      const result = response.data.data.concat(response2.data.data);
      return result;
    },
    selectSearchResult(result) {
      this.startPoint = result.name;
      this.searchHandler();
    },
    selectSearchResult2(result) {
      this.endPoint = result.name;
      this.searchHandler2();
    },
    selectHotResult(result) {
      this.startPoint = result;
      this.searchHandler();
    },
    selectHotResult2(result) {
      this.endPoint = result;
      this.searchHandler2();
    }
  },
  computed: {
    isHistorySearch() {
      return this.isFocus && !this.search || this.isFocus2 && !this.search;
    },
    isSearch() {
      return this.isFocus;
    },
    isSearch2() {
      return this.isFocus2;
    }
  }
};
</script>
<style scoped>
#container {
  width: 100%;
  height: 800px;
}

.left, .center, .right {
  margin-top: 15px;
}

.center, .right {
  margin-left: 20px;
}

.center{
  display: flex; 
  flex-direction: column;
}

#search {
  background-color: #ffa300;
  border-radius: 5px;
}

.search-title, .remove-history {
  color: #777;
  font-size: 15px;
}

.remove-history {
  float: right;
  margin-top: -22px;
}

#search-box {
  width: 555px;
  height: 500px;
  margin-top: 10px;
  padding-bottom: 20px;
}
.el-row{
  display: flex;
  flex-direction: row;
  place-content: center;
}
.el-button {
  background-color:  #409eff; /* 改变按钮背景色 */
  color: #fff; /* 改变按钮文字颜色 */
  border: none; /* 去掉按钮边框 */
  margin-top: 10px; /* 调整按钮上边距 */
}
</style>
