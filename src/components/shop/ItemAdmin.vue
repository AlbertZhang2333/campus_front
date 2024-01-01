
<template>
  <div>
    <div>
      <el-input
          ref="input"
          v-model="input"
          placeholder="输入商品名称"
          @keyup.enter.native="searchHandler"
          id="input"
      >
        <el-button slot="append" icon="el-icon-search" id="search" @click="searchHandler"></el-button>
      </el-input>
    </div>
    <el-row>
        <el-button @click="openAddItemDialog">
            增加商品
        </el-button>
    </el-row>
    <el-table
      :data="ItemList"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column label="商品名称" prop="name"
        width="180">
      </el-table-column>
      <el-table-column label="商品库存" prop="num"
        width="180">
      </el-table-column>
      <el-table-column label="商品售价(¥)" prop="price"
        width="180">
      </el-table-column>
      <el-table-column label="商品描述" prop="description" width="180">
      </el-table-column>
      <el-table-column>
          <template #default="scope">
          <el-button @click="editItem(scope.row)" type="primary" icon="el-icon-edit">
              编辑
          </el-button>
          <el-button @click="deleteItem(scope.row)" type="danger" icon="el-icon-delete">
              移除
          </el-button>
          </template>
      </el-table-column>
      <el-table-column>
          <template #default="scope">
            <el-button @click="addInstant(scope.row)" type="danger" icon="el-icon-edit">
                添加秒杀
            </el-button>
            <el-button @click="deleteInstant(scope.row)" type="primary" icon="el-icon-delete">
                移除秒杀
            </el-button>
          </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="addItem_dialog">
      <h3 class="dialog-title">新增商品信息</h3>
      <el-form
        ref="Item"
        :model="Item"
        :rules="ItemAddRule"
        label-width="100px"
        label-position="right"
        size="small"
        class="dialog-form"
      >
      <el-form-item label="商品名称" prop="name">
        <el-input v-model="Item.name"/>
      </el-form-item>
      <el-form-item label="商品库存" prop="num">
        <el-input v-model="Item.num"/>
      </el-form-item>
      <el-form-item label="商品售价(¥)" prop="price">
        <el-input v-model="Item.price"/>
      </el-form-item>
      <el-form-item label="商品描述" prop="description">
        <el-input v-model="Item.description"/>
      </el-form-item>
      <el-form-item label="商品照片路径" prop="imagePath">
        <el-input v-model="Item.imagePath"/>
      </el-form-item>
      </el-form>
      <el-button @click="submitAddItem(true, -1)" class="dialog-button">
        提交添加
      </el-button>
    </el-dialog>

    <el-dialog :visible.sync="updateItem_dialog">
      <h3 class="dialog-title">修改商品信息</h3>
      <el-form
        ref="Item"
        :model="Item"
        :rules="ItemAddRule"
        label-width="100px"
        label-position="right"
        size="small"
        class="dialog-form"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input v-model="Item.name"/>
        </el-form-item>
        <el-form-item label="商品库存" prop="num">
          <el-input v-model="Item.num"/>
        </el-form-item>
        <el-form-item label="商品售价(¥)" prop="price">
          <el-input v-model="Item.price"/>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="Item.description"/>
        </el-form-item>
        <el-form-item label="商品照片路径" prop="imagePath">
          <el-input v-model="Item.imagePath"/>
        </el-form-item>
      </el-form>
      <el-button @click="updateAddItem()" class="dialog-button">
        提交修改
      </el-button>
    </el-dialog>

    <el-dialog :visible.sync="instant_dialog">
      <h3 class="dialog-title">秒杀信息</h3>
      <el-form
        ref="instantInfo"
        :model="instantInfo"
        :rules="instantInfoRule"
        label-width="100px"
        label-position="right"
        size="small"
        class="dialog-form"
      >
        <el-form-item label="数量上限" prop="num">
          <el-input v-model="instantInfo.num"/>
        </el-form-item>
        <el-form-item label="秒杀天数" prop="shoppingDays">
          <el-input v-model="instantInfo.shoppingDays"/>
        </el-form-item>
      </el-form>
      <el-button @click="submitInstant()" class="dialog-button">
        提交修改
      </el-button>
    </el-dialog>
  </div>
</template>
  
<script>
import axiosInstance from "@/main";
export default {
  mounted(){
    this.updateItemList();
  },
  data() {
    return {
        ItemInput: '',
        activeName: 'Current_sales_items',
        Item: {
          name: "",
          num: 0,
          price: 0,
          description: "",
          imagePath: ""
        },
        instantInfo: {
          itemName: "",
          num: 0,
          shoppingDays: 0
        },
        ItemList:[],
        ItemAddRule:{
            name:[
              {required:true, message:"商品名称不能为空", trigger: 'blur'}
            ],
            num:[
              {required:true, message:"库存数量不能为空", trigger: 'blur'},
              {pattern: /^\d+$/, message: "库存数量应为一个非负整数", trigger:'blur'}
            ],
            price:[
              {required:true, message:"价格不能为空", trigger: 'blur'},
              {pattern: /^(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*))$/, message: "价格应为一个正数（可为小数）", trigger:'blur'}
            ],
            description:[
              {required:true, message:"商品描述信息", trigger: 'blur'}
            ]
        },
        instantInfoRule: {
          num:[
            {required:true, message:"库存数量不能为空", trigger: 'blur'},
            {pattern: /^\d+$/, message: "库存数量应为一个非负整数", trigger:'blur'}
          ],
          shoppingDays:[
            {required:true, message:"秒杀天数不能为空", trigger: 'blur'},
            {pattern: /^\d+$/, message: "秒杀天数应为一个非负整数", trigger:'blur'}
          ],
        },

        addItem_dialog:false,
        updateItem_dialog:false,
        instant_dialog: false,
        input: ""
    }
    },
methods: {
    tableRowClassName({row, rowIndex}) {
    if (rowIndex === 1) {
        return 'warning-row';
    } else if (rowIndex === 3) {
        return 'success-row';
    }
    return '';
    },
    openAddItemDialog(){
        this.addItem_dialog=true;
    },
    async submitAddItem(submitOrUpdate,index){
      const response = await axiosInstance.post(`http://localhost:8081/ManageItems/generateANewItem?name=${this.Item.name}&num=${this.Item.num}&price=${this.Item.price}&description=${this.Item.description}&imagePath=${this.Item.imagePath}`);
      if(response.data.code == 400) alert("添加失败");
      else alert('添加成功');
      this.addItem_dialog=false;
      this.updateItemList();
    },
    async editItem(curItem){
      //将当前建筑信息填入弹窗
        this.updateItem_dialog=true;
        this.Item.name = curItem.name;
        this.Item.num = curItem.num;
        this.Item.price = curItem.price;
        this.Item.description = curItem.description;
        this.Item.imagePath = curItem.imagePath;
        console.log("editItem",this.Item);
    },
    async updateAddItem(){
      //将弹窗中的信息更新到数据库
        const response = await axiosInstance.put(`http://localhost:8081/ManageItems/updateItem?itemName=${this.Item.name}&price=${this.Item.price}&description=${this.Item.description}&imagePath=${this.Item.imagePath}`);
        if(response.data.code == 400) alert("更新失败");
        else alert('更新成功');
        this.updateItem_dialog=false;
        this.updateItemList();
    },
    async deleteItem(curItem) {
      const response = await axiosInstance.delete(`http://localhost:8081/ManageItems/deleteItem?name=${curItem.name}`);
      if(response.data.code == 400) alert("删除失败");
      else {
        alert('删除成功');
        this.updateItemList();
      }
    },
    addInstant(curItem){
      this.instant_dialog = true;
      this.instantInfo.itemName = curItem.name;
    },
    async submitInstant(){
      const response = await axiosInstance.post(`http://localhost:8081/ManageItems/addInstantItem?itemName=${this.instantInfo.itemName}&num=${this.instantInfo.num}&shoppingDays=${this.instantInfo.shoppingDays}`);
      if(response.data.code == 400) alert(response.data.data);
      else alert("添加成功");
      this.instant_dialog = false;
    },
    async deleteInstant(curItem){
      const response = await axiosInstance.post(`http://localhost:8081/ManageItems/deleteInstantItem?itemName=${curItem.name}`)
      if(response.data.code == 400) alert(response.data.data);
      else alert("删除成功")
    },
    async updateItemList(){
      //模糊查询相关，需要后端有通过 like 查询的接口
        const response = await axiosInstance.get('http://localhost:8081/ManageItems/findAll');
        if(response.data.code == 400) alert("加载失败");
        this.ItemList = response.data.data;
    },
    async searchHandler(){
      this.input = this.$refs.input.$el.querySelector('input').value;
      if(this.input == ""){
        this.updateItemList();
      }else{
        const response = await axiosInstance.get(`http://localhost:8081/ManageItems/findByName?name=${this.input}`);
        if(response.data.code == 400) alert("搜索失败");
        this.ItemList = [response.data.data];
      }
    }
  }
}
</script>
  
<style scoped>
  .page-title {
    text-align: center;
    margin-bottom: 20px;
  }

  .dialog-title {
    text-align: center;
    margin-bottom: 10px;
  }

  .dialog-form {
    margin-top: 10px;
  }

  .dialog-button {
    margin-left: 45%;
    margin-top: 20px;
  }
</style>