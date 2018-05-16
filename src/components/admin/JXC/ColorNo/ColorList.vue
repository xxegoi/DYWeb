<template>
    <div>
        <el-row  id="query">
            <el-row :gutter="5">
                <el-col :span="7.5">
              <el-date-picker value-format="yyyy-MM-dd" size="small" v-model="condition.daterange" range-separator="至" type="daterange"
              start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-col>
            <el-col :span="4">
              <el-input size="small" clearable  v-model="condition.ItemNo" placeholder="布类编码"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input size="small" clearable v-model="condition.ColorNo" placeholder="色号"></el-input>
            </el-col>
            <el-col :span="4">
              <el-input v-model="condition.Customer" clearable  size="small" placeholder="客户名称"></el-input>
            </el-col>
            <el-col :span="4">
              <el-select size="small" v-model="condition.ColorSeries" placeholder="色系">
                <el-option  v-for="item in colorSeries" :key="item.fid"></el-option>
              </el-select>
            </el-col>
            </el-row>
            <el-row>
                <el-button @click="_loadData" type="primary" size="small">
                    <i class="el-icon-search"></i>
                    <span>查询</span>
                </el-button>
            </el-row>
        </el-row>
        <el-row>
            <el-table border :height="600" v-loading="loading" size="small" :data="colorNoList">
              <el-table-column label="单据编号" prop="colorNo.FBillNo"></el-table-column>
              <el-table-column show-overflow-tooltip label="布类编码" prop="ItemNumber"></el-table-column>
              <el-table-column label="纱胚" prop="ShaPiName"></el-table-column>
              <el-table-column label="色号类别" prop="ColorTypeName"></el-table-column>
              <el-table-column label="颜色" prop="colorNo.FColorName"></el-table-column>
              <el-table-column label="色系" prop="ColorSeriesName"></el-table-column>
              <el-table-column label="客户" prop="CustomerName"></el-table-column>
              <el-table-column label="制单人" prop="BillerName"></el-table-column>
              <el-table-column label="审核人" prop="CheckerName"></el-table-column>
              <el-table-column label="日期" :formatter="dateFormatter" prop="colorNo.FDate"></el-table-column>
              <el-table-column label="色号" prop="colorNo.FColorNo"></el-table-column>
              <el-table-column label="浓度" prop="colorNo.FChroma"></el-table-column>
              <el-table-column :min-width="100" label="色号(客户)" prop="colorNo.FColorNoForCust"></el-table-column>
              <el-table-column label="加工类别" prop="colorNo.FProType"></el-table-column>
              <el-table-column label="操作" fixed="right">
                  <template slot-scope="scope">
                      <el-button type="text" size="small" @click="showDetail(scope.row)">查看</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <el-pagination :total="condition.total" :current-page="condition.page" :page-size="condition.size" 
            @current-change="pageChange" @size-change="sizeChange" layout="sizes,pager,prev,next,total,jumper"></el-pagination>
        </el-row>
        <el-dialog title="色号" center :fullscreen="true"  :visible.sync="detailVisible">
            <ColorDetail :colorNo.sync="currentColorNo"/>
        </el-dialog>
    </div>
</template>

<script>
import ColorDetail from './ColorDetail.vue'
export default {
  name: "ColorNo",
  data() {
    return {
      condition: {
        daterange: [],
        billNo:"",
        itemNo:"",
        orderNo:"",
        Customer:"",
        ColorNo: "",
        ColorSeries: "",
        total:0,
        page:1,
        size:10,
      },
      loading:false,
      colorNoList: [],
      colorSeries: [],
      detailVisible:false,
      currentColorNo:{}
    };
  },
  methods:{
      dateFormatter(row, column, cellvalue) {
      return new Date(cellvalue).toLocaleDateString();
      },
      pageChange(val){
          this.condition.page=val
          this._loadData()
      },
      showDetail(colorNo){
          this.currentColorNo=colorNo
          this.detailVisible=true
      },
      sizeChange(val){
          this.condition.size=val
          this._loadData()
      },
      _loadData(){
          this.loading=true;
          this.$axios({
              url:'/api/ColorNo/GetList',
              params:{query:this.condition}
          }).then(response=>{
              this.colorNoList=response.data.Data.tableData
              this.condition.total=response.data.Data.total
              this.condition.page=response.data.Data.page
              this.condition.size=response.data.Data.size
              this.loading=false;
          }).catch(response=>{
              console.log(response.message)
              this.loading=false
          })
      }
  },
  mounted(){
      this._loadData()
  },
  components:{
      ColorDetail
  }
};
</script>

<style scoped>
#query {
  border-bottom: 1px solid #999;
}
.el-row {
  margin-bottom: 5px;
}
</style>