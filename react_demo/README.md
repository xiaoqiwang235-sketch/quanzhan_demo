# React 电站数据管理前端

这是一个基于 React 19 和 Vite 构建的现代化电站数据管理系统前端应用，提供完整的数据展示、搜索、排序和 CRUD 操作功能。

## 功能特性

- ✅ 现代化的 React 组件架构
- ✅ 快速的 Vite 构建工具和 HMR 热更新
- ✅ 数据表格展示与分页导航
- ✅ 实时搜索和多字段排序
- ✅ 完整的 CRUD 操作（添加、编辑、删除、批量删除）
- ✅ 多主题切换（简约白、黑客绿、暗黑高级）
- ✅ 响应式设计，支持移动端
- ✅ 优雅的消息提示系统
- ✅ 跨域请求支持 (CORS)
- ✅ 快速刷新开发体验
- ✅ 模块化组件设计

## 技术栈

- **React**: 19.2.0 - 最新的 React 版本
- **Vite**: 7.2.4 - 下一代前端构建工具
- **Tailwind CSS**: 4.1.17 - 原子化 CSS 框架
- **Lucide React**: 0.554.0 - 优雅的图标库
- **JavaScript**: ES6+ 模块化语法
- **Fetch API**: 原生异步网络请求

## 快速开始

### 1. 安装依赖

```bash
npm install
```

或使用 yarn:

```bash
yarn install
```

或使用 pnpm:

```bash
pnpm install
```

### 2. 配置后端服务地址

编辑 [src/constants/config.js](src/constants/config.js) 文件，确保 API 地址指向正确的后端服务：

```javascript
export const API_BASE_URL = 'http://127.0.0.1:8899';  // 修改为你的后端地址
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
│   ├── components/              # 可复用组件
│   │   ├── Navbar/             # 顶部导航栏
│   │   │   └── Navbar.jsx
│   │   ├── Toolbar/            # 工具栏（搜索、排序）
│   │   │   └── Toolbar.jsx
│   │   ├── DataTable/          # 数据表格
│   │   │   └── DataTable.jsx
│   │   ├── Pagination/         # 分页组件
│   │   │   └── Pagination.jsx
│   │   ├── Modal/              # 模态框组件
│   │   │   ├── AddModal.jsx    # 添加数据弹窗
│   │   │   └── EditModal.jsx   # 编辑数据弹窗
│   │   ├── Message/            # 消息提示组件
│   │   │   └── Message.jsx
│   │   └── index.js            # 组件统一导出
│   ├── hooks/                   # 自定义 Hooks
│   │   ├── useTheme.js         # 主题管理 Hook
│   │   ├── useMessage.js       # 消息提示 Hook
│   │   ├── useDataManagement.js # 数据管理 Hook
│   │   └── index.js            # Hooks 统一导出
│   ├── services/               # API 服务层
│   │   └── api.js              # API 请求封装
│   ├── constants/              # 常量配置
│   │   ├── themes.js           # 主题配置
│   │   └── config.js           # 应用配置
│   ├── utils/                  # 工具函数
│   │   └── helpers.js          # 辅助函数
│   ├── App.jsx                 # 主应用组件
│   ├── App.css                 # 应用样式
│   ├── main.jsx                # 应用入口
│   ├── index.css               # 全局样式
│   └── assets/                 # 静态资源
├── public/                      # 公共资源
├── package.json                 # 项目配置
├── vite.config.js              # Vite 配置
├── tailwind.config.js          # Tailwind 配置
├── eslint.config.js            # ESLint 配置
└── README.md                    # 项目文档（本文件）
```

## 核心功能

### 1. 数据表格

- 显示电站数据列表（包含所有字段）
- 支持分页浏览（可配置每页数量）
- 显示关键信息：电站名、国家、容量、状态、碳排放等
- 自适应表格宽度和响应式布局
- 行选择和批量操作

### 2. 搜索功能

- 按关键词搜索电站名称和国家
- 实时搜索结果更新
- 搜索时自动返回第一页
- 搜索框带清除按钮

### 3. 排序功能

- 支持按多个字段排序
- 可选升序或降序
- 可排序的字段：
  - ID
  - 容量 (capacity)
  - 碳排放 (annualCarbon)
  - 电站名 (plant)
  - 国家 (country)
  - 状态 (status)
  - 年份 (year1)

### 4. CRUD 操作

#### 添加数据
- 打开添加弹窗填写信息
- ID 自动生成
- 表单验证
- 成功后自动刷新列表

#### 编辑数据
- 点击编辑按钮打开编辑弹窗
- 预填充当前数据
- 支持修改所有字段
- 实时更新

#### 删除数据
- 单条删除：点击删除按钮并确认
- 批量删除：选择多条记录后批量删除
- 删除前二次确认
- 成功后自动刷新

### 5. 分页导航

- 显示当前页码和总页数
- 上一页/下一页导航
- 支持输入页码跳转
- 支持调整每页显示数量（10/20/50/100）

### 6. 主题切换

- 3 种精美主题：
  - 简约白 - 清爽的浅色主题
  - 黑客绿 - 复古的终端风格主题
  - 暗黑高级 - 优雅的深色主题
- 主题持久化存储
- 平滑过渡动画

### 7. 消息提示

- 成功、错误、警告、信息四种类型
- 自动消失（3秒）
- 支持多条消息队列
- 可手动关闭

## 核心组件说明

### App.jsx 主组件

主要功能：
- 整合所有子组件
- 管理应用全局状态
- 协调组件间通信

### Navbar 导航栏组件

位置：[src/components/Navbar/Navbar.jsx](src/components/Navbar/Navbar.jsx)

功能：
- 显示应用标题和 Logo
- 主题切换下拉菜单
- 响应式设计

### Toolbar 工具栏组件

位置：[src/components/Toolbar/Toolbar.jsx](src/components/Toolbar/Toolbar.jsx)

功能：
- 搜索输入框
- 排序字段和顺序选择
- 添加新数据按钮
- 批量删除按钮（选中数据时显示）

### DataTable 数据表格组件

位置：[src/components/DataTable/DataTable.jsx](src/components/DataTable/DataTable.jsx)

功能：
- 数据列表展示
- 行选择功能
- 编辑和删除操作按钮
- 加载状态显示
- 空状态提示

主要 Props：
```javascript
{
    data: [],              // 表格数据
    loading: false,        // 加载状态
    selectedIds: [],       // 选中的行 IDs
    onSelectAll: fn,       // 全选回调
    onSelectRow: fn,       // 行选择回调
    onEdit: fn,            // 编辑回调
    onDelete: fn          // 删除回调
}
```

### Pagination 分页组件

位置：[src/components/Pagination/Pagination.jsx](src/components/Pagination/Pagination.jsx)

功能：
- 页码显示和导航
- 页面跳转输入框
- 每页数量选择器
- 总数统计显示

主要 Props：
```javascript
{
    currentPage: 1,        // 当前页
    totalPages: 10,        // 总页数
    pageSize: 10,          // 每页数量
    total: 100,            // 总记录数
    onPageChange: fn,      // 页码变化回调
    onPageSizeChange: fn   // 每页数量变化回调
}
```

### Modal 模态框组件

位置：
- [src/components/Modal/AddModal.jsx](src/components/Modal/AddModal.jsx)
- [src/components/Modal/EditModal.jsx](src/components/Modal/EditModal.jsx)

功能：
- 添加/编辑表单
- 字段验证
- 提交和取消操作
- 遮罩层点击关闭

### Message 消息提示组件

位置：[src/components/Message/Message.jsx](src/components/Message/Message.jsx)

功能：
- 成功/错误/警告/信息提示
- 自动消失动画
- 多消息队列管理
- 手动关闭按钮

## 自定义 Hooks

### useTheme

位置：[src/hooks/useTheme.js](src/hooks/useTheme.js)

主题管理 Hook：
```javascript
const { theme, setTheme, themeConfig } = useTheme();
```

### useMessage

位置：[src/hooks/useMessage.js](src/hooks/useMessage.js)

消息提示 Hook：
```javascript
const { messages, showSuccess, showError, showWarning, showInfo, removeMessage } = useMessage();
```

### useDataManagement

位置：[src/hooks/useDataManagement.js](src/hooks/useDataManagement.js)

数据管理 Hook，集成了所有数据操作：
```javascript
const {
    data,
    loading,
    currentPage,
    pageSize,
    total,
    totalPages,
    searchText,
    sortBy,
    sortOrder,
    selectedIds,
    // ... 方法
} = useDataManagement();
```

## API 集成

### 配置 API 接口

在 [src/constants/config.js](src/constants/config.js) 中配置：

```javascript
export const API_BASE_URL = 'http://127.0.0.1:8899';
```

### API 服务层

位置：[src/services/api.js](src/services/api.js)

提供的方法：
```javascript
// 获取分页数据
export const fetchPowerstations = async (params) => { ... }

// 获取单条数据
export const fetchPowerstationById = async (id) => { ... }

// 添加数据
export const createPowerstation = async (data) => { ... }

// 更新数据
export const updatePowerstation = async (id, data) => { ... }

// 删除单条数据
export const deletePowerstation = async (id) => { ... }

// 批量删除
export const batchDeletePowerstations = async (ids) => { ... }
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

### 响应格式

```javascript
{
    success: true,
    data: [...],
    total: 5000,
    page: 1,
    pageSize: 10,
    totalPages: 500
}
```

## 样式说明

### Tailwind CSS

项目使用 **Tailwind CSS 4.1.17** 进行样式管理。

#### 配置文件

- [tailwind.config.js](tailwind.config.js) - Tailwind 配置文件
- [src/index.css](src/index.css) - 全局样式和 Tailwind 指令

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

<!-- 过渡动画 -->
<div class="transition-all duration-300">
```

#### 主题变量

主题配置在 [src/constants/themes.js](src/constants/themes.js) 中定义：

```javascript
export const themes = {
  light: {
    name: 'Light',
    colors: {
      background: '#ffffff',
      text: '#1f2937',
      primary: '#3b82f6',
      // ...
    }
  },
  // ... 其他主题
}
```

## 开发建议

### 1. 添加新组件

在 `src/components` 目录下创建新组件文件夹：

```javascript
// src/components/NewComponent/NewComponent.jsx
import React from 'react';

export function NewComponent({ prop1, prop2 }) {
    return (
        <div className="p-4">
            {/* 组件内容 */}
        </div>
    );
}
```

然后在 `src/components/index.js` 中导出：

```javascript
export { NewComponent } from './NewComponent/NewComponent';
```

### 2. 创建自定义 Hook

在 `src/hooks` 目录下创建新 Hook：

```javascript
// src/hooks/useCustomHook.js
import { useState, useEffect } from 'react';

export function useCustomHook() {
    const [state, setState] = useState(null);

    // Hook 逻辑

    return { state, setState };
}
```

### 3. 添加导出功能

扩展导出功能以支持 CSV 或 Excel：

```javascript
const exportToCSV = () => {
    const headers = ['ID', 'Plant', 'Country', 'Capacity'];
    const csvData = data.map(row =>
        [row.id, row.plant, row.country, row.capacity].join(',')
    ).join('\n');

    const blob = new Blob([headers.join(',') + '\n' + csvData],
        { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'powerstation_data.csv';
    a.click();
};
```

### 4. 高级过滤

扩展搜索功能以支持多字段过滤：

```javascript
const [filters, setFilters] = useState({
    country: '',
    status: '',
    capacityMin: 0,
    capacityMax: 10000
});

const applyFilters = () => {
    // 构建过滤参数并请求数据
};
```

### 5. 数据可视化

集成图表库（如 Chart.js 或 Recharts）：

```bash
npm install recharts
```

```javascript
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

<BarChart data={statisticsData}>
    <Bar dataKey="capacity" fill="#3b82f6" />
    <XAxis dataKey="country" />
    <YAxis />
    <Tooltip />
</BarChart>
```

## 常见问题

### Q: 跨域请求失败

**A:**
1. 确保后端服务正在运行（`http://127.0.0.1:8899`）
2. 确保后端配置了 CORS
3. 检查 [src/constants/config.js](src/constants/config.js) 中的 API 地址是否正确
4. 查看浏览器控制台的错误信息
5. 尝试在浏览器中直接访问 API 地址测试

### Q: 数据加载很慢

**A:**
1. 检查后端服务性能
2. 减少每页加载的数据量（调整 pageSize）
3. 在后端添加数据库索引
4. 考虑使用虚拟滚动优化大数据列表
5. 启用数据缓存

### Q: 样式不生效

**A:**
1. 确保 Tailwind CSS 已安装（`npm install`）
2. 检查 [src/index.css](src/index.css) 中是否包含 Tailwind 指令
3. 确保 [vite.config.js](vite.config.js) 正确配置了 Tailwind 插件
4. 清除浏览器缓存并重启开发服务器：`npm run dev`
5. 验证 Tailwind 类名拼写是否正确

### Q: 构建后部署失败

**A:**
1. 检查构建输出：`npm run build`
2. 确保 `dist` 目录存在
3. 检查服务器的静态文件配置
4. 验证 API 地址在生产环境中是否正确
5. 查看浏览器控制台的错误信息

### Q: 热更新不工作

**A:**
1. 重启开发服务器：`npm run dev`
2. 检查 Vite 配置文件
3. 确保没有语法错误
4. 清除 node_modules 并重新安装：`rm -rf node_modules && npm install`

### Q: 主题切换不生效

**A:**
1. 检查浏览器的 localStorage 是否被禁用
2. 清除 localStorage：`localStorage.clear()`
3. 检查主题配置文件 [src/constants/themes.js](src/constants/themes.js)
4. 验证 CSS 变量是否正确应用

## 性能优化

### 1. 代码分割

使用 React.lazy() 进行懒加载：

```javascript
const DataTable = React.lazy(() => import('./components/DataTable/DataTable'));

<Suspense fallback={<Loading />}>
    <DataTable {...props} />
</Suspense>
```

### 2. 内存优化

在卸载组件时清理资源：

```javascript
useEffect(() => {
    const controller = new AbortController();

    fetchData(controller.signal);

    return () => {
        controller.abort();  // 清理请求
    };
}, []);
```

### 3. 请求优化

添加请求防抖，避免频繁请求：

```javascript
import { debounce } from '../utils/helpers';

const debouncedSearch = debounce((value) => {
    setSearchText(value);
}, 300);
```

### 4. 虚拟滚动

处理大量数据时使用虚拟滚动：

```bash
npm install react-window
```

```javascript
import { FixedSizeList } from 'react-window';

<FixedSizeList
    height={600}
    itemCount={data.length}
    itemSize={50}
>
    {Row}
</FixedSizeList>
```

### 5. Memo 化优化

使用 React.memo 避免不必要的重渲染：

```javascript
export const DataTable = React.memo(({ data, onEdit, onDelete }) => {
    // 组件代码
});
```

## 部署

### 构建

```bash
npm run build
```

### 部署到静态服务器

将 `dist` 目录部署到任何静态文件服务器：

#### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### Apache 配置

在 `dist` 目录创建 `.htaccess`：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 部署到 Vercel

```bash
npm install -g vercel
vercel
```

### 部署到 Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

## ESLint 配置

项目包含 ESLint 配置，用于代码质量检查。

### 运行 Lint

```bash
npm run lint
```

### 扩展 ESLint 配置

编辑 [eslint.config.js](eslint.config.js) 文件。

参考：
- [ESLint 文档](https://eslint.org)
- [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react)

## 浏览器兼容性

- Chrome 最新版本 ✅
- Firefox 最新版本 ✅
- Safari 最新版本 ✅
- Edge 最新版本 ✅
- 移动浏览器（iOS Safari、Chrome Mobile）✅

## 测试

### 单元测试

```bash
npm install --save-dev vitest @testing-library/react
```

```javascript
import { render, screen } from '@testing-library/react';
import { DataTable } from './DataTable';

test('renders data table', () => {
    render(<DataTable data={[]} />);
    expect(screen.getByText('电站名称')).toBeInTheDocument();
});
```

## 许可证

MIT License

## 相关链接

- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Lucide 图标库](https://lucide.dev/)
- [后端 README](../python_demo/README.md)
- [项目总 README](../README.md)

## 贡献

欢迎提交 Issue 和 Pull Request！
