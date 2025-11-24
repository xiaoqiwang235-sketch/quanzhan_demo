import React from 'react';
import { Search, Plus, Zap } from 'lucide-react';
import { PAGE_SIZE_OPTIONS } from '../../constants/config';

export const Toolbar = ({
  searchTerm,
  handleSearch,
  selectedRows,
  handleBatchDelete,
  setIsAddingNew,
  pageSize,
  handlePageSizeChange,
  total,
  loading,
  c
}) => {
  return (
    <div className={`border-b-2 ${c.border} p-6 ${c.secondary}`}>
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className={`absolute left-3 top-3 w-5 h-5 ${c.textSecondary}`} />
          <input
            type="text"
            placeholder="搜索..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className={`w-full pl-10 pr-4 py-2 ${c.inputBg} border-2 ${c.inputBorder} ${c.text} focus:outline-none ${c.borderHover} transition`}
          />
        </div>

        <div className="flex gap-2">
          {selectedRows.size > 0 && (
            <button
              onClick={handleBatchDelete}
              className="px-4 py-2 bg-red-600 text-white border-2 border-red-700 hover:bg-red-700 transition font-bold flex items-center gap-2 text-xs"
            >
              <Zap className="w-4 h-4" />
              删除 ({selectedRows.size})
            </button>
          )}
          <button
            onClick={() => setIsAddingNew(true)}
            className={`px-4 py-2 ${c.primary} text-white border-2 ${c.buttonBorder} ${c.primaryHover} transition font-bold flex items-center gap-2 text-xs`}
          >
            <Plus className="w-4 h-4" />
            新增
          </button>
        </div>
      </div>

      <div className="flex gap-4 mt-4 text-xs">
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          className={`px-3 py-2 ${c.inputBg} border-2 ${c.inputBorder} ${c.text} focus:outline-none ${c.borderHover} transition font-bold`}
        >
          {PAGE_SIZE_OPTIONS.map(size => (
            <option key={size} value={size}>每页 {size} 条</option>
          ))}
        </select>
        <div className={`${c.textSecondary} py-2 border-l ${c.border} pl-4`}>
          总计: {total} 条 | 状态: {loading ? '加载中...' : '就绪'}
        </div>
      </div>
    </div>
  );
};
