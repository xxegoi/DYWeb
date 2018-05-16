<template>
    <div>
        <el-row :gutter="5">
            <el-tabs type="border-card">
              <el-tab-pane label="单据信息">
            <el-col :span="8">
                <FieldItem title="布类编码" :value="colorNo.ItemNumber"></FieldItem>
            </el-col>
            <el-col :span="8">
                <FieldItem title="布类名称" :value="colorNo.ItemName"></FieldItem>
            </el-col>
            <el-col :span="4">
                <FieldItem title="纱胚" :value="colorNo.ShaPiName"></FieldItem>
            </el-col>
            <el-col :span="4">
                <FieldItem title="色号类别" :value="colorNo.ColorTypeName"></FieldItem>
            </el-col>
                <el-col :span="4">
                    <FieldItem title="浓度" :value="colorNo.colorNo.FChroma"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="客户名称" :value="colorNo.colorNo.CustomerName"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="客户代码" :value="colorNo.colorNo.CustomerNumber"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="色号(客户)" :value="colorNo.colorNo.FColorNoForCust"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="色名(客户)" :value="colorNo.colorNo.FColorNameForCust"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="色系(客户)" :value="colorNo.ColorSeriesName"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="浓度(客户)" :value="colorNo.colorNo.FChromaForCust"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="色号" :value="colorNo.colorNo.FColorNo"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="颜色" :value="colorNo.colorNo.FColorName"></FieldItem>
                </el-col>
                
                <el-col :span="4">
                    <FieldItem title="加工类别" :value="colorNo.colorNo.FProType"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="单据编号" :value="colorNo.colorNo.FBillNo"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="计划成本" :value="colorNo.colorNo.FTotalPlanAmount"></FieldItem>
                </el-col>
                <el-col :span="4">
                    <FieldItem title="实际成本" :value="colorNo.colorNo.FTotalAmount"></FieldItem>
                </el-col>
                </el-tab-pane></el-tabs>
        </el-row>
        <el-row :gutter="5">
            <el-tabs type="border-card">
              <el-tab-pane label="明细">
                  <el-table border  size="small" :data="details">
                    <el-table-column label="工序" prop="WorkName"></el-table-column>
                    <el-table-column label="材料类别" prop="ClassTypeName"></el-table-column>
                    <el-table-column label="材料代码" prop="entry.FMaterialID"></el-table-column>
                    <el-table-column show-overflow-tooltip  :min-width="120" label="材料名称" prop="ItemName"></el-table-column>
                    <el-table-column show-overflow-tooltip  :min-width="150" label="规格型号" prop="ItemModel"></el-table-column>
                    <el-table-column   label="标准用量" prop="entry.FDosage"></el-table-column>
                    <!-- <el-table-column label="计划成本" prop="entry.FPlanAmount"></el-table-column> -->
                    <el-table-column label="水比" prop="entry.FSB1"></el-table-column>
                    <!-- <el-table-column label="实际成本" prop=""></el-table-column> -->
                    <el-table-column label="水比" prop="entry.FSB2"></el-table-column>
                    <el-table-column :min-width="150" label="工艺条件" prop="entry.FGYTJ"></el-table-column>
                    <el-table-column label="工艺号1" prop="entry.FGYH1"></el-table-column>
                    <el-table-column label="工艺号2" prop="entry.FGYH2"></el-table-column>
                    <el-table-column label="备注" prop="entry.FNOTE"></el-table-column>
                    <!-- <el-table-column label="计划单价" prop="entry.FPlanPrice"></el-table-column> -->
                    <!-- <el-table-column label="单价" prop=""></el-table-column> -->
                    <!-- <el-table-column :min-width="100" label="物料计划成本" prop="entry.FPlanAmount"></el-table-column>
                    <el-table-column :min-width="100" label="物料实际成本" prop=""></el-table-column> -->
                  </el-table>
              </el-tab-pane>
            </el-tabs>
        </el-row>
    </div>
</template>

<script>
import FieldItem from "@/components/Common/FieldItem.vue";
export default {
  name:'ColorDetail',
  data() {
    return {
      details: [],
      billNo: ""
    };
  },
  methods: {
    getEntries() {
      this.$axios({
        url: "/api/ColorNo/GetEntries",
        params: { colorId: this.$props.colorNo.colorNo.FID }
      })
        .then(response => {
          this.details = response.data.Data;
        })
        .catch(response => {
          console.log(response.message);
        });
    }
  },
  mounted() {
    this.billNo = this.$props.colorNo.colorNo.FBillNo;
    this.getEntries()
  },
  updated() {
    if (this.billNo !== this.$props.colorNo.colorNo.FBillNo) {
        this.getEntries()
        this.billNo=this.$props.colorNo.colorNo.FBillNo
    }
  },
  
  props: {
    colorNo: {
      type: Object,
      required: true
    }
  },
  components: {
    FieldItem
  }
};
</script>

<style scoped>
.el-row {
  margin-bottom: 5px;
}
</style>