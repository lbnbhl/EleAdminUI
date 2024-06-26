/**
 * 页签操作封装
 */
import store from '@/store';
import router from '@/router';
import { Message } from 'element-ui';
import { removeToken } from '@/utils/token-util';
import {
  HOME_PATH,
  LAYOUT_PATH,
  REDIRECT_PATH,
  REPEATABLE_TABS
} from '@/config/setting';
const HOME_ROUTE = HOME_PATH || LAYOUT_PATH;
const BASE_URL = process.env.BASE_URL;

/**
 * 刷新当前路由
 */
export function reloadPageTab(option) {
  if (!option) {
    // 刷新当前路由
    const { path, fullPath, query } = router.currentRoute;
    if (path.includes(REDIRECT_PATH)) {
      return;
    }
    const isHome = isHomeRoute(router.currentRoute);
    setRouteReload({
      reloadHome: isHome,
      reloadPath: isHome ? void 0 : fullPath
    }).then(() => {
      router.replace({
        path: REDIRECT_PATH + path,
        query
      });
    });
  } else {
    // 刷新指定页签
    const { fullPath, isHome } = option;
    setRouteReload({
      reloadHome: isHome,
      reloadPath: isHome ? void 0 : fullPath
    });
    router.replace(REDIRECT_PATH + fullPath);
  }
}

/**
 * 关闭当前页签
 */
export function finishPageTab() {
  const { path, fullPath, meta } = router.currentRoute;
  const isUnique = meta.tabUnique === false || REPEATABLE_TABS.includes(path);
  const key = isUnique ? fullPath : path;
  removePageTab({ key, active: key });
}

/**
 * 关闭页签
 * @param key 页签的key
 * @param active 选中页签的key
 */
export function removePageTab(option) {
  store
    .dispatch('theme/tabRemove', option)
    .then(({ path, home }) => {
      if (path) {
        router.push(path);
      } else if (home) {
        router.push(HOME_ROUTE);
      }
    })
    .catch(() => {
      Message.error('当前页签不可关闭');
    });
}

/**
 * 关闭左侧页签
 */
export function removeLeftPageTab(option) {
  store
    .dispatch('theme/tabRemoveLeft', option)
    .then(({ path }) => {
      if (path) {
        router.push(path);
      }
    })
    .catch(() => {
      Message.error('左侧没有可关闭的页签');
    });
}

/**
 * 关闭右侧页签
 */
export function removeRightPageTab(option) {
  store
    .dispatch('theme/tabRemoveRight', option)
    .then(({ path, home }) => {
      if (path) {
        router.push(path);
      } else if (home) {
        router.push(HOME_ROUTE);
      }
    })
    .catch(() => {
      Message.error('右侧没有可关闭的页签');
    });
}

/**
 * 关闭其它页签
 */
export function removeOtherPageTab(option) {
  store
    .dispatch('theme/tabRemoveOther', option)
    .then(({ path, home }) => {
      if (path) {
        router.push(path);
      } else if (home) {
        router.push(HOME_ROUTE);
      }
    })
    .catch(() => {
      Message.error('没有可关闭的页签');
    });
}

/**
 * 关闭全部页签
 * @param active 当前选中页签
 */
export function removeAllPageTab(active) {
  store
    .dispatch('theme/tabRemoveAll', active)
    .then(({ home }) => {
      if (home) {
        router.push(HOME_ROUTE);
      }
    })
    .catch(() => {
      Message.error('没有可关闭的页签');
    });
}

/**
 * 登录成功后清空页签
 */
export function cleanPageTabs() {
  store.dispatch('theme/setTabs', []);
}

/**
 * 添加页签
 * @param data 页签数据
 */
export function addPageTab(data) {
  store.dispatch('theme/tabAdd', data);
}

/**
 * 修改页签
 * @param data 页签数据
 */
export function setPageTab(data) {
  store.dispatch('theme/tabSetItem', data);
}

/**
 * 设置主页的组件名称
 * @param components 组件名称
 */
export function setHomeComponents(components) {
  store.dispatch('theme/setHomeComponents', components);
}

/**
 * 设置路由刷新信息
 * @param option 路由刷新参数
 */
export function setRouteReload(option) {
  return store.dispatch('theme/setRouteReload', option);
}

/**
 * 判断路由是否是主页
 * @param route 路由信息
 */
export function isHomeRoute(route) {
  const { path, matched } = route;
  if (HOME_ROUTE === path) {
    return true;
  }
  return (
    matched[0] &&
    matched[0].path === LAYOUT_PATH &&
    matched[0].redirect === path
  );
}

/**
 * 登录成功后跳转首页
 * @param from 登录前的地址
 */
export function goHomeRoute(from) {
  router.replace(from || HOME_ROUTE);
}

/**
 * 退出登录
 * @param from 是否使用路由跳转
 * @param from 登录后跳转的地址
 */
export function logout(route, from) {
  removeToken();
  if (route) {
    router.push({
      path: '/login',
      query: from ? { from } : null
    });
  } else {
    // 这样跳转避免再次登录重复注册动态路由
    location.replace(BASE_URL + 'login' + (from ? '?from=' + from : ''));
  }
}
