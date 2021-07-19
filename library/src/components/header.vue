<template>
    <div class="main">
      <div class="left">
        <div><i class="el-icon-reading"></i> 图书管理系统</div>
      </div>
      <div class="right">
      <span>欢迎您：{{UserMeg.stuno}}</span>
      <span class="back">
        <el-popconfirm
          title="您确定退出登录吗？"
          @confirm="confirmY"
        >
          <el-button class="el-button" slot="reference" >[退出]</el-button>
        </el-popconfirm>
      </span>
      </div>
    </div>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "header",
      computed: {
        ...mapState(['UserMeg']),
      },
      methods:{
        confirmY(){
          this.$router.push('/login')
        },
      }
    }
</script>

<style scoped>
.main{
  background-color: #6DD1E6;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
  .left{
    margin-left: 20px;
  }
  .right{
    margin-right: 20px;
  }
span{
  font-size: 12px;
}
.back{
  width: 5px;
  height: 5px;
  font-size: 5px;
}
.el-button{
  font-size: 13px;
  background-color: #6DD1E6;
  border: #999999;
}
</style>
