<template>
  <div class="main">
    <template>
  <el-table
    :data="tableData"
    height="90%"
    border
    style="width: 100%"
    :header-cell-style="{textAlign: 'center',backgroundColor:'#97ab98',color:'#fff'}"
    :cell-style="{ textAlign: 'center' }">
    <el-table-column
      prop="borrowtime"
      label="借阅时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="isbn"
      label="ISBN"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="书名"
      width="150">
    </el-table-column>
    <el-table-column
      prop="category"
      label="分类"
      width="130">
    </el-table-column>
    <el-table-column
      prop="rettime"
      label="归还时间"
      width="180">
    </el-table-column>
    <el-table-column
      prop="isInTime"
      label="超时"
      width="155">
    </el-table-column>
    <el-table-column
      align="right"
      width="350"
      prop="work"
      label="操作">
    >
    <template slot-scope="scope">
      <el-button
        v-if="isOut(scope.row)"
        size="mini"
        @click="commentEdit(scope.$index, scope.row)">评论</el-button>
      <el-button
        v-if="!isOut(scope.row)"
        size="mini"
        @click="backEdit(scope.$index, scope.row)">归还</el-button>
      <el-button
        v-if="!isXujie(scope.row)"
        size="mini"
        @click="ToXUEdit( scope.row)">续借</el-button>
      <el-button
        v-if="isXujie(scope.row)"
        size="mini">已续借</el-button>
    </template>
    </el-table-column>
  </el-table>
    </template>
    <comment :show="show" :rowName="rowName" :isbn="isbn" @hideModal="hideModal" @submit="submit"></comment>
  </div>
</template>

<script>
    import Comment from "./CommentDialog";
    import {mapState} from 'vuex'
    import {retBook} from '../api'
    export default {
        name: "Stu_Myborrow",
      components: {Comment},
      computed: {
        ...mapState(['MyBorrow']),
      },
      mounted() {
        // this.MyBorrow.splice(1,1)
        console.log("ss",this.MyBorrow)
        this.tableData=this.MyBorrow
      },
      created() {
        this.$store.dispatch('getUserAllMeg')
      },
      data() {
        return {
          show:false,
          rowName:'',
          isbn:'',
          tableData: []
        }
      },
      methods: {
          isOut(row){
            if (row.rettime===''||row.rettime==null){
              return false
            }else {
              return true
            }
          },
        isXujie(row){
          if (row.renew===false){
            return false
          }else {
            return true
          }
        },
        ToXUEdit(row){
            row.renew=true
            alert("续借成功")
        },
        commentEdit(index, row) {
          this.show=true
          this.rowName=row.name;
          this.isbn=row.isbn
          console.log(index, row);
        },
        async backEdit(index, row) {
          console.log(index, row);
          const result=await retBook(row.id)
          let dateTime
          let yy = new Date().getFullYear()
          let mm = new Date().getMonth() + 1
          let dd = new Date().getDate()
          let hh = new Date().getHours()
          let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes()
            :
            new Date().getMinutes()
          let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds()
            :
            new Date().getSeconds()
          dateTime = yy + '-' + mm + '-' + dd + ' ' + hh + ':' + mf + ':' + ss
          console.log(dateTime)
          row.rettime=dateTime
          alert("归还成功")
        },
        hideModal() {
          // 取消弹窗回调
          this.show = false
        },

        submit() {
          // 确认弹窗回调
          this.show = false
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
</style>
