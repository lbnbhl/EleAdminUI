<template>
  <div></div>
</template>

<script>
  export default {
    name: 'ComponentTest',
    created() {
      console.log('弹窗内组件创建');
    },
    destroyed() {
      console.log('弹窗内组件销毁');
    }
  };
</script>
