<template>
    <div >
        <el-row id="Query" >
            <el-row :gutter="5">
                <el-col :span="7.5">
                    <el-date-picker align="center" 
                    v-model="condition.daterange" 
                    type="daterange" 
                    range-separator="至"
                    start-placeholder="开始日期" end-placeholder="结束日期" 
                    size="small" value-format="yyyy-MM-dd"></el-date-picker>
                </el-col>
                
                <el-col :span="5">
                    <el-input v-model="condition.billNo" clearable size="small" placeholder="单据编号"></el-input>
                </el-col>
                <el-col :span="5">
                    <el-input v-model="condition.fgh" clearable  size="small" placeholder="缸号"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-input v-model="condition.orderNo" clearable  size="small" placeholder="订单号"></el-input>
                </el-col>
                <el-col :span="4">
                    <el-select clearable  :remote="true" filterable :remote-method="queryCustomers" size="small" v-model="condition.cstCode" placeholder="客户">
                      <el-option v-for="c in selectCustomers" :key="c.fid" :label="c.name" :value="c.fid"></el-option>
                    </el-select>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="condition.customerNo" size="small" clearable  placeholder="客户单号"></el-input>
                </el-col>
                
                <el-col :span="5">
                    <el-input v-model="condition.fundNo" size="small" clearable  placeholder="款号"></el-input>
                </el-col>
                
                <el-col :span="24">
                    <el-autocomplete v-model="condition.itemNo" size="small" :fetch-suggestions="queryItems" placeholder="布种"></el-autocomplete>
                </el-col>
            </el-row>
            <el-row>
                <el-button type="primary" size="small" @click="_loadTableData">
                  <i class="el-icon-search"></i>
                  查询
                  </el-button>

                  <el-button type="primary" size="small" @click="_printPreview">
                  <i class="el-icon-view"></i>
                  打印预览
                  </el-button>

            </el-row>
        </el-row>
        <el-row id="table">
            <el-table border :data="yzks" v-loading="loading" height="600" size="small" ref="multipleTable" @selection-change="handleSelectionChange">
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column align="center" label="客户名称" prop="customerName"></el-table-column>
              <el-table-column align="center" label="布类名称" show-overflow-tooltip  prop="itemName"></el-table-column>
              <el-table-column align="center" label="规格型号" show-overflow-tooltip  prop="itemModel"></el-table-column>
              <el-table-column :min-width="100" label="缸号" prop="gh"></el-table-column>
              <el-table-column align="center" label="开单匹数" prop="qty"></el-table-column>
              <el-table-column :min-width="90" label="原缸总坯重"  prop="sumPZ"></el-table-column>
              <el-table-column align="center" label="制单人" prop="biller" ></el-table-column>
              <el-table-column align="center" label="制单日期" :formatter="dateFormatter" prop="date"></el-table-column>
              <el-table-column align="center" label="审核人" prop="checker"></el-table-column>
              <el-table-column align="center" label="收费类型" show-overflow-tooltip  prop="sflx"></el-table-column>
              <el-table-column align="center" label="备注" show-overflow-tooltip prop="note"></el-table-column>
              <el-table-column show-overflow-tooltip  align="center" label="送货地址" prop="addr"></el-table-column>
              <el-table-column :min-width="120" label="单据编号" prop="billNo"></el-table-column>
              <el-table-column :min-width="220" label="布类编码" prop="itemNo"></el-table-column>
              <el-table-column align="center" label="客户编号" prop="organizationNumber"></el-table-column>
              <el-table-column align="center" label="品牌属性" prop="ppsx"></el-table-column>
              <el-table-column align="center" label="订单号" prop="orderNo"></el-table-column>
              <el-table-column align="center" label="客户单号" prop="customerNo"></el-table-column>
              <el-table-column align="center" label="重量" fixed="right" prop="weight"></el-table-column>
              <el-table-column :min-width="120" align="center" label="操作" fixed="right">
                  <template slot-scope="scope">
                      <el-button type="text" size="small" @click="showYZKDetail(scope.row)">查看</el-button>
                      <el-button type="text" size="small" @click="showGYLC(scope.row.gh)">工艺路线</el-button>
                  </template>
              </el-table-column>
            </el-table>
            <el-pagination :total="total" :current-page="condition.page" @size-change="sizeChange" 
            :page-size="condition.size" @current-change="pageChange" 
            layout="sizes, prev, pager, next,total,jumper"></el-pagination>
        </el-row>
        <el-dialog  title="运转卡详细信息" :fullscreen="true" :visible.sync="yzkDetailVisible" center >
            <YzkDetail :yzk.sync="selectedYzk" />
        </el-dialog>

        <el-dialog  title="工艺路线" :fullscreen="false" width="70%" :visible.sync="GYLCVisible" center >
            <GYLC :fgh.sync="selectedGH" :workflow="workflow" :gxhb="gxhb" :activeIndex="activeIndex" />
        </el-dialog>

        <el-dialog :fullscreen="true"  :visible.sync="yzkPrintVisible" center >
            <YzkPrintDetal :printList.sync="multipleSelection" />
        </el-dialog>

    </div>
</template>

<script>
import YzkDetail from "./YzkDetail.vue";
import GYLC from "../GYLC/View.vue";
import YzkPrintDetal from "./YzkPrintDetail.vue";//20180517k

export default {
  name: "YZK",
  data() {
    return {
      condition: {
        daterange: [],
        multipleSelection: [],//20180517多行选择存放处
        billNo: "",
        fgh: "",
        orderNo: "",
        customerNo: "",
        fundNo: "",
        itemNo: "",
        cstCode: "",
        page: 1,
        size: 10
      },
      yzks: [],
      total: 0,
      yzkDetailVisible: false,
      GYLCVisible: false,
      yzkPrintVisible : false,//20180517
      selectedYzk: {
        xm: [],
        gy: [],
        loading: false
      },
      Items: [],
      Customers: [],
      selectItems: [],
      selectCustomers: [],
      loading: false,
      selectedGH: "",
      workflow:[],
      gxhb:[],
      activeIndex:-1
    };
  },
  methods: {
    _loadTableData() {
      this.loading = true;
      if (this.condition.itemNo) {
        this.condition.itemNo = this.condition.itemNo.split("\t")[1];
      }
      this.$axios({
        url: "/api/Yzk/Getlist",
        params: { query: this.condition }
      })
        .then(response => {
          this.yzks = response.data.Data.tableData;
          this.condition.page = response.data.Data.page;
          this.condition.size = response.data.Data.size;
          this.total = response.data.Data.total;
          this.loading = false;
        })
        .catch(response => {
          console.log(response.message);
          this.loading = false;
        });
    },
    //20180517
    handleSelectionChange(val) {

        this.multipleSelection = val;
    },
    //20180517
    _printPreview()
    {
        if(this.multipleSelection.length==0)
        {
          this.$message.error("请先选择打印内容！");
        }
        else{
           this.yzkPrintVisible=true;
        }

    },
    pageChange(val) {
      this.condition.page = val;
      this._loadTableData();
    },
    sizeChange(val) {
      this.condition.size = val;
      this._loadTableData();
    },

    dateFormatter(row, column, cellvalue) {
      return new Date(cellvalue).toLocaleDateString();
    },
    showYZKDetail(yzk) {
      this.selectedYzk = yzk;
      this.getYzkEntries(yzk.gh);
    },
    getYzkEntries(fgh) {
      this.$axios({
        url: "/api/Yzk/GetEntries",
        params: { fgh: fgh }
      })
        .then(response => {
          if (response.data.Status === "success") {
            this.selectedYzk.xm = response.data.Data.xm;
            this.selectedYzk.gy = response.data.Data.gy;
          } else {
            this.$message.error(response.data.Data);
          }
        })
        .catch(response => {
          this.$message.error("细码，工艺信息获取失败");
        });
      this.yzkDetailVisible = true;
    },
    getItems() {
      this.$axios({
        url: "/api/ICItem/GetALLItems"
      })
        .then(response => {
          this.Items = response.data.Data;
        })
        .catch(response => {
          console.log(response.message);
        });
    },
    getCustomers() {
      this.$axios({
        url: "/api/Organization/GetAllCustomers"
      })
        .then(response => {
          this.Customers = response.data.Data;
        })
        .catch(response => {
          console.log(response.message);
        });
    },
    queryCustomers(query) {
      if (query.toString().length >= 2) {
        this.selectCustomers = this.selectorFilter(query, this.Customers);
        return;
      }
      this.selectCustomers = this.Customers;
    },
    queryItems(query, cb) {
      if (query) {
        if (query.toString().length >= 5) {
          this.$axios({
            url: "/api/ICItem/GetItems",
            params: { query: query }
          })
            .then(response => {
              cb(response.data.Data);
            })
            .catch(response => {
              console.log(response.message);
            });
        }
      }
    },
    selectorFilter(query, arr) {
      var pattern = new RegExp(query, "i");
      return arr.filter(p => {
        return pattern.test(p.fid) || pattern.test(p.name);
      });
    },
    showGYLC(fgh) {
      this.getWorkFlow(fgh)
      
    },
    getWorkFlow(fgh) {
      this.$axios({
        url: "/api/WorkFlow/GetWorkFlow",
        params: { fgh:fgh }
      })
        .then(res => {
          this.workflow = res.data.Data.WorkFlow;
          this.gxhb = res.data.Data.GXHB;
          for(var i=0;i<this.gxhb.length;i++){
            for(var j=0;j<this.workflow.length;j++){
              if(this.gxhb[i].WPID==this.workflow[j].WPID&&this.gxhb[i].FIndex==this.workflow[j].FIndex){
                this.activeIndex=j+1;
              }else{
              }
            }
          }
          this.GYLCVisible = true;
        })
        .catch(res => {
          console.log(res);
          this.$message.error("Faild");
        });
    }
  },
  mounted() {
    this._loadTableData();
    //this.getItems();
    this.getCustomers();
  },
  components: {
    YzkDetail,
    GYLC,
    YzkPrintDetal,
  }
};
</script>

<style scoped>
.el-col {
  line-height: 32px;
  height: 32px;
  margin-bottom: 10px;
}
#Query {
  padding-bottom: 5px;
  border-bottom: 1px solid #999;
}
.el-autocomplete {
  width: 100%;
}
</style>