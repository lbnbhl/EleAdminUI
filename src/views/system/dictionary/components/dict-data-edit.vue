<!-- 字典项编辑弹窗 -->
<template>
  <ele-modal
    width="460px"
    :visible="visible"
    :close-on-click-modal="true"
    :title="isUpdate ? '修改字典项' : '添加字典项'"
    @update:visible="updateVisible"
  >
    <el-form :model="form" ref="form" :rules="rules" label-width="96px">
      <el-form-item label="字典项名称:" prop="dictDataName">
        <el-input
          clearable
          :maxlength="20"
          v-model="form.dictDataName"
          placeholder="请输入字典项名称"
        />
      </el-form-item>
      <el-form-item label="字典项值:" prop="dictDataCode">
        <el-input
          clearable
          :maxlength="20"
          v-model="form.dictDataCode"
          placeholder="请输入字典项值"
        />
      </el-form-item>
      <el-form-item label="排序号:" prop="sortNumber">
        <el-input-number
          :min="0"
          :max="9999"
          v-model="form.sortNumber"
          placeholder="请输入排序号"
          controls-position="right"
          class="ele-fluid ele-text-left"
        />
      </el-form-item>
      <el-form-item label="备注:">
        <el-input
          :rows="4"
          type="textarea"
          :maxlength="200"
          v-model="form.comments"
          placeholder="请输入备注"
        />
      </el-form-item>
    </el-form>
    <template v-slot:footer>
      <el-button @click="updateVisible(false)">取消 </el-button>
      <el-button type="primary" :loading="loading" @click="save">
        保存
      </el-button>
    </template>
  </ele-modal>
</template>

<script>
  import {
    addDictionaryData,
    updateDictionaryData
  } from '@/api/system/dictionary-data';
  const DEFAULT_FORM = {
    dictDataId: null,
    dictDataName: '',
    dictDataCode: '',
    sortNumber: '',
    comments: ''
  };

  export default {
    name: 'DictDataEdit',
    props: {
      // 弹窗是否打开
      visible: Boolean,
      // 修改回显的数据
      data: Object,
      // 字典id
      dictId: Number
    },
    data() {
      return {
        // 表单数据
        form: { ...DEFAULT_FORM },
        // 表单验证规则
        rules: {
          dictDataName: [
            {
              required: true,
              message: '请输入字典项名称',
              trigger: 'blur'
            }
          ],
          dictDataCode: [
            {
              required: true,
              message: '请输入字典项值',
              trigger: 'blur'
            }
          ],
          sortNumber: [
            {
              required: true,
              message: '请输入排序号',
              trigger: 'blur'
            }
          ]
        },
        // 提交状态
        loading: false,
        // 是否是修改
        isUpdate: false
      };
    },
    methods: {
      /* 保存编辑 */
      save() {
        this.$refs['form'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true;
          const saveOrUpdate = this.isUpdate
            ? updateDictionaryData
            : addDictionaryData;
          saveOrUpdate({
            ...this.form,
            dictId: this.dictId
          })
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
        });
      },
      /* 更新visible */
      updateVisible(value) {
        this.$emit('update:visible', value);
      }
    },
    watch: {
      visible(visible) {
        if (visible) {
          if (this.data) {
            this.$util.assignObject(this.form, this.data);
            this.isUpdate = true;
          } else {
            this.isUpdate = false;
          }
        } else {
          this.$refs['form'].clearValidate();
          this.form = { ...DEFAULT_FORM };
        }
      }
    }
  };
</script>
