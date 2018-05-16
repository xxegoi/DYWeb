<template>
    <div>
        <el-table height="350" size="small" border  :data="tableData">
          <el-table-column label="单据编号" prop="billNo"></el-table-column>
          <el-table-column label="染缸类型" prop="tranType"></el-table-column>
          <el-table-column label="制单人" prop="biller"></el-table-column>
          <el-table-column :formatter="dateFormatter" label="制单日期" prop="date"></el-table-column>
          <el-table-column :formatter="timeFormatter" :min-width="150" label="日期" prop="detaiDate"></el-table-column>
          <el-table-column label="类型" prop="fType"></el-table-column>
          <el-table-column show-overflow-tooltip  label="物料编码" prop="itemNum"></el-table-column>
          <el-table-column :min-width="200" label="物料名称" prop="itemName"></el-table-column>
          <el-table-column :min-width="100" label="色号" prop="colorNo"></el-table-column>
          <el-table-column label="颜色" prop="color"></el-table-column>
          <el-table-column label="客户名称" prop="custName"></el-table-column>
          <el-table-column label="条数" prop="qty"></el-table-column>
          <el-table-column label="重量" prop="weight"></el-table-column>
          <el-table-column :min-width="120" label="染机号" prop="rjh"></el-table-column>
          <el-table-column :min-width="120" label="车间" prop="deptName"></el-table-column>
          <el-table-column label="值班员" prop="jgy"></el-table-column>
          <el-table-column label="对色师傅" prop="ds"></el-table-column>
          <el-table-column label="班别" prop="fbb"></el-table-column>
          <el-table-column label="备注" prop="note"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  name: "RGCR",
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