<template>
    <div>
        <el-row id="top">
          <el-col :span="2">
            <el-button type="primary" @click="showDialog" size="small">新用户</el-button>
          </el-col>
          <el-col :span="4">
            <el-input size="small" v-model="searchKey" placeholder="用户姓名或帐号">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-col>
        </el-row>
        <el-row>
            <el-table :data='Users' v-loading="loading" max-height="420">
              <el-table-column label="用户姓名" align="center" prop="FUserName"></el-table-column>
              <el-table-column label="用户账号" align="center" prop="FUserCode"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="small" type="danger" @click.native="deleteUser(scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>            
        </el-row>
        <el-pagination :total="total" :current-page="currentPage" :page-size="pageSize" 
        @current-change="currentPageChange" layout="prev, pager, next, jumper"></el-pagination>
        <el-dialog width="400px" :close-on-click-modal="false" title="新建用户" :visible.sync="newUserVisible" center  >
          <NewUserDialog @cancel="dialogClose" @save="dialogClose"/>
        </el-dialog>
    </div>    
</template>

<script>
import NewUserDialog from "./NewUserDialog.vue";

export default {
  data() {
    return {
      Users: [],
      total: 1,
      currentPage: 1,
      pageSize: 10,
      newUserVisible: false,
      loading: false,
      searchKey: ""
    };
  },
  methods: {
    search() {
      if (this.searchKey === "") {
        this.$message.error("请输入用户姓名或帐号进行搜索");
      }
      this.loading = true;
      this.$axios({
        url: "/api/usermanage/getlist",
        params: {
          query: this.searchKey
        }
      })
        .then(response => {
          this.loading = false;
          if (response.data.Status === "success") {
            this.Users = response.data.Data.Users;
            this.total = response.data.Data.total;
          } else {
            this.$message.error(response.data.Data);
          }
          this.loading = false;
        })
        .catch(response => {
          this.$message.error(response.message);
        });
    },
    _LoadUsers() {
      this.loading = true;
      this.$axios({
        url: "/api/usermanage/getlist",
        method: "get",
        params: {
          query: this.searchKey,
          page: this.currentPage,
          size: this.pageSize
        }
      })
        .then(Response => {
          if (Response.data.Data) {
            this.total = Response.data.Data.total;
            this.Users = Response.data.Data.Users;
          }
          setTimeout(() => {
            this.loading = false;
          }, 500);
        })
        .catch(Response => {
          console.log(Response.data.Message);
        });
    },
    currentPageChange(val) {
      this.currentPage = val;
      this._LoadUsers();
    },
    pageSizeChange(val) {
      this.pageSize = val;
      this._LoadUsers();
    },
    dialogClose() {
      if (this.newUserVisible) {
        this._LoadUsers();
        this.newUserVisible = false;
      }
    },

    showDialog() {
      this.newUserVisible = true;
    },

    deleteUser(user) {
      var message =
        "确定要删除?\r\n姓名：" +
        user.FUserName +
        "\r\n" +
        "帐号：" +
        user.FUserCode +
        "\r\n";
      this.$confirm(message, "确认", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios({
            url: "/api/usermanage/delete",
            params: { userCode: user.FUserCode },
            method: "get"
          })
            .then(response => {
              if (response.data.Status === "success") {
                this.$message({ type: "success", message: "删除成功" });
                this._LoadUsers();
              } else {
                this.$message.error(response.data.Data);
              }
            })
            .catch(response => {
              this.$message.error(response.message);
            });
        })
        .catch(() => {});
    }
  },
  components: {
    NewUserDialog
  },
  mounted() {
    this._LoadUsers();
  }
};
</script>

<style scoped>
#top {
  border-bottom: 1px solid #999;
  padding: 5px;
}
</style>