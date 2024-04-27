<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    created() {
      // 恢复主题
      this.$store.dispatch('theme/recoverTheme');
    }
  };
</script>
