<template>
    <div>
        <el-row id="top">
            <el-col :span="2">
                <el-button type="primary" size="small" @click="showNewRoleDialog=true">新角色</el-button>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" size="small" @click="deleteRoles">删除</el-button>
            </el-col>
            <el-col></el-col>
        </el-row>
        <el-row>
            <el-table highlight-current-row :data="Roles" @current-change="selectRoleChange">
              <el-table-column label="ID" prop="Id"></el-table-column>
              <el-table-column label="角色名称" prop="Name"></el-table-column>
              <el-table-column label="角色描述" prop="Description"></el-table-column>
              <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                      <el-button type="primary" size="small" @click="showMemberDialog(scope.row)">成员</el-button>
                      <el-button type="success" size="small" @click="showPermissionDialog(scope.row.Id)">权限</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <el-pagination :current-page="currentPage" :page-size="pageSize" :total="total"
            @current-change="currentChange" layout="prev, pager, next, jumper"></el-pagination>
        </el-row>
        <el-dialog width="400px" :close-on-click-modal="false" title="新角色" 
        center :visible.sync="showNewRoleDialog">
          <NewRoleDialog @dialogClose="closeNewRoleDialog" @save="closeNewRoleDialog"/>
        </el-dialog>
        <el-dialog :title="selectRole.Name" center :close-on-click-modal="false" :visible.sync="memberDialogVisible">
            <RoleMembers :users.sync="Users" @save="memberDialogVisible=false" :members.sync="rolemembers" :role.sync="selectRole" @cancel="memberDialogVisible=false"/>
        </el-dialog>
        <el-dialog title="角色权限修改" center :visible.sync="permissionVisible">
          <Permission :permission="permissions" :roleId="roleId"></Permission>
        </el-dialog>
    </div>
</template> 

<script>
import NewRoleDialog from "./NewRoleDialog.vue";
import RoleMembers from "./RoleMembers.vue";
import Permission from "./PermissionDialog.vue";
export default {
  data() {
    return {
      Roles: [],
      Users: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      showNewRoleDialog: false,
      memberDialogVisible: false,
      permissionVisible: false,
      loading: false,
      searchKey: "",
      selectRole: {},
      rolemembers: [],
      permissions: [],
      roleId: ""
    };
  },
  methods: {
    _LoadRoles() {
      this.loading = true;
      this.$axios({
        url: "/api/RoleManage/getlist",
        params: { Page: this.currentPage, Size: this.pageSize }
      })
        .then(response => {
          if (response.data.Status === "success") {
            this.Roles = response.data.Data.roles;
            this.total=response.data.Data.total;
          } else {
            this.$message.error(response.data.Data);
          }
        })
        .catch(response => {
          this.$message.error(response.message);
        });
      this.$axios
        .get("/api/UserManage/getlist", { params: { isAll: true } })
        .then(res => {
          if (res.data.Status === "success") {
            this.Users = res.data.Data;
            this.Users.forEach(item => {
              item.disable = false;
            });
          } else {
            this.$message.error(res.data.Data);
          }
        });
    },
    showPermissionDialog(roleId) {
      this.permissions = [];
      this.$axios
        .get("/api/Permission/GetList", {
          params: { roleId: roleId }
        })
        .then(res => {
          this.permissions = res.data.Data;
          this.roleId = roleId;
          this.permissionVisible = true;
        })
        .catch(res => {
          this.$message.error(res.data.Messaage);
        });
    },
    closeNewRoleDialog() {
      this._LoadRoles();
      this.showNewRoleDialog = false;
    },
    deleteRoles() {
      if (!this.selectRole.Id) {
        return;
      }
      var message = "确定删除 " + this.selectRole.Name + " 吗？";
      this.$confirm(message, "删除确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/api/RoleManage/remove",
            params: { Id: this.selectRole.Id },
            method: "get"
          })
            .then(response => {
              if (response.data.Status === "success") {
                this.selectRole = {};
                var i = this.Roles.indexOf(this.selectRole);
                this.Roles.splice(i, 1);
                this.$message({ type: "success", message: "删除成功" });
              } else {
                this.$message.error(response.data.Data);
              }
            })
            .catch(response => {
              this.$message.error(response.response.data.Message);
            });
        })
        .catch(() => {});
    },
    selectRoleChange(currentRow, oldCurrentRow) {
      this.selectRole = currentRow;
    },
    currentChange(val) {
      this.currentPage = val;
      this._LoadRoles();
    },
    showMemberDialog(role) {
      this.$axios({
        url: "/api/RoleManage/getmembers",
        params: { Id: role.Id }
      })
        .then(response => {
          if (response.data.Status === "success") {
            this.rolemembers = response.data.Data;
            this.memberDialogVisible = true;
          } else {
            this.$message.error(response.data.Data);
          }
        })
        .catch(response => {
          this.$message.error(response.response.data.Message);
        });
    }
  },
  mounted() {
    this._LoadRoles();
  },
  components: {
    NewRoleDialog,
    RoleMembers,
    Permission
  }
};
</script>

<style scoped>
#top {
  border-bottom: 1px solid #999;
  padding: 10px 0;
}
</style>