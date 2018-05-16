<template>
    <div id="GYLC">
        <el-steps :active="activeIndex" finish-status="success"  >
            <template v-for="(w,index) in workflow">
              <el-step :title="w.FName"  :key="w.FID"></el-step>
              <!-- <template v-if="index<activeIndex">
                <el-step :title="w.FName"  :key="w.FID"></el-step>
              </template>
              <template v-else>
                <el-step :title="w.FName"  :key="w.FID"></el-step>
              </template> -->
            </template>
        </el-steps>
    </div>
</template>

<script>
export default {
  name: "GYLC",
  data() {
    return {};
  },
  methods: {},
  mounted() {},
  updated() {},
  beforeUpdate() {},
  props: {
    fgh: {
      type: String,
      required: true
    },
    workflow: {
      type: Array,
      required: true
    },
    gxhb: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  }
};
</script>

<style scoped>
#GYLC {
}
</style>