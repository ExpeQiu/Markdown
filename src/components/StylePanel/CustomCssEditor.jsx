import React from 'react';
import './CustomCssEditor.css';

/**
 * 自定义CSS编辑器组件
 * 允许用户编辑和应用自定义CSS样式
 */
function CustomCssEditor({ value, enabled, onChange, onToggle, onApply }) {
  // 处理CSS文本变更
  const handleCssChange = (e) => {
    onChange(e.target.value);
  };
  
  // 处理启用复选框变更
  const handleToggleChange = (e) => {
    onToggle(e.target.checked);
  };
  
  // 使用一个CSS片段作为placeholder
  const placeholderText = `/* 在此输入您的CSS代码 */
.preview-area h1 {
  color: steelblue;
}`;
  
  return (
    <div className="custom-css-editor">
      <h4>自定义 CSS</h4>
      
      <textarea
        id="custom-css-input"
        value={value}
        onChange={handleCssChange}
        placeholder={placeholderText}
      />
      
      <div className="css-editor-controls">
        <label className="toggle-label">
          <input
            type="checkbox"
            checked={enabled}
            onChange={handleToggleChange}
          />
          <span className="toggle-text">启用自定义CSS</span>
        </label>
        
        <button
          className="apply-css-button"
          onClick={onApply}
          disabled={!value.trim()}
        >
          应用CSS
        </button>
      </div>
      
      <div className="css-editor-help">
        <h5>快速帮助</h5>
        <ul>
          <li>选择器应针对 <code>.preview-area</code> 内的元素</li>
          <li>例: <code>.preview-area h1 {'{'} color: red; {'}'}</code></li>
          <li>尽量避免使用 <code>!important</code></li>
        </ul>
      </div>
    </div>
  );
}

export default CustomCssEditor; 