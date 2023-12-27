<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo">
          <router-link :to="'/shop'">
            <el-menu-item :index="'/shop'" style="width: 100px">
              <i class="el-icon-s-home"></i>
              <span slot="title" style="text-align: center">商城首页</span>
            </el-menu-item>
          </router-link>
          <router-link :to="'/shop/admin'">
            <el-menu-item :index="'/shop/admin'" style="width: 100px">
              <i class="el-icon-s-flag"></i>
              <span slot="title" style="text-align: center">商城管理</span>
            </el-menu-item>
          </router-link>
          <el-menu-item index="2" @click="openShoppingCartDialog">
            <i class="el-icon-s-goods"></i>
            <span slot="title">购物车</span>
          </el-menu-item>
          <el-menu-item index="3" @click="feedbackCollectionDialog">
            <i class="el-icon-setting"></i>
            <span slot="title">意见收集</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
    <el-dialog :visible.sync="shoppingCart_dialog">
      <el-table
        :data="MarketShoppingCartInfo"
        stripe
        style="width: 100%">
        <el-table-column
          prop="date"
          label="商品加入购物车日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="num"
          label="购买数量">
        </el-table-column>
        <el-table-column
          prop="price"
          label="预计花费¥">
        </el-table-column>
        <el-table-column>
          <template #default="scope">
            <el-button style="margin-left: auto" @click="deleteShoppingCartItem(scope.$index)">移除此商品</el-button>
            <el-button style="margin-left: auto" @click="pay(scope.row)">支付宝支付</el-button>
          </template>
        </el-table-column>

        <el-row>
          <span>通通拿下</span>
        </el-row>
      </el-table>
    </el-dialog>

    <el-dialog :visible.sync="feedback_dialog">
      <el-input v-model="feedbackContent" aria-placeholder="您的意见是对我们最大的帮助！"></el-input>
    </el-dialog>
  </div>
<!--    <el-dialog>-->
<!--  </el-dialog>-->
</template>

<script>
export default {
  props:['MarketShoppingCartInfo'],
  data() {
    return{
      shoppingCart_dialog:false,
      feedback_dialog:false,
      feedbackContent:"",
      intervalId: 0,
      shouldContinue: true,
      curRecordId: 0,
    }

  },
  methods: {
    openShoppingCartDialog() {
      this.shoppingCart_dialog=true;
      console.log(this.MarketShoppingCartInfo[0])
    },
    deleteShoppingCartItem(index){
      this.MarketShoppingCartInfo.splice(index,1);
      console.log(index);
    },
    feedbackCollectionDialog(){
      this.feedback_dialog=true;
    },
    async pay(item){
      console.log("item",item, "name",item.name,"num",item.num);
      const response = await this.$axios.put(`http://localhost:8081/UserShopping/purchase?itemName=${item.name}&num=${item.num}`);
      if(response.data.code == 400){
        alert("购买失败");
      }else if(response.data.code == 200){
        var newPage = window.open("about:blank", "_blank");
        newPage.document.write(response.data.data[1]);
        this.curRecordId = response.data.data[0];
        this.intervalId = setInterval(this.fetchData, 3000);
      }
    },
    async fetchData() {
      try {
        if (!this.shouldContinue) {
          console.log('停止发送请求，因为 shouldContinue 为 false');
          clearInterval(this.intervalId); // 停止定时器
          return;
        }
        if(this.curRecordId == 0){
          console.log('停止发送请求，因为 curRecordId 为 0');
          clearInterval(this.intervalId); // 停止定时器
          alert("支付失败");
          return;
        }else {
          console.log("curRecordId", this.curRecordId);
          const response = await this.$axios.get('http://localhost:8081/UserShopping/checkIfUserHasPay?itemShoppingRecordId=' + this.curRecordId);
          console.log("response", response);
          if(response.data.code == 400){
            console.log('停止发送请求，因为后端响应中包含 code 为 400');
            this.shouldContinue = false;
            clearInterval(this.intervalId); // 停止定时器
            alert("支付失败");
            return;
          }else if(response.data.data == '支付成功！'){
            console.log('停止发送请求，因为后端响应中包含 stopRequest 为 true');
            this.shouldContinue = false;
            clearInterval(this.intervalId); // 停止定时器
            alert("支付成功");
            return;
          }
          console.log('成功获取数据：', response.data);
        }
      } catch (error) {
        console.error('获取数据时出错：', error);
      }
    }
  },
}

</script>



<style>
.el-menu-vertical-demo {
  width: 120%;
  height: 150%;
  font-size: 20px;
  border-radius: 4px;
  margin:auto;
  position: absolute;

}

</style>
