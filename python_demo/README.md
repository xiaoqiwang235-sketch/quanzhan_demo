# Python Flask 后端服务

这是一个使用 Flask 和 PyMySQL 构建的电站数据管理 RESTful API 服务，提供完整的 CRUD 操作。

## 功能特性

- ✅ 完整的 RESTful API (GET, POST, PUT, DELETE)
- ✅ 支持分页查询 5000+ 条电站数据
- ✅ 关键词搜索（电站名称、国家）
- ✅ 多字段动态排序
- ✅ 单条数据查询、添加、更新、删除
- ✅ 批量删除功能
- ✅ 跨域支持 (CORS)
- ✅ 完善的错误处理和参数验证
- ✅ 数据库连接测试接口
- ✅ 自动数据库初始化脚本

## 技术栈

- **Flask**: 2.3.3 - 轻量级 Web 框架
- **PyMySQL**: 1.1.0 - MySQL 数据库驱动
- **Flask-CORS**: 4.0.0 - 跨域资源共享支持
- **Python**: 3.8+ (推荐 3.11+)

## 快速开始

### 1. 环境准备

#### 创建虚拟环境（推荐）

```bash
# Windows
python -m venv .venv
.venv\Scripts\activate

# Linux / Mac
python3 -m venv .venv
source .venv/bin/activate
```

### 2. 安装依赖

```bash
pip install -r requirements.txt
```

**依赖列表:**
- `Flask==2.3.3` - Web 框架
- `PyMySQL==1.1.0` - MySQL 数据库驱动
- `Flask-CORS==4.0.0` - 跨域资源共享支持

### 3. 配置数据库

编辑 [main.py:11-18](main.py#L11-L18) 中的数据库配置：

```python
DB_CONFIG = {
    'host': 'localhost',      # MySQL 服务器地址
    'user': 'root',           # 数据库用户名
    'password': '你的密码',    # 数据库密码（请修改）
    'database': 'quanzhan_demo',  # 数据库名
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}
```

### 4. 初始化数据库

运行初始化脚本会自动：
- 检查 MySQL 服务是否可连接
- 创建数据库（如果不存在）
- 检查 `powerstation` 表是否存在且有数据
- 如果表不存在或为空，导入 `powerstation.sql` 文件
- 创建表结构并插入 5000+ 条电站数据

```bash
python init_database.py
```

**输出示例：**
```
开始初始化数据库...
✓ 表 'powerstation' 已存在且有数据，跳过导入
数据库初始化完成！
```

或者

```
开始初始化数据库...
表不存在或无数据，正在导入...
✓ 数据库初始化成功！
✓ 数据库: quanzhan_demo
✓ 表 'powerstation' 创建成功！
数据库初始化完成！
```

### 5. 启动服务

```bash
python main.py
```

服务将在 `http://127.0.0.1:8899` 启动。

输出示例：
```
启动服务器...
API 接口地址: http://127.0.0.1:8899
============================================================
可用接口:
  GET  /data - 分页查询数据 (支持search, sortBy, sortOrder)
  GET  /data/<id> - 获取单条数据
  POST /data - 添加新数据
  PUT  /data/<id> - 更新数据
  DELETE /data/<id> - 删除单条数据
  POST /data/batch - 批量删除数据
  GET  /test-connection - 测试连接
============================================================
 * Running on http://127.0.0.1:8899
 * Debug mode: on
```

## API 接口文档

### 1. 服务状态检查

检查 API 服务是否正常运行。

**请求:**
```http
GET http://127.0.0.1:8899/
```

**响应:**
```json
{
    "status": "success",
    "message": "API Server is running!",
    "version": "1.0.0"
}
```

### 2. 分页查询数据

分页查询电站数据，支持搜索、排序等高级功能。

**请求:**
```http
GET http://127.0.0.1:8899/data?page=1&pageSize=10&search=China&sortBy=capacity&sortOrder=desc
```

**参数说明:**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|-----|------|------|-------|------|
| page | int | 否 | 1 | 页码，最小值为 1 |
| pageSize | int | 否 | 10 | 每页数量，范围 1-100 |
| search | string | 否 | '' | 搜索关键词，搜索 `plant` 和 `country` 字段 |
| sortBy | string | 否 | id | 排序字段（见下表） |
| sortOrder | string | 否 | desc | 排序顺序：asc (升序), desc (降序) |

**可排序字段:**
- `id` - 记录 ID
- `capacity` - 装机容量
- `annualCarbon` - 年碳排放量
- `plant` - 电站名称
- `country` - 国家
- `status` - 运行状态
- `year1` - 年份1
- `lng`, `lat` - 经纬度
- `coalType`, `type` - 煤炭类型、电站类型
- `retire1`, `retire2`, `retire3` - 退役年份
- `start1`, `start2` - 启用年份
- `startLabel`, `regionLabel` - 标签字段

**响应示例:**
```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "lng": 111.358881,
            "lat": 40.195233,
            "annualCarbon": 29.15,
            "capacity": 6720,
            "coalType": "Bituminous",
            "country": "China",
            "plant": "Datang Tuoketuo power station",
            "status": "Operating",
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

**使用示例:**

```bash
# 获取第一页数据
curl "http://127.0.0.1:8899/data?page=1&pageSize=10"

# 搜索中国的电站
curl "http://127.0.0.1:8899/data?page=1&pageSize=20&search=China"

# 按容量降序排序
curl "http://127.0.0.1:8899/data?page=1&pageSize=10&sortBy=capacity&sortOrder=desc"

# 组合搜索和排序
curl "http://127.0.0.1:8899/data?page=1&pageSize=10&search=China&sortBy=capacity&sortOrder=desc"
```

### 3. 获取单条数据

根据 ID 获取指定电站的详细信息。

**请求:**
```http
GET http://127.0.0.1:8899/data/1
```

**响应（成功）:**
```json
{
    "success": true,
    "data": {
        "id": 1,
        "plant": "Datang Tuoketuo power station",
        "country": "China",
        "capacity": 6720,
        // ... 其他字段
    }
}
```

**响应（失败 - 记录不存在）:**
```json
{
    "success": false,
    "error": "记录不存在",
    "message": "ID为 999 的记录不存在"
}
```

### 4. 添加新数据

添加新的电站记录，ID 自动设置为最大 ID + 1。

**请求:**
```http
POST http://127.0.0.1:8899/data
Content-Type: application/json

{
    "plant": "新电站",
    "country": "China",
    "capacity": 1000,
    "status": "Operating",
    "year1": 2024,
    "lng": 116.4,
    "lat": 39.9,
    "annualCarbon": 5.2
}
```

**响应（成功）:**
```json
{
    "success": true,
    "message": "数据添加成功",
    "id": 5001
}
```

**注意事项:**
- ID 字段由系统自动分配，无需在请求中提供
- 只有包含在允许字段列表中的字段会被处理
- 空值字段会被忽略

### 5. 更新数据

更新指定 ID 的电站记录。

**请求:**
```http
PUT http://127.0.0.1:8899/data/5001
Content-Type: application/json

{
    "capacity": 1200,
    "status": "Operating",
    "annualCarbon": 6.5
}
```

**响应（成功）:**
```json
{
    "success": true,
    "message": "数据更新成功",
    "updated_id": 5001
}
```

**响应（失败 - 记录不存在）:**
```json
{
    "success": false,
    "error": "记录不存在",
    "message": "ID为 5001 的记录不存在"
}
```

### 6. 删除单条数据

删除指定 ID 的电站记录。

**请求:**
```http
DELETE http://127.0.0.1:8899/data/5001
```

**响应（成功）:**
```json
{
    "success": true,
    "message": "数据删除成功",
    "deleted_id": 5001
}
```

### 7. 批量删除数据

批量删除多条电站记录。

**请求:**
```http
POST http://127.0.0.1:8899/data/batch
Content-Type: application/json

{
    "ids": [5001, 5002, 5003]
}
```

**响应（成功）:**
```json
{
    "success": true,
    "message": "成功删除 3 条记录",
    "deleted_count": 3
}
```

### 8. 数据库连接测试

测试数据库连接状态并返回表中记录总数。

**请求:**
```http
GET http://127.0.0.1:8899/test-connection
```

**响应（成功）:**
```json
{
    "success": true,
    "status": "success",
    "message": "数据库连接正常",
    "record_count": 5000
}
```

**响应（失败）:**
```json
{
    "success": false,
    "status": "error",
    "message": "数据库连接失败"
}
```

## 数据表结构

### powerstation 表

```sql
CREATE TABLE powerstation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lng DOUBLE,                    -- 经度
    lat DOUBLE,                    -- 纬度
    annualCarbon DOUBLE,           -- 年碳排放量 (百万吨)
    capacity INT,                  -- 装机容量 (MW)
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

## 项目结构

```
python_demo/
├── main.py              # 主应用文件 - Flask 应用和所有 API 端点
├── init_database.py     # 数据库初始化脚本
├── powerstation.sql     # SQL 数据文件（5000+ 条记录）
├── requirements.txt     # Python 依赖列表
└── README.md           # 项目文档（本文件）
```

## 错误处理

服务使用标准 HTTP 状态码和统一的 JSON 响应格式：

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 404 | 资源不存在（记录未找到）|
| 500 | 服务器内部错误或数据库连接失败 |

**错误响应格式:**
```json
{
    "success": false,
    "error": "错误类型",
    "message": "详细错误信息"
}
```

**常见错误示例:**

```json
// 参数错误
{
    "success": false,
    "error": "参数错误",
    "message": "page 必须大于等于 1"
}

// 记录不存在
{
    "success": false,
    "error": "记录不存在",
    "message": "ID为 999 的记录不存在"
}

// 数据库连接失败
{
    "error": "数据库连接失败",
    "data": [],
    "total": 0
}
```

## 开发建议

### 1. 增加统计分析接口

在 [main.py](main.py) 中添加新的路由：

```python
@app.route('/statistics', methods=['GET'])
def get_statistics():
    """获取统计数据"""
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT
                    COUNT(*) as total_count,
                    AVG(capacity) as avg_capacity,
                    SUM(annualCarbon) as total_carbon,
                    COUNT(DISTINCT country) as country_count
                FROM powerstation
                WHERE status = 'Operating'
            """)
            result = cursor.fetchone()
            return jsonify({
                'success': True,
                'data': result
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    finally:
        connection.close()
```

### 2. 按国家统计接口

```python
@app.route('/statistics/by-country', methods=['GET'])
def get_statistics_by_country():
    """按国家统计电站数据"""
    try:
        connection = get_db_connection()
        with connection.cursor() as cursor:
            cursor.execute("""
                SELECT
                    country,
                    COUNT(*) as count,
                    AVG(capacity) as avg_capacity,
                    SUM(capacity) as total_capacity,
                    SUM(annualCarbon) as total_carbon
                FROM powerstation
                GROUP BY country
                ORDER BY total_capacity DESC
            """)
            results = cursor.fetchall()
            return jsonify({
                'success': True,
                'data': results
            })
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    finally:
        connection.close()
```

### 3. 数据库连接池优化

生产环境建议使用连接池以提高性能：

```python
from DBUtils.PooledDB import PooledDB

# 创建连接池
db_pool = PooledDB(
    creator=pymysql,
    maxconnections=10,  # 最大连接数
    mincached=2,        # 最小空闲连接数
    maxcached=5,        # 最大空闲连接数
    blocking=True,      # 连接池满时是否阻塞
    **DB_CONFIG
)

def get_db_connection():
    """从连接池获取连接"""
    return db_pool.connection()
```

### 4. 添加性能索引

为常查询的字段添加索引以提高查询速度：

```sql
-- 为国家字段添加索引
CREATE INDEX idx_country ON powerstation(country);

-- 为电站名称添加索引
CREATE INDEX idx_plant ON powerstation(plant);

-- 为容量添加索引
CREATE INDEX idx_capacity ON powerstation(capacity);

-- 为状态添加索引
CREATE INDEX idx_status ON powerstation(status);

-- 复合索引（国家+状态）
CREATE INDEX idx_country_status ON powerstation(country, status);
```

## 常见问题

### Q: 无法连接到数据库

**A:**
1. 检查 MySQL 服务是否运行：`mysql --version`
2. 验证数据库用户名和密码是否正确
3. 确认数据库 `quanzhan_demo` 已创建
4. 运行 `python init_database.py` 初始化数据库
5. 检查防火墙是否阻止 MySQL 连接

### Q: 前端收到 CORS 错误

**A:**
后端已配置 CORS 允许所有来源。如需限制特定域名，编辑 [main.py:8](main.py#L8):

```python
# 只允许特定来源
CORS(app, resources={
    r"/*": {
        "origins": ["http://localhost:5173", "http://127.0.0.1:5173"]
    }
})
```

### Q: 导入数据失败

**A:**
1. 确保 `powerstation.sql` 文件存在于 python_demo 目录
2. 确保 MySQL 命令行工具在系统 PATH 中
3. 检查数据库用户是否有 CREATE、INSERT 权限
4. 查看 init_database.py 的错误输出

### Q: 查询速度慢

**A:**
1. 为常查询字段添加索引（见上方"添加性能索引"）
2. 减小 pageSize 参数
3. 使用连接池优化数据库连接
4. 考虑使用缓存（如 Redis）

### Q: 启动后报端口被占用

**A:**
1. 检查 8899 端口是否被占用：`netstat -ano | findstr 8899` (Windows)
2. 修改 [main.py:496](main.py#L496) 中的端口号
3. 停止占用端口的进程或使用其他端口

### Q: 日志输出中文乱码

**A:**
确保终端编码设置为 UTF-8：
```bash
# Windows PowerShell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
```

## 生产环境部署建议

### 1. 使用环境变量

存储敏感信息避免硬编码：

```python
import os
from dotenv import load_dotenv

load_dotenv()  # 加载 .env 文件

DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD'),  # 从环境变量读取
    'database': os.getenv('DB_NAME', 'quanzhan_demo'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}
```

### 2. 使用 WSGI 服务器

不要在生产环境使用 Flask 内置服务器，改用 Gunicorn 或 uWSGI：

```bash
# 安装 Gunicorn
pip install gunicorn

# 启动服务（4 个 worker）
gunicorn -w 4 -b 127.0.0.1:8899 main:app
```

### 3. 配置反向代理

使用 Nginx 作为反向代理：

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8899;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

### 4. 启用日志记录

添加日志以便调试和监控：

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('app.log'),
        logging.StreamHandler()
    ]
)
logger = logging.getLogger(__name__)
```

### 5. 添加身份验证

根据需要添加 API 密钥或 JWT 认证：

```python
from functools import wraps

def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        api_key = request.headers.get('X-API-Key')
        if api_key != os.getenv('API_KEY'):
            return jsonify({'error': 'Invalid API key'}), 401
        return f(*args, **kwargs)
    return decorated_function

@app.route('/data')
@require_api_key
def get_data():
    # ... 原有代码
```

### 6. 启用 HTTPS

使用 SSL/TLS 证书保护数据传输：

```bash
# 使用 Let's Encrypt 获取免费证书
sudo certbot --nginx -d your-domain.com
```

### 7. 监控和性能优化

- 使用 APM 工具（如 New Relic、Datadog）监控性能
- 配置数据库连接池
- 启用查询缓存
- 使用 Redis 缓存热点数据

## 测试

### 单元测试示例

```python
import unittest
from main import app

class TestAPI(unittest.TestCase):
    def setUp(self):
        self.app = app.test_client()

    def test_index(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)

    def test_get_data(self):
        response = self.app.get('/data?page=1&pageSize=10')
        self.assertEqual(response.status_code, 200)
        data = response.get_json()
        self.assertTrue(data['success'])

if __name__ == '__main__':
    unittest.main()
```

## 许可证

MIT License

## 相关链接

- [Flask 官方文档](https://flask.palletsprojects.com/)
- [PyMySQL 文档](https://pymysql.readthedocs.io/)
- [Flask-CORS 文档](https://flask-cors.readthedocs.io/)
- [前端 README](../react_demo/README.md)
- [项目总 README](../README.md)
