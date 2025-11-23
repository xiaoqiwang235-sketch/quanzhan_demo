import subprocess
import os

# 数据库配置
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'Wxp1314520!',  # 请修改为你的MySQL密码
    'database': 'quanzhan_demo'
}

def table_has_data():
    """检查 powerstation 表是否存在且有数据"""
    try:
        # 查询表中的数据行数
        if DB_CONFIG['password']:
            cmd = f"mysql -h {DB_CONFIG['host']} -u {DB_CONFIG['user']} -p{DB_CONFIG['password']} {DB_CONFIG['database']} -e \"SELECT COUNT(*) FROM powerstation;\""
        else:
            cmd = f"mysql -h {DB_CONFIG['host']} -u {DB_CONFIG['user']} {DB_CONFIG['database']} -e \"SELECT COUNT(*) FROM powerstation;\""
        
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        
        # 如果执行出错（比如表不存在），returncode != 0
        if result.returncode != 0:
            return False
        
        # 解析返回结果
        if result.stdout:
            lines = result.stdout.strip().split('\n')
            if len(lines) >= 2:
                try:
                    count = int(lines[1].strip())
                    return count > 0
                except:
                    return False
        return False
    except Exception as e:
        print(f"检查表数据时出错: {e}")
        return False

def init_database_from_sql():
    """通过 mysql 命令行执行 SQL 文件初始化数据库"""
    try:
        # 检查表是否存在且有数据
        if table_has_data():
            print(f"✓ 表 'powerstation' 已存在且有数据，跳过导入")
            return True
        
        # 获取 SQL 文件路径
        sql_file_path = os.path.join(os.path.dirname(__file__), 'powerstation.sql')
        
        if not os.path.exists(sql_file_path):
            print(f"错误: SQL 文件不存在: {sql_file_path}")
            return False
        
        print("表不存在或无数据，正在导入...")
        
        # 构建 mysql 命令
        # mysql -u 用户名 -p 数据库名 < /path/to/file.sql
        if DB_CONFIG['password']:
            cmd = f"mysql -h {DB_CONFIG['host']} -u {DB_CONFIG['user']} -p{DB_CONFIG['password']} {DB_CONFIG['database']} < {sql_file_path}"
        else:
            cmd = f"mysql -h {DB_CONFIG['host']} -u {DB_CONFIG['user']} {DB_CONFIG['database']} < {sql_file_path}"
        
        # 执行命令
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✓ 数据库初始化成功！")
            print(f"✓ 数据库: {DB_CONFIG['database']}")
            print(f"✓ 表 'powerstation' 创建成功！")
            return True
        else:
            print(f"✗ 执行 SQL 文件出错: {result.stderr}")
            return False
            
    except Exception as e:
        print(f"初始化数据库时出错: {e}")
        return False

if __name__ == '__main__':
    print("开始初始化数据库...")
    success = init_database_from_sql()
    if success:
        print("数据库初始化完成！")
    else:
        print("数据库初始化失败！")