<template>
  <div>
    <!-- 数据表格 -->
    <ele-pro-table
      ref="table"
      :columns="columns"
      :datasource="datasource"
      :selection.sync="selection"
      height="calc(100vh - 265px)"
      full-height="calc(100vh - 116px)"
      tool-class="ele-toolbar-form"
    >
      <!-- 表头工具栏 -->
      <template v-slot:toolbar>
        <dict-data-search @search="reload">
          <el-button
            size="small"
            type="primary"
            icon="el-icon-plus"
            class="ele-btn-icon"
            @click="openEdit()"
          >
            添加
          </el-button>
          <el-button
            size="small"
            type="danger"
            icon="el-icon-delete"
            class="ele-btn-icon"
            @click="removeBatch"
          >
            删除
          </el-button>
        </dict-data-search>
      </template>
      <!-- 操作列 -->
      <template v-slot:action="{ row }">
        <el-link
          type="primary"
          :underline="false"
          icon="el-icon-edit"
          @click="openEdit(row)"
        >
          修改
        </el-link>
        <el-popconfirm
          class="ele-action"
          title="确定要删除此字典项吗？"
          @confirm="remove(row)"
        >
          <template v-slot:reference>
            <el-link type="danger" :underline="false" icon="el-icon-delete">
              删除
            </el-link>
          </template>
        </el-popconfirm>
      </template>
    </ele-pro-table>
    <!-- 编辑弹窗 -->
    <dict-data-edit
      :visible.sync="showEdit"
      :data="current"
      :dict-id="dictId"
      @done="reload"
    />
  </div>
</template>

<script>
  import DictDataSearch from './dict-data-search';
  import DictDataEdit from './dict-data-edit';
  import {
    pageDictionaryData,
    removeDictionaryData,
    removeDictionaryDataBatch
  } from '@/api/system/dictionary-data';

  export default {
    name: 'DictData',
    components: { DictDataSearch, DictDataEdit },
    props: {
      // 字典id
      dictId: Number
    },
    data() {
      return {
        // 表格列配置
        columns: [
          {
            columnKey: 'selection',
            type: 'selection',
            width: 45,
            align: 'center'
          },
          {
            columnKey: 'index',
            type: 'index',
            width: 45,
            align: 'center',
            showOverflowTooltip: true
          },
          {
            prop: 'dictDataName',
            label: '字典项名称',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 120
          },
          {
            prop: 'dictDataCode',
            label: '字典项值',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110
          },
          {
            prop: 'sortNumber',
            label: '排序号',
            sortable: 'custom',
            showOverflowTooltip: true,
            width: 90
          },
          {
            prop: 'createTime',
            label: '创建时间',
            sortable: 'custom',
            showOverflowTooltip: true,
            minWidth: 110,
            formatter: (row, column, cellValue) => {
              return this.$util.toDateString(cellValue);
            }
          },
          {
            columnKey: 'action',
            label: '操作',
            width: 130,
            align: 'center',
            resizable: false,
            slot: 'action',
            hideInSetting: true,
            showOverflowTooltip: true
          }
        ],
        // 表格选中数据
        selection: [],
        // 当前编辑数据
        current: null,
        // 是否显示编辑弹窗
        showEdit: false
      };
    },
    methods: {
      /* 表格数据源 */
      datasource({ page, limit, where, order }) {
        return pageDictionaryData({
          ...where,
          ...order,
          page,
          limit,
          dictId: this.dictId
        });
      },
      /* 刷新表格 */
      reload(where) {
        this.$refs.table.reload({ page: 1, where: where });
      },
      /* 显示编辑 */
      openEdit(row) {
        this.current = row;
        this.showEdit = true;
      },
      /* 删除 */
      remove(row) {
        const loading = this.$loading({ lock: true });
        removeDictionaryData(row.dictDataId)
          .then((msg) => {
            loading.close();
            this.$message.success(msg);
            this.reload();
          })
          .catch((e) => {
            loading.close();
            this.$message.error(e.message);
          });
      },
      /* 批量删除 */
      removeBatch() {
        if (!this.selection.length) {
          this.$message.error('请至少选择一条数据');
          return;
        }
        this.$confirm('确定要删除选中的字典项吗?', '提示', {
          type: 'warning'
        })
          .then(() => {
            const loading = this.$loading({ lock: true });
            removeDictionaryDataBatch(this.selection.map((d) => d.dictDataId))
              .then((msg) => {
                loading.close();
                this.$message.success(msg);
                this.reload();
              })
              .catch((e) => {
                loading.close();
                this.$message.error(e.message);
              });
          })
          .catch(() => {});
      }
    },
    watch: {
      // 监听字典id变化
      dictId() {
        this.reload();
      }
    }
  };
</script>
