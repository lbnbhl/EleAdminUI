/**
 * 简体中文
 */
export default {
  // 菜单路由
  route: {
    dashboard: {
      _name: 'Dashboard',
      workplace: { _name: '工作台' },
      analysis: { _name: '分析页' },
      monitor: { _name: '监控页' }
    },
    system: {
      _name: '系统管理',
      user: {
        _name: '用户管理'
      },
      role: { _name: '角色管理' },
      menu: { _name: '菜单管理' },
      dictionary: { _name: '字典管理' },
      organization: { _name: '机构管理' },
      loginRecord: { _name: '登录日志' },
      operationRecord: { _name: '操作日志' },
      file: { _name: '文件管理' },
      userInfo: { _name: '' }
    },
    form: {
      _name: '表单页面',
      basic: { _name: '基础表单' },
      advanced: { _name: '复杂表单' },
      step: { _name: '分步表单' }
    },
    list: {
      _name: '列表页面',
      basic: { _name: '基础列表' },
      advanced: { _name: '复杂列表' },
      card: {
        _name: '卡片列表',
        project: { _name: '项目列表' },
        application: { _name: '应用列表' },
        article: { _name: '文章列表' }
      },
      userInfo: {
        ':id': { _name: '' }
      }
    },
    result: {
      _name: '结果页面',
      success: { _name: '成功页' },
      fail: { _name: '失败页' }
    },
    exception: {
      _name: '异常页面',
      403: { _name: '403' },
      404: { _name: '404' },
      500: { _name: '500' }
    },
    user: {
      _name: '个人中心',
      profile: { _name: '个人资料' },
      message: { _name: '我的消息' }
    },
    extension: {
      _name: '扩展组件',
      icon: { _name: '图标扩展' },
      tag: { _name: '标签组件' },
      dialog: { _name: '拖拽弹窗' },
      file: { _name: '文件列表' },
      upload: { _name: '图片上传' },
      dragsort: { _name: '拖拽排序' },
      message: { _name: '消息提示' },
      regions: { _name: '城市选择' },
      printer: { _name: '打印插件' },
      excel: { _name: 'excel插件' },
      countUp: { _name: '滚动数字' },
      empty: { _name: '空状态' },
      steps: { _name: '步骤条' },
      menu: { _name: '菜单导航' },
      treeSelect: { _name: '树形下拉' },
      tableSelect: { _name: '表格下拉' },
      player: { _name: '视频播放' },
      map: { _name: '地图组件' },
      qrCode: { _name: '二维码' },
      barCode: { _name: '条形码' },
      editor: { _name: '富文本框' },
      markdown: { _name: 'markdown' }
    },
    example: {
      _name: '常用实例',
      table: { _name: '表格实例' },
      menuBadge: { _name: '菜单徽章' },
      eleadmin: { _name: '内嵌页面' },
      eleadminDoc: { _name: '内嵌文档' },
      choose: { _name: '批量选择' },
      document: { _name: '案卷调整' }
    },
    'https://eleadminCom/goods/8': { _name: '获取授权' }
  },
  // 外层布局
  layout: {
    home: '主页',
    header: {
      profile: '个人中心',
      password: '修改密码',
      logout: '退出登录'
    },
    footer: {
      website: '官网',
      document: '文档',
      authorization: '授权',
      copyright: 'Copyright © 2022 武汉易云智科技有限公司'
    },
    logout: {
      title: '提示',
      message: '确定要退出登录吗?'
    },
    // 设置抽屉
    setting: {
      title: '整体风格设置',
      sideStyles: {
        dark: '暗色侧边栏',
        light: '亮色侧边栏'
      },
      headStyles: {
        light: '亮色顶栏',
        dark: '暗色顶栏',
        primary: '主色顶栏'
      },
      layoutStyles: {
        side: '左侧菜单布局',
        top: '顶部菜单布局',
        mix: '混合菜单布局'
      },
      colors: {
        default: '拂晓蓝',
        dust: '薄暮',
        sunset: '日暮',
        volcano: '火山',
        purple: '酱紫',
        cyan: '明青',
        green: '极光绿',
        geekblue: '极客蓝'
      },
      darkMode: '开启暗黑模式',
      layoutStyle: '导航模式',
      sideMenuStyle: '侧栏双排菜单',
      bodyFull: '内容区域铺满',
      other: '其它配置',
      fixedHeader: '固定顶栏区域',
      fixedSidebar: '固定侧栏区域',
      fixedBody: '固定主体区域',
      logoAutoSize: 'Logo适应宽度',
      colorfulIcon: '侧栏彩色图标',
      sideUniqueOpen: '侧栏排他展开',
      weakMode: '开启色弱模式',
      showFooter: '开启全局页脚',
      showTabs: '开启多页签栏',
      tabStyle: '页签显示风格',
      tabStyles: {
        default: '默认',
        dot: '圆点',
        card: '卡片'
      },
      transitionName: '路由切换动画',
      transitions: {
        slideRight: '滑动消退',
        slideBottom: '底部消退',
        zoomIn: '放大渐变',
        zoomOut: '缩小渐变',
        fade: '淡入淡出'
      },
      reset: '重置',
      tips: '该功能可实时预览各种布局效果, 修改后会缓存在本地, 下次打开会记忆主题配置.'
    }
  },
  // 登录界面
  login: {
    title: '用户登录',
    username: '请输入登录账号',
    password: '请输入登录密码',
    code: '请输入验证码',
    remember: '记住密码',
    forget: '忘记密码',
    login: '登录',
    loading: '登录中'
  },
  // 基础列表
  list: {
    basic: {
      table: {
        avatar: '头像',
        username: '用户账号',
        nickname: '用户名',
        organizationName: '组织机构',
        phone: '手机号',
        sexName: '性别',
        createTime: '创建时间',
        status: '状态',
        action: '操作'
      }
    }
  }
};
