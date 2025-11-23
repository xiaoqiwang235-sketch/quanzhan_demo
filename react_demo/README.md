# React + Vite 前端应用

这是一个基于 React 18 和 Vite 的电站数据管理前端应用。

## 项目特性

- ✅ 现代化的 React 组件架构
- ✅ 快速的 Vite 构建工具
- ✅ 数据表格展示与分页
- ✅ 搜索和排序功能
- ✅ 响应式设计
- ✅ 跨域请求支持 (CORS)
- ✅ 快速刷新 (HMR) 开发体验

## 技术栈

- **React**: 18.0+
- **Vite**: 5.0+ (构建工具和开发服务器)
- **JavaScript**: ES6+
- **样式**: Tailwind CSS 4.0+
- **HTTP Client**: Axios
- **UI Icons**: Lucide React

## 快速开始

### 1. 安装依赖

```bash
npm install
```

或使用 yarn:

```bash
yarn install
```

### 2. 配置后端服务地址

编辑 `src/api/api.js` 文件，确保 API 地址指向正确的后端服务：

```javascript
const API_BASE_URL = 'http://127.0.0.1:8899';  // 修改为你的后端地址
```

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://127.0.0.1:5173` 运行。

### 4. 构建生产版本

```bash
npm run build
```

构建输出位于 `dist` 目录。

### 5. 预览生产构建

```bash
npm run preview
```

## 项目结构

```
react_demo/
├── src/
│   ├── api/
│   │   └── api.js           # API 调用接口
│   ├── App.jsx              # 主应用组件
│   ├── App.css              # 应用样式
│   ├── main.jsx             # 应用入口
│   ├── index.css            # 全局样式
│   └── assets/              # 静态资源
├── public/                  # 公共资源
├── package.json             # 项目配置
├── vite.config.js           # Vite 配置
└── README.md                # 项目文档
```

## 主要功能

### 1. 数据表格

- 显示电站数据列表
- 支持分页浏览
- 显示关键信息：电站名、国家、容量、状态等

### 2. 搜索功能

- 按关键词搜索电站名称和国家
- 实时搜索结果更新
- 搜索时自动返回第一页

### 3. 排序功能

- 支持按多个字段排序
- 可选升序或降序
- 可排序的字段：容量、碳排放、电站名、国家等

### 4. 分页导航

- 显示当前页码和总页数
- 上一页/下一页导航
- 支持输入页码跳转

## API 集成

### 配置 API 接口

在 `src/api/api.js` 中配置：

```javascript
const API_BASE_URL = 'http://127.0.0.1:8899';

export const fetchPowerstations = async (params) => {
    const response = await axios.get(`${API_BASE_URL}/data`, { params });
    return response.data;
};
```

### 请求参数

```javascript
{
    page: 1,              // 页码
    pageSize: 10,         // 每页数量
    search: 'China',      // 搜索关键词（可选）
    sortBy: 'capacity',   // 排序字段（可选）
    sortOrder: 'desc'     // 排序顺序（可选）
}
```

## 组件说明

### App.jsx 主组件

主要功能：
- 管理应用状态（数据、加载状态等）
- 处理搜索和排序逻辑
- 渲染表格和控制器

主要状态：
```javascript
const [data, setData] = useState([]);           // 电站数据
const [loading, setLoading] = useState(false);  // 加载状态
const [currentPage, setCurrentPage] = useState(1);  // 当前页
const [pageSize, setPageSize] = useState(10);   // 每页数量
const [total, setTotal] = useState(0);          // 数据总数
const [searchText, setSearchText] = useState('');    // 搜索文本
const [sortBy, setSortBy] = useState('id');     // 排序字段
const [sortOrder, setSortOrder] = useState('desc');  // 排序顺序
```

## 样式说明

### Tailwind CSS

项目使用 **Tailwind CSS 4.0+** 进行样式管理。

#### 配置文件

- `tailwind.config.js` - Tailwind 配置文件
- `index.css` - 全局样式和 Tailwind 指令

#### 常用 Tailwind 类

```html
<!-- 弹性布局 -->
<div class="flex items-center justify-between">

<!-- 栅格布局 -->
<div class="grid grid-cols-3 gap-4">

<!-- 响应式设计 -->
<div class="md:flex-row sm:flex-col">

<!-- 文本样式 -->
<p class="text-lg font-bold text-gray-800">

<!-- 背景和边框 -->
<div class="bg-white border border-gray-200 rounded-lg">

<!-- 间距 -->
<div class="p-4 m-2">
```

#### 自定义样式

在组件中使用 Tailwind 类：

```jsx
<div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-md">
  <h1 className="text-2xl font-bold text-gray-900">标题</h1>
  <p className="text-gray-600">描述文本</p>
</div>
```

#### 扩展 Tailwind

编辑 `tailwind.config.js` 添加自定义主题：

```javascript
export default {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
}
```

## 开发建议

### 1. 添加加载动画

在 `App.jsx` 中当 `loading` 为 true 时显示加载指示器：

```javascript
{loading && <div className="loader">加载中...</div>}
```

### 2. 错误处理

添加错误状态和错误信息显示：

```javascript
const [error, setError] = useState(null);

const fetchData = async () => {
    try {
        setError(null);
        // ... 请求代码
    } catch (err) {
        setError(err.message);
    }
};
```

### 3. 导出功能

添加导出为 CSV 或 Excel 的功能：

```javascript
const exportToCSV = () => {
    // 将数据转换为 CSV 格式并下载
};
```

### 4. 高级过滤

扩展搜索功能以支持多字段过滤：

```javascript
const advancedFilter = {
    country: 'China',
    status: 'Operating',
    capacityMin: 1000,
    capacityMax: 10000
};
```

## 常见问题

### Q: 跨域请求失败
**A:** 
1. 确保后端服务正在运行
2. 确保后端配置了 CORS
3. 检查 API 地址是否正确（`src/api/api.js`）
4. 查看浏览器控制台的错误信息

### Q: 数据加载很慢
**A:** 
1. 检查后端服务性能
2. 减少每页加载的数据量
3. 在后端添加数据库索引
4. 考虑使用虚拟滚动优化大数据列表

### Q: 样式不生效
**A:** 
1. 确保 Tailwind CSS 已安装（`npm install`）
2. 检查 `index.css` 中是否包含 Tailwind 指令
3. 确保 `vite.config.js` 正确配置了 Tailwind 插件
4. 清除浏览器缓存并重启开发服务器
5. 验证 Tailwind 类名拼写是否正确

## 性能优化

### 1. 代码分割

使用 React.lazy() 进行懒加载：

```javascript
const DataTable = React.lazy(() => import('./components/DataTable'));
```

### 2. 内存优化

在卸载组件时清理资源：

```javascript
useEffect(() => {
    return () => {
        // 清理代码
    };
}, []);
```

### 3. 请求优化

添加请求防抖，避免频繁请求：

```javascript
const debouncedSearch = debounce(handleSearch, 300);
```

## 部署

### 构建

```bash
npm run build
```

### 部署到静态服务器

将 `dist` 目录部署到任何静态文件服务器（Nginx、Apache、GitHub Pages 等）。

### 部署到 Node.js 服务器

使用 Express 或类似框架提供静态文件。

## ESLint 配置

项目包含 ESLint 配置，用于代码质量检查。

### 扩展 ESLint 配置

参考 [ESLint](https://eslint.org) 和相关插件文档。

## 浏览器兼容性

- Chrome 最新版本 ✅
- Firefox 最新版本 ✅
- Safari 最新版本 ✅
- Edge 最新版本 ✅

## 许可证

MIT License
