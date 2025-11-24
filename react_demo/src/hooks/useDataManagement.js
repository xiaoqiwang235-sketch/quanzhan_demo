import { useState, useEffect } from 'react';
import { DEFAULT_PAGE_SIZE } from '../constants/config';
import * as api from '../services/api';

export const useDataManagement = (showMessage) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [total, setTotal] = useState(0);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });

  const fetchData = async (page = 1, size = pageSize, search = searchTerm) => {
    setLoading(true);
    setError('');
    try {
      const result = await api.fetchData(page, size, sortConfig, search);

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

  useEffect(() => {
    fetchData(1);
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
    fetchData(1, pageSize, value);
  };

  const handleSort = (key) => {
    const newDirection = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction: newDirection });
    setCurrentPage(1);
    fetchData(1, pageSize, searchTerm);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchData(page, pageSize, searchTerm);
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setCurrentPage(1);
    fetchData(1, size, searchTerm);
  };

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

  const handleDelete = async (id) => {
    try {
      const result = await api.deleteData(id);
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

  const handleBatchDelete = async () => {
    if (selectedRows.size === 0) return;
    if (!window.confirm(`[!] DELETE ${selectedRows.size} TARGETS? (Y/N)`)) return;

    try {
      const result = await api.batchDeleteData(Array.from(selectedRows));
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

  const handleUpdate = async (id, formData) => {
    try {
      const result = await api.updateData(id, formData);
      if (result.success) {
        showMessage(`>>> UPDATED: ID_${id}`, 'success');
        fetchData(currentPage, pageSize, searchTerm);
        return true;
      } else {
        showMessage(result.error || '更新失败', 'error');
        return false;
      }
    } catch (err) {
      showMessage(`更新失败: ${err.message}`, 'error');
      return false;
    }
  };

  const handleCreate = async (formData) => {
    try {
      const result = await api.createData(formData);
      if (result.success) {
        showMessage(`>>> INJECTED: NEW_STATION_${result.id}`, 'success');
        fetchData(1, pageSize, searchTerm);
        return true;
      } else {
        showMessage(result.error || '添加失败', 'error');
        return false;
      }
    } catch (err) {
      showMessage(`添加失败: ${err.message}`, 'error');
      return false;
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return {
    data,
    loading,
    error,
    searchTerm,
    currentPage,
    pageSize,
    total,
    totalPages,
    selectedRows,
    sortConfig,
    handleSearch,
    handleSort,
    handlePageChange,
    handlePageSizeChange,
    handleSelectAll,
    handleSelectRow,
    handleDelete,
    handleBatchDelete,
    handleUpdate,
    handleCreate
  };
};
