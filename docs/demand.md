1.1 项目背景与目的
随着内容创作和知识分享的普及，Markdown 以其简洁、高效的语法受到了广泛欢迎。然而，现有的 Markdown 编辑器在样式自定义、模板应用以及便捷导出方面仍有提升空间。本项目旨在开发一款功能强大、用户友好的在线 Markdown 编辑工具，提供流畅的编辑体验、丰富的排版选项以及便捷的导出功能，满足用户对个性化和专业化文档输出的需求。
1.2 产品概述
本产品是一款基于 Web 的在线 Markdown 编辑工具，用户无需安装任何软件即可在浏览器中创建、编辑 Markdown 文档。核心功能包括实时预览 Markdown、支持通过预设主题/模板或自定义 CSS 快速改变文稿样式，并能将最终文稿导出为 PNG 图片和 PDF 文档。
1.3 目标用户
- 内容创作者/博主： 需要快速撰写并发布具有统一风格的文章。
- 技术文档撰写者： 希望使用 Markdown 高效编写文档，并能输出专业格式的文档。
- 学生/研究人员： 需要撰写笔记、报告，并能方便地转换为不同格式进行分享或打印。
- 普通用户： 喜欢使用 Markdown 进行日常记录，并希望文档美观易读。
1. 产品目标
- 核心目标：
  - 提供一个稳定、流畅、所见即所得（或实时预览）的在线 Markdown 编辑环境。
  - 允许用户通过简单选择预设主题/模板或应用自定义 CSS 来美化文档排版。
  - 支持将编辑好的文档高质量导出为 PNG 和 PDF 格式。
- 用户体验目标：
  - 界面简洁直观，易于上手。
  - 编辑、排版、导出流程顺畅高效。
- 技术目标：
  - 确保跨浏览器兼容性（主流现代浏览器）。
  - 保证导出文件（PNG/PDF）的准确性和美观性。
2. 用户故事
- 作为一名博主， 我希望能够在线编辑 Markdown 文章，并能实时看到渲染效果，以便我能专注于内容创作。
- 作为一名技术文档撰写者， 我希望能够使用预设的专业模板，快速将我的 Markdown 文档转换成符合规范的样式，并导出为 PDF。
- 作为一名设计师， 我希望能够应用自己编写的 CSS 代码，来精确控制 Markdown 文档的最终呈现样式。
- 作为一名学生， 我希望能够将我的 Markdown 笔记快速套用一个简洁美观的主题，并导出为 PNG 图片插入到我的演示文稿中。
- 作为任何用户， 我希望可以轻松地将我的 Markdown 文档保存到云端（或本地），并在需要时导出为 PDF 进行打印或分享。
3. 产品功能需求 (Features)
4.1 Markdown 在线编辑 (FRD-EDIT)
- FRD-EDIT-001： 支持标准 Markdown 语法（如 CommonMark 规范），包括标题、列表、粗体、斜体、链接、图片、代码块、引用、表格等。
- FRD-EDIT-002： 提供实时预览功能，用户在编辑 Markdown 文本时，可以即时看到渲染后的效果（可选择左右分栏或单栏预览模式）。
- FRD-EDIT-003： 提供基本的 Markdown 格式化工具栏，方便用户快速插入常用 Markdown 语法标记（例如：点击按钮插入粗体标记）。
- FRD-EDIT-004： 支持 Markdown 语法高亮显示，提升编辑体验。
- FRD-EDIT-005 (可选)： 支持字数统计。
- FRD-EDIT-006 (可选)： 支持本地文件导入（.md 文件）。
- FRD-EDIT-007 (可选)： 支持文档自动保存（至浏览器本地存储或云端）。
4.2 主题/模板与自定义样式 (FRD-STYLE)
- FRD-STYLE-001： 内置多种预设主题/模板，用户可以通过选择快速切换文档的整体排版样式。 
  - 至少包含：默认简洁主题、学术论文风格主题、技术文档风格主题、暗色模式主题等。
- FRD-STYLE-002： 允许用户预览不同主题/模板应用到当前文档后的效果。
- FRD-STYLE-003： 提供自定义 CSS 编辑区域，用户可以编写或粘贴自己的 CSS 代码来覆盖或扩展当前主题的样式。 
  - 系统需能实时应用自定义 CSS 并更新预览。
  - 系统需对用户输入的 CSS 进行基本的校验。
- FRD-STYLE-004： 用户应用自定义 CSS 后，应能保存该 CSS 配置（与文档关联或作为新的自定义模板）。
- FRD-STYLE-005 (可选)： 允许用户将自定义的 CSS 样式保存为个人模板，供后续使用。
- FRD-STYLE-006 (可选)： 提供一个 CSS 样式市场或社区分享功能，用户可以分享和使用他人创建的样式。
4.3 文档导出 (FRD-EXPORT)
- FRD-EXPORT-001： 支持将当前应用了选定主题/模板或自定义 CSS 的文稿导出为 PNG 图片。 
  - 导出时应保持文档的排版样式。
  - 用户可选择导出当前视口内容或整个文档（若文档过长，可考虑分页或生成长图）。
  - 可提供基础的图片质量选项。
- FRD-EXPORT-002： 支持将当前应用了选定主题/模板或自定义 CSS 的文稿导出为 PDF 文档。 
  - 导出时应保持文档的排版样式，包括字体、颜色、布局等。
  - 应正确处理分页。
  - 支持常见的纸张大小选项（如 A4, Letter）。
  - 支持页面方向（纵向/横向）。
  - (可选) 支持添加页眉页脚。
- FRD-EXPORT-003： 导出过程应有明确的进度提示，并在完成后提供下载链接。
4.4 用户账户与文档管理 (FRD-USER) - (若需云端存储)
- FRD-USER-001 (可选)： 支持用户注册和登录功能。
- FRD-USER-002 (可选)： 允许登录用户在云端保存和管理其创建的 Markdown 文档。 
  - 包括创建、打开、保存、另存为、删除文档。
  - 提供文档列表及搜索功能。
- FRD-USER-003 (可选)： 若无用户账户系统，则文档主要通过浏览器本地存储（localStorage/IndexedDB）进行临时保存，或依赖用户手动导入导出。
4. 非功能性需求
- 5.1 性能 (NFR-PERF)
  - NFR-PERF-001： Markdown 编辑和实时预览响应迅速，无明显卡顿。
  - NFR-PERF-002： 切换主题/模板和应用自定义 CSS 的效果应在 2 秒内呈现。
  - NFR-PERF-003： 中等大小文档（例如 5000 字，包含少量图片）的 PDF 导出时间应在合理范围内（例如 10-30 秒内，具体取决于服务器能力和文档复杂度）。
- 5.2 易用性 (NFR-USAB)
  - NFR-USAB-001： 用户界面简洁明了，主要功能易于发现和使用。
  - NFR-USAB-002： 新用户无需查阅大量文档即可完成核心操作（编辑、应用样式、导出）。
  - NFR-USAB-003： 提供清晰的错误提示和操作反馈。
- 5.3 兼容性 (NFR-COMP)
  - NFR-COMP-001： 支持主流现代桌面浏览器最新版本（Chrome, Firefox, Safari, Edge）。
  - NFR-COMP-002 (可选)： 考虑移动端浏览器的基本查阅和轻量编辑支持。
- 5.4 安全性 (NFR-SECU)
  - NFR-SECU-001 (若有用户系统)： 用户密码需加密存储。
  - NFR-SECU-002 (若有用户系统)： 防止常见的 Web 攻击，如 XSS（特别是自定义 CSS 输入部分需严格过滤和沙箱化处理）、CSRF。
- 5.5 可靠性 (NFR-RELI)
  - NFR-RELI-001： 导出生成的 PNG 和 PDF 文件内容和样式应与预览区所见一致。
  - NFR-RELI-002： 系统应能稳定运行，避免频繁崩溃或数据丢失。

5. 设计与技术考量
- 前端技术栈建议：
  - JavaScript 框架：React.js
  - Markdown 解析库：Marked.js, Showdown.js, markdown-it 等。
  - 代码高亮库：Highlight.js, Prism.js。
  - PDF 生成库：jsPDF, Puppeteer (服务端生成) 或 html2pdf.js。
  - PNG 生成库：html2canvas 或 Puppeteer (服务端生成)。

- 后端技术栈建议 (若有用户系统和云存储)：
  - Node.js (Express/Koa)
  - 数据库：MongoDB。

- UI/UX 设计：
  - 遵循简洁、现代的设计风格。
  - 编辑区、预览区、样式选择区、导出选项应布局合理，操作流畅。
  - 考虑主题切换和自定义 CSS 的交互逻辑，确保用户理解当前生效的样式规则。

6. 衡量指标 (Success Metrics)
- 日/月活跃用户数 (DAU/MAU)。
- 新用户注册数 (若有用户系统)。
- 文档创建数量。
- 主题/模板使用频率。
- 自定义 CSS 功能使用频率。
- PNG/PDF 导出次数和成功率。
- 用户平均使用时长。
- 用户反馈和满意度评分。
7. 未来展望 (Future Considerations)
- V1.1：
  - 更多预设主题和模板。
  - 支持导出为 HTML 文件。
  - 增强的图片处理功能（如直接拖拽上传、调整大小）。
- V1.2：
  - 版本历史和恢复功能。
  - 多人协作编辑。
- V2.0：
  - 插件系统，允许社区扩展功能。
  - 集成第三方图床。
  - 桌面客户端版本。


