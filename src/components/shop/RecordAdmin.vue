
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
    </div>
  </template>
    
  <script>
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
          ItemList:[],
          ItemAddRule:{
              name:[
              {required:true,trigger:'blur'}
              ],
              num:[
              {required:true,trigger:'blur'}
              ],
              price:[
              {required:true,trigger:'blur'}
              ],
              description:[
              {required:true,trigger:'blur'}
              ]
          },
  
          addItem_dialog:false,
          updateItem_dialog:false,
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
      submitAddItem(submitOrUpdate,index){
      this.$refs.Item.validate((valid) =>{
          if(valid){
              this.$axios.post(`http://localhost:8081/ManageItems/generateANewItem?name=${this.Item.name}&num=${this.Item.num}&price=${this.Item.price}&description=${this.Item.description}&imagePath=${this.Item.imagePath}`);
              alert('submit!');
              this.addItem_dialog=false;
              this.updateItemList();
          }
      })
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
          this.$axios.put(`http://localhost:8081/ManageItems/updateItem?itemName=${this.Item.name}&price=${this.Item.price}&description=${this.Item.description}&imagePath=${this.Item.imagePath}`);
          alert('update!');
          this.updateItem_dialog=false;
          this.updateItemList();
      },
      deleteItem: _.debounce(async function(curItem) {
        this.$axios.delete(`http://localhost:8081/ManageItems/deleteItem?name=${curItem.name}`)
          .then(res => res.data.data)
          .then(res => {
            console.log(res);
            this.$message({
              message: '删除成功!',
              type: 'success'
            });
            this.loadPost();
            this.updateItemList();
          })
          .catch(error => {
            console.error('Error deleting comment:', error);
            this.$message.error('删除失败，请重试!');
          });
      }, 300),
      async updateItemList(){
        //模糊查询相关，需要后端有通过 like 查询的接口
          const response = await this.$axios.get('http://localhost:8081/ManageItems/findAll');
          this.ItemList = response.data.data;
      },
      async searchHandler(){
        this.input = this.$refs.input.$el.querySelector('input').value;
        if(this.input == ""){
          this.updateItemList();
        }else{
          const response = await this.$axios.get(`http://localhost:8081/ManageItems/findByName?name=${this.input}`);
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