<template>
<div class="main">
  <template>
    <el-table
      height="580"
      :data="tableData"
      style="width: 100%;height: 90%"
      :header-cell-style="{textAlign: 'center',backgroundColor:'#90a3ab',color:'#fff'}"
      :cell-style="{ textAlign: 'center' }"
      @row-click="select">
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
        width="90">
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
        align="right">
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
            @click.native.stop="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button
            size="mini"
            type="danger"
            @click.native.stop="handleDelete(scope.$index,scope.row,tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="add" class="add">增加</el-button>
  </template>
<AddBookDialog :show="showAdd"  @hideModal="hideModal" @Addsubmit="Addsubmit"></AddBookDialog>
<ReviseBookDialog :show="showRevise" :form="formRevise" @hideModal="hideModal" @Revisesubmit="Revisesubmit"></ReviseBookDialog>
  <dialogbook :show="show" :book="book" :comment="comment" :way="true" @hideModal="hideModal" @submit="submit"></dialogbook>
</div>
</template>

<script>
    import AddBookDialog from "./AddBookDialog";
    import ReviseBookDialog from "./ReviseBookDialog";
    import dialogbook from "./BookItemDialog";
    import {mapState} from 'vuex'
    import {deleteBook} from '../api'
    export default {
        name: "Admin_SetBook",
      components: {AddBookDialog,ReviseBookDialog,dialogbook},
      data() {
        return {
          showAdd:false,
          showRevise:false,
          formRevise: {},
          book:{},
          show:false,
          tableData: [],
          search: '',
          way:'搜索方式',
          comment:{},
          form:{},
          category: {'A':'马克思主义、列宁主义、毛泽东思想、邓小平理论',
            'B':'哲学、宗教','C':'社会科学总论',
            'D':'政治、法律','I':'文学','J':'艺术'}
          // command: '搜索方式',
        }
      },
      computed: {
        ...mapState(['booksDate']),
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
        this.$store.dispatch('getBooksDate')
      },
      mounted() {
          console.log(this.booksDate)
        this.tableData=this.booksDate
        this.search=this.$route.params.search
        this.way=this.$route.params.way
      },
      methods: {
        select(row,cell,event){
          this.show=true
          this.book=row.book;
          this.comment=row.comment
        },
        handleEdit(index, row) {
          console.log(index, row);
          this.formRevise=row
          this.showRevise=true
        },
         async handleDelete(index, row,data) {
          console.log(row);
          const result=await deleteBook(row.book.isbn)
          console.log(result)
           data.splice(index, 1);
        },
        hideModal() {
          // 取消弹窗回调
          this.showAdd = false
            this.showRevise = false
          this.show=false
        },
        submit() {
          // 确认弹窗回调
          this.show = false
        },
        Addsubmit(form) {
          // 确认弹窗回调
          this.showAdd = false
          const row=new Object()
          row.book=form
          let type=Object.keys(this.category)
          for (let ckey of type){
            if (ckey===form.category){
              row.category={}
              row.category.description=this.category[ckey]
            }
          }
          row.borrowednum=0
          row.score=0
          console.log(row)
          this.tableData.unshift(row)
          console.log(this.showData)
        },
        Revisesubmit(form){
          this.showRevise = false
          const row=new Object()
          row.book=form
          let type=Object.keys(this.category)
          for (let ckey of type){
            if (ckey===form.category){
              row.category={}
              row.tableData.description=this.category[ckey]
            }
          }

        },
        add() {
          this.showAdd=true
        },
        handleCommand(command) {
          this.way=command
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          const propertyArr=property.split('.')
          return row[propertyArr[0]][propertyArr[1]] === value;
        },
      },
    }
</script>

<style scoped>
.add{
  width: 1300px;
  margin-top: 10px;
  background-color: #999999;
  overflow: auto;
}
</style>
