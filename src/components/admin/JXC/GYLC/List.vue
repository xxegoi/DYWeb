<template>
    <div>
        <el-row id="Query">
            <el-row :gutter="5">
                <el-col :span="6">
                    <el-input v-model="condition.fgh" clearable  size="small" placeholder="缸号"></el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" size="small" @click="getWorkFlow"><i class="el-icon-search"></i> 查询</el-button>
                </el-col>
            </el-row>
            <el-row>
                
            </el-row>
        </el-row>
        <el-row id="List">
            <el-table :data="list" size="small">
                <el-table-column label="缸号"  prop="GH"></el-table-column>
                <el-table-column  label="工艺流程">
                    <template slot-scope="scope">
                        <el-steps :active="activeIndex" finish-status="success" direction="vertical">
                            <el-step v-for="item in scope.row.WorkFlow" :key="item.FID" :title="item.FName"></el-step>
                        </el-steps>
                    </template>
                </el-table-column>
                <el-table-column   label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="modifyWorkFlow" type="primary">修改</el-button>
                        <el-button size="small" type="success" @click="logDialogVisible=true">日志</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog title="工艺流程修改" center :fullscreen="false" :lock-scroll="true" :visible.sync="modifyVisible">
            <modify @save="save" :wp="wp" :workflow="tempwf" :GH="condition.fgh" :activeIndex="activeIndex" />
        </el-dialog>
        <el-dialog title="工艺流程修改日志" @open="onLogDialogOpen" center :visible.sync="logDialogVisible">
          <logDialog :logs="logs"></logDialog>
        </el-dialog>
    </div>
</template>

<script>
import modify from "./Modify.vue";
import logDialog from "./LogDialog.vue";

export default {
  name: "GYLCList",
  data() {
    return {
      condition: {
        fgh: ""
      },
      list: [],
      workflow: [],
      tempwf: [],
      gxhb: [],
      wp: [],
      activeIndex: -1,
      modifyVisible: false,
      logDialogVisible:false,
      logs:[]
    };
  },
  methods: {
    onLogDialogOpen() {
      this.$axios
        .get("/api/WorkFlow/getlog?fgh=" + this.condition.fgh)
        .then(res => {
          this.logs = res.data.Data;
        })
        .catch(res => {
          this.$message.error(res.data.Message);
        });
    },
    getWorkFlow() {
      this.$axios({
        url: "/api/WorkFlow/GetWorkFlow",
        params: { fgh: this.condition.fgh }
      })
        .then(res => {
          this.list = [res.data.Data];
          this.gxhb = res.data.Data.GXHB;
          this.wp=res.data.Data.wp;
          for (var i = 0; i < this.gxhb.length; i++) {
            for (var j = 0; j < res.data.Data.WorkFlow.length; j++) {
              if(this.gxhb[i].WPID==res.data.Data.WorkFlow[j].WPID&&this.gxhb[i].FIndex==res.data.Data.WorkFlow[j].FIndex){
                this.activeIndex = j+1;
              }
            }
          }
          this.GYLCVisible = true;
        })
        .catch(res => {
          this.$message.error(res.response.data.Message);
        });
    },
    modifyWorkFlow() {
      this.tempwf = this.list[0].WorkFlow;
      this.modifyVisible = true;
    },
    save(){
      this.modifyVisible=false;
      this.getWorkFlow();
    }
  },
  mounted() {
    
  },
  components: {
    modify,logDialog
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
</style>