/**
 * 本地存储工具函数
 * 提供保存数据到localStorage和从localStorage读取数据的功能
 */

// 存储前缀，用以隔离本应用的存储内容
const STORAGE_PREFIX = 'markdown_editor_';

/**
 * 保存数据到localStorage
 * @param {string} key - 存储键名
 * @param {any} value - 存储的值（会被JSON.stringify序列化）
 */
export function saveToLocalStorage(key, value) {
  try {
    // 使用前缀避免命名冲突
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    // 序列化值为JSON字符串
    const serializedValue = JSON.stringify(value);
    // 保存到localStorage
    localStorage.setItem(prefixedKey, serializedValue);
  } catch (error) {
    // 捕获可能的错误（如存储已满、隐私模式等）
    console.error('保存到localStorage失败:', error);
  }
}

/**
 * 从localStorage读取数据
 * @param {string} key - 存储键名
 * @param {any} defaultValue - 如果没有找到数据，返回的默认值
 * @returns {any} 存储的值或默认值
 */
export function loadFromLocalStorage(key, defaultValue = null) {
  try {
    // 使用前缀获取键名
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    // 获取序列化的值
    const serializedValue = localStorage.getItem(prefixedKey);
    
    // 如果值不存在，返回默认值
    if (serializedValue === null) {
      return defaultValue;
    }
    
    // 反序列化值
    return JSON.parse(serializedValue);
  } catch (error) {
    // 捕获可能的错误（如数据格式错误）
    console.error('从localStorage读取失败:', error);
    // 出错时返回默认值
    return defaultValue;
  }
}

/**
 * 从localStorage移除数据
 * @param {string} key - 存储键名
 */
export function removeFromLocalStorage(key) {
  try {
    // 使用前缀获取键名
    const prefixedKey = `${STORAGE_PREFIX}${key}`;
    // 从localStorage移除
    localStorage.removeItem(prefixedKey);
  } catch (error) {
    console.error('从localStorage移除失败:', error);
  }
}

/**
 * 清除本应用在localStorage中的所有数据
 */
export function clearAppLocalStorage() {
  try {
    // 获取所有localStorage的键
    const keys = Object.keys(localStorage);
    
    // 遍历所有键，删除以应用前缀开头的项
    keys.forEach(key => {
      if (key.startsWith(STORAGE_PREFIX)) {
        localStorage.removeItem(key);
      }
    });
  } catch (error) {
    console.error('清除localStorage失败:', error);
  }
} 