<template>
    <div>
        <el-table border  :data="tableData" size="small" :span-method="spanMethod">
          <el-table-column :formatter="dateFormatter" label="日期" prop="date"></el-table-column>
          <el-table-column label="审核标志" prop="check"></el-table-column>
          <el-table-column label="作废标志" prop="cancellation"></el-table-column>
          <el-table-column label="领料部门" prop="deptName"></el-table-column>
          <el-table-column label="单据编号" prop="billNo"></el-table-column>
          <el-table-column :min-width="200" label="物料名称" prop="itemName"></el-table-column>
          <el-table-column show-overflow-tooltip="" label="物料代码" prop="itemNum"></el-table-column>
          <el-table-column label="规格型号" prop="itemModel"></el-table-column>
          <el-table-column label="实发数量" prop="itemQty"></el-table-column>
          <el-table-column label="单位" prop="itemUnit"></el-table-column>
          <el-table-column label="用量" prop="itemDosage"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: "LLD",
  data() {
    return {
      currentBillNo: "",
      count: 0,
      rowIndex: 0,
      startRowIndex: 0
    };
  },
  props: {
    tableData: {
      type: Array,
      required: true
    }
  },
  methods: {
    dateFormatter(row, col, cellvalue) {
      return new Date(cellvalue).toLocaleDateString();
    },
    spanMethod({ row, column, rowIndex, columnIndex }) {
      //只对前8个字段进行合并操作
      if (columnIndex <= 4) {
        //判断单号是否连续相同，row为当前行数据
        if (this.currentBillNo !== row.billno) {
          //this.RowIndexs为每个单据在this.tableData中的起始行位置
          //判断当前行是否为单据起始行
          var index = this.RowIndexs.indexOf(rowIndex);
          if (index > -1) {
            //当前行为单据起始行，计算要合并的行数
            //合并行数=下一单据起始行位置-当前行位置
            //如果当前行单据是this.tableData中的最后一个单据，则合并行数=this.tableData总行数-当前行位置
            var count = this.RowIndexs[index + 1] - rowIndex;
            if (index + 1 >= this.RowIndexs.length) {
              count = this.tableData.length - rowIndex;
            }
            return [count, 1];
          } else {
            //非起始行合并行数=0，合并列数=1
            return [0, 1];
          }
        } else {
          //不需要合并的字段，合并行数=1，合并列数=1，也就是不合并
          return [1, 1];
        }
      } else {
        return [1, 1];
      }
    }
  },
  computed: {
    RowIndexs: function() {
      var result = [];
      var billno = "";
      this.tableData.forEach(e => {
        if (billno !== e.billno) {
          billno = e.billno;
          result.push(this.tableData.indexOf(e));
        }
      });
      return result;
    }
  }
};
</script>

<style scoped>

</style>