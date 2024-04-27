<template>
  <div class="ele-body">
    <demo-basic />
    <demo-advanced />
  </div>
</template>

<script>
  import DemoBasic from './components/demo-basic.vue';
  import DemoAdvanced from './components/demo-advanced.vue';

  export default {
    name: 'ExtensionUpload',
    components: { DemoBasic, DemoAdvanced }
  };
</script>
