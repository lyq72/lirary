<template>
  <div class="modal-bg" v-show="show">
    <div class="modal-container">
      <div class="model-header">添加书籍</div>
      <div class="modal-main">
        <el-form ref="formData" enctype="multipart/form-data" :model="form" label-width="80px">
          <div class="img">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              :http-request="uploadImg"
              list-type="picture-card"
              :on-change="imgChange"
              :class="{disabled:uploadDisabled}"
              :on-remove="handleRemove"
              :on-success="imgSuccess"
              multiple>
              <i class="el-icon-plus"></i>
            </el-upload>
          </div>
          <el-form-item label="ISBN">
            <el-input v-model="form.isbn"></el-input>
          </el-form-item>
          <el-form-item label="书名">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="类别">
            <el-select v-model="form.category" placeholder="请选择类别">
              <el-option label="A" value="A"></el-option>
              <el-option label="B" value="B"></el-option>
              <el-option label="C" value="C"></el-option>
              <el-option label="D" value="D"></el-option>
              <el-option label="I" value="I"></el-option>
              <el-option label="J" value="J"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作者">
            <el-input v-model="form.writer"></el-input>
          </el-form-item>
          <el-form-item label="馆藏数量">
            <el-input v-model="form.stock"></el-input>
          </el-form-item>
          <el-form-item label="馆藏位置">
            <el-input v-model="form.position"></el-input>
          </el-form-item>
          <el-form-item label="出版社">
            <el-input v-model="form.publisher"></el-input>
          </el-form-item>
          <el-form-item label="简介">
            <el-input type="textarea" v-model="form.introduction"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="Addsubmit">立即创建</el-button>
            <el-button @click="hideModal">取消</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {setNewBook,setPic} from '../api/index'
  import axios from 'axios'
    export default {
        name: "AddBookDialog",
      data(){
          return {
            dialogImageUrl:[],
            // dialogVisible: false,
            imageList: [],
            uploadDisabled: false,
            form: {
              isbn: '',
              name: '',
              category: '',
              writer: '',
              stock: '',
              publisher: '',
              introduction: '',
              position: '',
            },
            fileMeg: {},
          }
      },
      props:{
        show:{
          type:Boolean,
          default:false
        },
      },
      methods: {
        imgChange(file, fileList){
          console.log(fileList.length)
          this.uploadDisabled = fileList.length >= 1;
        },
        hideModal() {
          this.$emit('hideModal')
        },
        async Addsubmit() {
          let data=[this.form.category,this.form.introduction,this.form.isbn,this.form.name,this.form.position,this.form.publisher,this.form.stock,this.form.writer,this.dialogImageUrl]
          let formData = new FormData()
          console.log(this.fileMeg.raw)
          formData.append('file', this.fileMeg.raw)
          formData.append('isbn', this.form.isbn)
          axios({
            method:'post',
            url:'http://66ddb5fw.dongtaiyuming.net/admin/image',
            data:formData})
          // const result=await setPic(formData)
          console.log(result)
          // category,introduction,ISBN,name,position,publisher,stock,writer
          const result=await setNewBook(this.form.category,this.form.introduction,this.form.isbn,this.form.name,
            this.form.position,this.form.publisher,this.form.stock,this.form.writer,this.dialogImageUrl)
          console.log(result)
          this.$emit('Addsubmit',this.form)
        },
        handleRemove(file, fileList) {
          this.uploadDisabled = fileList.length >= 1;
        },
        imgSuccess(response, file, fileList) {
          console.log(response)
          console.log("imgSuccess",file)
          this.fileMeg=file
          // let formData = new FormData()
          // formData.append('file', file.raw)
          // axios({
          //   method:'post',
          //   url:'http://66ddb5fw.dongtaiyuming.net/admin/image',
          //   data:{formData,this.form.isbn}})
        },
        uploadImg() {
          this.$http.jsonp('https://jsonplaceholder.typicode.com/posts/', {},
            {
              headers: {},
              emulateJSON: true }).then((response) => {
            console.log("success");
          });
        },
      }
    }
</script>

<style >
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
    height: 630px;
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
    margin-left: 130px;
    margin-bottom: 20px;
  }
  .disabled .el-upload--picture-card{
    display: none;
  }
</style>
