from flask import Flask, jsonify, request
import pymysql
import pymysql.cursors
from flask_cors import CORS
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()
password = os.getenv("mysql_password")
app = Flask(__name__)
CORS(app)  # 允许跨域请求
print("PASSWORD",password)
# 数据库配置
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': password,  # 请修改为你的MySQL密码
    'database': 'quanzhan_demo',  # 请修改为你的数据库名
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

def get_db_connection():
    """获取数据库连接"""
    try:
        connection = pymysql.connect(**DB_CONFIG)
        return connection
    except Exception as e:
        print(f"数据库连接失败: {e}")
        return None

@app.route('/')
def index():
    return jsonify({
        'status': 'success',
        'message': 'API Server is running!',
        'version': '1.0.0'
    })

@app.route('/data', methods=['GET'])
def get_data():
    """
    分页查询数据接口
    参数:
    - page: 页码 (默认: 1)
    - pageSize: 每页数量 (默认: 10)
    - search: 搜索关键词 (可选，搜索plant和country字段)
    - sortBy: 排序字段 (可选)
    - sortOrder: 排序顺序 asc/desc (默认: desc)
    """
    try:
        # 获取分页参数
        page = int(request.args.get('page', 1))
        page_size = int(request.args.get('pageSize', 10))
        search = request.args.get('search', '').strip()
        sort_by = request.args.get('sortBy', 'id')
        sort_order = request.args.get('sortOrder', 'desc').upper()
        
        # 参数验证
        if page < 1:
            page = 1
        if page_size < 1 or page_size > 100:
            page_size = 10
        if sort_order not in ['ASC', 'DESC']:
            sort_order = 'DESC'
        
        # 允许排序的字段
        allowed_sort_fields = ['id', 'lng', 'lat', 'annualCarbon', 'capacity', 'coalType',
                              'country', 'plant', 'status', 'type', 'retire1', 'retire2',
                              'retire3', 'start1', 'start2', 'year1', 'year2',
                              'startLabel', 'regionLabel']
        if sort_by not in allowed_sort_fields:
            sort_by = 'id'
        
        # 计算偏移量
        offset = (page - 1) * page_size
        
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'error': '数据库连接失败',
                'data': [],
                'total': 0
            }), 500
        
        try:
            with connection.cursor() as cursor:
                # 构建WHERE条件
                where_condition = ""
                params = []
                
                if search:
                    where_condition = "WHERE (plant LIKE %s OR country LIKE %s)"
                    search_param = f"%{search}%"
                    params = [search_param, search_param]
                
                # 获取总记录数
                count_sql = f"SELECT COUNT(*) as total FROM powerstation {where_condition}"
                cursor.execute(count_sql, params)
                total_result = cursor.fetchone()
                total = total_result['total'] if total_result else 0
                
                # 获取分页数据
                data_sql = f"""
                SELECT 
                    id,
                    lng,
                    lat,
                    annualCarbon,
                    capacity,
                    coalType,
                    country,
                    plant,
                    status,
                    type,
                    retire1,
                    retire2,
                    retire3,
                    start1,
                    start2,
                    year1,
                    year2,
                    startLabel,
                    regionLabel
                FROM powerstation 
                {where_condition}
                ORDER BY {sort_by} {sort_order}
                LIMIT %s OFFSET %s
                """
                
                query_params = params + [page_size, offset]
                cursor.execute(data_sql, query_params)
                data = cursor.fetchall()
                
                # 处理数据格式
                for item in data:
                    for field in ['id', 'lng', 'lat', 'annualCarbon', 'capacity', 'retire1', 'retire2', 'retire3', 'start1', 'start2', 'year1', 'year2']:
                        if field in item and item[field] is not None:
                            try:
                                item[field] = float(item[field]) if '.' in str(item[field]) else int(item[field])
                            except:
                                pass
                    for field in ['coalType', 'country', 'plant', 'status', 'type', 'startLabel', 'regionLabel']:
                        if field in item and item[field] is None:
                            item[field] = ''
                
                return jsonify({
                    'success': True,
                    'data': data,
                    'total': total,
                    'page': page,
                    'pageSize': page_size,
                    'totalPages': (total + page_size - 1) // page_size
                })
                
        finally:
            connection.close()
            
    except ValueError as e:
        return jsonify({
            'success': False,
            'error': '参数错误',
            'message': str(e)
        }), 400
        
    except Exception as e:
        print(f"查询数据时出错: {e}")
        return jsonify({
            'success': False,
            'error': '服务器内部错误',
            'message': str(e)
        }), 500

@app.route('/data/<int:id>', methods=['GET'])
def get_data_by_id(id):
    """获取单条数据"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'success': False,
                'error': '数据库连接失败'
            }), 500
        
        try:
            with connection.cursor() as cursor:
                cursor.execute("""
                    SELECT * FROM powerstation WHERE id = %s
                """, (id,))
                data = cursor.fetchone()
                
                if not data:
                    return jsonify({
                        'success': False,
                        'error': '记录不存在',
                        'message': f'ID为 {id} 的记录不存在'
                    }), 404
                
                return jsonify({
                    'success': True,
                    'data': data
                })
                
        finally:
            connection.close()
            
    except Exception as e:
        return jsonify({
            'success': False,
            'error': '服务器内部错误',
            'message': str(e)
        }), 500

@app.route('/data', methods=['POST'])
def add_data():
    """添加新数据 - ID自动设置为最大ID+1"""
    try:
        data = request.get_json()

        if not data:
            return jsonify({
                'success': False,
                'error': '参数错误',
                'message': '请求体不能为空'
            }), 400

        connection = get_db_connection()
        if not connection:
            return jsonify({
                'success': False,
                'error': '数据库连接失败'
            }), 500

        try:
            with connection.cursor() as cursor:
                # 查询当前最大ID
                cursor.execute("SELECT COALESCE(MAX(id), 0) as max_id FROM powerstation")
                result = cursor.fetchone()
                new_id = result['max_id'] + 1

                # 构建字段列表和值列表
                fields = ['id']  # ID字段必须包含
                values = [new_id]
                placeholders = ['%s']

                # 允许的字段
                allowed_fields = ['lng', 'lat', 'annualCarbon', 'capacity', 'coalType',
                                 'country', 'plant', 'status', 'type', 'retire1', 'retire2',
                                 'retire3', 'start1', 'start2', 'year1', 'year2',
                                 'startLabel', 'regionLabel']

                for field in allowed_fields:
                    if field in data and data[field] is not None and data[field] != '':
                        fields.append(field)
                        values.append(data[field])
                        placeholders.append('%s')

                if len(fields) == 1:  # 只有ID字段
                    return jsonify({
                        'success': False,
                        'error': '参数错误',
                        'message': '没有提供有效的数据字段'
                    }), 400

                sql = f"""
                INSERT INTO powerstation ({', '.join(fields)})
                VALUES ({', '.join(placeholders)})
                """
                cursor.execute(sql, values)
                connection.commit()

                return jsonify({
                    'success': True,
                    'message': '数据添加成功',
                    'id': new_id
                })

        finally:
            connection.close()

    except Exception as e:
        print(f"添加数据时出错: {e}")
        return jsonify({
            'success': False,
            'error': '服务器内部错误',
            'message': str(e)
        }), 500

@app.route('/data/<int:id>', methods=['PUT'])
def update_data(id):
    """更新数据"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': '参数错误',
                'message': '请求体不能为空'
            }), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'success': False,
                'error': '数据库连接失败'
            }), 500
        
        try:
            with connection.cursor() as cursor:
                # 检查记录是否存在
                cursor.execute("SELECT id FROM powerstation WHERE id = %s", (id,))
                if not cursor.fetchone():
                    return jsonify({
                        'success': False,
                        'error': '记录不存在',
                        'message': f'ID为 {id} 的记录不存在'
                    }), 404
                
                # 构建更新SQL
                set_clauses = []
                values = []
                
                allowed_fields = ['lng', 'lat', 'annualCarbon', 'capacity', 'coalType', 
                                 'country', 'plant', 'status', 'type', 'retire1', 'retire2', 
                                 'retire3', 'start1', 'start2', 'year1', 'year2', 
                                 'startLabel', 'regionLabel']
                
                for field in allowed_fields:
                    if field in data:
                        set_clauses.append(f"{field} = %s")
                        values.append(data[field])
                
                if not set_clauses:
                    return jsonify({
                        'success': False,
                        'error': '参数错误',
                        'message': '没有提供有效的更新字段'
                    }), 400
                
                values.append(id)
                
                sql = f"""
                UPDATE powerstation 
                SET {', '.join(set_clauses)}
                WHERE id = %s
                """
                cursor.execute(sql, values)
                connection.commit()
                
                return jsonify({
                    'success': True,
                    'message': '数据更新成功',
                    'updated_id': id
                })
                
        finally:
            connection.close()
            
    except Exception as e:
        print(f"更新数据时出错: {e}")
        return jsonify({
            'success': False,
            'error': '服务器内部错误',
            'message': str(e)
        }), 500

@app.route('/data/<int:id>', methods=['DELETE'])
def delete_data(id):
    """删除数据"""
    try:
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'success': False,
                'error': '数据库连接失败'
            }), 500
        
        try:
            with connection.cursor() as cursor:
                cursor.execute("SELECT id FROM powerstation WHERE id = %s", (id,))
                if not cursor.fetchone():
                    return jsonify({
                        'success': False,
                        'error': '记录不存在',
                        'message': f'ID为 {id} 的记录不存在'
                    }), 404
                
                cursor.execute("DELETE FROM powerstation WHERE id = %s", (id,))
                connection.commit()
                
                return jsonify({
                    'success': True,
                    'message': '数据删除成功',
                    'deleted_id': id
                })
                
        finally:
            connection.close()
            
    except Exception as e:
        print(f"删除数据时出错: {e}")
        return jsonify({
            'success': False,
            'error': '服务器内部错误',
            'message': str(e)
        }), 500

@app.route('/data/batch', methods=['POST'])
def batch_delete_data():
    """批量删除数据"""
    try:
        data = request.get_json()
        ids = data.get('ids', [])
        
        if not ids or not isinstance(ids, list):
            return jsonify({
                'success': False,
                'error': '参数错误',
                'message': 'ids必须是数组'
            }), 400
        
        connection = get_db_connection()
        if not connection:
            return jsonify({
                'success': False,
                'error': '数据库连接失败'
            }), 500
        
        try:
            with connection.cursor() as cursor:
                # 构建IN子句
                placeholders = ','.join(['%s'] * len(ids))
                sql = f"DELETE FROM powerstation WHERE id IN ({placeholders})"
                cursor.execute(sql, ids)
                connection.commit()
                
                deleted_count = cursor.rowcount
                
                return jsonify({
                    'success': True,
                    'message': f'成功删除 {deleted_count} 条记录',
                    'deleted_count': deleted_count
                })
                
        finally:
            connection.close()
            
    except Exception as e:
        print(f"批量删除数据时出错: {e}")
        return jsonify({
            'success': False,
            'error': '服务器内部错误',
            'message': str(e)
        }), 500

@app.route('/test-connection', methods=['GET'])
def test_connection():
    """测试数据库连接"""
    try:
        connection = get_db_connection()
        if connection:
            with connection.cursor() as cursor:
                cursor.execute("SELECT COUNT(*) as count FROM powerstation")
                result = cursor.fetchone()
            connection.close()
            return jsonify({
                'success': True,
                'status': 'success',
                'message': '数据库连接正常',
                'record_count': result['count']
            })
        else:
            return jsonify({
                'success': False,
                'status': 'error',
                'message': '数据库连接失败'
            }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'status': 'error',
            'message': f'连接测试失败: {str(e)}'
        }), 500

if __name__ == '__main__':
    print("启动服务器...")
    print("API 接口地址: http://127.0.0.1:8899")
    print("=" * 60)
    print("可用接口:")
    print("  GET  /data - 分页查询数据 (支持search, sortBy, sortOrder)")
    print("  GET  /data/<id> - 获取单条数据")
    print("  POST /data - 添加新数据")
    print("  PUT  /data/<id> - 更新数据")
    print("  DELETE /data/<id> - 删除单条数据")
    print("  POST /data/batch - 批量删除数据")
    print("  GET  /test-connection - 测试连接")
    print("=" * 60)
    app.run(host='127.0.0.1', port=8899, debug=True)