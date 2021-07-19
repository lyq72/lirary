<template>
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
        <el-menu-item index="/AdminMain">
          <i class="el-icon-menu"></i>
          <span slot="title">主页</span>
        </el-menu-item>
        <el-submenu index="/AdminMain">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span>设置</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/AdminMain/Admin_SetBook"><i class="el-icon-edit-outline"></i>图书信息管理</el-menu-item>
            <el-menu-item index="/AdminMain/Admin_UserBooks"><i class="el-icon-sort"></i>用户借归信息</el-menu-item>
            <el-menu-item index="/AdminMain/Admin_SetUser"><i class="el-icon-s-custom"></i>用户信息管理</el-menu-item>
            </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-col>
  </div>
</template>

<script>
    export default {
        name: "AdminLeft"
    }
</script>

<style scoped>
  #main{
    width: 400px;
    overflow: hidden;
  }
</style>
