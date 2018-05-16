<template>
    <div>
        <el-form label-width="100px" width="450px" :model="newUser" :rules="newUser.rules" ref="userForm" size="small">
          <el-form-item label="用户姓名"  prop="UserName">
              <el-input v-model="newUser.UserName" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="用户帐号"  prop="UserCode">
              <el-input v-model="newUser.UserCode" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="密码"  prop="PassWord">
              <el-input v-model="newUser.PassWord" type="password" placeholder=""></el-input>
          </el-form-item>
          <el-form-item label="确认密码"  prop="ConfirmPassword">
              <el-input v-model="newUser.ConfirmPassword" type="password" placeholder=""></el-input>
          </el-form-item>
        </el-form>
        <el-footer>
              <el-button type="primary" size="small" @click="save('userForm')">保存</el-button>
              <el-button type="info" size="small" @click="cancel('userForm')">取消</el-button>
          </el-footer>
    </div>
</template>

<script>
export default {
  name: "newUserDialog",
  data() {
    var validPass=(rule,value,callback)=>{
      if(value===""){
        callback(new Error('请输入密码'))
      }else if(value!==this.newUser.PassWord){
        callback(new Error('两次输入密码不一致'))
      }else{
        callback()
      }
    }
    return {
      newUser: {
        UserName: "",
        UserCode: "",
        PassWord: "",
        ConfirmPassword: "",
        rules: {
          UserName: [{ required: true, message: "用户姓名不能为空", trigger: "blur" }],
          UserCode: [{ required: true, message: "用户帐号不能为空", trigger: "blur" }],
          PassWord: [
            { min: 6, max: 12, message: "密码长度最少6位最长12位", trigger: "change" }
          ],
          ConfirmPassword: [{validator:validPass,trigger:'change'}]
        }
      }
    };
  },
  methods: {
    save(formName){
      this.$refs[formName].validate(valid=>{
        if(valid){
          var model={
            UserCode:this.newUser.UserCode,
            UserName:this.newUser.UserName,
            PassWord:this.newUser.PassWord
          }
          this.$axios({
            url:'/api/Usermanage/put',
            data:this.$qs.stringify(model),
            method:'POST',
          }).then((response)=>{
            if(response.data.Status==='success'){
              this.$emit('save')
              this.$message({type:response.data.Status,message:'保存成功'})
            }else{
              this.$message.error(response.data.Data)
            }
          }).catch((response)=>{
            this.$message.error(response.message)
          })
        }else{
          return
        }
      })
    },
    cancel(formName){
      this.$refs[formName].resetFields()
      this.$emit('cancel')
    },
    
  },
  mounted() {},
  created() {}
};
</script>

<style scoped>
  .el-footer{
    text-align: center;
    width: 80%;
    margin-left:auto;
    margin-right: auto;
  }
</style>