import { useRef, useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { handleMarkdownInsert } from '../../utils/markdown';
import MarkdownToolbar from './MarkdownToolbar';
import './EditorPane.css';

/**
 * Markdown编辑器组件
 * 提供文本编辑区域和Markdown工具栏
 */
function EditorPane() {
  const { documentContent, setDocumentContent } = useAppContext();
  const textareaRef = useRef(null);
  const [localImages, setLocalImages] = useState([]);
  
  // 处理文本更改
  const handleContentChange = (e) => {
    setDocumentContent(e.target.value);
  };
  
  // 处理Markdown工具栏按钮点击
  const handleToolbarAction = (action, param1, param2) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // 调用工具函数处理Markdown标记插入
    const result = handleMarkdownInsert(
      documentContent, 
      start, 
      end, 
      action,
      param1,
      param2
    );
    
    // 如果是插入本地图片，保存到本地状态
    if (action === 'insertLocalImage' && param1) {
      const newImage = {
        id: Date.now(),
        url: param1,
        name: param2 || '未命名图片'
      };
      setLocalImages([...localImages, newImage]);
    }
    
    // 更新文本内容
    setDocumentContent(result.text);
    
    // 重新获取焦点并设置新的光标位置
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(result.cursorPosition, result.cursorPosition);
    }, 0);
  };
  
  // 处理Tab键，插入两个空格而不是切换焦点
  const handleKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      // 在光标位置插入两个空格
      const newText = 
        documentContent.substring(0, start) + 
        '  ' + 
        documentContent.substring(end);
      
      setDocumentContent(newText);
      
      // 设置新的光标位置
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  // 组件卸载时清理本地图片 URL
  useEffect(() => {
    return () => {
      // 清理所有创建的临时图片 URL
      localImages.forEach(image => {
        URL.revokeObjectURL(image.url);
      });
    };
  }, [localImages]);
  
  return (
    <section className="editor-pane">
      <MarkdownToolbar onAction={handleToolbarAction} />
      
      <textarea
        id="markdown-input"
        ref={textareaRef}
        value={documentContent}
        onChange={handleContentChange}
        onKeyDown={handleKeyDown}
        placeholder="在此输入Markdown文本..."
        spellCheck="false"
      />
    </section>
  );
}

export default EditorPane; 