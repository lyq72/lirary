<template >
  <div id="main">
  <el-col :span="12">
    <el-menu
      default-active="$route.path" router
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#000000"
      text-color="#fff"
      active-text-color="#F7C301"
    >
      <el-menu-item index="/StuMain">
        <i class="el-icon-menu"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-menu-item index="/StuMain/StuRight">
        <i class="el-icon-view"></i>
        <span slot="title">图书信息</span>
      </el-menu-item>
      <el-submenu index="/StuMain/StuRight">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>我的</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/StuMain/Stu_Myborrow"><i class="el-icon-sell"></i>借阅信息</el-menu-item>
          <el-menu-item index="/StuMain/Stu_MyFavorite"><i class="el-icon-star-off"></i>收藏夹</el-menu-item>
          <el-menu-item index="/StuMain/Stu_MyComment"><i class="el-icon-document-checked"></i>评论汇</el-menu-item>
          <el-menu-item index="/StuMain/Stu_Own"><i class="el-icon-setting"></i>个人信息</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-col>
  </div>
</template>

<script>
    export default {
        name: "StuLeft",
    }
</script>

<style scoped>
 #main{
   width: 400px;
   overflow: hidden;
 }
</style>
