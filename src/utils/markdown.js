/**
 * Markdown工具函数
 * 提供Markdown相关的工具方法
 */

/**
 * 在文本选择位置插入Markdown标记
 * @param {string} text - 原始文本内容
 * @param {number} selectionStart - 选择开始位置
 * @param {number} selectionEnd - 选择结束位置
 * @param {string} markdownBefore - 插入选择内容前的标记
 * @param {string} markdownAfter - 插入选择内容后的标记
 * @param {string} defaultText - 没有选择内容时的默认文本
 * @returns {Object} 包含新文本和新光标位置的对象
 */
export function insertMarkdown(text, selectionStart, selectionEnd, markdownBefore, markdownAfter, defaultText) {
  // 如果没有后标记，使用空字符串
  markdownAfter = markdownAfter || '';
  
  // 获取选中的文本
  const selectedText = text.substring(selectionStart, selectionEnd);
  
  // 确定要插入的文本
  const insertion = selectedText || defaultText;
  
  // 创建新文本，在选中部分前后添加Markdown标记
  const newText = 
    text.substring(0, selectionStart) + 
    markdownBefore + 
    insertion + 
    markdownAfter + 
    text.substring(selectionEnd);
  
  // 计算新的光标位置
  let newPosition;
  if (selectedText) {
    // 如果有选中文本，将光标定位到标记后
    newPosition = selectionStart + markdownBefore.length + selectedText.length + markdownAfter.length;
  } else {
    // 如果没有选中文本，将光标定位到默认文本中间
    newPosition = selectionStart + markdownBefore.length + defaultText.length;
  }
  
  return {
    text: newText,
    cursorPosition: newPosition
  };
}

/**
 * 处理不同Markdown格式的插入
 * @param {string} text - 原始文本
 * @param {number} selectionStart - 选择开始位置
 * @param {number} selectionEnd - 选择结束位置
 * @param {string} format - 要插入的格式类型
 * @returns {Object} 包含新文本和新光标位置的对象
 */
export function handleMarkdownInsert(text, selectionStart, selectionEnd, format) {
  let result;
  
  switch (format) {
    case 'bold':
      result = insertMarkdown(text, selectionStart, selectionEnd, '**', '**', '粗体文本');
      break;
      
    case 'italic':
      result = insertMarkdown(text, selectionStart, selectionEnd, '*', '*', '斜体文本');
      break;
      
    case 'link':
      result = insertMarkdown(text, selectionStart, selectionEnd, '[', '](链接地址)', '链接文本');
      break;
      
    case 'image':
      result = insertMarkdown(text, selectionStart, selectionEnd, '![', '](图片地址)', '图片描述');
      break;
      
    case 'code':
      result = insertMarkdown(text, selectionStart, selectionEnd, '`', '`', '代码');
      break;
      
    case 'codeblock':
      result = insertMarkdown(text, selectionStart, selectionEnd, '```\n', '\n```', '代码块');
      break;
      
    case 'quote':
      // 引用需要在每行前添加>，这里简化处理
      result = insertMarkdown(text, selectionStart, selectionEnd, '> ', '', '引用文本');
      break;
      
    case 'ul':
      // 无序列表，简化处理
      result = insertMarkdown(text, selectionStart, selectionEnd, '- ', '', '列表项');
      break;
      
    case 'ol':
      // 有序列表，简化处理
      result = insertMarkdown(text, selectionStart, selectionEnd, '1. ', '', '列表项');
      break;
      
    case 'h1':
      result = insertMarkdown(text, selectionStart, selectionEnd, '# ', '', '一级标题');
      break;
      
    case 'h2':
      result = insertMarkdown(text, selectionStart, selectionEnd, '## ', '', '二级标题');
      break;
      
    case 'h3':
      result = insertMarkdown(text, selectionStart, selectionEnd, '### ', '', '三级标题');
      break;
      
    default:
      // 如果没有匹配的格式，返回原文本
      result = { text, cursorPosition: selectionEnd };
  }
  
  return result;
}

/**
 * 检测输入文本中的Markdown语法错误（简化版）
 * @param {string} text - 要检查的Markdown文本
 * @returns {Array} 错误列表，如果没有错误则为空数组
 */
export function detectMarkdownErrors(text) {
  const errors = [];
  
  // 检查未闭合的代码块
  const codeBlockMatches = text.match(/```/g);
  if (codeBlockMatches && codeBlockMatches.length % 2 !== 0) {
    errors.push({ 
      type: 'unclosed_code_block',
      message: '存在未闭合的代码块 (```)' 
    });
  }
  
  // 检查未闭合的链接
  const linkOpenCount = (text.match(/\[/g) || []).length;
  const linkCloseCount = (text.match(/\]/g) || []).length;
  if (linkOpenCount !== linkCloseCount) {
    errors.push({ 
      type: 'unclosed_bracket',
      message: '存在未闭合的方括号 []' 
    });
  }
  
  // 检查未闭合的粗体/斜体标记
  const asteriskCount = (text.match(/\*/g) || []).length;
  if (asteriskCount % 2 !== 0) {
    errors.push({ 
      type: 'unclosed_emphasis',
      message: '存在未闭合的强调标记 (*)' 
    });
  }
  
  return errors;
} 