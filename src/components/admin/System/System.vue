<template>
    <div>
        <el-button type="primary" size="small" @click="ReflashAPI">刷新API</el-button>
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{
            ReflashAPI(){
                this.$axios.get('/api/controlleraction/updateapi').then(res=>{
                    if(res.data.Status==='success'){
                        this.$message({message:'刷新成功',type:res.data.Status})
                    }
                }).catch(res=>{
                    console.log(res);
                })
            }
        }
    }
</script>

<style scoped>

</style>