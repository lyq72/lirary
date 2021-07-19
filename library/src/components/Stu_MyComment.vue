<template>
    <div class="main">
      <template>
        <el-table
          ref="multipleTable"
          :data="tableData"
          :row-class-name="tableRowClassName"
          @row-click = "onRowClick"
          border
          height="90%"
          tooltip-effect="dark"
          style="width: 100%;"
          @selection-change="handleSelectionChange"
          :header-cell-style="{textAlign: 'center',backgroundColor:'#90a3ab',color:'#fff'}"
          :cell-style="{ textAlign: 'center' }"
        >
          <el-table-column
            type="selection"
            width="55"
          >
          </el-table-column>
          <el-table-column
            label="ISBN"
            width="130">
            <template slot-scope="scope">{{ scope.row.book.isbn }}</template>
          </el-table-column>
          <el-table-column
            prop="book.name"
            label="书名"
            width="120">
          </el-table-column>
          <el-table-column
            prop="book.writer"
            label="作者"
            width="120">
          </el-table-column>
          <el-table-column
            prop="comment.score"
            label="评分"
            width="120">
          </el-table-column>
          <el-table-column
            prop="comment.content"
            label="评论"
            show-overflow-tooltip>
          </el-table-column>
        </el-table>
        <div  style="text-align: center;padding-top: 5px;padding-bottom:10px;background-color: #999999" >
          <el-button @click="allSelection([...tableData])">全选</el-button>
          <el-button @click="toggleSelection([...tableData])">反选</el-button>
          <el-button @click="deleteSelection()">删除评论</el-button>
        </div>
      </template>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import {deleteOneComment,deleteMulComment} from '../api'
    export default {
        name: "Stu_MyComment",
      data() {
        return {
          checked: false,
          isAllSelect: false,
          tableData:[],
          multipleSelection: []
        }
      },
      computed: {
        ...mapState(['MyComments']),
      },
      created() {
        this.$store.dispatch('getUserAllMeg')
      },
      mounted() {
        console.log(this.MyComments)
        this.tableData=this.MyComments
      },
      methods: {
        tableRowClassName({row, rowIndex}) {
          row.row_index = rowIndex;
        },
        onRowClick (row, event, column) {
          this.currentRowIndex = row.row_index;
        },
        allSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleAllSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        async deleteSelection(){
          let tempSelection = this.multipleSelection
          let tempTableData = this.tableData
          for (let item of this.$refs.multipleTable.selection) {
            console.log(item.row_index)
            tempTableData.splice(item.row_index, 1)
          }
          this.tableData = tempTableData
          const id=this.$refs.multipleTable.selection[0].comment.id
          let ids=[]
          for (let item of this.$refs.multipleTable.selection){
            ids.push(item.comment.id)
          }
          if (this.multipleSelection.length===1){
            console.log(id)
            const result=await deleteOneComment(id)
            console.log("删除一行",result)
          }else if (this.multipleSelection.length>1){
            console.log(ids)
            const result=await deleteMulComment(ids)
            console.log("删除多行",result)
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = []
          for (let item of val) {
            this.multipleSelection.push(item.id)
          }
          // this.multipleSelection = val;
        }
      },
    }
</script>

<style scoped>
  .main{
    height: 52%;
    width: 90%;
    position: absolute;
  }
</style>
