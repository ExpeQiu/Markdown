# 技术文档

## 1. 技术栈选择

### 1.1 前端技术栈
- **框架**：React.js
- **状态管理**：React Context API 或 Redux
- **路由**：React Router
- **UI组件库**：无第三方组件库，自定义设计实现
- **Markdown解析**：marked.js
- **代码高亮**：highlight.js
- **样式方案**：CSS Modules
- **导出功能**：
  - PDF生成：jsPDF
  - PNG生成：html2canvas
- **构建工具**：Vite 或 Create React App

### 1.2 后端技术栈
- **服务器**：Node.js + Express
- **数据库**：不涉及（本地存储）
- **文件存储**：localStorage/IndexedDB（本地存储）

### 1.3 开发工具
- **版本控制**：Git
- **包管理**：npm 或 yarn
- **代码质量**：ESLint, Prettier
- **单元测试**：Jest
- **E2E测试**：Cypress

## 2. 系统架构

### 2.1 整体架构
本项目采用前端重、后端轻的架构设计。主要功能在前端实现，后端主要负责(可选)用户认证和文件导出服务。

```
+----------------------+     +---------------------+
|                      |     |                     |
|   Browser            |     |   Backend Server    |
|                      |     |   (Optional)        |
|   +---------------+  |     |                     |
|   |               |  |     |   +-------------+   |
|   |  React App    |  |     |   |             |   |
|   |               |  |     |   |  Express    |   |
|   |  - UI         |  |     |   |  API        |   |
|   |  - Markdown   |<------>|   |  - Export   |   |
|   |    Editing    |  |     |   |  - Auth     |   |
|   |  - Styling    |  |     |   |             |   |
|   |  - Preview    |  |     |   +-------------+   |
|   |               |  |     |                     |
|   +---------------+  |     +---------------------+
|                      |
+----------------------+
```

### 2.2 前端架构
采用组件化设计，主要组件包括：

- **App**：顶层组件，管理全局状态和布局
- **Header**：页眉组件，包含logo、文件名和操作按钮
- **EditorPane**：Markdown编辑区域
  - MarkdownToolbar：编辑工具栏
  - Editor：文本编辑区
- **PreviewPane**：实时预览区域
- **StylingPanel**：样式和主题配置区域
  - ThemeTabs：主题选择标签页
  - CustomCSS：自定义CSS编辑区
- **ExportModal**：导出选项弹窗
- **Footer**：页脚组件，显示状态信息

### 2.3 数据流
采用单向数据流模式，主要状态包括：

- **documentContent**：当前文档内容
- **documentTitle**：文档标题
- **activeTheme**：当前激活的主题
- **customCSS**：用户定义的CSS
- **previewHTML**：解析后的HTML预览内容

## 3. 代码规范

### 3.1 命名规范
- **文件命名**：采用Pascal Case（首字母大写）命名组件文件：`EditorPane.js`
- **组件命名**：Pascal Case：`EditorPane`
- **函数命名**：Camel Case（小驼峰）：`handleContentChange`
- **变量命名**：Camel Case：`documentContent`
- **常量命名**：全大写下划线：`DEFAULT_THEME`
- **CSS类名**：kebab-case（短横线）：`.editor-pane`

### 3.2 代码组织
- 组件按功能分组到相应文件夹
- 公共组件放在`components`文件夹
- 页面级组件放在`pages`文件夹
- 工具函数放在`utils`文件夹
- 样式主题放在`themes`文件夹
- 全局状态管理放在`context`或`store`文件夹

### 3.3 注释规范
- 组件顶部添加组件功能说明
- 复杂逻辑添加注释说明
- 关键函数添加功能、参数、返回值说明
- 添加适当的中文注释增强代码可读性

## 4. 项目结构

```
/markdown-editor
|-- /public
|-- /src
|   |-- /components        # 共享/复用组件
|   |   |-- /Editor
|   |   |-- /Preview
|   |   |-- /StylePanel
|   |   |-- /Header
|   |   |-- /Footer
|   |   |-- /Modals
|   |-- /context           # React Context状态管理
|   |-- /hooks             # 自定义React Hooks
|   |-- /themes            # 预设主题
|   |-- /utils             # 工具函数
|   |   |-- markdown.js    # Markdown处理逻辑
|   |   |-- export.js      # 导出相关逻辑
|   |   |-- storage.js     # 本地存储逻辑
|   |-- App.jsx            # 应用入口组件
|   |-- index.jsx          # 渲染入口
|   |-- styles.css         # 全局样式
|-- /tests                 # 测试文件
|-- package.json
|-- .env                   # 环境变量配置
|-- README.md
```

## 5. API设计（可选，本地应用可无后端）

### 5.1 认证API
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出

### 5.2 文档API
- `GET /api/documents` - 获取用户文档列表
- `GET /api/documents/:id` - 获取指定文档
- `POST /api/documents` - 创建新文档
- `PUT /api/documents/:id` - 更新文档
- `DELETE /api/documents/:id` - 删除文档

### 5.3 导出API
- `POST /api/export/pdf` - 将文档导出为PDF
- `POST /api/export/png` - 将文档导出为PNG

## 6. 环境配置

### 6.1 开发环境
- Node.js >= 14.x
- npm >= 6.x 或 yarn >= 1.22.x
- 现代浏览器（Chrome, Firefox, Safari, Edge最新版）

### 6.2 环境变量
通过`.env`文件管理环境变量:

```
# API配置
REACT_APP_API_URL=http://localhost:8000/api

# 功能开关
REACT_APP_ENABLE_USER_SYSTEM=false

# 导出配置
REACT_APP_MAX_EXPORT_FILE_SIZE=5242880
```

## 7. 部署方案

### 7.1 前端部署
- 静态文件部署至CDN或静态文件服务器
- 可考虑GitHub Pages、Vercel、Netlify等平台

### 7.2 后端部署（可选）
- Node.js应用部署至支持Node.js的服务器或云平台
- 可考虑Heroku、AWS、DigitalOcean等平台

## 8. 性能优化

### 8.1 前端性能
- 组件懒加载
- Markdown解析性能优化（节流、防抖）
- 大文件渲染优化
- 图片懒加载
- 代码分割

### 8.2 导出性能
- 大文档导出时考虑分块处理
- 导出过程显示进度提示

## 9. 安全考量

### 9.1 前端安全
- 防止XSS攻击，尤其是自定义CSS和Markdown内容
- 敏感数据不直接存储在localStorage中
- 注入脚本防御（CSP）

### 9.2 API安全（如有后端）
- API请求HTTPS加密
- 实现CSRF防护
- 实现请求频率限制 