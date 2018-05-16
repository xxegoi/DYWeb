<template>
    <div id="yzkbody">
        <el-row>
            <el-tabs type="border-card" activate-name="order">
              <el-tab-pane label="运转卡信息">
                  <el-row type="flex" :gutter="5">
                      <el-col :span="4">
                          <FieldItem title="单据编号" :value="yzk.billNo"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="日期" :value="commonDateFormatter(yzk.date)"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="制单人" :value="yzk.biller"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="审核人" :value="yzk.checker"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="审核状态" :value="yzk.checker===''?'未审核':'已审核'"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="缸号" :value="yzk.gh"/>
                      </el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="4">
                          <FieldItem title="规格型号" :value="yzk.itemModel"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="重量" :value="yzk.weight"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="原缸总胚重" :value="yzk.sumPZ"/>
                      </el-col>
                      <el-col id="closed" :span="4">
                          <el-row>
                              <el-col></el-col>
                              <el-col>
                                  <el-checkbox v-model="yzk.closed" :disabled="true" label="关闭" ></el-checkbox>
                              </el-col>
                          </el-row>
                      </el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="8">
                          <FieldItem title="布类编号" :value="yzk.itemNo"/>
                      </el-col>
                      <el-col :span="12">
                          <FieldItem title="布类名称" :value="yzk.itemName"/>
                      </el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="12">
                        <span><b>备注</b></span>
                        <el-input :rows="4" type="textarea" :readonly="true" 
                        v-model="yzk.note" placeholder=""></el-input>
                      </el-col>
                      <el-col :span="12">
                        <span><b>备注(成品打印)</b></span>
                        <el-input :rows="4" type="textarea" :readonly="true" v-model="yzk.noteForCP" 
                        placeholder=""></el-input>
                      </el-col>
                  </el-row>
              </el-tab-pane>
              <el-tab-pane name="order" label="订单信息">
                  <el-row :gutter="5">
                      <el-col :span="4">
                          <FieldItem title="订单编号" :value="yzk.orderNo"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="客户编码" :value="yzk.organizationNumber"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="客户名称" :value="yzk.customerName"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="客户单号" :value="yzk.customerNo"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="交货日期" :value="commonDateFormatter(yzk.deliveryDate)"/>
                      </el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="6">
                          <FieldItem title="收费类型" :value="yzk.sflx"/>
                      </el-col>
                      <el-col :span="6">
                          <FieldItem title="送货地址" :value="yzk.addr"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="款号" :value="yzk.fundNo"/>
                      </el-col>
                      <el-col :span="4">
                          <FieldItem title="开单匹数" :value="yzk.qty" />
                      </el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="10">
                        <span>配布备注</span>
                        <el-input :rows="4" type="textarea" :readonly="true" 
                        v-model="yzk.pbNote" placeholder=""></el-input>
                      </el-col>
                      <el-col :span="10">
                        <span>订单备注</span>
                        <el-input :rows="4" type="textarea" :readonly="true" 
                        v-model="yzk.ddNote" placeholder=""></el-input>
                      </el-col>
                  </el-row>
              </el-tab-pane>
              <el-tab-pane label="工艺要求">
                  <el-row :gutter="5">
                      <el-col :span="8">
                          <FieldItem title="工艺流程" :value="yzk.workFlow"/>
                      </el-col>
                      <el-col :span="8">
                          <FieldItem title="对色光源" :value="yzk.fdd"/>
                      </el-col>
                      <el-col :span="8">
                          <FieldItem title="色对" :value="yzk.fsd"/>
                      </el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="12">
                          <FieldItem title="牢度要求" :value="yzk.fsl"/>
                      </el-col>
                      <el-col :span="12">
                          <FieldItem title="手感要求" :value="yzk.fsg"/>
                      </el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="12">
                          <FieldItem title="成品要求" :value="yzk.dxfk"/>
                      </el-col>
                      <el-col :span="12">
                          <FieldItem title="成品克重" :value="yzk.fkz"/>
                      </el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="6">
                          <FieldItem title="浆边" :value="yzk.fjb"/>
                      </el-col>
                      <el-col :span="6">
                          <FieldItem title="切边" :value="yzk.fqb"/>
                      </el-col>
                      <el-col :span="6"><FieldItem title="加树脂" :value="yzk.fjsz"/></el-col>
                      <el-col :span="6"><FieldItem title="加软油" :value="yzk.fjry"/></el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="8"><FieldItem title="横(%)" :value="yzk.facross"/></el-col>
                      <el-col :span="8"><FieldItem title="直(%)" :value="yzk.fstraight"/></el-col>
                      <el-col :span="8"><FieldItem title="扭度(%)" :value="yzk.ftweak"/></el-col>
                  </el-row>
                  <el-row :gutter="5">
                      <el-col :span="8"><FieldItem title="纸筒" :value="yzk.fzt"/></el-col>
                      <el-col :span="8"><FieldItem title="加重" :value="yzk.fjz"/></el-col>
                      <el-col :span="8"><FieldItem title="胶带" :value="yzk.fjd"/></el-col>
                  </el-row>
              </el-tab-pane>
              <el-tab-pane label="定型工艺">
                  <DXGY :data.sync="dxgy" />
              </el-tab-pane>
              <el-tab-pane label="染色单">
                  <RSD :tableData.sync="rsd" />
              </el-tab-pane>
              <el-tab-pane label="领料单">
                  <LLD :tableData.sync="lld"/>
              </el-tab-pane>
              <el-tab-pane label="染缸出入登记">
                  <RGCR :tableData.sync="rgcr"/>
              </el-tab-pane>
            </el-tabs>
        </el-row>
        <el-row  id="detail">
            <el-tabs type="border-card" tab-position="top">
              <el-tab-pane label="细码">
                  <el-table height="350" show-summary  :data.sync="xm" size="small">
                    <el-table-column label="细码" prop="fxm"></el-table-column>
                    <el-table-column label="胚重" :formatter="numberFormatter" prop="fpz"></el-table-column>
                  </el-table>
              </el-tab-pane>
              <el-tab-pane label="工序">
                  <el-table height="350"  :data.sync="gy" size="small">
                    <el-table-column label="计划生产车间" prop="FDepartment_DSPName"></el-table-column>
                    <el-table-column label="实际生产车间" prop="FSJDepartment_DSPName"></el-table-column>
                    <el-table-column label="当前工序" prop="FCurWorkProcedure_DSPName"></el-table-column>
                    <el-table-column label="生产机台" prop="FSCJT_DSPName"></el-table-column>
                    <el-table-column :min-width="120" align="center" label="接收时间" :formatter="dateFormatter" prop="FJSTime"></el-table-column>
                    <el-table-column :min-width="120" align="center" label="开始时间" :formatter="dateFormatter" prop="FKSTiem"></el-table-column>
                    <el-table-column :min-width="120" align="center" label="结束时间" :formatter="dateFormatter" prop="FEndTiem"></el-table-column>
                    <el-table-column label="下道工序" prop="FXDGX_DSPName"></el-table-column>
                    <el-table-column label="操作人" prop="FOprationer"></el-table-column>
                    <el-table-column  label="是否完成" align="center">
                        <template slot-scope="scope">
                            <i v-if="scope.row.FCheckBox" class="el-icon-success"></i>
                        </template>
                    </el-table-column>
                    <el-table-column :min-width="120" align="center" label="完工时间" :formatter="dateFormatter" prop="FFinishTime"></el-table-column>
                  </el-table>
              </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>

<script>
import FieldItem from "@/components/Common/FieldItem.vue";
import DXGY from "./DXGY.vue";
import RSD from "./RSD.vue";
import LLD from "./LLD.vue";
import RGCR from "./RGCR.vue";
export default {
  name: "YzkDetail",
  data() {
    return {
      gy: [],
      xm: [],
      dxgy: [],
      rsd: [],
      lld: [],
      rgcr: [],
      billNo: ""
    };
  },
  methods: {
    dateFormatter(row, column, cellvalue) {
      if (cellvalue) {
        var reg = new RegExp("[\\d-]+T[\\d:]+");
        return reg
          .exec(cellvalue.toString())
          .toString()
          .replace("T", "  ");
      }
    },
    commonDateFormatter(date) {
      if (date) {
        return new Date(date).toLocaleDateString();
      }
      return "";
    },
    numberFormatter(row, column, cellvalue) {
      if (cellvalue) {
        return this.$numberFormatter(cellvalue);
      }
    },
    getYzkEntries(fgh) {
      this.$axios({
        url: "/api/Yzk/GetEntries",
        params: { fgh: fgh }
      })
        .then(response => {
          if (response.data.Status === "success") {
            this.xm = response.data.Data.xm;
            this.gy = response.data.Data.gy;
            this.dxgy = response.data.Data.dxgy;
            this.rsd = response.data.Data.rsd;
            this.lld = response.data.Data.lld;
            this.rgcr = response.data.Data.rgcr;
          } else {
            this.$message.error(response.data.Data);
          }
        })
        .catch(response => {
          this.$message.error("细码，工艺信息获取失败");
        });
    }
  },
  mounted() {
    this.billNo = this.$props.yzk.billNo;
    this.getYzkEntries(this.$props.yzk.gh);
  },
  updated() {
    if (this.billNo !== this.$props.yzk.billNo) {
      this.getYzkEntries(this.$props.yzk.gh);
      this.billNo = this.$props.yzk.billNo;
    }
  },
  props: {
    yzk: {
      required: true,
      type: Object
    }
  },
  components: {
    FieldItem,
    DXGY,
    RSD,
    LLD,
    RGCR
  }
};
</script>

<style>
#yzkbody #closed {
  padding-top: 25px;
}
#yzkbody {
  overflow-y: auto;
  font-family:"Microsoft YaHei";
  font-size: 14px;
}
#yzkbody .el-icon-success {
  color: rgb(60, 150, 9);
  font-size: 20px;
}
#yzkbody #detail {
  margin-top: 5px;
}
</style>