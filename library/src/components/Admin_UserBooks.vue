<template>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{textAlign: 'center',backgroundColor:'#90a3ab',color:'#fff'}"
    :cell-style="{ textAlign: 'center' }">
    <el-table-column
      prop="borrowtime"
      label="借阅时间"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="borrowstu"
      label="学号"
      width="150"
    >
    </el-table-column>
    <el-table-column
      prop="isbn"
      label="ISBN"
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="书名"
      width="200">
    </el-table-column>
    <el-table-column
      prop="category"
      label="分类"
      width="130">
    </el-table-column>
    <el-table-column
      prop="rettime"
      label="归还时间"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="isintime"
      label="准时归还"
      width="135">
    </el-table-column>
    <el-table-column
      prop="renew"
      label="续借"
      width="140">
    </el-table-column>
  </el-table>
</template>

<script>
  import {mapState} from 'vuex'
    export default {
        name: "Admin_UserBooks",
      data() {
        return {
          tableData: [],
        }
      },
      computed: {
        ...mapState(['allStuBorrow']),
      },
      created() {
        this.$store.dispatch('getBorrow')
      },
      mounted() {
        console.log(this.allStuBorrow)
        this.tableData=this.allStuBorrow
      },
    }
</script>

<style scoped>

</style>
