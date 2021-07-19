<template>
  <div class="main">
    <template>
      <el-table
        :data="showData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        height="600"
        border
        style="width: 100%"
        :header-cell-style="{textAlign: 'center',backgroundColor:'#90a3ab',color:'#fff'}"
        :cell-style="{ textAlign: 'center' }"
        @row-click="select"
        >
        <el-table-column
          prop="book.isbn"
          label="ISBN"
          width="130">
        </el-table-column>
        <el-table-column
          prop="book.name"
          label="书名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="category.description"
          label="种类 >"
          width="200"
          column-key="category.description"
          :filters="[{text:'马克思主义、列宁主义、毛泽东思想、邓小平理论' , value:'马克思主义、列宁主义、毛泽东思想、邓小平理论' },
        {text:'哲学、宗教' , value:'哲学、宗教' },{text:'社会科学总论' , value:'社会科学总论' },
        {text:'政治、法律' , value:'政治、法律' },{text:'文学' , value:'文学' },{text:'艺术' , value:'艺术' }]"
          :filter-method="filterHandler"
        >
        </el-table-column>
        <el-table-column
          prop="book.writer"
          label="作者"
          width="120">
        </el-table-column>
        <el-table-column
          prop="book.stock"
          label="馆藏"
          width="80">
        </el-table-column>
        <el-table-column
          prop="book.borrowednum"
          label="已借"
          width="80">
        </el-table-column>
        <el-table-column
          prop="book.score"
          label="评分"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="book.publisher"
          label="出版社"
          width="150">
        </el-table-column>
        <el-table-column
          align="right"
          width="250">
          <template slot="header" slot-scope="scope" style="display: flex">
            <el-dropdown @command="handleCommand" style="width: 80px;font-size: 13px">
              <span class="el-dropdown-link">
                方式:{{way}}<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="ISBN">ISBN</el-dropdown-item>
                <el-dropdown-item command="书名">书名</el-dropdown-item>
                <el-dropdown-item command="种类">种类</el-dropdown-item>
                <el-dropdown-item command="作者" >作者</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input
              v-model="search"
              size="mini"
              placeholder="输入关键字搜索"
              style="width: 60%"/>
          </template>
          <template slot-scope="scope">
            <el-button
              size="mini"
              v-show="!isFavored(scope.$index,scope.row)"
              @click.native.stop="addFavor(scope.$index, scope.row)">收藏</el-button>
            <el-button
              size="mini"
              v-show="isFavored(scope.$index, scope.row)"
              @click.native.stop="deleteFavor(scope.$index, scope.row)">取消收藏</el-button>
            <el-button
              size="mini"
              v-show="isBorrow(scope.$index,scope.row)"
              @click.native.stop="borrow(scope.$index, scope.row)">借阅</el-button>
            <el-button
              size="mini"
              v-show="!isBorrow(scope.$index,scope.row)">已借阅</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          style="margin-left: 300px"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-sizes="[1,5,10,20]"
          :page-size="pagesize"
          layout="prev, pager, next, jumper"
          :total="tableData.length">
        </el-pagination>
      </div>
    </template>
    <dialogbook :show="show" :book="book" :comment="comment" @hideModal="hideModal" @submit="submit"></dialogbook>
  </div>
</template>

<script>
  import dialogbook from "./BookItemDialog";
  import {mapState} from 'vuex'
  import {addFavor, deleteFavor,borrow} from '../api'
    export default {
        name: "StuRight",
      components:{
        'dialogbook':dialogbook
      },
      data() {
        return {
          search: '',
          show: false,
          tableData: [],
          currentPage: 1,
          pagesize: 9,
          book: {},
          comment: {},
          way: '搜索方式',
          command: '搜索方式',
        }
      },
      computed: {
        ...mapState(['booksDate','UserMeg','MyFavor','MyBorrow']),
        showData:function () {
          if (!this.search) {
            let booksDate=this.booksDate.filter(data => !this.search
              ||data.book.name.toLowerCase().includes(this.search.toLowerCase())
              ||data.book.isbn.toLowerCase().includes(this.search.toLowerCase())
              ||data.book.writer.toLowerCase().includes(this.search.toLowerCase())
              ||data.category.description.toLowerCase().includes(this.search.toLowerCase()))
            return booksDate
          }else if (this.search &&this.way==='ISBN'){
            return this.tableData.filter(data =>data.book.isbn.toLowerCase().includes(this.search.toLowerCase()))
          }else if (this.search &&this.way==='书名'){
            return this.tableData.filter(data =>data.book.name.toLowerCase().includes(this.search.toLowerCase()))
          }else if (this.search &&this.way==='作者'){
            return this.tableData.filter(data =>data.book.writer.toLowerCase().includes(this.search.toLowerCase()))
          }else if (this.search &&this.way==='种类'){
            return this.tableData.filter(data =>data.category.description.toLowerCase().includes(this.search.toLowerCase()))
          }else {
            return this.booksDate
          }
        },
      },

      created() {
        this.$store.dispatch('getUserAllMeg')
        this.$store.dispatch('getBooksDate')
      },
      mounted(){
          this.tableData=this.booksDate
        this.search=this.$route.params.search
        this.way=this.$route.params.way
      },
      methods:{
        isFavored(index,row){
          if (row.isFavor){
            return true
          }else {
            return false
          }
        },
        isBorrow(index,row){
          console.log(row.borrowStatus)
          if (row.borrowStatus){
            return true
          }else {
            return false
          }
        },
        async addFavor(index, row) {
          row.isFavor=true
          const result=await addFavor(this.UserMeg.stuno,row.book.isbn)
          console.log(result)
        },
        async deleteFavor(index, row){
          row.isFavor=false
          const result=await deleteFavor(this.UserMeg.stuno,row.book.isbn)
          console.log(result)
        },
        async borrow(index, row){
          row.borrowStatus=false
          row.borrowednum=row.borrowednum+1
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
          const result=await borrow(this.UserMeg.stuno,dateTime,row.book.category,row.book.isbn,row.book.name,30)
          console.log(result)
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          const propertyArr=property.split('.')
          return row[propertyArr[0]][propertyArr[1]] === value;
        },
        select(row,cell,event){
          this.show=true
          this.book=row.book;
          this.comment=row.comment
        },
        hideModal() {
          // 取消弹窗回调
          this.show = false
        },

        submit() {
          // 确认弹窗回调
          this.show = false
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
        },
        handleCommand(command) {
          this.way=command
          console.log(command);
        }
      }
    }
</script>

<style scoped>
.main{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #ffffff;
}
</style>
