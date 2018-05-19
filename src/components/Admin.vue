<template>
    <el-container>
        <el-header>
            <el-row id="header">
                <el-col :offset="22" :span="2">
                    <el-button @click="logout" type="text">
                        注销
                    </el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-container id="content">
            <el-aside width="200px">
                <AsideMenu :menuList.sync="menuList"/>
            </el-aside>
            <el-container>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer>
            </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import AsideMenu from "./layout/AsideMenu.vue";
import Header from "./layout/Header.vue";
export default {
  components: {
    AsideMenu,
    Header
  },
  data() {
    return {
      menuList: [
        // {
        //     title:'系统设置',
        //     isSubMenu:true,
        //     subMenu:[
        //         {
        //             title:'用户管理',
        //             path:'/Admin/User'
        //         },
        //         {
        //             title:'角色管理',
        //             path:'/Admin/Role'
        //         }
        //     ]
        // },
        {
          title: "运转卡查询",
          isSubMenu: false,
          path: "/Admin/Yzk"
        },
        {
          title: "色号查询",
          isSubMenu: false,
          path: "/Admin/ColorNo"
        },
        {
          title:'测试数据查询/导出',
          isSubMenu:false,
          path:'/Admin/TestData'
        },
        {
          title: "工艺流程管理",
          isSubMenu: true,
          subMenu: [
            {
              title: "工艺流程修改",
              path: "/Admin/Gylc"
            },
            {
              title: "工艺流程修改日志",
              path: "/Admin/GyLog"
            }
          ]
        }
      ]
    };
  },
  methods: {
    logout() {
      this.$confirm("确认退出系统吗？", "退出", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(() => {
        this.$axios.get("/api/Account/Logout").then(res => {
          sessionStorage.removeItem("token");
          location.href = "/";
        });
      });
    }
  }
};
</script>

<style scoped>
.el-header {
  background-color: rgb(58, 58, 58);
}

#content {
  border-bottom: 1px solid rgb(216, 230, 236);
  height:850px;
}

#content .el-container {
  border-left: 1px solid rgb(216, 230, 236);
}

#header .el-col {
  background-color: #999;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  text-align: center;
  padding-top: 5px;
  margin-top: 5px;
}
.el-button {
  color: white;
}
</style>