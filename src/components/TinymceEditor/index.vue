<!-- 富文本编辑器 -->
<template>
  <editor
    :init="config"
    :value="value"
    :disabled="disabled"
    @input="updateValue"
  />
</template>

<script>
  import Editor from '@tinymce/tinymce-vue';
  import tinymce from 'tinymce/tinymce';
  import 'tinymce/icons/default';
  import 'tinymce/themes/silver';
  import 'tinymce/plugins/code';
  import 'tinymce/plugins/preview';
  import 'tinymce/plugins/fullscreen';
  import 'tinymce/plugins/searchreplace';
  import 'tinymce/plugins/save';
  import 'tinymce/plugins/autosave';
  import 'tinymce/plugins/link';
  import 'tinymce/plugins/autolink';
  import 'tinymce/plugins/image';
  import 'tinymce/plugins/media';
  import 'tinymce/plugins/table';
  import 'tinymce/plugins/codesample';
  import 'tinymce/plugins/lists';
  import 'tinymce/plugins/advlist';
  import 'tinymce/plugins/charmap';
  import 'tinymce/plugins/emoticons';
  import 'tinymce/plugins/anchor';
  import 'tinymce/plugins/directionality';
  import 'tinymce/plugins/pagebreak';
  import 'tinymce/plugins/quickbars';
  import 'tinymce/plugins/nonbreaking';
  import 'tinymce/plugins/visualblocks';
  import 'tinymce/plugins/visualchars';
  import 'tinymce/plugins/wordcount';
  import 'tinymce/plugins/emoticons/js/emojis';
  import { DEFAULT_CONFIG, DARK_CONFIG, changeEditorTheme } from './util';

  export default {
    name: 'TinymceEditor',
    components: { Editor },
    props: {
      // 值(v-model)
      value: String,
      // 编辑器配置
      init: Object,
      // 是否禁用
      disabled: Boolean,
      // 自动跟随框架主题
      autoTheme: {
        type: Boolean,
        default: true
      },
      // 是否使用暗黑主题
      darkTheme: Boolean
    },
    data() {
      const darkMode = this.$store?.state?.theme?.darkMode;
      const isDark = this.autoTheme ? darkMode : this.darkTheme;
      return {
        // 编辑器配置
        config: {
          ...DEFAULT_CONFIG,
          ...(isDark ? DARK_CONFIG : {}),
          ...this.init
        }
      };
    },
    computed: {
      // 是否是暗黑模式
      darkMode() {
        return this.$store?.state?.theme?.darkMode;
      }
    },
    created() {
      tinymce.init({});
    },
    methods: {
      /* 更新value */
      updateValue(value) {
        this.$emit('input', value);
      }
    },
    watch: {
      darkMode(darkMode) {
        if (this.autoTheme) {
          changeEditorTheme(darkMode);
        }
      }
    },
    activated() {
      if (this.autoTheme) {
        changeEditorTheme(this.darkMode);
      }
    }
  };
</script>

<style>
  body .tox-tinymce-aux {
    z-index: 19990000;
  }

  textarea[id^='tiny-vue'] {
    display: none;
  }
</style>
