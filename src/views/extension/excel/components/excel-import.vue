<template>
  <el-card shadow="never" header="导入excel">
    <!-- 操作按钮 -->
    <div class="ele-table-tool ele-action-group">
      <el-upload
        action=""
        :before-upload="importFile"
        :show-file-list="false"
        class="ele-action"
        accept=".xls,.xlsx,.csv"
      >
        <el-button size="small" class="hidden-xs-only">导入excel</el-button>
      </el-upload>
      <el-upload
        action=""
        :before-upload="importFile2"
        :show-file-list="false"
        class="ele-action"
        accept=".xls,.xlsx,.csv"
      >
        <el-button size="small">导入自动拆分合并</el-button>
      </el-upload>
      <el-upload
        action=""
        :before-upload="importFile3"
        :show-file-list="false"
        class="ele-action"
        accept=".xls,.xlsx,.csv"
      >
        <el-button size="small">导入保持合并样式</el-button>
      </el-upload>
    </div>
    <!-- 数据表格 -->
    <el-table
      :data="importData"
      :span-method="spanMethod"
      size="mini"
      border
      style="width: 100%"
    >
      <el-table-column type="index" width="45" align="center" />
      <el-table-column
        v-for="(key, index) in importTitle"
        :key="index"
        :prop="key"
        :label="key"
        align="center"
        show-overflow-tooltip
      />
    </el-table>
    <el-row :gutter="30">
      <el-col :md="12">
        <div style="padding: 15px 0">二维数组格式数据:</div>
        <pre style="max-height: 300px; overflow: auto">{{
          JSON.stringify(importDataAoa, null, 4)
        }}</pre>
      </el-col>
      <el-col :md="12">
        <div style="padding: 15px 0">JSON格式数据:</div>
        <pre style="max-height: 300px; overflow: auto">{{
          JSON.stringify(importData, null, 4)
        }}</pre>
      </el-col>
    </el-row>
  </el-card>
</template>

<script>
  import { utils, read } from 'xlsx';

  export default {
    name: 'ExcelImport',
    data() {
      return {
        // 导入数据
        importData: [],
        // 导入数据的列
        importTitle: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
        // 导入数据二维数组形式
        importDataAoa: []
      };
    },
    methods: {
      /* 导入本地 excel 文件 */
      importFile(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = read(data, { type: 'array' });
          const sheetNames = workbook.SheetNames;
          const worksheet = workbook.Sheets[sheetNames[0]];
          // 解析成二维数组
          const aoa = utils.sheet_to_json(worksheet, { header: 1 });
          // 生成表格需要的数据
          const list = [];
          let maxCols = 0;
          const title = [];
          aoa.forEach((d) => {
            if (d.length > maxCols) {
              maxCols = d.length;
            }
            const row = {};
            for (let i = 0; i < d.length; i++) {
              row[this.getCharByIndex(i)] = d[i];
            }
            list.push(row);
          });
          for (let i = 0; i < maxCols; i++) {
            title.push(this.getCharByIndex(i));
          }
          this.importTitle = title;
          this.importData = list;
          this.importDataAoa = aoa;
        };
        reader.readAsArrayBuffer(file);
        return false;
      },
      /* 导入本地 excel 文件 */
      importFile2(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = read(data, { type: 'array' });
          const sheetNames = workbook.SheetNames;
          const worksheet = workbook.Sheets[sheetNames[0]];
          // 解析成二维数组
          const aoa = utils.sheet_to_json(worksheet, { header: 1 });
          // 拆分合并单元格
          if (worksheet['!merges']) {
            worksheet['!merges'].forEach((m) => {
              for (let r = m.s.r; r <= m.e.r; r++) {
                for (let c = m.s.c; c <= m.e.c; c++) {
                  aoa[r][c] = aoa[m.s.r][m.s.c];
                }
              }
            });
          }
          // 生成表格需要的数据
          const list = [];
          let maxCols = 0;
          const title = [];
          aoa.forEach((d) => {
            if (d.length > maxCols) {
              maxCols = d.length;
            }
            const row = {};
            for (let i = 0; i < d.length; i++) {
              row[this.getCharByIndex(i)] = d[i];
            }
            list.push(row);
          });
          for (let i = 0; i < maxCols; i++) {
            title.push(this.getCharByIndex(i));
          }
          this.importTitle = title;
          this.importData = list;
          this.importDataAoa = aoa;
        };
        reader.readAsArrayBuffer(file);
        return false;
      },
      /* 导入本地 excel 文件 */
      importFile3(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = read(data, { type: 'array' });
          const sheetNames = workbook.SheetNames;
          const worksheet = workbook.Sheets[sheetNames[0]];
          // 解析成二维数组
          const aoa = utils.sheet_to_json(worksheet, { header: 1 });
          // 生成表格需要的数据
          const list = [];
          let maxCols = 0;
          const title = [];
          aoa.forEach((d) => {
            if (d.length > maxCols) {
              maxCols = d.length;
            }
            const row = {};
            for (let i = 0; i < d.length; i++) {
              row[this.getCharByIndex(i)] = d[i];
            }
            list.push(row);
          });
          for (let i = 0; i < maxCols; i++) {
            title.push(this.getCharByIndex(i));
          }
          // 记录合并单元格
          if (worksheet['!merges']) {
            worksheet['!merges'].forEach((m) => {
              for (let r = m.s.r; r <= m.e.r; r++) {
                for (let c = m.s.c; c <= m.e.c; c++) {
                  const cc = this.getCharByIndex(c);
                  list[r]['__colspan__' + cc] = 0;
                  list[r]['__rowspan__' + cc] = 0;
                }
              }
              const char = this.getCharByIndex(m.s.c);
              list[m.s.r]['__colspan__' + char] = m.e.c - m.s.c + 1;
              list[m.s.r]['__rowspan__' + char] = m.e.r - m.s.r + 1;
            });
          }
          this.importTitle = title;
          this.importData = list;
          this.importDataAoa = aoa;
        };
        reader.readAsArrayBuffer(file);
        return false;
      },
      /* 生成 Excel 列字母序号 */
      getCharByIndex(index) {
        const chars = [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ];
        if (index < chars.length) {
          return chars[index];
        }
        const n = parseInt(index / chars.length),
          m = index % chars.length;
        return chars[n] + chars[m];
      },
      /* 合并表格单元格 */
      spanMethod({ row, column }) {
        if (!column.label) {
          return [1, 1];
        }
        const r = row['__rowspan__' + column.label],
          c = row['__colspan__' + column.label];
        return [r == null ? 1 : r, c == null ? 1 : c];
      }
    }
  };
</script>
