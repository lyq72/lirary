<template>
  <div class="main">
    <div class="image">
      <img src="../common/img/logo.png">
    </div>
    <div class="search">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          {{way}}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="ISBN">ISBN</el-dropdown-item>
          <el-dropdown-item command="书名">书名</el-dropdown-item>
          <el-dropdown-item command="种类">种类</el-dropdown-item>
          <el-dropdown-item command="作者" >作者</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-input
        class="el-input"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
        v-model="input">
      </el-input>
      <el-button icon="el-icon-search" circle @click="search()"></el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "AdminRightMain",
      data() {
        return {
          input: '',
          way:'搜索方式',
        }
      },
      methods:{
        search(){
          this.$router.push({name:'Admin_SetBook',params:{search:this.input,way:this.way}});
        },
        recommend(name){
          this.$router.push({name:'Admin_SetBook',params:{search:name}});
        },
        handleCommand(command) {
          this.way=command
        }
      },
    }
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
    position: absolute;
  }
  .search{
    margin-top: 310px;
    margin-left: 250px;
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #393351;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .el-input{
    width: 50%;
  }
  .image{
    text-align: center;
    position: absolute;
    width: 300px;
    height: 300px;
    left: 450px;
    top: 100px;
  }
  img{
    width: 300px;
    height: 200px;
  }
</style>
