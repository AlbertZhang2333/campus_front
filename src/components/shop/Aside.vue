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
      console.log(response.data.data);
      var newPage = window.open("about:blank", "_blank");
      newPage.document.write(response.data.data);
    }
  },
  data(){
    return{
      shoppingCart_dialog:false,
      feedback_dialog:false,
      feedbackContent:""
    }

  }
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
