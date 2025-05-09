import React, { useState, useRef } from 'react';
import './MarkdownToolbar.css';

/**
 * Markdown工具栏组件
 * 提供常用Markdown语法快捷按钮
 */
function MarkdownToolbar({ onAction }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  // 工具栏按钮配置
  const toolbarButtons = [
    { id: 'heading', label: 'H', title: '标题', icon: null },
    { id: 'bold', label: 'B', title: '粗体 (Ctrl+B)', icon: null },
    { id: 'italic', label: 'I', title: '斜体 (Ctrl+I)', icon: null },
    { id: 'underline', label: 'U', title: '下划线', icon: null },
    { id: 'strikethrough', label: 'S', title: '删除线', icon: null },
    { id: 'link', label: '🔗', title: '链接 (Ctrl+K)', icon: null },
    { id: 'image', label: '🖼️', title: '图片', icon: null },
    { id: 'ul', label: '•••', title: '无序列表', icon: null },
    { id: 'ol', label: '1.2.3.', title: '有序列表', icon: null },
    { id: 'table', label: '⊞', title: '表格', icon: null },
    { id: 'quote', label: '"', title: '引用', icon: null },
    { id: 'code', label: '`', title: '行内代码', icon: null },
    { id: 'codeblock', label: '</>', title: '代码块', icon: null },
    { id: 'h1', label: 'H1', title: '一级标题', icon: null },
    { id: 'h2', label: 'H2', title: '二级标题', icon: null },
    { id: 'h3', label: 'H3', title: '三级标题', icon: null },
    { id: 'emoji', label: '😊', title: '插入表情', icon: null },
    { id: 'uploadImage', label: '📷', title: '上传本地图片', icon: null },
    { id: 'ai', label: 'AI', title: 'AI 辅助', icon: null },
  ];

  // 常用表情列表
  const commonEmojis = [
    '😊', '😂', '🤣', '❤️', '👍', '🎉', '🔥', '⭐', 
    '🙏', '👏', '🤔', '😍', '🥰', '😘', '😎', '🤩',
    '😢', '😭', '😤', '😠', '😡', '🤯', '😴', '🥺',
    '🤗', '🤫', '🤐', '🤢', '🤮', '🤧', '😷', '🤒',
  ];

  // 处理按钮点击
  const handleButtonClick = (actionId) => {
    if (actionId === 'emoji') {
      setShowEmojiPicker(!showEmojiPicker);
    } else if (actionId === 'uploadImage') {
      // 触发文件选择框点击
      fileInputRef.current.click();
    } else {
      onAction(actionId);
    }
  };

  // 处理表情选择
  const handleEmojiSelect = (emoji) => {
    onAction('insertEmoji', emoji);
    setShowEmojiPicker(false);
  };

  // 处理本地图片上传
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 创建临时 URL
      const imageUrl = URL.createObjectURL(file);
      onAction('insertLocalImage', imageUrl, file.name);
      
      // 重置 input，便于下次选择同一文件
      e.target.value = '';
    }
  };

  return (
    <div className="markdown-toolbar">
      {toolbarButtons.map((button) => (
        <button
          key={button.id}
          className={`toolbar-button ${button.id === 'emoji' && showEmojiPicker ? 'active' : ''}`}
          title={button.title}
          onClick={() => handleButtonClick(button.id)}
        >
          {button.icon || button.label}
        </button>
      ))}

      {/* 隐藏的文件上传 input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        accept="image/*" 
        onChange={handleImageUpload} 
      />

      {/* 表情选择面板 */}
      {showEmojiPicker && (
        <div className="emoji-picker">
          {commonEmojis.map((emoji, index) => (
            <button 
              key={index} 
              className="emoji-item" 
              onClick={() => handleEmojiSelect(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default MarkdownToolbar; 