<template>
    <div>
        <el-table :data="permission" size="small" max-height="400">
            <el-table-column label="模块" align="center" prop="ControllerName"></el-table-column>
            <el-table-column label="功能" align="center" prop="ActionName"></el-table-column>
            <el-table-column label="允许/禁止" align="center">
                <template slot-scope="scope">
                    <el-checkbox v-model="scope.row.IsAllowed"></el-checkbox>
                </template>
            </el-table-column>
        </el-table>
        <div id="foot">
            <el-button size="small" type="primary" @click="onSave">保存</el-button>
            <el-button size="small" type="info">关闭</el-button>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    permission: {
      type: Array,
      required: true
    },
    roleId:{
        type:Number,
        required:true
    }
  },
  methods: {
    onSave() {
      this.$confirm("确定修改并保存吗？", "修改确认", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log('confirm')
          this.SavePermission();
        })
        .catch(() => {});
    },
    SavePermission() {
      var data=this.$qs.stringify({
          roleId:this.roleId,
          permission:this.permission
      })
      this.$axios.post('/api/Permission/Update',data).then(res=>{
          if(res.data.Status=='success'){
              this.$message({
                  type:'success',
                  message:'修改成功'
              })
          }else{
              this.$message.error(res.data.Data);
          }
      }).catch(res=>{
          this.$message.error(res.data.Message)
      })
    }
  }
};
</script>

<style scoped>
#foot {
  margin-top: 10px;
  text-align: center;
}
</style>