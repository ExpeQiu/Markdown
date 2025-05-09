import React from 'react';
import './ThemeSelector.css';

/**
 * 主题选择器组件
 * 显示并允许用户选择不同的主题
 */
function ThemeSelector({ themes, activeTheme, onThemeSelect }) {
  return (
    <div className="theme-selector">
      <h4>选择主题</h4>
      <div className="theme-list">
        {themes.map((theme) => (
          <div
            key={theme.id}
            className={`theme-item ${activeTheme === theme.id ? 'selected' : ''}`}
            onClick={() => onThemeSelect(theme.id)}
          >
            {theme.name}
          </div>
        ))}
      </div>
      
      <div className="theme-preview">
        <p className="theme-preview-text">
          当前主题: <strong>{themes.find(t => t.id === activeTheme)?.name || '默认'}</strong>
        </p>
      </div>
    </div>
  );
}

export default ThemeSelector; 