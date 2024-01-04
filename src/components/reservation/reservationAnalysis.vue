
<template>
<div>
    <div class="charts-container">
    <div>
        <p class="data-line">用户数：{{userCnt}}</p>
        <p class="data-line">房间数: {{ roomCnt }}</p>
    </div>
    <div class="chart-container">
        <h2 class="chart-title">最近三天预约最多的房间</h2>
        <div class="chart" ref="mostInWeek"></div>
    </div>
      <el-button @click="$router.push('/reservation/admin')"> 返回 </el-button>
    </div>
</div>
</template>
    
<script>
import * as echarts from 'echarts';
import axiosInstance from "@/main";
export default {
    mounted(){
        this.loadUserCnt();
        this.loadRoomCnt();
        this.loadResverationMostInWeek();
    },
    data() {
    return {
        userCnt: 0,
        roomCnt: 0,
        mostInWeek: {
        }
    }
    },
    methods: {
    async loadUserCnt() {
        const response = await axiosInstance.get(`${this.$httpUrl}ManageDataAnalysis/usersNumber`);
        if(response.data.code == 400){
            alert(response.data.data);
        } else{
            this.userCnt = response.data.data;
        }
    },
    async loadRoomCnt() {
        const response = await axiosInstance.get(`${this.$httpUrl}ManageDataAnalysis/roomsNumber`);
        if(response.data.code == 400){
            alert(response.data.data);
        } else{
            this.roomCnt = response.data.data;
        }
    },
    async loadResverationMostInWeek() {
        const response = await axiosInstance.get(`${this.$httpUrl}ManageDataAnalysis/getTheseDaysRoomReservationNum`);
        const dataList = response.data.data;
        this.mostInWeek.categories = [];
        this.mostInWeek.data = [];
        for(let i = 0; i < dataList.length; i++){
          this.mostInWeek.categories.push(dataList[i].content);
          this.mostInWeek.data.push(dataList[i].num);
        }
        this.initBarChart(this.$refs.mostInWeek, this.mostInWeek);
    },
    initBarChart(container, data) {
        const chart = echarts.init(container);
        const option = {
        title: {
            text: '',
            textStyle: {
            color: '#333',
            },
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
        },
        xAxis: {
            type: 'category',
            data: data.categories,
            axisLine: {
            lineStyle: {
                color: '#999',
            },
            },
            axisLabel: {
            interval: 0, // Display all labels
            rotate: 45, // Rotate the labels for better visibility
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
            lineStyle: {
                color: '#999',
            },
            },
        },
        series: [
            {
            name: 'Value',
            type: 'bar',
            data: data.data,
            label: {
                show: true,
                position: 'top', // Display label on top of each bar
            },
            },
        ],
        tooltip: {
            show: true,
            trigger: 'axis',
            axisPointer: {
            type: 'shadow',
            },
        },
        };
        chart.setOption(option);
    },
    }
}
</script>
    
  <style scoped>
  .charts-container {
    display: flex;
    flex-direction: column; /* 确保子元素纵向排列 */
    align-items: center; /* 居中对齐 */
    margin: 20px;
  }
  
  .chart-container {
    text-align: center;
    margin-bottom: 20px; /* 为每个 chart-container 添加底边距 */
  }
  
  .chart-title {
    font-size: 18px;
    margin-bottom: 10px;
    color: #333;
  }
  
  .chart {
    width: 1000px; /* Increase the width of each chart */
    height: 700px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background: #fff;
  }
  </style>