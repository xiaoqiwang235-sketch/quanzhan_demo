import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { DISPLAY_FIELDS, FIELD_LABELS } from '../../constants/config';
import { getStatusColor } from '../../utils/helpers';

export const DataTable = ({
  data,
  theme,
  c,
  selectedRows,
  handleSelectAll,
  handleSelectRow,
  sortConfig,
  handleSort,
  handleEdit,
  handleDelete
}) => {
  return (
    <div className="relative overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className={`${c.secondary} border-b-2 ${c.border} sticky top-0 z-20`}>
            <tr>
              <th className={`sticky left-0 z-30 px-6 py-4 text-left ${c.secondary} border-r-2 ${c.border}`}>
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length && data.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 cursor-pointer accent-emerald-500"
                />
              </th>
              {DISPLAY_FIELDS.map(key => (
                <th
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`px-6 py-4 text-left ${c.primaryText} cursor-pointer ${c.secondaryHover} transition uppercase font-bold text-xs tracking-wide ${
                    key === 'id' ? `sticky left-16 z-30 ${c.secondary} border-r-2 ${c.border}` : ''
                  }`}
                >
                  <div className="flex items-center gap-2 whitespace-nowrap">
                    {FIELD_LABELS[key]}
                    {sortConfig.key === key && (
                      <span className={c.primaryText}>{sortConfig.direction === 'asc' ? '▲' : '▼'}</span>
                    )}
                  </div>
                </th>
              ))}
              <th className={`sticky right-0 z-30 px-6 py-4 text-left ${c.primaryText} uppercase font-bold text-xs tracking-wide ${c.secondary} border-l-2 ${c.border}`}>
                [ACTION]
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, idx) => (
              <tr
                key={item.id}
                className={`border-b ${c.tableBorder} ${c.tableHover} transition cursor-pointer ${
                  idx % 2 === 0 ? c.cardBg : c.tableStripe
                }`}
              >
                <td className={`sticky left-0 z-10 px-6 py-4 ${c.cardBg} border-r-2 ${c.tableBorder}`}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(item.id)}
                    onChange={() => handleSelectRow(item.id)}
                    className={`w-4 h-4 cursor-pointer ${
                      theme === 'hacker' ? 'accent-emerald-500' : theme === 'light' ? 'accent-blue-600' : 'accent-gray-600'
                    }`}
                  />
                </td>
                {DISPLAY_FIELDS.map(field => {
                  if (field === 'id') {
                    return (
                      <td key={field} className={`sticky left-16 z-10 px-6 py-4 ${c.primaryText} font-bold text-sm ${c.cardBg} border-r-2 ${c.tableBorder}`}>
                        0x{String(item.id).padStart(4, '0')}
                      </td>
                    );
                  } else if (field === 'status') {
                    return (
                      <td key={field} className="px-6 py-4">
                        <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider inline-block ${getStatusColor(item.status, theme)}`}>
                          {item.status || 'N/A'}
                        </span>
                      </td>
                    );
                  } else if (field === 'plant' || field === 'startLabel' || field === 'regionLabel') {
                    return (
                      <td key={field} className={`px-6 py-4 ${c.text} font-mono text-xs max-w-xs truncate`}>
                        {item[field] || '-'}
                      </td>
                    );
                  } else if (['capacity', 'annualCarbon', 'lng', 'lat'].includes(field)) {
                    return (
                      <td key={field} className={`px-6 py-4 ${c.text} text-xs`}>
                        {item[field] !== null && item[field] !== undefined ? item[field].toLocaleString() : '-'}
                      </td>
                    );
                  } else {
                    return (
                      <td key={field} className={`px-6 py-4 ${c.text} text-xs`}>
                        {item[field] || '-'}
                      </td>
                    );
                  }
                })}
                <td className={`sticky right-0 z-10 px-6 py-4 ${c.cardBg} border-l-2 ${c.tableBorder}`}>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className={`p-2 border rounded transition font-bold ${
                        theme === 'hacker'
                          ? 'text-cyan-400 border-cyan-600 hover:bg-cyan-950 hover:shadow-lg hover:shadow-cyan-500/50'
                          : theme === 'light'
                          ? 'text-blue-600 border-blue-600 hover:bg-blue-50'
                          : 'text-gray-300 border-gray-600 hover:bg-gray-800'
                      }`}
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
                      className={`p-2 border rounded transition font-bold ${
                        theme === 'hacker'
                          ? 'text-red-400 border-red-600 hover:bg-red-950 hover:shadow-lg hover:shadow-red-500/50'
                          : theme === 'light'
                          ? 'text-red-600 border-red-600 hover:bg-red-50'
                          : 'text-red-400 border-red-600 hover:bg-red-950'
                      }`}
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
  );
};
