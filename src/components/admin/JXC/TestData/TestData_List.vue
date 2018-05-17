<template>
    <div>
        <el-row id="Query" >
            <el-col :span="6.5">
            <el-date-picker v-model="daterange" size="small" value-format="yyyy-MM-dd" type="daterange" range-separator="至" 
            start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col >
            <el-col :span="3">
              <el-input size="small" clearable v-model="fgh" placeholder="缸号"></el-input>
            </el-col>
            <el-col :span="1">
                <el-button type="primary" size="small" @click="Query">查询</el-button>
            </el-col>
            <el-col :span="1">
                <el-button type="success" size="small" @click="Export">导出</el-button>
            </el-col>
        </el-row>
        <el-row v-loading="loading">
            <el-table  size="small" :data="listData" max-height="600">
                <el-table-column label="完成日期" :min-width="120" prop="FinishDate"></el-table-column>
                <el-table-column label="缸号" :min-width="120" prop="lot"></el-table-column>
                <el-table-column label="客户" prop="kf"></el-table-column>
                <el-table-column label="布种" :min-width="250" prop="BN"></el-table-column>
                <el-table-column label="颜色" :min-width="150" prop="CN"></el-table-column>
                <el-table-column label="顶破力" prop="bur"></el-table-column>
                <el-table-column label="成品直缩" prop="tfl"></el-table-column>
                <el-table-column label="成品横缩" prop="tfw"></el-table-column>
                <el-table-column label="成品扭度" prop="fn"></el-table-column>
                <el-table-column label="成品幅宽" :min-width="150" prop="l"></el-table-column>
                <el-table-column label="成品克重" :min-width="150" prop="g"></el-table-column>
                <el-table-column label="要求幅宽" :min-width="150" prop="pl"></el-table-column>
                <el-table-column label="要求克重" :min-width="150" prop="pg"></el-table-column>
                <el-table-column label="备注" prop="sm"></el-table-column>
                <el-table-column label="测试编码" :min-width="150" prop="Tno"></el-table-column>
                <el-table-column label="要求直缩" prop="fl"></el-table-column>
                <el-table-column label="要求横缩" prop="fw"></el-table-column>
                <el-table-column label="要求扭度" prop="n"></el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[100, 500, 1000]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
    </el-pagination>
        </el-row>
    </div>
</template>

<script>
export default {
  name: "TestData",
  data() {
    return {
      daterange: [],
      page: 1,
      size: 100,
      listData: [],
      total: 0,
      loading: false,
      fgh:''
    };
  },
  methods: {
    _LoadData() {
      this.loading = true;
      this.$axios
        .post(
          "/api/testdata/query",
          this.$qs.stringify({
            begindate: this.daterange?this.daterange[0]:null,
            enddate: this.daterange?this.daterange[1]:null,
            page: this.page,
            size: this.size,
            fgh:this.fgh
          })
        )
        .then(res => {
          this.listData = res.data.Data.list;
          this.total = res.data.Data.total[0];
          this.loading = false;
        })
        .catch(res => {
          console.log(res);
        });
    },
    Query() {
      this._LoadData();
    },
    handleSizeChange(size) {
      this.size = size;
      this._LoadData();
    },
    handleCurrentChange(page) {
      this.page = page;
      this._LoadData();
    },
    Export() {
      this.loading = true;
      this.$axios({
        url: "/api/testdata/export",
        data: this.$qs.stringify({
          begindate: this.daterange[0],
          enddate: this.daterange[1]
        }),
        responseType: "blob",
        method:'post'
      })
        .then(res => {
          this.loading=false;
          var blob = new Blob([res.data], {
            type: "application/vnd.ms-excel;charset=utf-8"
          });
          var downloadElement = document.createElement("a");
          var href = window.URL.createObjectURL(blob); //创建下载的链接
          downloadElement.href = href;
          downloadElement.download = this.daterange[0]+"至"+this.daterange[1]+".xls"; //下载后文件名
          document.body.appendChild(downloadElement);
          downloadElement.click(); //点击下载
          document.body.removeChild(downloadElement); //下载完成移除元素
          window.URL.revokeObjectURL(href); //释放掉blob对象
        })
        .catch(res => {});
    }
  }
};
</script>

<style scoped>
.el-col {
  line-height: 32px;
  height: 32px;
  margin-bottom: 10px;
  margin-right: 10px;
}
#Query {
  padding-bottom: 5px;
  border-bottom: 1px solid #999;
}

#test{
  
}
</style>