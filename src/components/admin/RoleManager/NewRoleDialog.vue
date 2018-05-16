<template>
    <div>
        <el-form :model="newRole" ref="roleForm" :rules="rules">
            <el-form-item label="" prop="Name">
                <el-input v-model="newRole.Name" size="small" placeholder="角色名称"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-input v-model="newRole.Description" size="small" placeholder="角色描述"></el-input>
            </el-form-item>
        </el-form>
        <el-footer>
            <el-button size="small" type="primary" @click="save('roleForm')">保存</el-button>
            <el-button type="info" size="small" @click="cancel('roleForm')">取消</el-button>
        </el-footer>
    </div>
    
</template>

<script>
export default {
  name: "NewRoleDialog",
  data() {
    return {
      newRole: {
        Name: "",
        Description: ""
      },
      rules: {
        Name: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
      }
    };
  },
  methods: {
    cancel(roleForm) {
      this.$refs[roleForm].resetFields();
      this.$emit("dialogClose");
    },
    save(roleForm) {
      this.$refs[roleForm].validate(valid => {
        if (valid) {
          var model = this.$qs.stringify({
            Name: this.newRole.Name,
            Description: this.newRole.Description
          });
          this.$axios.post("/api/RoleManage/put", model).then(response => {
            if (response.data.Status === "success") {
              this.$refs[roleForm].resetFields();
              this.$emit("save");
            } else {
              this.$message.error(response.data.Data);
            }
          });
        } else {
          return;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-footer {
  text-align: center;
}
</style>