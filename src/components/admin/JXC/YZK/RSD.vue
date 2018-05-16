<template>
    <div>
      <el-table height="350" border size="small" :span-method="spanMethod" :data="tableData">
        <el-table-column label="单据编号" prop="m.FBillNo"></el-table-column>
        <!-- <el-table-column label="制单人" prop="biller"></el-table-column> -->
        <el-table-column label="日期" :formatter="dateFormatter" prop="m.FDate"></el-table-column>
        <!-- <el-table-column label="审核人"  prop="checker"></el-table-column> -->
        <!-- <el-table-column label="审核日期" prop="m.FCheckDate"></el-table-column> -->
        <el-table-column label="色号编号" prop="m.FColorNo"></el-table-column>
        <el-table-column label="色系" prop="colorSeri"></el-table-column>
        <!-- <el-table-column label="客户代码" prop="custNumber"></el-table-column> -->
        <el-table-column label="客户名称" prop="custName"></el-table-column>
        <el-table-column :min-width="150"  label="布类名称" prop="itemName"></el-table-column>
        <el-table-column :min-width="150" label="布类编码" prop="itemNum"></el-table-column>
        <el-table-column label="颜色" prop="m.FColorName"></el-table-column>
        <el-table-column  label="纱胚" prop="entryShapi"></el-table-column>
        <el-table-column show-overflow-tooltip  label="材料编码" prop="entryItemNum"></el-table-column>
        <el-table-column :min-width="150"  label="材料名称" prop="entryItemName"></el-table-column>
        <el-table-column show-overflow-tooltip label="规格型号" prop="entryItemModel"></el-table-column>
        <el-table-column label="材料类别" prop="entryItemType"></el-table-column>
        <el-table-column label="工序" prop="entryWork"></el-table-column>
        <el-table-column label="标准用量" prop="entry.FDosage"></el-table-column>
        <el-table-column label="水比1" prop="entry.FSB1"></el-table-column>
        <el-table-column label="水比2" prop="entry.FSB2"></el-table-column>
        <el-table-column :min-width="150" label="工艺要求" prop="entry.FGYYQ"></el-table-column>
        <el-table-column label="工艺号1" prop="entry.FGYH1"></el-table-column>
        <el-table-column label="工艺号2" prop="entry.FGYH2"></el-table-column>
        <el-table-column label="操作员" prop="entry.FUserName"></el-table-column>
        <el-table-column :min-width="150" label="操作时间" :formatter="timeFormatter" prop="entry.FTime"></el-table-column>
      </el-table>
    </div>
</template>

<script>
export default {
  name: "RSD",
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
      if (columnIndex <= 7) {
        //判断单号是否连续相同，row为当前行数据
        if (this.currentBillNo !== row.m.FBillNo) {
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
    },
    getRowIndex(currentRowIndex) {
      for (var i = currentRowIndex + 1; i < this.tableData.length; i++) {
        if (this.currentBillNo !== this.tableData[i].m.FBillNo) {
          this.rowIndex = i;
          return i - currentRowIndex + 1;
        }
        if (i === this.tableData.length - 1) {
          this.rowIndex = i;
          return i - currentRowIndex + 1;
        }
      }
    },
    timeFormatter(row, col, cellvalue) {
      if (cellvalue) {
        var reg = new RegExp("[\\d-]+T[\\d:]+");
        return reg
          .exec(cellvalue.toString())
          .toString()
          .replace("T", "  ");
      }
    }
  },
  computed: {
    RowIndexs: function() {
      var result = [];
      var billno = "";
      this.tableData.forEach(e => {
        if (billno !== e.m.FBillNo) {
          billno = e.m.FBillNo;
          result.push(this.tableData.indexOf(e));
        }
      });
      return result;
    }
  },
  updated() {}
};
</script>

<style scoped>
td[rowspan="10"] {
  vertical-align: top;
}
</style>