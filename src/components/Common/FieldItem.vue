<template>
    <el-row class="FieldItem">
        <el-col class="fieldLabel"><b>{{title}}</b></el-col>
        <el-col>
            <el-input :readonly="true" size="small" v-model="value" placeholder=""></el-input>
        </el-col>
    </el-row>
</template>

<script>
export default {
  name: "FieldItem",
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      required: true
    }
  }
};
</script>

<style>
.FieldItem .el-input__inner,textarea {
  background-color: rgb(206, 229, 250) !important;
  font-size: 14px!important;
  color: black!important;
  
}
</style>