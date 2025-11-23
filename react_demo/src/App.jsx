import React, { useState, useMemo, useEffect } from 'react';
import { Trash2, Edit, Plus, Search, ChevronLeft, ChevronRight, Terminal, Zap, AlertCircle, Loader, X } from 'lucide-react';

const API_URL = 'http://127.0.0.1:8899';

export default function DataTableManager() {
  // 状态管理
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newFormData, setNewFormData] = useState({
    lng: '', lat: '', annualCarbon: '', capacity: '', coalType: '',
    country: '', plant: '', status: 'Operating', type: 'Subcritical',
    retire1: '', retire2: '', retire3: '', start1: '', start2: '',
    year1: '', year2: '', startLabel: '', regionLabel: ''
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('success');

  // 获取数据
  const fetchData = async (page = 1, size = pageSize, search = searchTerm) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        page,
        pageSize: size,
        sortBy: sortConfig.key,
        sortOrder: sortConfig.direction,
        ...(search && { search })
      });

      const response = await fetch(`${API_URL}/data?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) throw new Error(`API错误: ${response.status}`);

      const result = await response.json();
      if (result.success) {
        setData(result.data);
        setTotal(result.total);
        setSelectedRows(new Set());
      } else {
        setError(result.error || '获取数据失败');
      }
    } catch (err) {
      setError(`连接失败: ${err.message}，请确保后端服务器运行中`);
      console.error('数据获取错误:', err);
    } finally {
      setLoading(false);
    }
  };

  // 初始化加载数据
  useEffect(() => {
    fetchData(1);
  }, []);

  // 处理搜索
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    fetchData(1, pageSize, value);
  };

  // 处理排序
  const handleSort = (key) => {
    const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction: newDirection });
    setCurrentPage(1);
    fetchData(1, pageSize, searchTerm);
  };

  // 处理分页
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, pageSize, searchTerm);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
    fetchData(1, size, searchTerm);
  };

  // 多选
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(new Set(data.map(item => item.id)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const handleSelectRow = (id) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRows(newSelected);
  };

  // 删除单条
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/data/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });

      const result = await response.json();
      if (result.success) {
        showMessage(`>>> PURGED: ID_${id}`, 'success');
        fetchData(currentPage, pageSize, searchTerm);
      } else {
        showMessage(result.error || '删除失败', 'error');
      }
    } catch (err) {
      showMessage(`删除失败: ${err.message}`, 'error');
    }
  };

  // 批量删除
  const handleBatchDelete = async () => {
    if (selectedRows.size === 0) return;
    if (!window.confirm(`[!] DELETE ${selectedRows.size} TARGETS? (Y/N)`)) return;

    try {
      const response = await fetch(`${API_URL}/data/batch`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedRows) })
      });

      const result = await response.json();
      if (result.success) {
        showMessage(`>>> PURGED: ${result.deleted_count} RECORDS ELIMINATED`, 'success');
        fetchData(1, pageSize, searchTerm);
      } else {
        showMessage(result.error || '删除失败', 'error');
      }
    } catch (err) {
      showMessage(`删除失败: ${err.message}`, 'error');
    }
  };

  // 编辑
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditFormData({ ...item });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`${API_URL}/data/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editFormData)
      });

      const result = await response.json();
      if (result.success) {
        showMessage(`>>> UPDATED: ID_${editingId}`, 'success');
        setEditingId(null);
        fetchData(currentPage, pageSize, searchTerm);
      } else {
        showMessage(result.error || '更新失败', 'error');
      }
    } catch (err) {
      showMessage(`更新失败: ${err.message}`, 'error');
    }
  };

  // 添加新记录
  const handleAddNew = async () => {
    try {
      const response = await fetch(`${API_URL}/data`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newFormData)
      });

      const result = await response.json();
      if (result.success) {
        showMessage(`>>> INJECTED: NEW_STATION_${result.id}`, 'success');
        setIsAddingNew(false);
        setNewFormData({
          lng: '', lat: '', annualCarbon: '', capacity: '', coalType: '',
          country: '', plant: '', status: 'Operating', type: 'Subcritical',
          retire1: '', retire2: '', retire3: '', start1: '', start2: '',
          year1: '', year2: '', startLabel: '', regionLabel: ''
        });
        fetchData(1, pageSize, searchTerm);
      } else {
        showMessage(result.error || '添加失败', 'error');
      }
    } catch (err) {
      showMessage(`添加失败: ${err.message}`, 'error');
    }
  };

  const showMessage = (msg, type = 'success') => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => setMessage(''), 2500);
  };

  const totalPages = Math.ceil(total / pageSize);

  const getStatusColor = (status) => {
    const colors = {
      'Operating': 'bg-emerald-900 text-emerald-300 border border-emerald-500',
      'Retired': 'bg-slate-900 text-slate-400 border border-slate-600',
      'Under Construction': 'bg-amber-900 text-amber-300 border border-amber-500'
    };
    return colors[status] || 'bg-slate-900 text-slate-400';
  };

  const displayFields = ['id', 'plant', 'country', 'capacity', 'coalType', 'status', 'year1'];

  return (
    <div className="min-h-screen bg-black text-emerald-400 font-mono overflow-hidden relative">
      {/* 背景动画效果 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-transparent to-cyan-500 blur-3xl"></div>
      </div>

      {/* 网格背景 */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: 'linear-gradient(0deg, #10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        {/* 标题 */}
        <div className="mb-8 border-l-4 border-emerald-500 pl-4">
          <Terminal className="w-6 h-6 inline mr-2" />
          <h1 className="text-3xl font-bold inline text-emerald-300">[ POWER_STATION_DATABASE ]</h1>
          <div className="text-sm text-emerald-600 mt-2">$ sudo access_level.admin</div>
          <div className="text-xs text-emerald-700 mt-1">root@nexus:~# database_manager --mode=exploit</div>
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-950 border-l-4 border-red-500 p-4 mb-6 text-red-300 text-sm font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* 主容器 */}
        <div className="bg-black border-2 border-emerald-500 rounded-none shadow-2xl overflow-hidden" style={{
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.3), inset 0 0 20px rgba(16, 185, 129, 0.05)'
        }}>
          {/* 顶部工具栏 */}
          <div className="border-b-2 border-emerald-500 p-6 bg-black bg-opacity-50">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              {/* 搜索框 */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 w-5 h-5 text-emerald-600" />
                <input
                  type="text"
                  placeholder="> scan_target..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-black border-2 border-emerald-600 text-emerald-300 placeholder-emerald-700 focus:outline-none focus:border-emerald-400 focus:shadow-lg focus:shadow-emerald-500/50 transition"
                />
              </div>

              {/* 操作按钮 */}
              <div className="flex gap-2">
                {selectedRows.size > 0 && (
                  <button
                    onClick={handleBatchDelete}
                    className="px-4 py-2 bg-red-950 text-red-300 border-2 border-red-600 hover:bg-red-900 hover:shadow-lg hover:shadow-red-600/50 transition font-bold flex items-center gap-2 uppercase text-xs"
                  >
                    <Zap className="w-4 h-4" />
                    PURGE ({selectedRows.size})
                  </button>
                )}
                <button
                  onClick={() => setIsAddingNew(true)}
                  className="px-4 py-2 bg-emerald-950 text-emerald-300 border-2 border-emerald-600 hover:bg-emerald-900 hover:shadow-lg hover:shadow-emerald-600/50 transition font-bold flex items-center gap-2 uppercase text-xs"
                >
                  <Plus className="w-4 h-4" />
                  INJECT
                </button>
              </div>
            </div>

            {/* 分页和显示数量 */}
            <div className="flex gap-4 mt-4 text-xs">
              <select
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="px-3 py-2 bg-black border-2 border-emerald-600 text-emerald-300 focus:outline-none focus:border-emerald-400 transition uppercase font-bold"
              >
                <option value={10}>10 ROWS</option>
                <option value={20}>20 ROWS</option>
                <option value={50}>50 ROWS</option>
              </select>
              <div className="text-emerald-600 py-2 border-l border-emerald-600 pl-4">
                TOTAL: {total} | STATUS: {loading ? 'LOADING...' : 'OK'}
              </div>
            </div>
          </div>

          {/* 消息提示 */}
          {message && (
            <div className={`border-l-4 p-4 mx-6 mt-6 text-sm font-mono animate-pulse ${
              messageType === 'success' 
                ? 'bg-black border-emerald-500 text-emerald-300' 
                : 'bg-black border-red-500 text-red-300'
            }`}>
              <span className="text-emerald-600">$</span> {message}
            </div>
          )}

          {/* 加载状态 */}
          {loading && (
            <div className="flex items-center justify-center py-12 text-emerald-400">
              <Loader className="w-6 h-6 animate-spin mr-2" />
              <span>SCANNING DATABASE...</span>
            </div>
          )}

          {/* 表格 */}
          {!loading && (
            <div className="relative overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-black border-b-2 border-emerald-500 sticky top-0 z-20">
                    <tr>
                      <th className="sticky left-0 z-30 px-6 py-4 text-left bg-black border-r-2 border-emerald-500">
                        <input
                          type="checkbox"
                          checked={selectedRows.size === data.length && data.length > 0}
                          onChange={handleSelectAll}
                          className="w-4 h-4 cursor-pointer accent-emerald-500"
                        />
                      </th>
                      {displayFields.map(key => (
                        <th
                          key={key}
                          onClick={() => handleSort(key)}
                          className={`px-6 py-4 text-left text-emerald-400 cursor-pointer hover:text-emerald-300 hover:bg-emerald-950/20 transition uppercase font-bold text-xs tracking-wide ${
                            key === 'id' ? 'sticky left-16 z-30 bg-black border-r-2 border-emerald-500' : ''
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            {key === 'id' && '[ID]'}
                            {key === 'plant' && '[PLANT]'}
                            {key === 'country' && '[COUNTRY]'}
                            {key === 'capacity' && '[CAPACITY]'}
                            {key === 'coalType' && '[TYPE]'}
                            {key === 'status' && '[STATUS]'}
                            {key === 'year1' && '[YEAR]'}
                            {sortConfig.key === key && (
                              <span className="text-emerald-500">{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                            )}
                          </div>
                        </th>
                      ))}
                      <th className="sticky right-0 z-30 px-6 py-4 text-left text-emerald-400 uppercase font-bold text-xs tracking-wide bg-black border-l-2 border-emerald-500">[ACTION]</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, idx) => (
                      <tr
                        key={item.id}
                        className={`border-b border-emerald-900 hover:bg-emerald-950/20 transition cursor-pointer ${
                          idx % 2 === 0 ? 'bg-black/30' : 'bg-black/60'
                        }`}
                      >
                        <td className="sticky left-0 z-10 px-6 py-4 bg-black border-r-2 border-emerald-900">
                          <input
                            type="checkbox"
                            checked={selectedRows.has(item.id)}
                            onChange={() => handleSelectRow(item.id)}
                            className="w-4 h-4 cursor-pointer accent-emerald-500"
                          />
                        </td>
                        <td className="sticky left-16 z-10 px-6 py-4 text-emerald-400 font-bold text-sm bg-black border-r-2 border-emerald-900">
                          0x{String(item.id).padStart(4, '0')}
                        </td>
                        <td className="px-6 py-4 text-emerald-300 font-mono text-xs max-w-xs truncate">{item.plant || '-'}</td>
                        <td className="px-6 py-4 text-emerald-600 text-xs font-mono">{item.country || '-'}</td>
                        <td className="px-6 py-4 text-emerald-300 text-xs">{item.capacity ? item.capacity.toLocaleString() : '-'}</td>
                        <td className="px-6 py-4 text-emerald-300 text-xs">{item.coalType || '-'}</td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider inline-block ${getStatusColor(item.status)}`}>
                            {item.status || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-emerald-300 text-xs">{item.year1 || '-'}</td>
                        <td className="sticky right-0 z-10 px-6 py-4 bg-black border-l-2 border-emerald-900">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(item)}
                              className="p-2 text-cyan-400 border border-cyan-600 hover:bg-cyan-950 hover:shadow-lg hover:shadow-cyan-500/50 rounded transition font-bold"
                              title="EDIT"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (window.confirm(`[!] CONFIRM PURGE ID_${item.id}?`)) {
                                  handleDelete(item.id);
                                }
                              }}
                              className="p-2 text-red-400 border border-red-600 hover:bg-red-950 hover:shadow-lg hover:shadow-red-500/50 rounded transition font-bold"
                              title="PURGE"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 分页按钮 */}
          {!loading && (
            <div className="border-t-2 border-emerald-500 px-6 py-4 bg-black bg-opacity-50 flex items-center justify-between text-xs">
              <div className="text-emerald-600 font-mono">
                PAGE [{currentPage}/{totalPages}]
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="p-2 border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-950 disabled:opacity-30 disabled:cursor-not-allowed transition font-bold"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum = i + 1;
                  if (totalPages > 5 && currentPage > 3) {
                    pageNum = currentPage - 2 + i;
                  }
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-2 font-bold transition ${
                        currentPage === pageNum
                          ? 'bg-emerald-600 text-black border-2 border-emerald-400'
                          : 'border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-950'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-950 disabled:opacity-30 disabled:cursor-not-allowed transition font-bold"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 编辑弹窗 */}
      {editingId && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-black border-2 border-emerald-500 rounded-none shadow-2xl max-w-2xl w-full p-6 my-8" style={{
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.5), inset 0 0 20px rgba(16, 185, 129, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <div className="text-emerald-400 font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                <Terminal className="w-4 h-4" /> EDIT MODE
              </div>
              <button onClick={() => setEditingId(null)} className="text-emerald-400 hover:text-red-400 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {Object.keys(editFormData).filter(k => k !== 'id').map(key => (
                <input
                  key={key}
                  type={['lng', 'lat', 'annualCarbon', 'capacity', 'retire1', 'retire2', 'retire3', 'start1', 'start2', 'year1', 'year2'].includes(key) ? 'number' : 'text'}
                  value={editFormData[key] || ''}
                  onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                  placeholder={key.toUpperCase()}
                  className="px-4 py-2 bg-black border-2 border-emerald-600 text-emerald-300 placeholder-emerald-700 focus:outline-none focus:border-emerald-400 font-mono text-sm col-span-1"
                  style={{ fontSize: '12px' }}
                />
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setEditingId(null)}
                className="flex-1 px-4 py-2 border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-950 transition font-bold uppercase text-xs"
              >
                CANCEL
              </button>
              <button
                onClick={handleSaveEdit}
                className="flex-1 px-4 py-2 bg-emerald-600 text-black hover:bg-emerald-500 transition font-bold uppercase text-xs"
              >
                CONFIRM
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 添加新记录弹窗 */}
      {isAddingNew && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-black border-2 border-emerald-500 rounded-none shadow-2xl max-w-2xl w-full p-6 my-8" style={{
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.5), inset 0 0 20px rgba(16, 185, 129, 0.1)'
          }}>
            <div className="flex items-center justify-between mb-6">
              <div className="text-emerald-400 font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                <Zap className="w-4 h-4" /> INJECT NEW ENTITY
              </div>
              <button onClick={() => setIsAddingNew(false)} className="text-emerald-400 hover:text-red-400 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 max-h-96 overflow-y-auto">
              {Object.keys(newFormData).map(key => (
                <input
                  key={key}
                  type={['lng', 'lat', 'annualCarbon', 'capacity', 'retire1', 'retire2', 'retire3', 'start1', 'start2', 'year1', 'year2'].includes(key) ? 'number' : 'text'}
                  value={newFormData[key]}
                  onChange={(e) => setNewFormData({ ...newFormData, [key]: e.target.value })}
                  placeholder={key.toUpperCase()}
                  className="px-4 py-2 bg-black border-2 border-emerald-600 text-emerald-300 placeholder-emerald-700 focus:outline-none focus:border-emerald-400 font-mono text-sm col-span-1"
                  style={{ fontSize: '12px' }}
                />
              ))}
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsAddingNew(false)}
                className="flex-1 px-4 py-2 border-2 border-emerald-600 text-emerald-400 hover:bg-emerald-950 transition font-bold uppercase text-xs"
              >
                ABORT
              </button>
              <button
                onClick={handleAddNew}
                className="flex-1 px-4 py-2 bg-emerald-600 text-black hover:bg-emerald-500 transition font-bold uppercase text-xs"
              >
                EXECUTE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}