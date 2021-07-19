<template>
  <div id="app">
    <div class="background">
      <img :src="backgroudSrc" width="100%" height="100%" alt="" />
    </div>
    <div class="loginContainer">
      <div class="loginInner">
        <div class="login_header">
          <a href="javascript:;" :class="{on: loginWay}" @click="loginWay=true">登录</a>
          <a href="javascript:;" :class="{on: !loginWay}" @click="loginWay=false">注册</a>
        </div>
        <div class="login_content">
          <div :class="{on: loginWay}">
            <form class="login_message">
              <input type="tel" maxlength="12" placeholder="学号" v-model="stuNo">
              <input type="password" id="password" maxlength="8" placeholder="密码" v-model="pwd">
              <button class="btn" id="login" @click.prevent="login()">登录</button>
            </form>
          </div>
          <div :class="{on: !loginWay}">
            <form class="login_message">
              <input type="tel" maxlength="12" placeholder="学号" v-model="stuNo">
              <span >
              <input type="text" placeholder="姓名" v-model="user" style="width: 135px;float: left">
                <el-radio-group v-model="sex"  size="medium" style="display: flex;flex-flow:row nowrap; float: right ;margin-top: 8px;">
                  <el-radio-button label="MALE" border class="sex">MALE</el-radio-button>
                  <el-radio-button label="FEMALE" border class="sex">FEMALE</el-radio-button>
                </el-radio-group>
              </span>
              <input type="password" maxlength="8" placeholder="密码" v-model="pwd">
              <input type="text" placeholder="邮箱" v-model="email" name="email">
              <input type="text" placeholder="验证码" v-model="code" class="email">
              <button class="emailsent" @click.prevent="sentEmail()">发送验证码</button>
              <button class="btn" @click.prevent="zhuce()">注册</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <pre>ZHKU   writer:陈国栋、梁泳琪</pre>
  </div>
</template>

<script>
  import {sentRegister,sentCode,sentLogin} from '../api/index'
  export default {
    name: 'HelloWorld',
    data(){
      return{
        loginWay: true,
        backgroudSrc:require('../common/img/backgroud.jpg'),
        user: '', // 姓名
        stuNo: '', // 学号
        pwd: '' ,// 密码
        email:'',
        code:'',
        sex:"男",
        trueCode:''
      }
    },
    methods:{
      async sentEmail(){
        const result=await sentCode(this.email)
        console.log(result.data)
        this.trueCode=result.data
        console.log(this.trueCode)
      },
      async zhuce(){
        if(this.name===''||this.pwd===''||this.stuNo===''||this.code===''||this.email===''){
          alert("任何信息都不能为空")
        }else{
          console.log("真正的code",this.trueCode)
          console.log(this.code)
          if (this.trueCode===this.code){
            const result= await sentRegister(this.stuNo,this.user,this.pwd,this.email,this.sex)
            console.log("注册操作",result)
            if (result==='注册成功'){
              alert("注册成功,请登录进入")
              this.loginWay=true
            }else {
              alert(result)
            }
          }else{
            alert('验证码错误')
          }
        }
      },
      async login(){
        if (this.stuNo==='admin'&& this.pwd==='admin'){
          this.$store.dispatch('userMeg',{'stuno':'admin','password':'admin'})
          this.$router.push('/AdminMain')
        }else if (this.stuNo===''||this.pwd===''){
          this.$router.push('/StuMain')
        }else {
          const result=await sentLogin(this.stuNo,this.pwd)
          console.log(result)
          console.log(result.message)
          console.log(result.data)
          if (result.message==='登录成功'){
            this.$store.dispatch('userMeg',result.data)
            this.$store.dispatch('getUserAllMeg')
            this.$router.push('/StuMain')
          }else {
            alert(result.message)
          }
        }
      },
      hideModal() {
        // 取消弹窗回调
        this.show = false
      },
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  .background{
    width:100%;
    height:100%;  /**宽高100%是为了图片铺满屏幕 */
    z-index:-1;
    position: absolute;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .loginContainer{
    position: absolute;
    top: 150px;
    width:400px;
    height:380px;
    background:#fff;
    margin-left: 550px;
    filter: alpha(opacity: 0.5);
    opacity: 0.5;
    position: relative;
  }
  .loginInner {
    padding-top: 20px;
    width: 80%;
    margin: 0 auto;
  }
  .login_header{
    font-size: 20px;
    font-weight: bold;
    color: #3080a7;
    text-align: center;
  }
  .login_header a {
    color: #333;
    font-size:20px;
    padding-bottom: 4px;
  }

  .login_header .on{
    color:#3080a7;
    font-weight: 700;
    border-bottom:2px solid #3080a7;
  }
  .login_content div{
    display: none;
  }
  .login_content .on{
    display: block;
  }
  .login_content input {
    width:100%;
    height: 90%;
    padding-left: 10px;
    margin-top: 5px;
    margin-bottom: 5px;
    box-sizing: border-box;
    border: 1px solid #90a3ab;
    border-radius: 4px;
    outline: 0;
    font: 400 14px Arial;
  }
  .login_content .email{
    width:210px;
  }
  .login_content .emailsent{
    width:105px;
    border-radius: 4px;
    background: #90a3ab;
    color: #393351;
    text-align: center;
    font-size: 16px;
    height: 40px;
    line-height: 18px;
    border: 0;
  }
  .login_content input:hover{
    border:1px solid #393351;
  }
  .login_content input:focus{
    border:1px solid #393351;
  }
  .login_message{
    position: relative;
    margin-top: 16px;
    height: 45px;
    font-size: 14px;
    background: #fff;
  }
  .btn{
    display: block;
    width: 100%;
    height: 40px;
    margin-top: 10px;
    border-radius: 4px;
    background: #90a3ab;
    color: #393351;
    text-align: center;
    font-size: 16px;
    line-height: 40px;
    border: 0;
  }
  #password{
    margin-top: 20px;
  }
  #login{
    margin-top: 30px;
  }
  pre{
    color: #e0e0e0;
    font-size: 16px;
    font-weight: bolder;
    position: absolute;
    bottom: 100px;
    right: 650px;
  }
</style>
