<template>
    <div>
            <el-table :data="logs" size="small">
                <el-table-column label="时间" :formatter="dateFormatter"  prop="LogTime"></el-table-column>
                <el-table-column label="修改前" prop="Before"></el-table-column>
                <el-table-column label="修改后" prop="After"></el-table-column>
                <el-table-column label="用户" prop="User"></el-table-column>
            </el-table>
    </div>
</template>

<script>
export default {
  props: {
    logs:{
        type:Array,
        required:true
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    
    dateFormatter(row, col, cell) {
      return new Date(cell).toLocaleString();
    }
  },
};
</script>

<style scoped>

</style>