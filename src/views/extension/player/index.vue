<template>
  <div class="ele-body ele-body-card">
    <el-row :gutter="15">
      <el-col :md="12">
        <demo-basic />
      </el-col>
      <el-col :md="12">
        <demo-danmu />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import DemoBasic from './components/demo-basic.vue';
  import DemoDanmu from './components/demo-danmu.vue';

  export default {
    name: 'ExtensionPlayer',
    components: { DemoBasic, DemoDanmu }
  };
</script>

<style>
  .xgplayer-skin-default .xgplayer-pip {
    margin: -1px 0 0 10px;
  }
</style>
