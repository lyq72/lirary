<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="model-header">修改书籍信息</div>
      <div class="modal-main">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="ISBN">
            {{form.book.isbn}}
          </el-form-item>
          <el-form-item label="书名">
            <el-input v-model="form.book.name"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="form.book.category" placeholder="请选择类别">
              <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="C" value="C"></el-option>
              <el-option label="D" value="D"></el-option>
              <el-option label="I" value="I"></el-option>
              <el-option label="J" value="J"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.book.writer"></el-input>
          </el-form-item>
          <el-form-item label="馆藏数量">
            <el-input v-model="form.book.stock"></el-input>
          </el-form-item>
          <el-form-item label="馆藏位置">
            <el-input v-model="form.book.position"></el-input>
          </el-form-item>
          <el-form-item label="出版社">
            <el-input v-model="form.book.publisher"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="form.book.introduction" rows="8"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="revisesubmit">修改</el-button>
            <el-button @click="hideModal">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {setBookMeg} from '../api'
    export default {
        name: "Revise",
      data(){
        return{
          form: {},
        }
      },
      props:{
        show:{
          type:Boolean,
          default:false
        },
        form: {
          type:Object,
          default: {}
        }
      },
      methods: {
        hideModal() {
          this.$emit('hideModal')
        },
        async revisesubmit() {
          // category,introduction,isbn,name,position,publisher,stock,writer
          const result=await setBookMeg(this.form.book.category,this.form.book.introduction,this.form.book.isbn,this.form.book.name,
            this.form.book.position,this.form.book.publisher,this.form.book.stock,this.form.book.writer)
          console.log(result)
          this.$emit('Revisesubmit',this.form)
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
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
    width: 450px;
    height: 600px;
    overflow: auto;
  }
  .model-header{
    heigth: 60px;
    text-align: center;
    margin-top: 10px;
  }
  .modal-main {
    padding: 20px 40px;
    width: 350px;
    height: 500px;
  }
  .modal-footer button{
    opacity: 0.5;
    border: #3a8ee6;
  }
  .modal-footer button:hover{
    opacity: 1;
    background-color: #90a3ab;
  }
  .img{
    margin-left: 120px;
  }
</style>
