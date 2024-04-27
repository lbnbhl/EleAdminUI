<template>
  <div class="ele-body ele-body-card">
    <statistics-card />
    <el-row :gutter="15">
      <el-col :lg="18">
        <map-card />
      </el-col>
      <el-col :lg="6">
        <el-row :gutter="15">
          <el-col :lg="24" :md="12" :sm="24">
            <online-num />
          </el-col>
          <el-col :lg="24" :md="12" :sm="24">
            <browser-card />
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <user-rate />
  </div>
</template>

<script>
  import StatisticsCard from './components/statistics-card.vue';
  import MapCard from './components/map-card.vue';
  import OnlineNum from './components/online-num.vue';
  import BrowserCard from './components/browser-card.vue';
  import UserRate from './components/user-rate.vue';

  export default {
    name: 'DashboardMonitor',
    components: {
      StatisticsCard,
      MapCard,
      OnlineNum,
      BrowserCard,
      UserRate
    }
  };
</script>
