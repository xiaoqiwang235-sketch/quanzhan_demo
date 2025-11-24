import React, { useState } from 'react';
import { Loader, AlertCircle } from 'lucide-react';
import { Navbar } from './components/Navbar/Navbar';
import { Toolbar } from './components/Toolbar/Toolbar';
import { DataTable } from './components/DataTable/DataTable';
import { Pagination } from './components/Pagination/Pagination';
import { EditModal } from './components/Modal/EditModal';
import { AddModal } from './components/Modal/AddModal';
import { Message } from './components/Message/Message';
import { useTheme } from './hooks/useTheme';
import { useMessage } from './hooks/useMessage';
import { useDataManagement } from './hooks/useDataManagement';

export default function DataTableManager() {
  const { theme, setTheme, currentTheme, c } = useTheme();
  const { message, messageType, showMessage } = useMessage();
  const {
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
  } = useDataManagement(showMessage);

  const [editingItem, setEditingItem] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  const handleEdit = (item) => {
    setEditingItem(item);
  };

  return (
    <div className={`min-h-screen ${c.bg} ${c.text} font-mono overflow-hidden relative`}>
      {/* 背景装饰 - 仅黑客主题显示 */}
      {theme === 'hacker' && (
        <>
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-transparent to-cyan-500 blur-3xl"></div>
          </div>
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: 'linear-gradient(0deg, #10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </>
      )}

      {/* 导航栏 */}
      <Navbar theme={theme} setTheme={setTheme} currentTheme={currentTheme} />

      <div className="max-w-7xl mx-auto p-8 relative z-10">
        {/* 错误提示 */}
        {error && (
          <div className={`border-l-4 border-red-500 p-4 mb-6 text-sm font-mono flex items-center gap-2 ${
            theme === 'light' ? 'bg-red-50 text-red-800' : 'bg-red-950 text-red-300'
          }`}>
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        {/* 主容器 */}
        <div className={`${c.cardBg} border-2 ${c.border} rounded-lg shadow-2xl overflow-hidden`}>
          {/* 顶部工具栏 */}
          <Toolbar
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            selectedRows={selectedRows}
            handleBatchDelete={handleBatchDelete}
            setIsAddingNew={setIsAddingNew}
            pageSize={pageSize}
            handlePageSizeChange={handlePageSizeChange}
            total={total}
            loading={loading}
            c={c}
          />

          {/* 消息提示 */}
          <Message message={message} messageType={messageType} theme={theme} />

          {/* 加载状态 */}
          {loading && (
            <div className={`flex items-center justify-center py-12 ${c.text}`}>
              <Loader className="w-6 h-6 animate-spin mr-2" />
              <span>加载中...</span>
            </div>
          )}

          {/* 表格 */}
          {!loading && (
            <DataTable
              data={data}
              theme={theme}
              c={c}
              selectedRows={selectedRows}
              handleSelectAll={handleSelectAll}
              handleSelectRow={handleSelectRow}
              sortConfig={sortConfig}
              handleSort={handleSort}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          )}

          {/* 分页按钮 */}
          {!loading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              total={total}
              handlePageChange={handlePageChange}
              theme={theme}
              c={c}
            />
          )}
        </div>
      </div>

      {/* 编辑弹窗 */}
      {editingItem && (
        <EditModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleUpdate}
          c={c}
          theme={theme}
        />
      )}

      {/* 添加新记录弹窗 */}
      {isAddingNew && (
        <AddModal
          onClose={() => setIsAddingNew(false)}
          onAdd={handleCreate}
          c={c}
          theme={theme}
        />
      )}
    </div>
  );
}
