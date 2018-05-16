<template>
    <el-table size="small" :data="data">
      <el-table-column type="expand">
          <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="班组："><span>{{props.row.gylc.FClassGroup}}</span></el-form-item>
                <el-form-item label="班别："><span>{{props.row.classTypeName}}</span></el-form-item>
                <el-form-item label="机台号："><span>{{props.row.JTH}}</span></el-form-item>
                <el-form-item label="定型车间："><span>{{props.row.department}}</span></el-form-item>
                <el-form-item label="封度："><span>{{props.row.gylc.FFD}}</span></el-form-item>
                <el-form-item label="克重："><span>{{props.row.gylc.FKZ}}</span></el-form-item>
                <el-form-item label="温度："><span>{{props.row.gylc.FWD}}</span></el-form-item>
                <el-form-item label="机速："><span>{{props.row.gylc.FJS}}</span></el-form-item>
                <el-form-item label="机架："><span>{{props.row.gylc.FJJ}}</span></el-form-item>
                <el-form-item label="超喂："><span>{{props.row.gylc.FCW}}</span></el-form-item>
                <el-form-item label="前封度："><span>{{props.row.gylc.FQFD}}</span></el-form-item>
                <el-form-item label="前克重："><span>{{props.row.gylc.FQKZ}}</span></el-form-item>
                <el-form-item label="后封度："><span>{{props.row.gylc.FText9}}</span></el-form-item>
                <el-form-item label="后克重："><span>{{props.row.gylc.FHKZ}}</span></el-form-item>
                <el-form-item label="条数："><span>{{props.row.gylc.FTS}}</span></el-form-item>
                <el-form-item label="重量："><span>{{props.row.gylc.FWeight}}</span></el-form-item>
                <el-form-item label="树脂："><span>{{props.row.gylc.FSZ}}</span></el-form-item>
                <el-form-item label="浆切边："><span>{{props.row.gylc.FJQB}}</span></el-form-item>
                <el-form-item class="note" label="备注："><span>{{props.row.gylc.FNote}}</span></el-form-item>
                <el-form-item label="客户编号："><span>{{props.row.customerNum}}</span></el-form-item>
                <el-form-item label="客户名："><span>{{props.row.customerName}}</span></el-form-item>
                <el-form-item label="成品要求："><span>{{props.row.gylc.FCPYQ}}</span></el-form-item>
                <el-form-item label="下机克重："><span>{{props.row.gylc.FXJKZ}}</span></el-form-item>
                <el-form-item label="成品克重："><span>{{props.row.gylc.FCPKZ}}</span></el-form-item>
                <el-form-item label="布类编码："><span>{{props.row.itemNum}}</span></el-form-item>
                <el-form-item label="品名："><span>{{props.row.itemName}}</span></el-form-item>
                <el-form-item label="浆边："><span>{{props.row.gylc.FJB}}</span></el-form-item>
                <el-form-item label="切边："><span>{{props.row.gylc.FQB}}</span></el-form-item>
                <el-form-item label="加树脂："><span>{{props.row.gylc.FJSZ}}</span></el-form-item>
                <el-form-item label="加软油："><span>{{props.row.gylc.FJRY}}</span></el-form-item>
                <el-form-item label="色号："><span>{{props.row.gylc.FColorNo}}</span></el-form-item>
                <el-form-item label="色号名："><span>{{props.row.gylc.FColorName}}</span></el-form-item>
                <el-form-item label="横%："><span>{{props.row.gylc.FAcross}}</span></el-form-item>
                <el-form-item label="直%："><span>{{props.row.gylc.FStraight}}</span></el-form-item>
                <el-form-item label="扭度%："><span>{{props.row.gylc.FTweak}}</span></el-form-item>
              </el-form>
          </template>
      </el-table-column>
      <el-table-column label="单据编号" prop="gylc.FBillNo"></el-table-column>
      <el-table-column label="日期" :formatter="dateFormatter" prop="gylc.FDate"></el-table-column>
      <el-table-column label="缸号" prop="gylc.FGH"></el-table-column>
      <el-table-column label="类型" prop="typeName"></el-table-column>
    </el-table>
</template>

<script>
export default {
  name: "DXGY",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    dateFormatter(row, column, cellvalue) {
      return new Date(cellvalue).toLocaleDateString();
    }
  }
};
</script>

<style scoped>
label {
  color: #9aaabe;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 25%;
}
.note {
  width: 100% !important;
}
</style>