<!-- 搜索表单 -->
<template>
  <el-form
    label-width="77px"
    class="ele-form-search"
    @keyup.enter.native="search"
    @submit.native.prevent
  >
    <el-row :gutter="15">
      <el-col :lg="6" :md="12">
        <el-form-item label="用户账号:">
          <el-input v-model="where.username" placeholder="请输入" clearable />
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-form-item label="用户名:">
          <el-input v-model="where.nickname" placeholder="请输入" clearable />
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12">
        <el-form-item label="登录时间:">
          <el-date-picker
            v-model="dateRange"
            type="datetimerange"
            :picker-options="pickerOptions"
            unlink-panels
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            class="ele-fluid"
          />
        </el-form-item>
      </el-col>
      <el-col :lg="6" :md="12">
        <div class="ele-form-actions">
          <el-button
            type="primary"
            @click="search"
            icon="el-icon-search"
            class="ele-btn-icon"
          >
            查询
          </el-button>
          <el-button @click="reset">重置</el-button>
        </div>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
  const DEFAULT_WHERE = {
    username: '',
    nickname: ''
  };

  export default {
    name: 'LoginRecordSearch',
    data() {
      return {
        // 表单数据
        where: { ...DEFAULT_WHERE },
        // 日期范围选择
        dateRange: [],
        // 日期时间选择器快捷项
        pickerOptions: {
          shortcuts: [
            {
              text: '最近一周',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近一个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                picker.$emit('pick', [start, end]);
              }
            },
            {
              text: '最近三个月',
              onClick(picker) {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                picker.$emit('pick', [start, end]);
              }
            }
          ]
        }
      };
    },
    methods: {
      /* 搜索 */
      search() {
        const [d1, d2] = this.dateRange ?? [];
        this.$emit('search', {
          ...this.where,
          createTimeStart: d1 ? d1 + ' 00:00:00' : '',
          createTimeEnd: d2 ? d2 + ' 23:59:59' : ''
        });
      },
      /*  重置 */
      reset() {
        this.where = { ...DEFAULT_WHERE };
        this.dateRange = [];
        this.search();
      }
    }
  };
</script>
