# 全栈电站数据管理系统

这是一个完整的全栈示例项目，展示了现代化的 Web 应用开发架构和最佳实践。项目采用前后端分离架构，包括 React 19 前端、Python Flask 后端以及 MySQL 数据库，实现了一个功能完整的电站数据管理系统。

## 项目概览

本系统基于真实的全球电站数据进行演示，包含超过 5000 条电站信息记录，提供完整的数据管理功能，包括：

- 📊 数据可视化展示和分页浏览
- 🔍 智能搜索和多字段排序
- ✏️ 完整的 CRUD 操作（创建、读取、更新、删除）
- 🎨 多主题切换（3 种精美主题）
- 📱 响应式设计，支持移动端
- 🚀 高性能和现代化的技术栈

## 项目结构

```
quanzhan_demo/
├── python_demo/              # Python Flask 后端
│   ├── main.py              # 主应用文件 - Flask 应用和 API 端点
│   ├── init_database.py     # 数据库初始化脚本
│   ├── powerstation.sql     # SQL 数据文件（5000+ 条记录）
│   ├── requirements.txt     # Python 依赖列表
│   └── README.md            # 后端文档
│
├── react_demo/              # React 前端
│   ├── src/
│   │   ├── components/      # 可复用组件
│   │   │   ├── Navbar/     # 顶部导航栏
│   │   │   ├── Toolbar/    # 工具栏
│   │   │   ├── DataTable/  # 数据表格
│   │   │   ├── Pagination/ # 分页组件
│   │   │   ├── Modal/      # 模态框组件
│   │   │   └── Message/    # 消息提示
│   │   ├── hooks/          # 自定义 Hooks
│   │   │   ├── useTheme.js
│   │   │   ├── useMessage.js
│   │   │   └── useDataManagement.js
│   │   ├── services/       # API 服务层
│   │   │   └── api.js
│   │   ├── constants/      # 常量配置
│   │   │   ├── themes.js
│   │   │   └── config.js
│   │   ├── utils/          # 工具函数
│   │   ├── App.jsx         # 主应用组件
│   │   └── main.jsx        # 应用入口
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── README.md           # 前端文档
│
└── README.md               # 项目总文档（本文件）
```

## 技术栈

### 前端技术

| 技术 | 版本 | 说明 |
|------|------|------|
| **React** | 19.2.0 | 最新的 React 版本，提供更好的性能 |
| **Vite** | 7.2.4 | 下一代前端构建工具，极速开发体验 |
| **Tailwind CSS** | 4.1.17 | 原子化 CSS 框架，快速构建 UI |
| **Lucide React** | 0.554.0 | 优雅的现代图标库 |
| **JavaScript** | ES6+ | 现代化 JavaScript 语法 |

### 后端技术

| 技术 | 版本 | 说明 |
|------|------|------|
| **Flask** | 2.3.3 | 轻量级 Python Web 框架 |
| **PyMySQL** | 1.1.0 | Python MySQL 数据库驱动 |
| **Flask-CORS** | 4.0.0 | 跨域资源共享支持 |
| **Python** | 3.8+ (推荐 3.11+) | Python 编程语言 |

### 数据库

| 技术 | 版本 | 说明 |
|------|------|------|
| **MySQL** | 8.0+ | 关系型数据库管理系统 |
| **字符集** | UTF-8mb4 | 支持完整的 Unicode 字符 |

## 核心功能

### 前端功能

- ✅ **数据表格展示** - 清晰展示电站数据，支持所有字段显示
- ✅ **分页浏览** - 流畅的分页导航，支持页码跳转和每页数量调整
- ✅ **搜索过滤** - 实时搜索电站名称和国家
- ✅ **多字段排序** - 支持按容量、碳排放、国家等多个字段排序
- ✅ **CRUD 操作** - 完整的数据增删改查功能
- ✅ **批量删除** - 选择多条记录批量删除
- ✅ **主题切换** - 3 种精美主题可选（简约白、黑客绿、暗黑高级）
- ✅ **响应式设计** - 完美适配桌面端和移动端
- ✅ **消息提示** - 优雅的操作反馈系统

### 后端功能

- ✅ **RESTful API** - 标准的 REST API 设计
- ✅ **分页查询** - 高效的数据分页加载
- ✅ **关键词搜索** - 支持模糊搜索
- ✅ **动态排序** - 多字段动态排序支持
- ✅ **数据验证** - 完善的参数验证机制
- ✅ **错误处理** - 统一的错误响应格式
- ✅ **CORS 支持** - 跨域请求配置
- ✅ **数据库管理** - 自动初始化脚本

## 快速开始

### 前置要求

请确保您的开发环境已安装以下软件：

- **Python** 3.8 或更高版本（推荐 3.11+）- [下载 Python](https://www.python.org/downloads/)
- **Node.js** 14 或更高版本 - [下载 Node.js](https://nodejs.org/)
- **MySQL** 8.0 或更高版本 - [下载 MySQL](https://dev.mysql.com/downloads/)

### 安装步骤

#### 1. 克隆项目

```bash
git clone <repository-url>
cd quanzhan_demo
```

#### 2. 后端配置 (Python)

详见 [后端 README](./python_demo/README.md)

```bash
# 进入后端目录
cd python_demo

# 创建虚拟环境（推荐）
python -m venv .venv

# 激活虚拟环境
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 配置数据库
# 编辑 main.py 中的 DB_CONFIG，修改数据库密码

# 初始化数据库
python init_database.py

# 启动后端服务（运行在 http://127.0.0.1:8899）
python main.py
```

#### 3. 前端配置 (React)

详见 [前端 README](./react_demo/README.md)

```bash
# 打开新终端，进入前端目录
cd react_demo

# 安装依赖
npm install

# 配置 API 地址（如果需要）
# 编辑 src/constants/config.js 中的 API_BASE_URL

# 启动开发服务器（运行在 http://127.0.0.1:5173）
npm run dev
```

#### 4. 访问应用

打开浏览器访问：
- **前端应用**: http://127.0.0.1:5173
- **后端 API**: http://127.0.0.1:8899

## 配置说明

### 后端数据库配置

编辑 [python_demo/main.py:11-18](python_demo/main.py#L11-L18) 中的 `DB_CONFIG`:

```python
DB_CONFIG = {
    'host': 'localhost',          # MySQL 服务器地址
    'user': 'root',               # 数据库用户名
    'password': '你的MySQL密码',   # ⚠️ 请修改为你的密码
    'database': 'quanzhan_demo',  # 数据库名
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}
```

### 前端 API 配置

编辑 [react_demo/src/constants/config.js](react_demo/src/constants/config.js) 中的后端服务地址:

```javascript
export const API_BASE_URL = 'http://127.0.0.1:8899';
```

## API 接口文档

### 基础信息

- **Base URL**: `http://127.0.0.1:8899`
- **数据格式**: JSON
- **字符编码**: UTF-8

### 接口列表

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/` | 服务状态检查 |
| GET | `/data` | 分页查询电站数据 |
| GET | `/data/:id` | 获取单条数据 |
| POST | `/data` | 添加新数据 |
| PUT | `/data/:id` | 更新数据 |
| DELETE | `/data/:id` | 删除单条数据 |
| POST | `/data/batch` | 批量删除数据 |
| GET | `/test-connection` | 测试数据库连接 |

### 数据查询接口示例

**请求:**
```http
GET /data?page=1&pageSize=10&search=China&sortBy=capacity&sortOrder=desc
```

**查询参数:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| page | int | 否 | 1 | 页码 |
| pageSize | int | 否 | 10 | 每页数量（1-100）|
| search | string | 否 | '' | 搜索关键词 |
| sortBy | string | 否 | id | 排序字段 |
| sortOrder | string | 否 | desc | 排序顺序（asc/desc）|

**响应示例:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "lng": 111.358881,
            "lat": 40.195233,
            "plant": "Datang Tuoketuo power station",
            "country": "China",
            "capacity": 6720,
            "status": "Operating",
            "annualCarbon": 29.15,
            "coalType": "Bituminous",
            "type": "Subcritical",
            "year1": 2003,
            "year2": 2017,
            "startLabel": "2003 - 2017",
            "regionLabel": "China"
        }
    ],
    "total": 2500,
    "page": 1,
    "pageSize": 10,
    "totalPages": 250
}
```

更多 API 详情请查看 [后端 README](./python_demo/README.md)。

## 数据库结构

### powerstation 表

```sql
CREATE TABLE powerstation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lng DOUBLE,                    -- 经度
    lat DOUBLE,                    -- 纬度
    annualCarbon DOUBLE,           -- 年碳排放量（百万吨）
    capacity INT,                  -- 装机容量（MW）
    coalType VARCHAR(255),         -- 煤炭类型
    country VARCHAR(50),           -- 国家
    plant VARCHAR(100),            -- 电站名称
    status VARCHAR(50),            -- 运行状态
    type VARCHAR(50),              -- 电站类型
    retire1 INT,                   -- 退役年份1
    retire2 INT,                   -- 退役年份2
    retire3 INT,                   -- 退役年份3
    start1 INT,                    -- 启用年份1
    start2 INT,                    -- 启用年份2
    year1 INT,                     -- 年份1
    year2 INT,                     -- 年份2
    startLabel VARCHAR(200),       -- 启用标签
    regionLabel VARCHAR(200)       -- 地区标签
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

## 开发工作流

### 开发模式

1. 启动后端服务：`cd python_demo && python main.py`
2. 启动前端服务：`cd react_demo && npm run dev`
3. 开始开发，享受热更新

### 构建生产版本

```bash
# 前端构建
cd react_demo
npm run build

# 输出到 dist 目录
```

### 代码规范

- 前端使用 ESLint 进行代码检查：`npm run lint`
- Python 建议使用 PEP 8 代码规范
- 提交前请确保代码通过 lint 检查

## 常见问题与故障排除

### 数据库连接错误

**问题**: 后端无法连接到数据库

**解决方案**:
1. 确认 MySQL 服务正在运行
2. 检查 `main.py` 中的数据库配置（用户名、密码、数据库名）
3. 确认数据库 `quanzhan_demo` 已创建
4. 运行初始化脚本: `python init_database.py`
5. 检查防火墙是否阻止 MySQL 连接

### CORS 跨域错误

**问题**: 前端请求后端 API 时出现 CORS 错误

**解决方案**:
1. 确保后端已启动（`http://127.0.0.1:8899`）
2. 后端已配置 CORS，允许跨域请求
3. 检查前端 API 配置地址是否正确
4. 清除浏览器缓存并重试

### 前端样式不生效

**问题**: Tailwind CSS 样式未应用

**解决方案**:
1. 确保依赖已安装：`npm install`
2. 检查 `vite.config.js` 配置
3. 重启开发服务器：`npm run dev`
4. 清除浏览器缓存

### 数据库导入失败

**问题**: `init_database.py` 运行失败

**解决方案**:
1. 确保 `powerstation.sql` 文件存在
2. 确保 MySQL 命令行工具在系统 PATH 中
3. 检查数据库用户权限（需要 CREATE、INSERT 权限）
4. 手动创建数据库：`CREATE DATABASE quanzhan_demo CHARACTER SET utf8mb4;`

### 端口被占用

**问题**: 启动服务时提示端口被占用

**解决方案**:

**后端端口 8899**:
- Windows: `netstat -ano | findstr 8899`
- Linux/Mac: `lsof -i :8899`
- 修改 `main.py` 中的端口号

**前端端口 5173**:
- 修改 `vite.config.js` 中的端口配置
- 或停止占用端口的进程

## 性能优化建议

### 后端优化

1. **数据库索引** - 为常查询字段添加索引
   ```sql
   CREATE INDEX idx_country ON powerstation(country);
   CREATE INDEX idx_capacity ON powerstation(capacity);
   ```

2. **连接池** - 使用数据库连接池提高性能
3. **缓存** - 使用 Redis 缓存热点数据
4. **分页优化** - 限制每页最大数量
5. **查询优化** - 只查询需要的字段

### 前端优化

1. **代码分割** - 使用 React.lazy() 懒加载组件
2. **虚拟滚动** - 处理大量数据时使用虚拟列表
3. **请求防抖** - 搜索输入防抖处理
4. **Memo 优化** - 使用 React.memo 避免不必要的渲染
5. **构建优化** - Vite 自动进行代码压缩和优化

## 部署指南

### 后端部署

**使用 Gunicorn 部署**:

```bash
# 安装 Gunicorn
pip install gunicorn

# 启动服务（4 个 worker）
gunicorn -w 4 -b 0.0.0.0:8899 main:app
```

**使用 Nginx 反向代理**:

```nginx
server {
    listen 80;
    server_name api.your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8899;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 前端部署

**构建生产版本**:

```bash
cd react_demo
npm run build
```

**部署到 Nginx**:

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

**部署到 Vercel** (推荐):

```bash
npm install -g vercel
cd react_demo
vercel
```

## 项目扩展建议

### 功能扩展

1. **用户认证系统** - 添加登录注册功能
2. **数据统计面板** - 图表展示数据统计
3. **数据导出** - 导出为 CSV/Excel 格式
4. **高级过滤** - 多条件组合过滤
5. **地图可视化** - 在地图上展示电站位置
6. **数据比较** - 多个电站数据对比分析

### 技术升级

1. **TypeScript** - 添加类型检查
2. **状态管理** - 使用 Redux/Zustand
3. **测试** - 添加单元测试和 E2E 测试
4. **Docker** - 容器化部署
5. **CI/CD** - 自动化构建和部署

## 学习资源

### 官方文档

- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Flask 官方文档](https://flask.palletsprojects.com/)
- [PyMySQL 文档](https://pymysql.readthedocs.io/)
- [MySQL 官方文档](https://dev.mysql.com/doc/)

### 推荐教程

- React 18 核心特性和 Hooks
- Vite 构建工具深入理解
- Flask RESTful API 开发实战
- MySQL 数据库优化技巧
- Tailwind CSS 最佳实践

## 项目维护

### 依赖更新

**前端依赖**:
```bash
npm outdated          # 查看过期的包
npm update           # 更新依赖
npm audit            # 安全审计
npm audit fix        # 自动修复漏洞
```

**后端依赖**:
```bash
pip list --outdated  # 查看过期的包
pip install --upgrade <package>  # 更新指定包
```

### 版本控制

- 使用语义化版本号（SemVer）
- 保持 CHANGELOG 更新
- 定期发布稳定版本

## 许可证

MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 贡献指南

欢迎贡献代码、报告问题或提出建议！

### 如何贡献

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 报告问题

如果您发现 Bug 或有功能建议，请：
1. 检查是否已有类似的 Issue
2. 创建新 Issue 并详细描述问题
3. 提供复现步骤和环境信息

## 联系方式

如有问题或建议，请通过以下方式联系：

- 提交 Issue
- 发起 Pull Request
- 邮件联系（如果提供）

## 致谢

感谢所有开源项目和社区的贡献者！

---

**Happy Coding! 🚀**
