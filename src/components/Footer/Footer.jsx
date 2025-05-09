import React from 'react';
import { useAppContext } from '../../context/AppContext';
import './Footer.css';

/**
 * 页脚组件
 * 显示字数统计和状态信息
 */
function Footer() {
  const { wordCount } = useAppContext();
  
  return (
    <footer className="app-footer">
      <span id="word-count">字数: {wordCount}</span>
      <span className="separator">|</span>
      <span id="status-message">就绪</span>
    </footer>
  );
}

export default Footer; 