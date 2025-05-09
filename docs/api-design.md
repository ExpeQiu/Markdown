# API接口规范

## 1. 概述

本文档定义了Markdown编辑工具的REST API接口规范。此API主要用于（可选的）用户认证、文档管理和导出服务。由于本项目主要是客户端应用，API实现是可选的，如需离线使用可忽略后端API部分。

### 1.1 基础URL
```
https://api.example.com/api/v1
```

### 1.2 请求方法
- `GET`: 获取资源
- `POST`: 创建资源
- `PUT`: 更新资源
- `DELETE`: 删除资源

### 1.3 响应格式
所有API响应均采用JSON格式，包含以下字段：
- `success`: 布尔值，表示请求是否成功
- `data`: 响应数据，请求成功时返回
- `error`: 错误信息，请求失败时返回

**成功响应示例：**
```json
{
  "success": true,
  "data": {
    "id": "abc123",
    "title": "示例文档"
  }
}
```

**错误响应示例：**
```json
{
  "success": false,
  "error": {
    "code": "DOCUMENT_NOT_FOUND",
    "message": "文档不存在"
  }
}
```

### 1.4 状态码
- `200 OK`: 请求成功
- `201 Created`: 资源创建成功
- `400 Bad Request`: 请求参数错误
- `401 Unauthorized`: 未认证
- `403 Forbidden`: 权限不足
- `404 Not Found`: 资源不存在
- `500 Internal Server Error`: 服务器内部错误

## 2. 认证API

> 注意：认证API为可选实现，若项目不需要用户系统，可忽略本节。

### 2.1 用户注册

**请求**
```
POST /auth/register
```

**请求体**
```json
{
  "username": "user123",
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**响应** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "61ae36f2b3944c001fc98a7e",
    "username": "user123",
    "email": "user@example.com",
    "createdAt": "2023-08-01T12:00:00Z"
  }
}
```

### 2.2 用户登录

**请求**
```
POST /auth/login
```

**请求体**
```json
{
  "email": "user@example.com",
  "password": "SecurePassword123"
}
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "61ae36f2b3944c001fc98a7e",
      "username": "user123",
      "email": "user@example.com"
    }
  }
}
```

### 2.3 获取当前用户信息

**请求**
```
GET /auth/me
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "61ae36f2b3944c001fc98a7e",
    "username": "user123",
    "email": "user@example.com",
    "createdAt": "2023-08-01T12:00:00Z"
  }
}
```

### 2.4 用户登出

**请求**
```
POST /auth/logout
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "成功登出"
  }
}
```

## 3. 文档API

### 3.1 获取文档列表

**请求**
```
GET /documents
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**查询参数**
- `page`: 页码，默认1
- `limit`: 每页数量，默认20
- `sort`: 排序方式，如`-updatedAt`（按更新时间降序）

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "documents": [
      {
        "id": "62c54a8e7f1a9b001a1234a1",
        "title": "技术文档",
        "updatedAt": "2023-08-15T09:30:00Z",
        "createdAt": "2023-08-10T14:20:00Z"
      },
      {
        "id": "62c54a8e7f1a9b001a1234a2",
        "title": "项目计划",
        "updatedAt": "2023-08-12T16:45:00Z",
        "createdAt": "2023-08-05T11:10:00Z"
      }
    ],
    "pagination": {
      "total": 25,
      "page": 1,
      "limit": 20,
      "pages": 2
    }
  }
}
```

### 3.2 获取文档详情

**请求**
```
GET /documents/:id
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "62c54a8e7f1a9b001a1234a1",
    "title": "技术文档",
    "content": "# 技术文档\n\n这是一个示例文档内容...",
    "themeId": "default",
    "customCSS": "",
    "isCustomCSSEnabled": false,
    "createdAt": "2023-08-10T14:20:00Z",
    "updatedAt": "2023-08-15T09:30:00Z"
  }
}
```

### 3.3 创建文档

**请求**
```
POST /documents
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**请求体**
```json
{
  "title": "新文档",
  "content": "# 新文档\n\n这是一个新文档",
  "themeId": "default"
}
```

**响应** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": "62c54a8e7f1a9b001a1234a3",
    "title": "新文档",
    "content": "# 新文档\n\n这是一个新文档",
    "themeId": "default",
    "customCSS": "",
    "isCustomCSSEnabled": false,
    "createdAt": "2023-08-20T10:00:00Z",
    "updatedAt": "2023-08-20T10:00:00Z"
  }
}
```

### 3.4 更新文档

**请求**
```
PUT /documents/:id
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**请求体**
```json
{
  "title": "更新后的文档标题",
  "content": "# 更新后的文档标题\n\n这是更新后的内容",
  "themeId": "academic",
  "customCSS": "body { font-family: 'Georgia', serif; }",
  "isCustomCSSEnabled": true
}
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": "62c54a8e7f1a9b001a1234a1",
    "title": "更新后的文档标题",
    "content": "# 更新后的文档标题\n\n这是更新后的内容",
    "themeId": "academic",
    "customCSS": "body { font-family: 'Georgia', serif; }",
    "isCustomCSSEnabled": true,
    "createdAt": "2023-08-10T14:20:00Z",
    "updatedAt": "2023-08-20T11:30:00Z"
  }
}
```

### 3.5 删除文档

**请求**
```
DELETE /documents/:id
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "message": "文档已成功删除"
  }
}
```

## 4. 主题API

### 4.1 获取可用主题列表

**请求**
```
GET /themes
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "themes": [
      {
        "id": "default",
        "name": "默认主题",
        "description": "简洁大方的默认主题",
        "previewImage": "https://api.example.com/images/themes/default.png"
      },
      {
        "id": "academic",
        "name": "学术论文",
        "description": "适合学术论文的专业排版主题",
        "previewImage": "https://api.example.com/images/themes/academic.png"
      },
      {
        "id": "dark",
        "name": "暗色主题",
        "description": "护眼暗色主题，适合夜间使用",
        "previewImage": "https://api.example.com/images/themes/dark.png"
      },
      {
        "id": "technical",
        "name": "技术文档",
        "description": "适合技术文档的排版主题",
        "previewImage": "https://api.example.com/images/themes/technical.png"
      }
    ]
  }
}
```

## 5. 导出API

### 5.1 导出为PNG

**请求**
```
POST /export/png
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**请求体**
```json
{
  "documentId": "62c54a8e7f1a9b001a1234a1",
  "options": {
    "quality": 2,
    "width": 800
  }
}
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "url": "https://api.example.com/exports/62c54a8e7f1a9b001a1234a1/export-1629462000.png",
    "expiresAt": "2023-08-21T10:00:00Z"
  }
}
```

### 5.2 导出为PDF

**请求**
```
POST /export/pdf
```

**请求头**
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json
```

**请求体**
```json
{
  "documentId": "62c54a8e7f1a9b001a1234a1",
  "options": {
    "pageSize": "a4",
    "orientation": "portrait",
    "includeHeader": true,
    "includeFooter": true
  }
}
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "url": "https://api.example.com/exports/62c54a8e7f1a9b001a1234a1/export-1629462000.pdf",
    "expiresAt": "2023-08-21T10:00:00Z"
  }
}
```

## 6. 健康检查API

### 6.1 API状态检查

**请求**
```
GET /health
```

**响应** (200 OK)
```json
{
  "success": true,
  "data": {
    "status": "ok",
    "version": "1.0.0",
    "uptime": 1234567,
    "timestamp": "2023-08-20T12:00:00Z"
  }
}
```

## 7. 错误处理

### 7.1 通用错误代码

| 错误代码 | 说明 |
| --- | --- |
| `INVALID_REQUEST` | 请求格式或参数无效 |
| `UNAUTHORIZED` | 未认证或认证失败 |
| `FORBIDDEN` | 权限不足 |
| `NOT_FOUND` | 请求的资源不存在 |
| `INTERNAL_ERROR` | 服务器内部错误 |

### 7.2 业务错误代码

| 错误代码 | 说明 |
| --- | --- |
| `USER_ALREADY_EXISTS` | 用户已存在（注册时） |
| `INVALID_CREDENTIALS` | 无效的凭证（登录时） |
| `DOCUMENT_NOT_FOUND` | 文档不存在 |
| `THEME_NOT_FOUND` | 主题不存在 |
| `EXPORT_FAILED` | 导出失败 |
| `CONTENT_TOO_LARGE` | 内容过大，超出处理限制 |

## 8. API调用限制

为保障服务质量，API实施调用限制：

- 公共API：60次/小时/IP
- 认证用户：600次/小时/用户
- 导出API：30次/小时/用户

超出限制将返回HTTP状态码`429 Too Many Requests`，响应体包含以下信息：

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "API调用次数超出限制，请稍后重试",
    "resetAt": "2023-08-20T13:00:00Z"
  }
}
```

## 9. API客户端实现示例

### 9.1 JavaScript客户端（前端使用）

```javascript
/**
 * Markdown编辑器API客户端
 */
class MarkdownAPIClient {
  constructor(baseURL, token = null) {
    this.baseURL = baseURL;
    this.token = token;
  }

  // 设置认证令牌
  setToken(token) {
    this.token = token;
  }

  // 构建请求头
  getHeaders() {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // 发送请求
  async request(method, endpoint, data = null) {
    const url = `${this.baseURL}${endpoint}`;
    const options = {
      method,
      headers: this.getHeaders(),
    };

    if (data && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || '请求失败');
      }

      return result.data;
    } catch (error) {
      console.error('API请求失败:', error);
      throw error;
    }
  }

  // 用户登录
  async login(email, password) {
    return this.request('POST', '/auth/login', { email, password });
  }

  // 获取文档列表
  async getDocuments(page = 1, limit = 20) {
    return this.request('GET', `/documents?page=${page}&limit=${limit}`);
  }

  // 获取文档详情
  async getDocument(id) {
    return this.request('GET', `/documents/${id}`);
  }

  // 创建文档
  async createDocument(documentData) {
    return this.request('POST', '/documents', documentData);
  }

  // 更新文档
  async updateDocument(id, documentData) {
    return this.request('PUT', `/documents/${id}`, documentData);
  }

  // 导出为PDF
  async exportToPDF(documentId, options = {}) {
    return this.request('POST', '/export/pdf', { documentId, options });
  }

  // 获取可用主题
  async getThemes() {
    return this.request('GET', '/themes');
  }
}

// 使用示例
async function example() {
  const apiClient = new MarkdownAPIClient('https://api.example.com/api/v1');
  
  // 用户登录
  try {
    const authData = await apiClient.login('user@example.com', 'password');
    apiClient.setToken(authData.token);
    console.log('登录成功:', authData.user);
    
    // 获取文档列表
    const documentsData = await apiClient.getDocuments();
    console.log('文档列表:', documentsData.documents);
    
    // 获取文档详情
    if (documentsData.documents.length > 0) {
      const documentId = documentsData.documents[0].id;
      const documentDetails = await apiClient.getDocument(documentId);
      console.log('文档详情:', documentDetails);
      
      // 导出文档为PDF
      const exportData = await apiClient.exportToPDF(documentId, {
        pageSize: 'a4',
        orientation: 'portrait'
      });
      console.log('PDF导出链接:', exportData.url);
    }
  } catch (error) {
    console.error('操作失败:', error);
  }
}
```

## 10. API变更管理

### 10.1 版本控制
- API版本在URL路径中指定，如`/api/v1/`
- 重大更改将推出新版本，如`/api/v2/`
- 旧版本API将继续维护一段时间，并设定明确的弃用日期

### 10.2 变更通知
- 重大变更将提前30天通知
- 弃用通知将在API响应头中包含`X-API-Deprecated`和`X-API-Sunset-Date`
- 文档将标明每个端点的状态（稳定、测试、弃用） 