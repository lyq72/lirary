<template>
  <div class="main">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="学号" prop="OwnMeg.stuno">
        {{OwnMeg.stuno}}
      </el-form-item>
      <el-form-item label="姓名" prop="OwnMeg.name">
        {{OwnMeg.name}}
      </el-form-item>
      <el-form-item label="邮箱" prop="OwnMeg.email" >
        {{OwnMeg.email}}
      </el-form-item>
      <el-form-item label="性别" prop="OwnMeg.sex" >
        {{OwnMeg.sex}}
      </el-form-item>
      <el-form-item label="原密码" prop="oldpass">
        <el-input type="password" v-model="oldpass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="重置密码" prop="pass">
        <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import {resetPass} from "../api"
    export default {
        name: "Stu_Own",
      computed: {
        ...mapState(['UserMeg']),
      },
      mounted() {
        this.OwnMeg=this.UserMeg
      },
      data() {
        let validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.ruleForm.checkPass !== '') {
              this.$refs.ruleForm.validateField('checkPass');
            }
            callback();
          }
        };
        let validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.ruleForm.pass) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          oldpass:'',
          OwnMeg:[],
          ruleForm: {
            pass: '',
            checkPass: '',
          },
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ],
          }
        };
      },
        methods: {
          async submitForm(formName) {
            console.log(this.oldpass,this.ruleForm.checkPass)
            const result=await resetPass(this.ruleForm.checkPass,this.oldpass,this.UserMeg.stuno)
            alert(result.message)
          },
          resetForm(formName) {
            this.$refs[formName].resetFields();
          }
        }
      }
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  position: absolute;
  padding-top: 50px;
  padding-left: 60px;
  background-color: #ffffff;
}
</style>
