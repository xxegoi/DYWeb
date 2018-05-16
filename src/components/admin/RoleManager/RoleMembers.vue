<template>
    <div>
        <el-transfer :titles="titles" :props="{key:'FUserCode',label:'FUserName'}" filterable v-model="members"  filter-placeholder="输入用户姓名搜索"
        :filter-method="filterUser" :data="users"></el-transfer>
        <el-footer>
            <el-button type="primary" size="small" @click="save">保存</el-button>
            <el-button type="info" size="small" @click="$emit('cancel')">取消</el-button>
        </el-footer>
    </div>
</template>

<script>
export default {
  name: "RoleMembers",
  data() {
    return {
      titles: ["用户", "成员"]
    };
  },
  methods: {
    filterUser(query, item) {
      return item.FUserName.indexOf(query) > -1;
    },
    save() {
      this.$axios({
        url: "/api/RoleManage/update",
        data: this.$qs.stringify({
          Id: this.role.Id,
          Name:this.role.Name,
          Description:this.role.Description,
          Members:this.members
        }),
        method:'post'
      }).then(response=>{
          if(response.data.Status==='success'){
              this.$message({type:'success',message:'保存成功'})
              this.$emit('save')
          }else{
              this.$message.error(response.data.Data)
          }
      }).catch(response=>{
          this.$message.error(response.response.data.Message)
      })
    }
  },
  updated() {
  },
  props: {
    role: {
      type: Object,
      required: true
    },
    users: {
      type: Array,
      required: true
    },
    members: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.el-transfer {
  width: 500px;
  margin-left: auto;
  margin-right: auto;
}
footer {
  margin-top: 20px;
  text-align: center;
}
</style>