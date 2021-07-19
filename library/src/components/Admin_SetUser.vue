<template>
  <el-table
    ref="filterTable"
    :data="tableData"
    style="width: 100%"
    :header-cell-style="{textAlign: 'center',backgroundColor:'#90a3ab',color:'#fff'}"
    :cell-style="{ textAlign: 'center' }">
    <el-table-column
      prop="stuno"
      label="学号"
      sortable
      width="180"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别"
      width="180">
    </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      width="320">
    </el-table-column>
    <el-table-column
      prop="password"
      label="密码"
      width="200">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="235"
      :filters="[{ text: 'NORMAL', value: 'NORMAL' }, { text: 'FORBIDDEN', value: 'FORBIDDEN' }]"
      :filter-method="filterTag"
      filter-placement="bottom-end">
      <template slot-scope="scope" >
        <el-tag
          class="el-tag"
          @click="onClick(scope.row.status ,scope.$index,scope.row)"
          :type="scope.row.status === 'NORMAL' ? 'success' : 'danger'"
          :key="scope.row.status"
          disable-transitions
        >{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import {setUserState} from '../api/index'
  import {mapState} from 'vuex'
    export default {
        name: "Admin_SetUser",
      data() {
        return {
          tagname:'',
          tableData: [],
        }
      },
      computed: {
        ...mapState(['allUserMeg']),
      },
      created() {
        this.$store.dispatch('getUserMeg')
      },
      mounted() {
          console.log(this.allUserMeg)
        this.tableData=this.allUserMeg
      },
      methods: {
        clearFilter() {
          this.$refs.filterTable.clearFilter();
        },
        formatter(row, column) {
          return row.address;
        },
        filterTag(value, row) {
          return row.tag === value;
        },
        filterHandler(value, row, column) {
          const property = column['property'];
          return row[property] === value;
        },
        async onClick(tag,index,row){
          console.log(row)
            if (tag==='FORBIDDEN'){
              const result=await setUserState(row.stuno,'FORBIDDEN')
              row.status='NORMAL'
              console.log(row.status)
            }else {
              console.log('aa')
              const result=await setUserState(row.stuno,'FORBIDDEN')
              row.status='FORBIDDEN'
              console.log(row.status)
            }
        }
      }
    }
</script>

<style scoped>
  .el-tag:hover{
    cursor: pointer;
  }
</style>
