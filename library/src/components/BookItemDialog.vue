<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container" :class="{on:way}">
      <div class="model-header">详细-{{book.name}}</div>
      <div class="modal-main">
        <div class="imga">
          <img :src="'http://8.135.28.126/lib/'+book.isbn+'.jpg'">
        </div>
        <p>简介</p>
        <div class="jianjie">{{book.introduction}}</div>
        <p>评论</p>
        <div>
          <ul>
            <li class="rating-item border-1px" v-for="item of comment">
              <div class="header">
                <div class="name">{{item.author}}</div>
                <div class="star-wrapper">
                  <el-rate
                    v-model="item.score"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                  </el-rate>
                </div>
                <div>{{item.releasetime}}</div>
              </div>
                <div class="text">{{item.content}}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="modal-footer">
        <button @click="hideModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "dialog",
      data(){
          return{
            value: 3.7,
            comment:[],
          }
      },
      props:{
        show:{
          type:Boolean,
          default:false
        },
        book:{
          type:Object,
          default:{}
        },
        comment: {
          type:Object,
          default:{}
        },
        way:{
          type:Boolean,
          default:false,
        }
      },
      created() {

          console.log(this.way)
      },
      methods: {
        hideModal() {
          this.$emit('hideModal')
        },
        submit() {
          this.$emit('submit')
        },
      }
    }
</script>

<style scoped>
  .modal-bg{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .4);
    z-index:999;
  }
  .modal-container{
    margin-top: 700px;
    border-radius: 8px;
    background: #fff;
    width: 400px;
  }
  .on{
    margin-top: 100px !important;
  }
  .model-header{
    heigth: 60px;
    text-align: center;
    margin-top: 10px;
  }
  .modal-main {
    padding: 10px 20px;
    height: 500px;
    overflow: auto;
  }
  .modal-footer{
    height: 30px;
    display: flex;
    justify-content: center;
    align-item: center;
    margin-bottom: 10px;
    /*border-top: 1px solid #000;*/
  }
  .modal-footer button{
    /*width:100px;*/
  }
  .imga{
    width: 200px;
    height: 250px;
    margin-left: 80px;
    margin-top: 20px;
  }
  img{
    width: 200px;
    height: 250px;
  }
  p{
    margin-top: 15px;
    margin-bottom: 15px;
    font-weight: bolder;
  }
  .header{
    display: flex;
    justify-content: space-between;
    font-family: Consolas;
    font-size: 14px;
  }
  ul li{
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: #999999 1px solid;
  }
  .text{
    margin-top: 5px;
    font-size: 13px;
    font-family: "PingFang SC";
    text-align: left;
  }
  .jianjie{
    text-align: left;
  }
</style>
