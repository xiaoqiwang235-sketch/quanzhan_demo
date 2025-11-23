# 全栈电站数据管理系统 (Quanzhan Demo)

这是一个完整的全栈示例项目，展示了现代化的 Web 应用开发架构。项目包括 React 前端、Python Flask 后端以及 MySQL 数据库。

## 项目概览

系统基于电站数据进行演示，包含超过 5000 条电站信息，支持数据的分页查询、搜索、排序等功能。

## 项目结构

```
quanzhan_demo/
├── python_demo/          # Python Flask 后端
│   ├── main.py          # 主应用文件
│   ├── init_database.py # 数据库初始化脚本
│   ├── powerstation.sql # SQL 数据文件
│   ├── requirements.txt  # 依赖列表
│   └── README.md         # 后端文档
│
├── react_demo/          # React 前端
│   ├── src/
│   │   ├── App.jsx      # 主组件
│   │   ├── main.jsx     # 应用入口
│   │   └── api/         # API 接口层
│   ├── package.json
│   ├── vite.config.js
│   └── README.md        # 前端文档
│
└── README.md            # 项目总文档
```

## 技术栈

### 前端
- **框架**: React 18
- **构建工具**: Vite
- **样式**: CSS 3
- **HTTP 客户端**: Axios
- **UI 组件**: Lucide React (图标库)

### 后端
- **框架**: Flask
- **数据库驱动**: PyMySQL
- **跨域支持**: Flask-CORS
- **Python 版本**: 3.8+

### 数据库
- **数据库**: MySQL 8.0+
- **字符集**: UTF-8mb4
- **表**: powerstation (5000+ 电站数据)

## 快速开始

### 前置要求

- Python 3.8 或更高版本
- Node.js 14 或更高版本
- MySQL 8.0 或更高版本

### 1. 后端配置 (Python)

详见 [后端 README](./python_demo/README.md)

```bash
cd python_demo

# 创建虚拟环境 (推荐)
python -m venv .venv

# 激活虚拟环境
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 初始化数据库
python init_database.py

# 启动服务 (运行在 http://127.0.0.1:8899)
python main.py
```

### 2. 前端配置 (React)

详见 [前端 README](./react_demo/README.md)

```bash
cd react_demo

# 安装依赖
npm install

# 启动开发服务器 (运行在 http://127.0.0.1:5173)
npm run dev

# 构建生产版本
npm run build
```

## 主要功能

### 后端 API

- **GET /**: 服务状态检查
- **GET /data**: 分页查询电站数据
  - 支持搜索、排序、分页
  - 参数: page, pageSize, search, sortBy, sortOrder
- **GET /test-connection**: 数据库连接测试

### 前端功能

- 电站数据表格展示
- 分页浏览
- 搜索过滤
- 排序查询
- 响应式设计

## 环境配置

### 后端数据库配置

编辑 `python_demo/main.py` 中的 `DB_CONFIG`:

```python
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': '你的MySQL密码',  # 修改这里
    'database': 'quanzhan_demo',
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}
```

### 前端 API 配置

编辑 `react_demo/src/api/api.js` 中的后端服务地址:

```javascript
const API_BASE_URL = 'http://127.0.0.1:8899';
```

## API 文档

### 数据查询接口

**请求:**
```
GET http://127.0.0.1:8899/data?page=1&pageSize=10&search=China&sortBy=capacity&sortOrder=desc
```

**响应示例:**
```json
{
    "data": [
        {
            "id": 1,
            "lng": 111.358881,
            "lat": 40.195233,
            "plant": "Datang Tuoketuo power station",
            "country": "China",
            "capacity": 6720,
            "status": "Operating",
            "annualCarbon": 29.15
        }
    ],
    "total": 2500,
    "page": 1,
    "pageSize": 10,
    "totalPages": 250
}
```

**参数说明:**
- `page`: 页码 (默认: 1)
- `pageSize`: 每页数量 (默认: 10, 最大: 100)
- `search`: 搜索关键词 (搜索电站名称和国家)
- `sortBy`: 排序字段 (id, capacity, annualCarbon, plant, country, status, year1)
- `sortOrder`: 排序顺序 (asc 或 desc, 默认: desc)

## 故障排除

### 数据库连接错误

1. 确认 MySQL 服务正在运行
2. 检查数据库用户名和密码是否正确
3. 确认数据库 `quanzhan_demo` 已创建
4. 运行初始化脚本: `python init_database.py`

### CORS 错误

- 后端已配置 CORS，允许来自前端的跨域请求
- 确保前端和后端服务正常运行

### 数据库导入失败

1. 确保 MySQL 命令行工具在 PATH 中
2. 确保 `powerstation.sql` 文件存在
3. 检查数据库用户权限是否充分

## 开发建议

1. **使用虚拟环境** - 后端开发时使用 Python 虚拟环境隔离依赖
2. **环境变量** - 生产环境请使用环境变量存储敏感信息（密码等）
3. **API 文档** - 前后端分离开发时保持 API 文档同步
4. **数据验证** - 后端进行充分的输入验证，前端进行基本验证

## 许可证

MIT License

## 联系方式

如有问题，请提交 Issue 或 PR。