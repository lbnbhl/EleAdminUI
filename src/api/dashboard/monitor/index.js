import axios from '@/utils/request';
const BASE_URL = process.env.BASE_URL;

/**
 * 获取中国地图geo数据
 */
export async function getChinaMapData() {
  const res = await axios.get(BASE_URL + 'json/china-provinces.geo.json', {
    baseURL: ''
  });
  if (res.data) {
    return res.data;
  }
  return Promise.reject(new Error('获取地图数据失败'));
}

/**
 * 获取用户分布数据
 */
export async function getUserCountList() {
  const res = await axios.get(
    'https://cdn.eleadmin.com/20200610/monitor-user-count.json'
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 获取用户浏览器分布数据
 */
export async function getBrowserCountList() {
  const res = await axios.get(
    'https://cdn.eleadmin.com/20200610/monitor-browser-count.json'
  );
  if (res.data.code === 0) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
