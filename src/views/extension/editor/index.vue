<template>
  <div class="ele-body">
    <el-card shadow="never">
      <!-- 操作按钮 -->
      <div class="ele-table-tool">
        <el-button size="small" @click="editContent">修改内容</el-button>
        <el-button size="small" @click="showViewContent = true">
          获取html
        </el-button>
        <el-button
          size="small"
          class="hidden-xs-only"
          @click="showViewText = true"
        >
          获取文本
        </el-button>
      </div>
      <!-- 编辑器 -->
      <tinymce-editor v-model="value" :init="option" />
    </el-card>
    <!-- 内容弹窗 -->
    <ele-modal width="400px" title="编辑器内容" :visible.sync="showViewContent">
      <div>{{ value }}</div>
    </ele-modal>
    <!-- 纯文本弹窗 -->
    <ele-modal width="400px" title="编辑器纯文本" :visible.sync="showViewText">
      <div>{{ value | htmlToText }}</div>
    </ele-modal>
  </div>
</template>

<script>
  import TinymceEditor from '@/components/TinymceEditor';

  export default {
    name: 'ExtensionEditor',
    components: { TinymceEditor },
    data() {
      return {
        option: {
          height: 520,
          // 自定义文件上传(这里使用把选择的文件转成blob演示)
          file_picker_callback: (callback, value, meta) => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            // 设定文件可选类型
            if (meta.filetype === 'image') {
              input.setAttribute('accept', 'image/*');
            } else if (meta.filetype === 'media') {
              input.setAttribute('accept', 'video/*');
            }
            input.onchange = () => {
              let file = input.files[0];
              let reader = new FileReader();
              reader.onload = (e) => {
                let blob = new Blob([e.target.result], { type: file.type });
                callback(URL.createObjectURL(blob));
              };
              reader.readAsArrayBuffer(file);
            };
            input.click();
          }
        },
        value: '',
        showViewContent: false,
        showViewText: false
      };
    },
    methods: {
      /* 修改编辑器内容 */
      editContent() {
        this.value = [
          '<div style="text-align: center;color: #fff;background-image: linear-gradient( 135deg, #2AFADF 10%, #4C83FF 100%);padding: 20px;">',
          '   <div style="font-size: 28px;margin-bottom: 10px;">EleAdmin后台管理模板</div>',
          '   <div style="font-size: 18px">通用型后台管理模板，界面美观、开箱即用，拥有丰富的组件和模板</div>',
          '</div><br/>'
        ].join('');
      }
    }
  };
</script>
