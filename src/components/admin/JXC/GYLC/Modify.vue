<template>
    <div>
        <el-row :gutter="5">
            <el-col :offset="5" :span="8" id="wf">
                    <draggable @add="onAdd" :name="'flip-list'" :duration="100" :move="onMove" :list="workflow" :options="{group:'wf',pull:'clone'}">
                        <div class="wfItem" v-for="(w,index) in workflow" v-bind:key="index">
                             <i :class="index<activeIndex?'el-icon-success success':'el-icon-info'"></i>
                                <span>{{index+1}}</span>
                                <span>{{w.FName}}</span>
                                <i v-if="index>=activeIndex" @click="remove(index)" class="el-icon-remove danger"></i>
                         </div>
                    </draggable>
            </el-col>
            <el-col :span="8" >
              <el-input size="small" v-model="gxName" icon="el-icon-search" placeholder="输入工序名过滤" @change="GXFilter"></el-input>
              <el-row id="wps">
                <draggable :list="wps" :name="'flip-list'" :duration="100" :options="{group:{name:'wf',pull:'clone',revertClone: true},sort:false}">
                    <div v-for="item in wps" :key="item.FID">
                      <span>{{item.FName}}</span></div>
                </draggable>
                </el-row>
            </el-col>
        </el-row>
        <el-row id="foot">
            <div>
                <el-button type="primary" @click="save" >保存</el-button>
            </div>
        </el-row>
    </div>
</template>

<script>
import draggable from "vuedraggable";
export default {
  name: "ModifyGYLC",
  data() {
    return {
      oldwf: this.$props.workflow.slice(0),
      wps: this.$props.wp.slice(0),
      gxName:''
    };
  },
  methods: {
    GXFilter(valeu) {
      if (this.gxName == "") {
        this.wps = this.$props.wp.slice(0);
      } else {
        var filter=[];
        var arr=this.$props.wp.slice(0);
        for(var i=0;i<arr.length;i++){
          var item=arr[i];
          if(item.FName.indexOf(this.gxName)>=0){
            filter.push(item);
          }
        }
        this.wps=filter;
      }
    },
    onAdd(evt) {
      var newIndex = evt.newIndex;
      var oldIndex = evt.oldIndex;
      if (newIndex < this.activeIndex) {
        this.$props.workflow.splice(newIndex, 1);
      }
    },
    remove(index) {
      this.$props.workflow.splice(index, 1);
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedIndex = relatedContext.index;
      const draggedIndex = draggedContext.index;
      var result =
        relatedIndex >= this.activeIndex && draggedIndex >= this.activeIndex;
      return result;
    },
    save() {
      this.$confirm("确定修改工艺流程？", "保存", {
        confirmButtonText: "保存",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.saveWorkFlow();
        })
        .catch(error => {
          this.$message({
            type: "info",
            message: error.message
          });
        });
    },
    saveWorkFlow() {
      var data = this.$qs.stringify({
        //POST数组时要先用JSON.stringify()加工一下
        workflow: this.$props.workflow,
        fgh: this.$props.GH,
        canModifyIndex: this.activeIndex,
        oldwf: this.oldwf
      });
      this.$axios({
        url: "/api/WorkFlow/ModifyWorkFlow",
        method: "post",
        data: data
      })
        .then(res => {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$emit("save");
        })
        .catch(res => {
          this.$message.error(res.data.Message);
        });
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 100,
        group: "wf"
      };
    }
  },
  props: {
    wp: {
      type: Array,
      required: true
    },
    workflow: {
      type: Array,
      required: true
    },
    GH: {
      type: String,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  components: {
    draggable
  }
};
</script>

<style scoped>
.success {
  color: rgb(15, 241, 34);
  font-size: 1.1rem;
}
#wf,
#wps {
  /* border: 1px solid #999; */
  border-radius: 2px;
  height: 400px;
  overflow-y: auto;
  margin-right: 20px;
  padding-top: 5px;
  padding-bottom: 5px;
}

#wps div div {
  text-align: center;
  border-radius: 3px;
  border: 1px solid #999;
  margin-bottom: 1px;
  background-color: rgb(171, 195, 224);
}
.el-row {
  margin-bottom: 10px;
}
.wfItem {
  border: 1px solid #999;
  border-radius: 3px;
  margin-bottom: 1px;
}
.wfItem {
}
.danger {
  color: rgb(235, 65, 65);
  margin: auto;
  float: right;
  font-size: 1.1rem;
}
.flip-list-move {
  transition: transform 1s;
}
#foot {
  width: 100px;
  margin: 15px auto;
  padding-left: 15px;
  padding-right: 15px;
}
.el-icon-circle-plus {
  color: rgb(35, 211, 114);
}
</style>