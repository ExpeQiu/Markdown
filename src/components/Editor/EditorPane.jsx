import { useRef, useEffect } from 'react';
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
  
  // 处理文本更改
  const handleContentChange = (e) => {
    setDocumentContent(e.target.value);
  };
  
  // 处理Markdown工具栏按钮点击
  const handleToolbarAction = (action) => {
    if (!textareaRef.current) return;
    
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    
    // 调用工具函数处理Markdown标记插入
    const result = handleMarkdownInsert(
      documentContent, 
      start, 
      end, 
      action
    );
    
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