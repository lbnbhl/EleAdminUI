<!-- 用户导入弹窗 -->
<template>
  <ele-modal
    width="520px"
    title="导入用户"
    :visible="visible"
    @update:visible="updateVisible"
  >
    <el-upload
      drag
      action=""
      class="ele-block"
      v-loading="loading"
      accept=".xls,.xlsx"
      :show-file-list="false"
      :before-upload="doUpload"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处, 或 <em>点击上传</em></div>
      <template v-slot:tip>
        <div class="el-upload__tip ele-text-center">
          <span>只能上传xls、xlsx文件, </span>
          <el-link
            download
            :href="url"
            type="primary"
            :underline="false"
            style="vertical-align: baseline"
          >
            下载模板
          </el-link>
        </div>
      </template>
    </el-upload>
  </ele-modal>
</template>

<script>
  import { importUsers } from '@/api/system/user';

  export default {
    name: 'UserImport',
    props: {
      // 是否打开弹窗
      visible: Boolean
    },
    data() {
      return {
        // 导入请求状态
        loading: false,
        // 导入模板下载地址
        url: 'https://cdn.eleadmin.com/20200610/用户导入模板.xlsx'
      };
    },
    methods: {
      /* 上传 */
      doUpload(file) {
        this.loading = true;
        importUsers(file)
          .then((msg) => {
            this.loading = false;
            this.$message.success(msg);
            this.updateVisible(false);
            this.$emit('done');
          })
          .catch((e) => {
            this.loading = false;
            this.$message.error(e.message);
          });
        return false;
      },
      /* 更新visible */
      updateVisible(value) {
        this.$emit('update:visible', value);
      }
    }
  };
</script>

<style scoped>
  .ele-block ::v-deep .el-upload,
  .ele-block ::v-deep .el-upload-dragger {
    width: 100%;
  }
</style>
