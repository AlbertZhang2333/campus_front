<template>
    <div>
    <div class="block">
        <span class="demonstration">选择需要查询的日期</span>
        <el-date-picker
        v-model="value"
        align="right"
        type="date"
        placeholder="选择日期"
        :picker-options="pickerOptions">
        </el-date-picker>
    </div>
    <el-button type="primary" @click="searchHandler"
        style="margin-top: 10px; horiz-align: center;margin-bottom: 10px">
    搜索
    </el-button>
    </div>
</template>

<script>
import axiosInstance from "@/main";
export default {
    data(){
        return{
            value: '',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        picker.$emit('pick', new Date());
                    }
                }, {
                    text: '昨天',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24);
                        picker.$emit('pick', date);
                    }
                }, {
                    text: '一周前',
                    onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', date);
                    }
                }]
            }
        }

    },
    methods: {
        async searchHandler(){
            const response = await axiosInstance.get(`${this.$httpUrl}ManageShoppingRecord/alipayDataBillQuery?date=${this.value}`);
            if(response.data.code == 400) alert("查询失败");
            else {
                var newPage = window.open("about:blank", "_blank");
                newPage.document.write(response.data.data[1]);
            }
        }
    }
}
</script>
