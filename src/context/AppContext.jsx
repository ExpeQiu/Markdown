import React, { createContext, useState, useEffect, useContext } from 'react';
import { marked } from 'marked';
import hljs from 'highlight.js';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

// 创建上下文
const AppContext = createContext();

// 默认主题
const DEFAULT_THEME = 'default';

// 预设主题列表
const THEMES = [
  { id: 'default', name: '默认简洁' },
  { id: 'academic', name: '学术风格' },
  { id: 'technical', name: '技术文档' },
  { id: 'dark', name: '暗色模式' },
  { id: 'creative', name: '创意风格' }
];

// 上下文提供者组件
export function AppProvider({ children }) {
  // 文档内容状态
  const [documentContent, setDocumentContent] = useState(
    loadFromLocalStorage('documentContent') || ''
  );
  // 文档标题状态
  const [documentTitle, setDocumentTitle] = useState(
    loadFromLocalStorage('documentTitle') || '我的Markdown文档'
  );
  // 当前激活的主题
  const [activeTheme, setActiveTheme] = useState(
    loadFromLocalStorage('activeTheme') || DEFAULT_THEME
  );
  // 用户自定义CSS
  const [customCSS, setCustomCSS] = useState(
    loadFromLocalStorage('customCSS') || ''
  );
  // 是否启用自定义CSS
  const [enableCustomCSS, setEnableCustomCSS] = useState(
    loadFromLocalStorage('enableCustomCSS') || false
  );
  // 解析后的HTML预览内容
  const [previewHTML, setPreviewHTML] = useState('');
  // 字数统计
  const [wordCount, setWordCount] = useState(0);

  // 配置marked解析器
  useEffect(() => {
    // 配置marked以使用highlight.js高亮代码
    marked.setOptions({
      highlight: function(code, lang) {
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(code, { language: lang }).value;
        }
        return hljs.highlightAuto(code).value;
      },
      breaks: true
    });
  }, []);

  // 当文档内容变化时更新预览和保存至本地存储
  useEffect(() => {
    // 更新预览HTML
    try {
      const html = marked(documentContent);
      setPreviewHTML(html);
    } catch (error) {
      console.error('Markdown解析错误:', error);
      setPreviewHTML('<p>解析出错</p>');
    }

    // 计算字数（简单实现，可以改进）
    const words = documentContent.trim() ? documentContent.trim().split(/\s+/).length : 0;
    setWordCount(words);

    // 保存至本地存储
    saveToLocalStorage('documentContent', documentContent);
  }, [documentContent]);

  // 当标题变化时保存至本地存储
  useEffect(() => {
    saveToLocalStorage('documentTitle', documentTitle);
  }, [documentTitle]);

  // 当主题变化时保存至本地存储
  useEffect(() => {
    saveToLocalStorage('activeTheme', activeTheme);
  }, [activeTheme]);

  // 当自定义CSS变化时保存至本地存储
  useEffect(() => {
    saveToLocalStorage('customCSS', customCSS);
    saveToLocalStorage('enableCustomCSS', enableCustomCSS);
  }, [customCSS, enableCustomCSS]);

  // 提供的上下文值
  const contextValue = {
    // 文档相关
    documentContent,
    setDocumentContent,
    documentTitle,
    setDocumentTitle,
    previewHTML,
    wordCount,
    
    // 主题相关
    activeTheme,
    setActiveTheme,
    themes: THEMES,
    
    // 自定义CSS相关
    customCSS,
    setCustomCSS,
    enableCustomCSS,
    setEnableCustomCSS
  };
  
  // 提供上下文
  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
}

// 自定义Hook以便组件使用上下文
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext必须在AppProvider内使用');
  }
  return context;
} 