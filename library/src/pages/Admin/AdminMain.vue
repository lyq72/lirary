<template>
  <div id="all">
    <header class="header">
      <Header></Header>
    </header>
    <div class="content">
      <div class="left">
        <AdminLeft></AdminLeft>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    import Header from "../../components/header";
    import AdminLeft from "../../components/AdminLeft";
    import {mapState} from 'vuex'
    export default {
        name: "AdminMain",
      components: {AdminLeft, Header},
      computed: {
        ...mapState([ 'UserMeg']),
      },
      created() {
        if (this.UserMeg.stuno == undefined||this.UserMeg.stuno !='admin') {
          alert('请先登录')
          this.$router.push('/login')
        }
      }
    }
</script>

<style scoped>
  #all{
  }
  .header{
    height: 50px;
  }
  .content{
    width: 100%;
    height: 90%;
    position: absolute;
    overflow: hidden;
  }
  .left{
    float: left;
    width: 199px;
    height: 100%;
    background-color: #000000;
  }
  .right{
    margin-left: 200px;
  }
</style>
