import React from 'react';
import './MarkdownToolbar.css';

/**
 * Markdown工具栏组件
 * 提供常用Markdown语法快捷按钮
 */
function MarkdownToolbar({ onAction }) {
  // 工具栏按钮配置
  const toolbarButtons = [
    { id: 'bold', label: 'B', title: '粗体 (Ctrl+B)', icon: null },
    { id: 'italic', label: 'I', title: '斜体 (Ctrl+I)', icon: null },
    { id: 'link', label: '🔗', title: '链接 (Ctrl+K)', icon: null },
    { id: 'image', label: '🖼️', title: '图片', icon: null },
    { id: 'ul', label: '•••', title: '无序列表', icon: null },
    { id: 'ol', label: '1.2.3.', title: '有序列表', icon: null },
    { id: 'quote', label: '"', title: '引用', icon: null },
    { id: 'code', label: '`', title: '行内代码', icon: null },
    { id: 'codeblock', label: '</>', title: '代码块', icon: null },
    { id: 'h1', label: 'H1', title: '一级标题', icon: null },
    { id: 'h2', label: 'H2', title: '二级标题', icon: null },
    { id: 'h3', label: 'H3', title: '三级标题', icon: null },
  ];

  // 处理按钮点击
  const handleButtonClick = (actionId) => {
    onAction(actionId);
  };

  return (
    <div className="markdown-toolbar">
      {toolbarButtons.map((button) => (
        <button
          key={button.id}
          className="toolbar-button"
          title={button.title}
          onClick={() => handleButtonClick(button.id)}
        >
          {button.icon || button.label}
        </button>
      ))}
    </div>
  );
}

export default MarkdownToolbar; 