# MarkCraft - 在线Markdown编辑工具

![版本](https://img.shields.io/badge/版本-1.0.0-blue)
![协议](https://img.shields.io/badge/协议-MIT-green)

MarkCraft是一款功能强大、界面友好的在线Markdown编辑工具，专注于提供流畅的编辑体验、丰富的主题选项和便捷的导出功能。

## 功能特点

### 编辑体验
- ✨ 流畅的Markdown编辑与实时预览
- 🔧 全面支持CommonMark规范的Markdown语法
- 🛠️ 便捷的Markdown工具栏，快速插入格式
- 🎨 代码块语法高亮支持

### 主题与样式
- 🌈 多种精美预设主题（默认、学术、技术文档、暗色等）
- 🔍 实时主题预览，一键切换
- 📝 自定义CSS编辑，个性化定制文档样式

### 导出功能
- 📊 支持导出为高质量PNG图片
- 📄 支持导出为PDF文档，可配置页面大小和方向
- 🖨️ 文档排版与预览保持一致

### 其他特性
- 💾 自动保存到浏览器本地存储
- 📱 响应式设计，适应不同屏幕尺寸

## 快速开始

### 在线使用
访问[https://markcraft.example.com](https://markcraft.example.com)（示例链接）即可开始使用，无需安装任何软件。

### 本地安装部署

#### 前置条件
- Node.js 14.x或更高版本
- npm 6.x或更高版本（或yarn 1.22.x+）

#### 安装步骤

1. 克隆代码仓库
   ```bash
   git clone https://github.com/example/markcraft.git
   cd markcraft
   ```

2. 安装依赖
   ```bash
   npm install
   # 或
   yarn
   ```

3. 创建环境配置文件
   ```bash
   cp .env.example .env
   ```

4. 启动开发服务器
   ```bash
   npm run dev
   # 或
   yarn dev
   ```

5. 访问开发服务器
   打开浏览器访问 http://localhost:3000

#### 生产环境构建

1. 构建生产版本
   ```bash
   npm run build
   # 或
   yarn build
   ```

2. 启动生产服务器（可选）
   ```bash
   npm run start
   # 或
   yarn start
   ```

## 使用指南

### 基本操作

#### 创建和编辑文档
1. 打开应用后，会自动创建一个新文档
2. 在左侧编辑区使用Markdown语法编写内容
3. 右侧预览区会实时显示渲染后的效果

#### 使用Markdown工具栏
点击编辑器上方的工具栏按钮可以快速插入常用的Markdown语法：
- 标题（H1-H3）
- 格式（粗体、斜体、删除线）
- 列表（有序、无序）
- 链接和图片
- 代码块和引用

#### 应用主题
1. 在右侧样式面板中，切换到"主题模板"标签
2. 点击选择预设主题
3. 预览区会立即应用所选主题样式

#### 自定义CSS
1. 在右侧样式面板中，切换到"自定义CSS"标签
2. 在文本区域输入自定义CSS代码
3. 勾选"启用自定义CSS"复选框
4. 点击"应用CSS"按钮，预览区将应用您的样式

#### 导出文档
1. 点击页面顶部的"导出"按钮
2. 在弹出的导出对话框中，选择导出格式（PNG或PDF）
3. 根据选择的格式配置相应选项：
   - PNG：选择图片质量
   - PDF：选择纸张大小（A4、Letter等）和方向（纵向、横向）
4. 点击"确认导出"按钮
5. 文件将自动下载到您的设备上

### 快捷键

| 功能 | Windows/Linux | macOS |
|------|--------------|-------|
| 保存 | Ctrl+S | ⌘+S |
| 粗体 | Ctrl+B | ⌘+B |
| 斜体 | Ctrl+I | ⌘+I |
| 链接 | Ctrl+K | ⌘+K |
| 代码块 | Ctrl+Shift+C | ⌘+Shift+C |
| 预览切换 | Ctrl+P | ⌘+P |

### Markdown语法参考

#### 标题
```markdown
# 一级标题
## 二级标题
### 三级标题
```

#### 文本格式
```markdown
**粗体文本**
*斜体文本*
~~删除线文本~~
```

#### 列表
```markdown
- 无序列表项
- 另一个无序列表项

1. 有序列表项
2. 另一个有序列表项
```

#### 链接和图片
```markdown
[链接文本](https://example.com)
![图片替代文本](https://example.com/image.jpg)
```

#### 代码
```markdown
`行内代码`

```javascript
// 代码块
function hello() {
  console.log("Hello World");
}
```

#### 表格
```markdown
| 表头1 | 表头2 |
|-------|-------|
| 单元格1 | 单元格2 |
| 单元格3 | 单元格4 |
```

#### 引用
```markdown
> 这是一个引用段落
```

## 常见问题

### 我的文档会自动保存吗？
是的，您的文档内容会自动保存在浏览器的本地存储中。刷新页面或关闭后重新打开，您的内容会被恢复。

### 导出的PDF中图片不显示？
请确保您的图片使用的是绝对URL路径，或者已上传到可公开访问的图床。相对路径的图片在PDF导出中可能无法正确显示。

### 如何使用自定义字体？
在自定义CSS中，您可以使用`@font-face`规则导入自定义字体，或者使用Google Fonts等web字体服务：

```css
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');

.preview-area {
  font-family: 'Roboto', sans-serif;
}
```

### 支持哪些编程语言的语法高亮？
我们支持大多数常用编程语言的语法高亮，包括但不限于：JavaScript, Python, Java, C++, Ruby, PHP, HTML, CSS, Bash等。

## 浏览器兼容性

MarkCraft支持所有现代浏览器的最新版本：
- Google Chrome
- Mozilla Firefox
- Apple Safari
- Microsoft Edge

## 贡献指南

我们欢迎社区贡献！如果您发现问题或有改进建议，请通过以下方式参与：

1. 提交Issue：报告bug或提出功能建议
2. 提交Pull Request：贡献代码或文档改进

在提交PR前，请确保：
- 代码符合项目的编码规范
- 添加了必要的测试
- 更新了相关文档

## 版权和许可

本项目采用MIT许可证。详情请参阅[LICENSE](LICENSE)文件。

## 致谢

MarkCraft使用了以下开源项目：
- [React](https://reactjs.org/)
- [marked.js](https://marked.js.org/)
- [highlight.js](https://highlightjs.org/)
- [html2canvas](https://html2canvas.hertzen.com/)
- [jsPDF](https://github.com/MrRio/jsPDF)

---

© 2023 MarkCraft Team. All rights reserved. 