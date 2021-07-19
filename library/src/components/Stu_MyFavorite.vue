<template>
  <div class="main">
    <template>
      <el-table
        :data="tableData"
        height="90%"
        border
        style="width: 100%"
        :header-cell-style="{textAlign: 'center',backgroundColor:'#90a3ab',color:'#fff'}"
        :cell-style="{ textAlign: 'center' }">
        <el-table-column
          prop="book.isbn"
          label="ISBN"
          width="250">
        </el-table-column>
        <el-table-column
          prop="book.name"
          label="书名"
          width="230">
        </el-table-column>
        <el-table-column
          prop="category.description"
          label="种类"
          width="230">
        </el-table-column>
        <el-table-column
          prop="book.writer"
          label="作者"
          width="230">
        </el-table-column>
        <el-table-column
          label="操作"
          width="355">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData,scope.row)"
              type="text"
              size="small">
              取消收藏
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {deleteFavor} from '../api'
    export default {
        name: "Stu_MyFavorite",
      computed: {
        ...mapState(['MyFavor','UserMeg']),
      },
      mounted() {
        console.log(this.MyFavor.books)
        this.tableData=this.MyFavor.books
      },
      data() {
        return {
          tableData: []
        }
      },
      created() {
        this.$store.dispatch('getUserAllMeg')
      },
      methods: {
        async deleteRow(index, rows,data) {
          console.log(data,rows)
          const result=await deleteFavor(this.UserMeg.stuno,data.book.isbn)
          console.log(result)
          rows.splice(index, 1);
        }
      }
    }
</script>

<style scoped>
  .main{
    width: 100%;
    height: 100%;
    position: absolute;
  }

</style>
