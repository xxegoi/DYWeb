<template>
    <div id="login">
      <h3>系统登录</h3>
        <el-form v-loading="loading" :model="loginUser" :rules="rules" ref='loginForm'>
          <el-form-item label="" prop="userName">
              <el-input v-model="loginUser.userName" size="small" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="passWord" label="">
              <el-input v-model="loginUser.passWord" type="password" size="small" placeholder="密码"></el-input>
          </el-form-item>
          <el-form-item label="" align="center">
              <el-button type="primary" size="small" @click.native="login('loginForm')">登录</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      loginUser: {
        userName: "",
        passWord: ""
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        passWord: [
          {
            min: 2,
            max: 12,
            message: "密码长度为2-12个字符",
            trigger: "change"
          }
        ]
      },
      loading: false
    };
  },
  methods: {
    login(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          this.loading = true;
          this.$axios({
            method: "post",
            url: "/api/account/login",
            data: this.$qs.stringify({
              UserName: this.loginUser.userName,
              PassWord: this.loginUser.passWord
            })
          })
            .then(response => {
              this.loading = false;
              if (response.data.Status == "success") {
                sessionStorage.setItem("token", response.data.Data);
                this.$router.push({ name: "Admin" });
              } else {
                this.$message.error(response.data.Data);
              }
            })
            .catch(response => {
              this.loading = false;
            });
        } else {
          this.$message.error("用户名和密码验证不通过");
        }
      });
    },
  }
};
</script>

<style scoped>
#login {
  margin-top: 50px;
  width: 320px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 0.5rem;
  padding: 10px 10px;
  background-color: #999;
  text-align: center;
}
</style>