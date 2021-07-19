<template>
  <div>
    <full-page :options="options">4
      <div class="section">
      <div class="lunbo">
        <template>
          <el-carousel :interval="4000" type="card" height="450px">
            <el-carousel-item v-for="item in hotBooks" >
              <img :src="'http://8.135.28.126/lib/'+item.book.isbn+'.jpg'"  style="height:100%;width:100%;" alt="图片丢失了" :title="item.book.name" />
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
        <div class="tips">
          <i class="el-icon-caret-bottom"></i>
          向下滑动至主页
        </div>
      </div>
      <div class="section">
        <div id="all">
          <header class="header">
            <Header></Header>
          </header>
          <div class="content">
            <div class="left">
              <StuLeft></StuLeft>
            </div>
            <div class="right">
              <router-view></router-view>
            </div>
          </div>
        </div>
      </div>
    </full-page>
  </div>
</template>

<script>
    import StuLeft from "../../components/StuLeft";
    import Header from "../../components/header";
    import {mapState} from 'vuex'
    export default {
        name: "StuMain",
      components: {Header, StuLeft},
      computed: {
        ...mapState([ 'UserMeg','hotBooks']),
      },
      created() {
          if (this.UserMeg.stuno==undefined){
            alert('请先登录')
            this.$router.push('/login')
          }
        this.$store.dispatch('getBooksDate')
        this.$store.dispatch('getUserAllMeg')
        this.$store.dispatch('hotBook')
      },
      mounted() {
        console.log(this.hotBooks)
      },
      data(){
        return{
          options: {
            licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
            afterLoad: this.afterLoad,
            scrollOverflow: true,
            scrollBar: false,
            menu: '#menu',
            // navigation: true,
            // anchors: ['page1', 'page2', 'page3'],
            sectionsColor: [ '#fec401','#ff5f45' ,'#0798ec',  '#1bcee6', '#ee1a59', '#2c3e4f', '#ba5be9', '#b4b8ab']
          },
        }
      },
      methods: {
        handleOpen(key, keyPath) {
          console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
          console.log(key, keyPath);
        }
      },

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
  .lunbo{
    padding-top: 100px;
    width: 90%;
    padding-left: 100px;
  }
  .tips{
    margin-top: 50px;
    text-align: center;
    color: #FF5F45;
    font-weight: bolder;
  }
</style>
