# Python Flask 后端服务

这是一个使用 Flask 和 PyMySQL 构建的电站数据查询 API 服务。

## 功能特性

- ✅ 支持分页查询 5000+ 条电站数据
- ✅ 关键词搜索（电站名称、国家）
- ✅ 多字段排序
- ✅ 跨域支持 (CORS)
- ✅ 错误处理和参数验证
- ✅ 数据库连接测试接口
- ✅ 自动数据库初始化

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
- `Flask>=2.0.0` - Web 框架
- `PyMySQL>=1.0.0` - MySQL 数据库驱动
- `flask-cors>=3.0.0` - 跨域资源共享支持

### 3. 配置数据库

编辑 `main.py` 中的数据库配置：

```python
DB_CONFIG = {
    'host': 'localhost',      # MySQL 服务器地址
    'user': 'root',           # 数据库用户名
    'password': '你的密码',    # 数据库密码
    'database': 'quanzhan_demo',  # 数据库名
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}
```

### 4. 初始化数据库

运行初始化脚本会自动：
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
 * Running on http://127.0.0.1:8899
 * Debug mode: off
```

## API 接口文档

### 1. 服务状态检查

**请求:**
```
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

### 2. 数据查询接口

**请求:**
```
GET http://127.0.0.1:8899/data?page=1&pageSize=10&search=China&sortBy=capacity&sortOrder=desc
```

**参数说明:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码，最小值为 1 |
| pageSize | int | 10 | 每页数量，范围 1-100 |
| search | string | '' | 搜索关键词，搜索 `plant` 和 `country` 字段 |
| sortBy | string | id | 排序字段：id, capacity, annualCarbon, plant, country, status, year1 |
| sortOrder | string | desc | 排序顺序：asc (升序), desc (降序) |

**响应示例:**
```json
{
    "status": "success",
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
        },
        ...
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

### 3. 数据库连接测试

**请求:**
```
GET http://127.0.0.1:8899/test-connection
```

**响应（成功）:**
```json
{
    "status": "success",
    "message": "数据库连接成功!"
}
```

**响应（失败）:**
```json
{
    "status": "error",
    "message": "数据库连接失败: ..."
}
```

## 数据表结构

### powerstation 表

```sql
CREATE TABLE powerstation (
    id INT PRIMARY KEY AUTO_INCREMENT,
    lng DOUBLE,                    -- 经度
    lat DOUBLE,                    -- 纬度
    annualCarbon DOUBLE,           -- 年碳排放量
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

## 错误处理

服务使用标准 HTTP 状态码和 JSON 响应：

| 状态码 | 说明 |
|--------|------|
| 200 | 请求成功 |
| 400 | 请求参数错误 |
| 500 | 服务器内部错误或数据库连接失败 |

**错误响应示例:**
```json
{
    "status": "error",
    "error": "参数错误: page 必须大于等于 1",
    "data": []
}
```

## 开发建议

### 1. 增加新的 API 端点

在 `main.py` 中添加新的路由：

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
                    SUM(annualCarbon) as total_carbon
                FROM powerstation
            """)
            result = cursor.fetchone()
            return jsonify(result)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        connection.close()
```

### 2. 修改查询字段

根据实际需求修改 SQL 查询语句，例如只返回特定字段：

```python
# 在 get_data() 方法中修改
cursor.execute("""
    SELECT 
        id, plant, country, capacity, status, year1
    FROM powerstation
    WHERE 1=1 {}
    ORDER BY {} {}
    LIMIT %s OFFSET %s
""".format(where_clause, sort_by, sort_order), params)
```

### 3. 数据库连接优化

在生产环境中，建议使用连接池：

```python
from DBUtils.PooledDB import PooledDB

db_pool = PooledDB(
    creator=pymysql,
    maxconnections=6,
    mincached=2,
    maxcached=5,
    **DB_CONFIG
)

def get_db_connection():
    return db_pool.connection()
```

## 常见问题

### Q: 无法连接到数据库
**A:** 
1. 检查 MySQL 服务是否运行
2. 验证数据库用户名和密码
3. 运行 `python init_database.py` 初始化数据库

### Q: 前端收到 CORS 错误
**A:** 后端已配置 CORS，如需调整允许的源，编辑 `main.py`:
```python
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})
```

### Q: 导入数据失败
**A:** 
1. 确保 `powerstation.sql` 文件存在
2. 确保 MySQL 命令行工具在系统 PATH 中
3. 检查数据库用户权限

### Q: 查询速度慢
**A:** 可以为常查询的字段添加索引：
```sql
CREATE INDEX idx_country ON powerstation(country);
CREATE INDEX idx_plant ON powerstation(plant);
CREATE INDEX idx_capacity ON powerstation(capacity);
```

## 生产环境建议

1. **使用环境变量** - 存储敏感信息：
```python
import os
DB_PASSWORD = os.environ.get('DB_PASSWORD', '')
```

2. **启用日志** - 记录应用运行情况
3. **使用 WSGI 服务器** - 如 Gunicorn、uWSGI（而不是 Flask 开发服务器）
4. **配置反向代理** - 如 Nginx
5. **添加身份验证** - 根据需要添加 API 密钥或 JWT
6. **启用 HTTPS** - 使用 SSL/TLS 证书

## 许可证

MIT License