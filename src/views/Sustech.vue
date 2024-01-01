<template>
  <div class="sustech">
    <!--停放图-->
    <img
      v-for="(position, index) in positions"
      :key="index"
      src="../assets/home_pictures/post.png"
      :style="{
        float: 'left',
        position: 'absolute',
        width: '25px',
        height: '30px',
        left: position.xRange[0] + 'px',
        top: position.yRange[0] + 'px',
      }"
      @click="editPost(position)" alt="">
    <!--背景图片-->
    <img src="../assets/home_pictures/sustech_map1.jpg" alt="" class="sustech" @click="viewMark" @dblclick="addMark">
    <!--表单弹出框-->
    <el-dialog
      :title="position.title"
      :visible.sync="position.visible">
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        @keyup.enter.native="submit()"
        @submit.native.prevent
      >
        <el-form-item label="名称" prop="name">
          <el-input v-model="form.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="x坐标" prop="x">
          <el-input v-model="form.x" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item label="y坐标" prop="y">
          <el-input v-model="form.y" placeholder="请输入"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="position.visible = false">关闭</el-button>
        <el-button type="primary" @click="submit()">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Sustech',
  data () {
    return {
      // 各种标点位置
      positions: [
        {
          name: '工学院',
          xRange: [495, 515],
          yRange: [300, 320]
        },
        {
          name: '第二科研楼',
          xRange: [340, 360],
          yRange: [400, 420]
        },
        {
          name: '台州楼',
          xRange: [320, 340],
          yRange: [540, 560]
        }
      ],
      // 当前位置
      position: {
        title: '',
        visible: false
      },
      // 表单数据
      form: {
        name: null,
        x: null,
        y: null
      },
      // 表单验证规则
      rules: {
        name: [
          {required: true, message: '请输入名称'}
        ],
        x: [
          {required: true, message: '请输入x坐标'}
        ],
        y: [
          {required: true, message: '请输入y坐标'},
        ]
      }
    }
  },
  methods: {
    viewMark (e) {  // 单击图片弹出信息
      const x = e.x
      const y = e.y
      // 根据坐标位置弹出对应信息
      for (const v of this.positions) {
        if (x >= v.xRange[0] && x <= v.xRange[1] && y >= v.yRange[0] && y <= v.yRange[1]) {
          // 表单赋值
          this.form.name = v.name
          this.form.x = x
          this.form.y = y
          // 打开弹框
          this.position.title = v.name
          this.position.visible = true
          break
        }
      }
    },
    addMark (e) {
      this.position.title = '新标点'
      this.position.visible = true
      this.$nextTick(() => {
        // 重置表单
        this.$refs.form.resetFields()
        this.form.name = null
        this.form.x = e.x
        this.form.y = e.y
      })
    },
    submit () { // 表单提交
      this.$refs.form.validate(valid => {
        if (valid) {
          // 添加标点
          this.positions.push({
            name: this.form.name,
            xRange: [this.form.x - 10, this.form.x + 10],
            yRange: [this.form.y - 10, this.form.y + 10]
          })
          // 发送请求响应后
          this.position.visible = false
          this.$message.success('保存成功')
        } else {
          return false
        }
      })
    },
    editPost (v) {
      this.position.title = v.name
      this.position.visible = true
      this.form.name = v.name
      this.form.x = v.xRange[0]
      this.form.y = v.yRange[0]
    }
  }
}
</script>

<style scoped>
.sustech{
  width: 100%;
  height: 100%;
}
img {
  cursor: pointer;
}
</style>
