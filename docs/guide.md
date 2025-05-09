# 开发指导

## 1. 项目准备

### 1.1 环境搭建
1. 确保已安装Node.js（版本 >= 14.x）和npm（版本 >= 6.x）或yarn（版本 >= 1.22.x）
2. 克隆代码仓库到本地
3. 安装项目依赖：
   ```bash
   npm install
   # 或
   yarn
   ```
4. 创建并配置`.env`文件（见tech.md中的环境变量配置部分）

### 1.2 项目启动
1. 启动开发服务器：
   ```bash
   npm run dev
   # 或
   yarn dev
   ```
2. 访问 http://localhost:3000 查看应用

## 2. 开发流程

### 2.1 分支管理
- `main`：主分支，生产环境代码
- `develop`：开发分支，稳定的开发代码
- `feature/*`：功能分支，用于开发新功能
- `bugfix/*`：修复分支，用于修复问题
- `release/*`：发布分支，用于版本发布准备

### 2.2 提交规范
提交信息应遵循以下格式：
```
<type>(<scope>): <subject>

<body>
```

Type类型：
- `feat`：新功能
- `fix`：修复bug
- `docs`：文档更新
- `style`：代码风格变更（不影响功能）
- `refactor`：重构代码
- `test`：添加或修改测试
- `chore`：构建过程或辅助工具变更

示例：
```
feat(editor): 添加代码块语法高亮支持

- 集成highlight.js实现代码高亮
- 支持20+种常用编程语言
- 提供4种高亮主题切换
```

### 2.3 开发-测试-部署流程
1. 从`develop`分支创建新的功能分支
2. 在功能分支上进行开发
3. 编写测试并确保测试通过
4. 提交代码并创建Pull Request
5. 代码审查通过后合并到`develop`分支
6. 在测试环境验证功能
7. 发布前将`develop`合并到`release`分支进行最终测试
8. 最终测试通过后合并到`main`分支并部署

## 3. 关键功能开发指南

### 3.1 Markdown编辑器实现
1. 使用`react-markdown`或`marked.js`解析Markdown
2. 实现实时预览功能 - 使用防抖优化性能
3. 实现Markdown工具栏按钮
   - 工具栏按钮应支持快捷插入常用Markdown语法
   - 支持选中文本应用格式（如将选中文本加粗）

```javascript
// 示例：实现一个简单的Markdown编辑组件
import { useState, useEffect } from 'react';
import { marked } from 'marked';

// Markdown编辑器组件
function MarkdownEditor() {
  const [markdown, setMarkdown] = useState('# 欢迎使用Markdown编辑器');
  const [html, setHtml] = useState('');
  
  // 更新内容时解析Markdown
  useEffect(() => {
    // 使用防抖优化性能，尤其是对大型文档
    const timeoutId = setTimeout(() => {
      const parsedHtml = marked(markdown);
      setHtml(parsedHtml);
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [markdown]);
  
  // 插入Markdown语法
  const insertMarkdown = (syntax, selectedText = '') => {
    // 根据语法和选中文本构建待插入内容
    // ...具体实现
  };
  
  return (
    <div className="editor-container">
      {/* 工具栏组件 */}
      <MarkdownToolbar onAction={insertMarkdown} />
      
      {/* 编辑区域 */}
      <textarea
        value={markdown}
        onChange={(e) => setMarkdown(e.target.value)}
        className="markdown-input"
      />
      
      {/* 预览区域 */}
      <div 
        className="preview-area"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
```

### 3.2 主题/样式系统实现
1. 创建基础主题CSS（默认主题）
2. 为每个预设主题创建CSS文件
3. 实现主题切换功能
4. 实现自定义CSS功能
   - 提供CSS编辑器
   - 实时应用用户输入的CSS
   - 添加CSS校验以防止危险代码

```javascript
// 示例：主题管理上下文
import { createContext, useState, useContext } from 'react';

// 创建主题上下文
const ThemeContext = createContext();

// 主题提供者组件
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('default');
  const [customCSS, setCustomCSS] = useState('');
  const [isCustomCSSEnabled, setIsCustomCSSEnabled] = useState(false);
  
  // 切换预设主题
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };
  
  // 更新自定义CSS
  const updateCustomCSS = (css) => {
    // 可以在这里添加CSS校验逻辑
    setCustomCSS(css);
  };
  
  // 切换自定义CSS启用状态
  const toggleCustomCSS = () => {
    setIsCustomCSSEnabled(!isCustomCSSEnabled);
  };
  
  return (
    <ThemeContext.Provider 
      value={{ 
        theme, 
        customCSS, 
        isCustomCSSEnabled, 
        changeTheme, 
        updateCustomCSS, 
        toggleCustomCSS 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// 使用主题的Hook
export function useTheme() {
  return useContext(ThemeContext);
}
```

### 3.3 导出功能实现
1. PNG导出
   - 使用html2canvas将预览区域转换为图片
   - 考虑分段渲染处理长文档
2. PDF导出
   - 使用jsPDF生成PDF文档
   - 支持页面大小、方向等配置

```javascript
// 示例：导出功能实现
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

// 导出为PNG
async function exportToPNG(elementToExport) {
  try {
    // 显示加载提示
    showLoadingIndicator('正在生成PNG...');
    
    // 转换HTML为Canvas
    const canvas = await html2canvas(elementToExport, {
      scale: 2, // 提高图片质量
      useCORS: true, // 允许跨域图片
      logging: false,
    });
    
    // 转换Canvas为图片URL
    const imgData = canvas.toDataURL('image/png');
    
    // 触发下载
    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'markdown-export.png';
    link.click();
    
    // 隐藏加载提示
    hideLoadingIndicator();
  } catch (error) {
    console.error('PNG导出失败:', error);
    showError('PNG导出失败，请重试');
  }
}

// 导出为PDF
async function exportToPDF(elementToExport, options = {}) {
  try {
    // 显示加载提示
    showLoadingIndicator('正在生成PDF...');
    
    const { pageSize = 'a4', orientation = 'portrait' } = options;
    
    // 初始化PDF文档
    const pdf = new jsPDF({
      orientation,
      unit: 'mm',
      format: pageSize,
    });
    
    // 转换HTML为Canvas
    const canvas = await html2canvas(elementToExport, {
      scale: 2,
      useCORS: true,
      logging: false,
    });
    
    // 计算PDF页面尺寸
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 30;
    
    // 添加标题
    pdf.setFontSize(16);
    pdf.text('Markdown导出文档', pdfWidth / 2, 20, { align: 'center' });
    
    // 添加图片
    pdf.addImage(imgData, 'JPEG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    
    // 保存PDF
    pdf.save('markdown-export.pdf');
    
    // 隐藏加载提示
    hideLoadingIndicator();
  } catch (error) {
    console.error('PDF导出失败:', error);
    showError('PDF导出失败，请重试');
  }
}
```

## 4. 组件开发规范

### 4.1 组件文件结构
组件应按照以下文件结构组织：

```
/ComponentName
  ├── ComponentName.jsx       # 组件主文件
  ├── ComponentName.module.css # 组件样式
  ├── index.js                # 导出入口
  └── ComponentName.test.jsx  # 组件测试
```

### 4.2 组件代码结构
组件代码应包含以下部分：

```javascript
/**
 * 组件名称
 * 
 * 组件功能描述
 * 
 * @author 开发者姓名
 */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './ComponentName.module.css';

// 组件定义
function ComponentName({ prop1, prop2, ...otherProps }) {
  // 状态定义
  const [state1, setState1] = useState(initialValue);
  
  // 副作用
  useEffect(() => {
    // 处理逻辑
    
    return () => {
      // 清理逻辑
    };
  }, [dependencies]);
  
  // 事件处理函数
  const handleEvent = () => {
    // 处理逻辑
  };
  
  // 渲染辅助函数
  const renderSomething = () => {
    return (
      <div>
        {/* 辅助内容 */}
      </div>
    );
  };
  
  // 主渲染
  return (
    <div className={styles.container} {...otherProps}>
      {/* 组件内容 */}
    </div>
  );
}

// 属性类型定义
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.number,
};

// 默认属性值
ComponentName.defaultProps = {
  prop2: 0,
};

export default ComponentName;
```

### 4.3 样式规范
1. 使用CSS Modules避免样式冲突
2. 使用嵌套选择器组织样式
3. 使用变量管理颜色、尺寸等
4. 遵循BEM命名约定

```css
/* 示例：ComponentName.module.css */
.container {
  /* 容器样式 */
}

.element {
  /* 元素样式 */
}

.element--modifier {
  /* 元素变体样式 */
}

.element__child {
  /* 子元素样式 */
}
```

## 5. 状态管理

采用React Context API管理全局状态，主要状态包括：
1. 文档状态（内容、标题）
2. 主题状态（当前主题、自定义CSS）
3. UI状态（模态框、提示信息）

```javascript
// 状态结构示例
{
  document: {
    title: '未命名文档',
    content: '# 欢迎使用Markdown编辑器',
    isDirty: false
  },
  theme: {
    current: 'default',
    customCSS: '',
    isCustomCSSEnabled: false
  },
  ui: {
    currentModal: null,
    notifications: []
  }
}
```

## 6. 性能优化指南

1. 使用React.memo()优化组件重渲染
2. 使用useMemo()和useCallback()优化计算和事件处理函数
3. 对Markdown解析和预览应用防抖处理
4. 使用虚拟滚动处理大型文档
5. 图片懒加载
6. 代码分割和懒加载非核心组件

示例：
```javascript
// 使用防抖处理Markdown解析
import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash-es';
import { marked } from 'marked';

function useMarkdownParser(markdown) {
  const [html, setHtml] = useState('');
  
  // 使用useCallback缓存解析函数
  const parseMarkdown = useCallback(
    debounce((text) => {
      const parsedHtml = marked(text);
      setHtml(parsedHtml);
    }, 300),
    []
  );
  
  useEffect(() => {
    parseMarkdown(markdown);
  }, [markdown, parseMarkdown]);
  
  return html;
}
```

## 7. 测试指南

### 7.1 单元测试
使用Jest和React Testing Library编写单元测试，测试重点：
1. 组件渲染正确性
2. 组件状态更新
3. 事件处理
4. 工具函数

示例：
```javascript
// 测试工具函数
import { parseMarkdown } from '../utils/markdown';

describe('parseMarkdown', () => {
  it('应正确解析基本的Markdown语法', () => {
    const input = '# 标题\n\n段落';
    const output = parseMarkdown(input);
    expect(output).toContain('<h1>标题</h1>');
    expect(output).toContain('<p>段落</p>');
  });
});

// 测试组件
import { render, screen, fireEvent } from '@testing-library/react';
import MarkdownEditor from '../components/Editor/MarkdownEditor';

describe('MarkdownEditor', () => {
  it('应渲染编辑器和预览区域', () => {
    render(<MarkdownEditor />);
    
    // 检查编辑器存在
    const editor = screen.getByRole('textbox');
    expect(editor).toBeInTheDocument();
    
    // 检查预览区域存在
    const preview = screen.getByTestId('preview-area');
    expect(preview).toBeInTheDocument();
  });
  
  it('编辑内容应更新预览', async () => {
    render(<MarkdownEditor />);
    
    // 获取编辑器并输入内容
    const editor = screen.getByRole('textbox');
    fireEvent.change(editor, { target: { value: '# 测试标题' } });
    
    // 等待预览更新（防抖可能导致延迟）
    await screen.findByText('测试标题');
    
    // 检查预览内容
    const preview = screen.getByTestId('preview-area');
    expect(preview).toContainHTML('<h1>测试标题</h1>');
  });
});
```

### 7.2 端到端测试
使用Cypress编写E2E测试，测试关键用户流程：
1. 创建和编辑文档
2. 应用主题和自定义CSS
3. 导出文档到PNG和PDF

## 8. 发布和部署

### 8.1 构建
1. 优化生产构建：
   ```bash
   npm run build
   # 或
   yarn build
   ```
2. 资源优化
   - 代码压缩与混淆
   - 图片优化
   - 生成source map

### 8.2 部署流程
1. 配置环境变量
2. 运行构建命令
3. 将构建产物部署到目标环境
4. 验证部署结果

### 8.3 持续集成/持续部署
推荐使用GitHub Actions实现CI/CD流程，包括：
1. 运行测试
2. 构建应用
3. 自动部署到测试/生产环境 