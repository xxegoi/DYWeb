<template>
    <div>
        <el-row id="Query">
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-input v-model="condition.fgh" clearable  size="small" placeholder="缸号"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" size="small" @click="search"><i class="el-icon-search"></i> 查询</el-button>
                </el-col>
            </el-row>
            <el-row>
                
            </el-row>
        </el-row>
        <el-row id="List">
            <el-table :data="logs" size="small">
                <el-table-column label="时间" :formatter="dateFormatter"  prop="LogTime"></el-table-column>
                <el-table-column label="修改前" prop="Before"></el-table-column>
                <el-table-column label="修改后" prop="After"></el-table-column>
                <el-table-column label="用户" prop="User"></el-table-column>
            </el-table>
        </el-row>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                condition:{
                    fgh:''
                },
                logs:[],
                loading:false
            }
        },
        methods:{
            search(){
                if(this.condition.fgh.length==0){
                    this.$message({
                        type:'warning',
                        message:'请输入缸号查询'
                    });
                    return;
                }
                this.loading=true;
                this.$axios.get("/api/WorkFlow/getlog?fgh="+this.condition.fgh).then(res=>{
                    this.logs=res.data.Data;
                    this.loading=false;
                }).catch(err=>{
                    console.log(err);
                })
            },
            dateFormatter(row,col,cell){
                return new Date(cell).toLocaleString()
            }
        }
    }
</script>

<style scoped>
#Query {
  padding-bottom: 5px;
  border-bottom: 1px solid #999;
}
.el-col {
  line-height: 32px;
  height: 32px;
  margin-bottom: 10px;
}
</style>