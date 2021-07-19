<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="model-header">评论-{{rowName}}</div>
      <div class="modal-main">
        <div class="block">
          <el-rate
            v-model="value"
            :colors="colors">
          </el-rate>
        </div>
        <div style="margin: 20px 0;"></div>
        <el-input
          type="textarea"
          placeholder="请输入评论内容"
          :rows="8"
          style="font-size: 18px;width: 400px"
          v-model="textarea"
          maxlength="100"
          show-word-limit
        >
        </el-input>
      </div>
      <div class="modal-footer">
        <button @click="submit">确定</button>
        <button @click="hideModal">关闭</button>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {postcomment} from '../api'
    export default {
        name: "comment",
      data(){
        return{
          value: null,
          colors: ['#99A9BF', '#F7BA2A', '#FF9900'],
          text: '',
          textarea: ''
        }
      },
      computed: {
        ...mapState(['UserMeg']),
      },
      props:{
        show:{
          type:Boolean,
          default:false
        },
        rowName:{
          type:String,
          default: ''
        },
        isbn:{
          type:String,
          default: ''
        }
      },
      methods: {
         hideModal() {
          this.$emit('hideModal')
        },
        async submit() {
          let yy = new Date().getFullYear();
          let mm = new Date().getMonth()+1;
          let dd = new Date().getDate();
          let hh = new Date().getHours();
          let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
          let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
          let time = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
          console.log(time)
          const result=await postcomment(this.UserMeg.stuno,this.textarea,this.isbn,
            time,this.value*2,this.writer)
          alert(result.message)
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
    border-radius: 8px;
    background: #fff;
    margin-top: 700px;
  }
  .model-header{
    heigth: 60px;
    text-align: center;
    margin-top: 10px;
  }
  .modal-main {
    padding: 20px 40px;
    text-align: center;
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
    opacity: 0.5;
    border: #3a8ee6;
  }
  .modal-footer button:hover{
    opacity: 1;
    background-color: #90a3ab;
  }
</style>
