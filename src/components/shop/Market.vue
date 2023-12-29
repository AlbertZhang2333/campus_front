<template>

  <div class="Menu_style">
    <h2>点击了解本周超级精品推荐！</h2>
    <el-carousel  class="carousel_style"  indicator-position="outside" >
        <el-carousel-item class="carousel_Item_style" v-for="item in carouselImageList" v-bind:key="item.src" >
            <img v-bind:src="item.src" alt="carousel_image" />
        </el-carousel-item>
    </el-carousel>
    <h3>正在热卖！！！</h3>
    <el-input
          ref="input"
          v-model="input"
          placeholder="输入商品名称"
          @keyup.enter.native="searchHandler"
          id="input"
      >
      <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler"></el-button>
    </el-input>
    <el-row style="position: relative">
      <el-col :span="4" v-for="shoppingItem in shoppingItemList" :key="shoppingItem.name" :offset="3" >
        <el-dialog :visible.sync="newShoppingDialog" class="dialog_style" >
          <el-image :src="currentShoppingItem.imagePath"  alt="__" v-if="currentShoppingItem" style="height: 50%;width: 50%"/>
          <div style="margin-top: 3%">
            <span style="color: orange ;font-size: 19px" >预计消费{{price}}¥</span>
            <el-row style="margin-top: 3%">
              <el-input-number v-model="num"  @change="handleShoppingDialogCount" :min="0" :max="10" label="描述文字"></el-input-number>
              <el-button  @click="submit_order" :disabled="CanSubmit" style="color: #eeab64;" >
                加入购物车
              </el-button>
            </el-row>
          </div>
        </el-dialog>
        <el-card class="card_style" shadow="hover" >
          <el-image :src="shoppingItem.imagePath" style="height: 240px;width: 350px"></el-image>
          <div style="padding: 20px;" >
            <span >{{shoppingItem.name}}</span>
            <span style="color: orange">现售价:{{shoppingItem.price}}¥</span>
          </div>
          <el-button @click="openShoppingDialog(shoppingItem)" style="margin-top: 10%">
            购买商品
          </el-button>

        </el-card>

      </el-col>
    </el-row>
    <!-- 建立购买商品用的建议表单-->

  </div>
</template>
<script>
export default {
  mounted(){
    this.loadItemList();
  },
  data() {
    const currentDate=new Date();
    return {

        carouselImageList:[
          {src:"https://img1.baidu.com/it/u=1069244915,946868715&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"},
          {src:"https://photo.16pic.com/00/66/27/16pic_6627749_b.jpg"},
          {src:"https://img1.baidu.com/it/u=2320411120,614841223&fm=253&fmt=auto&app=138&f=PNG?w=889&h=500"},
          {src:"https://img0.baidu.com/it/u=4124715789,4171598795&fm=253&fmt=auto&app=138&f=JPEG?w=750&h=500"},
          {src:"https://img1.baidu.com/it/u=519386203,2870826372&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=628"}

        ],
      shoppingItemList:[],
      currentDate:new Date(),
      newShoppingDialog:false,
      currentShoppingItem:null,
      CanSubmit:true,
      num:1,
      price:0,
      input: ''
    }
  },
  methods:{
    openShoppingDialog(shoppingItem){
      this.newShoppingDialog=true;
      this.currentShoppingItem=shoppingItem;
      this.num=0;
      this.price=0;
    },
    handleShoppingDialogCount(value){
      this.price=this.num*this.currentShoppingItem.price;
      this.CanSubmit = this.num <= 0;
    },
    async submit_order(){
      const response = await this.$axios.post('http://localhost:8081/UserShopping/addItemToTheCart?itemName='+this.currentShoppingItem.name+'&num='+this.num);
      console.log("addResponse", response);
      if(response.data.code == 400) alert("加入购物车失败");
      this.newShoppingDialog=false;
      this.num=0;
      this.currentShoppingItem=null;
      this.price=0;
      // this.currentShoppingItem=null;
    },
    async loadItemList(){
      const response = await this.$axios.get('http://localhost:8081/UserShopping/findAll');
      if(response.data.code == 400) alert("加载商品信息失败");
      this.shoppingItemList=response.data.data;
    },
    async searchHandler(){
      this.input = this.$refs.input.$el.querySelector('input').value;
      if(this.input == ""){
        this.loadItemList();
      }else{
        const response = await this.$axios.get(`http://localhost:8081/UserShopping/searchItem?itemName=${this.input}`);
        if(response.data.code == 400) alert("搜索失败");
        this.shoppingItemList= [response.data.data];
      }
    }
  }
}
</script>




<style>
.Menu_style{
    color: #eee176;
    font-size:18px;
    margin-right: 6%;
    text-align: center;
    border: solid#eeab64;
    position: relative;



}
.carousel_style{
  color:#eeab64;
  margin: auto;
  line-height: 100px;
  flex: auto;
  width:800px;
  height:400px;
  border-radius:4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

}
.carousel_Item_style{
  margin: auto;
  flex: auto;
  width:800px;
  height:400px;
}



.button {
  padding: 0;
  float: right;
  margin: auto;
}


.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.card_style{
  height: 480px;
  width: 390px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  position: relative;
  margin-top: 15px;
}
.dialog_style{

}

</style>
